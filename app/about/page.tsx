import React from 'react';
import { api, Team } from '../../lib/api';
import SpotlightCard from '../../components/SpotlightCard';
import { 
    ShieldCheck, 
    Award, 
    Users, 
    Compass,
    FileText
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
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        Tentang Kami
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        Membangun, Menumbuhkan, dan Menskalakan Bisnis Anda di Era Digital.
                    </p>
                </div>

                {/* 2. History & Philosophy (Bento Grid Layout) */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Card 1: Sejarah & Filosofi (Spans 3 columns) */}
                        <SpotlightCard className="p-8 md:col-span-3 flex flex-col justify-between text-left space-y-6">
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                    Sejarah & Filosofi
                                </span>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-text-main tracking-tight leading-tight">
                                    Pilar Utama Rekayasa Digital Kami
                                </h3>
                                <p className="text-text-gray leading-relaxed text-sm md:text-base">
                                    Didirikan pada tahun 2018 di Tangerang, Diggity lahir dari visi untuk memberikan solusi digital berkualitas global bagi bisnis lokal. Kami meyakini filosofi pertumbuhan terstruktur untuk membantu bisnis membangun fondasi teknis, mendominasi pasar, menskalakan kapasitas, dan melatih kemandirian internal.
                                </p>
                            </div>
                            <div className="text-xs font-semibold text-text-muted">
                                Tangerang, Indonesia • Est. 2018
                            </div>
                        </SpotlightCard>

                        {/* Card 2: Legalitas (Spans 1 column) */}
                        <SpotlightCard className="p-8 md:col-span-1 flex flex-col justify-between text-left space-y-4">
                            <div className="space-y-2">
                                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-bold text-text-main">Legalitas</h4>
                                <p className="text-xs text-text-gray leading-relaxed">
                                    Operasional resmi di bawah badan hukum yang sah dan patuh hukum.
                                </p>
                            </div>
                            <div className="border-t border-glass-border pt-4 space-y-2 text-[10px]">
                                <div>
                                    <span className="text-text-muted block">Nama Perusahaan:</span>
                                    <span className="text-text-main font-bold">{ptName}</span>
                                </div>
                                <div>
                                    <span className="text-text-muted block">NIB:</span>
                                    <span className="text-text-main font-bold">{nib}</span>
                                </div>
                                <div>
                                    <span className="text-text-muted block">Klasifikasi:</span>
                                    <span className="text-text-main font-bold truncate block">{kbli}</span>
                                </div>
                                <div className="pt-2">
                                    <a
                                        href="/company-profile-diggity.pdf"
                                        download="company-profile-diggity.pdf"
                                        className="inline-flex items-center justify-center w-full px-3 py-2 text-[10px] font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-lg transition-colors shadow-md shadow-brand-blue/10 cursor-pointer"
                                    >
                                        Unduh Profil PDF
                                    </a>
                                </div>
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
