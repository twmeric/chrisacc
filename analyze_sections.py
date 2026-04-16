import re

with open('site_clone/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find sections by looking for <section ... > ... </section>
# But the regex above may have issues with nested sections. Let's use a simpler approach.
# Find all section class names
section_classes = re.findall(r'<section[^>]*class=["\']([^"\']+)["\']', html, re.S)
print('Section classes:', section_classes)

# Find hero section content
hero = re.search(r'<section[^>]*class=["\']hero["\'](.*?)<\/section>', html, re.S)
if hero:
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', hero.group(1), re.S)
    h2 = re.search(r'<h2[^>]*>(.*?)</h2>', hero.group(1), re.S)
    print('Hero h1:', re.sub(r'<[^>]+>', ' ', h1.group(1)).strip() if h1 else 'N/A')
    print('Hero h2:', re.sub(r'<[^>]+>', ' ', h2.group(1)).strip() if h2 else 'N/A')

# Find services section
services_sec = re.search(r'<section[^>]*class=["\']services["\'](.*?)<\/section>', html, re.S)
if services_sec:
    service_cards = re.findall(r'<div[^>]*class=["\']service-card["\'](.*?)<\/div>(?=\s*<div|\s*<\/section>)', services_sec.group(1), re.S)
    print('Service cards:', len(service_cards))
    for i, card in enumerate(service_cards):
        title = re.search(r'<h3[^>]*>(.*?)</h3>', card, re.S)
        print(f'  Card {i+1}:', re.sub(r'<[^>]+>', ' ', title.group(1)).strip() if title else 'N/A')

# Check for footer
footer = re.search(r'<footer(.*?)<\/footer>', html, re.S)
if footer:
    cols = re.findall(r'<div[^>]*class=["\']footer-col["\'](.*?)<\/div>(?=\s*<div|\s*<\/footer>)', footer.group(1), re.S)
    print('Footer cols:', len(cols))
