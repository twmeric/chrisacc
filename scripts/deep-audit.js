/**
 * DEEP CMS Field Consistency Auditor
 * Checks every sub-field across: Admin UI ↔ cms-types ↔ cms-defaults ↔ merge logic
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const files = {
  admin: fs.readFileSync(path.join(ROOT, "public", "admin", "index.html"), "utf8"),
  types: fs.readFileSync(path.join(ROOT, "lib", "cms-types.ts"), "utf8"),
  defaults: fs.readFileSync(path.join(ROOT, "lib", "cms-defaults.ts"), "utf8"),
  data: fs.readFileSync(path.join(ROOT, "lib", "cms-data.ts"), "utf8"),
};

const issues = [];
function report(category, msg) {
  issues.push(`[${category}] ${msg}`);
}

// ===== 1. Extract Admin render fields (deep) =====
function extractAdminRenderFields(sectionName) {
  const regex = new RegExp(`function render${sectionName}\\b([\\s\\S]*?)(?=function render|function doLogin|function toggleGroup|function showToast|$)`);
  const match = files.admin.match(regex);
  if (!match) return [];
  const code = match[1];
  // Extract all input/textarea/select IDs and data-fields from helper calls
  const fields = [];
  // inputText(id, label, value) → id
  const r1 = /inputText\(['"]([\w_]+)['"]/g;
  let m;
  while ((m = r1.exec(code)) !== null) fields.push(m[1]);
  // inputTextarea(id, label, value, rows?) → id
  const r2 = /inputTextarea\(['"]([\w_]+)['"]/g;
  while ((m = r2.exec(code)) !== null) fields.push(m[1]);
  // smallInput(id, label, value) → id
  const r3 = /smallInput\(['"]([\w_]+)['"]/g;
  while ((m = r3.exec(code)) !== null) fields.push(m[1]);
  // smallTextarea(id, label, value) → id
  const r4 = /smallTextarea\(['"]([\w_]+)['"]/g;
  while ((m = r4.exec(code)) !== null) fields.push(m[1]);
  // smallImage(id, label, value) → id
  const r5 = /smallImage\(['"]([\w_]+)['"]/g;
  while ((m = r5.exec(code)) !== null) fields.push(m[1]);
  // checkbox raw HTML id="xxx"
  const r6 = /id=['"]([\w_]+)['"][^>]*type=['"]checkbox['"]/g;
  while ((m = r6.exec(code)) !== null) fields.push(m[1]);
  // array item fields: about_tl_${idx}_year
  const r7 = /data-field=['"]([\w_]+)['"]/g;
  while ((m = r7.exec(code)) !== null) fields.push(m[1]);
  return [...new Set(fields)];
}

// ===== 2. Extract Admin collect fields (deep) =====
function extractAdminCollectFields(sectionId) {
  const regex = new RegExp(`id === ['"]${sectionId}['"][\\s\\S]*?(?=else if|function |$)`);
  const match = files.admin.match(regex);
  if (!match) return [];
  const code = match[0];
  const fields = [];
  // readInput('xxx')
  const r1 = /readInput\(['"]([\w_]+)['"]\)/g;
  let m;
  while ((m = r1.exec(code)) !== null) fields.push(m[1]);
  // readArray('xxx', [...])
  const r2 = /readArray\(['"]([\w_]+)['"]/g;
  while ((m = r2.exec(code)) !== null) fields.push(m[1]);
  // document.getElementById('xxx')
  const r3 = /getElementById\(['"]([\w_]+)['"]\)/g;
  while ((m = r3.exec(code)) !== null) fields.push(m[1]);
  return [...new Set(fields)];
}

// ===== 3. Check each section =====
const sections = [
  { render: "Site", collect: "site", name: "Site Settings" },
  { render: "Header", collect: "header", name: "Header" },
  { render: "Footer", collect: "footer", name: "Footer" },
  { render: "Home", collect: "home", name: "Home" },
  { render: "About", collect: "about", name: "About" },
  { render: "Services", collect: "services", name: "Services" },
  { render: "Contact", collect: "contact", name: "Contact" },
];

console.log("=".repeat(70));
console.log("DEEP CMS FIELD CONSISTENCY AUDIT");
console.log("=".repeat(70));

for (const sec of sections) {
  const rendered = extractAdminRenderFields(sec.render);
  const collected = extractAdminCollectFields(sec.collect);
  const renderSet = new Set(rendered);
  const collectSet = new Set(collected);
  const missingInCollect = rendered.filter(f => !collectSet.has(f));
  const missingInRender = collected.filter(f => !renderSet.has(f));

  console.log(`\n## ${sec.name}`);
  console.log(`  Rendered fields: ${rendered.length}`);
  console.log(`  Collected fields: ${collected.length}`);

  if (missingInCollect.length > 0) {
    console.log(`  ⚠️  Rendered but NOT collected (${missingInCollect.length}):`);
    missingInCollect.forEach(f => console.log(`     - ${f}`));
    missingInCollect.forEach(f => report(sec.name, `Rendered but NOT collected: ${f}`));
  }
  if (missingInRender.length > 0) {
    console.log(`  ⚠️  Collected but NOT rendered (${missingInRender.length}):`);
    missingInRender.forEach(f => console.log(`     - ${f}`));
    missingInRender.forEach(f => report(sec.name, `Collected but NOT rendered: ${f}`));
  }
  if (missingInCollect.length === 0 && missingInRender.length === 0) {
    console.log(`  ✅ All ${rendered.length} fields aligned`);
  }
}

// ===== 4. Check cms-data.ts merge functions for missing sub-field fallbacks =====
console.log("\n" + "=".repeat(70));
console.log("MERGE LOGIC — SUB-FIELD FALLBACK CHECK");
console.log("=".repeat(70));

const mergeChecks = [
  {
    name: "mergeContact → form",
    regex: /form:\s*\{[\s\S]*?\n\s*\},/,
    requiredFields: ["hours", "servicesList"], // fields that have explicit fallback
    riskFields: ["formTitle", "formDesc", "name", "company", "phone", "email", "service", "message", "submit", "submitting", "successMsg", "errorMsg", "infoTitle", "hoursTitle", "follow", "whatsapp", "whatsappLabel"],
  },
  {
    name: "mergeAbout → timeline",
    regex: /timeline:\s*\{[\s\S]*?\n\s*\},/,
    requiredFields: ["events"],
    riskFields: ["title", "subtitle", "events"],
  },
  {
    name: "mergeAbout → whyChoose",
    regex: /whyChoose:\s*\{[\s\S]*?\n\s*\},/,
    requiredFields: ["items", "features", "paragraphs"],
    riskFields: ["title", "desc", "image", "paragraphs", "features", "items"],
  },
];

for (const check of mergeChecks) {
  const match = files.data.match(check.regex);
  if (!match) {
    console.log(`❌ ${check.name}: block not found`);
    continue;
  }
  const code = match[0];
  const hasSpread = code.includes("...def.") && code.includes("...(loaded");
  const hasExplicitFallbacks = check.requiredFields.every(f => code.includes(f));

  if (hasSpread) {
    console.log(`⚠️  ${check.name}: uses shallow spread — loaded empty fields will overwrite defaults`);
    console.log(`     Risk fields: ${check.riskFields.join(", ")}`);
    report("Merge Logic", `${check.name}: shallow spread may lose default sub-fields`);
  } else if (hasExplicitFallbacks) {
    console.log(`✅ ${check.name}: explicit fallbacks for [${check.requiredFields.join(", ")}]`);
  } else {
    console.log(`⚠️  ${check.name}: missing explicit fallbacks`);
    report("Merge Logic", `${check.name}: missing explicit fallbacks`);
  }
}

// ===== 5. Summary =====
console.log("\n" + "=".repeat(70));
console.log("SUMMARY");
console.log("=".repeat(70));
if (issues.length === 0) {
  console.log("✅ No issues found — all fields appear aligned.");
} else {
  console.log(`⚠️  ${issues.length} issue(s) found:`);
  issues.forEach((issue, i) => console.log(`  ${i + 1}. ${issue}`));
}
console.log("=".repeat(70));
