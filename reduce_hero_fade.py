import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_fade = 'className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none z-10"'
new_fade = 'className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none z-10"'

if old_fade in content:
    content = content.replace(old_fade, new_fade)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully reduced gradient fade height to h-24.")
else:
    print("Could not find the h-48 gradient string.")
