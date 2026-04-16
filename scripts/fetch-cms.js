const fs = require("fs");
const path = require("path");

const WORKER_URL = process.env.NEXT_PUBLIC_CMS_API_URL || "https://ltcpa-cms-api.jimsbond007.workers.dev";

async function fetchCMSData() {
  try {
    const res = await fetch(`${WORKER_URL}/api/cms/data`);
    if (!res.ok) {
      console.warn(`CMS API returned ${res.status}, using defaults only.`);
      // If API fails, just ensure cms.json exists as empty object so defaults take over
      fs.writeFileSync(path.join(__dirname, "..", "src", "data", "cms.json"), "{}");
      return;
    }
    const data = await res.json();
    fs.writeFileSync(path.join(__dirname, "..", "src", "data", "cms.json"), JSON.stringify(data, null, 2));
    console.log("CMS data fetched successfully.");
  } catch (err) {
    console.warn("Failed to fetch CMS data:", err.message);
    fs.writeFileSync(path.join(__dirname, "..", "src", "data", "cms.json"), "{}");
  }
}

fetchCMSData();
