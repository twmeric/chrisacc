# Chris & Associates 會計師事務所網站

[![Deploy to Cloudflare Pages](https://github.com/{username}/{repo}/actions/workflows/deploy.yml/badge.svg)](https://github.com/{username}/{repo}/actions/workflows/deploy.yml)

專業會計師事務所網站 - 提供審計、稅務、風險、法證、諮詢及併購服務。

## 🌐 線上預覽

- **Production**: https://chrisacc.pages.dev
- **自定義域名**: (待配置)

## 🚀 快速開始

### 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 訪問 http://localhost:3000
```

### 構建

```bash
npm run build
```

構建輸出位於 `dist/` 目錄。

## 📋 功能特性

- ✅ 單頁面設計 (SPA)
- ✅ 三語言支持（英文/繁體/簡體）
- ✅ 響應式設計（桌面/平板/手機）
- ✅ 手機版下拉選單
- ✅ 平滑滾動動畫
- ✅ CI/CD 自動部署

## 🛠️ 技術棧

- **框架**: Next.js 16 + React 19
- **語言**: TypeScript
- **樣式**: Tailwind CSS 4
- **動畫**: Framer Motion
- **圖標**: Lucide React
- **部署**: Cloudflare Pages
- **CI/CD**: GitHub Actions

## 🔄 自動部署

本專案使用 GitHub Actions 自動部署到 Cloudflare Pages：

1. 推送代碼到 `main` 分支
2. GitHub Actions 自動觸發
3. 構建並部署到 Cloudflare Pages
4. 約 2-3 分鐘後線上更新

詳情請參閱 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📁 專案結構

```
chrisacc/
├── .github/workflows/    # GitHub Actions 工作流
├── src/
│   ├── app/             # Next.js 頁面
│   ├── components/      # React 組件
│   ├── context/         # Context Provider
│   └── data/            # 內容數據 (JSON)
├── public/              # 靜態資源
└── dist/                # 構建輸出
```

## 🌍 多語言內容

內容管理位於 `src/data/cms.json`：

- 英文內容：默認字段
- 繁體中文：`*Zh` 後綴字段
- 簡體中文：`*Cn` 後綴字段

## 📞 聯繫信息

- **電話**: +852 3987 1008
- **電郵**: info@chrisacc.com

## 📝 授權

© 2024 Chris & Associates. All rights reserved.
