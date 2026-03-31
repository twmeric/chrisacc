# 零返工網站復刻方法論

> **專案：** LT CPA 三語言企業網站  
> **經驗教訓：** 從「不斷返工」到「一次性完成」的蛻變  
> **核心原則：準備 > 執行，標準 > 速度**

---

## 一、專案復盤：我們踩過的坑

### ❌ 錯誤做法（前期）

| 問題 | 後果 | 返工次數 |
|------|------|---------|
| 沒有預先制定設計系統 | 每個頁面風格不一，顏色/間距混亂 | 16頁全部重構 |
| Tailwind + 標準CSS 混用 | 樣式衝突，難以調試 | 5次 |
| 多語言規劃滯後 | Footer/Header 中英混雜，連結錯誤 | 3次 |
| 沒有組件化思維 | 重複代碼，修改困難 | N次 |
| CSS 路徑使用 `../../../` | Turbopack 報錯，構建失敗 | 多次 |
| 服務子頁面逐個創建 | 效率低下，內容遺漏 | 2次 |

### ✅ 正確做法（後期）

| 改進 | 效果 |
|------|------|
| 建立統一 CSS 變量系統 | 一處修改，全局生效 |
| 組件化 Header/Footer | 自動適配多語言 |
| 創建頁面模板 | 批量生成48頁，效率提升10倍 |
| 使用 `@/app/` 路徑別名 | 永遠不會報錯 |

---

## 二、黃金法則：四階段工作法

### 📋 第一階段：策略規劃（20%時間）
**目標：想清楚再動手**

#### 1.1 網站結構分析
```
□ 列出所有頁面（用樹狀圖）
□ 標記頁面類型（首頁/列表頁/詳情頁/表單頁）
□ 確定頁面優先級（P0必做/P1重要/P2可選）

範例：
├── 首頁 (P0)
├── 關於我們 (P0)
│   ├── 公司簡介
│   ├── 願景使命
│   └── 核心價值
├── 服務範圍 (P0)
│   ├── 服務總覽
│   └── 6個服務子頁
└── 聯絡我們 (P0)
```

#### 1.2 設計系統文檔化
**必須在寫代碼前完成：**

```css
/* globals.css - 設計令牌 */
:root {
  /* 顏色系統 */
  --primary: #1a3a5c;      /* 主色：深海藍 */
  --primary-light: #2a4a6c;
  --accent: #c9a227;       /* 強調色：金色 */
  --accent-light: #d9b237;
  
  /* 中性色 */
  --text-primary: #1a1a1a;
  --text-secondary: #4a4a4a;
  --text-muted: #6a6a6a;
  --bg-light: #f8f9fa;
  --bg-white: #ffffff;
  --border: #e0e0e0;
  
  /* 間距系統 */
  --section-padding: 100px;
  --container-max: 1200px;
  --grid-gap: 60px;
  --card-padding: 40px;
  
  /* 字體系統 */
  --font-heading: 'Georgia', serif;
  --font-body: 'Arial', sans-serif;
  --h1-size: 3rem;
  --h2-size: 2.5rem;
  --h3-size: 1.5rem;
  --body-size: 1rem;
  
  /* 動畫 */
  --transition-fast: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

#### 1.3 技術決策清單
```
□ 框架選擇（Next.js / React / Vue）
□ 樣式方案（Tailwind / CSS Modules / 標準CSS）
  ⚠️ 重要：選一種，不要混用！
□ UI 組件庫（自建 / shadcn / MUI）
□ 圖標方案（FontAwesome / Lucide / Heroicons）
  ⚠️ 重要：整站統一！
□ 多語言方案（靜態生成 / 動態路由）
```

#### 1.4 多語言架構設計（如適用）
```
決策：如何組織多語言內容？

方案A：文件夾路由（推薦）
├── page.tsx        # 默認語言 (EN)
├── /zh/page.tsx    # 繁體中文
└── /cn/page.tsx    # 簡體中文

方案B：動態路由
├── [lang]/page.tsx

關鍵：組件必須自適應語言！
```

---

### 🏗️ 第二階段：基礎建設（30%時間）
**目標：建立「不會後悔」的基礎**

#### 2.1 全局樣式系統
```css
/* globals.css */

