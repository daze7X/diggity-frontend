import sys

# 1. Frontend update for bilingual support
fe_path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\about\\page.tsx"
with open(fe_path, "r", encoding="utf-8") as f:
    fe_content = f.read()

# Philosophy logic update
old_philosophy = """        {
            num: '01',
            label: 'BUILD',
            icon: Code,
            accentBorder: 'border-t-blue-500',
            accentText: 'text-blue-600 dark:text-blue-400',
            accentBg: 'bg-blue-500/10',
            desc: settings?.philosophy_build || (locale === 'en'
                ? 'Designing high-performance software products (web/mobile).'
                : 'Merancang produk software (web/mobile) berkinerja tinggi.'),
        },
        {
            num: '02',
            label: 'GROW',
            icon: TrendingUp,
            accentBorder: 'border-t-emerald-500',
            accentText: 'text-emerald-600 dark:text-emerald-400',
            accentBg: 'bg-emerald-500/10',
            desc: settings?.philosophy_grow || (locale === 'en'
                ? 'Driving market growth through SEO, advertising, and social media marketing.'
                : 'Mendorong pertumbuhan pasar melalui SEO, periklanan, dan marketing media sosial.'),
        },
        {
            num: '03',
            label: 'SCALE',
            icon: Server,
            accentBorder: 'border-t-amber-500',
            accentText: 'text-amber-600 dark:text-amber-400',
            accentBg: 'bg-amber-500/10',
            desc: settings?.philosophy_scale || (locale === 'en'
                ? 'Ensuring cloud server reliability and stable system capacity.'
                : 'Menjamin keandalan infrastruktur cloud server dan kapasitas sistem yang stabil.'),
        },
        {
            num: '04',
            label: 'EMPOWER',
            icon: GraduationCap,
            accentBorder: 'border-t-violet-500',
            accentText: 'text-violet-600 dark:text-violet-400',
            accentBg: 'bg-violet-500/10',
            desc: settings?.philosophy_empower || (locale === 'en'
                ? 'Empowering your team through training and digital skills transfer.'
                : 'Memberdayakan tim Anda melalui pelatihan dan transfer keahlian digital.'),
        },"""

new_philosophy = """        {
            num: '01',
            label: 'BUILD',
            icon: Code,
            accentBorder: 'border-t-blue-500',
            accentText: 'text-blue-600 dark:text-blue-400',
            accentBg: 'bg-blue-500/10',
            desc: (locale === 'en' ? settings?.philosophy_build_en : settings?.philosophy_build) || settings?.philosophy_build || (locale === 'en'
                ? 'Designing high-performance software products (web/mobile).'
                : 'Merancang produk software (web/mobile) berkinerja tinggi.'),
        },
        {
            num: '02',
            label: 'GROW',
            icon: TrendingUp,
            accentBorder: 'border-t-emerald-500',
            accentText: 'text-emerald-600 dark:text-emerald-400',
            accentBg: 'bg-emerald-500/10',
            desc: (locale === 'en' ? settings?.philosophy_grow_en : settings?.philosophy_grow) || settings?.philosophy_grow || (locale === 'en'
                ? 'Driving market growth through SEO, advertising, and social media marketing.'
                : 'Mendorong pertumbuhan pasar melalui SEO, periklanan, dan marketing media sosial.'),
        },
        {
            num: '03',
            label: 'SCALE',
            icon: Server,
            accentBorder: 'border-t-amber-500',
            accentText: 'text-amber-600 dark:text-amber-400',
            accentBg: 'bg-amber-500/10',
            desc: (locale === 'en' ? settings?.philosophy_scale_en : settings?.philosophy_scale) || settings?.philosophy_scale || (locale === 'en'
                ? 'Ensuring cloud server reliability and stable system capacity.'
                : 'Menjamin keandalan infrastruktur cloud server dan kapasitas sistem yang stabil.'),
        },
        {
            num: '04',
            label: 'EMPOWER',
            icon: GraduationCap,
            accentBorder: 'border-t-violet-500',
            accentText: 'text-violet-600 dark:text-violet-400',
            accentBg: 'bg-violet-500/10',
            desc: (locale === 'en' ? settings?.philosophy_empower_en : settings?.philosophy_empower) || settings?.philosophy_empower || (locale === 'en'
                ? 'Empowering your team through training and digital skills transfer.'
                : 'Memberdayakan tim Anda melalui pelatihan dan transfer keahlian digital.'),
        },"""

fe_content = fe_content.replace(old_philosophy, new_philosophy)

# Timeline logic update
old_timeline_render = """                                                    <h4 className="text-base font-extrabold text-text-main">{item.title}</h4>
                                                    <p className="text-sm text-text-gray leading-relaxed font-medium">{item.desc}</p>"""

new_timeline_render = """                                                    <h4 className="text-base font-extrabold text-text-main">{locale === 'en' ? (item.title_en || item.title) : item.title}</h4>
                                                    <p className="text-sm text-text-gray leading-relaxed font-medium">{locale === 'en' ? (item.desc_en || item.desc) : item.desc}</p>"""

fe_content = fe_content.replace(old_timeline_render, new_timeline_render)

with open(fe_path, "w", encoding="utf-8") as f:
    f.write(fe_content)

print("Updated frontend for bilingual support.")
