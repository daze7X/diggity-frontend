import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Part 1: Replace from start to {/ * 02. Trusted By * /}
start_token = '<div className="relative">'
end_token = '{/* 02. Trusted By Section (Client Logos Marquee) */}'

start_idx = content.find(start_token)
end_idx = content.find(end_token)

new_hero = """<div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            {/* 1. HERO HEADER (Enterprise Style) */}
            <div className="bg-brand-blue dark:bg-brand-bg relative pt-36 pb-48 px-6 overflow-hidden">
                {/* Glowing orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                    
                    {/* Morphing Blob Decoration */}
                    <div className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob pointer-events-none hidden lg:block opacity-50">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '15s' }} />
                    </div>
                    
                    <div className="absolute left-0 lg:left-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob-fast pointer-events-none hidden lg:block opacity-30 delay-700">
                        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '12s' }} />
                    </div>

                    <ScrollReveal animation="fade-up" className="max-w-3xl relative z-10 space-y-6">
                        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full mb-4">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">{locale === 'en' ? 'Digital Technology Company' : 'Perusahaan Teknologi Digital'}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                            {locale === 'en' ? 'Build. Grow. Scale.' : 'Bangun. Tumbuhkan. Skalakan.'}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">
                                {locale === 'en' ? 'Your Digital Vision' : 'Visi Digital Anda'}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100/80 font-medium max-w-2xl mx-auto">
                            {locale === 'en'
                                ? 'We build integrated digital architectures, optimize search rankings, and systematically engineer sales conversions.'
                                : 'Kami membangun arsitektur digital terintegrasi, mengoptimalkan peringkat pencarian, dan merekayasa konversi penjualan secara sistematis.'}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/solutions" className="w-full sm:w-auto px-8 py-4 bg-white text-brand-blue font-bold rounded-full hover:bg-gray-50 transition-all hover:-translate-y-1 shadow-lg shadow-white/20">
                                {locale === 'en' ? 'Explore Solutions' : 'Jelajahi Solusi'}
                            </Link>
                            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all hover:-translate-y-1">
                                {locale === 'en' ? 'Consult with Us' : 'Konsultasi Sekarang'}
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* 2. OVERLAPPING CONTENT (-mt-24) */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-24 space-y-24">
                """

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_hero + content[end_idx:]

# Part 2: Clean up the end of the original Hero section
# We MUST DELETE the `</div>` and `</section>` because we want the `-mt-24 space-y-24` div to remain open!
end_hero_str = """                </div>

                {/* Gradient fade-out overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-bg via-brand-bg/85 to-transparent pointer-events-none z-10" />
            </section>

            {/* 03. What We Do Section */}"""

new_end_hero_str = """
            {/* 03. What We Do Section */}"""

content = content.replace(end_hero_str, new_end_hero_str)

# Part 3: Close the `-mt-24 space-y-24` div right before the `15. Final CTA`
end_file_str = """            {/* 15. Final CTA & Contact Section */}"""
new_end_file_str = """            </div>

            {/* 15. Final CTA & Contact Section */}"""
content = content.replace(end_file_str, new_end_file_str)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Replacement complete.")
