import sys

filepath = 'app/products/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Find where the return statement starts
start_idx = content.find('    return (')
if start_idx == -1:
    print("Could not find 'return ('")
    sys.exit(1)

pre_return = content[:start_idx]

# Let's rebuild the entire return statement.
# We will wrap everything starting from CLIENT LOGOS inside the `-mt-16` overlapping container.
# The original page structure has CLIENT LOGOS, WHY CHOOSE US, PRODUCTS CATALOG, TESTIMONIALS, FAQ, Bottom CTA.

# But wait, looking at the code, it's safer to just split the string around CLIENT LOGOS.
# Let's find CLIENT LOGOS
client_logos_idx = content.find('{/* 2. CLIENT LOGOS (Dynamic Marquee) */}')
if client_logos_idx == -1:
    print("Could not find CLIENT LOGOS")
    sys.exit(1)

rest_of_page = content[client_logos_idx:]

# Before we attach `rest_of_page`, we need to close the `-mt-16` div and the root div.
# But `rest_of_page` ALREADY contains the closing `</div>\n    );\n}\n` at the end!
# We just need to replace the last closing tags with the new structure.
# Actually, it's easier to just strip the last 2 `</div>` and `);\n}` and manually close them.
# Let's slice `rest_of_page` to remove the last few characters.

end_idx = rest_of_page.rfind('        </div>\n    );\n}')
if end_idx != -1:
    rest_of_page_inner = rest_of_page[:end_idx]
else:
    rest_of_page_inner = rest_of_page # fallback

new_hero = """    return (
        <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            
            {/* 1. HERO HEADER (Enterprise Style) */}
            <div className="bg-brand-blue dark:bg-brand-bg dark:border-b dark:border-glass-border relative pt-32 pb-32 px-6 overflow-hidden">
                {/* Glowing orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    
                    {/* Left: Copy & CTA */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-6">
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.15]">
                            Solusi ekosistem <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">digital terbaik</span> untuk akselerasi bisnis
                        </h1>
                        <p className="text-lg text-white/80 font-medium leading-relaxed max-w-lg">
                            Kelola seluruh aspek operasional, pengembangan teknologi, hingga aset kreatif perusahaan Anda dalam satu platform terintegrasi.
                        </p>
                        
                        {/* Bullet Points */}
                        <div className="flex flex-col gap-3 py-2">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                <span className="text-sm font-bold text-white">Sistem terintegrasi untuk seluruh divisi</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                <span className="text-sm font-bold text-white">Keamanan data standar enterprise ISO</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                <span className="text-sm font-bold text-white">Skalabilitas tanpa batas seiring pertumbuhan</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-brand-blue font-bold text-sm hover:bg-gray-50 transition-all shadow-lg shadow-white/10 hover:-translate-y-0.5">
                                Jadwalkan Demo
                            </Link>
                            <a href="#catalog" className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-brand-blue/50 text-white border border-white/20 font-bold text-sm hover:bg-brand-blue/70 transition-all backdrop-blur-md">
                                Lihat Produk
                            </a>
                        </div>

                        {/* Ratings */}
                        <div className="pt-6 flex flex-col gap-2">
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                            </div>
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Gartner & G2 Top Rated</p>
                        </div>
                    </div>
                    
                    {/* Right Illustration - Morphing Water Blob */}
                    <div className="w-full lg:w-1/2 relative group px-6 aspect-square hidden lg:block">
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
                        
                        {/* Glowing backdrop matching the blob */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-cyan-500 blur-2xl opacity-40 animate-morph-blob-fast scale-105 pointer-events-none" />
                        
                        {/* Main Image Blob */}
                        <div className="absolute inset-0 border-2 border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.3)] overflow-hidden animate-morph-blob relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/30 to-transparent z-10 opacity-70 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
                            <Image 
                                src="/images/saas_hero.jpg" 
                                alt="Diggity Dashboard 3D Illustration" 
                                fill
                                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                                priority
                            />
                        </div>

                        {/* Floating Elements acting as satellites for Products */}
                        <div className="absolute top-10 -left-6 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '0s' }}>
                            <MonitorSmartphone className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute bottom-12 -right-4 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                            <ShieldCheck className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -top-4 right-16 w-12 h-12 bg-emerald-500/30 backdrop-blur-xl border border-emerald-500/40 rounded-full flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '3s' }}>
                            <Layers className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA (Overlapping the hero) */}
            <div className="max-w-7xl mx-auto px-0 md:px-6 relative z-20 -mt-16">
                <div className="bg-white dark:bg-brand-bg border border-glass-border shadow-2xl rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col">
                    
"""

new_content = pre_return + new_hero + rest_of_page_inner + """
                </div>
            </div>
        </div>
    );
}
"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Rewrote Products page to match immersive enterprise layout!")
