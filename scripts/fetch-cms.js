const fs = require("fs");
const path = require("path");

const WORKER_URL = process.env.NEXT_PUBLIC_CMS_API_URL || "https://ltcpa-cms-api.jimsbond007.workers.dev";

// Latest baseline footer data (must match cms-defaults.ts)
const baselineFooter = {
  en: {
    aboutTitle: "LT CPA Limited",
    aboutDesc: "We are a professional accounting firm dedicated to providing quality audit, tax and advisory services. With extensive experience and expertise, we help clients achieve their financial goals and drive business growth.",
    linksTitle: "Quick Links",
    servicesTitle: "Services",
    contactTitle: "Contact Us",
    rights: "© 2026 LT CPA Limited All Rights Reserved.",
    services: [
      { label: "Audit & Assurance", url: "/services/audit/" },
      { label: "Tax Advisory", url: "/services/tax/" },
      { label: "Risk & Regulatory", url: "/services/risk/" },
      { label: "Forensic Services", url: "/services/forensic/" },
      { label: "Consulting", url: "/services/consulting/" },
      { label: "Deals & M&A", url: "/services/deals/" },
    ],
    quickLinks: [
      { label: "Home", url: "/" },
      { label: "About Us", url: "/about/" },
      { label: "Services", url: "/services/" },
      { label: "Contact", url: "/contact/" },
    ],
    contact: { address: "Unit 503, Tower 2, Lippo Centre, Admiralty, Hong Kong", phone: "+852 3987 1008", email: "info@ltgroupcpa.com" },
    social: { facebook: "", instagram: "", linkedin: "" },
  },
  "zh-hant": {
    aboutTitle: "櫪韜會計師事務所有限公司",
    aboutDesc: "我們是一家專業的會計事務所，致力於為客戶提供優質的審計、稅務及顧問服務。憑藉豐富的經驗和專業知識，我們協助客戶實現財務目標，推動業務發展。",
    linksTitle: "快速連結",
    servicesTitle: "專業服務",
    contactTitle: "聯絡我們",
    rights: "© 2026 櫪韜會計師事務所有限公司. 版權所有.",
    services: [
      { label: "審計與鑑證", url: "/services/audit/" },
      { label: "稅務諮詢", url: "/services/tax/" },
      { label: "風險與監管", url: "/services/risk/" },
      { label: "法證服務", url: "/services/forensic/" },
      { label: "企業諮詢", url: "/services/consulting/" },
      { label: "併購交易", url: "/services/deals/" },
    ],
    quickLinks: [
      { label: "首頁", url: "/" },
      { label: "關於我們", url: "/about/" },
      { label: "服務範圍", url: "/services/" },
      { label: "聯絡我們", url: "/contact/" },
    ],
    contact: { address: "香港金鐘力寶中心2座5樓503室", phone: "3987 1008", email: "info@ltgroupcpa.com" },
    social: { facebook: "", instagram: "", linkedin: "" },
  },
  "zh-hans": {
    aboutTitle: "櫪韜会计师事务所有限公司",
    aboutDesc: "我们是一家专业的会计事务所，致力于为客户提供优质的审计、税务及顾问服务。凭借丰富的经验和专业知识，我们协助客户实现财务目标，推动业务发展。",
    linksTitle: "快速链接",
    servicesTitle: "服务项目",
    contactTitle: "联系我们",
    rights: "© 2026 櫪韜会计师事务所有限公司. 版权所有.",
    services: [
      { label: "审计与鉴证", url: "/services/audit/" },
      { label: "税务咨询", url: "/services/tax/" },
      { label: "风险与监管", url: "/services/risk/" },
      { label: "法证服务", url: "/services/forensic/" },
      { label: "企业咨询", url: "/services/consulting/" },
      { label: "并购交易", url: "/services/deals/" },
    ],
    quickLinks: [
      { label: "首页", url: "/" },
      { label: "关于我们", url: "/about/" },
      { label: "服务范围", url: "/services/" },
      { label: "联络我们", url: "/contact/" },
    ],
    contact: { address: "香港金钟力宝中心2座5楼503室", phone: "3987 1008", email: "info@ltgroupcpa.com" },
    social: { facebook: "", instagram: "", linkedin: "" },
  },
};

