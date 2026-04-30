# LTCPA 系統架構與設計文檔 (SA&D)

> System Architecture & Design Document — 立堅會計師事務所官方網站
> 版本: v2.0 | 更新日期: 2026-04-30

---

## 1. 系統架構總覽

### 1.1 架構圖

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              用戶層 (Client)                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ 瀏覽器訪客   │  │ Admin 管理員 │  │ WhatsApp  │  │ CloudWapi 服務      │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────────────────────┘ │
└─────────┼────────────────┼────────────────┼──────────────────────────────────┘
          │                │                │
          ▼                ▼                │
┌─────────────────────────────────────────────────────────────────────────────┐
│                            邊緣層 (Edge)                                     │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────────┐  │
│  │   Cloudflare Pages          │  │   Cloudflare Workers                │  │
│  │   (ltcpa-website)           │  │                                     │  │
│  │   - 靜態 HTML/CSS/JS        │  │   ltcpa-cms-api                     │  │
│  │   - 全局 CDN 分發           │  │   ├── CMS CRUD (KV)                 │  │
│  │                             │  │   ├── 圖片上傳/刪除 (R2)            │  │
│  │                             │  │   ├── 部署觸發 (GitHub Actions)     │  │
│  │                             │  │   └── Analytics 收集                │  │
│  │                             │  │                                     │  │
│  │                             │  │   ltcpa-inquiry-api                 │  │
│  │                             │  │   ├── 表單驗證與存儲 (D1)           │  │
│  │                             │  │   ├── WhatsApp 通知 (CloudWapi)   │  │
│  │                             │  │   └── Email 通知 (Resend)         │  │
│  └─────────────────────────────┘  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
          │                           │
          ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            數據層 (Data)                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │ Cloudflare KV│  │ Cloudflare R2│  │ Cloudflare D1│  │ GitHub Actions  │ │
│  │ (cms_data)   │  │ (ltcpa-media)│  │ (ltcpa-d1)   │  │ (CI/CD Pipeline)│ │
│  │ - CMS JSON   │  │ - 上傳圖片   │  │ - inquiries  │  │ - Build & Deploy│ │
│  │ - Analytics  │  │ - Media Gallery│ │ - pageviews  │  │ - Worker Deploy │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 技術棧矩陣

| 層級 | 技術 | 版本 | 用途 |
|------|------|------|------|
| 前端框架 | Next.js | 15.5 | App Router, 靜態導出 |
| UI 庫 | React | 19 | 組件化開發 |
| 語言 | TypeScript | 5.8 | 型別安全 |
| 樣式 | Tailwind CSS | 3.4 | 原子化 CSS |
| 圖標 | Lucide React | - | 所有圖標 |
| 後端 | Cloudflare Workers | - | 邊緣計算 API |
| CMS 存儲 | Cloudflare KV | - | JSON 內容存儲 |
| 文件存儲 | Cloudflare R2 | - | 圖片上傳 |
| 表單數據 | Cloudflare D1 | - | SQLite 數據庫 |
| CI/CD | GitHub Actions | - | 自動構建部署 |
| 託管 | Cloudflare Pages | - | 靜態網站 CDN |
| WhatsApp | CloudWapi | - | 消息通知 API |
| 郵件 | Resend API | - | 郵件通知 (可選) |

---

## 2. 數據架構

### 2.1 CMS 數據模型

```typescript
interface CMSData {
  // 按語言分區
  "zh-hant": LocaleCMS;
  "zh-hans": LocaleCMS;
  "en": LocaleCMS;
}

interface LocaleCMS {
  site: {
    name: string;
    whatsapp: string;      // WhatsApp 通知接收號碼（優先）
    logo: string;
    // ...
  };
  header: {
    nav: Array<{ label: string; href: string }>;
    // ...
  };
  footer: {
    contact: { whatsapp: string; phone: string; email: string };
    social: { facebook: string; instagram: string; linkedin: string };
    // ...
  };
  home: {
    hero: { title: string; subtitle: string; cta: string; images: string[] };
    services: Array<{ title: string; desc: string; image: string; href: string }>;
    stats: Array<{ value: string; label: string }>;
    // ...
  };
  about: { /* ... */ };
  contact: {
    form: { /* 表單文案 */ };
    map: { title: string; address: string };
    // ...
  };
  services: { overview: { /* ... */ } };
  servicePages: Array<{
    slug: string;
    hero: { title: string; subtitle: string; image: string };
    scopeItems: Array<{
      title: string; subtitle: string; icon: string;
      body: string; features: string[];
    }>;
    extraSections: Array<{ title: string; items: Array<{ icon: string; title: string; desc: string }> }>;
  }>;
}
```

