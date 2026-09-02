import sys
import re

def rewrite_bento():
    filepath = 'app/products/page.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the bounds
    start_str = '<div className="flex flex-col gap-8 max-w-5xl mx-auto mb-16">'
    end_str = "{/* FAQ Section */}"
    
    parts_1 = content.split(start_str)
    if len(parts_1) < 2:
        print("Failed to split by start")
        return
        
    parts_2 = parts_1[1].split(end_str)
    if len(parts_2) < 2:
        print("Failed to split by end")
        return
        
    new_block = """
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto mb-20 relative z-10">
                    {hierarchy.map((cat, i) => {
                        const isBusiness = cat.slug === 'business-software';
                        const isMarketplace = cat.slug === 'digital-marketplace';
                        const isAI = cat.slug === 'ai-products';
                        const isCloud = cat.slug === 'cloud-products';

                        let colSpan = "md:col-span-4";
                        if (isBusiness || isMarketplace) colSpan = "md:col-span-8";

                        let bgGradient = "from-glass-bg to-brand-blue/5 border-glass-border";
                        let iconColor = "text-brand-blue";
                        let hoverBorder = "hover:border-brand-blue/30 hover:shadow-brand-blue/10";
                        let MainIcon = Layers;

                        if (isBusiness) {
                            bgGradient = "from-blue-500/10 via-brand-bg to-indigo-500/5 border-blue-500/20";
                            iconColor = "text-blue-500";
                            hoverBorder = "hover:border-blue-500/40 hover:shadow-blue-500/20";
                            MainIcon = Layers;
                        } else if (isMarketplace) {
                            bgGradient = "from-emerald-500/10 via-brand-bg to-teal-500/5 border-emerald-500/20";
                            iconColor = "text-emerald-500";
                            hoverBorder = "hover:border-emerald-500/40 hover:shadow-emerald-500/20";
                            MainIcon = Store;
                        } else if (isAI) {
                            bgGradient = "from-purple-500/10 via-brand-bg to-fuchsia-500/5 border-purple-500/20";
                            iconColor = "text-purple-500";
                            hoverBorder = "hover:border-purple-500/40 hover:shadow-purple-500/20";
                            MainIcon = Bot;
                        } else if (isCloud) {
                            bgGradient = "from-cyan-500/10 via-brand-bg to-sky-500/5 border-cyan-500/20";
                            iconColor = "text-cyan-500";
                            hoverBorder = "hover:border-cyan-500/40 hover:shadow-cyan-500/20";
                            MainIcon = Cloud;
                        }

                        return (
                            <ScrollReveal key={cat.slug} animation="fade-up" delay={i * 100} className={colSpan}>
                                <SpotlightCard className={`relative h-full p-8 md:p-10 flex flex-col gap-8 border bg-gradient-to-br ${bgGradient} transition-all duration-500 ${hoverBorder} overflow-hidden group`}>
                                    
                                    {/* Giant Watermark Icon */}
                                    <MainIcon className={`absolute -right-8 -bottom-8 w-64 h-64 opacity-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700 ${iconColor} pointer-events-none`} />
                                    
                                    {/* Header */}
                                    <div className="flex flex-col gap-5 relative z-10">
                                        <div className={`w-14 h-14 rounded-2xl bg-white/60 border border-white flex items-center justify-center shrink-0 shadow-sm backdrop-blur-md group-hover:scale-110 transition-transform duration-500`}>
                                            <MainIcon className={`w-7 h-7 ${iconColor}`} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-text-main mb-3 tracking-tight">
                                                {cat.name}
                                            </h2>
                                            <p className="text-sm text-text-gray font-medium leading-relaxed max-w-lg">
                                                {cat.slug === 'business-software' 
                                                    ? (locale === 'en' ? 'A suite of integrated business applications designed to help you manage end-to-end business operations.' : 'Rangkaian aplikasi bisnis terintegrasi yang dirancang untuk membantu perusahaan mengelola proses bisnis secara end-to-end.')
                                                    : cat.slug === 'digital-marketplace'
                                                    ? (locale === 'en' ? 'Ready-to-use digital assets and products for designers, developers, creators, and businesses.' : 'Kumpulan produk dan aset digital siap pakai untuk kebutuhan design, development, content, dan bisnis.')
                                                    : (locale === 'en' ? 'Innovative digital solutions crafted to elevate your business potential in the modern era.' : 'Solusi digital inovatif yang dirancang khusus untuk meningkatkan potensi bisnis Anda di era modern.')
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content (Subcategories or Coming Soon) */}
                                    <div className="mt-auto relative z-10 pt-6">
                                        {cat.children && cat.children.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {cat.children.map((sub: any) => (
                                                    <Link 
                                                        key={sub.slug} 
                                                        href={`/products/${cat.slug}/${sub.slug}`} 
                                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-glass-border hover:bg-white hover:shadow-sm transition-all group/sub backdrop-blur-sm"
                                                    >
                                                        <div className={`w-8 h-8 rounded-lg bg-white shadow-sm border border-glass-border/50 flex items-center justify-center shrink-0 group-hover/sub:border-${iconColor.split('-')[1]}-500/30 transition-colors`}>
                                                            <SubServiceIcon slug={sub.slug} fallbackCategoryIcon="layers" className={`w-4 h-4 ${iconColor} group-hover/sub:scale-110 transition-transform`} />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[13px] font-bold text-text-main leading-tight group-hover/sub:text-brand-blue transition-colors">{sub.name}</h4>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-glass-border/80 bg-white/30 backdrop-blur-sm">
                                                <div className="w-8 h-8 rounded-full bg-glass-border flex items-center justify-center shrink-0">
                                                    <Sparkles className="w-4 h-4 text-text-gray/70" />
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-bold text-text-gray">{locale === 'en' ? 'Coming Soon' : 'Segera Hadir'}</p>
                                                    <p className="text-[11px] text-text-muted mt-0.5">{locale === 'en' ? 'Exclusive features in development' : 'Fitur eksklusif sedang dalam tahap persiapan'}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </SpotlightCard>
                            </ScrollReveal>
                        );
                    })}
                </div>
"""
    
    new_content = parts_1[0] + new_block + end_str + parts_2[1]

    # Ensure all required Lucide icons are imported
    import_line = "import { Layers, MonitorSmartphone, ArrowRight, ArrowUpRight, Store, Bot, Cloud, Sparkles } from 'lucide-react';"
    import_pattern = r"import \{[^}]*\} from 'lucide-react';"
    new_content = re.sub(import_pattern, import_line, new_content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Rewrote page.tsx layout to Bento.")

rewrite_bento()
