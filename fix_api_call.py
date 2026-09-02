import sys

filepath = 'app/products/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("api.getSettings()", "api.getCompanySettings()")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed API call to getCompanySettings()")