### 2.2 數據合併策略

```
權威源（Authority Hierarchy）
├── lib/cms-defaults.ts          # 代碼級默認值（永不為空，兜底）
├── KV (cms_data)                # 運行時用戶編輯值（優先）
└── src/data/cms.json            # 構建時快照

合併策略:
  構建時:  KV data + defaults → cms.json（KV 優先，defaults 兜底）
  Admin:   defaults + KV data → 編輯器（defaults 兜底，防字段缺失）
  運行時:  cms.json + defaults → 頁面（雙重保險）

合併規則:
  - undefined / "" / [] 視為「無值」，不覆蓋默認值
  - 對象遞歸 deepMerge
  - 數組中的對象逐項合併（不是整個替換）
```

### 2.3 D1 數據庫結構

```sql
-- inquiries 表：聯絡表單提交
CREATE TABLE inquiries (
  id TEXT PRIMARY KEY,           -- UUID
  name TEXT NOT NULL,            -- 姓名
  company TEXT NOT NULL,         -- 公司
  email TEXT NOT NULL,           -- 電郵
  phone TEXT,                    -- 電話
  service TEXT,                  -- 服務類型
  message TEXT,                  -- 訊息
  status TEXT DEFAULT 'new',     -- new / contacted / closed
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2.4 KV Analytics 數據結構

```
# 每日聚合統計（手動計算）
stats_YYYY-MM-DD → {
  totalViews: number,
  uniqueVisitors: number,
  topPages: Array<{ page: string, views: number }>
}

# 單次頁面訪問（TTL: 30 天）
pv_<timestamp>_<random> → {
  page: string,
  referrer: string,
  userAgent: string,
  country: string,
  sessionId: string,
  timestamp: number
}

# CMS 歷史備份（TTL: 90 天）
cms_data_history_<timestamp> → { /* 完整 CMS JSON */ }
```

---

## 3. API 設計

### 3.1 ltcpa-cms-api

| Method | Path | Auth | Request | Response | Description |
|--------|------|------|---------|----------|-------------|
| GET | `/api/cms/data` | - | - | CMS JSON | 讀取完整 CMS 數據 |
| POST | `/api/cms/data` | X-Admin-Token | `{data}` | `{success}` | 深層合併保存到 KV |
| POST | `/api/cms/upload` | X-Admin-Token | FormData | `{url}` | 上傳圖片到 R2 |
| GET | `/api/cms/media` | X-Admin-Token | - | `{files: []}` | 列出 R2 文件 |
| DELETE | `/api/cms/media/:key` | X-Admin-Token | - | `{success}` | 刪除 R2 文件 |
| GET | `/api/cms/auth/verify` | X-Admin-Token | - | `{valid}` | 驗證 Token |
| POST | `/api/cms/deploy` | X-Admin-Token | - | `{success}` | 觸發 GitHub Actions |
| GET | `/api/cms/analytics/report` | X-Admin-Token | `?days=N` | `{stats}` | 訪問統計報表 |
| POST | `/api/analytics/pageview` | - | `{page, referrer, ...}` | `{success}` | 記錄頁面訪問 |
| POST | `/api/analytics/interaction` | - | `{type, ...}` | `{success}` | 記錄互動事件 |

### 3.2 ltcpa-inquiry-api

| Method | Path | Auth | Request | Response | Description |
|--------|------|------|---------|----------|-------------|
| POST | `/` | - | JSON Form | `{success, id, notifications}` | 提交聯絡表單 |
| GET | `/api/test/whatsapp` | - | `?to=number` | `{status, response}` | 調試：測試 WhatsApp 發送 |

#### 表單提交響應格式

```json
{
  "success": true,
  "id": "uuid-string",
  "notifications": {
    "whatsapp": {
      "success": true,
      "to": "85255055692",
      "msg": "Message sent successfully!"
    },
    "email": {
      "success": false,
      "error": "Missing RESEND_API_KEY"
    }
  }
}
```

### 3.3 CORS 配置

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

> 生產域名限制在 Worker 內部實現，僅允許：
> - `https://ltgroupcpa.jkdcoding.com`
> - `https://ltcpa-website.pages.dev`
> - `http://localhost:3000` (開發)

---

## 4. 組件架構

### 4.1 前端組件層次

