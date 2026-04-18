# LTCPA Architecture Guide

> 系統架構總覽 — 給未來維護者、新接手開發者、和健忘的未來自己。

---

## 1. 技術棧

| 層級 | 技術 | 用途 |
|------|------|------|
| 前端框架 | Next.js 15 (App Router) + React 19 | 靜態導出 (SSG) |
| 語言 | TypeScript 5.8 | 型別安全 |
| 樣式 | Tailwind CSS 3.4 | 原子化 CSS |
| UI 圖標 | Lucide React | 所有圖標 |
| 圖片 | 無優化 (`unoptimized: true`) | Cloudflare Pages 靜態託管 |
| 後端 API | Cloudflare Workers (TypeScript) | 邊緣計算 |
| 數據存儲 | Cloudflare KV | CMS 內容 (JSON) |
| 文件存儲 | Cloudflare R2 | 上傳圖片 |
| 表單數據 | Cloudflare D1 (SQLite) | 聯絡表單提交 |
| CI/CD | GitHub Actions | 自動構建與部署 |
| 託管 | Cloudflare Pages | 靜態網站 |

---

## 2. 目錄結構

```
LTCPA/
├── app/                          # Next.js App Router
│   ├── [lang]/                   # 語言路由 (zh-hant, zh-hans, en)
│   │   ├── page.tsx              # 首頁
│   │   ├── about/page.tsx        # 關於我們
│   │   ├── services/page.tsx     # 服務總覽
│   │   ├── services/[slug]/page.tsx  # 服務詳情 (audit/tax/risk/forensic/consulting/deals)
│   │   ├── contact/page.tsx      # 聯絡我們
│   │   ├── team/page.tsx         # 團隊
│   │   ├── news/page.tsx         # 新聞列表
│   │   ├── news/[slug]/page.tsx  # 新聞詳情
│   │   ├── career/page.tsx       # 人才招募
│   │   └── globals.css           # 全局樣式
│   ├── layout.tsx                # 根佈局
│   └── page.tsx                  # 默認重定向到 /zh-hant/
│
├── components/                   # React 組件
│   ├── pages/                    # 頁面級組件
│   ├── sections/                 # 區塊級組件 (Hero, Services, Footer...)
│   └── ui/                       # 通用 UI (Header, SearchOverlay, Button...)
│
├── lib/                          # 工具庫與配置
│   ├── cms-defaults.ts           # CMS 默認數據（權威備份）
│   ├── cms-data.ts               # 運行時 CMS 數據加載器
│   ├── cms-types.ts              # TypeScript 類型定義
│   ├── cms.ts                    # CMS 工具函數
│   └── i18n-config.ts            # i18n 配置 (3 語言)
│
├── public/                       # 靜態資源
│   ├── images/                   # 21 張圖片 (hero, services, team, logos...)
│   └── admin/                    # Admin 面板
│       ├── index.html            # 單頁 CMS Admin
│       ├── admin.css             # Admin 樣式 (Tailwind 編譯)
│       └── cms-defaults.json     # 構建時生成的默認數據
│
├── scripts/                      # 構建腳本
│   └── fetch-cms.js              # 拉取 KV + 合併默認值 → src/data/cms.json
│
├── src/data/                     # 構建時生成的數據
│   └── cms.json                  # fetch-cms.js 輸出
│
├── workers/                      # Cloudflare Workers
│   ├── cms-api/                  # CMS API Worker
│   │   ├── src/index.ts          # 端點邏輯
│   │   └── wrangler.toml         # 綁定配置 (KV + R2)
│   └── inquiry-api/              # 聯絡表單 Worker
│       ├── src/index.ts          # 表單處理 + D1
│       ├── schema.sql            # D1 數據庫結構
│       └── wrangler.toml         # 綁定配置 (D1)
│
├── .github/workflows/
│   └── deploy.yml                # GitHub Actions: 構建 + 部署
│
├── docs/                         # 項目文檔
│   ├── ARCHITECTURE.md           # 本文件
│   ├── DEPLOYMENT.md             # 部署指南
│   ├── ADMIN_GUIDE.md            # Admin 使用指南
│   ├── MAINTENANCE.md            # 維護手冊
│   └── LESSONS_LEARNED.md        # 踩坑記錄
│
├── AGENTS.md                     # 項目總覽（給 AI Agent）
├── next.config.ts                # Next.js 配置 (export, distDir)
├── tailwind.config.ts            # Tailwind 配置 (brand colors)
└── package.json                  # 依賴與腳本
```

---

## 3. 數據流

### 3.1 構建時 (Build Time)

```
Admin 編輯 → KV 存儲
                ↓
        fetch-cms.js 拉取 KV 數據
                ↓
        + 合併 lib/cms-defaults.ts
                ↓
        寫入 src/data/cms.json
                ↓
        next build (SSG) → dist/
                ↓
        Cloudflare Pages 部署
```

### 3.2 運行時 (Runtime)

```
訪客瀏覽 → 靜態 HTML (無服務器渲染)
                ↓
        AnalyticsTracker.tsx 發送 pageview
                ↓
        ltcpa-cms-api Worker 記錄到 KV
```

### 3.3 Admin 面板數據流

```
Admin 登入 → 拉取 KV 數據
                ↓
        + 合併 /admin/cms-defaults.json
                ↓
        渲染編輯器 (有默認值兜底)
                ↓
        保存 → POST /api/cms/data → 寫入 KV
                ↓
        部署 → POST /api/cms/deploy → GitHub Actions
```

---

## 4. 多語言架構

### 4.1 URL 結構

