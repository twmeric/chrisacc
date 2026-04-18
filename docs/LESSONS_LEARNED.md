# LTCPA Lessons Learned

> 踩坑記錄、設計決策、和最佳實踐 — 讓未來的自己和接手者少走彎路。

---

## 1. 架構決策

### 1.1 為什麼選擇 Cloudflare 全棧？

| 考量 | 決策 | 結果 |
|------|------|------|
| 成本 | 零託管費用 | ✅ Pages + Workers + KV + R2 + D1 全免費 |
| 速度 | 邊緣部署 | ✅ 全球 CDN，TTFB < 50ms |
| 複雜度 | 無服務器管理 | ✅ 不需要 VPS、不需要 Docker |
| 靜態導出 | Next.js `output: 'export'` | ⚠️ 失去 SSR，但足夠靜態內容網站 |

**結論**: 對於內容型網站，Cloudflare 全棧是最佳選擇。不要為了技術而技術。

### 1.2 為什麼用 KV 而不是數據庫？

CMS 數據是整塊 JSON，讀寫頻率低（僅 Admin 編輯時）。KV 的單鍵存儲完美匹配這個場景。

> 缺點：KV 最終一致性，保存後有短暫延遲。Admin 面板已通過緩存策略緩解。

### 1.3 為什麼 Admin 是單文件 HTML？

```
初期: 想過用 React 單獨構建 Admin
決定: 單文件 HTML + Tailwind CDN/編譯 CSS
原因:
  - 不需要額外構建步驟
  - 部署簡單（隨網站一起部署）
  - 足夠輕量
  - 不依賴 Next.js 運行時
```

---

## 2. 踩坑記錄

### 2.1 KV 數據與默認值的合併（最痛苦的問題）

**問題**: 服務詳情頁的 Scope Items 經常顯示不全或丟失字段。

**根因鏈**:
```
1. fetch-cms.js 檢測到舊格式 KV 數據 → 刪除 servicePages 條目
2. 網站構建時用 cms-defaults.ts 補全 → 正常顯示
3. Admin 直接讀取 KV → 缺少 servicePages → 顯示異常
4. Admin 保存 → 將不完整的數據寫回 KV
5. 下次構建 → 問題加劇
```

**修復**: 
- `fetch-cms.js` 構建時生成 `public/admin/cms-defaults.json`
- Admin `doLogin()` 執行 `deepMerge(defaults, kvData)` — **注意順序**
- `deepMerge` 需要特殊處理數組對象（逐項合併而不是整個替換）

**代碼教訓**:
```js
// ❌ 錯誤：簡單 Object.assign 會覆蓋數組
const merged = { ...defaults, ...kvData };

// ✅ 正確：deepMerge 逐項合併數組對象
function deepMerge(target, source) {
  // ... 遞歸合併，對數組中的對象逐項 deepMerge
}
```

### 2.2 "Body has already been used" 錯誤

**問題**: Worker 調用 GitHub API 後返回 500。

**根因**: 
```ts
// ❌ 錯誤：讀取 body 兩次
const text = await resp.text();
if (!resp.ok) { /* resp.body 已用完 */ }

// ✅ 正確：使用 clone
const text = await resp.clone().text();
if (!resp.ok) { /* resp 仍可讀 */ }
```

### 2.3 401 但密碼正確

**問題**: Admin 登入時密碼正確但某些操作返回 401。

**根因**: 舊版 Admin 用 `/api/cms/data`（無需認證）做「密碼驗證」，所以任何密碼都能「登入」。

**修復**: 新增 `GET /api/cms/auth/verify` 端點，專門用於驗證 Token。

### 2.4 分析數據 404

**問題**: Admin 分析面板顯示 404。

**根因**: Admin 調用 `/api/cms/analytics/report`，但 Worker 只監聽 `/api/analytics/report`。

**修復**: Worker 同時支持兩個路徑。

### 2.5 生產分支錯配

**問題**: 推送到 `master` 沒有觸發部署。

**根因**: Cloudflare Pages 的生產分支設為 `main`，但本地開發在 `master`。

**修復**: 
- 刪除遠端 `master`
- 所有開發在 `main` 上進行
- 在 AGENTS.md 中明確標註

### 2.6 靜態圖片管理困境

**問題**: Admin Media Gallery 不顯示 `public/images/` 中的圖片。

**根因**: 靜態圖片不是 R2 對象，無法通過 R2 API 列出。

**修復**: 
- `fetch-cms.js` 構建時掃描 `public/images/` 生成 `images-manifest.json`
- Admin 同時讀取 R2 列表和 manifest，合併顯示
- Static 圖片標記 "Read-only"，不顯示刪除按鈕