```
app/
├── layout.tsx              # 根佈局（AnalyticsTracker, Header, Footer）
├── page.tsx                # 默認重定向 /zh-hant/
└── [lang]/
    ├── layout.tsx          # 語言佈局（語言切換、字体加載）
    ├── page.tsx            # 首頁（HomePage）
    ├── contact/
    │   └── page.tsx        # 聯絡頁（ContactForm, MapSection, FAQSection）
    ├── services/
    │   ├── page.tsx        # 服務總覽
    │   └── [slug]/
    │       └── page.tsx    # 服務詳情
    └── ...

components/
├── ui/                     # 通用 UI 組件
│   ├── Header.tsx          # 導航欄 + 語言切換
│   ├── Footer.tsx          # 頁腳 + WhatsApp + 社交鏈接
│   ├── PageBanner.tsx      # 頁面橫幅
│   ├── SearchOverlay.tsx   # 站內搜索（Ctrl+K）
│   └── Button.tsx          # 通用按鈕
├── sections/               # 頁面區塊組件
│   ├── HeroSection.tsx     # 首頁 Hero
│   ├── ServicesSection.tsx # 服務卡片網格
│   ├── ContactForm.tsx     # 聯絡表單
│   └── ...
└── pages/                  # 頁面級組件
    └── ...
```

### 4.2 數據流設計

```
構建時:
lib/cms-defaults.ts ──┐
                      ├──→ lib/cms-data.ts → getLocaleCMS(lang) → 頁面組件
KV (fetch-cms.js) ────┘

運行時 (Admin):
KV cms_data ────┐
                ├──→ public/admin/cms-defaults.json → deepMerge → Admin UI
cms-defaults.ts─┘
```

---

## 5. WhatsApp 通知架構

### 5.1 數據流

```
用戶提交表單
    │
    ▼
ltcpa-inquiry-api Worker
    │
    ├──→ D1 (保存記錄)
    │
    ├──→ CloudWapi API (POST JSON)
    │       ├──→ sender: 85262322466 (CloudWapi 發送者手機)
    │       └──→ recipient: 85255055692 (KV site.whatsapp)
    │
    └──→ Resend API (可選，需 RESEND_API_KEY)
```

### 5.2 號碼來源優先級

```
KV site.whatsapp (Admin 面板 Site Settings)
    ↓
Worker var ADMIN_PHONE (可選後備)
    ↓
硬編碼 fallback "85255055692"
```

### 5.3 CloudWapi 集成細節

| 項目 | 值 |
|------|-----|
| Endpoint | `https://unofficial.cloudwapi.in/send-message` |
| Method | POST JSON |
| Headers | `Content-Type: application/json` |
| Body | `{ api_key, sender, number, message }` |
| Response | `{ status: true, msg: "Message sent successfully!" }` |

> **重要**: CloudWapi 的 GET 請求在 Cloudflare Workers 環境中會被攔截返回 400，必須使用 POST JSON。Workers 的 `JSON.stringify()` 正確處理中文 UTF-8。

---

## 6. 安全架構

### 6.1 認證授權

```
Admin 登入:
  1. 輸入密碼 → POST /api/cms/auth/verify
  2. Worker 驗證密碼 → 返回 Token
  3. Token 存儲在 localStorage
  4. 後續請求帶 X-Admin-Token header

Token 驗證:
  - 無過期機制（單頁應用限制）
  - Token = base64(密碼 + 時間戳)
```

### 6.2 Secrets 管理

| Secret | 存儲位置 | 用途 | 風險等級 |
|--------|----------|------|----------|
| `CLOUDFLARE_API_TOKEN` | GitHub Secret | CI/CD 部署 | 高 |
| `GITHUB_TOKEN` | Worker Secret (cms-api) | 觸發 Actions | 高 |
| `CLOUDWAPI_API_KEY` | Worker Secret (inquiry-api) | WhatsApp API | 中 |
| `CLOUDWAPI_SENDER` | Worker Secret (inquiry-api) | 發送者號碼 | 低 |
| `RESEND_API_KEY` | Worker Secret (inquiry-api) | 郵件 API | 中 |
| `ADMIN_PASSWORD` | Worker var (cms-api) | Admin 登入 | 中 |

### 6.3 防護措施

| 威脅 | 防護 |
|------|------|
| XSS | DOMPurify + 輸出轉義 |
| SQL 注入 | D1 參數化查詢 |
| CSRF | CORS 嚴格限制來源 |
| 暴力破解 | 無速率限制（需添加） |
| 表單濫用 | 無 CAPTCHA（需添加） |

