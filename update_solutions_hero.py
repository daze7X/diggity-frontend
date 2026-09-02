import sys
import re

filepath = 'app/solutions/page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace the HERO section.
# It starts from `<div className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">`
# to just before `{/* ─── BROWSE BY CATEGORY ─── */}`

start_marker = "return ("
end_marker = "{/* ─── BROWSE BY CATEGORY ─── */}"

if start_marker in content and end_marker in content:
    start_idx = content.find(start_marker) + len(start_marker)
    end_idx = content.find(end_marker)
    
    new_hero = """
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
                                {locale === 'en' ? 'Comprehensive Solutions' : 'Solusi Komprehensif'}
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

            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-16 space-y-20">
"""
    
    new_content = content[:start_idx] + new_hero + content[end_idx:]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced the hero section of Solutions page.")
else:
    print("Could not find markers to replace.")
