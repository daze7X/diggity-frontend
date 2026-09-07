import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_p = '<p className="text-center text-[10px] font-bold uppercase tracking-widest text-text-muted mb-6">'
new_p = '<p className="text-center text-[10px] font-bold uppercase tracking-widest text-white/80 mb-6">'

if old_p in content:
    content = content.replace(old_p, new_p)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully changed 'Trusted By' text color to white/80.")
else:
    print("Could not find the text tag to replace.")
