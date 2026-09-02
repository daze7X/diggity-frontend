import sys

filepath = 'components/Navbar.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the specific class for products mega menu
old_class = "w-[900px] max-w-[95vw] bg-white dark:bg-brand-bg border border-glass-border rounded-3xl p-8 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
new_class = "w-[900px] max-w-[95vw] bg-white/95 dark:bg-brand-bg/95 backdrop-blur-2xl border border-glass-border rounded-3xl p-8 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"

if old_class in content:
    content = content.replace(old_class, new_class)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed mega menu opacity")
else:
    print("Could not find the target string. Looking for partial matches...")
    print("Found 'w-[900px] max-w-[95vw] bg-white':", "w-[900px] max-w-[95vw] bg-white" in content)
