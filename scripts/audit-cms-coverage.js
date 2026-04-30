/**
 * CMS-Frontend Coverage Audit Script
 * Scans three dimensions: cms-defaults, admin panel, and frontend pages
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

// ─── Helpers ───
function readFile(relPath) {
  const p = path.join(ROOT, relPath);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
}

// Extract top-level keys inside each locale block from cms-defaults.ts
function extractDefaultsStructure() {
  const code = readFile("lib/cms-defaults.ts");
  const locales = ["en", "zh-hant", "zh-hans"];
  const result = {};
  for (const loc of locales) {
    const regex = new RegExp(
      loc + ":\\s*\\{([\\s\\S]*?)\\n\\s*\\},?\\s*\\n(?=\\s*(?:[a-z-]+:|\\}))",
      "s"
    );
    const m = code.match(regex);
    if (m) {
      const keys = [...m[1].matchAll(/^\s+([a-zA-Z_][a-zA-Z0-9_]*):/gm)].map((x) => x[1]);
      result[loc] = [...new Set(keys)];
    }
  }
  return result;
}

// Scan admin panel for section render/collect functions
function extractAdminSections() {
  const html = readFile("public/admin/index.html");
  // Find all renderSection calls and section buttons
  const sections = [...html.matchAll(/data-sec="([a-z_]+)"/g)].map((m) => m[1]);
  const renderMatches = [
    ...html.matchAll(
      /function\s+render([A-Z][a-zA-Z]+)\s*\(|renderSection\('([a-z_]+)'\)/g
    ),
  ].map((m) => m[1] || m[2]);
  const collectMatches = [
    ...html.matchAll(/if\s*\(\s*\[\s*'([a-z_]+)'\s*\]/g),
  ].map((m) => m[1]);
  const all = [...new Set([...sections, ...renderMatches, ...collectMatches])];
  return all;
}

// Scan frontend page files for CMS field consumption
function extractPageConsumers() {
  const appDir = path.join(ROOT, "app", "[lang]");
  const pages = {};
  if (!fs.existsSync(appDir)) return pages;
  const entries = fs.readdirSync(appDir, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.isDirectory()) {
      const pageFile = path.join(appDir, ent.name, "page.tsx");
      if (fs.existsSync(pageFile)) {
        const code = fs.readFileSync(pageFile, "utf8");
        // Find cms.X, cms.about.X, cms.home.X etc.
        const fields = [...code.matchAll(/cms\.([a-zA-Z_][a-zA-Z0-9_\.]*)/g)].map((m) => m[1]);
        pages[ent.name] = [...new Set(fields)];
      }
    }
  }
  return pages;
}

// Check KV data for missing top-level keys per locale
function checkKVData() {
  const kvPath = path.join(ROOT, "src", "data", "cms.json");
  if (!fs.existsSync(kvPath)) return {};
  const data = JSON.parse(fs.readFileSync(kvPath, "utf8"));
  const locales = ["en", "zh-hant", "zh-hans"];
  const result = {};
  for (const loc of locales) {
    if (data[loc]) {
      result[loc] = Object.keys(data[loc]);
    }
  }
  return result;
}

// ─── Run Audit ───
console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║     LTCPA CMS-Frontend Coverage Audit Report               ║");
console.log("╚══════════════════════════════════════════════════════════════╝\n");

const defaults = extractDefaultsStructure();
const adminSections = extractAdminSections();
const pages = extractPageConsumers();
const kvKeys = checkKVData();

// Reference: all unique top-level keys across locales
const allDefaultKeys = [...new Set(Object.values(defaults).flat())];

console.log("【1】cms-defaults.ts 定義的頂層字段（按語言）");
console.log("─".repeat(60));
for (const loc of ["en", "zh-hant", "zh-hans"]) {
  console.log(`${loc}: ${(defaults[loc] || []).join(", ")}`);
}
console.log(`\n總共有 ${allDefaultKeys.length} 個唯一頂層字段:`);
console.log(allDefaultKeys.join(", "));

console.log("\n\n【2】Admin 面板支持的 section");
console.log("─".repeat(60));
console.log(adminSections.join(", "));
console.log(`\n總共 ${adminSections.length} 個 section`);

console.log("\n\n【3】前端頁面消費的 CMS 字段");
console.log("─".repeat(60));
for (const [page, fields] of Object.entries(pages)) {
  console.log(`${page}: ${fields.join(", ")}`);
}

console.log("\n\n【4】KV (cms.json) 中的實際頂層字段（按語言）");
console.log("─".repeat(60));
for (const loc of ["en", "zh-hant", "zh-hans"]) {
  console.log(`${loc}: ${(kvKeys[loc] || []).join(", ")}`);
}

console.log("\n\n【5】交叉驗證：defaults 定義了但 KV 缺失的字段");
console.log("─".repeat(60));
let crossIssues = [];
for (const loc of ["en", "zh-hant", "zh-hans"]) {
  const missing = allDefaultKeys.filter(
    (k) => !(kvKeys[loc] || []).includes(k)
  );
  if (missing.length > 0) {
    console.log(`${loc} 缺失: ${missing.join(", ")}`);
    crossIssues.push({ loc, missing });
  }
}
if (crossIssues.length === 0) {
  console.log("✅ 所有 defaults 字段在 KV 中均存在");
}

console.log("\n\n【6】Admin Section 覆蓋檢查");
console.log("─".repeat(60));
// Check which top-level keys have Admin sections
const adminKeyMap = {
  site: "site",
  header: "header",
  footer: "footer",
  home: "home",
  about: "about",
  contact: "contact",
  services: "services",
  servicePages: "servicePages",
  purpose: "purpose",
  value: "value",
  commitment: "commitment",
};
const missingAdmin = allDefaultKeys.filter(
  (k) => !adminSections.includes(k) && !adminSections.includes(adminKeyMap[k])
);
if (missingAdmin.length > 0) {
  console.log("⚠️  defaults 中有但 Admin 無對應 section: " + missingAdmin.join(", "));
} else {
  console.log("✅ 所有頂層字段在 Admin 中均有對應 section");
}

console.log("\n\n【7】前端頁面覆蓋檢查");
console.log("─".repeat(60));
const pageKeyMap = {
  home: "home",
  about: "about",
  contact: "contact",
  services: "services",
  purpose: "purpose",
  value: "value",
  commitment: "commitment",
  "services/[slug]": "servicePages",
};
const missingPages = allDefaultKeys.filter(
  (k) => !Object.values(pageKeyMap).includes(k)
);
if (missingPages.length > 0) {
  console.log("⚠️  defaults 中有但無獨立頁面的字段: " + missingPages.join(", "));
} else {
  console.log("✅ 所有頂層字段均有對應前端頁面或組件");
}

console.log("\n\n═══════════════════════════════════════════════════════════════");
console.log("                     審查摘要");
console.log("═══════════════════════════════════════════════════════════════");
console.log(`defaults 唯一頂層字段數: ${allDefaultKeys.length}`);
console.log(`Admin section 數: ${adminSections.length}`);
console.log(`前端頁面數: ${Object.keys(pages).length}`);
console.log(`KV 缺失問題數: ${crossIssues.length}`);
console.log("═══════════════════════════════════════════════════════════════\n");
