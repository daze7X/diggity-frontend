import React from 'react';
import Image from 'next/image';
import { api, Team } from '../../lib/api';
import SpotlightCard from '../../components/SpotlightCard';
import { 
    ShieldCheck, 
    Award, 
    Users, 
    Compass,
    FileText
} from 'lucide-react';

import { generatePageMetadata } from '../../lib/seo';
import { getLocaleServer } from '../../lib/locale-server';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export async function generateMetadata() {
    try {
        const res = await api.getStaticPageSeo('about');
        return generatePageMetadata(res?.seo, {
            title: 'Tentang Kami - Diggity',
            description: 'Pelajari visi, misi, dan nilai-nilai inti Diggity dalam mendorong kemajuan teknologi industri.',
            path: '/about'
        });
    } catch {
        return generatePageMetadata(null, { path: '/about' });
    }
}

export default async function About() {
    const locale = await getLocaleServer();
    let teams: Team[] = [];
    let settings: any = null;

    try {
        const [teamsRes, settingsRes] = await Promise.all([
            api.getTeams(),
            api.getCompanySettings()
        ]);
        teams = teamsRes;
        settings = settingsRes;
    } catch (error) {
        console.error('Error fetching data for about page:', error);
    }

    const defaultTimeline = locale === 'en' ? [
        { year: '2018', title: 'Founding Year', desc: 'Diggity was founded as a provider of simple website development services and blog content writing.' },
        { year: '2020', title: 'Division Restructuring', desc: 'Formed specialized App Builder Squad and Brand Growth Division for results-focused services.' },
        { year: '2022', title: 'Cloud Services Expansion', desc: 'Launched premium cloud hosting infrastructure, VPS servers, and business email integration for corporate clients.' },
        { year: '2024', title: 'Digital Lab Launch', desc: 'Pioneered Digital Skill Lab to facilitate bootcamps and digital training for corporate groups.' },
    ] : [
        { year: '2018', title: 'Awal Mula Pendirian', desc: 'Diggity didirikan sebagai penyedia jasa pembuatan website sederhana dan penulisan konten blog.' },
        { year: '2020', title: 'Restrukturisasi Divisi', desc: 'Membentuk divisi khusus App Builder Squad dan Brand Growth Division untuk layanan yang lebih berfokus pada hasil.' },
        { year: '2022', title: 'Ekspansi Cloud Services', desc: 'Meluncurkan infrastruktur cloud hosting premium, server VPS, dan integrasi email bisnis untuk klien korporat.' },
        { year: '2024', title: 'Peluncuran Digital Lab', desc: 'Merintis Digital Skill Lab untuk memfasilitasi bootcamp dan pelatihan digital bagi kalangan perusahaan.' },
    ];

    const values = locale === 'en' ? [
        { icon: Compass, title: 'Boundless Innovation', desc: 'We continuously explore leading edge technologies to deliver competitive advantages for our clients.' },
        { icon: ShieldCheck, title: 'Integrity & Transparency', desc: 'Building client trust through honesty, regular communication, and transparent analytical reports.' },
        { icon: Award, title: 'Classy Quality', desc: 'No compromise in quality. From code hygiene to the aesthetics of UI/UX interfaces.' },
        { icon: Users, title: 'High-Impact Collaboration', desc: 'We are not just a vendor, we are a strategic partner working closely to drive your business growth.' },
    ] : [
        { icon: Compass, title: 'Inovasi Tanpa Batas', desc: 'Kami terus mengeksplorasi teknologi terdepan untuk menghadirkan keunggulan kompetitif bagi klien kami.' },
        { icon: ShieldCheck, title: 'Integritas & Transparansi', desc: 'Membangun kepercayaan klien melalui kejujuran, komunikasi berkala, dan penyajian laporan analitik yang transparan.' },
        { icon: Award, title: 'Kualitas Berkelas', desc: 'Tidak ada kompromi dalam kualitas. Mulai dari kebersihan baris kode hingga estetika antarmuka UI/UX.' },
        { icon: Users, title: 'Kolaborasi Dampak Tinggi', desc: 'Kami tidak sekadar vendor, kami adalah mitra strategis yang bekerja erat untuk mendorong pertumbuhan bisnis Anda.' },
    ];

    // Read dynamic settings with static fallbacks
    const ptName = settings?.company_pt_name || 'PT Diggity Digital Internasional';
    const nib = settings?.company_nib || '9120304910243';
    const kbli = settings?.company_kbli || 'KBLI 62019 (Aktivitas Pemrograman Komputer Lainnya)';

    const buildDesc = settings?.philosophy_build || (locale === 'en' ? 'Designing high-performance software products (web/mobile).' : 'Merancang produk software (web/mobile) berkinerja tinggi.');
    const growDesc = settings?.philosophy_grow || (locale === 'en' ? 'Driving market growth through SEO, advertising, and social media marketing.' : 'Mendorong pertumbuhan pasar melalui SEO, periklanan, dan marketing media sosial.');
    const scaleDesc = settings?.philosophy_scale || (locale === 'en' ? 'Ensuring cloud hosting infrastructure reliability and stable system capacity.' : 'Menjamin keandalan infrastruktur cloud server dan kapasitas sistem yang stabil.');
    const empowerDesc = settings?.philosophy_empower || (locale === 'en' ? 'Empowering your team through digital skills training and transfer.' : 'Memberdayakan tim Anda melalui pelatihan dan transfer keahlian digital.');

    const timelineData = settings && settings.history_timeline && settings.history_timeline.length > 0
        ? settings.history_timeline
        : defaultTimeline;

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-24">
                
                {/* 1. Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        {locale === 'en' ? 'About Us' : 'Tentang Kami'}
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        {locale === 'en' ? 'Build. Grow. Scale. Your Business in the Digital Era.' : 'Membangun, Menumbuhkan, dan Menskalakan Bisnis Anda di Era Digital.'}
                    </p>
                </div>

                {/* 2. History & Philosophy (Bento Grid Layout) */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Card 1: Sejarah & Filosofi (Spans all 4 columns) */}
                        <SpotlightCard className="p-8 md:col-span-4 flex flex-col justify-between text-left space-y-6">
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                    {locale === 'en' ? 'History & Philosophy' : 'Sejarah & Filosofi'}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-text-main tracking-tight leading-tight">
                                    {locale === 'en' ? 'Our Core Digital Engineering Pillars' : 'Pilar Utama Rekayasa Digital Kami'}
                                </h3>
                                <p className="text-text-gray leading-relaxed text-sm md:text-base">
                                    {locale === 'en' 
                                        ? 'Established in 2018 in Tangerang, Diggity was born from a vision to deliver global-standard digital solutions for local businesses. We believe in structured growth frameworks to help businesses build technical foundations, dominate markets, scale capacity, and train internal capabilities.'
                                        : 'Didirikan pada tahun 2018 di Tangerang, Diggity lahir dari visi untuk memberikan solusi digital berkualitas global bagi bisnis lokal. Kami meyakini filosofi pertumbuhan terstruktur untuk membantu bisnis membangun fondasi teknis, mendominasi pasar, menskalakan kapasitas, dan melatih kemandirian internal.'}
                                </p>
                            </div>
                            <div className="text-xs font-semibold text-text-muted">
                                Tangerang, Indonesia • Est. 2018
                            </div>
                        </SpotlightCard>

                        {/* Card 3: BUILD */}
                        <SpotlightCard className="p-6 text-left flex flex-col justify-between min-h-[160px] md:col-span-1">
                            <div className="space-y-2">
                                <div className="text-lg font-bold text-brand-blue">01 / BUILD</div>
                                <p className="text-xs text-text-gray leading-relaxed">{buildDesc}</p>
                            </div>
                        </SpotlightCard>

                        {/* Card 4: GROW */}
                        <SpotlightCard className="p-6 text-left flex flex-col justify-between min-h-[160px] md:col-span-1">
                            <div className="space-y-2">
                                <div className="text-lg font-bold text-brand-blue">02 / GROW</div>
                                <p className="text-xs text-text-gray leading-relaxed">{growDesc}</p>
                            </div>
                        </SpotlightCard>

                        {/* Card 5: SCALE */}
                        <SpotlightCard className="p-6 text-left flex flex-col justify-between min-h-[160px] md:col-span-1">
                            <div className="space-y-2">
                                <div className="text-lg font-bold text-brand-blue">03 / SCALE</div>
                                <p className="text-xs text-text-gray leading-relaxed">{scaleDesc}</p>
                            </div>
                        </SpotlightCard>

                        {/* Card 6: EMPOWER */}
                        <SpotlightCard className="p-6 text-left flex flex-col justify-between min-h-[160px] md:col-span-1">
                            <div className="space-y-2">
                                <div className="text-lg font-bold text-brand-blue">04 / EMPOWER</div>
                                <p className="text-xs text-text-gray leading-relaxed">{empowerDesc}</p>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>

                {/* 3. Company Values */}
                <div className="space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                            {locale === 'en' ? 'Company Values' : 'Nilai Perusahaan'}
                        </span>
                        <h3 className="text-3xl font-extrabold text-text-main tracking-tight">
                            {locale === 'en' ? 'Core Principles Guiding Us' : 'Prinsip Yang Mengarahkan Kami'}
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        {values.map((val, i) => {
                            const IconComponent = val.icon;
                            return (
                                <SpotlightCard key={i} className="flex space-x-5 p-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-bold text-text-main">{val.title}</h4>
                                        <p className="text-sm text-text-gray leading-relaxed">{val.desc}</p>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>

                {/* 4. Timeline Section */}
                <div className="space-y-16 py-10 text-left">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Milestones</span>
                        <h3 className="text-3xl font-extrabold text-text-main tracking-tight">
                            {locale === 'en' ? 'Our Historic Journey' : 'Perjalanan Sejarah Kami'}
                        </h3>
                    </div>
                    <div className="relative border-l border-glass-border ml-4 md:ml-32 space-y-12">
                        {timelineData.map((item: any, i: number) => (
                            <div key={i} className="relative pl-8 md:pl-12">
                                {/* Dot Indicator */}
                                <span className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-brand-blue border-4 border-brand-bg transition-colors" />
                                
                                {/* Year label on the left for desktops */}
                                <span className="hidden md:block absolute -left-36 top-1 text-xl font-black text-brand-blue w-24 text-right">
                                    {item.year}
                                </span>
                                
                                <div className="space-y-2 max-w-2xl">
                                    {/* Year badge for mobile only */}
                                    <span className="inline-block md:hidden px-2 py-0.5 bg-brand-blue/10 text-brand-blue text-xs font-black rounded mb-1">
                                        {item.year}
                                    </span>
                                    <h4 className="text-lg font-bold text-text-main">{item.title}</h4>
                                    <p className="text-sm text-text-gray leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
}
