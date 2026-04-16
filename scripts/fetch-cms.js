const fs = require("fs");
const path = require("path");

const WORKER_URL = process.env.NEXT_PUBLIC_CMS_API_URL || "https://ltcpa-cms-api.jimsbond007.workers.dev";

async function fetchCMSData() {
  try {
    const res = await fetch(`${WORKER_URL}/api/cms/data`);
    if (!res.ok) {
      console.warn(`CMS API returned ${res.status}, using defaults only.`);
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
