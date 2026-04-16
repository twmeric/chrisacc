import os

path = r'E:\Projects\LTCPA\app\[lang]\services\[slug]\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('「', '"').replace('」', '"')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed quotation marks in', path)
