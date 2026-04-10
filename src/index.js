// LTCPA CMS Worker V8.0
// Enterprise-grade CMS with deep merge and full page support

// Default CMS Data - Complete structure for 40 pages
const DEFAULT_CMS_DATA = {
  version: "8.0",
  lastUpdated: "2026-04-11",
  site: {
    companyName: {
      tc: "櫪韜會計師事務所有限公司",
      en: "Lorence & Tang CPA Limited",
      sc: "枥韬会计师事务所有限公司"
    },
    tagline: {
      tc: "專業會計服務",
      en: "Professional Accounting Services",
      sc: "专业会计服务"
    },
    contact: {
      phone: "+852 3987 1008",
      email: "info@ltgroupcpa.com",
      address: {
        tc: "香港金鐘力寶中心2座5樓503室",
        en: "Unit 503, Tower 2, Lippo Centre, Admiralty, Hong Kong",
        sc: "香港金钟力宝中心2座5楼503室"
      },
      hours: {
        tc: "星期一至五: 9:00 - 18:00",
        en: "Monday - Friday: 9:00 - 18:00",
        sc: "星期一至五: 9:00 - 18:00"
      }
    },
    social: {
      whatsapp: "85239871008",
      linkedin: "",
      facebook: ""
    },
    footer: {
      copyright: "© 2026 櫪韜會計師事務所有限公司. All Rights Reserved.",
      description: {
        tc: "我們是一家擁有豐富經驗的專業會計事務所...",
        en: "We are a professional accounting firm...",
        sc: "我们是一家拥有丰富经验的专业会计事务所..."
      }
    }
  },
  navigation: {
    main: [
      { id: "home", url: "/", label: { tc: "首頁", en: "Home", sc: "首页" } },
      { 
        id: "about", 
        url: "/about.html", 
        label: { tc: "關於我們", en: "About Us", sc: "关于我们" },
        children: [
          { id: "purpose", url: "/purpose.html", label: { tc: "我們的宗旨", en: "Our Purpose", sc: "我们的宗旨" } },
          { id: "value", url: "/value.html", label: { tc: "我們的價值", en: "Our Value", sc: "我们的价值" } },
          { id: "commitment", url: "/commitment.html", label: { tc: "我們的承諾", en: "Our Commitment", sc: "我们的承诺" } }
        ]
      },
      { 
        id: "services", 
        url: "/services.html", 
        label: { tc: "服務範圍", en: "Our Services", sc: "服务范围" },
        children: [
          { id: "audit", url: "/audit.html", label: { tc: "審計服務", en: "Audit", sc: "审计服务" } },
          { id: "tax", url: "/tax.html", label: { tc: "稅務服務", en: "Tax", sc: "税务服务" } },
          { id: "risk", url: "/risk.html", label: { tc: "風險管理", en: "Risk", sc: "风险管理" } },
          { id: "forensic", url: "/forensic.html", label: { tc: "法證服務", en: "Forensic", sc: "法证服务" } },
          { id: "consulting", url: "/consulting.html", label: { tc: "商業顧問", en: "Consulting", sc: "商业顾问" } },
          { id: "deals", url: "/deals.html", label: { tc: "企業併購", en: "Deals", sc: "企业并购" } }
        ]
      },
      { id: "contact", url: "/contact.html", label: { tc: "聯繫我們", en: "Contact", sc: "联系我们" } }
    ],
    footer: [
      { label: { tc: "私隱政策", en: "Privacy Policy", sc: "隐私政策" }, url: "/privacy.html" },
      { label: { tc: "使用條款", en: "Terms of Use", sc: "使用条款" }, url: "/terms.html" }
    ]
  },
  pages: {
    index: {
      tc: {
        meta: {
          title: "櫪韜會計師事務所有限公司 | 專業會計服務",
          description: "提供全面的審計、稅務及顧問服務，助您的業務穩健發展",
          keywords: "會計師, 審計, 稅務, 香港, CPA"
        },
        hero: {
          enabled: true,
          title: "專業會計服務，助您業務騰飛",
          subtitle: "憑藉豐富經驗和專業知識，為企業提供最優質的財務解決方案",
          ctaText: "免費諮譲",
          ctaLink: "/contact.html"
        },
        services: {
          enabled: true,
          title: "我們的服務",
          subtitle: "從稅務策劃到企業併購，全方位支援您的商業決策",
          items: [
            { id: "audit", icon: "fa-chart-line", title: "審計服務", description: "提供法定審計、內部審計及各類鑒證服務", link: "/audit.html", enabled: true },
            { id: "tax", icon: "fa-calculator", title: "稅務服務", description: "專業的稅務規劃及申報服務", link: "/tax.html", enabled: true },
            { id: "risk", icon: "fa-shield-alt", title: "風險管理", description: "協助企業識別及管理風險", link: "/risk.html", enabled: true },
            { id: "consulting", icon: "fa-handshake", title: "商業顧問", description: "從業務策略到營運優化", link: "/consulting.html", enabled: true },
            { id: "forensic", icon: "fa-search", title: "法證服務", description: "提供專業的調查及法證服務", link: "/forensic.html", enabled: true },
            { id: "deals", icon: "fa-building", title: "企業併購", description: "協助處理併購交易、盡職調查", link: "/deals.html", enabled: true }
          ]
        },
        about: {
          enabled: true,
          title: "關於櫪韜",
          content: "櫪韜會計師事務所有限公司擁有經驗豐富的專業團隊...",
          ctaText: "了解更多",
          ctaLink: "/about.html"
        },
        cta: {
          enabled: true,
          title: "準備好提升您的業務了嗎？",
          description: "立即與我們的專家團隊聯繫，獲取專業建議",
          buttonText: "立即諮譲",
          buttonLink: "/contact.html"
        }
      },
      en: {},
      sc: {}
    },
    about: {
      tc: {
        meta: { title: "關於我們 | 櫪韜會計師事務所", description: "..." },
        hero: { enabled: true, title: "關於我們" },
        introduction: {
          enabled: true,
          title: "公司介紹",
          paragraphs: [
            "櫪韜會計師事務所有限公司擁有經驗豐富的專業團隊...",
            "憑藉多年的行業經驗，我們建立了廣泛的專業網絡..."
          ]
        },
        mission: {
          enabled: true,
          title: "我們的使命",
          quote: "我們的成功建基於客戶的成功...",
          content: "我們致力於為各行各業的企業提供全面的會計..."
        },
        vision: {
          enabled: true,
          title: "我們的遠景",
          content: "成為香港最受信賴的專業會計服務提供者..."
        },
        values: {
          enabled: true,
          title: "我們秉持的核心價值觀",
          subtitle: "指引著我們的每一項決策和行動",
          items: [
            { icon: "fa-award", title: "專業卓越", description: "持續提升專業能力..." },
            { icon: "fa-handshake", title: "誠信正直", description: "堅守職業道德..." },
            { icon: "fa-lightbulb", title: "創新求變", description: "擁抱變革與創新..." },
            { icon: "fa-users", title: "團隊協作", description: "發揮團隊協作精神..." }
          ]
        },
        timeline: {
          enabled: true,
          title: "發展歷程",
          subtitle: "見證我們的成長與蛻變",
          items: [
            { year: "2005", title: "成立", description: "櫪韜會計師事務所有限公司在香港正式成立" },
            { year: "2010", title: "擴展", description: "成功拓展稅務諮譲及商業顧問服務" },
            { year: "2015", title: "壯大", description: "專業團隊增至30人，服務範圍擴展" },
            { year: "2018", title: "數碼化", description: "引入先進的數碼化系統，提升服務效率" },
            { year: "2023", title: "里程碑", description: "服務客戶超過500家" },
            { year: "2026", title: "持續發展", description: "繼續致力於為客戶創造價值" }
          ]
        },
        cta: {
          enabled: true,
          title: "無論您的企業規模大小，我們都能為您提供專業...",
          buttonText: "立即聯繫我們",
          buttonLink: "/contact.html"
        }
      },
      en: {},
      sc: {}
    },
    services: {
      tc: {
        meta: { title: "服務範圍 | 櫪韜會計師事務所", description: "..." },
        hero: { enabled: true, title: "服務範圍", description: "全方位的專業服務..." },
        services: {
          enabled: true,
          items: [
            { id: "audit", title: "審計與鑑證", shortDesc: "為資本市場注入信心", link: "/audit.html" },
            { id: "tax", title: "稅務諮譲", shortDesc: "優化效率，傳承保護", link: "/tax.html" },
            { id: "risk", title: "風險與監管", shortDesc: "從被動合規到策略韌性", link: "/risk.html" },
            { id: "forensic", title: "法證服務", shortDesc: "守護誠信與價值", link: "/forensic.html" },
            { id: "consulting", title: "企業諮譲", shortDesc: "驅動轉型與績效", link: "/consulting.html" },
            { id: "deals", title: "併購交易", shortDesc: "在交易每個階段釋放價值", link: "/deals.html" }
          ]
        },
        whyChooseUs: {
          enabled: true,
          title: "為何選擇 LT CPA",
          description: "我們擁有經驗豐富的專業團隊...",
          items: [
            { icon: "fa-globe", title: "國際視野", description: "精通多個司法管轄區..." },
            { icon: "fa-user-tie", title: "資深團隊", description: "每個項目由資深合夥人..." },
            { icon: "fa-cogs", title: "創新方案", description: "運用最新技術和方法論..." },
            { icon: "fa-bolt", title: "敏捷響應", description: "精品規模帶來敏捷優勢..." }
          ]
        },
        cta: { enabled: true, title: "需要專業的財務建議？", description: "...", buttonText: "立即諮譲", buttonLink: "/contact.html" }
      },
      en: {},
      sc: {}
    },
    audit: {
      tc: {
        meta: { title: "審計與鑑證 | 櫪韜會計師事務所", description: "..." },
        hero: { enabled: true, title: "審計與鑑證", quote: "為資本市場注入信心。" },
        introduction: { enabled: true, paragraphs: ["...", "..."] },
        features: {
          enabled: true,
          items: [
            { title: "Statutory & Non-Statutory Audit", description: "..." },
            { title: "Capital Market Transactions", description: "..." },
            { title: "Cross-Border Reporting", description: "..." }
          ]
        },
        process: {
          enabled: true,
          title: "系統化的審計方法",
          steps: [
            { number: "01", title: "規劃", description: "深入了解您的業務..." },
            { number: "02", title: "評估", description: "評估關鍵業務流程..." },
            { number: "03", title: "執行", description: "執行分析性程序..." },
            { number: "04", title: "報告", description: "匯總審計發現..." }
          ]
        },
        advantages: {
          enabled: true,
          title: "我們的差異化優勢",
          items: [
            { icon: "fa-certificate", title: "專業資格", description: "..." },
            { icon: "fa-user-tie", title: "合夥人督導", description: "..." },
            { icon: "fa-industry", title: "行業專精", description: "..." },
            { icon: "fa-comments", title: "清晰溝通", description: "..." }
          ]
        },
        cta: { enabled: true, title: "讓我們的專家團隊為您提供...", buttonText: "立即諮譲", buttonLink: "/contact.html" }
      },
      en: {},
      sc: {}
    },
    contact: {
      tc: {
        meta: { title: "聯繫我們 | 櫪韜會計師事務所", description: "..." },
        hero: { enabled: true, title: "聯繫我們" },
        contactInfo: {
          enabled: true,
          title: "聯繫方式",
          companyName: "LT CPA Limited",
          address: "香港金鐘力寶中心2座5樓503室",
          phone: "+852 3987 1008",
          email: "info@ltgroupcpa.com",
          hours: "星期一至五: 9:00 - 18:00"
        },
        form: {
          enabled: true,
          title: "發送訊息",
          description: "請填寫以下表格，我們的專業顧問將盡快與您聯繫",
          fields: {
            name: { label: "姓名", placeholder: "請輸入您的姓名", required: true },
            phone: { label: "電話", placeholder: "請輸入您的電話", required: true },
            email: { label: "電郵", placeholder: "請輸入您的電郵", required: false },
            company: { label: "公司", placeholder: "請輸入您的公司名稱", required: false },
            service: { label: "感興趣的服務", options: ["審計", "稅務", "風險管理", "其他"], required: false },
            message: { label: "訊息", placeholder: "請輸入您的訊息", required: true }
          },
          submitButton: "提交",
          successMessage: "感謝您的訊息，我們會盡快回覆！"
        },
        faq: { enabled: true, title: "常見問題", items: [] }
      },
      en: {},
      sc: {}
    }
  }
};

