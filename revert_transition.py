import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_block = """            </div>

            {/* Soft Blue Bleed Downwards */}
            <div className="w-full h-48 bg-gradient-to-b from-brand-blue dark:from-brand-bg to-transparent pointer-events-none -mb-48 relative z-0" />

            {/* 2. OVERLAPPING CONTENT (-mt-24) */}"""

new_block = """            </div>

            {/* 2. OVERLAPPING CONTENT (-mt-24) */}"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully reverted to the harsh transition.")
else:
    print("Could not find the blue bleed block.")
