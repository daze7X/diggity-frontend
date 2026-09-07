import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

new_blobs = """                    {/* SVG Filter for Gooey Effect */}
                    <svg className="absolute hidden">
                        <defs>
                            <filter id="goo">
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
                    <div className="absolute inset-0 z-0 pointer-events-none hidden lg:flex items-center justify-center opacity-40 mix-blend-screen" style={{ filter: "url('#goo')" }}>
                        
                        {/* Central Hub Blob */}
                        <div className="absolute w-80 h-80 bg-blue-600 rounded-full animate-morph-blob mix-blend-screen" />

                        {/* Blob 1: Sweeps Top/Right */}
                        <div className="absolute w-72 h-72 bg-indigo-500 rounded-full animate-gooey-1 mix-blend-screen" />

                        {/* Blob 2: Sweeps Bottom/Left */}
                        <div className="absolute w-80 h-80 bg-purple-600 rounded-full animate-gooey-2 mix-blend-screen" />

                        {/* Blob 3: Sweeps Diagonally */}
                        <div className="absolute w-56 h-56 bg-cyan-500 rounded-full animate-gooey-3 mix-blend-screen" />

                    </div>"""

pattern = re.compile(r'\{\/\* Morphing Blob Decoration \(Lava Lamp Ecosystem\) \*\/.*?animationDuration: \'8s\' \}\} \/>\s*<\/div>', re.DOTALL)
content = pattern.sub(new_blobs, content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Replaced blobs with true gooey metaballs.")