// Deep merge utility - CRITICAL for CMS data integrity
function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target;
  if (!target || typeof target !== 'object') return source;
  
  const result = Array.isArray(target) ? [...target] : { ...target };
  
  for (const key in source) {
    if (source[key] === null) {
      result[key] = null;
    } else if (Array.isArray(source[key])) {
      result[key] = source[key].map((item, index) => {
        if (Array.isArray(item)) return [...item];
        if (typeof item === 'object' && item !== null && result[key][index]) {
          return deepMerge(result[key][index], item);
        }
        return item;
      });
    } else if (typeof source[key] === 'object') {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

// Get default CMS data with all fields populated
function getDefaultCMSData() {
  return JSON.parse(JSON.stringify(DEFAULT_CMS_DATA));
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // API Routes
    if (path === '/api/cms/data') {
      // GET - Retrieve CMS data
      if (request.method === 'GET') {
        try {
          const stored = await env.LTCPA_CMS.get('cms_data');
          let data;
          
          if (stored) {
            // Deep merge with defaults to ensure all fields exist
            const parsed = JSON.parse(stored);
            const defaults = getDefaultCMSData();
            data = deepMerge(defaults, parsed);
          } else {
            data = getDefaultCMSData();
          }
          
          return new Response(JSON.stringify(data), { headers: corsHeaders });
        } catch (error) {
          return new Response(JSON.stringify({ error: error.message }), { 
            status: 500, 
            headers: corsHeaders 
          });
        }
      }
      
      // PUT - Update CMS data
      if (request.method === 'PUT') {
        try {
          const updates = await request.json();
          const stored = await env.LTCPA_CMS.get('cms_data');
          let current = stored ? JSON.parse(stored) : getDefaultCMSData();
          
          // Deep merge updates
          const merged = deepMerge(current, updates);
          merged.lastUpdated = new Date().toISOString();
          
          await env.LTCPA_CMS.put('cms_data', JSON.stringify(merged));
          
          return new Response(JSON.stringify({ 
            success: true, 
            message: 'CMS data updated successfully',
            lastUpdated: merged.lastUpdated 
          }), { headers: corsHeaders });
        } catch (error) {
          return new Response(JSON.stringify({ error: error.message }), { 
            status: 500, 
            headers: corsHeaders 
          });
        }
      }
    }
    
    // Health check
    if (path === '/api/health') {
      return new Response(JSON.stringify({ 
        status: 'ok', 
        version: '8.0',
        timestamp: new Date().toISOString()
      }), { headers: corsHeaders });
    }
    
    // 404 for unknown routes
    return new Response(JSON.stringify({ error: 'Not found' }), { 
      status: 404, 
      headers: corsHeaders 
    });
  }
};
