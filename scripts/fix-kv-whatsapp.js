const fs = require('fs');

const token = fs.readFileSync('.cloudflare-token', 'utf8').trim();
const accountId = 'dfbee5c2a5706a81bc04675499c933d4';
const nsId = 'ca4e0945e6fc4ef590e4a57548da7626';

async function main() {
  const getRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${nsId}/values/cms_data`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!getRes.ok) { console.error('GET failed:', getRes.status); return; }
  const data = await getRes.json();

  const newNum = '+85255055692';
  let changed = false;
  for (const loc of ['zh-hant', 'zh-hans', 'en']) {
    if (data[loc]) {
      if (data[loc].site) { data[loc].site.whatsapp = newNum; changed = true; }
      if (data[loc].footer && data[loc].footer.contact) { data[loc].footer.contact.whatsapp = newNum; changed = true; }
      if (data[loc].contact && data[loc].contact.form) { data[loc].contact.form.whatsapp = newNum; changed = true; }
    }
  }
  console.log('Fields updated:', changed);

  const putRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${nsId}/values/cms_data`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const putText = await putRes.text();
  console.log('PUT status:', putRes.status);
  console.log('PUT response:', putText);
}
main().catch(console.error);