function smartMergeFooter(baseline, loaded) {
  if (!loaded) return baseline;
  // Known old values that should be replaced with new defaults
  const oldPhones = ["+852 1234 5678", "1234 5678"];
  const oldEmails = ["info@ltcpa.com"];
  const oldDescPatterns = [
    "Professional accounting, audit, tax, and business advisory services to support your company's steady growth.",
  ];
  const isOldDesc = loaded.aboutDesc && oldDescPatterns.some(p => loaded.aboutDesc.includes(p));
  const isOldPhone = loaded.contact?.phone && oldPhones.some(p => loaded.contact.phone.includes(p));
  const isOldEmail = loaded.contact?.email && oldEmails.some(e => loaded.contact.email === e);

  const str = (loadedVal, defVal) => (loadedVal && loadedVal.trim()) ? loadedVal : defVal;
  const services = (loaded.services?.length || 0) >= baseline.services.length ? loaded.services : baseline.services;
  const quickLinks = (loaded.quickLinks?.length || 0) >= baseline.quickLinks.length ? loaded.quickLinks : baseline.quickLinks;
  return {
    ...baseline,
    ...loaded,
    aboutTitle: str(loaded.aboutTitle, baseline.aboutTitle),
    aboutDesc: isOldDesc ? baseline.aboutDesc : str(loaded.aboutDesc, baseline.aboutDesc),
    linksTitle: str(loaded.linksTitle, baseline.linksTitle),
    servicesTitle: str(loaded.servicesTitle, baseline.servicesTitle),
    contactTitle: str(loaded.contactTitle, baseline.contactTitle),
    rights: str(loaded.rights, baseline.rights),
    contact: {
      address: str(loaded.contact?.address, baseline.contact.address),
      phone: isOldPhone ? baseline.contact.phone : str(loaded.contact?.phone, baseline.contact.phone),
      email: isOldEmail ? baseline.contact.email : str(loaded.contact?.email, baseline.contact.email),
    },
    social: { ...baseline.social, ...(loaded.social || {}) },
    services,
    quickLinks,
  };
}

