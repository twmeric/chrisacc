# LTCPA Website

**櫪韜會計師事務所有限公司 — LT CPA Limited**

Production URL: `https://ltgroupcpa.jkdcoding.com`  
Admin Panel: `https://ltgroupcpa.jkdcoding.com/admin/`  
Password: `admin360`

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **Hosting:** Cloudflare Pages
- **Backend:** Cloudflare Workers + KV + R2 + D1
- **CI/CD:** GitHub Actions

---

## Project Structure

```
E:\Projects\LTCPA
├── app/                          # Next.js App Router
│   ├── [lang]/                   # Locale-based routes (zh-hant, zh-hans, en)
│   │   ├── about/
│   │   ├── commitment/
│   │   ├── contact/
│   │   ├── purpose/
│   │   ├── services/
│   │   ├── services/[slug]/      # Service detail pages
│   │   ├── value/
│   │   ├── layout.tsx            # Locale layout (Header + Footer)
│   │   └── page.tsx              # Home page
│   ├── api/submit-inquiry/       # Contact form API route
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Root redirect
├── components/
│   ├── AnalyticsTracker.tsx      # Client-side analytics
│   ├── pages/HomePage.tsx
│   ├── sections/                 # Page section components
│   └── ui/                       # Header, Footer, Button, etc.
├── lib/
│   ├── cms-data.ts               # CMS data loader (build-time)
│   ├── cms-defaults.ts           # Trilingual fallback defaults
│   ├── cms-types.ts              # TypeScript types for CMS data
│   ├── i18n-config.ts            # Locale configuration
│   └── cms.ts                    # Legacy CMS helper (keep for compat)
├── public/
│   ├── admin/
│   │   ├── index.html            # Single-file CMS admin dashboard
│   │   └── logo.png              # Admin panel logo
│   ├── images/                   # Static images (logos, heroes, team)
│   └── images-manifest.json      # Auto-generated static image index
├── scripts/
│   └── fetch-cms.js              # Pre-build script: pulls KV → cms.json
├── src/data/
│   └── cms.json                  # Fetched CMS data (build-time only)
├── workers/
│   ├── cms-api/                  # CMS + Analytics Worker (KV + R2)
│   └── inquiry-api/              # Contact form Worker (D1)
├── .github/workflows/
│   └── deploy.yml                # CI/CD: build + deploy Pages + Workers
├── AGENTS.md                     # ⚠️ MUST READ for agents
└── next.config.ts                # Static export config (distDir: "dist")
```

---

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production (also fetches CMS data)
npm run build
```

---

## Deployment

**Never deploy manually from local.** Push to `main` and let GitHub Actions handle it.

```bash
git add .
git commit -m "your changes"
git push origin main
```

Actions will:
1. Build Next.js → `dist/`
2. Deploy `dist/` to Cloudflare Pages (production)
3. Deploy `workers/cms-api` via Wrangler
4. Deploy `workers/inquiry-api` via Wrangler

---

## CMS Content Management

### Editing Content
1. Go to `https://ltgroupcpa.jkdcoding.com/admin/`
2. Login with password: `admin360`
3. Switch language tab (繁體中文 / 简体中文 / English)
4. Edit fields, click **Save Section**
5. Click **Deploy Site** to rebuild and publish

### Adding a new CMS field
1. Add fallback value to `lib/cms-defaults.ts`
2. Add input to `public/admin/index.html` in the right section renderer
3. Add collector logic to `collectSection()` in Admin HTML
4. Update consuming component to read from `getLocaleCMS(lang)`

### Uploading Images
- Admin **Media Gallery** shows both:
  - **Static Images:** files in `public/images/` (deployed with site)
  - **Uploaded Media:** files in R2 bucket `ltcpa-media` (uploaded via Admin)
- To add a static image, put it in `public/images/` and push to `main`
- To add a dynamic image, use the Upload button in Admin Media Gallery

---

## Environment Variables

Build-time vars (GitHub Actions):
- `NEXT_PUBLIC_INQUIRY_API_URL`
- `NEXT_PUBLIC_CMS_API_URL`

Worker secrets (Cloudflare Dashboard):
- `ltcpa-cms-api` → `ADMIN_PASSWORD` = `admin360`
- `ltcpa-cms-api` → `GITHUB_TOKEN` (GitHub PAT with `repo` + `workflow`)
- `ltcpa-inquiry-api` → `RESEND_API_KEY` (optional, for email notifications)

---

## Important Notes

- **Production branch is `main`.** `master` has been deleted.
- `fetch-cms.js` runs before every build. If the CMS Worker is down, the build still succeeds using defaults.
- `defaultCMS` must never overwrite production KV again. New fields should be added via Admin or a migration patch.
- Analytics data is stored in KV keys prefixed with `pv_` and `stats_YYYY-MM-DD`.

---

## License

Proprietary — 櫪韜會計師事務所有限公司
