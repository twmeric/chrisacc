# LTCPA Maintenance Playbook

> 維護手冊 — 常見問題快速修復，無需翻閱全部文檔。

---

## 🔥 熱修復 (Hot Fixes)

### 1. Admin 登入失敗
- 驗證 `API_BASE` 指向 `https://ltcpa-cms-api.jimsbond007.workers.dev/api/cms`
- 檢查 Worker `ADMIN_PASSWORD` = `admin360`
- 如果修改了密碼，同步更新 `AGENTS.md` 和本文件

### 2. Deploy 按鈕 401
- Token 過期或密碼已更改
- **解決**: 重新登入 Admin

### 3. Deploy 按鈕 502 / "GITHUB_TOKEN secret is missing"
- Worker 缺少 GitHub PAT
- **解決**: Cloudflare Dashboard → `ltcpa-cms-api` → Settings → Variables and Secrets → 添加 Secret `GITHUB_TOKEN`
- Token 需要 `repo` + `workflow` scope
- ⚠️ **不要在聊天中粘貼 Token**

### 4. Deploy 按鈕 500 / "Body has already been used"
- 已修復的已知 bug
- 如再現，檢查 `workers/cms-api/src/index.ts` 是否正確使用 `resp.clone()`

### 5. Media Gallery "No media found"
- `public/images-manifest.json` 缺失
- **解決**: `npm run build` 重新生成
- R2 圖片需要 `ltcpa-media` bucket 正確綁定

### 6. Analytics 404
- 兩個路徑都已支持：`/api/cms/analytics/report` 和 `/api/analytics/report`
- 如果仍 404，檢查 Worker 是否成功部署

### 7. 新 Logo 不顯示
- Logo 是語言特定的：`/images/logo-tc.jpg`, `/images/logo-sc.jpg`, `/images/logo-en.jpg`
- 替換正確文件 → commit → push to `main`
- 不要重命名文件

### 8. 聯絡表單不工作
- 檢查 `ltcpa-inquiry-api` Worker 狀態
- 檢查 D1 綁定 `LTCPA_D1` 是否正確
- 檢查 `NEXT_PUBLIC_INQUIRY_API_URL` GitHub Secret

### 9. 網站顯示舊內容
- `fetch-cms.js` 構建時拉取 KV
- **解決**: Admin → 修改任意內容 → "Deploy Site" 觸發重建

### 10. Scope Items 顯示不全或缺失字段
- 已修復的已知 bug（KV 與默認值合併問題）
- **解決**: 刷新 Admin 頁面，確保 `cms-defaults.json` 正確加載
- 如果仍出現，檢查 `lib/cms-defaults.ts` 是否包含完整的 `serviceDetails[].scopeItems`

### 11. WhatsApp 按鈕不工作
- 檢查 Admin → Site Settings → WhatsApp 號碼是否填寫
- 或檢查 Contact 頁面的 WhatsApp 字段
- 號碼格式：無空格，無 `+`，如 `85291234567`

---

## 🆕 添加新頁面

1. `app/[lang]/newpage/page.tsx`
2. `lib/i18n-config.ts` — 如需新路由配置
3. `lib/cms-defaults.ts` — 添加內容（3 語言）
4. `public/admin/index.html` — 添加編輯區塊
5. `npm run build` → 測試 → `git commit` → `git push origin main`

---

## 🆕 添加新 CMS 字段

1. `lib/cms-defaults.ts` — 添加字段（3 語言）
2. `lib/cms-types.ts` — 更新類型
3. `public/admin/index.html` — 添加 UI 輸入
4. `public/admin/index.html` — `collectSection()` 添加收集邏輯
5. 消費組件 — `getLocaleCMS()` 讀取新字段

---

## 🧪 Worker 本地測試

```bash
# CMS Worker
cd workers/cms-api
npx wrangler dev

# Inquiry Worker
cd workers/inquiry-api
npx wrangler dev
```

本地開發 URL: `http://localhost:8787`

---

## 📊 監控檢查點

| 檢查項 | 命令/方法 | 頻率 |
|--------|----------|------|
| 構建成功 | `npm run build` | 每次提交前 |
| Pages 部署狀態 | GitHub Actions 頁面 | 每次推送後 |
| Worker 狀態 | Cloudflare Dashboard | 每月 |
| KV 數據完整性 | Admin 面板檢查各頁面 | 每月 |
| R2 存儲使用 | Cloudflare Dashboard → R2 | 每季 |
| D1 數據庫大小 | Cloudflare Dashboard → D1 | 每季 |
| 依賴安全 | `npm audit` | 每季 |

---

## 🆘 緊急聯繫

- Developer: JKDCoding
- Repo: https://github.com/twmeric/chrisacc
- 完整文檔: `docs/` 目錄
- 項目總覽: `AGENTS.md`
