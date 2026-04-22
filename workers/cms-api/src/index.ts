export interface Env {
  CMS_DATA: KVNamespace;
  MEDIA_BUCKET: R2Bucket;
  LTCPA_D1: D1Database;
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
  // Frontend sends "path", but interface names it "page" — support both
  const page = data.page || (data as any).path || "unknown";
  const pageView = {
    id,
    page,
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
    const pageIdx = existing.topPages.findIndex((p: any) => p.page === page);
    if (pageIdx >= 0) existing.topPages[pageIdx].views++;
    else existing.topPages.push({ page, views: 1 });
    await env.CMS_DATA.put(statsKey, JSON.stringify(existing));
  } else {
    await env.CMS_DATA.put(statsKey, JSON.stringify({
      date: today,
      totalViews: 1,
      uniqueVisitors: 1,
      topPages: [{ page, views: 1 }],
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

  // Fetch raw pageviews for detailed breakdown (countries, referrers, recent)
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const list = await env.CMS_DATA.list({ prefix: "pv_" });
  const keys = list.keys.map(k => k.name).sort().reverse().slice(0, 500);

  const countries: Record<string, number> = {};
  const referrers: Record<string, number> = {};
  const recent: any[] = [];

  await Promise.all(keys.map(async (key) => {
    const pv = await env.CMS_DATA.get(key, "json") as any;
    if (!pv || !pv.timestamp) return;
    const ts = new Date(pv.timestamp).getTime();
    if (ts >= cutoff.getTime()) {
      countries[pv.country || "Unknown"] = (countries[pv.country || "Unknown"] || 0) + 1;
      const ref = pv.referrer && pv.referrer.trim() ? pv.referrer : "Direct / None";
      referrers[ref] = (referrers[ref] || 0) + 1;
      recent.push({
        page: pv.page,
        country: pv.country || "Unknown",
        referrer: ref,
        timestamp: pv.timestamp,
        sessionId: pv.sessionId,
      });
    }
  }));

  recent.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return {
    ...summary,
    topPages: Object.entries(summary.topPages)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10),
    countries: Object.entries(countries)
      .map(([name, views]) => ({ name, views }))
      .sort((a, b) => b.views - a.views),
    referrers: Object.entries(referrers)
      .map(([name, views]) => ({ name, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10),
    recentPageViews: recent.slice(0, 50),
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

      if (path.startsWith("/api/cms/media/") && request.method === "DELETE") {
        const auth = requireAuth(request, env);
        if (auth) return auth;
        const key = path.replace("/api/cms/media/", "");
        if (!key) {
          return jsonResponse({ error: "No key provided" }, 400);
        }
        await env.MEDIA_BUCKET.delete(key);
        return jsonResponse({ success: true });
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

      if (path === "/api/cms/analytics/reset" && request.method === "POST") {
        const auth = requireAuth(request, env);
        if (auth) return auth;
        // Delete all pv_ keys
        const pvList = await env.CMS_DATA.list({ prefix: "pv_" });
        const pvKeys = pvList.keys.map(k => k.name);
        for (const key of pvKeys) {
          await env.CMS_DATA.delete(key);
        }
        // Delete all stats_ keys
        const statsList = await env.CMS_DATA.list({ prefix: "stats_" });
        const statsKeys = statsList.keys.map(k => k.name);
        for (const key of statsKeys) {
          await env.CMS_DATA.delete(key);
        }
        return jsonResponse({
          success: true,
          deleted: {
            pageviews: pvKeys.length,
            dailyStats: statsKeys.length,
            total: pvKeys.length + statsKeys.length,
          },
        });
      }

      if (path === "/api/cms/deploy" && request.method === "POST") {
        const auth = requireAuth(request, env);
        if (auth) return auth;

        if (!env.GITHUB_TOKEN) {
          return jsonResponse(
            { error: "GITHUB_TOKEN secret is missing. Configure it in the ltcpa-cms-api Worker settings with a GitHub PAT that has repo + workflow scopes." },
            502
          );
        }

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
                "User-Agent": "ltcpa-cms-api/1.0",
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

      if (path === "/api/analytics/interaction" && request.method === "POST") {
        // Accept interaction events (heartbeat, visibility, etc.) — no-op for now
        return jsonResponse({ success: true });
      }

      if (path === "/api/analytics/report" && request.method === "GET") {
        const auth = requireAuth(request, env);
        if (auth) return auth;
        const days = parseInt(url.searchParams.get("days") || "7");
        const report = await getAnalyticsReport(env, days);
        return jsonResponse({ success: true, data: report });
      }

      // Inquiries management
      if (path === "/api/cms/inquiries" && request.method === "GET") {
        const auth = requireAuth(request, env);
        if (auth) return auth;
        const status = url.searchParams.get("status") || "";
        let sql = "SELECT * FROM inquiries";
        const params: string[] = [];
        if (status) {
          sql += " WHERE status = ?";
          params.push(status);
        }
        sql += " ORDER BY submitted_at DESC LIMIT 200";
        const stmt = env.LTCPA_D1.prepare(sql);
        const result = params.length ? await stmt.bind(...params).all() : await stmt.all();
        return jsonResponse({ success: true, inquiries: result.results || [] });
      }

      if (path.startsWith("/api/cms/inquiries/") && request.method === "PATCH") {
        const auth = requireAuth(request, env);
        if (auth) return auth;
        const id = path.replace("/api/cms/inquiries/", "");
        const body = await request.json() as Record<string, string>;
        const newStatus = body.status;
        if (!newStatus) {
          return jsonResponse({ error: "status is required" }, 400);
        }
        await env.LTCPA_D1.prepare("UPDATE inquiries SET status = ? WHERE id = ?")
          .bind(newStatus, id).run();
        return jsonResponse({ success: true });
      }

      return jsonResponse({ error: "Not found" }, 404);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return jsonResponse({ error: message }, 500);
    }
  },
};
