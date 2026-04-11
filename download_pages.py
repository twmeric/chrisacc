#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import urllib.request
import ssl
import os

pages = [
    'index', 'about', 'services', 'audit', 'tax', 'risk', 
    'forensic', 'consulting', 'deals', 'commitment', 
    'purpose', 'value', 'contact', 'sitemap'
]

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

os.makedirs('web', exist_ok=True)

for page in pages:
    for lang in ['', '-en', '-sc']:
        filename = f'{page}{lang}.html'
        filepath = f'web/{filename}'
        
        try:
            url = f'https://71d7e7b7.ltcpa-website.pages.dev/{filename}'
            req = urllib.request.Request(url, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            })
            
            with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
                # Read as bytes and decode with UTF-8
                html_bytes = resp.read()
                
                # Try UTF-8 first
                try:
                    html = html_bytes.decode('utf-8')
                except:
                    # Fallback to other encodings
                    for encoding in ['utf-8-sig', 'gbk', 'big5', 'latin-1']:
                        try:
                            html = html_bytes.decode(encoding)
                            break
                        except:
                            continue
                
                # Write with UTF-8 BOM for Windows compatibility
                with open(filepath, 'w', encoding='utf-8-sig') as f:
                    f.write(html)
                
                print(f'[OK] {filename} - {len(html)} chars')
                
        except Exception as e:
            print(f'[FAIL] {filename} - {str(e)[:50]}')

print('\nDownload complete!')
