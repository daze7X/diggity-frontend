import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

new_gooey = """                    {/* SVG Filter for Giant Plasma Effect */}
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

pattern = re.compile(r'\{\/\* SVG Filter for Gooey Effect \*\/.*?<\/div>\s*<\/div>', re.DOTALL)
content = pattern.sub(new_gooey, content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Replaced scattered blobs with Giant Ambient Plasma Core.")
