import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_gooey = """                    {/* Lava Lamp Chamber with Gooey Filter (True Metaballs) */}
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

new_gooey = """                    {/* Lava Lamp Chamber with Gooey Filter (True Metaballs) */}
                    <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block opacity-40 mix-blend-screen" style={{ filter: "url('#goo')" }}>
                        
                        {/* Blob 1: Anchor Right */}
                        <div className="absolute -right-20 top-1/4 w-96 h-96 bg-blue-600 rounded-full animate-morph-blob mix-blend-screen" style={{ animationDuration: '20s' }} />

                        {/* Blob 2: Anchor Left */}
                        <div className="absolute -left-20 bottom-1/4 w-80 h-80 bg-indigo-500 rounded-full animate-morph-blob-fast mix-blend-screen" style={{ animationDuration: '18s' }} />

                        {/* Blob 3: Wandering from Top Left */}
                        <div className="absolute left-1/4 top-0 w-64 h-64 bg-purple-500 rounded-full animate-gooey-1 mix-blend-screen" />

                        {/* Blob 4: Wandering from Bottom Right */}
                        <div className="absolute right-1/4 bottom-0 w-72 h-72 bg-cyan-500 rounded-full animate-gooey-2 mix-blend-screen" />
                        
                        {/* Blob 5: Center-Crossing Nomad */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-400 rounded-full animate-gooey-3 mix-blend-screen" />

                    </div>"""

if old_gooey in content:
    content = content.replace(old_gooey, new_gooey)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully scattered the gooey blobs.")
else:
    print("Could not find the exact block. Regex fallback...")
    pattern = re.compile(r'\{\/\* Lava Lamp Chamber with Gooey Filter \(True Metaballs\) \*\/.*?<\/div>\s*<\/div>', re.DOTALL)
    content = pattern.sub(new_gooey, content)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Regex replacement done.")
