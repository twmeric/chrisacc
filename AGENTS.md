# LTCPA Project Agent Guide

> **Read this first before making any changes.**

## Project Status
**Current State:** Production-ready Next.js 15 site with CMS backend (2026-04-16).  
All 13 page families rebuilt across 3 locales (TC / SC / EN). Previous static HTML version backed up locally.

---

## Quick Links
- **Production Site:** `https://ltgroupcpa.jkdcoding.com`
- **Admin Panel:** `https://ltgroupcpa.jkdcoding.com/admin/`
- **GitHub Repo:** `https://github.com/twmeric/chrisacc`
- **Production Branch:** `main` ⚠️ (never deploy from `master`)

---

## Architecture Overview

```
┌─────────────────┐      ┌──────────────────────┐      ┌─────────────────┐
│   GitHub Repo   │──────│  GitHub Actions CI   │──────│ Cloudflare Pages│
│   (main branch) │      │  .github/workflows/  │      │ ltcpa-website   │
└─────────────────┘      │     deploy.yml       │      └─────────────────┘
                                                  │              │
                                                  │              ▼
                                                  │      Custom Domain:
                                                  │      ltgroupcpa.jkdcoding.com
                                                  │
                                                  ▼
                                         ┌─────────────────┐
                                         │  Cloudflare KV  │
                                         │  (cms_data)     │
                                         └─────────────────┘
                                                  ▲
                                                  │
┌─────────────────┐      ┌──────────────────────┐│      ┌─────────────────┐
│   Admin UI      │──────│   ltcpa-cms-api     │┘      │  Cloudflare R2  │
│  /admin/        │      │   (Worker)          │───────│  ltcpa-media    │
└─────────────────┘      └──────────────────────┘       └─────────────────┘
         │
         └─ Analytics APIs (pageview, interaction, report)
```

---

## Cloudflare Infrastructure

| Resource | Name / ID | Status |
|----------|-----------|--------|
| Pages Project | `ltcpa-website` | Active (production branch = `main`) |
| Pages Domain | `https://ltcpa-website.pages.dev` | Active |
| Custom Domain | `ltgroupcpa.jkdcoding.com` | Active |
| Custom Domain | `ltgroupcpa.com` | Registered (pending DNS) |
| Worker | `ltcpa-cms-api` | Active |
| Worker | `ltcpa-inquiry-api` | Active |
| KV Namespace | `LTCPA_CMS` (`ca4e0945e6fc4ef590e4a57548da7626`) | Active (stores `cms_data`) |
| R2 Bucket | `ltcpa-media` | Active (uploaded images) |
| D1 Database | `ltcpa-d1` (`db7d4aa5-2407-4c20-a311-5daea0f177bf`) | Active |

---

## Admin Access
- **URL:** `https://ltgroupcpa.jkdcoding.com/admin/`
- **Password:** `admin360`
- **CMS API Base:** `https://ltcpa-cms-api.jimsbond007.workers.dev/api/cms`

---

## Deploy Rules (CRITICAL)

### ☠️ DO NOT manually run `wrangler pages deploy` from local
This creates a **preview deployment** that does NOT update the production domain. Always push to `main`.

### ✅ Correct deployment flow
1. Commit all changes to **local `main`**
2. Push to `origin main`
3. GitHub Actions (`.github/workflows/deploy.yml`) will:
   - Build Next.js (`npm run build`)
   - Deploy **Pages** to production
   - Deploy **CMS Worker** via Wrangler
   - Deploy **Inquiry Worker** via Wrangler

### 🔀 Branch discipline
- `main` = production
- `master` branch has been deleted from remote. Do not recreate it.

---

## Build System

### `npm run build` does two things:
1. `npm run build:admin-css` → compiles Tailwind CSS for Admin panel
2. `npm run fetch-cms` → fetches live KV data into `src/data/cms.json`
3. `next build` → static export to `dist/`

### `scripts/fetch-cms.js`
- Pulls `https://ltcpa-cms-api.jimsbond007.workers.dev/api/cms/data`
- Deep-merges with `lib/cms-defaults.ts` fallback data
- Writes to `src/data/cms.json`
- **Also generates** `public/admin/cms-defaults.json` for Admin panel fallback
- On failure, writes `{}` so `cms-defaults.ts` takes over

### `public/images-manifest.json`
- Auto-generated during build
- Lists all static images in `public/images/`
- Used by Admin Media Gallery to show both static + R2 assets

---

## CMS Data Flow

### Source of truth priority (at build time)
1. **KV live data** fetched by `fetch-cms.js` → `src/data/cms.json`
2. **Fallback defaults** from `lib/cms-defaults.ts`

### At runtime (Admin panel)
- Admin reads/writes directly to KV via `ltcpa-cms-api`
- **Admin now merges KV data with `cms-defaults.json`** to prevent missing fields
- Saving in Admin does **not** auto-rebuild the site
- After editing content, click **"Deploy Site"** in Admin to trigger GitHub Actions

### Adding new CMS fields
1. Add the field to `lib/cms-defaults.ts` (for fallback)
2. Add the corresponding UI input in `public/admin/index.html`
3. Add the collector logic in `public/admin/index.html` `collectSection()`
4. Update consuming components to read from `getLocaleCMS()`
5. **Never overwrite KV with defaults** — use Admin UI or a patch migration

---

