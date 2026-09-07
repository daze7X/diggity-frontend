import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# I will find the end of the hero section including the old white fade
old_block = """                {/* Soft Gradient Fade to Body Background */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none z-10" />
            </div>

            {/* 2. OVERLAPPING CONTENT (-mt-24) */}"""

new_block = """            </div>

            {/* Soft Blue Bleed Downwards */}
            <div className="w-full h-48 bg-gradient-to-b from-brand-blue dark:from-brand-bg to-transparent pointer-events-none -mb-48 relative z-0" />

            {/* 2. OVERLAPPING CONTENT (-mt-24) */}"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully changed to blue bleed downwards.")
else:
    print("Could not find the old white fade block.")
