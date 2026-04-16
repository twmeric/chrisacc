export interface Env {
  CMS_DATA: KVNamespace;
  MEDIA_BUCKET: R2Bucket;
  ADMIN_PASSWORD: string;
  GITHUB_TOKEN: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, X-Admin-Token",
};

function isObject(item: unknown): item is Record<string, unknown> {
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Record<string, unknown>
): T {
  const output = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceVal = source[key];
      const targetVal = output[key];

      if (isObject(sourceVal) && isObject(targetVal)) {
        output[key] = deepMerge(targetVal as Record<string, unknown>, sourceVal);
      } else {
        output[key] = sourceVal;
      }
    }
  }

  return output;
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function requireAuth(request: Request, env: Env): Response | null {
  const token = request.headers.get("X-Admin-Token");
  if (!token || token !== env.ADMIN_PASSWORD) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }
  return null;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (path === "/api/cms/data" && request.method === "GET") {
        const data = await env.CMS_DATA.get("cms_data");
        return jsonResponse(data ? JSON.parse(data) : {});
      }

      if (path === "/api/cms/data" && request.method === "POST") {
        const auth = requireAuth(request, env);
        if (auth) return auth;

        const incoming = await request.json<Record<string, unknown>>();
        const existingRaw = await env.CMS_DATA.get("cms_data");
        const existing = existingRaw ? JSON.parse(existingRaw) : {};

        const merged = deepMerge(existing, incoming);
        await env.CMS_DATA.put("cms_data", JSON.stringify(merged));

        const timestamp = new Date().toISOString();
        await env.CMS_DATA.put(
          `cms_history_${timestamp}`,
          JSON.stringify(merged),
          { expirationTtl: 30 * 24 * 60 * 60 }
        );

        return jsonResponse({ success: true });
      }

      if (path === "/api/cms/upload" && request.method === "POST") {
        const auth = requireAuth(request, env);
        if (auth) return auth;

        const form = await request.formData();
        const file = form.get("file");
        if (!file || !(file instanceof File)) {
          return jsonResponse({ error: "No file provided" }, 400);
        }

        const ext = file.name.split(".").pop() || "bin";
        const filename = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

        await env.MEDIA_BUCKET.put(filename, file.stream(), {
          httpMetadata: { contentType: file.type },
        });

        return jsonResponse({ success: true, url: `/media/${filename}` });
      }

      if (path === "/api/cms/deploy" && request.method === "POST") {
        const auth = requireAuth(request, env);
        if (auth) return auth;

        const repo = "twmeric/chrisacc";
        const workflowFile = "deploy.yml";

        const dispatch = async (withInputs: boolean) => {
          const body: Record<string, unknown> = {
            ref: "main",
          };
          if (withInputs) {
            body.inputs = { reason: "CMS Deploy" };
          }

          return fetch(
            `https://api.github.com/repos/${repo}/actions/workflows/${workflowFile}/dispatches`,
            {
              method: "POST",
              headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${env.GITHUB_TOKEN}`,
                "X-GitHub-Api-Version": "2022-11-28",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );
        };

        let resp = await dispatch(true);
        if (!resp.ok) {
          const text = await resp.text();
          if (resp.status === 422 && text.includes("Unexpected inputs")) {
            resp = await dispatch(false);
          }
        }

        if (!resp.ok) {
          const text = await resp.text();
          return jsonResponse({ error: "Deploy failed", details: text }, 502);
        }

        return jsonResponse({ success: true });
      }

      return jsonResponse({ error: "Not found" }, 404);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return jsonResponse({ error: message }, 500);
    }
  },
};
