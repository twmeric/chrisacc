/**
 * LTCPA Inquiry API Worker
 * - Saves inquiries to D1
 * - Sends email notification via Resend
 * - Creates inquiry markdown file via GitHub API (optional)
 */

export interface Env {
  LTCPA_D1: D1Database;
  RESEND_API_KEY: string;
  ADMIN_EMAIL: string;
  GITHUB_TOKEN: string;
  GITHUB_REPO: string;
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

async function sendEmail(env: Env, data: Record<string, string>) {
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

async function createInquiryFile(env: Env, data: Record<string, string>, id: string) {
  const date = new Date().toISOString();
  const filename = `content/inquiries/${date.split("T")[0]}-${id}.md`;
  const content = `---
name: "${data.name}"
company: "${data.company}"
email: "${data.email}"
phone: "${data.phone || ""}"
service: "${data.service || ""}"
status: "new"
submitted_at: "${date}"
---

${data.message || ""}
`;

  const encoded = btoa(unescape(encodeURIComponent(content)));

  await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/${filename}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `New inquiry from ${data.name}`,
      content: encoded,
      branch: "main",
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
      const data: Record<string, string> = await request.json();

      // Validation
      if (!data.name || !data.company || !data.email) {
        return jsonResponse({ error: "Name, company and email are required" }, 400);
      }

      const id = await saveToD1(env, data);

      // Fire-and-forget email + github file creation
      ctx.waitUntil(
        Promise.all([
          sendEmail(env, data).catch(() => {}),
          createInquiryFile(env, data, id).catch(() => {}),
        ])
      );

      return jsonResponse({ success: true, id });
    } catch (err: any) {
      return jsonResponse({ error: err.message || "Server error" }, 500);
    }
  },
};
