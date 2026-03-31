# 母機團隊網站標準化執行規範

> **項目**: LT CPA Website Standardization  
> **日期**: 2026-03-27  
> **教訓級別**: 🔴 Critical (必須遵守)  

---

## 📋 項目復盤摘要

### 核心問題
本次項目最大的教訓是：**「沒有在啟動階段建立統一標準，導致大量返工」**

### 數據統計
| 指標 | 數值 | 備註 |
|------|------|------|
| 總頁面數 | 16 個 | 含 3 個 About 子頁面 |
| 重構頁面 | 10+ 個 | 因標準不一需重寫 |
| 部署次數 | 8 次 | 反覆修正 |
| 圖標系統 | 2 套 → 1 套 | Lucide → FontAwesome |
| CSS 結構 | 3 種 → 1 種 | Tailwind/Modules/全局 → 統一 CSS |

---

## 🎯 黃金法則 (Golden Rules)

### Rule #1: 先定標準，後動代碼
**❌ 禁止**: 邊做邊想，各頁面獨立發揮  
**✅ 必須**: 第一時間建立 Design System，全站遵循

### Rule #2: 一頁模板，全站複製
**❌ 禁止**: 每頁自由發揮結構和間距  
**✅ 必須**: 建立標準 Page Template，其他頁面複製後修改內容

### Rule #3: 圖標統一，圖片穩定
**❌ 禁止**: 混用圖標庫、使用本地圖片路徑  
**✅ 必須**: 單一圖標庫 + CDN 圖片 URL

---

## 📐 Design System 標準

### 1. 顏色系統 (Color System)
```css
:root {
  --primary-color: #1a3a5c;      /* 深藍 - 主色 */
  --secondary-color: #2c5282;    /* 中藍 - 輔助色 */
  --gold-color: #c9a227;         /* 金色 - 強調色 */
  --text-dark: #2d3748;          /* 深灰 - 主要文字 */
  --text-gray: #4a5568;          /* 中灰 - 次要文字 */
  --light-bg: #f7fafc;           /* 淺灰 - 背景 */
  --white: #ffffff;              /* 白色 */
}
```

### 2. 間距規範 (Spacing System)
| 元素 | 數值 | 備註 |
|------|------|------|
| Section Padding | `100px 20px` | 統一 |
| Container Max Width | `1200px` | 居中 |
| 兩欄 Grid Gap | `60px` | 標準間距 |
| 三欄 Grid Gap | `40px` | 卡片間距 |
| 四欄 Grid Gap | `30px` | 緊湊佈局 |
| Card Padding | `30px - 40px` | 內容區域 |

### 3. 字體規範 (Typography)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* 標題 */
H1: 48px (desktop) / 32px (mobile)
H2: 36px (desktop) / 28px (mobile)
H3: 24px (desktop) / 20px (mobile)

/* 正文 */
Body: 16px / 1.8 line-height
Small: 14px
```

### 4. 圖標規範 (Icon System)
**統一使用 FontAwesome 5 Free**
```tsx
// ✅ 正確
<i className="fas fa-icon-name"></i>

// ❌ 禁止
<LucideIcon />  // 不要混用
<CustomSVG />   // 避免自定義
```

### 5. 圖片規範 (Image System)
**使用 Unsplash CDN URL**
```tsx
// ✅ 正確
<Image
  src="https://images.unsplash.com/photo-xxx?w=600&q=80"
  alt="Description"
  fill
  className="object-cover"
/>

// ❌ 禁止
<Image src="/images/local.jpg" />  // 容易 404
```

---

## 📄 頁面模板標準 (Page Template)

### 標準頁面結構
```tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./page.css";  // 頁面專屬 CSS

