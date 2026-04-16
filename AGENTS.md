# LTCPA Project Agent Guide

## Project Status
**Current State:** Repository cleared for Next.js rewrite (2026-04-14).  
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
| Pages Project | `ltcpa-website` | Active (empty placeholder deployed) |
| Pages Domain | `https://ltcpa-website.pages.dev` | Active |
| Custom Domain | `ltgroupcpa.jkdcoding.com` | Bound to Pages project |
| Worker | `ltcpa-cms-worker` | Active (reset to minimal 503 response) |
| KV Namespace | `LTCPA_CMS` (`ca4e0945e6fc4ef590e4a57548da7626`) | Empty (framework retained) |
| R2 Bucket | `ltcpa-media` | Empty (recreated, framework retained) |

---

## Cloudflare API Token
**Stored locally in:** `E:\Projects\LTCPA\.cloudflare-token` (not tracked by Git)

---

## GitHub Repository
```
https://github.com/twmeric/chrisacc
```
Cleared to a fresh history. Only `README.md` remains.

---

## Next Steps
- Initialize Next.js project in `E:\Projects\LTCPA`.
- Rebuild site using backed-up HTML as reference.
- Re-deploy to Cloudflare Pages (`ltcpa-website`) when ready.
