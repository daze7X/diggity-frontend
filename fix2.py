import os

path = r'd:\SEMESTER 6\PKL\diggity-frontend\app\solutions\[slug]\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(\"'{\", \"\")
content = content.replace(\"}'\", \"\")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed quotes!')
