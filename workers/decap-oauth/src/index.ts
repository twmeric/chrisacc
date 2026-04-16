/**
 * Decap CMS OAuth Proxy for Cloudflare Workers
 * Routes: /auth  -> Redirect to GitHub OAuth
 *         /callback -> Exchange code for token and return to CMS
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

function sendResponse(status: "success" | "error", payload: string) {
  const html = `<!DOCTYPE html>
<html>
<head><title>OAuth ${status === "success" ? "Success" : "Error"}</title></head>
<body>
<p>${status === "success" ? "Authentication successful. You can close this window." : "Authentication failed: " + escapeHtml(payload) + "</p>"}
<script>
  (function() {
    var message = ${JSON.stringify(payload)};
    if (window.opener) {
      window.opener.postMessage(message, '*');
    }
    setTimeout(function() {
      window.close();
    }, ${status === "success" ? "300" : "3000"});
  })();
</script>
</body>
</html>`;
  return new Response(html, {
    status: status === "success" ? 200 : 401,
    headers: { "Content-Type": "text/html" },
  });
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
        return sendResponse("error", errorDescription || error);
      }

      if (!code) {
        return sendResponse("error", "Missing authorization code");
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
          return sendResponse("error", githubError || "GitHub authorization failed");
        }

        const message = `authorization:github:success:{"token":"${token}","provider":"github"}`;
        return sendResponse("success", message);
      } catch (err: any) {
        return sendResponse("error", err.message || "Server error during token exchange");
      }
    }

    return new Response("Not Found", { status: 404 });
  },
};
