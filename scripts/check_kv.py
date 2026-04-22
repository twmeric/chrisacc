import urllib.request, json, codecs
req = urllib.request.Request('https://ltcpa-cms-api.jimsbond007.workers.dev/api/cms/data', headers={'User-Agent':'Mozilla/5.0'})
data = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
out = []
for loc in ['zh-hant','zh-hans','en']:
    c = data.get(loc,{}).get('contact',{})
    out.append(f'{loc}:')
    out.append(f'  pageTitle = {c.get("pageTitle", "MISSING")}')
    out.append(f'  formTitle = {c.get("form",{}).get("formTitle", "MISSING")}')
    out.append(f'  cards count = {len(c.get("cards", []))}')
    f = data.get(loc,{}).get('footer',{})
    out.append(f'  footer.aboutTitle = {f.get("aboutTitle", "MISSING")}')
    out.append(f'  footer.contact.whatsapp = {f.get("contact",{}).get("whatsapp", "MISSING")}')
with codecs.open('scripts/check_kv_out.txt', 'w', 'utf-8') as f:
    f.write('\n'.join(out))
print('done')
