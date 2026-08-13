import React from 'react';
import Link from 'next/link';
import { api, Career } from '../../lib/api';
import { Briefcase, MapPin, Clock, ArrowRight, UserPlus, Users, UserCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';
import TalentRegistrationForm from '../../components/TalentRegistrationForm';
import { getLocaleServer } from '../../lib/locale-server';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

interface Props {
    searchParams: Promise<{ tab?: string }>;
}

export default async function JobConnectPage({ searchParams }: Props) {
    const { tab } = await searchParams;
    const activeTab = tab === 'b2b' ? 'b2b' : 'careers'; // default is 'careers'
    let careers: Career[] = [];
    let settings = null;
    const locale = await getLocaleServer();

    try {
        const [careersData, companySettings] = await Promise.all([
            api.getJobConnect(),
            api.getCompanySettings().catch(() => null)
        ]);
        careers = careersData;
        settings = companySettings;
    } catch (error) {
        console.error('Error fetching data for Job Connect:', error);
    }

    const phone = settings?.whatsapp || "6285157303035";

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto pb-6">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        Job Connect
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        {locale === 'en' 
                            ? 'Bridge digital IT talents with global projects and corporate recruitment.' 
                            : 'Menjembatani talenta IT digital dengan proyek global dan rekrutmen perusahaan.'}
                    </p>
                    
                    {/* Segmented Tab Control */}
                    <div className="pt-6 flex justify-center">
                        <div className="p-1 bg-glass-bg border border-glass-border rounded-2xl inline-flex items-center space-x-1">
                            <Link
                                href="/job-connect?tab=careers"
                                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                                    activeTab === 'careers'
                                        ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/10'
                                        : 'text-text-gray hover:text-text-main'
                                }`}
                            >
                                {locale === 'en' ? 'Careers & Talent Registry' : 'Karir & Daftar Talenta'}
                            </Link>
                            <Link
                                href="/job-connect?tab=b2b"
                                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                                    activeTab === 'b2b'
                                        ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/10'
                                        : 'text-text-gray hover:text-text-main'
                                }`}
                            >
                                {locale === 'en' ? 'B2B Hire Team / Sourcing' : 'Sewa Tim & Rekrutmen B2B'}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ========================================================
                    TAB 1: CAREERS & TALENT REGISTRY (B2C)
                    ======================================================== */}
                {activeTab === 'careers' && (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start animate-in fade-in duration-300">
                        
                        {/* Left Column: Vacancies */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="text-left">
                                <h2 className="text-xl font-extrabold text-text-main tracking-tight flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-brand-blue" /> 
                                    {locale === 'en' ? 'Open Positions / Active Vacancies' : 'Posisi Terbuka / Lowongan Aktif'}
                                </h2>
                                <p className="text-xs text-text-gray font-medium">
                                    {locale === 'en' 
                                        ? 'Apply directly to permanent or contract positions currently available.' 
                                        : 'Lamar langsung posisi tetap atau kontrak yang saat ini tersedia.'}
                                </p>
                            </div>

                            <div className="space-y-4">
                                {careers.length > 0 ? (
                                    careers.map((job) => (
                                        <Link
                                            key={job.id}
                                            href={`/job-connect/${job.slug}`}
                                            className="group block cursor-pointer"
                                        >
                                            <SpotlightCard
                                                className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-glass-border hover:border-brand-blue/30 transition-all duration-300 hover:scale-[1.01]"
                                            >
                                                <div className="space-y-3.5 text-left">
                                                    <div className="space-y-2">
                                                        <span className="inline-block px-2.5 py-0.5 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[10px] font-bold rounded-md uppercase tracking-wider">
                                                            {job.department || 'General'}
                                                        </span>
                                                        <h3 className="text-lg font-bold text-text-main group-hover:text-brand-blue transition-colors leading-snug">
                                                            {job.title}
                                                        </h3>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-text-muted">
                                                        <div className="flex items-center space-x-1.5">
                                                            <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                                                            <span>{job.location}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1.5">
                                                            <Clock className="w-4 h-4 text-brand-blue shrink-0" />
                                                            <span>{job.type}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest self-start sm:self-center shrink-0 border-b border-transparent group-hover:translate-x-1 transition-transform">
                                                    {locale === 'en' ? 'View Details' : 'Lihat Lowongan'}
                                                    <ArrowRight className="ml-1.5 w-4 h-4" />
                                                </div>
                                            </SpotlightCard>
                                        </Link>
                                    ))
                                ) : (
                                    <SpotlightCard className="p-10 text-center text-text-muted border border-glass-border">
                                        {locale === 'en' 
                                            ? 'No active vacancies available at the moment. You can still submit your talent profile!' 
                                            : 'Belum ada lowongan aktif saat ini. Anda tetap dapat mendaftarkan profil talenta Anda!'}
                                    </SpotlightCard>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Registry Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="text-left">
                                <h2 className="text-xl font-extrabold text-text-main tracking-tight flex items-center gap-2">
                                    <UserPlus className="w-5 h-5 text-brand-blue" />
                                    {locale === 'en' ? 'Join Talent Network' : 'Daftar Jaringan Talenta'}
                                </h2>
                                <p className="text-xs text-text-gray font-medium">
                                    {locale === 'en' 
                                        ? 'Register your profile to be discovered for upcoming global projects.' 
                                        : 'Daftarkan profil Anda untuk diproyeksikan pada proyek global mendatang.'}
                                </p>
                            </div>

                            <SpotlightCard className="p-8 border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30">
                                <TalentRegistrationForm />
                            </SpotlightCard>
                        </div>
                    </div>
                )}

                {/* ========================================================
                    TAB 2: B2B HIRE TEAM & OUTSOURCING (B2B)
                    ======================================================== */}
                {activeTab === 'b2b' && (
                    <div className="space-y-12 animate-in fade-in duration-300 max-w-7xl mx-auto">
                        
                        {/* Section Header */}
                        <div className="text-left space-y-3">
                            <h2 className="text-2xl md:text-3xl font-black text-text-main flex items-center gap-2">
                                <Users className="w-7 h-7 text-brand-blue" />
                                {locale === 'en' ? 'Tech Talent Solutions for Businesses' : 'Solusi Talenta IT Terpadu untuk Bisnis'}
                            </h2>
                            <p className="text-sm text-text-gray font-medium leading-relaxed max-w-3xl">
                                {locale === 'en'
                                    ? 'Acquire elite digital talents on-demand. Build contract squads, recruit full-time specialists, or tap into our pre-vetted digital talent community.'
                                    : 'Dapatkan talenta digital terbaik sesuai kebutuhan bisnis Anda. Sewa tim pengembang kontrak, rekrut spesialis tetap, atau akses komunitas talenta digital terverifikasi kami.'}
                            </p>
                        </div>

                        {/* Main Grid: Three-column Tech Talent Solutions */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                            
                            {/* Card 1: IT Headhunting */}
                            <SpotlightCard className="p-8 flex flex-col justify-between rounded-3xl border border-glass-border bg-glass-bg/60 text-left h-full">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <span className="px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-black uppercase tracking-wider rounded-lg inline-block">
                                            BUILD & HIRE
                                        </span>
                                        <h3 className="text-xl font-black text-text-main pt-1">IT Headhunting</h3>
                                        <p className="text-xs text-text-gray font-medium leading-relaxed">
                                            Rekrut individu/spesialis digital terbaik secara cepat dan tertarget untuk bergabung sebagai karyawan internal tim perusahaan Anda.
                                        </p>
                                    </div>

                                    {/* Features Scope */}
                                    <div className="border-t border-glass-border/60 pt-6 space-y-4">
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">
                                            Cakupan Rekrutmen:
                                        </span>
                                        <ul className="space-y-3 list-none m-0 p-0 text-xs text-text-gray font-medium">
                                            <li className="flex items-start space-x-2">
                                                <UserCheck className="w-4.5 h-4.5 text-brand-blue shrink-0" />
                                                <span>Pencarian Spesifik: Rekrut CTO, Tech Lead, Senior Developer, atau Product Manager dengan kualifikasi presisi.</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <UserCheck className="w-4.5 h-4.5 text-brand-blue shrink-0" />
                                                <span>Skrining Teknis Penuh: Seluruh proses seleksi awal & tes kemampuan koding dikelola penuh oleh tim pakar Diggity.</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <UserCheck className="w-4.5 h-4.5 text-brand-blue shrink-0" />
                                                <span>Garansi Penggantian: Jaminan garansi penggantian talent gratis hingga 90 hari apabila tidak memenuhi kecocokan budaya kerja.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <Link
                                        href="/job-connect/headhunting"
                                        className="w-full inline-flex items-center justify-center py-3 px-5 rounded-xl text-xs font-bold bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-text-main transition-all text-center"
                                    >
                                        Buka Detail Layanan Headhunting &rarr;
                                    </Link>
                                </div>
                            </SpotlightCard>

                            {/* Card 2: IT Outsourcing */}
                            <SpotlightCard className="p-8 flex flex-col justify-between rounded-3xl border border-brand-blue/30 bg-brand-blue/5 shadow-xl shadow-brand-blue/5 text-left h-full">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <span className="px-3 py-1 bg-brand-blue/15 border border-brand-blue/25 text-brand-blue text-[10px] font-black uppercase tracking-wider rounded-lg inline-block">
                                            DEDICATED SQUAD
                                        </span>
                                        <h3 className="text-xl font-black text-text-main pt-1">IT Outsourcing</h3>
                                        <p className="text-xs text-text-gray font-medium leading-relaxed">
                                            Bangun dan sewa tim pengembang lengkap (Full-Squad) siap pakai dalam 7 hari untuk mempercepat proyek teknologi Anda tanpa beban overhead rekrutmen.
                                        </p>
                                    </div>

                                    {/* Features Scope */}
                                    <div className="border-t border-glass-border/60 pt-6 space-y-4">
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">
                                            Cakupan & Layanan Tim:
                                        </span>
                                        <ul className="space-y-3 list-none m-0 p-0 text-xs text-text-gray font-medium">
                                            <li className="flex items-start space-x-2">
                                                <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue shrink-0" />
                                                <span>Susunan Tim Lengkap: Terdiri atas UI/UX Designer, Frontend, Backend, QA Engineer, dan Project Manager.</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue shrink-0" />
                                                <span>Manajemen Operasional Penuh: Absensi, KPI kerja, payroll, tunjangan, dan deliverables dikendalikan penuh oleh Diggity.</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue shrink-0" />
                                                <span>Jaminan Kualitas Kode: Garansi bebas bug saat rilis produksi dengan laporan demo perkembangan rutin mingguan.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <Link
                                        href="/job-connect/outsourcing"
                                        className="w-full inline-flex items-center justify-center py-3 px-5 rounded-xl text-xs font-bold bg-brand-blue hover:bg-brand-blue-dark text-white shadow-lg shadow-brand-blue/20 transition-all text-center"
                                    >
                                        Buka Detail Layanan Outsourcing &rarr;
                                    </Link>
                                </div>
                            </SpotlightCard>

                            {/* Card 3: Job Connect */}
                            <SpotlightCard className="p-8 flex flex-col justify-between rounded-3xl border border-glass-border bg-glass-bg/60 text-left h-full">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <span className="px-3 py-1 bg-glass-bg border border-glass-border text-text-muted text-[10px] font-black uppercase tracking-wider rounded-lg inline-block">
                                            TALENT NETWORK
                                        </span>
                                        <h3 className="text-xl font-black text-text-main pt-1">Job Connect / Sourcing</h3>
                                        <p className="text-xs text-text-gray font-medium leading-relaxed">
                                            Akses cepat ke database jaringan talenta digital bersertifikat Diggity untuk diproyeksikan langsung ke kebutuhan kontrak jangka menengah/panjang.
                                        </p>
                                    </div>

                                    {/* Features Scope */}
                                    <div className="border-t border-glass-border/60 pt-6 space-y-4">
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">
                                            Kategori Talenta Siap Kerja:
                                        </span>
                                        <ul className="space-y-3 list-none m-0 p-0 text-xs text-text-gray font-medium">
                                            <li className="flex items-start space-x-2">
                                                <Briefcase className="w-4.5 h-4.5 text-brand-blue shrink-0" />
                                                <span>Software Engineers: Pengembang web & mobile (Next.js, React, Node.js, Laravel, Golang, Native Dev).</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <Briefcase className="w-4.5 h-4.5 text-brand-blue shrink-0" />
                                                <span>Data & AI Specialist: Ahli data science, machine learning engineers, DevOps automation, & data analysts.</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <Briefcase className="w-4.5 h-4.5 text-brand-blue shrink-0" />
                                                <span>Flexible Sourcing: Sewa talenta kontrak bulanan dengan fleksibilitas tinggi tanpa kontrak terikat permanen.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <a
                                        href={`https://wa.me/${phone}?text=${encodeURIComponent(
                                            "Halo Diggity, kami tertarik untuk menyewa talenta kontrak fleksibel dari layanan Job Connect/Sourcing B2B. Bagaimana prosedur kerja samanya?"
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center py-3 px-5 rounded-xl text-xs font-bold bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-text-main transition-all text-center"
                                    >
                                        Eksplorasi Jaringan Talenta B2B
                                    </a>
                                </div>
                            </SpotlightCard>

                        </div>

                        {/* Informational Panel B2B */}
                        <div className="p-6 bg-glass-bg border border-glass-border rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                            <div className="space-y-2">
                                <h4 className="text-sm font-extrabold text-text-main flex items-center gap-2">
                                    <ShieldAlert className="w-4 h-4 text-brand-blue shrink-0" />
                                    Jaminan Kualitas Kontrak Talenta Diggity
                                </h4>
                                <p className="text-xs text-text-gray leading-relaxed font-medium max-w-3xl">
                                    Seluruh talenta di jaringan Diggity telah melalui proses seleksi kompetensi koding, kecakapan komunikasi, dan penyelarasan budaya kerja profesional sebelum diproyeksikan untuk disewa klien.
                                </p>
                            </div>
                            <Link 
                                href="/contact"
                                className="px-5 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue-dark transition-colors shrink-0"
                            >
                                Kirim Pertanyaan &rarr;
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
