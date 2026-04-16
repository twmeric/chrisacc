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

    if (url.pathname === "/auth") {
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
      if (!code) {
        return new Response("Missing code", { status: 400 });
      }

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

      if (!token) {
        return new Response("Authorization failed", { status: 401 });
      }

      // Return HTML that posts the token back to Decap CMS opener
      const html = `<!DOCTYPE html>
<html>
<head><title>Auth Success</title></head>
<body>
<script>
  window.opener.postMessage(
    'authorization:github:success:{"token":"${token}","provider":"github"}',
    '*'
  );
  window.close();
</script>
</body>
</html>`;

      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
