import sys
import re

def fix_page():
    filepath = 'app/products/page.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update imports
    # Add HomeTestimonials
    if 'HomeTestimonials' not in content:
        content = content.replace("import FaqAccordion", "import FaqAccordion from '../../components/FaqAccordion';\nimport HomeTestimonials from '../../components/HomeTestimonials';")

    # Clean up the old dummy icons if we want, but it's fine.
    
    # 2. Update the API fetching block
    api_block_old = """    let hierarchy: CategoryHierarchy[] = [];
    let faqs: any[] = [];
    try {
        const [hierRes, faqsRes] = await Promise.all([
            api.getProductHierarchy(),
            api.getFaqs(),
        ]);
        hierarchy = hierRes || [];
        faqs = faqsRes || [];
    } catch {
        // Fallback
    }"""
    
    api_block_new = """    let hierarchy: CategoryHierarchy[] = [];
    let faqs: any[] = [];
    let settings: any = null;
    let testimonials: any[] = [];
    try {
        const [hierRes, faqsRes, settingsRes, testimonialsRes] = await Promise.all([
            api.getProductHierarchy(),
            api.getFaqs(),
            api.getSettings(),
            api.getTestimonials(),
        ]);
        hierarchy = hierRes || [];
        faqs = faqsRes || [];
        settings = settingsRes || null;
        testimonials = testimonialsRes || [];
    } catch {
        // Fallback
    }"""
    
    content = content.replace(api_block_old, api_block_new)

    # 3. Replace Client Logos
    logo_block_pattern = r"\{/\* 2\. CLIENT LOGOS \*/\}[\s\S]*?(?=\{/\* 3\. WHY CHOOSE US \*/\})"
    
    logo_block_new = """{/* 2. CLIENT LOGOS (Dynamic Marquee) */}
            <div className="border-y border-glass-border bg-gray-50/50 py-8 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-xs font-bold text-text-muted mb-6 uppercase tracking-widest">
                        {locale === 'en' ? 'Trusted by forward-thinking businesses and organizations' : 'Telah dipercaya oleh +500 klien lintas industri'}
                    </p>
                    
                    <div className="relative flex">
                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
                        
                        <div className="animate-marquee flex items-center space-x-16 shrink-0 pr-16">
                            {settings && settings.partner_logos && settings.partner_logos.length > 0 ? (
                                (() => {
                                    const logos = settings.partner_logos;
                                    const minItems = 16;
                                    const repeatCount = Math.ceil(minItems / logos.length);
                                    const duplicatedLogos = Array(repeatCount).fill(logos).flat();
                                    const finalLogos = [...duplicatedLogos, ...duplicatedLogos];
                                    
                                    return finalLogos.map((logo: string, idx: number) => {
                                        const isFilePath = logo.includes('/') || logo.includes('.') || logo.startsWith('http');
                                        return (
                                            <div key={idx} className="flex items-center justify-center h-10 w-32 relative shrink-0 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                                                {isFilePath ? (
                                                    <Image
                                                        src={logo.startsWith('http') ? logo : `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${logo}`}
                                                        alt="Partner Logo"
                                                        fill
                                                        className="object-contain"
                                                    />
                                                ) : (
                                                    <span className="font-black text-lg text-text-main tracking-widest">{logo.toUpperCase()}</span>
                                                )}
                                            </div>
                                        );
                                    });
                                })()
                            ) : (
                                ['GOOGLE', 'STRIPE', 'MICROSOFT', 'META', 'AMAZON', 'GOOGLE', 'STRIPE', 'MICROSOFT', 'META', 'AMAZON', 'GOOGLE', 'STRIPE', 'MICROSOFT', 'META', 'AMAZON', 'GOOGLE', 'STRIPE', 'MICROSOFT', 'META', 'AMAZON'].map((logo, idx) => (
                                    <div key={idx} className="flex items-center justify-center h-10 w-32 relative shrink-0 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                                        <span className="font-black text-lg text-text-main tracking-widest">{logo}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            """
    
    content = re.sub(logo_block_pattern, logo_block_new, content)

    # 4. Replace Testimonials
    testi_block_pattern = r"\{/\* 5\. TESTIMONIALS \*/\}[\s\S]*?(?=\{/\* 6\. FAQ Section \*/\})"
    
    testi_block_new = """{/* 5. TESTIMONIALS */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center space-y-4 mb-16">
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                        {locale === 'en' ? 'Client Validation' : 'Validasi Klien'}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
                        {locale === 'en' ? 'What our users say' : 'Apa kata pengguna tentang Diggity'}
                    </h2>
                </div>
                
                <HomeTestimonials testimonials={testimonials} locale={locale} />
            </div>

            """
    
    content = re.sub(testi_block_pattern, testi_block_new, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced static sections with dynamic components.")

fix_page()
