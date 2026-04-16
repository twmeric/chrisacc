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

// ==================== Analytics ====================
interface PageViewData {
  page: string;
  referrer?: string;
  userAgent?: string;
  sessionId: string;
}

async function savePageView(env: Env, data: PageViewData, request: Request): Promise<void> {
  const id = `pv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const country = request.headers.get("CF-IPCountry") || "unknown";
  const pageView = {
    id,
    page: data.page,
    referrer: data.referrer || "",
    userAgent: data.userAgent || request.headers.get("User-Agent") || "",
    country,
    sessionId: data.sessionId,
    timestamp: new Date().toISOString(),
  };
  await env.CMS_DATA.put(id, JSON.stringify(pageView));
  // Update daily stats
  const today = new Date().toISOString().split("T")[0];
  const statsKey = `stats_${today}`;
  const existing = await env.CMS_DATA.get(statsKey, "json") as any;
  if (existing) {
    existing.totalViews++;
    const pageIdx = existing.topPages.findIndex((p: any) => p.page === data.page);
    if (pageIdx >= 0) existing.topPages[pageIdx].views++;
    else existing.topPages.push({ page: data.page, views: 1 });
    await env.CMS_DATA.put(statsKey, JSON.stringify(existing));
  } else {
    await env.CMS_DATA.put(statsKey, JSON.stringify({
      date: today,
      totalViews: 1,
      uniqueVisitors: 1,
      topPages: [{ page: data.page, views: 1 }],
    }), { expirationTtl: 86400 * 90 });
  }
}

async function getAnalyticsReport(env: Env, days = 7): Promise<any> {
  const dates: string[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  const stats = await Promise.all(dates.map(date => env.CMS_DATA.get(`stats_${date}`, "json")));
  const summary = {
    period: `${days} days`,
    totalViews: 0,
    avgDailyViews: 0,
    topPages: {} as Record<string, number>,
    dailyData: [] as Array<{ date: string; views: number }>,
  };
  for (const stat of stats) {
    if (stat) {
      const s = stat as any;
      summary.totalViews += s.totalViews || 0;
      summary.dailyData.push({ date: s.date, views: s.totalViews || 0 });
      for (const p of (s.topPages || [])) {
        summary.topPages[p.page] = (summary.topPages[p.page] || 0) + p.views;
      }
    }
  }
  summary.avgDailyViews = Math.round(summary.totalViews / days);
  return {
    ...summary,
    topPages: Object.entries(summary.topPages)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10),
  };
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

      if (path === "/api/cms/media" && request.method === "GET") {
        const auth = requireAuth(request, env);
        if (auth) return auth;
        const listed = await env.MEDIA_BUCKET.list();
        const objects = (listed.objects || []).map((o) => ({
          key: o.key,
          size: o.size,
          uploaded: o.uploaded,
          url: `https://ltcpa-media.jimsbond007.workers.dev/${o.key}`,
        }));
        return jsonResponse({ success: true, objects });
      }

      if (path === "/api/cms/auth/verify" && request.method === "GET") {
        const auth = requireAuth(request, env);
        if (auth) return auth;
        return jsonResponse({ success: true });
      }

      if (path === "/api/cms/analytics/report" && request.method === "GET") {
        const auth = requireAuth(request, env);
        if (auth) return auth;
        const days = parseInt(url.searchParams.get("days") || "7");
        const report = await getAnalyticsReport(env, days);
        return jsonResponse({ success: true, data: report });
      }

      if (path === "/api/cms/deploy" && request.method === "POST") {
        const auth = requireAuth(request, env);
        if (auth) return auth;

        const repo = "twmeric/chrisacc";
        const workflowFile = "deploy.yml";

        const dispatch = async (withInputs: boolean) => {
          const body: Record<string, unknown> = { ref: "main" };
          if (withInputs) body.inputs = { reason: "CMS Deploy" };
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
          // Clone response so we can read body without consuming original
          const text = await resp.clone().text();
          if (resp.status === 422 && text.includes("Unexpected inputs")) {
            resp = await dispatch(false);
          }
        }

        if (!resp.ok) {
          // Read text safely; do not call .json() directly on resp to avoid body lock
          const text = await resp.text();
          let details = text;
          try {
            details = JSON.stringify(JSON.parse(text));
          } catch {
            // keep raw text as details
          }
          return jsonResponse({ error: "Deploy failed", details }, 502);
        }

        return jsonResponse({ success: true });
      }

      // Analytics endpoints
      if (path === "/api/analytics/pageview" && request.method === "POST") {
        const data = await request.json() as PageViewData;
        await savePageView(env, data, request);
        return jsonResponse({ success: true });
      }

      if (path === "/api/analytics/report" && request.method === "GET") {
        const auth = requireAuth(request, env);
        if (auth) return auth;
        const days = parseInt(url.searchParams.get("days") || "7");
        const report = await getAnalyticsReport(env, days);
        return jsonResponse({ success: true, data: report });
      }

      return jsonResponse({ error: "Not found" }, 404);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return jsonResponse({ error: message }, 500);
    }
  },
};
