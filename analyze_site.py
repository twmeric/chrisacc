import requests, re, json
url = 'https://nis.kkairsoft.com/chrisacc/005/'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
resp = requests.get(url, headers=headers, timeout=30)
html = resp.text

title = re.search(r'<title>(.*?)</title>', html, re.I)
meta_desc = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']', html, re.I)
if not meta_desc:
    meta_desc = re.search(r'<meta[^>]*content=["\'](.*?)["\'][^>]*name=["\']description["\']', html, re.I)

css_links = re.findall(r'href=["\']([^"\']*\.css[^"\']*)["\']', html)
sections = re.findall(r'<section', html, re.I)
divs = html.count('<div')
images = re.findall(r'<img[^>]*src=["\']([^"\']*)["\']', html, re.I)
scripts = re.findall(r'src=["\']([^"\']*\.js[^"\']*)["\']', html)
style_blocks = re.findall(r'<style[^>]*>(.*?)</style>', html, re.S|re.I)

print('URL:', url)
print('Status:', resp.status_code)
print('Title:', title.group(1) if title else 'N/A')
print('Description:', meta_desc.group(1) if meta_desc else 'N/A')
print('Sections:', len(sections))
print('CSS files:', len(css_links))
for c in css_links[:10]:
    print('  CSS:', c)
print('Images:', len(images))
for i in images[:20]:
    print('  IMG:', i)
print('Scripts:', len(scripts))
for s in scripts[:10]:
    print('  JS:', s)
print('Style blocks:', len(style_blocks))
for idx, sb in enumerate(style_blocks[:3]):
    preview = sb[:500].replace('\n', ' ')
    print(f'  STYLE {idx+1}:', preview[:300])
