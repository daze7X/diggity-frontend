import sys

filepath = 'app/products/[main]/[sub]/page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

old_block = """                    <div className="hidden md:flex shrink-0">
                        <div className="w-48 h-48 bg-white/5 border border-white/10 rounded-full flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }} />
                            <LayoutGrid className="w-16 h-16 text-white/50" />
                        </div>
                    </div>"""

new_block = """                    <div className="hidden md:flex shrink-0 relative items-center justify-center w-72 h-72">
                        {/* Glowing Pulse Aura */}
                        <div className="absolute inset-0 bg-brand-blue/30 blur-3xl rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
                        
                        {/* Morphing Blob & Levitation */}
                        <div className="relative w-64 h-64 flex items-center justify-center animate-float">
                            {/* The morphing shape */}
                            <div 
                                className="absolute inset-0 bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl overflow-hidden animate-morph-blob" 
                            >
                                {/* Spinning Gradient inside blob */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '15s' }} />
                            </div>
                            
                            {/* Dynamic Icon */}
                            <div className="relative z-10 flex items-center justify-center drop-shadow-2xl">
                                <SubServiceIcon 
                                    slug={subcategory?.slug || ""} 
                                    fallbackCategoryIcon="layers" 
                                    className="w-28 h-28 text-white/80" 
                                />
                            </div>
                        </div>
                    </div>"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced subcategory hero icon block.")
else:
    print("Could not find the block to replace!")
