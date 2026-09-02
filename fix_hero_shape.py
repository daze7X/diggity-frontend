import sys

filepath = 'app/products/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

old_block = """                    {/* Right: Hero Image */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-brand-blue/5 blur-3xl rounded-full transform scale-110" />
                        <div className="relative rounded-3xl overflow-hidden border border-glass-border shadow-2xl bg-white dark:bg-glass-bg p-2">
                            <Image 
                                src="/images/saas_hero.jpg" 
                                alt="Diggity Dashboard 3D Illustration" 
                                width={800} 
                                height={600} 
                                className="w-full h-auto rounded-2xl object-cover"
                                priority
                            />
                        </div>
                    </div>"""

new_block = """{/* Right: Hero Image - Non-Mainstream Organic/Asymmetric Shape */}
                    <div className="w-full lg:w-1/2 relative group px-6">
                        {/* Glowing backdrop orbs */}
                        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-blue/30 blur-[80px] rounded-full group-hover:bg-brand-blue/50 transition-all duration-700 pointer-events-none" />
                        <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full group-hover:bg-emerald-500/40 transition-all duration-700 pointer-events-none" />
                        
                        {/* Abstract Wireframe/Border behind the image */}
                        <div 
                            className="absolute inset-0 border-2 border-brand-blue/20 dark:border-glass-border translate-x-4 translate-y-4 transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6"
                            style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
                        />
                        
                        {/* The actual Image Container with Organic Blob Shape */}
                        <div 
                            className="relative w-full aspect-square bg-white/40 dark:bg-glass-bg/40 backdrop-blur-md border border-glass-border shadow-2xl p-3 overflow-hidden transition-all duration-700 group-hover:scale-[1.02]"
                            style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
                        >
                            <Image 
                                src="/images/saas_hero.jpg" 
                                alt="Diggity Dashboard 3D Illustration" 
                                fill
                                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                style={{ borderRadius: '38% 58% 68% 28% / 38% 48% 58% 48%' }}
                                priority
                            />
                            
                            {/* Inner Glass Reflection overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -translate-x-full group-hover:translate-x-full pointer-events-none" />
                        </div>
                        
                        {/* Floating Tech Badge (Floating parallax effect) */}
                        <div className="absolute bottom-12 -left-6 bg-white dark:bg-[#0a0f1c] border border-glass-border shadow-xl rounded-2xl p-4 flex items-center gap-4 transition-transform duration-700 hover:scale-105 z-20">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                            </div>
                            <div>
                                <p className="text-[10px] text-text-gray font-bold uppercase tracking-wider">System Status</p>
                                <p className="text-sm font-black text-text-main">100% Optimized</p>
                            </div>
                        </div>
                    </div>"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Hero image shape changed to organic blob.")
else:
    print("Could not find old block")