async function fetchCMSData() {
  try {
    const res = await fetch(`${WORKER_URL}/api/cms/data`);
    if (!res.ok) {
      console.warn(`CMS API returned ${res.status}, using defaults only.`);
      fs.writeFileSync(path.join(__dirname, "..", "src", "data", "cms.json"), "{}");
      return;
    }
    const data = await res.json();
    // Smart-merge footer so old KV data doesn't override new defaults
    for (const loc of ["en", "zh-hant", "zh-hans"]) {
      if (data[loc]?.footer) {
        data[loc].footer = smartMergeFooter(baselineFooter[loc], data[loc].footer);
      }
      // Fix home service cards hrefs
      if (data[loc]?.home?.services?.cards) {
        data[loc].home.services.cards = data[loc].home.services.cards.map(c => ({
          ...c,
          href: c.href?.replace(/^\/audit\//, '/services/audit/')
                       ?.replace(/^\/tax\//, '/services/tax/')
                       ?.replace(/^\/risk\//, '/services/risk/')
                       ?.replace(/^\/forensic\//, '/services/forensic/')
                       ?.replace(/^\/consulting\//, '/services/consulting/')
                       ?.replace(/^\/deals\//, '/services/deals/')
                       ?.replace(/\/\/+$/, '/') || c.href
        }));
      }
      // Fix about missionVision items if they contain old long-form descriptions
      if (data[loc]?.about?.missionVision?.items) {
        const items = data[loc].about.missionVision.items;
        const hasOldDesc = items.some(i => i.desc && (i.desc.includes('全球雄心') || i.desc.includes('definitive')));
        if (hasOldDesc) {
          // Remove old missionVision so defaults take over
          delete data[loc].about.missionVision;
        }
      }
      // Fix purpose/value/commitment items if they contain old titles so defaults take over
      const oldPurposeTitles = ["傳遞無界保證與誠信", "传递无界保证与诚信", "Delivering Borderless Assurance"];
      const oldValueTitles = ["在全球尺度", "树立跨境流暢度", "在全球尺度", "树立跨境流畅度", "Redefining the \"Boutique\" Experience on a Global Scale"];
      const oldCommitmentTitles = ["領導力 — 主動全球引導", "連結 — 通用連接器", "技術性 — 國際標準", "變革 — 超越邊界的演進", "领导力 — 主动全球引导", "连结 — 通用连接器", "技术性 — 国际标准", "变革 — 超越边界的演进", "Leadership - Proactive Global Guidance", "Linkage - The Universal Connector", "Technicality - The International Standard", "Transformation - Evolving Beyond Borders"];
      if (data[loc]?.purpose?.items) {
        const hasOld = data[loc].purpose.items.some(i => oldPurposeTitles.some(t => i.title && i.title.includes(t)));
        if (hasOld) delete data[loc].purpose;
      }
      if (data[loc]?.value?.items) {
        const hasOld = data[loc].value.items.some(i => oldValueTitles.some(t => i.title && i.title.includes(t)));
        if (hasOld) delete data[loc].value;
      }
      if (data[loc]?.commitment?.items) {
        const hasOld = data[loc].commitment.items.some(i => oldCommitmentTitles.some(t => i.title && i.title.includes(t)));
        if (hasOld) delete data[loc].commitment;
      }
      // Fix contact formTitle if it's the old short title
      const oldFormTitles = ["免費諮詢", "免费咨询", "Free Consultation"];
      if (data[loc]?.contact?.form?.formTitle && oldFormTitles.includes(data[loc].contact.form.formTitle)) {
        delete data[loc].contact.form;
      }
      // Wipe old servicePages data (pre-rewrite format with serviceScopeSubtitle / serviceProcessSubtitle)
      // so that the new cms-defaults.ts content takes over
      if (data[loc]?.servicePages) {
        const auditPage = data[loc].servicePages.audit;
        if (auditPage && (auditPage.serviceScopeSubtitle || auditPage.serviceProcessSubtitle)) {
          delete data[loc].servicePages;
          console.log(`[fetch-cms] Deleted outdated servicePages for ${loc} — defaults will take over.`);
        }
      }
      // Fix contact cards if they contain old phone/email
      const oldCardPhones = ["+852 1234 5678", "1234 5678"];
      const oldCardEmails = ["info@ltcpa.com"];
      if (data[loc]?.contact?.cards) {
        const hasOldPhone = data[loc].contact.cards.some(c =>
          c.lines?.some(l => oldCardPhones.some(p => l.includes(p)))
        );
        const hasOldEmail = data[loc].contact.cards.some(c =>
          c.lines?.some(l => oldCardEmails.some(e => l.includes(e)))
        );
        if (hasOldPhone || hasOldEmail) {
          delete data[loc].contact.cards;
        }
      }
    }
    fs.writeFileSync(path.join(__dirname, "..", "src", "data", "cms.json"), JSON.stringify(data, null, 2));
    console.log("CMS data fetched and merged successfully.");
  } catch (err) {
    console.warn("Failed to fetch CMS data:", err.message);
    fs.writeFileSync(path.join(__dirname, "..", "src", "data", "cms.json"), "{}");
  }
}

function generateImagesManifest() {
  const imagesDir = path.join(__dirname, "..", "public", "images");
  const manifestPath = path.join(__dirname, "..", "public", "images-manifest.json");
  try {
    const files = fs.readdirSync(imagesDir).filter((f) => {
      const stat = fs.statSync(path.join(imagesDir, f));
      return stat.isFile();
    });
    const manifest = {
      generatedAt: new Date().toISOString(),
      objects: files.map((f) => ({
        key: f,
        url: `/images/${f}`,
        source: "static",
      })),
    };
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log("Images manifest generated:", files.length, "files.");
  } catch (err) {
    console.error("Failed to generate images manifest:", err.message);
  }
}

fetchCMSData();
generateImagesManifest();
