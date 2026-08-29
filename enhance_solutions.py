import sys

def modify():
    with open('app/solutions/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Imports
    content = content.replace("import { api, Service } from '../../lib/api';", "import { api, Service, Faq } from '../../lib/api';")
    content = content.replace("import ScrollReveal from '../../components/ScrollReveal';", "import ScrollReveal from '../../components/ScrollReveal';\nimport FaqAccordion from '../../components/FaqAccordion';")
    content = content.replace("Building2,", "Building2, ShieldCheck, Target, Clock, MessageSquare,")

    # 2. Add Benefits static data after DEFAULT_CONFIG
    benefits_data = """
const BENEFITS = [
    {
        icon: Target,
        titleEn: 'Tailored Strategies',
        titleId: 'Strategi Tepat Sasaran',
        descEn: 'We don’t believe in one-size-fits-all. Every solution is custom-engineered to meet your specific business goals.',
        descId: 'Kami merancang solusi yang dikustomisasi secara presisi untuk memenuhi target bisnis spesifik Anda.',
    },
    {
        icon: ShieldCheck,
        titleEn: 'Enterprise-Grade Security',
        titleId: 'Keamanan Tingkat Enterprise',
        descEn: 'Built with scalable and secure architectures to ensure your digital assets are protected at all times.',
        descId: 'Dibangun dengan arsitektur yang aman dan scalable untuk memastikan aset digital Anda selalu terlindungi.',
    },
    {
        icon: Users,
        titleEn: 'Expert Multidisciplinary Team',
        titleId: 'Tim Ahli Multidisiplin',
        descEn: 'From senior engineers to creative strategists, our team brings diverse expertise to cover every angle.',
        descId: 'Mulai dari engineer senior hingga strategis kreatif, tim kami membawa keahlian beragam dari berbagai sisi.',
    },
    {
        icon: Clock,
        titleEn: 'Agile & Fast Delivery',
        titleId: 'Eksekusi Agile & Cepat',
        descEn: 'We utilize agile methodologies to ensure rapid deployment without compromising on quality or performance.',
        descId: 'Kami menggunakan metodologi agile untuk memastikan peluncuran yang cepat tanpa mengorbankan kualitas.',
    }
];
"""
    content = content.replace("export default async function SolutionsPage() {", benefits_data + "\nexport default async function SolutionsPage() {")

    # 3. Update Fetch Logic
    old_fetch = """    const [services, locale] = await Promise.all([
        api.getSolutions(),
        getLocaleServer(),
    ]);"""
    new_fetch = """    const [services, faqs, locale] = await Promise.all([
        api.getSolutions(),
        api.getFaqs(),
        getLocaleServer(),
    ]);"""
    content = content.replace(old_fetch, new_fetch)

    # 4. Insert Why Choose Us before Closing CTA
    why_choose_us = """
                {/* 🌟 WHY CHOOSE US 🌟 */}
                <div className="py-8 md:py-12">
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
                                    <div className="group p-6 md:p-8 rounded-3xl bg-glass-bg border border-glass-border hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 h-full flex flex-col">
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

"""
    content = content.replace("{/*  ? ? ? CLOSING CTA  ? ? ? */}", why_choose_us + "{/*  ? ? ? CLOSING CTA  ? ? ? */}")
    content = content.replace("{/* 🌟 🌟 🌟 CLOSING CTA 🌟 🌟 🌟 */}", why_choose_us + "{/* 🌟 🌟 🌟 CLOSING CTA 🌟 🌟 🌟 */}")
    # Also check other comment variations just in case
    
    # Let's use string split for Closing CTA to be safe because of the unknown characters
    parts = content.split("CLOSING CTA")
    if len(parts) > 1:
        # Find the line that has CLOSING CTA and insert before it
        lines = content.splitlines()
        for i, line in enumerate(lines):
            if "CLOSING CTA" in line:
                lines.insert(i, why_choose_us)
                break
        content = "\n".join(lines)
    else:
        print("Warning: CLOSING CTA not found")


    # 5. Insert FAQs after Closing CTA but before closing tags
    faqs_section = """
                {/* 🌟 GLOBAL FAQS 🌟 */}
                {faqs && faqs.length > 0 && (
                    <div className="pt-8 pb-4 md:pt-12 md:pb-6">
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
                            <div className="max-w-3xl mx-auto text-left bg-glass-bg border border-glass-border p-4 md:p-8 rounded-3xl">
                                <FaqAccordion faqs={faqs} />
                            </div>
                        </ScrollReveal>
                    </div>
                )}
"""
    # Insert right before the last closing `</div>` of the main container.
    # The structure ends with:
    #             </ScrollReveal>
    #         </div>
    #     </div>
    # );
    
    # Let's find the closing SpotlightCard of the CTA
    # 
    cta_end_idx = content.rfind("</SpotlightCard>")
    if cta_end_idx != -1:
        # Find the next ScrollReveal closing tag
        reveal_end_idx = content.find("</ScrollReveal>", cta_end_idx)
        if reveal_end_idx != -1:
            insert_pos = reveal_end_idx + len("</ScrollReveal>")
            content = content[:insert_pos] + "\n" + faqs_section + content[insert_pos:]
        else:
            print("Warning: Could not find closing ScrollReveal after CTA")
    else:
        print("Warning: Could not find CTA closing tag")

    with open('app/solutions/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Injected Why Choose Us and FAQs sections!")

modify()