/* 1. CSS Reset + 基礎 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  color: var(--text-primary);
  line-height: 1.6;
}

/* 2. 佈局類別（強制使用） */
.section {
  padding: var(--section-padding) 20px;
}

.section-inner {
  max-width: var(--container-max);
  margin: 0 auto;
}

/* 3. 通用動畫 */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--transition-slow), 
              transform var(--transition-slow);
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 4. 響應式斷點 */
@media (max-width: 768px) {
  :root {
    --section-padding: 60px;
  }
}

@media (max-width: 480px) {
  :root {
    --section-padding: 40px;
  }
}
```

#### 2.2 佈局組件（Layout Components）

**Header 組件必須：**
```tsx
// components/Header.tsx
"use client";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  // 自動檢測語言
  const isZh = pathname.startsWith('/zh');
  const isCn = pathname.startsWith('/cn');
  const basePath = isZh ? '/zh' : isCn ? '/cn' : '';
  
  // 語言切換邏輯
  const switchLang = (targetLang: string) => {
    // 實現語言切換
  };
  
  return (
    <header>
      {/* 導航內容 */}
    </header>
  );
}
```

**Footer 組件必須：**
```tsx
// components/Footer.tsx
"use client";
import { usePathname } from "next/navigation";

const content = {
  zh: { /* 繁體中文內容 */ },
  cn: { /* 簡體中文內容 */ },
  en: { /* 英文內容 */ }
};

export default function Footer() {
  const pathname = usePathname();
  const isZh = pathname.startsWith('/zh');
  const isCn = pathname.startsWith('/cn');
  const t = isZh ? content.zh : isCn ? content.cn : content.en;
  const basePath = isZh ? '/zh' : isCn ? '/cn' : '';
  
  return (
    <footer>
      {/* 使用 t.xxx 顯示對應語言 */}
    </footer>
  );
}
```

#### 2.3 可復用 UI 組件
```
components/
├── Header.tsx          # 導航欄（自適應語言）
├── Footer.tsx          # 頁尾（自適應語言）
├── SectionHeader.tsx   # 區塊標題組件
├── ServiceCard.tsx     # 服務卡片
├── Button.tsx          # 按鈕組件
└── Breadcrumb.tsx      # 麵包屑
```

#### 2.4 頁面模板創建
```tsx
// templates/ServicePageTemplate.tsx
"use client";

interface ServicePageProps {
  lang: 'en' | 'zh' | 'cn';
  serviceKey: string;  // 用於獲取對應語言內容
}

export default function ServicePageTemplate({ lang, serviceKey }: ServicePageProps) {
  const content = getServiceContent(lang, serviceKey);
  
  return (
    <>
      <Header />
      <ServiceHero content={content.hero} />
      <OverviewSection content={content.overview} />
      <ServicesDetail content={content.services} />
      <CTASection content={content.cta} />
      <Footer />
    </>
  );
}
```

---

### 📝 第三階段：內容生產（40%時間）
**目標：流水線式批量生產**

#### 3.1 內容準備（先文字後代碼）
```yaml
# content/services/audit.yaml
en:
  title: "Audit & Assurance"
  tagline: "Confidence in every number"
  description: "..."
  features:
    - title: "Statutory Audit"
      description: "..."
    - title: "Capital Market"
      description: "..."

zh:
  title: "審計及鑑證"
  tagline: "為資本市場注入信心"
  description: "..."
  features:
    - title: "法定審計"
      description: "..."

cn:
  title: "审计及鉴证"
  tagline: "为资本市场注入信心"
  description: "..."
```

#### 3.2 批量頁面生成腳本
```javascript
// scripts/generate-pages.js
const services = ['audit', 'tax', 'risk', 'forensic', 'consulting', 'deals'];
const languages = ['zh', 'cn'];

// 為每個服務和語言組合生成頁面
services.forEach(service => {
  languages.forEach(lang => {
    generatePage(service, lang);
  });
});
```

#### 3.3 實際頁面（極簡）
```tsx
// app/zh/services/audit/page.tsx
import ServicePageTemplate from "@/templates/ServicePageTemplate";

