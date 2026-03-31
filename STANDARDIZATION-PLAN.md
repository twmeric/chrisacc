# LT CPA 網站標準化計劃

## 📋 執行摘要

本計劃以 `about-en.html` 為藍本，建立統一的頁面設計規範，確保全站視覺一致性。

---

## 🎯 核心標準（Based on about-en.html）

### 1. 顏色系統
```css
--primary-color: #1a3a5c      /* 深藍 - 主色 */
--secondary-color: #2c5282    /* 中藍 - 輔助色 */
--gold-color: #c9a227         /* 金色 - 強調色 */
--text-dark: #2d3748          /* 深灰 - 主要文字 */
--text-gray: #4a5568          /* 中灰 - 次要文字 */
--light-bg: #f7fafc           /* 淺灰 - 背景 */
--white: #ffffff              /* 白色 */
```

### 2. 間距規範
| 元素 | 規格 |
|------|------|
| Section Padding | `100px 20px` |
| Container Max Width | `1200px` |
| 兩欄 Gap | `60px` |
| 三欄 Gap | `40px` |
| 四欄 Gap | `30px` |

### 3. 頁面結構標準

#### 標準頁面模板：
```tsx
<main className="min-h-screen">
  <Header />
  
  {/* Page Banner */}
  <section className="page-banner">
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
      {/* Two column grid content */}
    </div>
  </section>

  {/* Section 2 - Light BG */}
  <section className="about-intro-section">
    <div className="about-intro-container">
      {/* Two column grid content */}
    </div>
  </section>

  {/* CTA Section */}
  <section className="cta-section">
    <div className="section-inner text-center">
      {/* CTA content */}
    </div>
  </section>

  <Footer />
</main>
```

### 4. 圖片處理規範

#### 選項 A: Unsplash 圖片（推薦）
```tsx
<Image
  src="https://images.unsplash.com/photo-XXXX?w=600&q=80"
  alt="Description"
  fill
  className="object-cover"
/>
```

#### 選項 B: 本地圖片
```tsx
<Image
  src="/images/filename.jpg"
  alt="Description"
  fill
  className="object-cover"
/>
```

**重要**: 必須確保圖片文件存在於 `/public/images/` 目錄

### 5. 裝飾元素標準

#### 圖片金色邊框
```css
.about-image::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 20px;
  right: -20px;
  bottom: -20px;
  border: 4px solid var(--gold-color);
  border-radius: 10px;
  z-index: -1;
}
```

#### 卡片頂部漸變線
```css
.mv-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--gold-color));
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.mv-card:hover::before {
  transform: scaleX(1);
}
```

### 6. 動畫規範
```css
/* Fade In Up Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 🔧 各頁面修復清單

### ✅ About Page (已完成)
- [x] 統一使用 `about.css`
- [x] 使用 Unsplash 圖片
- [x] 添加金色裝飾邊框
- [x] 統一 section padding
- [x] 添加動畫效果

### 🔲 Services Pages (需修復)

#### Tax Page
- [ ] 驗證現有結構
- [ ] 確保使用 FontAwesome 圖標（與原稿一致）

#### Risk Page
- [ ] 統一使用 FontAwesome 圖標替代 Lucide
- [ ] 移除內聯樣式，使用 CSS 類

#### Forensic Page (需大幅重構)
- [ ] 重寫為標準 CSS 類結構
- [ ] 移除 Tailwind 內聯樣式
- [ ] 添加 Fade-in 動畫

#### Consulting Page
- [ ] 驗證並標準化

#### Deals Page
- [ ] 驗證並標準化

### 🔲 About Subpages
- [ ] Purpose Page
- [ ] Value Page  
- [ ] Commitment Page

### 🔲 Other Pages
- [ ] Contact Page
- [ ] Home Page

---

## 📁 文件結構標準

```
src/
├── app/
│   ├── about/
│   │   ├── page.tsx           # 主頁面
│   │   ├── about.css          # 頁面專屬樣式
│   │   ├── purpose/
│   │   ├── value/
│   │   └── commitment/
│   ├── services/
│   │   ├── tax/
│   │   ├── risk/
│   │   ├── forensic/
│   │   ├── consulting/
│   │   └── deals/
│   ├── globals.css            # 全局樣式
│   └── ...
└── components/
    ├── Header.tsx
    └── Footer.tsx
```

---

## 🚀 執行步驟

### Phase 1: 基礎設置 (已完成)
1. ✅ 建立 About 頁面標準
2. ✅ 創建 about.css
3. ✅ 設置 Unsplash 圖片

### Phase 2: 服務頁面標準化
1. 統一 Forensic 頁面
2. 統一 Consulting 頁面
3. 統一 Deals 頁面
4. 驗證 Tax/Risk 頁面

### Phase 3: 關於頁面子頁
1. Purpose 頁面
2. Value 頁面
3. Commitment 頁面

### Phase 4: 其他頁面
1. Contact 頁面
2. Home 頁面微調

---

## ⚠️ 常見問題修復

### 圖片不顯示
**原因**: 使用 `/images/` 本地路徑但文件不存在  
**解決**: 改用 Unsplash URL 或確保圖片存在

### 樣式不一致
**原因**: 混用 Tailwind + CSS Modules + 內聯樣式  
**解決**: 統一使用頁面專屬 CSS 文件

### 移動端問題
**原因**: 響應式斷點不一致  
**解決**: 統一使用標準斷點 (1024px, 768px)

---

## 📌 驗收標準

1. **視覺一致性**: 所有頁面使用相同顏色、間距、字體
2. **移動端適配**: 所有頁面在 768px 和 375px 寬度下正常顯示
3. **圖片加載**: 所有圖片正確顯示，無 broken image
4. **動畫效果**: 所有 fade-in 動畫正常工作
5. **導航**: Header 和 Footer 在所有頁面一致

---

*最後更新: 2026-03-27*  
*版本: v1.0*
