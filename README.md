# LT Group CPA - Cloudflare CMS

Cloudflare 雙賬戶架構項目 - Pages + Workers + KV

## 項目架構

```
┌─────────────────────────────────────────────────────────────────┐
│                        雙賬戶架構                                 │
└─────────────────────────────────────────────────────────────────┘

Account A (dfbee5c2a5706a81bc04675499c933d4)
├── Cloudflare Pages: ltcpa-website
├── Cloudflare Worker: ltcpa-cms-worker
└── KV Namespace: LTCPA_CMS

Account B (decb73699e3037ab607fc24f6dd21745)
├── Zone: ltgroupcpa.com
└── CDN Cache Purging
```

## 項目結構

```
ltgroupcpa/
├── src/
│   └── index.js          # Worker 入口 (含 CORS + WhatsApp API)
├── public/
│   └── index.html        # 前端頁面
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions CI/CD
├── wrangler.toml         # Worker 配置
├── package.json          # 項目配置
└── README.md            # 本文件
```

## 環境變量設置

### GitHub Secrets 配置

在 GitHub Repository → Settings → Secrets and variables → Actions 中添加以下 Secrets：

| Secret Name | Description | Value |
|------------|-------------|-------|
| `CF_TOKEN_A` | Account A 的 API Token | `cfut_KnxsEVNz3yhvUlDaDxcw3ZuXlEAflsTPKtnY3Itz03230cb8` |
| `CF_TOKEN_B` | Account B 的 API Token | `cfut_ch7BtBk089XTumnkIbIbzIqH1N5U6ef2sTRArmyl526772eb` |

### CF_TOKEN_A 權限要求 (Account A)

創建 Token 時需要以下權限：

```
Account: Cloudflare Workers Scripts
  - Edit

Zone: Zone Settings
  - Edit

Zone: Zone
  - Read

Account: Cloudflare Pages
  - Edit
```

### CF_TOKEN_B 權限要求 (Account B)

創建 Token 時需要以下權限：

```
Zone: Cache Purge
  - Purge
```

### Worker Secrets 設置

使用 wrangler CLI 設置以下 Secrets：

```bash
# WhatsApp API Token (從 Meta Developer Console 獲取)
wrangler secret put WHATSAPP_API_TOKEN

# WhatsApp Phone Number ID
wrangler secret put WHATSAPP_PHONE_NUMBER_ID
```

## 部署流程

### 本地開發

```bash
# 安裝依賴
npm install

# 本地開發 Worker
npm run dev

# 本地開發 Pages
npm run pages:dev
```

### 生產部署

推送到 `main` 分支會自動觸發 GitHub Actions：

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

部署流程：
1. ✅ 運行測試
2. ✅ 部署 Worker 到 Account A
3. ✅ 部署 Pages 到 Account A
4. ✅ 清除 Account B 的 CDN 緩存

## API 端點

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | 健康檢查 |
| GET | `/api/cms/data` | 獲取 CMS 數據 |
| PUT | `/api/cms/data` | 更新 CMS 數據 |
| POST | `/api/cms/publish` | 發布更改 |
| GET | `/api/cms/publish/status` | 獲取發布狀態 |
| POST | `/api/cms/reset` | 重置為默認值 |
| POST | `/api/inquiries/submit` | 提交客戶查詢 |
| GET | `/api/inquiries/list` | 列舉查詢列表 |

## CORS 配置

Worker 已配置允許以下來源：
- `https://ltgroupcpa.com`
- `https://www.ltgroupcpa.com`
- `https://ltcpa-website.pages.dev`
- `https://*.ltcpa-website.pages.dev`

## 域名配置

1. 在 Cloudflare Pages 項目中添加自定義域名
2. 在 Account B 的 DNS 中添加 CNAME 記錄指向 Pages
3. 啟用 Cloudflare Proxy (橙色雲朵)

## WhatsApp 通知

當客戶提交查詢時，系統會自動發送 WhatsApp 通知到 `+85251164453`。

需要在 Worker Secrets 中配置：
- `WHATSAPP_API_TOKEN`: Meta Developer Console 獲取的 Token
- `WHATSAPP_PHONE_NUMBER_ID`: WhatsApp Business Account 的 Phone Number ID

## 聯繫信息

- **電話**: +852 5116 4453
- **電郵**: info@ltgroupcpa.com
- **域名**: https://ltgroupcpa.com