---

## 7. 部署架構

### 7.1 CI/CD Pipeline

```
git push origin main
    │
    ▼
GitHub Actions (.github/workflows/deploy.yml)
    │
    ├──→ npm ci
    │
    ├──→ npm run build
    │       ├──→ build:admin-css (Tailwind → admin.css)
    │       ├──→ fetch-cms (KV → src/data/cms.json)
    │       └──→ next build (SSG → dist/)
    │
    ├──→ Deploy Pages (dist/ → Cloudflare Pages)
    │
    ├──→ Deploy Worker (workers/cms-api → Wrangler)
    │
    └──→ Deploy Worker (workers/inquiry-api → Wrangler)
```

### 7.2 環境對照

| 環境 | 域名 | 觸發方式 |
|------|------|----------|
| 生產 | `https://ltgroupcpa.jkdcoding.com` | push to `main` |
| 預覽 | `https://<branch>.ltcpa-website.pages.dev` | 其他分支（不推薦） |
| 開發 | `http://localhost:3000` | `npm run dev` |

### 7.3 回滾策略

| 類型 | 方法 |
|------|------|
| 代碼回滾 | `git revert HEAD && git push origin main` |
| CMS 數據回滾 | 從 KV `cms_data_history_<timestamp>` 恢復 |
| Worker 回滾 | `npx wrangler rollback` |

---

## 8. 監控與運維

### 8.1 日誌

| 來源 | 內容 | 查看方式 |
|------|------|----------|
| Worker Console | API 請求、錯誤、通知狀態 | `wrangler tail` / Cloudflare Dashboard |
| 瀏覽器 Console | 前端錯誤、調試信息 | 瀏覽器 DevTools |
| GitHub Actions | 構建日誌、部署狀態 | GitHub → Actions |

### 8.2 健康檢查點

| 檢查項 | 頻率 | 方法 |
|--------|------|------|
| 網站可訪問 | 持續 | Cloudflare Pages 內建監控 |
| Worker 狀態 | 每月 | Cloudflare Dashboard |
| KV 數據完整性 | 每月 | Admin 面板檢查 |
| D1 數據庫大小 | 每季 | Cloudflare Dashboard |
| R2 存儲使用 | 每季 | Cloudflare Dashboard |
| 依賴安全 | 每季 | `npm audit` |

### 8.3 告警閾值

| 指標 | 閾值 | 行動 |
|------|------|------|
| Pages 構建失敗 | 連續 2 次 | 檢查 GitHub Actions 日誌 |
| Worker 錯誤率 | > 5% | 檢查 `wrangler tail` |
| D1 存儲 | > 90% | 清理舊記錄或升級 |
| KV 讀寫 | > 免費層限制 | 評估升級需求 |

---

## 9. 擴展設計

### 9.1 添加新頁面

```
1. app/[lang]/newpage/page.tsx
2. lib/cms-defaults.ts → 添加 newpage 數據（3 語言）
3. public/admin/index.html → 添加編輯區塊
4. lib/i18n-config.ts → 如需新路由配置
5. npm run build → 測試 → git commit → git push origin main
```

### 9.2 添加新 CMS 字段

```
1. lib/cms-defaults.ts → 添加字段（3 語言）
2. lib/cms-types.ts → 更新 TypeScript 類型
3. public/admin/index.html → 添加 UI 輸入控件
4. public/admin/index.html → collectSection() 添加收集邏輯
5. 消費組件 → getLocaleCMS() 讀取新字段
```

### 9.3 未來可能的擴展

| 功能 | 技術方案 | 複雜度 |
|------|----------|--------|
| 博客系統 | 新增 D1 表 + 路由 | 中 |
| 客戶登入 | Cloudflare Access + D1 | 高 |
| 在線預約 | D1 + Calendar API | 高 |
| 多站點 | 同一 Worker + 不同 KV key | 低 |
| WebP 圖片轉換 | R2 + Workers 圖片處理 | 中 |
| CAPTCHA | hCaptcha / Cloudflare Turnstile | 低 |

---

## 10. 變更記錄

| 日期 | 版本 | 變更 |
|------|------|------|
| 2026-04-23 | v1.0 | 初始架構文檔 |
| 2026-04-30 | v2.0 | 重構為完整 SA&D；添加 CloudWapi 架構；更新數據合併策略；添加監控與擴展設計 |