---

## 3. 設計模式

### 3.1 CMS 數據流的最佳實踐

```
權威源（Authority）
  ├── lib/cms-defaults.ts          # 代碼級默認值（永不為空）
  ├── KV (cms_data)                # 運行時用戶編輯值
  └── src/data/cms.json            # 構建時快照

合併策略:
  構建時: KV + defaults → cms.json（KV 優先，defaults 兜底）
  Admin:  defaults + KV  → 編輯器（defaults 兜底，防止字段缺失）
  運行時: cms.json + defaults → 頁面（雙重保險）
```

### 3.2 圖片雙軌制

```
靜態圖片 (public/images/)
  ├── 用於: 網站核心視覺（Logo、Hero、服務封面）
  ├── 管理: Git + 代碼部署
  └── 限制: 不可刪除、不可動態上傳

R2 圖片 (ltcpa-media)
  ├── 用於: 用戶上傳、替換、新增內容圖片
  ├── 管理: Admin 面板
  └── 優勢: 動態管理、無需重新部署
```

### 3.3 搜索覆蓋層 (SearchOverlay)

實現細節：
- 客戶端 DOM 遍歷所有文本節點
- 排除 `<header>`, `<nav>`, `<footer>`, `<script>`, `<style>`
- 用 `<mark>` 標籤高亮匹配文本
- `scrollIntoView` 自動滾動到當前匹配項
- `Ctrl+K` 打開，`ESC` 關閉

> 這是純前端搜索，不需要後端索引。對於靜態站點足夠高效。

---

## 4. 性能優化

### 4.1 已實施

| 優化 | 方式 |
|------|------|
| 靜態導出 | Next.js `output: 'export'` |
| 圖片無優化 | `unoptimized: true` — 避免 Next.js Image 組件的運行時處理 |
| CDN 全球部署 | Cloudflare Pages 自動 |
| 代碼分割 | Next.js 自動按路由分割 |
| 字體加載 | Google Fonts + `display=swap` |

### 4.2 未來可考慮

- [ ] WebP 格式轉換
- [ ] 圖片延遲加載 (lazy loading)
- [ ] Service Worker 緩存
- [ ] 預加載關鍵資源

---

## 5. 安全注意事項

### 5.1 Token 管理

- `GITHUB_TOKEN` **必須**設置為 Worker Secret，不是普通變量
- 不要在聊天中粘貼 Token（GitHub 會自動撤銷）
- 定期輪換 Token

### 5.2 Admin 面板

- 密碼驗證在 Worker 端進行（不可繞過）
- Token 存儲在 `localStorage`
- 沒有會話過期機制（單頁應用限制）

### 5.3 表單安全

- 聯絡表單有基礎的 XSS 防護（HTML 轉義）
- D1 使用參數化查詢（防 SQL 注入）
- 沒有 CAPTCHA（可能需要添加）

---

## 6. 擴展指南

### 6.1 添加新頁面

```
1. app/[lang]/newpage/page.tsx
2. lib/cms-defaults.ts → 添加 newpage 數據（3 語言）
3. public/admin/index.html → 添加編輯區塊
4. lib/i18n-config.ts → 如需新路由配置
5. npm run build → 測試
6. git commit + push
```

### 6.2 添加新 CMS 字段

```
1. lib/cms-defaults.ts → 添加字段（3 語言）
2. lib/cms-types.ts → 更新 TypeScript 類型
3. public/admin/index.html → 添加輸入控件
4. public/admin/index.html → 在 collectSection() 中添加收集邏輯
5. 消費組件 → 使用 getLocaleCMS() 讀取
```

### 6.3 添加新 Worker 端點

```
1. workers/cms-api/src/index.ts → 添加路由處理
2. npx wrangler deploy → 部署
3. 如需要，更新 Admin 調用代碼
```

---

## 7. 維護清單

### 每月

- [ ] 檢查 Cloudflare 使用量（KV 讀寫、R2 存儲）
- [ ] 審查分析數據，識別異常流量
- [ ] 確認 GitHub Actions 正常運行

### 每季

- [ ] 更新依賴 (`npm audit`, `npm update`)
- [ ] 檢查 R2 存儲，清理不需要的圖片
- [ ] 備份 KV 數據（導出 cms_data）
- [ ] 檢查 D1 數據庫大小

### 每年

- [ ] 輪換 API Token 和密碼
- [ ] 審查 Cloudflare 定價變更
- [ ] 評估是否需要遷移到更高級方案
