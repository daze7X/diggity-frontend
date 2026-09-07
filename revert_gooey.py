import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

new_gooey = """                    {/* SVG Filter for Gooey Effect */}
                    <svg className="absolute hidden">
                        <defs>
                            <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="
                                    1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 22 -9" result="goo" />
                                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                            </filter>
                        </defs>
                    </svg>

                    {/* Lava Lamp Chamber with Gooey Filter (True Metaballs) */}
                    <div className="absolute inset-0 z-0 pointer-events-none hidden lg:flex items-center justify-center opacity-40 mix-blend-screen transform-gpu" style={{ filter: "url('#goo')", willChange: "filter, transform" }}>
                        
                        {/* Central Hub Blob */}
                        <div className="absolute w-80 h-80 bg-blue-600 rounded-full animate-morph-blob mix-blend-screen" />

                        {/* Blob 1: Sweeps Top/Right */}
                        <div className="absolute w-72 h-72 bg-indigo-500 rounded-full animate-gooey-1 mix-blend-screen" />

                        {/* Blob 2: Sweeps Bottom/Left */}
                        <div className="absolute w-80 h-80 bg-purple-600 rounded-full animate-gooey-2 mix-blend-screen" />

                        {/* Blob 3: Sweeps Diagonally */}
                        <div className="absolute w-56 h-56 bg-cyan-500 rounded-full animate-gooey-3 mix-blend-screen" />

                    </div>"""

pattern = re.compile(r'\{\/\* SVG Filter for Giant Plasma Effect \*\/.*?<\/div>\s*<\/div>', re.DOTALL)
content = pattern.sub(new_gooey, content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Reverted to the colorful centralized gooey blobs.")
