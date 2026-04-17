require('ts-node/register');
const { defaultCMSData } = require('../lib/cms-defaults');

const API_BASE = 'https://ltcpa-cms-api.jimsbond007.workers.dev/api/cms';
const TOKEN = 'admin360';

async function main() {
  const res = await fetch(`${API_BASE}/data`);
  if (!res.ok) throw new Error('Failed to fetch current data: ' + res.status);
  const current = await res.json();

  const merged = JSON.parse(JSON.stringify(current));
  for (const locale of ['zh-hant', 'zh-hans', 'en']) {
    if (!merged[locale]) merged[locale] = {};
    merged[locale].about = defaultCMSData[locale].about;
  }

  const postRes = await fetch(`${API_BASE}/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Token': TOKEN,
    },
    body: JSON.stringify(merged),
  });

  if (!postRes.ok) {
    const text = await postRes.text();
    console.error('Failed to save:', postRes.status, text);
    process.exit(1);
  }

  const postData = await postRes.json();
  console.log('Success:', postData);
}

main().catch(e => { console.error(e); process.exit(1); });