export default function AuditPageZh() {
  return <ServicePageTemplate lang="zh" serviceKey="audit" />;
}
```

---

### 🔍 第四階段：驗收與優化（10%時間）
**目標：一次性通過，無需返工**

#### 4.1 檢查清單
```
□ 所有頁面構建成功（npm run build 無錯誤）
□ 多語言切換正常
□ 響應式測試（桌面/平板/手機）
□ 所有連結可點擊
□ 圖片正確顯示
□ 動畫效果正常
□ Lighthouse 分數 > 90
```

#### 4.2 常見錯誤預防
```
❌ 不要：使用 ../../../ 相對路徑
✅ 要：使用 @/app/ 別名

❌ 不要：混用 Tailwind 和標準CSS
✅ 要：選擇一種並堅持

❌ 不要：在組件內硬編碼語言內容
✅ 要：使用內容字典，組件自適應

❌ 不要：逐個手動創建相似頁面
✅ 要：使用模板 + 循環生成
```

---

## 三、實戰經驗總結

### 🎯 成功關鍵

1. **先文檔，後代碼**
   - 設計系統文檔是第一行代碼前的必須產出
   - 內容準備獨立於代碼開發

2. **組件必須「無知」**
   - Header/Footer 不應該知道自己在哪個頁面
   - 通過 `usePathname()` 自動適配

3. **拒絕「複製貼上」**
   - 相似頁面使用模板
   - 一處修改，全局生效

4. **路徑統一規範**
   ```
   組件：@/components/xxx
   樣式：@/app/xxx/xxx.css
   模板：@/templates/xxx
   內容：@/content/xxx
   ```

### 📊 時間分配對比

| 階段 | 傳統做法 | 零返工做法 | 效果 |
|------|---------|-----------|------|
| 規劃 | 5% | 20% | 減少80%返工 |
| 基礎建設 | 20% | 30% | 統一標準 |
| 內容生產 | 60% | 40% | 效率提升 |
| 調試修復 | 15% | 10% | 接近零BUG |

### 💡 心理建設

> **「慢即是快」**
> 
> 前期多花2小時制定標準，後期節省20小時返工時間。
>
> **「一次做對」**
>
> 寧願第一階段多花時間思考，也不要急著寫代碼。

---

## 四、快速啟動模板

### 新項目啟動命令序列

```bash
# 1. 創建設計文檔（30分鐘）
echo "# Design System" > DESIGN.md

# 2. 設置全局樣式（20分鐘）
touch src/app/globals.css

# 3. 創建佈局組件（40分鐘）
touch src/components/Header.tsx
touch src/components/Footer.tsx

# 4. 創建第一個頁面模板（30分鐘）
touch src/templates/PageTemplate.tsx

# 5. 批量生成內容（根據頁面數量）
# 使用腳本或手動

# 6. 構建測試
npm run build
```

---

## 五、檔案附件

### 本專案最終結構（48頁）
```
app/
├── globals.css              # 統一設計系統
├── page.tsx                 # EN 首頁
├── about/
│   ├── page.tsx
│   ├── commitment/
│   ├── purpose/
│   └── value/
├── services/
│   ├── page.tsx
│   ├── audit/
│   ├── tax/
│   ├── risk/
│   ├── forensic/
│   ├── consulting/
│   └── deals/
├── contact/
│   └── page.tsx
├── en/                      # EN 重定向
│   └── ...
├── zh/                      # 繁體中文（10頁）
│   ├── page.tsx
│   ├── about/
│   ├── services/
│   │   ├── audit/
│   │   ├── tax/
│   │   ├── risk/
│   │   ├── forensic/
│   │   ├── consulting/
│   │   └── deals/
│   └── contact/
└── cn/                      # 簡體中文（10頁）
    └── ...（同上結構）

components/
├── Header.tsx               # 自適應多語言
└── Footer.tsx               # 自適應多語言

templates/                   # 頁面模板
├── HomeTemplate.tsx
├── AboutTemplate.tsx
├── ServicesTemplate.tsx
└── ServiceDetailTemplate.tsx
```

---

## 六、結語

這次 LT CPA 專案教會我們最重要的教訓：

> **前期準備的時間不是「浪費」，而是「投資」。**

當我們前期制定了統一的設計系統、組件化架構、多語言方案後，後期的48頁內容生產變成了「填空題」而不是「作文題」。

**從16頁返工 → 48頁一次性完成**，這就是方法論的力量。

---

*文檔版本：v2.0*  
*適用專案：多語言企業官網、服務型網站、內容展示型網站*  
*核心原則：準備 > 執行，標準 > 速度*
