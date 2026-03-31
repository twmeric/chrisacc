# 🚀 GitHub + Cloudflare CI/CD 自動化部署指南

## 概述

本專案使用 GitHub Actions 自動部署到 Cloudflare Pages，實現持續集成/持續部署 (CI/CD)。

---

## 📋 前置需求

1. GitHub 帳號
2. Cloudflare 帳號
3. 專案已推送到 GitHub Repository

---

## 🔐 設置 GitHub Secrets

在 GitHub Repository 中設置以下 Secrets：

### 1. 進入 Settings > Secrets and variables > Actions

```
https://github.com/{username}/{repo}/settings/secrets/actions
```

### 2. 添加以下 Secrets

| Secret Name | Value | 說明 |
|-------------|-------|------|
| `CLOUDFLARE_API_TOKEN` | `cfut_wBLHLF7Pk01Jyv62A8CasGGS4IgmeZVEY5zvpOP7df6317bc` | Super Token（全權限） |
| `CLOUDFLARE_ACCOUNT_ID` | `你的 Cloudflare Account ID` | 帳戶 ID |

### 3. 獲取 Cloudflare Account ID

1. 登入 Cloudflare Dashboard: https://dash.cloudflare.com
2. 在右側邊欄找到 **Account ID**
3. 複製並添加到 GitHub Secrets

---

## 📁 專案結構

```
chrisacc/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 工作流
├── src/                        # 源代碼
├── dist/                       # 構建輸出（由 next build 生成）
├── wrangler.toml               # Wrangler 配置
└── DEPLOYMENT_GUIDE.md         # 本指南
```

---

## 🔄 部署流程

### 自動部署觸發條件

| 事件 | 行為 |
|------|------|
| `push` 到 `main` 分支 | 自動部署到 Production |
| `push` 到 `master` 分支 | 自動部署到 Production |
| Pull Request | 創建預覽部署，並在 PR 中評論 |

### 部署步驟

1. **開發階段**
   ```bash
   npm run dev          # 本地開發
   ```

2. **提交更改**
   ```bash
   git add .
   git commit -m "Update website content"
   git push origin main
   ```

3. **自動部署**
   - GitHub Actions 自動觸發
   - 安裝依賴 → 構建 → 部署到 Cloudflare
   - 約 2-3 分鐘完成

---

## 🌐 部署網址

| 環境 | 網址 |
|------|------|
| Production | `https://chrisacc.pages.dev` |
| 自定義域名 | `https://your-domain.com` (可配置) |

---

## 📊 GitHub Actions 工作流詳情

### 工作流文件
`.github/workflows/deploy.yml`

### 執行步驟

1. **Checkout** - 檢出代碼
2. **Setup Node.js** - 設置 Node.js 20
3. **Install dependencies** - 安裝 npm 依賴
4. **Build** - 執行 `next build`
5. **Deploy** - 使用 Wrangler 部署到 Cloudflare Pages

---

## 🛠️ 手動部署（備用）

如需手動部署，可使用以下命令：

```powershell
# 設置 Token
$env:CLOUDFLARE_API_TOKEN="cfut_wBLHLF7Pk01Jyv62A8CasGGS4IgmeZVEY5zvpOP7df6317bc"

# 構建
npm run build

# 部署
npx wrangler pages deploy dist --project-name=chrisacc
```

---

## ⚙️ 自定義域名配置

### 在 Cloudflare Dashboard 配置

1. 進入 Pages 項目: https://dash.cloudflare.com → Pages → chrisacc
2. 點擊 **Custom domains** 標籤
3. 點擊 **Set up a custom domain**
4. 輸入域名（如 `chrisacc.com`）
5. 按提示添加 DNS 記錄

### 使用 Super Token 自動配置

```bash
# 添加自定義域名
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/chrisacc/domains" \
  -H "Authorization: Bearer cfut_wBLHLF7Pk01Jyv62A8CasGGS4IgmeZVEY5zvpOP7df6317bc" \
  -H "Content-Type: application/json" \
  --data '{"name":"chrisacc.com"}'
```

---

## 📝 常見問題

### Q1: 部署失敗怎麼辦？

檢查：
- [ ] GitHub Secrets 是否正確設置
- [ ] `npm run build` 本地是否能成功構建
- [ ] `dist` 目錄是否存在且有 `index.html`

### Q2: 如何查看部署日誌？

1. 進入 GitHub Repository
2. 點擊 **Actions** 標籤
3. 選擇最新的工作流運行
4. 查看各步驟的日誌

### Q3: 如何回滾到上一個版本？

1. 進入 Cloudflare Dashboard → Pages → chrisacc
2. 點擊 **Deployments** 標籤
3. 找到要回滾的版本
4. 點擊 **...** → **Rollback to this deployment**

---

## 🔗 相關鏈接

- Cloudflare Dashboard: https://dash.cloudflare.com
- GitHub Repository: https://github.com/{username}/{repo}
- GitHub Actions: https://github.com/{username}/{repo}/actions

---

## 📞 支持

如需協助，請檢查：
1. GitHub Actions 日誌
2. Cloudflare Pages 部署記錄
3. 本地構建輸出