export default function PageName() {
  // Fade-in 動畫
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Page Banner */}
      <section className="page-banner page-name-banner">
        <div>
          <h1>Page Title</h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / Page Title
          </div>
        </div>
      </section>

      {/* Section 1 - White BG */}
      <section className="about-section">
        <div className="about-container">
          {/* Two column content */}
        </div>
      </section>

      {/* Section 2 - Light BG */}
      <section className="about-intro-section">
        <div className="section-inner">
          {/* Content */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>CTA Title</h2>
          <p>CTA Description</p>
          <Link href="/contact" className="cta-btn">Contact Us</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

### 標準 CSS 結構
```css
/* page.css */

/* Import base variables */
@import url('../globals.css');

/* Banner */
.page-name-banner {
  background: linear-gradient(135deg, rgba(26, 58, 92, 0.9), rgba(44, 82, 130, 0.9)),
              url('https://images.unsplash.com/photo-xxx?w=1920&q=80');
  background-size: cover;
  background-position: center;
}

/* Page-specific styles */
...

/* Responsive */
@media (max-width: 1024px) { ... }
@media (max-width: 768px) { ... }
```

---

## 🎨 元件標準 (Component Standards)

### 1. 按鈕 (Button)
```css
.btn {
  display: inline-block;
  padding: 15px 40px;
  background: var(--gold-color);
  color: var(--white);
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.btn:hover {
  background: var(--primary-color);
  transform: translateY(-3px);
}
```

### 2. 卡片 (Card)
```css
.card {
  background: var(--white);
  border-radius: 10px;
  padding: 40px 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}
```

### 3. Section Header
```css
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 36px;
  color: var(--primary-color);
  margin-bottom: 15px;
}

.section-header p {
  font-size: 18px;
  color: var(--text-gray);
}
```

---

## 📱 響應式規範 (Responsive Standards)

### 斷點定義
```css
/* Desktop (default) */
/* 1200px+ */

/* Tablet */
@media (max-width: 1024px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Small Mobile */
@media (max-width: 480px) { }
```

### 響應式原則
1. **Mobile-First**: 默認樣式為移動端，向上覆蓋
2. **Grid 降級**: 4列 → 2列 → 1列
3. **字體縮放**: 桌面標題 48px → 移動 32px
4. **間距調整**: Section padding 100px → 60px (mobile)

---

## ⚠️ 常見錯誤與避免方法

### ❌ 錯誤 #1: 混用圖標庫
**症狀**: 頁面 A 用 Lucide，頁面 B 用 FontAwesome  
**後果**: 代碼混亂，維護困難，加載多個庫  
**解決**: 統一使用 FontAwesome（與原稿一致）

### ❌ 錯誤 #2: 本地圖片路徑
**症狀**: `/images/photo.jpg`  
**後果**: 部署後 404，圖片不顯示  
**解決**: 使用 Unsplash URL + `?w=600&q=80` 參數

### ❌ 錯誤 #3: Tailwind 內聯樣式
**症狀**: `className="py-16 px-4 md:px-8"`  
**後果**: 難以統一修改，HTML 臃腫  
**解決**: 使用單獨 CSS 文件，class 命名規範

### ❌ 錯誤 #4: 忽略移動端測試
**症狀**: 只在桌面預覽  
**後果**: 移動端佈局崩潰（如 Forensic Timeline 重疊）  
**解決**: 每頁必須測試 768px 和 375px 寬度

### ❌ 錯誤 #5: 各自為政的間距
**症狀**: 頁面 A padding 80px，頁面 B padding 100px  
**後果**: 全站視覺不連貫  
**解決**: 嚴格遵守 Design System 間距表

---

## ✅ 執行流程 (Execution Process)

### Phase 1: 準備階段 (30 分鐘)
- [ ] 分析原稿，提取 Design System
- [ ] 創建 `STANDARD.md` 文檔
- [ ] 建立第一個標準頁面（作為模板）
- [ ] 確認圖標、圖片策略

### Phase 2: 批量生產 (每頁 30-45 分鐘)
- [ ] 複製模板，修改內容
- [ ] 使用統一的 Section 結構
- [ ] 插入正確的 Unsplash 圖片
- [ ] 添加 fade-in 動畫

### Phase 3: 驗收階段 (每頁 10 分鐘)
- [ ] 對比原稿，確認內容準確
- [ ] 桌面端 1200px 檢查
- [ ] 平板端 768px 檢查
- [ ] 移動端 375px 檢查

### Phase 4: 整合部署
- [ ] 構建測試 `npm run build`
- [ ] 修復 TypeScript 錯誤
- [ ] 部署到 Cloudflare Pages
- [ ] 全站鏈接點擊測試

---

## 🧪 驗收標準 (Acceptance Criteria)

### 視覺一致性
- [ ] 所有頁面使用相同顏色變量
- [ ] Section padding 統一為 100px 20px
- [ ] 字體大小符合 Typography 規範
- [ ] 按鈕樣式統一

### 移動端適配
- [ ] 768px 寬度無水平滾動
- [ ] 375px 寬度佈局正常
- [ ] 導航欄漢堡菜單正常工作
- [ ] 圖片不溢出容器

### 功能完整
- [ ] 所有圖片正確加載（無 broken image）
- [ ] 所有鏈接可點擊
- [ ] Fade-in 動畫正常工作
- [ ] 表單可正常提交

### 代碼質量
- [ ] 無 TypeScript 錯誤
- [ ] 無控制台报错
- [ ] CSS 無重複定義
- [ ] 構建成功

---

## 📚 參考資源

### 原稿規範
- 標準頁面: `about-en.html` (https://nis.kkairsoft.com/chrisacc/005/about-en.html)
- 顏色系統: #1a3a5c (主色), #c9a227 (金色)
- 間距標準: padding 100px, gap 60px

### 工具
- 圖片源: https://unsplash.com
- 圖標庫: https://fontawesome.com/icons
- 色板工具: https://coolors.co

---

## 🏆 母機團隊承諾

> **我們承諾**：從下次項目開始，嚴格遵守本規範，確保一次性交付高質量成果。

**下次項目啟動時，請先朗讀：**
1. 先定標準，後動代碼
2. 一頁模板，全站複製
3. 圖標統一，圖片穩定
4. 移動優先，測試完備

---

*文檔版本: v1.0*  
*最後更新: 2026-03-27*  
*編制: 母機團隊*
