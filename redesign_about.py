import sys
import re

path = "app/about/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the layout
pattern = r"    return \(\n        <div className=\"relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden\">.*?02\. PHILOSOPHY"
new_hero = """    return (
        <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            {/* 1. HERO HEADER (Enterprise Style) */}
            <div className="bg-brand-blue dark:bg-brand-bg relative pt-32 pb-48 px-6 overflow-hidden">
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
                    
                    <ScrollReveal animation="fade-up">
                        <div className="text-center space-y-8 max-w-4xl mx-auto">
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                                    {locale === 'en' ? 'Company Profile' : 'Profil Perusahaan'}
                                </span>
                                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto drop-shadow-sm">
                                    {locale === 'en' ? (
                                        <>About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Us</span></>
                                    ) : (
                                        <>Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Kami</span></>
                                    )}
                                </h1>
                                <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
                                    {locale === 'en'
                                        ? 'Build. Grow. Scale. Your Business in the Digital Era.'
                                        : 'Membangun, Menumbuhkan, dan Menskalakan Bisnis Anda di Era Digital.'}
                                </p>
                            </div>

                            {/* Stats bar */}
                            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                                {stats.map((s, i) => {
                                    const Icon = s.icon;
                                    return (
                                        <div key={i} className="flex items-center gap-2.5 px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                                            <Icon className="w-5 h-5 text-blue-200 shrink-0" />
                                            <span className="text-xl font-black text-white">{s.value}</span>
                                            <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">{s.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* 2. MAIN CONTENT (Overlapping) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 -mt-24">
                <div className="bg-gray-50/95 dark:bg-brand-bg/95 backdrop-blur-3xl rounded-3xl border border-glass-border p-6 md:p-12 shadow-2xl space-y-28">

                    {/* Download Company Profile Button */}
                    <div className="flex justify-center -mt-4">
                        <a
                            href="/company-profile-diggity.pdf"
                            download
                            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-2xl hover:bg-brand-blue-dark shadow-xl shadow-brand-blue/20 hover:shadow-brand-blue/40 text-sm font-bold transition-all transform hover:-translate-y-1"
                        >
                            <FileText className="w-5 h-5" />
                            {locale === 'en' ? 'Download Company Profile (PDF)' : 'Unduh Company Profile (PDF)'}
                        </a>
                    </div>
                    
                    {/* 02. PHILOSOPHY"""

content = re.sub(pattern, new_hero, content, flags=re.DOTALL)

# Fix the closing divs
content = re.sub(r"            </div>\r?\n        </div>\r?\n    \);\r?\n}", "                </div>\n            </div>\n        </div>\n    );\n}", content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Redesigned About page layout.")
