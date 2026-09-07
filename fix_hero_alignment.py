import re

files = [
    r"D:\SEMESTER 6\PKL\diggity-frontend\app\solutions\page.tsx",
    r"D:\SEMESTER 6\PKL\diggity-frontend\app\academy\page.tsx"
]

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Add negative top margin to compensate for the missing badge pill
    old_str = '<div className="max-w-2xl space-y-8 text-center lg:text-left">'
    new_str = '<div className="max-w-2xl space-y-8 text-center lg:text-left lg:-mt-12">'
    
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Successfully adjusted alignment in {filepath}")
    else:
        print(f"Could not find the target string in {filepath}")
