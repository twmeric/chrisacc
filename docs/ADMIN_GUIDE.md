# LTCPA Admin Panel Guide

> Admin 面板使用指南 — 給內容管理員和未來維護者。

---

## 1. 訪問方式

```
URL: https://ltgroupcpa.jkdcoding.com/admin/
密碼: admin360
```

---

## 2. 面板結構

左側邊欄分為以下組別：

```
📊 Dashboard
   └── 網站數據概覽 + 訪問分析

🎨 Brand Settings
   └── Logo 上傳、網站名稱、WhatsApp 號碼

🧭 Navigation
   └── 主選單項目（文字 + 鏈接）

📄 Pages
   ├── Home          → 首頁 Hero、服務卡片、統計數字
   ├── About         → 公司簡介、Why Choose、團隊
   ├── Contact       → 聯絡表單文案、地址、電話、WhatsApp
   └── Footer        → 版權、社交鏈接、快速連結

🛠 Services
   ├── Services Overview → 服務總覽頁
   ├── Audit             → 審計服務詳情
   ├── Tax               → 稅務服務詳情
   ├── Risk              → 風險服務詳情
   ├── Forensic          → 法證服務詳情
   ├── Consulting        → 諮詢服務詳情
   └── Deals             → 交易服務詳情

📚 Library
   └── 媒體資源庫（圖片管理）
```

---

## 3. 通用操作流程

### 3.1 修改頁面內容

```
1. 點擊左側對應頁面（如 "Home"）
2. 展開各個區塊（Hero、Services、Stats...）
3. 修改文字、上傳圖片、調整鏈接
4. 點擊區塊底部的 "Save" 按鈕
5. 重複直到所有修改完成
6. 點擊頂部藍色 "Save to CMS" 按鈕
7. 點擊 "Deploy Site" 觸發網站重建
```

### 3.2 上傳圖片

```
1. 進入 Library → Media Gallery
2. 拖放圖片到上傳區域，或點擊選擇文件
3. 等待上傳完成
4. 圖片會出現在 "Uploaded" 標籤下
5. 點擊圖片可複製 URL，用於內容編輯
```

### 3.3 使用圖片

```
1. 在任意內容編輯器中，找到圖片字段
2. 點擊圖片輸入框旁邊的 "Browse" 按鈕
3. 選擇圖片（可切換 All / Static / Uploaded 標籤）
4. 點擊確認，URL 自動填入
```

---

## 4. 各頁面編輯詳情

### 4.1 Home（首頁）

| 區塊 | 可編輯內容 |
|------|-----------|
| Hero | 背景圖片輪播（3 張）、標題、副標、CTA 按鈕 |
| Services | 6 張服務卡片（圖片、標題、描述、鏈接） |
| Stats | 4 個統計數字（數值 + 標籤） |
| Why Choose | 標題、描述、特色列表（圖標 + 文字） |

### 4.2 About（關於我們）

| 區塊 | 可編輯內容 |
|------|-----------|
| Intro | 標題、正文、圖片 |
| Why Choose | 標題、描述、特色列表、圖片 |
| Team | 團隊成員（姓名、職位、照片） |

### 4.3 Contact（聯絡我們）

| 區塊 | 可編輯內容 |
|------|-----------|
| Info | 地址、電話、電郵、WhatsApp |
| Form | 表單標題、描述、字段提示文字 |
| WhatsApp | 號碼和預設消息（也可用 Site Settings 中的全局號碼） |

### 4.4 Services Detail（服務詳情頁）

每個服務頁包含：

| 區塊 | 可編輯內容 |
|------|-----------|
| Hero | 橫幅圖片、標題、副標 |
| Scope | **Scope Items 列表** — 每項包含：標題、副標、圖標、正文、特色列表 |
| Extra | 額外內容區塊（如 Common Fraud Types、Confidentiality） |

> ⚠️ **Scope Items 是最重要的編輯區域**。每個服務有多個 Scope Item，每個 Item 包含 5 個字段。使用 "Add Item" / "Remove Item" 調整數量。

---

## 5. Media Gallery（媒體庫）

### 5.1 圖片來源

| 標籤 | 說明 |
|------|------|
| All | 顯示所有圖片（靜態 + 上傳） |
| Static | 網站內建的 21 張圖片（`public/images/`） |
| Uploaded | 通過 Admin 上傳到 R2 的圖片 |

