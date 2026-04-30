/**
 * LTCPA Inquiry API Worker
 * - Saves inquiries to D1
 * - Sends WhatsApp notification via CloudWapi
 * - Sends email notification via Resend (optional)
 */

export interface Env {
  LTCPA_D1: D1Database;
  CMS_DATA: KVNamespace;
  RESEND_API_KEY?: string;
  ADMIN_EMAIL?: string;
  ADMIN_PHONE?: string;
  CLOUDWAPI_API_KEY?: string;
  CLOUDWAPI_SENDER?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function initDB(env: Env) {
  await env.LTCPA_D1.prepare(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

async function saveToD1(env: Env, data: Record<string, string>) {
  const id = crypto.randomUUID();
  await env.LTCPA_D1.prepare(
    `INSERT INTO inquiries (id, name, company, email, phone, service, message, status, submitted_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    data.name,
    data.company,
    data.email,
    data.phone || "",
    data.service || "",
    data.message || "",
    "new",
    new Date().toISOString()
  ).run();
  return id;
}

async function getAdminPhoneFromKV(env: Env): Promise<string | null> {
  try {
    const raw = await env.CMS_DATA.get("cms_data");
    if (!raw) return null;
    const cms = JSON.parse(raw);
    // Try each locale's site.whatsapp
    for (const loc of ["en", "zh-hant", "zh-hans"]) {
      const phone = cms[loc]?.site?.whatsapp;
      if (phone && String(phone).trim()) return String(phone).trim();
    }
  } catch { /* ignore */ }
  return null;
}

async function sendWhatsApp(env: Env, data: Record<string, string>): Promise<{ success: boolean; error?: string }> {
  if (!env.CLOUDWAPI_API_KEY) {
    return { success: false, error: "Missing CLOUDWAPI_API_KEY" };
  }

  // Recipient: ADMIN_PHONE (Worker secret) → KV site.whatsapp → hardcoded fallback
  const kvPhone = await getAdminPhoneFromKV(env);
  const adminPhone = env.ADMIN_PHONE || kvPhone || "85255055692";
  const serviceLabel = data.service || "N/A";

  const text =
    `📩 New LTCPA Website Inquiry\n\n` +
    `Name: ${data.name}\n` +
    `Company: ${data.company}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone || "N/A"}\n` +
    `Service: ${serviceLabel}\n` +
    `Message: ${(data.message || "").slice(0, 200)}${(data.message || "").length > 200 ? "..." : ""}`;

  try {
    const sender = (env.CLOUDWAPI_SENDER || "85262322466").replace(/\D/g, "");
    const cleanNumber = adminPhone.replace(/\D/g, "");

    const res = await fetch("https://unofficial.cloudwapi.in/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: env.CLOUDWAPI_API_KEY,
        sender: sender,
        number: cleanNumber,
        message: text,
      }),
    });

    const rawText = await res.text();
    let result: Record<string, any> = {};
    try {
      result = JSON.parse(rawText);
    } catch {
      return { success: false, error: `Non-JSON response (${res.status}): ${rawText.slice(0, 200)}` };
    }

    if (result.status === true || result.status === "success") {
      console.log("[WhatsApp sent] CloudWapi:", result.msg || "OK");
      return { success: true };
    }

    const errMsg = result.msg || JSON.stringify(result);
    console.error("[WhatsApp API error]", res.status, errMsg);
    return { success: false, error: errMsg };
  } catch (err: any) {
    console.error("[WhatsApp fetch error]", err.message);
    return { success: false, error: err.message };
  }
}

async function sendEmail(env: Env, data: Record<string, string>): Promise<{ success: boolean; error?: string }> {
  if (!env.RESEND_API_KEY) {
    return { success: false, error: "Missing RESEND_API_KEY" };
  }
  if (!env.ADMIN_EMAIL) {
    return { success: false, error: "Missing ADMIN_EMAIL" };
  }

  const subject = `[LTCPA] New Inquiry from ${data.name} - ${data.company}`;
  const body = `<h2>New Website Inquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Company:</strong> ${data.company}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
    <p><strong>Service:</strong> ${data.service || "N/A"}</p>
    <p><strong>Message:</strong><br/>${(data.message || "").replace(/\n/g, "<br/>")}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "LTCPA Website <inquiries@ltcpa.com>",
        to: env.ADMIN_EMAIL,
        subject,
        html: body,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Email API error]", res.status, errText);
      return { success: false, error: `${res.status}: ${errText.slice(0, 200)}` };
    }

    const result = await res.json();
    console.log("[Email sent] id:", result.id);
    return { success: true };
  } catch (err: any) {
    console.error("[Email fetch error]", err.message);
    return { success: false, error: err.message };
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Debug endpoint: GET /api/test/whatsapp
    if (url.pathname === "/api/test/whatsapp" && request.method === "GET") {
      try {
        const res = await fetch("https://unofficial.cloudwapi.in/send-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api_key: env.CLOUDWAPI_API_KEY, sender: "85262322466", number: "85255055692", message: "【測試】CloudWapi POST 測試" }),
        });
        const text = await res.text();
        return jsonResponse({ status: res.status, body: text });
      } catch (err: any) {
        return jsonResponse({ error: err.message }, 500);
      }
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    try {
      await initDB(env);
      const rawBody = await request.text();
      console.log("[Inquiry] raw body:", rawBody.slice(0, 500));
      let data: Record<string, string>;
      try {
        data = JSON.parse(rawBody);
      } catch (parseErr: any) {
        console.error("[Inquiry] JSON parse error:", parseErr.message, "body:", rawBody.slice(0, 200));
        return jsonResponse({ error: "Invalid JSON: " + parseErr.message }, 400);
      }

      // Validation
      if (!data.name || !data.company || !data.email) {
        return jsonResponse({ error: "Name, company and email are required" }, 400);
      }

      const id = await saveToD1(env, data);

      // Fire-and-forget notifications
      const [waResult, emailResult] = await Promise.allSettled([
        sendWhatsApp(env, data),
        sendEmail(env, data),
      ]);

      return jsonResponse({
        success: true,
        id,
        notifications: {
          whatsapp: waResult.status === "fulfilled" ? waResult.value : { success: false, error: String(waResult.reason) },
          email: emailResult.status === "fulfilled" ? (emailResult.value || { success: false, error: "Unknown error" }) : { success: false, error: String(emailResult.reason) },
        },
      });
    } catch (err: any) {
      return jsonResponse({ error: err.message || "Server error" }, 500);
    }
  },
};
