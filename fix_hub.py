import sys

def rewrite_page():
    filepath = 'app/products/page.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    start_split = '<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">'
    end_split = "{/* FAQ Section */}"
    
    parts_1 = content.split(start_split)
    if len(parts_1) < 2:
        print("Failed to split by start")
        return
        
    parts_2 = parts_1[1].split(end_split)
    if len(parts_2) < 2:
        print("Failed to split by end")
        return
        
    new_block = """
                <div className="flex flex-col gap-8 max-w-5xl mx-auto mb-16">
                    {hierarchy.map((cat, i) => (
                        <ScrollReveal key={cat.slug} animation="fade-up" delay={i * 100}>
                            <SpotlightCard className="relative p-6 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 border border-glass-border bg-gradient-to-br from-glass-bg to-brand-blue/5 transition-all duration-300 hover:shadow-xl hover:shadow-brand-blue/10">
                                
                                {/* Left Side: Category Info */}
                                <div className="w-full lg:w-[35%] flex flex-col items-start gap-4 shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0">
                                        {cat.slug === 'business-software' ? (
                                            <Layers className="w-8 h-8 text-brand-blue" strokeWidth={1.5} />
                                        ) : (
                                            <MonitorSmartphone className="w-8 h-8 text-brand-blue" strokeWidth={1.5} />
                                        )}
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <h2 className="text-2xl font-black text-text-main">
                                            {cat.name}
                                        </h2>
                                        <p className="text-sm text-text-gray font-medium leading-relaxed">
                                            {cat.slug === 'business-software' 
                                                ? (locale === 'en' ? 'A suite of integrated business applications designed to help you manage end-to-end business operations.' : 'Rangkaian aplikasi bisnis terintegrasi yang dirancang untuk membantu perusahaan mengelola proses bisnis secara end-to-end.')
                                                : cat.slug === 'digital-marketplace'
                                                ? (locale === 'en' ? 'Ready-to-use digital assets and products for designers, developers, creators, and businesses.' : 'Kumpulan produk dan aset digital siap pakai untuk kebutuhan design, development, content, dan bisnis.')
                                                : (locale === 'en' ? 'Innovative digital solutions crafted to elevate your business potential in the modern era.' : 'Solusi digital inovatif yang dirancang khusus untuk meningkatkan potensi bisnis Anda di era modern.')
                                            }
                                        </p>
                                    </div>
                                    
                                    <Link href={`/products/${cat.slug}`} className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-blue-dark transition-colors group">
                                        {locale === 'en' ? 'Explore Category' : 'Jelajahi Kategori'}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                                    </Link>
                                </div>
                                
                                {/* Right Side: Subcategories Grid */}
                                <div className="w-full lg:w-[65%]">
                                    {cat.children && cat.children.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            {cat.children.map((sub: any) => (
                                                <Link 
                                                    key={sub.slug} 
                                                    href={`/products/${cat.slug}/${sub.slug}`} 
                                                    className="flex items-start gap-3 p-4 rounded-xl bg-white/40 border border-glass-border/50 hover:bg-white hover:border-brand-blue/30 hover:shadow-md transition-all group/sub"
                                                >
                                                    <div className="mt-0.5 shrink-0">
                                                        <SubServiceIcon slug={sub.slug} fallbackCategoryIcon="layers" className="w-5 h-5 text-brand-blue/70 group-hover/sub:text-brand-blue transition-colors" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[13px] font-bold text-text-main group-hover/sub:text-brand-blue transition-colors mb-1 leading-tight">
                                                            {sub.name}
                                                        </h4>
                                                        <p className="text-[11px] text-text-gray font-medium">
                                                            {sub.products_count || 0} {locale === 'en' ? 'Products' : 'Produk'}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="h-full min-h-[160px] w-full flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-glass-border bg-glass-bg/30 text-center">
                                             <div className="w-10 h-10 rounded-full bg-glass-border/50 flex items-center justify-center mb-3">
                                                <Layers className="w-5 h-5 text-text-gray/50" />
                                             </div>
                                             <p className="text-sm text-text-gray font-bold">
                                                {locale === 'en' ? 'Coming Soon' : 'Segera Hadir'}
                                             </p>
                                             <p className="text-xs text-text-muted mt-1 max-w-[250px]">
                                                {locale === 'en' ? 'New products are being prepared for this category.' : 'Produk-produk baru sedang disiapkan untuk kategori ini.'}
                                             </p>
                                        </div>
                                    )}
                                </div>

                            </SpotlightCard>
                        </ScrollReveal>
                    ))}
                </div>

                """
    
    new_content = parts_1[0] + new_block + end_split + parts_2[1]

    if "import SubServiceIcon" not in new_content:
        lucide_idx = new_content.find("from 'lucide-react';")
        if lucide_idx != -1:
            insert_idx = new_content.find("\n", lucide_idx) + 1
            new_content = new_content[:insert_idx] + "import SubServiceIcon from '../../components/SubServiceIcon';\n" + new_content[insert_idx:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Rewrote page.tsx layout.")

rewrite_page()
