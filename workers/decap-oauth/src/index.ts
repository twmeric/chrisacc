/**
 * Decap CMS OAuth Proxy for Cloudflare Workers
 * Routes: /auth, /oauth  -> Redirect to GitHub OAuth
 *         /callback       -> Exchange code for token and return to CMS
 */

export interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

function generateState(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = url.origin;
    const siteId = url.searchParams.get("site_id") || "";
    const parentOrigin = siteId.startsWith("http")
      ? new URL(siteId).origin
      : `https://${siteId}`;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === "/auth" || url.pathname === "/oauth") {
      const state = generateState();
      const redirectUri = `${origin}/callback`;
      const githubUrl =
        `https://github.com/login/oauth/authorize` +
        `?client_id=${env.GITHUB_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=repo` +
        `&state=${state}`;

      return Response.redirect(githubUrl, 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");
      const errorDescription = url.searchParams.get("error_description");

      if (error) {
        return renderResult("error", errorDescription || error, parentOrigin);
      }

      if (!code) {
        return renderResult("error", "Missing authorization code", parentOrigin);
      }

      try {
        const tokenRes = await fetch(
          "https://github.com/login/oauth/access_token",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client_id: env.GITHUB_CLIENT_ID,
              client_secret: env.GITHUB_CLIENT_SECRET,
              code,
            }),
          }
        );

        const tokenData: any = await tokenRes.json();
        const token = tokenData.access_token;
        const githubError = tokenData.error_description || tokenData.error;

        if (!token) {
          return renderResult(
            "error",
            githubError || "GitHub authorization failed",
            parentOrigin
          );
        }

        const message = `authorization:github:success:{"token":"${token}","provider":"github"}`;
        return renderResult("success", message, parentOrigin);
      } catch (err: any) {
        return renderResult("error", err.message || "Server error", parentOrigin);
      }
    }

    return new Response("Not Found", { status: 404 });
  },
};

function renderResult(
  status: "success" | "error",
  payload: string,
  parentOrigin: string
): Response {
  const isSuccess = status === "success";
  const displayText = isSuccess
    ? "Authentication successful. You can close this window."
    : `Authentication failed: ${escapeHtml(payload)}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>OAuth ${isSuccess ? "Success" : "Error"}</title>
  <style>
    body { font-family: system-ui, sans-serif; text-align: center; padding: 40px; }
    .success { color: #2f855a; }
    .error { color: #c53030; }
  </style>
</head>
<body class="${isSuccess ? "success" : "error"}">
  <h2>${isSuccess ? "✅ Success" : "❌ Error"}</h2>
  <p>${displayText}</p>
  <script>
    (function() {
      var payload = ${JSON.stringify(payload)};
      var parentOrigin = ${JSON.stringify(parentOrigin)};
      var opener = window.opener || window.parent;
      
      function send() {
        if (opener) {
          try {
            opener.postMessage(payload, parentOrigin || "*");
            console.log("[OAuth] Message posted to opener");
          } catch (e) {
            console.error("[OAuth] postMessage failed:", e);
          }
        } else {
          console.error("[OAuth] No opener found");
        }
      }
      
      // Try immediately and again after a short delay
      send();
      setTimeout(send, 500);
      setTimeout(send, 1500);
      
      // Close popup after giving parent time to process
      setTimeout(function() {
        if (window.close) window.close();
      }, ${isSuccess ? "3000" : "5000"});
    })();
  </script>
</body>
</html>`;

  return new Response(html, {
    status: isSuccess ? 200 : 401,
    headers: { "Content-Type": "text/html" },
  });
}
