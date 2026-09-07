import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add will-change and translate-z-0 for GPU acceleration
old_div = """<div className="absolute inset-0 z-0 pointer-events-none hidden lg:block opacity-40 mix-blend-screen" style={{ filter: "url('#goo')" }}>"""
new_div = """<div className="absolute inset-0 z-0 pointer-events-none hidden lg:block opacity-40 mix-blend-screen transform-gpu" style={{ filter: "url('#goo')", willChange: "filter, transform" }}>"""

if old_div in content:
    content = content.replace(old_div, new_div)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Added GPU acceleration to gooey chamber.")
else:
    print("Could not find gooey chamber div.")
