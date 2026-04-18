# LTCPA Deployment Guide

> 部署指南 — 從本地開發到生產環境的完整流程。

---

## 1. 先決條件

### 1.1 本地環境

```bash
# Node.js 20+
node -v  # 應顯示 v20.x.x

# npm
npm -v

# Git
git -v
```

### 1.2 帳號與權限

| 服務 | 需要的權限 |
|------|-----------|
| GitHub | `twmeric/chrisacc` repo 寫入權限 |
| Cloudflare | Pages + Workers + KV + R2 + D1 管理權限 |

### 1.3 本地文件

確保 `.cloudflare-token` 存在於項目根目錄（內含 Cloudflare API Token，不提交到 Git）。

---

## 2. 日常開發流程

### 2.1 啟動開發服務器

```bash
npm run dev
```

訪問 `http://localhost:3000`

> ⚠️ 注意：開發模式下 CMS 數據來自 `src/data/cms.json`。如果沒有這個文件，先運行 `npm run fetch-cms`。

### 2.2 構建測試

```bash
npm run build
```

成功後檢查：
- `dist/` 目錄存在
- `src/data/cms.json` 已生成
- `public/images-manifest.json` 已生成
- `public/admin/cms-defaults.json` 已生成

### 2.3 代碼提交

```bash
git add .
git commit -m "描述本次更改"
git push origin main
```

> 推送到 `main` 會自動觸發 GitHub Actions 部署。

---

## 3. 生產部署

### 3.1 自動部署（推薦）

推送到 `main` 分支後，GitHub Actions 自動執行：

```
1. Install dependencies (npm ci)
2. Build Next.js (npm run build)
3. Deploy to Cloudflare Pages (dist/)
4. Deploy CMS Worker (workers/cms-api/)
5. Deploy Inquiry Worker (workers/inquiry-api/)
```

### 3.2 部署狀態檢查

1. GitHub → `twmeric/chrisacc` → Actions 標籤 → 查看最新 workflow run
2. Cloudflare Dashboard → Pages → `ltcpa-website` → 查看部署記錄
3. 訪問 `https://ltgroupcpa.jkdcoding.com` 確認

### 3.3 手動部署 Worker（僅修改 Worker 時）

如果僅修改 Worker 代碼，不想觸發整站重建：

```bash
# CMS Worker
cd workers/cms-api
npx wrangler deploy

# Inquiry Worker
cd workers/inquiry-api
npx wrangler deploy
```

> ⚠️ **不要**手動運行 `wrangler pages deploy`。這會創建預覽部署，不會更新生產域名。

---

## 4. CMS 內容部署

### 4.1 通過 Admin 面板部署

```
1. 訪問 https://ltgroupcpa.jkdcoding.com/admin/
2. 登入 (密碼: admin360)
3. 修改內容
4. 點擊 "Save to CMS"
5. 點擊 "Deploy Site"（觸發 GitHub Actions 重建）
```

### 4.2 內容生效時間

| 操作 | 生效時間 |
|------|----------|
| 保存到 KV | 即時 |
| 網站顯示更新 | 需等待 GitHub Actions 完成（約 2-3 分鐘） |
| Admin 面板顯示 | 刷新頁面即可 |

---

## 5. 首次設置（災難恢復）

### 5.1 重新創建 Cloudflare Pages 項目

如果 Pages 項目被刪除：

```bash
# 1. 在 Cloudflare Dashboard 創建 Pages 項目
#    - 名稱: ltcpa-website
#    - 生產分支: main

# 2. 綁定自定義域名
#    - ltgroupcpa.jkdcoding.com
#    - ltgroupcpa.com (DNS 就緒後)
```

### 5.2 重新創建 KV Namespace

```bash
npx wrangler kv:namespace create "LTCPA_CMS"
# 更新 wrangler.toml 中的 id 和 preview_id
```

### 5.3 重新創建 R2 Bucket

```bash
npx wrangler r2 bucket create ltcpa-media
# 更新 wrangler.toml 中的 bucket_name
```

### 5.4 重新創建 D1 Database

```bash
npx wrangler d1 create ltcpa-d1
# 更新 wrangler.toml 中的 database_id
# 執行 schema.sql 初始化表結構
```

### 5.5 設置 Secrets

```bash
# CMS Worker
cd workers/cms-api
npx wrangler secret put GITHUB_TOKEN
# 輸入 GitHub PAT (repo + workflow scope)

# Inquiry Worker
cd workers/inquiry-api
npx wrangler secret put RESEND_API_KEY
# 輸入 Resend API Key
```

### 5.6 設置 GitHub Secrets

在 GitHub repo → Settings → Secrets and variables → Actions 中添加：

| Secret | 值 |
|--------|-----|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID |
| `NEXT_PUBLIC_INQUIRY_API_URL` | `https://ltcpa-inquiry-api.jimsbond007.workers.dev/api/inquiry` |
| `NEXT_PUBLIC_CMS_API_URL` | `https://ltcpa-cms-api.jimsbond007.workers.dev/api/cms` |

---

## 6. 回滾策略

### 6.1 代碼回滾

```bash
# 回滾到上一個版本
git revert HEAD
git push origin main

# 或回滾到特定 commit
git reset --hard <commit-hash>
git push origin main --force
```

### 6.2 CMS 數據回滾

Worker 在每次保存 CMS 數據時會自動備份到 `cms_data_history_<timestamp>`。

如果需要恢復：

```bash
# 在 Cloudflare Dashboard → Workers & Pages → KV → 找到歷史版本鍵
# 複製值，通過 Admin 或 API 寫回 cms_data
```

> 備份 TTL 為 90 天，超期自動刪除。

---

## 7. 環境變量對照表

| 變量 | 位置 | 值 | 說明 |
|------|------|-----|------|
| `ADMIN_PASSWORD` | wrangler.toml (vars) | `admin360` | Admin 登入密碼 |
| `GITHUB_TOKEN` | Worker Secret | `<PAT>` | 觸發 GitHub Actions |
| `RESEND_API_KEY` | Worker Secret | `<API_KEY>` | 郵件通知 |
| `CLOUDFLARE_API_TOKEN` | GitHub Secret | `<TOKEN>` | CI/CD 部署 |
| `NEXT_PUBLIC_CMS_API_URL` | GitHub Secret + 本地 env | Worker URL | 構建時拉取 CMS |
| `NEXT_PUBLIC_INQUIRY_API_URL` | GitHub Secret | Worker URL | 表單提交端點 |
