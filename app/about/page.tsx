import React from 'react';
import { api, Team } from '../../lib/api';
import { 
    Clock, 
    ShieldCheck, 
    Award, 
    Users, 
    Compass,
    FileText
} from 'lucide-react';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function About() {
    let teams: Team[] = [];

    try {
        teams = await api.getTeams();
    } catch (error) {
        console.error('Error fetching team members:', error);
    }

    const timeline = [
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

    return (
        <div className="relative pt-36 pb-20 md:pt-40 md:pb-28">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-24">
                
                {/* 1. Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                        Tentang Kami
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 font-medium">
                        Membangun, Menumbuhkan, dan Menskalakan Bisnis Anda di Era Digital.
                    </p>
                </div>

                {/* 2. History & Philosophy */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                            Sejarah & Filosofi
                        </h2>
                        <h3 className="text-3xl font-extrabold text-white tracking-tight">
                            Build. Grow. Scale. Empower.
                        </h3>
                        <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                            Didirikan pada tahun 2018 di Tangerang, Diggity lahir dari visi untuk memberikan solusi digital berkualitas global bagi bisnis lokal. Kami meyakini filosofi pertumbuhan empat pilar kami:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center font-bold text-xs text-amber-500">1</span>
                                <p className="text-sm text-neutral-300"><strong>Build:</strong> Merancang produk software (web/mobile) berkinerja tinggi.</p>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center font-bold text-xs text-amber-500">2</span>
                                <p className="text-sm text-neutral-300"><strong>Grow:</strong> Mendorong pertumbuhan pasar melalui SEO, periklanan, dan marketing media sosial.</p>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center font-bold text-xs text-amber-500">3</span>
                                <p className="text-sm text-neutral-300"><strong>Scale:</strong> Menjamin keandalan infrastruktur cloud server dan kapasitas sistem yang stabil.</p>
                            </li>
                            <li className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center font-bold text-xs text-amber-500">4</span>
                                <p className="text-sm text-neutral-300"><strong>Empower:</strong> Memberdayakan tim Anda melalui pelatihan dan transfer keahlian digital.</p>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Visual Card */}
                    <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl space-y-6">
                        <div className="flex items-center space-x-3 text-amber-500">
                            <FileText className="w-8 h-8" />
                            <h4 className="text-lg font-bold text-white">Legalitas Perusahaan</h4>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            Diggity beroperasi secara resmi di bawah badan hukum yang sah. Kami berkomitmen menjalin kemitraan profesional yang patuh hukum, transparan, dan dapat dipertanggungjawabkan sepenuhnya.
                        </p>
                        <div className="border-t border-neutral-800 pt-4 space-y-2 text-xs">
                            <div className="flex justify-between"><span className="text-neutral-500">Nama Perusahaan:</span> <span className="text-neutral-300 font-semibold">PT Diggity Digital Internasional</span></div>
                            <div className="flex justify-between"><span className="text-neutral-500">NIB:</span> <span className="text-neutral-300 font-semibold">9120304910243</span></div>
                            <div className="flex justify-between"><span className="text-neutral-500">Klasifikasi:</span> <span className="text-neutral-300 font-semibold">KBLI 62019 (Aktivitas Pemrograman Komputer Lainnya)</span></div>
                        </div>
                    </div>
                </div>

                {/* 3. Company Values */}
                <div className="space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest">Nilai Perusahaan</h2>
                        <h3 className="text-3xl font-extrabold text-white tracking-tight">Prinsip Yang Mengarahkan Kami</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((val, i) => {
                            const IconComponent = val.icon;
                            return (
                                <div key={i} className="flex space-x-5 p-6 bg-neutral-900/30 border border-neutral-800/80 rounded-2xl hover:border-neutral-700/60 transition-all">
                                    <div className="flex-shrink-0 w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-bold text-white">{val.title}</h4>
                                        <p className="text-sm text-neutral-500 leading-relaxed">{val.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 4. Timeline Section */}
                <div className="space-y-16 py-10">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest">Milestones</h2>
                        <h3 className="text-3xl font-extrabold text-white tracking-tight">Perjalanan Sejarah Kami</h3>
                    </div>
                    <div className="relative border-l border-neutral-800 ml-4 md:ml-32 space-y-12">
                        {timeline.map((item, i) => (
                            <div key={i} className="relative pl-8 md:pl-12">
                                {/* Dot Indicator */}
                                <span className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-amber-500 border-4 border-neutral-950" />
                                
                                {/* Year label on the left for desktops */}
                                <span className="hidden md:block absolute -left-36 top-1 text-xl font-black text-amber-500 w-24 text-right">
                                    {item.year}
                                </span>
                                
                                <div className="space-y-2 max-w-2xl">
                                    {/* Year badge for mobile only */}
                                    <span className="inline-block md:hidden px-2 py-0.5 bg-amber-500/10 text-amber-500 text-xs font-black rounded mb-1">
                                        {item.year}
                                    </span>
                                    <h4 className="text-lg font-bold text-white">{item.title}</h4>
                                    <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. Team Section */}
                {teams.length > 0 && (
                    <div className="space-y-16">
                        <div className="text-center space-y-4 max-w-2xl mx-auto">
                            <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest">Manajemen Tim</h2>
                            <h3 className="text-3xl font-extrabold text-white tracking-tight">Otak Kreatif di Balik Layar</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {teams.map((member: any) => (
                                <div key={member.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center space-y-4 hover:border-neutral-700 transition-colors">
                                    <div className="w-24 h-24 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-white text-3xl mx-auto border-2 border-neutral-700">
                                        {member.name[0]}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-bold text-white">{member.name}</h4>
                                        <p className="text-sm text-amber-500 font-semibold">{member.position}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
