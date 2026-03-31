# Chris & Associates 會計師事務所網站

## 專案概述

基於 e-corp/bigbang 架構復刻的專業會計師事務所網站，參考 https://nis.kkairsoft.com/chrisacc/005/index-en.html

## 技術棧

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion (動畫)
- Lucide React (圖標)

## 專案結構

```
chrisacc/
├── src/
│   ├── app/
│   │   ├── globals.css      # 全局樣式
│   │   ├── layout.tsx       # 根佈局
│   │   └── page.tsx         # 主頁面
│   ├── components/
│   │   ├── Navigation.tsx   # 導航欄（含手機版下拉選單）
│   │   ├── Hero.tsx         # 首頁英雄區
│   │   ├── About.tsx        # 關於我們（使命/願景/承諾）
│   │   ├── Services.tsx     # 服務範圍
│   │   ├── Footer.tsx       # 頁腳（含完整服務列表）
│   │   └── LanguageSwitcher.tsx  # 語言切換器
│   ├── context/
│   │   └── CMSContext.tsx   # CMS 數據管理 + 多語言支持
│   └── data/
│       └── cms.json         # 多語言內容數據
├── public/
│   ├── logo.png             # Logo
│   └── team-hands.jpg       # 團隊圖片
└── dist/                    # 構建輸出
```

## 已實現功能

### 1. 多語言支持 (英文/繁體/簡體)
- 英文版為主版本
- 繁體中文版
- 簡體中文版
- 右下角浮動語言切換器

### 2. 手機版導航優化
- 點擊「三橫」只顯示主項（首頁/關於我們/服務範圍/聯絡我們）
- 點擊主項後展開子項
- 子項包含：
  - 關於我們：使命/願景/承諾
  - 服務範圍：審計/稅務/風險/法證/諮詢/併購

### 3. About Us 區塊修改
- 移除了上方的圖片
- 保留團隊圖片（4隻手概念）
- 圖片縮放至 85%

### 4. Our Services 修改
- 主選單只顯示主要服務卡片
- 所有子選項移至 Footer 底部

### 5. 聯繫信息
- 電話：+852 3987 1008
- 顯示在導航欄、頁腳 CTA 區域

## 構建與部署

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 構建靜態站點
npm run build

# 輸出目錄: dist/
```

## Cloudflare Pages 部署

```bash
# 使用 Wrangler 部署
npx wrangler pages deploy dist --project-name=chrisacc
```

## 內容管理

內容存儲在 `src/data/cms.json`，支持：
- 英文原版（默認）
- 繁體中文（Zh 後綴）
- 簡體中文（Cn 後綴）

語言切換通過 localStorage 持久化存儲。
