import React from 'react';
import { api, Team } from '../../lib/api';
import SpotlightCard from '../../components/SpotlightCard';
import { 
    ShieldCheck, 
    Award, 
    Users, 
    Compass,
    FileText,
    Sparkles
} from 'lucide-react';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function About() {
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

    const defaultTimeline = [
        { year: '2018', title: 'Awal Mula Pendirian', desc: 'Diggity didirikan sebagai penyedia jasa pembuatan website sederhana dan penulisan konten blog.' },
        { year: '2020', title: 'Restrukturisasi Divisi', desc: 'Membentuk divisi khusus App Builder Squad dan Brand Growth Division untuk layanan yang lebih berfokus pada hasil.' },
        { year: '2022', title: 'Ekspansi Cloud Services', desc: 'Meluncurkan infrastruktur cloud hosting premium, server VPS, dan integrasi email bisnis untuk klien korporat.' },
        { year: '2024', title: 'Peluncuran Digital Lab', desc: 'Merintis Digital Skill Lab untuk memfasilitasi bootcamp dan pelatihan digital bagi kalangan perusahaan.' },
    ];

    const values = [
        { icon: Compass, title: 'Inovasi Tanpa Batas', desc: 'Kami terus mengeksplorasi teknologi terdepan untuk menghadirkan keunggulan kompetitif bagi klien kami.' },
        { icon: ShieldCheck, title: 'Integritas & Transparansi', desc: 'Membangun kepercayaan klien melalui kejujuran, komunikasi berkala, dan penyajian laporan analitik yang transparan.' },
        { icon: Award, title: 'Kualitas Berkelas', desc: 'Tidak ada kompromi dalam kualitas. Mulai dari kebersihan baris kode hingga estetika antarmuka UI/UX.' },
        { icon: Users, title: 'Kolaborasi Dampak Tinggi', desc: 'Kami tidak sekadar vendor, kami adalah mitra strategis yang bekerja erat untuk mendorong pertumbuhan bisnis Anda.' },
    ];

    // Read dynamic settings with static fallbacks
    const ptName = settings?.company_pt_name || 'PT Diggity Digital Internasional';
    const nib = settings?.company_nib || '9120304910243';
    const kbli = settings?.company_kbli || 'KBLI 62019 (Aktivitas Pemrograman Komputer Lainnya)';

    const buildDesc = settings?.philosophy_build || 'Merancang produk software (web/mobile) berkinerja tinggi.';
    const growDesc = settings?.philosophy_grow || 'Mendorong pertumbuhan pasar melalui SEO, periklanan, dan marketing media sosial.';
    const scaleDesc = settings?.philosophy_scale || 'Menjamin keandalan infrastruktur cloud server dan kapasitas sistem yang stabil.';
    const empowerDesc = settings?.philosophy_empower || 'Memberdayakan tim Anda melalui pelatihan dan transfer keahlian digital.';

    const timelineData = settings && settings.history_timeline && settings.history_timeline.length > 0
        ? settings.history_timeline
        : defaultTimeline;

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-24">
                
                {/* 1. Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <span className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-xs font-semibold text-brand-blue">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>KREATOR DIGITASI UTAMA</span>
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        Tentang Kami
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        Membangun, Menumbuhkan, dan Menskalakan Bisnis Anda di Era Digital.
                    </p>
                </div>

                {/* 2. History & Philosophy */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6 text-left">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                            Sejarah & Filosofi
                        </span>
                        <h3 className="text-3xl font-extrabold text-text-main tracking-tight leading-tight">
                            Build. Grow. Scale. <span className="text-brand-blue">Empower.</span>
                        </h3>
                        <p className="text-text-gray leading-relaxed text-sm md:text-base">
                            Didirikan pada tahun 2018 di Tangerang, Diggity lahir dari visi untuk memberikan solusi digital berkualitas global bagi bisnis lokal. Kami meyakini filosofi pertumbuhan empat pilar kami:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center font-bold text-xs text-brand-blue">1</span>
                                <p className="text-sm text-text-gray"><strong>Build:</strong> {buildDesc}</p>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center font-bold text-xs text-brand-blue">2</span>
                                <p className="text-sm text-text-gray"><strong>Grow:</strong> {growDesc}</p>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center font-bold text-xs text-brand-blue">3</span>
                                <p className="text-sm text-text-gray"><strong>Scale:</strong> {scaleDesc}</p>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center font-bold text-xs text-brand-blue">4</span>
                                <p className="text-sm text-text-gray"><strong>Empower:</strong> {empowerDesc}</p>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Visual Card (Spotlight Card) */}
                    <SpotlightCard className="p-8 space-y-6 text-left">
                        <div className="flex items-center space-x-3 text-brand-blue">
                            <FileText className="w-8 h-8" />
                            <h4 className="text-lg font-bold text-text-main">Legalitas Perusahaan</h4>
                        </div>
                        <p className="text-sm text-text-gray leading-relaxed">
                            Diggity beroperasi secara resmi di bawah badan hukum yang sah. Kami berkomitmen menjalin kemitraan profesional yang patuh hukum, transparan, dan dapat dipertanggungjawabkan sepenuhnya.
                        </p>
                        <div className="border-t border-glass-border pt-4 space-y-2 text-xs">
                            <div className="flex justify-between"><span className="text-text-muted">Nama Perusahaan:</span> <span className="text-text-main font-semibold">{ptName}</span></div>
                            <div className="flex justify-between"><span className="text-text-muted">NIB:</span> <span className="text-text-main font-semibold">{nib}</span></div>
                            <div className="flex justify-between"><span className="text-text-muted">Klasifikasi:</span> <span className="text-text-main font-semibold">{kbli}</span></div>
                        </div>
                    </SpotlightCard>
                </div>

                {/* 3. Company Values */}
                <div className="space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Nilai Perusahaan</span>
                        <h3 className="text-3xl font-extrabold text-text-main tracking-tight">Prinsip Yang Mengarahkan Kami</h3>
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
                        <h3 className="text-3xl font-extrabold text-text-main tracking-tight">Perjalanan Sejarah Kami</h3>
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

                {/* 5. Team Section */}
                {teams.length > 0 && (
                    <div className="space-y-16">
                        <div className="text-center space-y-4 max-w-2xl mx-auto">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Manajemen Tim</span>
                            <h3 className="text-3xl font-extrabold text-text-main tracking-tight">Otak Kreatif di Balik Layar</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {teams.map((member: any) => (
                                <SpotlightCard key={member.id} className="p-6 text-center space-y-4">
                                    <div className="w-24 h-24 rounded-full bg-brand-blue/10 border-2 border-brand-blue/20 flex items-center justify-center font-bold text-brand-blue text-3xl mx-auto">
                                        {member.name[0]}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-bold text-text-main">{member.name}</h4>
                                        <p className="text-sm text-brand-blue font-semibold">{member.role || member.position}</p>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
