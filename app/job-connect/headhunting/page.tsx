'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    UserCheck, 
    Search, 
    ShieldCheck, 
    ArrowLeft, 
    ArrowRight,
    Users, 
    Building2, 
    Briefcase, 
    CheckCircle2, 
    Clock, 
    Sparkles, 
    MessageSquare, 
    HelpCircle,
    ChevronDown
} from 'lucide-react';
import SpotlightCard from '../../../components/SpotlightCard';
import B2bInquiryForm from '../../../components/B2bInquiryForm';
import { api } from '../../../lib/api';

export default function HeadhuntingPage() {
    const [activeProcessTab, setActiveProcessTab] = useState<number>(0);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const [title, setTitle] = useState('Rekrut Tim IT Terbaik Tanpa Kerumitan Sourcing.');
    const [description, setDescription] = useState('Kami membantu perusahaan menjaring, menyaring, dan merekrut talenta digital teratas—mulai dari Software Engineers hingga CTO—dengan kualifikasi teknis presisi serta budaya kerja yang selaras.');
    
    const [processTabs, setProcessTabs] = useState<Array<{ title: string; subtitle: string; content: string }>>([
        {
            title: '1. Analisis Profil',
            subtitle: 'Pemetaan Kebutuhan Teknis',
            content: 'Kami duduk bersama dengan tim Anda untuk merumuskan deskripsi pekerjaan secara detail, menentukan kualifikasi teknis (tech stack) yang dibutuhkan, serta menyelaraskan kriteria soft skill dan kepribadian (cultural fit) agar kandidat dapat langsung menyatu dengan tim internal Anda.'
        },
        {
            title: '2. Sourcing & Screening',
            subtitle: 'Pencarian & Penjaringan Kandidat',
            content: 'Tim perekrut ahli kami menyaring kandidat potensial dari basis data internal bersertifikat Diggity dan jaringan global kami. Kami melakukan pre-screening teknis, review portfolio koding, dan wawancara awal sebelum merekomendasikan mereka.'
        },
        {
            title: '3. Wawancara Klien',
            subtitle: 'Presentasi & Seleksi Final',
            content: 'Kami menyajikan CV beserta hasil penilaian teknis (technical test) dari 2-3 kandidat terbaik untuk Anda wawancarai langsung. Kami membantu menjadwalkan wawancara dan menjadi penengah proses feedback demi kesepakatan terbaik.'
        },
        {
            title: '4. Onboarding & Garansi',
            subtitle: 'Penempatan & Jaminan Kinerja',
            content: 'Setelah penawaran diterima, kami mendampingi masa transisi kandidat hingga resmi onboarding di perusahaan Anda. Untuk menjamin kenyamanan Anda, kami memberikan garansi penggantian kandidat gratis hingga 90 hari jika terjadi ketidakcocokan.'
        }
    ]);

    const [faqs, setFaqs] = useState<Array<{ q: string; a: string }>>([
        {
            q: 'Berapa biaya jasa IT Headhunting di Diggity?',
            a: 'Biaya headhunting didasarkan pada persentase remunerasi tahunan kandidat yang disetujui (Annual Package), atau melalui skema harga flat terjangkau yang disesuaikan dengan tingkat kesulitan posisi. Kami mengadopsi model "Success Fee", yang berarti Anda hanya membayar setelah kandidat resmi menandatangani kontrak kerja.'
        },
        {
            q: 'Bagaimana jika kandidat mengundurkan diri dalam masa percobaan?',
            a: 'Diggity memberikan jaminan garansi penggantian talenta (replacement guarantee) secara gratis selama 90 hari terhitung sejak tanggal onboarding kandidat. Kami akan segera mencarikan kandidat pengganti baru tanpa mengenakan biaya tambahan apa pun.'
        },
        {
            q: 'Berapa lama waktu yang dibutuhkan untuk mendapatkan kandidat?',
            a: 'Untuk posisi junior hingga mid-level, kami biasanya menyajikan kandidat terpilih pertama dalam waktu 7–10 hari kerja. Untuk posisi senior, manajerial, atau tech stack yang sangat langka, proses penyaringan dapat memakan waktu 14–21 hari kerja.'
        },
        {
            q: 'Apakah seluruh kandidat sudah melalui tes kompetensi?',
            a: 'Tentu kawan. Seluruh kandidat yang kami teruskan ke klien telah melalui tes penyaringan awal secara internal yang mencakup penilaian algoritma, live coding review, pemecahan masalah (case study), serta asesmen komunikasi profesional.'
        }
    ]);

    useEffect(() => {
        api.getTalentService('headhunting')
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
                                Mulai Konsultasi Perekrutan
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
                            <h3 className="text-lg font-extrabold text-text-main">Mitra Strategis Pertumbuhan Anda</h3>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                Mencari talenta IT yang andal membutuhkan waktu berminggu-minggu dan biaya iklan rekrutmen yang tidak sedikit. Di Diggity, kami menyingkirkan kerumitan itu dengan proses kurasi berbasis pakar teknologi.
                            </p>
                            
                            {/* Visual Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-glass-border/60">
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">100+</span>
                                    <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block">Klien Korporat</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">14 Hari</span>
                                    <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block">Rata-rata Pengisian</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">98%</span>
                                    <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block">Retention Rate</span>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>

                {/* Core Benefits */}
                <div className="space-y-10">
                    <div className="max-w-3xl space-y-2">
                        <h2 className="text-2xl md:text-3xl font-black text-text-main">
                            Kenapa Memilih Jasa IT Headhunting Diggity?
                        </h2>
                        <p className="text-sm text-text-gray font-medium">
                            Kami menggabungkan wawasan industri digital yang mendalam dengan teknik evaluasi teknis yang komprehensif.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <SpotlightCard className="p-6 border border-glass-border rounded-2xl space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                <Search className="w-5 h-5" />
                            </div>
                            <h4 className="text-sm font-extrabold text-text-main">Pencarian Tertarget</h4>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                Sourcing pasif untuk menjangkau spesialis berpengalaman yang tidak sedang aktif melamar di job portal biasa.
                            </p>
                        </SpotlightCard>

                        <SpotlightCard className="p-6 border border-glass-border rounded-2xl space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                <UserCheck className="w-5 h-5" />
                            </div>
                            <h4 className="text-sm font-extrabold text-text-main">Validasi Ahli</h4>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                Penilaian koding awal dikurasi oleh Senior Architect kami untuk menyaring kandidat berkualitas rendah.
                            </p>
                        </SpotlightCard>

                        <SpotlightCard className="p-6 border border-glass-border rounded-2xl space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                <Clock className="w-5 h-5" />
                            </div>
                            <h4 className="text-sm font-extrabold text-text-main">Efisiensi Penuh</h4>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                Mengurangi waktu rekrutmen hingga 60% sehingga tim internal Anda dapat fokus pada penyelesaian sprint.
                            </p>
                        </SpotlightCard>

                        <SpotlightCard className="p-6 border border-glass-border rounded-2xl space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h4 className="text-sm font-extrabold text-text-main">Garansi 90 Hari</h4>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                Jaminan penggantian talenta tanpa biaya tambahan jika kinerja talenta tidak memenuhi target dalam 3 bulan.
                            </p>
                        </SpotlightCard>
                    </div>
                </div>

                {/* Selection & Interview Process (Interactive Tabs) */}
                <div className="space-y-10">
                    <div className="max-w-3xl space-y-2">
                        <h2 className="text-2xl md:text-3xl font-black text-text-main">
                            Proses Perekrutan Kami
                        </h2>
                        <p className="text-sm text-text-gray font-medium">
                            Skema kerja terstruktur untuk mendapatkan kecocokan talenta yang presisi dalam waktu singkat.
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
                                        Diskusikan Kebutuhan Posisi Anda
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
                                Informasi tambahan mengenai skema kerja sama rekrutmen IT di Diggity.
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
                                Beritahu kami profil talenta yang sedang dicari.
                            </p>
                        </div>

                        <SpotlightCard className="p-8 border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30 rounded-2xl">
                            <B2bInquiryForm defaultService="IT Headhunting" />
                        </SpotlightCard>
                    </div>

                </div>

            </div>
        </div>
    );
}
