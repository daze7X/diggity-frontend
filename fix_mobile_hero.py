import sys

files = [
    'app/products/[main]/[sub]/page.tsx',
    'app/products/[main]/[sub]/[slug]/page.tsx'
]

old_outer = 'className="hidden md:flex shrink-0 relative items-center justify-center w-72 h-72"'
new_outer = 'className="flex shrink-0 relative items-center justify-center w-48 h-48 md:w-72 md:h-72 mt-8 md:mt-0 self-center md:self-auto"'

old_inner = 'className="relative w-64 h-64 flex items-center justify-center animate-float"'
new_inner = 'className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center animate-float"'

old_icon = 'className="w-28 h-28 text-white/80"'
new_icon = 'className="w-16 h-16 md:w-28 md:h-28 text-white/80"'

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_outer in content and old_inner in content and old_icon in content:
        content = content.replace(old_outer, new_outer)
        content = content.replace(old_inner, new_inner)
        content = content.replace(old_icon, new_icon)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath} for mobile visibility.")
    else:
        print(f"Strings not found in {filepath}. Check manually.")
