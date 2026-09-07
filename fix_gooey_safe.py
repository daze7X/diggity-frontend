import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_blobs = """                    {/* Morphing Blob Decoration */}
                    <div className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob pointer-events-none hidden lg:block opacity-50">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '15s' }} />
                    </div>
                    
                    <div className="absolute left-0 lg:left-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob-fast pointer-events-none hidden lg:block opacity-30 delay-700">
                        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '12s' }} />
                    </div>"""

# Remove the old blobs that are inside the text container
if old_blobs in content:
    content = content.replace(old_blobs, "")
else:
    print("Could not find old blobs!")

# Now inject the new gooey container ABOVE the max-w-7xl container
new_gooey = """                {/* SVG Filter for Gooey Effect */}
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
                <div className="absolute inset-0 z-0 pointer-events-none hidden lg:flex items-center justify-center opacity-40 mix-blend-screen transform-gpu overflow-hidden" style={{ filter: "url('#goo')", willChange: "filter, transform" }}>
                    
                    {/* Central Hub Blob */}
                    <div className="absolute w-80 h-80 bg-blue-600 rounded-full animate-morph-blob mix-blend-screen" />

                    {/* Blob 1: Sweeps Top/Right */}
                    <div className="absolute w-72 h-72 bg-indigo-500 rounded-full animate-gooey-1 mix-blend-screen" />

                    {/* Blob 2: Sweeps Bottom/Left */}
                    <div className="absolute w-80 h-80 bg-purple-600 rounded-full animate-gooey-2 mix-blend-screen" />

                    {/* Blob 3: Sweeps Diagonally */}
                    <div className="absolute w-56 h-56 bg-cyan-500 rounded-full animate-gooey-3 mix-blend-screen" />

                </div>

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">"""

target_anchor = '<div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">'

if target_anchor in content:
    content = content.replace(target_anchor, new_gooey)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully injected the colorful gooey chamber unboxed.")
else:
    print("Could not find target anchor.")
