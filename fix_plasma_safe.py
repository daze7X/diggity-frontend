import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_str = """                    {/* Morphing Blob Decoration */}
                    <div className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob pointer-events-none hidden lg:block opacity-50">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '15s' }} />
                    </div>
                    
                    <div className="absolute left-0 lg:left-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob-fast pointer-events-none hidden lg:block opacity-30 delay-700">
                        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '12s' }} />
                    </div>"""

new_str = """                    {/* SVG Filter for Giant Plasma Effect */}
                    <svg className="absolute hidden">
                        <defs>
                            <filter id="goo-plasma">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="
                                    1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 35 -15" result="goo" />
                                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                            </filter>
                        </defs>
                    </svg>

                    {/* GIANT PLASMA CHAMBER */}
                    <div className="absolute inset-0 z-0 pointer-events-none hidden lg:flex items-center justify-center opacity-30 mix-blend-screen transform-gpu overflow-hidden" style={{ filter: "url('#goo-plasma')", willChange: "filter, transform" }}>
                        
                        {/* Core Blob (The Mother Mass) */}
                        <div className="absolute w-[600px] h-[600px] bg-indigo-600 rounded-full mix-blend-screen" style={{ animation: "plasmaCore 25s infinite linear" }} />
                        
                        {/* Aggressive Splitter 1 (Shoots sideways and stretches) */}
                        <div className="absolute w-[450px] h-[450px] bg-blue-600 rounded-full mix-blend-screen" style={{ animation: "plasmaCore 15s infinite reverse, plasmaSplit1 30s infinite cubic-bezier(0.4, 0, 0.2, 1)" }} />
                        
                        {/* Aggressive Splitter 2 (Shoots vertically and stretches) */}
                        <div className="absolute w-[500px] h-[500px] bg-cyan-600 rounded-full mix-blend-screen" style={{ animation: "plasmaCore 18s infinite linear, plasmaSplit2 35s infinite cubic-bezier(0.4, 0, 0.2, 1)" }} />

                    </div>"""

if old_str in content:
    content = content.replace(old_str, new_str)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully injected Giant Plasma Chamber.")
else:
    print("Could not find exact string. Please check formatting.")
