import urllib.request

urls = [
    "https://63656ce6.ltcpa-website.pages.dev/admin/",
    "https://63656ce6.ltcpa-website.pages.dev/admin/index.html",
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        resp = urllib.request.urlopen(req, timeout=15)
        html = resp.read().decode('utf-8')
        print(f"URL: {url}")
        print(f"Status: {resp.status}")
        title = ""
        if "<title>" in html:
            title = html.split("<title>")[1].split("</title>")[0]
        print(f"Title: {title}")
        has_decap = "decap-cms" in html
        print(f"Has decap-cms: {has_decap}")
        print("-" * 40)
    except Exception as e:
        print(f"URL: {url}")
        print(f"Error: {e}")
        print("-" * 40)