| 語言 | URL 前綴 | 標籤 |
|------|----------|------|
| 繁體中文 | `/zh-hant/` | 繁體中文 |
| 簡體中文 | `/zh-hans/` | 简体中文 |
| 英文 | `/en/` | English |

### 4.2 CMS 數據結構

所有 CMS 內容按語言分區：

```ts
{
  "zh-hant": { home: {...}, about: {...}, contact: {...}, ... },
  "zh-hans": { home: {...}, about: {...}, contact: {...}, ... },
  "en":      { home: {...}, about: {...}, contact: {...}, ... }
}
```

### 4.3 組件獲取數據

```tsx
import { getLocaleCMS } from "@/lib/cms-data";

export default function Page({ params }: { params: { lang: string } }) {
  const cms = getLocaleCMS(params.lang);
  // cms.home.hero.title, cms.about.intro.body, etc.
}
```

---

## 5. 圖片管理

### 5.1 雙軌制圖片系統

| 類型 | 位置 | 管理方式 | Admin 刪除 |
|------|------|----------|------------|
| 靜態圖片 | `public/images/` | Git 版本控制 | ❌ 不可 (需重新部署) |
| 上傳圖片 | R2 `ltcpa-media` | Admin 上傳 | ✅ 可刪除 |

### 5.2 靜態圖片清單 (21 張)

```
public/images/
├── logo-tc.jpg, logo-sc.jpg, logo-en.jpg     # 語言 Logo
├── hero-bg.jpg, hero-bg-1.jpg, hero-bg-2.jpg, hero-bg-3.jpg  # 首頁輪播
├── service-hero-bg.jpg                        # 服務頁橫幅
├── service-audit.jpg, service-tax.jpg, service-risk.jpg,
│   service-forensic.jpg, service-consulting.jpg, service-deals.jpg  # 服務封面
├── about-team.jpg, about-whychoose.jpg        # 關於頁面
├── team-1.jpg ~ team-4.jpg                    # 團隊成員
└── banner-bg.jpg                              # 通用橫幅
```

### 5.3 R2 圖片 URL 格式

```
https://ltcpa-media.jimsbond007.workers.dev/<filename>
```

---

## 6. Analytics 數據模型

### 6.1 KV 鍵值結構

```
# 每日聚合統計
stats_YYYY-MM-DD → {
  totalViews: number,
  uniqueVisitors: number,
  topPages: [{ page: string, views: number }]
}

# 單次頁面訪問 (TTL: 30 天)
pv_<timestamp>_<random> → {
  page: string,
  referrer: string,
  userAgent: string,
  country: string,
  sessionId: string,
  timestamp: number
}

# 歷史版本 (TTL: 90 天)
cms_data_history_<timestamp>
```

### 6.2 Admin 分析面板顯示

- **概覽卡片**: 總瀏覽量、獨立訪客、日均
- **日趨勢圖**: 7 天 / 30 天柱狀圖
- **熱門頁面**: 訪問量前 5 頁面
- **國家分布**: 訪客地理位置餅圖
- **最近訪問**: 最近 50 條原始記錄（頁面/國家/來源/時間）

---

## 7. Worker 端點詳情

### 7.1 ltcpa-cms-api

```
GET  /api/cms/data              → 讀取 CMS JSON
POST /api/cms/data              → 保存 CMS JSON (需 X-Admin-Token)
POST /api/cms/upload            → 上傳圖片到 R2
GET  /api/cms/media             → 列出 R2 文件
DELETE /api/cms/media/:key      → 刪除 R2 文件
GET  /api/cms/auth/verify       → 驗證 Token
POST /api/cms/deploy            → 觸發 GitHub Actions
GET  /api/cms/analytics/report  → 訪問統計
POST /api/analytics/pageview    → 記錄頁面訪問
POST /api/analytics/interaction → 記錄互動事件
```

### 7.2 ltcpa-inquiry-api

```
POST /api/inquiry               → 提交聯絡表單 → D1
GET  /api/inquiry               → 查詢所有提交 (Admin)
```

### 7.3 CORS 配置

兩個 Worker 都允許以下來源：
- `https://ltgroupcpa.jkdcoding.com`
- `https://ltcpa-website.pages.dev`
- `http://localhost:3000` (開發)

---

## 8. 關鍵文件索引

| 目的 | 文件 |
|------|------|
| 修改品牌色 | `tailwind.config.ts` |
| 修改默認內容 | `lib/cms-defaults.ts` |
| 修改組件邏輯 | `components/sections/` 或 `components/ui/` |
| 修改頁面結構 | `app/[lang]/**/page.tsx` |
| 修改 Admin UI | `public/admin/index.html` |
| 修改 Worker API | `workers/cms-api/src/index.ts` |
| 修改表單處理 | `workers/inquiry-api/src/index.ts` |
| 修改構建流程 | `scripts/fetch-cms.js` |
| 修改部署流程 | `.github/workflows/deploy.yml` |
| 修改 i18n | `lib/i18n-config.ts` |

---

## 9. 設計系統

### 9.1 品牌色

| 名稱 | Hex | 用途 |
|------|-----|------|
| Navy | `#1a3a5c` | 主色、標題、Header |
| Gold | `#c9a227` | 強調、CTA、高亮、圖標 |
| Cream | `#f7fafc` | 背景色 |
| Text Dark | `#2d3748` | 正文 |
| Text Light | `#718096` | 次要文字 |

### 9.2 字體

```css
font-family: "Noto Sans TC", "Noto Sans SC", "Inter", system-ui, sans-serif;
font-family: "Playfair Display", Georgia, serif;  /* 標題用 */
```

### 9.3 斷點

Tailwind 默認斷點：
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
