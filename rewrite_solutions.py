import sys

filepath = 'app/solutions/page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    original = f.read()

# Grab everything before `return (`
start_idx = original.find('    return (')
if start_idx == -1:
    print("Cannot find return (")
    sys.exit(1)

pre_return = original[:start_idx]

# Grab everything from `{/* ─── CATEGORY CARDS GRID ─── */}` or `<div className="space-y-5">`
# Let's find `<div className="space-y-5">`
grid_start = original.find('<div className="space-y-5">')
if grid_start == -1:
    print("Cannot find space-y-5")
    sys.exit(1)

# We need to grab everything from grid_start to the end, but we are wrapping it in a new div.
# Instead of doing that, let's just assemble a clean return block.

# First, extract the categories rendering block:
# It starts at `<div className="space-y-5">` and ends before `WHY CHOOSE US`
why_choose_us_idx = original.find('WHY CHOOSE US')
if why_choose_us_idx == -1:
    why_choose_us_idx = original.find('Keunggulan Diggity')
    why_choose_us_idx = original.rfind('<div className="py-8', 0, why_choose_us_idx)

# Find the closing tag of the categories div.
# We'll just extract from grid_start to why_choose_us_idx - we might need to adjust tags.
# Actually, let's just write the entire return block from scratch, embedding the loops.
# It's much safer!