### 5.2 刪除圖片

- **Uploaded 圖片**: 可點擊紅色 "Delete" 按鈕刪除
- **Static 圖片**: 顯示 "Read-only" 標籤，不可刪除

> 為什麼 Static 圖片不能刪除？因為它們是網站代碼的一部分，編譯後嵌入在靜態文件中。刪除需要修改代碼並重新部署。

### 5.3 圖片 URL 格式

| 類型 | URL 示例 |
|------|----------|
| 靜態 | `/images/hero-bg-1.jpg` |
| 上傳 | `https://ltcpa-media.jimsbond007.workers.dev/filename.jpg` |

---

## 6. Analytics（訪問統計）

### 6.1 數據概覽

頂部顯示三張卡片：
- **Total Views** — 選定時間範圍內的總瀏覽量
- **Unique Visitors** — 獨立訪客數（基於 sessionId）
- **Avg Daily** — 日均訪問量

### 6.2 時間範圍

點擊 "Last 7 Days" 或 "Last 30 Days" 切換。

### 6.3 圖表

- **Daily Trend** — 每日瀏覽量柱狀圖
- **Top Pages** — 訪問量最多的頁面
- **Countries** — 訪客國家分布
- **Recent Views** — 最近 50 條訪問記錄

### 6.4 數據收集原理

每次頁面加載時，前端 `AnalyticsTracker.tsx` 發送 `POST /api/analytics/pageview` 請求，Worker 記錄到 KV。

> 統計數據基於客戶端請求，如果訪客禁用 JavaScript 則不會記錄。

---

## 7. 部署網站

### 7.1 何時需要部署

修改內容後必須點擊 "Deploy Site" 才能讓更改在網站上生效。

### 7.2 部署流程

```
1. 點擊 "Deploy Site"
2. Admin 調用 Worker 的 POST /api/cms/deploy
3. Worker 使用 GITHUB_TOKEN 觸發 GitHub Actions
4. GitHub Actions 構建並部署到 Cloudflare Pages
5. 約 2-3 分鐘後，網站更新
```

### 7.3 部署問題排查

| 問題 | 原因 | 解決 |
|------|------|------|
| 401 Unauthorized | Token 過期 | 重新登入 Admin |
| 502 GITHUB_TOKEN missing | Worker 缺少 Secret | 在 Cloudflare Dashboard 設置 `GITHUB_TOKEN` Secret |
| 500 Body has already been used | Worker bug | 已修復，如再現請檢查 `workers/cms-api/src/index.ts` |

---

## 8. 多語言內容管理

### 8.1 語言切換

頂部導航欄有三個語言按鈕：
- **繁** — 繁體中文 (`zh-hant`)
- **简** — 簡體中文 (`zh-hans`)
- **EN** — 英文 (`en`)

### 8.2 編輯流程

```
1. 切換到目標語言
2. 修改該語言的內容
3. Save to CMS（會保存當前語言的數據）
4. 切換到另一個語言，重複
5. 最後 Deploy Site
```

> 每種語言的 CMS 數據是獨立的。切換語言不會丟失已保存的數據。

---

## 9. 最佳實踐

### 9.1 圖片優化

- 上傳前壓縮圖片（推薦 TinyPNG）
- Hero 背景圖建議寬度 1920px
- 服務卡片圖片建議寬度 800px
- 避免上傳超過 2MB 的圖片

### 9.2 內容備份

- 每次點擊 "Save to CMS" 都會自動備份到 `cms_data_history_<timestamp>`
- 備份保留 90 天

### 9.3 測試更改

- 修改內容後先檢查 Admin 預覽
- 部署後訪問 `https://ltgroupcpa.jkdcoding.com` 確認
- 檢查所有三種語言版本

### 9.4 常見錯誤

| 錯誤 | 解決 |
|------|------|
| 保存後內容消失 | 確保點擊了 "Save"（區塊級）再點 "Save to CMS"（全局級） |
| 圖片上傳失敗 | 檢查文件大小（< 10MB）和格式（jpg/png/webp） |
| 頁面顯示舊內容 | 等待部署完成，或清除瀏覽器緩存 |
| Scope Items 顯示不全 | 這是舊 bug，已修復。如再現，刷新 Admin 頁面 |