## Worker Endpoints (`ltcpa-cms-api`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/cms/data` | No | Read entire CMS JSON from KV |
| POST | `/api/cms/data` | `X-Admin-Token` | Deep-merge save to KV |
| POST | `/api/cms/upload` | `X-Admin-Token` | Upload image to R2 |
| GET | `/api/cms/media` | `X-Admin-Token` | List R2 objects |
| DELETE | `/api/cms/media/:key` | `X-Admin-Token` | Delete R2 object |
| GET | `/api/cms/auth/verify` | `X-Admin-Token` | Verify admin token |
| POST | `/api/cms/deploy` | `X-Admin-Token` | Trigger GitHub Actions workflow |
| GET | `/api/cms/analytics/report?days=N` | `X-Admin-Token` | Visitor stats |
| POST | `/api/analytics/pageview` | No | Track page view |
| POST | `/api/analytics/interaction` | No | Track engagement |

---

## Secrets & Credentials

### Local file (never commit)
- `.cloudflare-token` — Cloudflare API token

### GitHub Secrets (repo level)
| Secret | Required | Purpose |
|--------|----------|---------|
| `CLOUDFLARE_API_TOKEN` | ✅ | Deploy Pages & Workers |
| `CLOUDFLARE_ACCOUNT_ID` | ✅ | Account binding |
| `NEXT_PUBLIC_INQUIRY_API_URL` | ✅ | Contact form endpoint URL |
| `NEXT_PUBLIC_CMS_API_URL` | ✅ | CMS API URL for build script |
| `GITHUB_TOKEN` | ⚠️ Optional | Used by CMS Worker `deploy` handler to trigger Actions. **Must be set as Worker secret (not GitHub repo secret).** Name: `GITHUB_TOKEN` in `ltcpa-cms-api` Worker settings. |

### Worker Secrets (Cloudflare Dashboard)
| Worker | Secret / Variable | Purpose |
|--------|-------------------|---------|
| `ltcpa-cms-api` | `GITHUB_TOKEN` | GitHub PAT with `repo` + `workflow` scope (trigger Actions deploy) |
| `ltcpa-inquiry-api` | `WHATSAPP_TOKEN` | Meta WhatsApp Cloud API token |
| `ltcpa-inquiry-api` | `WHATSAPP_PHONE_ID` | Meta WhatsApp Business Account Phone Number ID |
| `ltcpa-inquiry-api` | `ADMIN_PHONE` | **WhatsApp notification recipient** (e.g. `85268810677`) |
| `ltcpa-inquiry-api` | `RESEND_API_KEY` | Optional — Resend API key for email notifications |

> **Security note:** Do NOT paste GitHub tokens into chat. GitHub Secret Scanning will auto-revoke exposed tokens within seconds. Always set secrets directly in the Cloudflare Dashboard (Workers & Pages → Worker → Settings → Variables and Secrets).
>
> To change the WhatsApp notification number: go to Cloudflare Dashboard → Workers & Pages → `ltcpa-inquiry-api` → Settings → Variables and Secrets → edit `ADMIN_PHONE`.

---

## Known Pitfalls (learned the hard way)

1. **"Body has already been used" on deploy**  
   → Never call `.text()` on a `fetch` response twice. Use `.clone()` if you need to read body conditionally. (Fixed in current `workers/cms-api/src/index.ts`)

2. **Deploy button returns 401**  
   → Admin login previously used the unprotected `/api/cms/data` endpoint for "validation", so wrong passwords still "logged in". Fixed by adding `GET /api/cms/auth/verify`.

3. **Media Gallery missing static images**  
   → Static images in `public/images/` are NOT in R2. Build script now generates `images-manifest.json` so Admin can show both sources.

4. **Analytics 404**  
   → Admin called `/api/cms/analytics/report` but Worker only served `/api/analytics/report`. Both paths are now supported.

5. **Production branch mismatch**  
   → Cloudflare Pages production branch is `main`. Local branch was `master`. All development must happen on `main`.

6. **Service Pages Scope Items disappear**  
   → KV's `servicePages` was incomplete after `fetch-cms.js` deleted outdated entries. Admin panel loaded KV data without fallback. **Fixed**: `fetch-cms.js` generates `cms-defaults.json`; Admin `doLogin()` deepMerges defaults into KV data with array-object item-by-item merging.

7. **Static images cannot be deleted from Admin**  
   → Static images in `public/images/` are baked into the static export. Deletion requires git commit + redeploy. R2 uploaded files can be deleted normally. Admin shows "Read-only" badge for static images.

---

## Recent Feature Additions (2026-04-17)

- ✅ **In-page Search Overlay** — `components/ui/SearchOverlay.tsx`. Ctrl+K trigger, ESC close, `<mark>` highlighting, prev/next navigation. Excludes header/nav/footer/script/style zones.
- ✅ **Media Delete** — `DELETE /api/cms/media/:key` endpoint. Admin Gallery shows red Delete button for R2 items only.
- ✅ **Analytics Enrichment** — Admin shows Top Pages, Countries distribution, Recent Views table with referrer/country/timestamp.
- ✅ **Admin Sidebar Hierarchy** — Grouped with titles (Brand/Navigation/Pages/Services/Library), indentation, collapsible sections.
- ✅ **WhatsApp Admin Setting** — `site_whatsapp` field in Site Settings. Contact page fallback: `contact.form.whatsapp || site.whatsapp || ""`.
- ✅ **Forensic Gold Icons** — `ServiceExtraSections.tsx` icons changed to `text-brand-gold` with `bg-brand-gold/10` circles.

---

## Next Steps (when you return)
- [x] Set `GITHUB_TOKEN` Worker secret if Deploy button still fails
- [ ] Set `RESEND_API_KEY` Worker secret for inquiry email notifications
- [ ] Configure DNS for `ltgroupcpa.com` when ready to go live
- [x] Add more analytics charts in Admin (referrers, countries, etc.)
