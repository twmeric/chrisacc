# LTCPA CMS Masterpiece V9 - 重建路線圖

## 當前狀態 (2026-04-11)

✅ **已完成基礎架構**
- CMS Schema V9 設計完成
- Worker API 已更新 (含 deepMerge)
- KV 數據初始化
- index.html 核心頁面完成 (參考 CWMNG 模式)
- Logo 文件就位

## 分階段完成計劃

### Phase 1: 核心頁面 (已完成 ✅)
- index.html - 首頁，含 Hero/Services/About/CTA
- 使用 data-cms 屬性標記可編輯區域
- 前端渲染引擎 script.js 模式
- 多語言切換支持

### Phase 2: 關鍵頁面創建 (建議 2-3 小時)
- [ ] about.html - 關於我們 (含時間線)
- [ ] services.html - 服務總覽 (含 WhyChooseUs)
- [ ] contact.html - 聯繫我們 (含 WhatsApp 表單)
- [ ] audit/tax/risk/forensic/consulting/deals - 服務詳情頁
- [ ] purpose/value/commitment - 關於子頁

### Phase 3: Admin V9 面板 (建議 3-4 小時)
參考 CWMNG 設計：
- [ ] 登入界面 + Logo
- [ ] Dashboard 概覽
- [ ] Site Settings (公司資訊)
- [ ] Navigation 管理
- [ ] Page Editor (13頁 × 3語言)
  - 每頁：SEO/Hero/Content/CTA 區塊
  - 動態數組管理 (時間線、服務項)
  - 實時預覽
- [ ] Deploy 發布功能

### Phase 4: WhatsApp 集成 (建議 1 小時)
- [ ] 客戶留資表單
- [ ] WhatsApp API 發送
- [ ] 後台查詢管理

### Phase 5: 測試與優化 (建議 1-2 小時)
- [ ] 所有頁面響應式測試
- [ ] CMS 編輯驗證
- [ ] 多語言切換測試
- [ ] 部署到生產環境

## 技術架構 (Masterpiece 標準)

```
參考 CWMNG & e-corp 最佳實踐:

Frontend:
├── HTML5 + CSS3 (Grid/Flexbox)
├── Vanilla JavaScript (無框架依賴)
├── Font Awesome 圖標
├── Google Fonts (Noto Sans TC)
└── data-cms 屬性標記系統

Backend:
├── Cloudflare Worker (API)
├── KV Storage (數據持久化)
├── deepMerge 數據合併
└── RESTful API 設計

Admin:
├── Tailwind CSS (參考 CWMNG)
├── 暗黑/亮色主題
├── 拖放排序 (Navigation)
├── 富文本編輯器
└── 實時預覽

Integration:
├── WhatsApp Business API
├── 客戶留資追蹤
└── 郵件通知 (可選)
```

## 文件清單

### 已完成
- ✅ data/cms-masterpiece-v9.json - CMS Schema
- ✅ src/index.js - Worker API
- ✅ web/index.html - 首頁模板
- ✅ web/admin/logo.png - Logo

### 待創建
- ⏳ web/about.html - 關於頁
- ⏳ web/services.html - 服務頁
- ⏳ web/contact.html - 聯繫頁
- ⏳ web/script.js - 前端渲染引擎
- ⏳ web/admin/index.html - Admin V9
- ⏳ web/admin/styles.css - Admin 樣式

## 預計總工時

| 階段 | 時間 | 狀態 |
|------|------|------|
| Phase 1 | 2 小時 | ✅ 完成 |
| Phase 2 | 3 小時 | ⏳ 進行中 |
| Phase 3 | 4 小時 | ⏳ 待開始 |
| Phase 4 | 1 小時 | ⏳ 待開始 |
| Phase 5 | 2 小時 | ⏳ 待開始 |
| **總計** | **12 小時** | |

## 建議

1. **繼續開發**: 分配更多時間完成 Masterpiece
2. **分階段交付**: 每完成一個 Phase 部署一次
3. **測試驗證**: 每個功能完成後立即測試

## 當前可用 URL

- **Pages**: https://76d34a1a.ltcpa-website.pages.dev
- **API**: https://ltcpa-cms-worker.jimsbond007.workers.dev/api/cms/data
- **GitHub**: https://github.com/twmeric/chrisacc

---

**母機團隊建議**: 這是一個企業級 CMS 項目，建議分配 2-3 天時間完成 Masterpiece 級別的交付。
