import sys

files = [
    'app/products/page.tsx',
    'app/products/[main]/[sub]/page.tsx'
]

old_str = '<div className="relative flex">'
new_str = '<div className="relative flex overflow-hidden">'

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_str in content:
        content = content.replace(old_str, new_str, 1) # Only replace the first occurrence (marquee wrapper)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed marquee overflow in {filepath}")
    else:
        print(f"Could not find target string in {filepath}")
