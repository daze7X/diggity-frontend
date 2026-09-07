import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_grid = """                {/* Grid Pattern */}
                <div className="absolute inset-0 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />"""

new_wave = """                {/* Dynamic Wave Background */}
                <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
                    <Image
                        src="/images/hero-bg-dark.svg"
                        alt="Hero Wave Background"
                        fill
                        priority
                        className="object-cover object-top opacity-20 mix-blend-overlay"
                    />
                </div>"""

if old_grid in content:
    content = content.replace(old_grid, new_wave)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully replaced Grid Pattern with Wave Background.")
else:
    print("Could not find Grid Pattern string.")
