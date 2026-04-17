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
      { label: "Audit & Assurance", url: "/audit/" },
      { label: "Tax Advisory", url: "/tax/" },
      { label: "Risk & Regulatory", url: "/risk/" },
      { label: "Forensic Services", url: "/forensic/" },
      { label: "Consulting", url: "/consulting/" },
      { label: "Deals & M&A", url: "/deals/" },
    ],
    quickLinks: [
      { label: "Home", url: "/index/" },
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
      { label: "審計與鑑證", url: "/audit/" },
      { label: "稅務諮詢", url: "/tax/" },
      { label: "風險與監管", url: "/risk/" },
      { label: "法證服務", url: "/forensic/" },
      { label: "企業諮詢", url: "/consulting/" },
      { label: "併購交易", url: "/deals/" },
    ],
    quickLinks: [
      { label: "首頁", url: "/index/" },
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
      { label: "审计与鉴证", url: "/audit//" },
      { label: "税务咨询", url: "/tax//" },
      { label: "风险与监管", url: "/risk//" },
      { label: "法证服务", url: "/forensic//" },
      { label: "企业咨询", url: "/consulting//" },
      { label: "并购交易", url: "/deals//" },
    ],
    quickLinks: [
      { label: "首页", url: "/index//" },
      { label: "关于我们", url: "/about//" },
      { label: "服务范围", url: "/services//" },
      { label: "联络我们", url: "/contact//" },
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
