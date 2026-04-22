/**
 * LTCPA Inquiry API Worker
 * - Saves inquiries to D1
 * - Sends WhatsApp notification via Cloud API
 * - Sends email notification via Resend (optional)
 */

export interface Env {
  LTCPA_D1: D1Database;
  RESEND_API_KEY?: string;
  ADMIN_EMAIL?: string;
  WHATSAPP_TOKEN?: string;
  WHATSAPP_PHONE_ID?: string;
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

async function sendWhatsApp(env: Env, data: Record<string, string>) {
  if (!env.WHATSAPP_TOKEN || !env.WHATSAPP_PHONE_ID) return;

  const adminPhone = data.adminPhone || "85268810677";
  const serviceLabel = data.service || "N/A";

  const text = `📩 *New LTCPA Website Inquiry*\n\n` +
    `*Name:* ${data.name}\n` +
    `*Company:* ${data.company}\n` +
    `*Email:* ${data.email}\n` +
    `*Phone:* ${data.phone || "N/A"}\n` +
    `*Service:* ${serviceLabel}\n` +
    `*Message:* ${(data.message || "").slice(0, 200)}${(data.message || "").length > 200 ? "..." : ""}`;

  await fetch(`https://graph.facebook.com/v18.0/${env.WHATSAPP_PHONE_ID}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: adminPhone,
      type: "text",
      text: { body: text },
    }),
  });
}

async function sendEmail(env: Env, data: Record<string, string>) {
  if (!env.RESEND_API_KEY || !env.ADMIN_EMAIL) return;

  const subject = `[LTCPA] New Inquiry from ${data.name} - ${data.company}`;
  const body = `<h2>New Website Inquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Company:</strong> ${data.company}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
    <p><strong>Service:</strong> ${data.service || "N/A"}</p>
    <p><strong>Message:</strong><br/>${(data.message || "").replace(/\n/g, "<br/>")}</p>`;

  await fetch("https://api.resend.com/emails", {
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
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    try {
      await initDB(env);
      const data: Record<string, string> = await request.json();

      // Validation
      if (!data.name || !data.company || !data.email) {
        return jsonResponse({ error: "Name, company and email are required" }, 400);
      }

      const id = await saveToD1(env, data);

      // Fire-and-forget notifications
      ctx.waitUntil(
        Promise.all([
          sendWhatsApp(env, data).catch(() => {}),
          sendEmail(env, data).catch(() => {}),
        ])
      );

      return jsonResponse({ success: true, id });
    } catch (err: any) {
      return jsonResponse({ error: err.message || "Server error" }, 500);
    }
  },
};
