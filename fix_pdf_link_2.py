import sys
import re

path = "app/about/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix the botched line using regex
pattern = r'href=\{settings\?\.company_profile_pdf \? .*? : "/company-profile-diggity\.pdf"\}'
replacement = 'href={settings?.company_profile_pdf ? `${process.env.NEXT_PUBLIC_STORAGE_URL || \'http://127.0.0.1:8000/storage\'}/${settings.company_profile_pdf}` : "/company-profile-diggity.pdf"}'

content = re.sub(pattern, replacement, content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed frontend PDF link with regex.")
