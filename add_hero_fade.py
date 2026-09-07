import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_boundary = """                    </ScrollReveal>
                </div>
            </div>

            {/* 2. OVERLAPPING CONTENT (-mt-24) */}"""

new_boundary = """                    </ScrollReveal>
                </div>

                {/* Soft Gradient Fade to Body Background */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none z-10" />
            </div>

            {/* 2. OVERLAPPING CONTENT (-mt-24) */}"""

if old_boundary in content:
    content = content.replace(old_boundary, new_boundary)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully added soft gradient fade to hero bottom.")
else:
    print("Could not find the exact boundary string.")
