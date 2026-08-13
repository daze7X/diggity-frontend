'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    Users, 
    Code, 
    ShieldCheck, 
    ArrowLeft, 
    ArrowRight,
    Building2, 
    CheckCircle2, 
    Clock, 
    Sparkles, 
    HelpCircle,
    ChevronDown,
    Cpu,
    GitBranch,
    Activity
} from 'lucide-react';
import SpotlightCard from '../../../components/SpotlightCard';
import B2bInquiryForm from '../../../components/B2bInquiryForm';
import { api } from '../../../lib/api';

export default function OutsourcingPage() {
    const [activeProcessTab, setActiveProcessTab] = useState<number>(0);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const [title, setTitle] = useState('Sewa Tim IT Outsourcing Siap Deploy dalam 7 Hari.');
    const [description, setDescription] = useState('Beban operasional nol, fokus hasil maksimal. Kami menyediakan tim pengembang lengkap (Full Squad) yang dikelola penuh oleh Diggity untuk merancang dan meluncurkan produk digital Anda tanpa kendala rekrutmen.');
    
    const [processTabs, setProcessTabs] = useState<Array<{ title: string; subtitle: string; content: string }>>([
        {
            title: '1. Analisis Kebutuhan',
            subtitle: 'Pemetaan Scope & Arsitektur',
            content: 'Tim Solutions Architect kami bekerja sama dengan Anda untuk merinci ruang lingkup proyek, mendesain cetak biru arsitektur sistem, memetakan diagram alur data, serta menentukan keahlian teknis (tech stack) spesifik yang dibutuhkan oleh squad pengembang.'
        },
        {
            title: '2. Penyusunan Squad',
            subtitle: 'Pemilihan & Alokasi Talenta',
            content: 'Kami menyusun susunan tim lengkap (Full Squad) yang terdiri atas UI/UX Designer, Frontend Engineer, Backend Engineer, QA Specialist, dan Project Manager berpengalaman. Anggota tim dipilih langsung dari talent pool terkurasi kami dalam waktu maksimal 7 hari.'
        },
        {
            title: '3. Masa Uji Coba',
            subtitle: 'Sinergi Awal 1 Minggu',
            content: 'Setelah squad terbentuk, kami memulai masa uji coba adaptasi selama 1 minggu. Kami mensinkronisasikan pola komunikasi, setup repositori kode, dan memulai sprint pertama. Sesi ini membuktikan kesiapan kolaborasi tim sebelum komitmen kontrak jangka panjang berjalan.'
        },
        {
            title: '4. Managed Delivery',
            subtitle: 'Eksekusi & Kontrol Kualitas',
            content: 'Project Manager kami akan memimpin stand-up meeting harian, mengelola backlog sprint, dan memastikan pengerjaan tepat waktu. Seluruh deliverables dikontrol kualitasnya secara internal oleh Tech Lead sebelum dipresentasikan ke Anda pada demo mingguan.'
        }
    ]);

    const [faqs, setFaqs] = useState<Array<{ q: string; a: string }>>([
        {
            q: 'Apa perbedaan IT Outsourcing di Diggity dibanding agensi biasa?',
            a: 'Kami mengadopsi model "Managed Service". Kami tidak hanya sekadar menempatkan tenaga kerja di kantor kawan lalu membiarkan Anda mengelolanya sendiri. Kami menyertakan Dedicated Project Manager untuk mengontrol KPI harian, memantau absensi, melakukan code review berkala, serta menjamin kualitas output pekerjaan sehingga Anda terbebas dari beban manajemen operasional.'
        },
        {
            q: 'Bagaimana dengan hak kekayaan intelektual (IP Rights) dari kode yang ditulis?',
            a: 'Hak kekayaan intelektual (Intellectual Property Rights) sepenuhnya menjadi milik klien kawan. Seluruh kode pemrograman, desain antarmuka, repositori Git, dan dokumentasi sistem yang dibangun oleh tim pengembang kami akan diserahterimakan secara utuh ke perusahaan Anda setelah masa kontrak selesai atau berjalan.'
        },
        {
            q: 'Apakah tim bisa bekerja langsung secara onsite di kantor kami?',
            a: 'Secara default, tim kami bekerja secara remote-first didukung oleh sistem kolaborasi digital modern. Namun, jika proyek memerlukan koordinasi onsite yang intensif, kami memfasilitasi skema kerja Hybrid (gabungan onsite dan remote) atau Onsite Penuh di area kota tertentu sesuai kesepakatan kontrak.'
        },
        {
            q: 'Bagaimana jika ada anggota tim yang kinerjanya kurang memuaskan?',
            a: 'Diggity memberikan jaminan replacement (penggantian talenta) secara cepat. Jika ada anggota squad yang performanya kurang memuaskan, silakan ajukan keluhan ke Account Manager kami. Kami menjamin penggantian talenta dalam waktu maksimal 7 hari tanpa mengganggu jalannya garis waktu proyek Anda.'
        }
    ]);

    useEffect(() => {
        api.getTalentService('outsourcing')
            .then(data => {
                if (data) {
                    if (data.title) setTitle(data.title);
                    if (data.description) setDescription(data.description);
                    if (data.process_tabs && data.process_tabs.length > 0) setProcessTabs(data.process_tabs);
                    if (data.faqs && data.faqs.length > 0) setFaqs(data.faqs);
                }
            })
            .catch(err => console.error('Error fetching talent service:', err));
    }, []);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden text-left">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-20">
                
                {/* Back Button & Navigation */}
                <div className="flex items-center">
                    <Link 
                        href="/job-connect"
                        className="inline-flex items-center gap-2 text-xs font-bold text-text-gray hover:text-brand-blue transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                        Kembali ke Job Connect
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-black uppercase tracking-wider rounded-lg">
                            <Sparkles className="w-3 h-3" /> Managed IT Squads
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-main leading-tight">
                            {title}
                        </h1>
                        <p className="text-base md:text-lg text-text-gray font-medium leading-relaxed">
                            {description}
                        </p>
                        <div className="pt-2 flex flex-wrap gap-4">
                            <a 
                                href="#consultation-form"
                                className="px-6 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-blue/10 hover:scale-[1.01] transition-all"
                            >
                                Minta Penawaran Outsourcing
                            </a>
                            <Link 
                                href="/job-connect"
                                className="px-6 py-3 bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-text-main rounded-xl text-xs font-bold transition-all"
                            >
                                Cari Lowongan Kerja
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-blue/5 rounded-3xl blur-2xl -z-10" />
                        <SpotlightCard className="p-8 md:p-10 border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30 rounded-3xl space-y-6">
                            <h3 className="text-lg font-extrabold text-text-main">Akselerasi Pengiriman Produk Anda</h3>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                Membangun infrastruktur digital dan aplikasi web/mobile berkualitas memerlukan tim yang sinkron. Di Diggity, kami mengumpulkan talenta terbaik dalam satu koordinasi di bawah pengawasan Project Manager berpengalaman.
                            </p>
                            
                            {/* Visual Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-glass-border/60">
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">7 Hari</span>
                                    <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block">Deployment Squad</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">600+</span>
                                    <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block">Talenta IT</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">100%</span>
                                    <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block">IP Rights Klien</span>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>

                {/* Reusable Quality Banner Section (Tiru circular concept Binar) */}
                <div className="p-8 md:p-12 border border-glass-border rounded-3xl bg-glass-bg/40 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block">Quality Control Framework</span>
                        <h2 className="text-2xl md:text-3xl font-black text-text-main">
                            Tidak Hanya Menyediakan Pekerja, Kami Mengelola Kualitas & Hasil Kerja
                        </h2>
                        <p className="text-xs text-text-gray font-medium">
                            Setiap baris kode dipastikan aman, terdokumentasi, dan berjalan lancar di server produksi.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                        <div className="space-y-2 p-4 rounded-2xl bg-glass-bg border border-glass-border/40">
                            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-2 shrink-0">
                                <Cpu className="w-4.5 h-4.5" />
                            </div>
                            <h4 className="text-sm font-extrabold text-text-main">Dedicated Project Manager</h4>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                Menghilangkan beban koordinasi harian kawan. Seluruh pembagian tugas, timeline, dan status pelaporan dikelola penuh oleh Project Manager kami.
                            </p>
                        </div>
                        <div className="space-y-2 p-4 rounded-2xl bg-glass-bg border border-glass-border/40">
                            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-2 shrink-0">
                                <GitBranch className="w-4.5 h-4.5" />
                            </div>
                            <h4 className="text-sm font-extrabold text-text-main">Code Review & Quality Assurance</h4>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                Setiap penggabungan kode (merge request) wajib divalidasi oleh Tech Lead internal Diggity dan divalidasi oleh QA Engineer melalui sistem automation testing.
                            </p>
                        </div>
                        <div className="space-y-2 p-4 rounded-2xl bg-glass-bg border border-glass-border/40">
                            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-2 shrink-0">
                                <Activity className="w-4.5 h-4.5" />
                            </div>
                            <h4 className="text-sm font-extrabold text-text-main">Continuous Integration / Delivery</h4>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                Demo progress mingguan, pengelolaan repositori Git yang transparan, absensi tim bulanan, serta pergantian talenta cepat dalam 7 hari tanpa biaya ekstra.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Selection & Deployment Process (Interactive Tabs) */}
                <div className="space-y-10">
                    <div className="max-w-3xl space-y-2">
                        <h2 className="text-2xl md:text-3xl font-black text-text-main">
                            Tahapan Kerja Sama & Pendeploisan
                        </h2>
                        <p className="text-sm text-text-gray font-medium">
                            Bagaimana kami mempersiapkan dan mendampingi tim pengembang Anda dari awal hingga rilis produksi.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Process Buttons */}
                        <div className="lg:col-span-1 flex flex-col gap-2.5">
                            {processTabs.map((tab, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveProcessTab(idx)}
                                    className={`w-full p-4 rounded-xl border text-left transition-all backdrop-blur-md cursor-pointer flex flex-col space-y-1 ${
                                        activeProcessTab === idx
                                            ? 'bg-brand-blue/5 border-brand-blue shadow-lg shadow-brand-blue/5'
                                            : 'bg-glass-bg border-glass-border hover:border-brand-blue/30'
                                    }`}
                                >
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${activeProcessTab === idx ? 'text-brand-blue' : 'text-text-muted'}`}>
                                        {tab.title}
                                    </span>
                                    <span className={`text-xs font-extrabold ${activeProcessTab === idx ? 'text-text-main' : 'text-text-gray'}`}>
                                        {tab.subtitle}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Process Description Panel */}
                        <div className="lg:col-span-2">
                            <SpotlightCard className="p-8 md:p-10 border border-glass-border bg-glass-bg/40 rounded-2xl h-full flex flex-col justify-between min-h-[220px]">
                                <div className="space-y-4">
                                    <span className="inline-block px-2.5 py-0.5 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[9px] font-bold uppercase tracking-wider rounded-md">
                                        {processTabs[activeProcessTab]?.subtitle}
                                    </span>
                                    <p className="text-xs md:text-sm text-text-gray font-medium leading-relaxed">
                                        {processTabs[activeProcessTab]?.content}
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-glass-border/40 flex justify-end">
                                    <a 
                                        href="#consultation-form"
                                        className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 group"
                                    >
                                        Diskusikan Rencana Proyek Anda
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                    </a>
                                </div>
                            </SpotlightCard>
                        </div>
                    </div>
                </div>

                {/* FAQ & Form Section */}
                <div id="consultation-form" className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    
                    {/* Left 3 Cols: FAQs */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-black text-text-main">
                                Pertanyaan Umum (FAQ)
                            </h2>
                            <p className="text-sm text-text-gray font-medium">
                                Informasi detail seputar pembiayaan, sistem absensi, dan penggantian developer.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq, idx) => (
                                <div 
                                    key={idx}
                                    className="border border-glass-border rounded-xl bg-glass-bg overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full p-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                                    >
                                        <span className="text-xs md:text-sm font-extrabold text-text-main pr-4">{faq.q}</span>
                                        <ChevronDown className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                                    </button>
                                    {activeFaq === idx && (
                                        <div className="px-4 pb-4 pt-1 border-t border-glass-border/30 animate-in slide-in-from-top-1 duration-200">
                                            <p className="text-xs text-text-gray font-medium leading-relaxed">{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right 2 Cols: Form */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-black text-text-main">
                                Hubungi Konsultan
                            </h2>
                            <p className="text-sm text-text-gray font-medium">
                                Mulai konsultasi pembangunan Dedicated Team.
                            </p>
                        </div>

                        <SpotlightCard className="p-8 border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30 rounded-2xl">
                            <B2bInquiryForm defaultService="IT Outsourcing" />
                        </SpotlightCard>
                    </div>

                </div>

            </div>
        </div>
    );
}
