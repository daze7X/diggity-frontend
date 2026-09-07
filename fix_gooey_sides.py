import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_gooey = """                {/* Lava Lamp Chamber with Gooey Filter (True Metaballs) */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden lg:flex items-center justify-center opacity-40 mix-blend-screen transform-gpu overflow-hidden" style={{ filter: "url('#goo')", willChange: "filter, transform" }}>
                    
                    {/* Central Hub Blob */}
                    <div className="absolute w-80 h-80 bg-blue-600 rounded-full animate-morph-blob mix-blend-screen" />

                    {/* Blob 1: Sweeps Top/Right */}
                    <div className="absolute w-72 h-72 bg-indigo-500 rounded-full animate-gooey-1 mix-blend-screen" />

                    {/* Blob 2: Sweeps Bottom/Left */}
                    <div className="absolute w-80 h-80 bg-purple-600 rounded-full animate-gooey-2 mix-blend-screen" />

                    {/* Blob 3: Sweeps Diagonally */}
                    <div className="absolute w-56 h-56 bg-cyan-500 rounded-full animate-gooey-3 mix-blend-screen" />

                </div>"""

new_gooey = """                {/* Lava Lamp Chamber with Gooey Filter (True Metaballs) */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block opacity-40 mix-blend-screen transform-gpu overflow-hidden" style={{ filter: "url('#goo')", willChange: "filter, transform" }}>
                    
                    {/* LEFT FLANK CLUSTER */}
                    <div className="absolute -left-32 top-1/4 w-96 h-96 bg-blue-600 rounded-full animate-morph-blob mix-blend-screen" />
                    <div className="absolute -left-10 top-1/3 w-72 h-72 bg-indigo-500 rounded-full animate-gooey-1 mix-blend-screen" />

                    {/* RIGHT FLANK CLUSTER */}
                    <div className="absolute -right-32 bottom-1/4 w-96 h-96 bg-purple-600 rounded-full animate-morph-blob-fast mix-blend-screen" />
                    <div className="absolute -right-10 bottom-1/3 w-64 h-64 bg-cyan-500 rounded-full animate-gooey-2 mix-blend-screen" />

                </div>"""

if old_gooey in content:
    content = content.replace(old_gooey, new_gooey)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully moved gooey blobs to the side flanks.")
else:
    print("Could not find the old gooey block to replace.")
