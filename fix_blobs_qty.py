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

new_blobs = """                    {/* Morphing Blob Decoration (Lava Lamp Ecosystem) */}
                    {/* Blob 1: Large, Right Center */}
                    <div className="absolute right-0 lg:-right-10 top-1/4 w-72 h-72 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob pointer-events-none hidden lg:block opacity-50">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-white/20 animate-spin-slow" style={{ animationDuration: '15s' }} />
                    </div>
                    
                    {/* Blob 2: Medium, Left Center */}
                    <div className="absolute left-0 lg:left-10 top-1/2 -translate-y-1/2 w-56 h-56 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob-fast pointer-events-none hidden lg:block opacity-40 delay-700">
                        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/20 to-white/20 animate-spin-slow" style={{ animationDuration: '12s' }} />
                    </div>

                    {/* Blob 3: Small, Top Left */}
                    <div className="absolute left-1/4 top-10 w-32 h-32 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob pointer-events-none hidden lg:block opacity-60" style={{ animationDelay: '2s', animationDuration: '18s' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-transparent animate-spin-slow" style={{ animationDuration: '10s' }} />
                    </div>

                    {/* Blob 4: Huge background blob, Bottom Right */}
                    <div className="absolute right-1/4 bottom-0 translate-y-1/2 w-96 h-96 bg-white/5 border border-white/5 shadow-2xl overflow-hidden animate-morph-blob-fast pointer-events-none hidden lg:block opacity-20" style={{ animationDelay: '4s', animationDuration: '24s' }}>
                        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/20 to-transparent animate-spin-slow" style={{ animationDuration: '20s' }} />
                    </div>

                    {/* Blob 5: Extra Small, Bottom Left */}
                    <div className="absolute left-1/3 bottom-10 w-24 h-24 bg-white/10 border border-white/20 shadow-xl overflow-hidden animate-morph-blob pointer-events-none hidden lg:block opacity-70" style={{ animationDelay: '1s' }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-400/30 to-white/30 animate-spin-slow" style={{ animationDuration: '8s' }} />
                    </div>"""

if old_blobs in content:
    content = content.replace(old_blobs, new_blobs)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully replaced blobs in page.tsx")
else:
    print("Could not find exact old_blobs string. Trying regex...")
    pattern = re.compile(r'\{\/\* Morphing Blob Decoration \*\/.*?delay-700">.*?<\/div>\s*<\/div>', re.DOTALL)
    content = pattern.sub(new_blobs, content)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Replaced blobs via regex.")
