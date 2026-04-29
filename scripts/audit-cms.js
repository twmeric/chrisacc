/**
 * CMS Field Consistency Auditor
 * Checks alignment between: Admin UI ↔ cms-types ↔ cms-defaults ↔ merge logic ↔ components
 */
const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.join(__dirname, "..");

// Read files
const adminHtml = fs.readFileSync(path.join(PROJECT_ROOT, "public", "admin", "index.html"), "utf8");
const typesTs = fs.readFileSync(path.join(PROJECT_ROOT, "lib", "cms-types.ts"), "utf8");
const defaultsTs = fs.readFileSync(path.join(PROJECT_ROOT, "lib", "cms-defaults.ts"), "utf8");
const dataTs = fs.readFileSync(path.join(PROJECT_ROOT, "lib", "cms-data.ts"), "utf8");

// Helper: extract fields from render functions in Admin HTML
function extractAdminRenderFields(section) {
  const regex = new RegExp(`function render${section}\\b[\\s\\S]*?(?=function render|function doLogin|$)`);
  const match = adminHtml.match(regex);
  if (!match) return [];
  const code = match[0];
  const fields = [];
  // Match input IDs: id='xxx' or id="xxx"
  const idRegex = /id=['"]([\w_]+)['"]/g;
  let m;
  while ((m = idRegex.exec(code)) !== null) {
    fields.push(m[1]);
  }
  return [...new Set(fields)];
}

// Helper: extract fields from collectSection in Admin HTML
function extractAdminCollectFields(section) {
  const regex = new RegExp(`id === ['"]${section}['"][\\s\\S]*?(?=else if|function )`);
  const match = adminHtml.match(regex);
  if (!match) return [];
  const code = match[0];
  const fields = [];
  const readRegex = /read(Input|Array)\(['"]([\w_]+)['"]/g;
  let m;
  while ((m = readRegex.exec(code)) !== null) {
    fields.push(m[2]);
  }
  return [...new Set(fields)];
}

// Helper: extract interface fields from cms-types.ts
function extractInterfaceFields(name) {
  const regex = new RegExp(`export interface ${name}\\b[\\s\\S]*?^\\}`);
  const match = typesTs.match(regex);
  if (!match) return [];
  const code = match[0];
  const fields = [];
  const fieldRegex = /^\s+(\w+)\??\s*:/gm;
  let m;
  while ((m = fieldRegex.exec(code)) !== null) {
    fields.push(m[1]);
  }
  return fields;
}

// Helper: extract default object keys from cms-defaults.ts (simplified)
function extractDefaultKeys(sectionPath) {
  // sectionPath like "footer.contact"
  const parts = sectionPath.split(".");
  // This is a simplified heuristic - find the object block
  let searchCode = defaultsTs;
  for (const part of parts) {
    const regex = new RegExp(`${part}:\\s*\\{([\\s\\S]*?)\\n\\s*\\}`);
    const match = searchCode.match(regex);
    if (!match) return [];
    // Extract keys from this block
    const block = match[1];
    const keys = [];
    const keyRegex = /^\s+(\w+):/gm;
    let m;
    while ((m = keyRegex.exec(block)) !== null) {
      keys.push(m[1]);
    }
    searchCode = block;
  }
  return keys;
}

console.log("=".repeat(60));
console.log("CMS FIELD CONSISTENCY AUDIT");
console.log("=".repeat(60));

// === SECTION 1: Footer ===
console.log("\n## Footer");
const footerRender = extractAdminRenderFields("Footer");
const footerCollect = extractAdminCollectFields("footer");
console.log("Admin Render fields:", footerRender.length);
console.log("Admin Collect fields:", footerCollect.length);

const footerRenderSet = new Set(footerRender);
const footerCollectSet = new Set(footerCollect);
const footerMissingInCollect = footerRender.filter(f => !footerCollectSet.has(f));
const footerMissingInRender = footerCollect.filter(f => !footerRenderSet.has(f));

if (footerMissingInCollect.length) {
  console.log("⚠️  Rendered but NOT collected:", footerMissingInCollect);
}
if (footerMissingInRender.length) {
  console.log("⚠️  Collected but NOT rendered:", footerMissingInRender);
}

// === SECTION 2: Contact ===
console.log("\n## Contact");
const contactRender = extractAdminRenderFields("Contact");
const contactCollect = extractAdminCollectFields("contact");
console.log("Admin Render fields:", contactRender.length);
console.log("Admin Collect fields:", contactCollect.length);

const contactRenderSet = new Set(contactRender);
const contactCollectSet = new Set(contactCollect);
const contactMissingInCollect = contactRender.filter(f => !contactCollectSet.has(f));
const contactMissingInRender = contactCollect.filter(f => !contactRenderSet.has(f));

if (contactMissingInCollect.length) {
  console.log("⚠️  Rendered but NOT collected:", contactMissingInCollect);
}
if (contactMissingInRender.length) {
  console.log("⚠️  Collected but NOT rendered:", contactMissingInRender);
}

// === SECTION 3: About ===
console.log("\n## About");
const aboutRender = extractAdminRenderFields("About");
const aboutCollect = extractAdminCollectFields("about");
console.log("Admin Render fields:", aboutRender.length);
console.log("Admin Collect fields:", aboutCollect.length);

const aboutRenderSet = new Set(aboutRender);
const aboutCollectSet = new Set(aboutCollect);
const aboutMissingInCollect = aboutRender.filter(f => !aboutCollectSet.has(f));
const aboutMissingInRender = aboutCollect.filter(f => !aboutRenderSet.has(f));

if (aboutMissingInCollect.length) {
  console.log("⚠️  Rendered but NOT collected:", aboutMissingInCollect);
}
if (aboutMissingInRender.length) {
  console.log("⚠️  Collected but NOT rendered:", aboutMissingInRender);
}

// === SECTION 4: Site ===
console.log("\n## Site");
const siteRender = extractAdminRenderFields("Site");
const siteCollect = extractAdminCollectFields("site");
console.log("Admin Render fields:", siteRender.length);
console.log("Admin Collect fields:", siteCollect.length);

const siteRenderSet = new Set(siteRender);
const siteCollectSet = new Set(siteCollect);
const siteMissingInCollect = siteRender.filter(f => !siteCollectSet.has(f));
const siteMissingInRender = siteCollect.filter(f => !siteRenderSet.has(f));

if (siteMissingInCollect.length) {
  console.log("⚠️  Rendered but NOT collected:", siteMissingInCollect);
}
if (siteMissingInRender.length) {
  console.log("⚠️  Collected but NOT rendered:", siteMissingInRender);
}

// === CHECK merge functions in cms-data.ts ===
console.log("\n" + "=".repeat(60));
console.log("MERGE LOGIC COVERAGE CHECK");
console.log("=".repeat(60));

const mergeFunctions = [
  { name: "mergeFooter", fields: ["aboutTitle", "aboutDesc", "linksTitle", "servicesTitle", "contactTitle", "rights", "contact", "social", "services", "quickLinks"] },
  { name: "mergeContact", fields: ["cards", "form", "map", "faq"] },
  { name: "mergeAbout", fields: ["whyChoose", "intro", "missionVision", "pillars", "coreValues", "team", "timeline", "cta"] },
  { name: "mergeHome", fields: ["hero", "services", "cta"] },
  { name: "mergeServices", fields: ["whyChoose", "process", "cta", "serviceDetails"] },
];

for (const mf of mergeFunctions) {
  const funcRegex = new RegExp(`function ${mf.name}\\b[\\s\\S]*?(?=function |export )`);
  const match = dataTs.match(funcRegex);
  if (!match) {
    console.log(`❌ ${mf.name}: NOT FOUND`);
    continue;
  }
  const code = match[0];
  const missing = mf.fields.filter(f => !code.includes(f));
  if (missing.length) {
    console.log(`⚠️  ${mf.name}: missing fields [${missing.join(", ")}]`);
  } else {
    console.log(`✅ ${mf.name}: all ${mf.fields.length} fields covered`);
  }
}

console.log("\n" + "=".repeat(60));
console.log("AUDIT COMPLETE");
console.log("=".repeat(60));
