import re
from html.parser import HTMLParser

def strip_tags(html):
    class MLStripper(HTMLParser):
        def __init__(self):
            super().__init__()
            self.reset()
            self.fed = []
        def handle_data(self, d):
            self.fed.append(d)
        def get_data(self):
            return ' '.join(self.fed)
    s = MLStripper()
    s.feed(html)
    return s.get_data()

def extract_sections(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
    
    body = re.search(r'<body>(.*?)</body>', html, re.S)
    if not body:
        return []
    
    # Find all sections in body
    sections = re.findall(r'<section[^>]*class=["\']([^"\']+)["\'][^>]*>(.*?)</section>', body.group(1), re.S)
    
    results = []
    for cls, content in sections:
        # Extract h1/h2/h3
        headings = re.findall(r'<h[1-3][^>]*>(.*?)</h[1-3]>', content, re.S)
        headings_text = [strip_tags(h).strip() for h in headings[:3]]
        
        # Count child divs with classes
        div_classes = re.findall(r'<div[^>]*class=["\']([^"\']+)["\']', content)
        
        # First 100 chars of text
        text = strip_tags(content)
        text = ' '.join(text.split())[:150]
        
        results.append({
            'class': cls,
            'headings': headings_text,
            'div_count': len(div_classes),
            'text_preview': text
        })
    
    return results

for page in ['index.html', 'about.html', 'contact.html', 'audit.html']:
    print(f"\n=== {page} ===")
    sections = extract_sections(f'site_clone/{page}')
    for i, sec in enumerate(sections):
        print(f"Section {i+1}: .{sec['class']}")
        print(f"  Headings: {sec['headings']}")
        print(f"  Divs: {sec['div_count']}")
        print(f"  Preview: {sec['text_preview']}...")
