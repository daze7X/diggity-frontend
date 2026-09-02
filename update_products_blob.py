import sys

filepath = 'app/products/page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "{/* Right: Hero Image - Non-Mainstream Organic/Asymmetric Shape */}"
end_marker = "</div>\n                </div>\n            </div>"

start_idx = content.find(start_marker)

# Find the end of this div block. It's the end of the `lg:gap-20` container.
# The original structure:
# {/* Right: ... */}
# <div className="w-full lg:w-1/2 relative group px-6">
# ...
# </div>
# </div>
# </div>

if start_idx == -1:
    print("Could not find start marker")
    sys.exit(1)

# Find the specific closing sequence for the hero image column
# Basically, search for `priority\n                                />\n                            </div>\n                        </div>`
end_str = "/>\n                            </div>\n                        </div>"
end_idx = content.find(end_str, start_idx) + len(end_str)

new_hero_right = """{/* Right: Hero Image - Morphing Organic Blob */}
                    <div className="w-full lg:w-1/2 relative group px-6 aspect-square">
                        <style dangerouslySetInnerHTML={{__html: `
                            @keyframes morphBlob {
                                0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                                50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                                100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                            }
                            .animate-morph-blob {
                                animation: morphBlob 12s ease-in-out infinite;
                            }
                            .animate-morph-blob-fast {
                                animation: morphBlob 8s ease-in-out infinite reverse;
                            }
                        `}} />
                        
                        {/* Glowing backdrop orbs */}
                        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-blue/30 blur-[80px] rounded-full group-hover:bg-brand-blue/50 transition-all duration-700 pointer-events-none" />
                        <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full group-hover:bg-emerald-500/40 transition-all duration-700 pointer-events-none" />
                        
                        {/* Abstract Wireframe/Border behind the image */}
                        <div 
                            className="absolute inset-0 border-2 border-brand-blue/20 dark:border-glass-border translate-x-4 translate-y-4 transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6 animate-morph-blob-fast pointer-events-none"
                        />
                        
                        {/* The actual Image Container with Morphing Blob Shape */}
                        <div 
                            className="absolute inset-0 bg-white/40 dark:bg-glass-bg/40 backdrop-blur-md border border-glass-border shadow-2xl p-3 overflow-hidden transition-all duration-700 group-hover:scale-[1.02] animate-morph-blob z-10"
                        >
                            <div className="w-full h-full relative rounded-[inherit] overflow-hidden">
                                <Image 
                                    src="/images/saas_hero.jpg" 
                                    alt="Diggity Dashboard 3D Illustration" 
                                    fill
                                    className="object-cover opacity-90 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            </div>
                        </div>
                    </div>"""

new_content = content[:start_idx] + new_hero_right + content[end_idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Morphing blob added to Products page!")
