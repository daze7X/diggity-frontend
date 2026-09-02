import sys

filepath = 'app/academy/page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    original = f.read()

# Grab everything before `return (`
start_idx = original.find('    return (')
if start_idx == -1:
    print("Cannot find return (")
    sys.exit(1)

pre_return = original[:start_idx]

# Let's extract the Faqs rendering from the end of the file so we can include it correctly.
# Wait, let's just write the entire return block manually to ensure perfect React structure.

# Looking at the original imports, I'll need some Lucide icons. They are already imported in pre_return.

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
                                {locale === 'en' ? 'Professional Training' : 'Pelatihan Profesional'}
                            </span>
                        </div>
                        
                        <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05]">
                            {locale === 'en' ? (
                                <>Diggity <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Academy</span></>
                            ) : (
                                <>Diggity <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Academy</span></>
                            )}
                        </h1>
                        
                        <p className="text-lg text-white/80 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {locale === 'en'
                                ? 'Elevate your digital skills with comprehensive curriculum, official certifications, and industry-expert instructors.'
                                : 'Tingkatkan skill digital Anda dengan kurikulum komprehensif, sertifikasi resmi, dan instruktur profesional dari industri terkemuka.'}
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
                    
                    {/* Right Illustration - Morphing Water Blob */}
                    <div className="hidden lg:block relative w-full max-w-lg aspect-square">
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
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/saas_hero.jpg" 
                                alt="Diggity Academy Training"
                                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                            />
                        </div>

                        {/* Floating Elements acting as satellites for Academy */}
                        <div className="absolute top-10 -left-6 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '0s' }}>
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute bottom-12 -right-4 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                            <Award className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -top-4 right-16 w-12 h-12 bg-emerald-500/30 backdrop-blur-xl border border-emerald-500/40 rounded-full flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '3s' }}>
                            <MonitorPlay className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN CONTENT AREA (Overlapping the hero) */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-16 space-y-16">
                
                {/* 2A. CONTENT CONTAINER */}
                <div className="bg-white dark:bg-brand-bg border border-glass-border shadow-xl rounded-3xl p-6 md:p-10 space-y-10">
                    
                    {/* Header Logic: Show Back Button if Category Selected */}
                    {category ? (
                        <ScrollReveal animation="fade-up">
                            <div className="text-center space-y-4 max-w-3xl mx-auto">
                                <Link href="/academy" className="inline-flex items-center text-xs font-bold text-text-gray hover:text-brand-blue transition-colors bg-glass-bg border border-glass-border px-3 py-1.5 rounded-lg mb-4">
                                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> {locale === 'en' ? 'Back to All Programs' : 'Kembali ke Semua Program'}
                                </Link>
                                <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">
                                    {activeCategoryConfig?.name}
                                </h2>
                                <p className="text-sm md:text-base text-text-gray font-medium leading-relaxed">
                                    {locale === 'en' ? activeCategoryConfig?.descEn : activeCategoryConfig?.descId}
                                </p>
                            </div>
                        </ScrollReveal>
                    ) : (
                        <div className="space-y-6">
                            <ScrollReveal animation="fade-up">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-black text-text-main uppercase tracking-widest">
                                        {locale === 'en' ? 'Learning Programs' : 'Program Pembelajaran'}
                                    </span>
                                    <div className="flex-1 h-px bg-glass-border rounded-full" />
                                </div>
                            </ScrollReveal>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {ACADEMY_CATEGORIES.map((cat, i) => {
                                    const courseCount = allCourses.filter(c => c.category?.slug === cat.id).length;
                                    const CatIcon = cat.icon;

                                    return (
                                        <ScrollReveal key={cat.id} animation="fade-up" delay={i * 60}>
                                            <Link href={`/academy?category=${cat.id}`} className="block h-full group">
                                                <SpotlightCard className={`relative h-full p-7 flex flex-col gap-5 border ${cat.border} bg-gradient-to-br ${cat.gradient} transition-all duration-300 group-hover:-translate-y-1`}>
                                                    <div className={`absolute -top-6 -right-6 w-24 h-24 ${cat.glowColor} rounded-full blur-2xl pointer-events-none`} />
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className={`w-12 h-12 rounded-2xl ${cat.accentBg} flex items-center justify-center shrink-0`}>
                                                            <CatIcon className={`w-6 h-6 ${cat.accentText}`} strokeWidth={1.5} />
                                                        </div>
                                                        <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${cat.accentText} px-2.5 py-1.5 rounded-xl ${cat.accentBg}`}>
                                                            {courseCount} {locale === 'en' ? 'courses' : 'kelas'}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <h3 className={`text-lg font-extrabold text-text-main group-hover:${cat.accentText} transition-colors leading-snug`}>
                                                            {cat.name}
                                                        </h3>
                                                        <p className="text-sm text-text-gray leading-relaxed font-medium">
                                                            {locale === 'en' ? cat.descEn : cat.descId}
                                                        </p>
                                                    </div>
                                                    <div className={`flex items-center gap-1.5 text-xs font-bold ${cat.accentText}`}>
                                                        {locale === 'en' ? 'Explore program' : 'Lihat program'}
                                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                                    </div>
                                                </SpotlightCard>
                                            </Link>
                                        </ScrollReveal>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* 2B. COURSES GRID */}
                    <div className="space-y-6 pt-6 border-t border-glass-border">
                        {!category && featuredCourses.length > 0 && (
                            <ScrollReveal animation="fade-up">
                                <div className="flex items-center gap-4 pb-4">
                                    <span className="text-sm font-black text-text-main uppercase tracking-widest">
                                        {locale === 'en' ? 'Popular Classes' : 'Kelas Populer'}
                                    </span>
                                    <div className="flex-1 h-px bg-glass-border rounded-full" />
                                </div>
                            </ScrollReveal>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                            {(category ? displayedCourses : featuredCourses).length > 0 ? (
                                (category ? displayedCourses : featuredCourses).map((course, idx) => (
                                    <ScrollReveal key={course.id} animation="fade-up" delay={idx * 50} className="group relative flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-2">
                                        <SpotlightCard className="p-6 relative flex flex-col justify-between h-full border border-glass-border bg-white dark:bg-glass-bg transition-all duration-300 hover:shadow-2xl hover:border-brand-blue/30">
                                            <div>
                                                <div className="relative aspect-video rounded-xl overflow-hidden mb-5">
                                                    <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply dark:mix-blend-overlay group-hover:bg-transparent transition-colors duration-300 z-10" />
                                                    <Image
                                                        src={course.image_url || '/images/placeholder.jpg'}
                                                        alt={course.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 z-20 shadow-sm border border-glass-border">
                                                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                        <span className="text-xs font-bold text-text-main">{course.rating || '4.9'}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <h3 className="text-lg font-black text-text-main leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-sm text-text-gray font-medium line-clamp-2 leading-relaxed">
                                                        {course.description}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-2 pt-2">
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-glass-bg border border-glass-border text-[11px] font-bold text-text-muted">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {course.duration || '8 Weeks'}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                                                            <Check className="w-3.5 h-3.5" />
                                                            {course.level || 'Beginner'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 pt-5 border-t border-glass-border flex items-center justify-between">
                                                <span className="text-lg font-black text-brand-blue">
                                                    {formatPrice(course.price)}
                                                </span>
                                                <Link
                                                    href={`/academy/${course.slug}`}
                                                    className="w-10 h-10 rounded-xl bg-glass-bg border border-glass-border flex items-center justify-center text-text-main group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white transition-all duration-300"
                                                >
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </SpotlightCard>
                                    </ScrollReveal>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-text-muted py-24 bg-gray-50 dark:bg-glass-bg border border-glass-border rounded-3xl backdrop-blur-sm">
                                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p className="text-sm font-semibold">
                                        {locale === 'en' ? 'No courses available in this category yet.' : 'Belum ada kelas yang tersedia di kategori ini.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* 3. BENEFITS / WHY US */}
                <div className="py-8">
                    <ScrollReveal animation="fade-up">
                        <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
                            <span className="text-sm font-black text-brand-blue uppercase tracking-widest px-3 py-1.5 bg-brand-blue/10 border border-brand-blue/20 rounded-full">
                                {locale === 'en' ? 'The Diggity Advantage' : 'Keunggulan Diggity'}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? 'Why Learn With Us?' : 'Mengapa Belajar di Sini?'}
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {BENEFITS.map((benefit, idx) => {
                            const Icon = benefit.icon;
                            return (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 100} className="h-full">
                                    <div className="p-6 bg-white dark:bg-glass-bg border border-glass-border rounded-2xl flex flex-col items-center text-center space-y-4 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5 hover:-translate-y-1 transition-all h-full">
                                        <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                                            <Icon className="w-7 h-7" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-lg font-extrabold text-text-main">
                                            {locale === 'en' ? benefit.titleEn : benefit.titleId}
                                        </h3>
                                        <p className="text-sm text-text-gray font-medium leading-relaxed">
                                            {locale === 'en' ? benefit.descEn : benefit.descId}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>

                {/* 4. CLOSING CTA */}
                <ScrollReveal animation="fade-up">
                    <SpotlightCard className="relative overflow-hidden p-10 md:p-14 text-center border border-glass-border bg-white dark:bg-glass-bg rounded-3xl shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-transparent pointer-events-none" />
                        <div className="relative z-10 space-y-4 max-w-lg mx-auto">
                            <h3 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                                {locale === 'en' ? "Ready to upscale your career?" : 'Siap tingkatkan karir Anda?'}
                            </h3>
                            <p className="text-sm text-text-gray font-medium leading-relaxed">
                                {locale === 'en'
                                    ? 'Join thousands of students and professionals who have accelerated their careers with Diggity Academy.'
                                    : 'Bergabunglah dengan ribuan siswa dan profesional yang telah mengakselerasi karirnya bersama Diggity Academy.'}
                            </p>
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-lg shadow-brand-blue/20"
                            >
                                {locale === 'en' ? 'Start Learning Now' : 'Mulai Belajar Sekarang'}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </SpotlightCard>
                </ScrollReveal>

                {/* 5. GLOBAL FAQS */}
                {faqs && faqs.length > 0 && (
                    <div className="pt-8 pb-4">
                        <ScrollReveal animation="fade-up">
                            <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
                                <h2 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                                    {locale === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan Umum'}
                                </h2>
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

print("Safely rewrote academy page to new layout!")
