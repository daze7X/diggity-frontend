import re
import os

files_to_clean = [
    r"D:\SEMESTER 6\PKL\diggity-frontend\app\contact\page.tsx",
    r"D:\SEMESTER 6\PKL\diggity-frontend\app\academy\page.tsx",
    r"D:\SEMESTER 6\PKL\diggity-frontend\app\solutions\page.tsx",
    r"D:\SEMESTER 6\PKL\diggity-frontend\app\products\[main]\[sub]\page.tsx"
]

patterns = [
    # Contact page pattern
    re.compile(r'\s*<div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3 py-1\.5 rounded-full mb-[0-9]+">.*?<\/div>\n', re.DOTALL),
    # Academy & Solutions pattern
    re.compile(r'\s*<div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">.*?<\/div>\n', re.DOTALL),
    # Products subcategory pattern
    re.compile(r'\s*<div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/5 border border-brand-blue/10 rounded-full">.*?<\/div>\n', re.DOTALL)
]

for filepath in files_to_clean:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    original_content = content
    for pattern in patterns:
        content = pattern.sub('\n', content)
        
    if content != original_content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Cleaned badges from {os.path.basename(filepath)}")
    else:
        print(f"No badges found in {os.path.basename(filepath)}")
