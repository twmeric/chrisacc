# LTCPA Project Agent Guide

## Project Status
**Current State:** Next.js rewrite completed with all 13 page families rebuilt across 3 locales (2026-04-16).  
Previous static HTML version backed up locally.

---

## Backup Location
```
E:\Projects\LTCPA-html-backup-2026-04-14.zip
```
Contains all previous static HTML pages (TC/SC/EN), CSS, JS, images, and CMS files.

---

## Cloudflare Infrastructure (Retained)

| Resource | Name / ID | Status |
|----------|-----------|--------|
| Pages Project | `ltcpa-website` | Active (auto-deploy via GitHub Actions) |
| Pages Domain | `https://ltcpa-website.pages.dev` | Active |
| Custom Domain | `ltgroupcpa.jkdcoding.com` | Bound to Pages project |
| Worker | `ltcpa-inquiry-api` | Active (D1 + Resend) |
| KV Namespace | `LTCPA_CMS` (`ca4e0945e6fc4ef590e4a57548da7626`) | Empty (framework retained) |
| R2 Bucket | `ltcpa-media` | Empty (recreated, framework retained) |
| D1 Database | `ltcpa-d1` (`db7d4aa5-2407-4c20-a311-5daea0f177bf`) | Active |

---

## Cloudflare API Token
**Stored locally in:** `E:\Projects\LTCPA\.cloudflare-token` (not tracked by Git)  
**Account ID:** `dfbee5c2a5706a81bc04675499c933d4`

---

## GitHub Repository
```
https://github.com/twmeric/chrisacc
```
**Branch:** `master`

---

## Worker URLs
- **Inquiry API:** `https://ltcpa-inquiry-api.jimsbond007.workers.dev`

---

## CI/CD
- **Workflow:** `.github/workflows/deploy.yml`
- **Trigger:** Push to `master` branch or manual dispatch
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Note:** Workflow passes `branch: main` to `cloudflare/pages-action` because the Pages project `production_branch` is locked to `main`. This ensures every push deploys to production and updates the custom domain.

---

## Site Structure
13 page families × 3 locales = **39 static HTML pages** generated on build.

| Page Family | Route Pattern | Status |
|-------------|---------------|--------|
| Home | `/[lang]/` | ✅ |
| About | `/[lang]/about/` | ✅ |
| Purpose (Mission) | `/[lang]/purpose/` | ✅ |
| Value (Vision) | `/[lang]/value/` | ✅ |
| Commitment | `/[lang]/commitment/` | ✅ |
| Services Overview | `/[lang]/services/` | ✅ |
| Audit | `/[lang]/services/audit/` | ✅ |
| Tax | `/[lang]/services/tax/` | ✅ |
| Risk | `/[lang]/services/risk/` | ✅ |
| Forensic | `/[lang]/services/forensic/` | ✅ |
| Consulting | `/[lang]/services/consulting/` | ✅ |
| Deals | `/[lang]/services/deals/` | ✅ |
| Contact | `/[lang]/contact/` | ✅ |

---

## GitHub Secrets Required
| Secret | Status | Purpose |
|--------|--------|---------|
| `CLOUDFLARE_API_TOKEN` | ✅ Set | Deploy Pages & Workers |
| `CLOUDFLARE_ACCOUNT_ID` | ✅ Set | Cloudflare account binding |
| `CMS_API_URL` | ✅ Set | Contact form submission endpoint |
| `GH_WORKER_TOKEN` | ✅ Set | GitHub API access for inquiry worker |
| `RESEND_API_KEY` | ⚠️ Missing | Email notifications from inquiry worker |

---

## Next Steps
1. Set `RESEND_API_KEY` secret for email notifications.
2. Implement custom CMS backend for content editing.
3. Verify full site navigation and language switching on deployed Pages domain.