full_content = pre_return + """    return (
        <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            {/* 1. HERO HEADER (Enterprise Style) */}
            <div className="bg-brand-blue dark:bg-brand-bg dark:border-b dark:border-glass-border relative pt-32 pb-32 px-6 overflow-hidden">
                {/* Glowing orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    <div className="max-w-2xl space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-bold text-white uppercase tracking-widest">
                                {locale === 'en' ? 'Comprehensive Ecosystem' : 'Ekosistem Komprehensif'}
                            </span>
                        </div>
                        
                        <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05]">
                            {locale === 'en' ? (
                                <>Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Solutions</span></>
                            ) : (
                                <>Solusi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Enterprise</span></>
                            )}
                        </h1>
                        
                        <p className="text-lg text-white/80 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {locale === 'en'
                                ? 'From technology development to digital marketing, branding, cloud, AI, and consulting — we cover your full digital growth journey.'
                                : 'Dari pengembangan teknologi hingga digital marketing, branding, cloud, AI, dan konsultasi — kami siap mendampingi setiap langkah pertumbuhan bisnis Anda.'}
                        </p>

                        {/* Stats bar */}
                        <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                            {stats.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-2xl font-black text-white leading-none">{s.val}</div>
                                            <div className="text-[10px] text-white/60 font-bold uppercase tracking-widest mt-1">
                                                {locale === 'en' ? s.labelEn : s.labelId}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Right Illustration */}
                    <div className="hidden lg:block relative w-full max-w-lg">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20 rounded-[3rem] transform rotate-3 scale-105 border border-white/10 backdrop-blur-sm" />
                        <div className="relative bg-white/10 border border-white/20 backdrop-blur-md rounded-[3rem] p-8 shadow-2xl overflow-hidden aspect-square flex items-center justify-center group">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-indigo-600 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                            <div className="relative z-10 w-48 h-48 bg-white/10 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow" style={{ animationDuration: '20s' }}>
                                <div className="w-32 h-32 bg-white/10 border border-white/20 rounded-full flex items-center justify-center animate-reverse-spin" style={{ animationDuration: '15s' }}>
                                    <Target className="w-12 h-12 text-white" />
                                </div>
                            </div>
                            
                            {/* Floating elements */}
                            <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: '0s' }}>
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute bottom-1/3 right-1/4 w-14 h-14 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                                <Cloud className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-emerald-500/40 backdrop-blur-lg border border-emerald-500/50 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                                <ShieldCheck className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN CONTENT AREA (Overlapping the hero) */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-16 space-y-16">
                
                {/* 2A. CATEGORY CARDS GRID */}
                <div className="bg-white dark:bg-glass-bg border border-glass-border shadow-xl rounded-3xl p-6 md:p-10 space-y-8">
                    <ScrollReveal animation="fade-up">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-black text-text-main uppercase tracking-widest">
                                {locale === 'en' ? 'Browse by Category' : 'Telusuri per Kategori'}
                            </span>
                            <div className="flex-1 h-px bg-glass-border rounded-full" />
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {categories.map((cat, i) => {
                            const cfg = CATEGORY_CONFIG[cat.slug] || DEFAULT_CONFIG;
                            const CatIcon = cfg.icon;
                            return (
                                <ScrollReveal key={cat.slug} animation="fade-up" delay={i * 100} className="h-full">
                                    <Link href={`/solutions/${cat.slug}`} className="block h-full group">
                                        <SpotlightCard className={`relative h-full p-7 flex flex-col gap-5 border ${cfg.border} bg-gradient-to-br ${cfg.gradient} transition-all duration-300 group-hover:-translate-y-1`}>
                                            <div className={`absolute -top-6 -right-6 w-24 h-24 ${cfg.glowColor} rounded-full blur-2xl pointer-events-none`} />
                                            <div className="flex items-start justify-between gap-3">
                                                <div className={`w-12 h-12 rounded-2xl ${cfg.accentBg} flex items-center justify-center shrink-0`}>
                                                    <CatIcon className={`w-6 h-6 ${cfg.accentText}`} strokeWidth={1.5} />
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${cfg.accentText} px-2.5 py-1.5 rounded-xl ${cfg.accentBg}`}>
                                                    {cat.services.length} {locale === 'en' ? 'services' : 'layanan'}
                                                </span>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <h2 className={`text-lg font-extrabold text-text-main group-hover:${cfg.accentText} transition-colors leading-snug`}>
                                                    {cat.name}
                                                </h2>
                                                <p className="text-sm text-text-gray leading-relaxed font-medium">
                                                    {locale === 'en' ? cfg.descEn : cfg.descId}
                                                </p>
                                            </div>
                                            {cat.services.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {cat.services.slice(0, 3).map(svc => (
                                                        <span key={svc.slug} className={`text-[10px] font-semibold px-2 py-1 rounded-lg bg-white/5 border border-black/5 dark:border-white/10 text-text-muted`}>
                                                            {svc.name}
                                                        </span>
                                                    ))}
                                                    {cat.services.length > 3 && (
                                                        <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-white/5 border border-black/5 dark:border-white/10 text-text-muted">
                                                            +{cat.services.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            <div className={`flex items-center gap-1.5 text-xs font-bold ${cfg.accentText}`}>
                                                {locale === 'en' ? 'Explore services' : 'Lihat layanan'}
                                                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </SpotlightCard>
                                    </Link>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>

                {/* 2B. WHY CHOOSE US */}
                <div className="py-8">
                    <ScrollReveal animation="fade-up">
                        <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
                            <span className="text-sm font-black text-brand-blue uppercase tracking-widest px-3 py-1.5 bg-brand-blue/10 border border-brand-blue/20 rounded-full">
                                {locale === 'en' ? 'The Diggity Advantage' : 'Keunggulan Diggity'}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Why Partner With Us?' : 'Mengapa Memilih Kami?'}
                            </h2>
                            <p className="text-sm text-text-gray font-medium leading-relaxed">
                                {locale === 'en'
                                    ? 'We combine technical excellence with strategic thinking to deliver solutions that drive real business growth.'
                                    : 'Kami memadukan keunggulan teknis dengan pemikiran strategis untuk memberikan solusi yang mendorong pertumbuhan bisnis nyata.'}
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                        {BENEFITS.map((benefit, i) => {
                            const Icon = benefit.icon;
                            return (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="h-full">
                                    <div className="group p-6 md:p-8 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 h-full flex flex-col">
                                        <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-blue transition-all duration-300">
                                            <Icon className="w-7 h-7 text-brand-blue group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-lg font-extrabold text-text-main mb-2">
                                            {locale === 'en' ? benefit.titleEn : benefit.titleId}
                                        </h3>
                                        <p className="text-sm text-text-gray font-medium leading-relaxed flex-1">
                                            {locale === 'en' ? benefit.descEn : benefit.descId}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>

                {/* 2C. CLOSING CTA */}
                <ScrollReveal animation="fade-up">
                    <SpotlightCard className="relative overflow-hidden p-10 md:p-14 text-center border border-glass-border bg-white dark:bg-glass-bg rounded-3xl shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-transparent pointer-events-none" />
                        <div className="relative z-10 space-y-4 max-w-lg mx-auto">
                            <h3 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? "Can't find what you need?" : 'Tidak menemukan yang Anda cari?'}
                            </h3>
                            <p className="text-sm text-text-gray font-medium leading-relaxed">
                                {locale === 'en'
                                    ? 'Tell us your challenge and our team will design a custom solution for you.'
                                    : 'Ceritakan tantangan Anda dan tim kami akan merancang solusi kustom yang tepat.'}
                            </p>
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-lg shadow-brand-blue/20"
                            >
                                {locale === 'en' ? 'Consult for Free' : 'Konsultasi Gratis'}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </SpotlightCard>
                </ScrollReveal>

                {/* 2D. GLOBAL FAQS */}
                {faqs && faqs.length > 0 && (
                    <div className="pt-8 pb-4">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
                                <div className="w-14 h-14 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare className="w-7 h-7 text-brand-blue" strokeWidth={1.5} />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                                    {locale === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan Umum'}
                                </h2>
                                <p className="text-sm text-text-gray font-medium leading-relaxed">
                                    {locale === 'en' 
                                        ? 'Find answers to common questions about our solutions and engagement models.' 
                                        : 'Temukan jawaban untuk pertanyaan umum seputar layanan dan model kerja kami.'}
                                </p>
                            </div>
                        </ScrollReveal>
                        
                        <ScrollReveal animation="fade-up" delay={150}>
                            <div className="max-w-3xl mx-auto text-left bg-white dark:bg-glass-bg border border-glass-border p-4 md:p-8 rounded-3xl shadow-xl">
                                <FaqAccordion faqs={faqs} />
                            </div>
                        </ScrollReveal>
                    </div>
                )}
            </div>
        </div>
    );
}
"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(full_content)

print("Rewrote solutions/page.tsx")
