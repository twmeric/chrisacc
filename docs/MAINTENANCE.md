# LTCPA Maintenance Playbook

## Quick Fixes

### 1. Admin login fails
- Verify `API_BASE` in the admin page header points to `https://ltcpa-cms-api.jimsbond007.workers.dev/api/cms`
- Check that Worker `ltcpa-cms-api` has env var `ADMIN_PASSWORD` = `admin360`
- If you changed the password, also update this doc and `AGENTS.md`

### 2. Deploy button shows 401
- This means the `X-Admin-Token` is rejected by the Worker.
- Solution: re-login with the correct password.
- If password is correct but still 401, check Worker secret `GITHUB_TOKEN` is set (not missing).

### 3. Deploy button shows 500 / "Body has already been used"
- This was a known bug where the GitHub dispatch response was consumed twice.
- **Fixed** in current `workers/cms-api/src/index.ts`.
- If it reappears, ensure `resp.clone().text()` is used before any conditional re-read.

### 4. Media Gallery shows "No media found"
- Check `public/images-manifest.json` exists after build.
- If missing, `scripts/fetch-cms.js` may have crashed during image scan. Re-run `npm run build`.
- R2 images require `ltcpa-media` bucket binding in `wrangler.toml`.

### 5. Analytics shows 404
- Ensure the Worker path includes `/api/cms/analytics/report` (not just `/api/analytics/report`).
- Both paths are supported in the current Worker code.

### 6. New logo not showing on site
- Logos are language-specific: `/images/logo-tc.jpg`, `/images/logo-sc.jpg`, `/images/logo-en.jpg`
- Replace the correct file in `public/images/`, commit, and push to `main`.
- Do not rename the files — the CMS defaults and layout rely on those exact paths.

### 7. Contact form not working
- Check `ltcpa-inquiry-api` Worker is deployed and D1 binding `DB` is correct.
- Check `NEXT_PUBLIC_INQUIRY_API_URL` is set in GitHub Actions secrets.

### 8. Site builds but shows old content
- `fetch-cms.js` pulls from KV at build time. If KV has stale data, the site will show stale content.
- Edit content in Admin → click **Deploy Site** to trigger a rebuild with fresh KV data.

---

## Adding a New Page

1. Create `app/[lang]/newpage/page.tsx`
2. Add route to `lib/i18n-config.ts` if it needs language-aware navigation
3. Add nav item to `lib/cms-defaults.ts` (all 3 locales)
4. Add CMS section in `public/admin/index.html`
5. Build and push to `main`

---

## Worker Local Testing

```bash
cd workers/cms-api
npx wrangler dev

cd workers/inquiry-api
npx wrangler dev
```

---

## Contact

- Developer: JKDCoding
- Repo: https://github.com/twmeric/chrisacc
