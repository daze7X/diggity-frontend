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
import { useLanguage } from '../../../context/LanguageContext';

export default function OutsourcingPage() {
    const { language: locale } = useLanguage();
    const [activeProcessTab, setActiveProcessTab] = useState<number>(0);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const [title, setTitle] = useState(locale === 'en' ? 'Hire an IT Outsourcing Team Ready to Deploy in 7 Days.' : 'Sewa Tim IT Outsourcing Siap Deploy dalam 7 Hari.');
    const [description, setDescription] = useState(locale === 'en' ? 'Zero operational burden, maximum result focus. We provide a complete development team (Full Squad) fully managed by Diggity to design and launch your digital product without recruitment hurdles.' : 'Beban operasional nol, fokus hasil maksimal. Kami menyediakan tim pengembang lengkap (Full Squad) yang dikelola penuh oleh Diggity untuk merancang dan meluncurkan produk digital Anda tanpa kendala rekrutmen.');
    
    useEffect(() => {
        setTitle(locale === 'en' ? 'Hire an IT Outsourcing Team Ready to Deploy in 7 Days.' : 'Sewa Tim IT Outsourcing Siap Deploy dalam 7 Hari.');
        setDescription(locale === 'en' ? 'Zero operational burden, maximum result focus. We provide a complete development team (Full Squad) fully managed by Diggity to design and launch your digital product without recruitment hurdles.' : 'Beban operasional nol, fokus hasil maksimal. Kami menyediakan tim pengembang lengkap (Full Squad) yang dikelola penuh oleh Diggity untuk merancang dan meluncurkan produk digital Anda tanpa kendala rekrutmen.');
    }, [locale]);

    const [processTabs, setProcessTabs] = useState<Array<{ title: string; subtitle: string; content: string }>>([
        {
            title: locale === 'en' ? '1. Requirements Analysis' : '1. Analisis Kebutuhan',
            subtitle: locale === 'en' ? 'Scope & Architecture Mapping' : 'Pemetaan Scope & Arsitektur',
            content: locale === 'en' ? 'Our Solutions Architect team works with you to detail project scope, design system architecture blueprints, map data flow diagrams, and determine specific tech stacks needed by the development squad.' : 'Tim Solutions Architect kami bekerja sama dengan Anda untuk merinci ruang lingkup proyek, mendesain cetak biru arsitektur sistem, memetakan diagram alur data, serta menentukan keahlian teknis (tech stack) spesifik yang dibutuhkan oleh squad pengembang.'
        },
        {
            title: locale === 'en' ? '2. Squad Formation' : '2. Penyusunan Squad',
            subtitle: locale === 'en' ? 'Talent Selection & Allocation' : 'Pemilihan & Alokasi Talenta',
            content: locale === 'en' ? 'We assemble a complete team (Full Squad) consisting of UI/UX Designers, Frontend Engineers, Backend Engineers, QA Specialists, and experienced Project Managers. Team members are chosen directly from our curated talent pool within a maximum of 7 days.' : 'Kami menyusun susunan tim lengkap (Full Squad) yang terdiri atas UI/UX Designer, Frontend Engineer, Backend Engineer, QA Specialist, dan Project Manager berpengalaman. Anggota tim dipilih langsung dari talent pool terkurasi kami dalam waktu maksimal 7 hari.'
        },
        {
            title: locale === 'en' ? '3. Trial Period' : '3. Masa Uji Coba',
            subtitle: locale === 'en' ? '1 Week Initial Synergy' : 'Sinergi Awal 1 Minggu',
            content: locale === 'en' ? 'Once the squad is formed, we begin a 1-week adaptation trial period. We sync communication patterns, setup code repositories, and start the first sprint. This session proves team collaboration readiness before a long-term contract commitment begins.' : 'Setelah squad terbentuk, kami memulai masa uji coba adaptasi selama 1 minggu. Kami mensinkronisasikan pola komunikasi, setup repositori kode, dan memulai sprint pertama. Sesi ini membuktikan kesiapan kolaborasi tim sebelum komitmen kontrak jangka panjang berjalan.'
        },
        {
            title: locale === 'en' ? '4. Managed Delivery' : '4. Managed Delivery',
            subtitle: locale === 'en' ? 'Execution & Quality Control' : 'Eksekusi & Kontrol Kualitas',
            content: locale === 'en' ? 'Our Project Manager will lead daily stand-up meetings, manage sprint backlogs, and ensure timely delivery. All deliverables are internally quality-controlled by the Tech Lead before being presented to you in weekly demos.' : 'Project Manager kami akan memimpin stand-up meeting harian, mengelola backlog sprint, dan memastikan pengerjaan tepat waktu. Seluruh deliverables dikontrol kualitasnya secara internal oleh Tech Lead sebelum dipresentasikan ke Anda pada demo mingguan.'
        }
    ]);

    useEffect(() => {
        setProcessTabs([
            {
                title: locale === 'en' ? '1. Requirements Analysis' : '1. Analisis Kebutuhan',
                subtitle: locale === 'en' ? 'Scope & Architecture Mapping' : 'Pemetaan Scope & Arsitektur',
                content: locale === 'en' ? 'Our Solutions Architect team works with you to detail project scope, design system architecture blueprints, map data flow diagrams, and determine specific tech stacks needed by the development squad.' : 'Tim Solutions Architect kami bekerja sama dengan Anda untuk merinci ruang lingkup proyek, mendesain cetak biru arsitektur sistem, memetakan diagram alur data, serta menentukan keahlian teknis (tech stack) spesifik yang dibutuhkan oleh squad pengembang.'
            },
            {
                title: locale === 'en' ? '2. Squad Formation' : '2. Penyusunan Squad',
                subtitle: locale === 'en' ? 'Talent Selection & Allocation' : 'Pemilihan & Alokasi Talenta',
                content: locale === 'en' ? 'We assemble a complete team (Full Squad) consisting of UI/UX Designers, Frontend Engineers, Backend Engineers, QA Specialists, and experienced Project Managers. Team members are chosen directly from our curated talent pool within a maximum of 7 days.' : 'Kami menyusun susunan tim lengkap (Full Squad) yang terdiri atas UI/UX Designer, Frontend Engineer, Backend Engineer, QA Specialist, dan Project Manager berpengalaman. Anggota tim dipilih langsung dari talent pool terkurasi kami dalam waktu maksimal 7 hari.'
            },
            {
                title: locale === 'en' ? '3. Trial Period' : '3. Masa Uji Coba',
                subtitle: locale === 'en' ? '1 Week Initial Synergy' : 'Sinergi Awal 1 Minggu',
                content: locale === 'en' ? 'Once the squad is formed, we begin a 1-week adaptation trial period. We sync communication patterns, setup code repositories, and start the first sprint. This session proves team collaboration readiness before a long-term contract commitment begins.' : 'Setelah squad terbentuk, kami memulai masa uji coba adaptasi selama 1 minggu. Kami mensinkronisasikan pola komunikasi, setup repositori kode, dan memulai sprint pertama. Sesi ini membuktikan kesiapan kolaborasi tim sebelum komitmen kontrak jangka panjang berjalan.'
            },
            {
                title: locale === 'en' ? '4. Managed Delivery' : '4. Managed Delivery',
                subtitle: locale === 'en' ? 'Execution & Quality Control' : 'Eksekusi & Kontrol Kualitas',
                content: locale === 'en' ? 'Our Project Manager will lead daily stand-up meetings, manage sprint backlogs, and ensure timely delivery. All deliverables are internally quality-controlled by the Tech Lead before being presented to you in weekly demos.' : 'Project Manager kami akan memimpin stand-up meeting harian, mengelola backlog sprint, dan memastikan pengerjaan tepat waktu. Seluruh deliverables dikontrol kualitasnya secara internal oleh Tech Lead sebelum dipresentasikan ke Anda pada demo mingguan.'
            }
        ]);
    }, [locale]);

    const [faqs, setFaqs] = useState<Array<{ q: string; a: string }>>([
        {
            q: locale === 'en' ? 'What\'s the difference between Diggity\'s IT Outsourcing and regular agencies?' : 'Apa perbedaan IT Outsourcing di Diggity dibanding agensi biasa?',
            a: locale === 'en' ? 'We adopt a "Managed Service" model. We don\'t just place workers in your office and let you manage them yourself. We include a Dedicated Project Manager to control daily KPIs, monitor attendance, conduct regular code reviews, and guarantee output quality so you are free from operational management burdens.' : 'Kami mengadopsi model "Managed Service". Kami tidak hanya sekadar menempatkan tenaga kerja di kantor kawan lalu membiarkan Anda mengelolanya sendiri. Kami menyertakan Dedicated Project Manager untuk mengontrol KPI harian, memantau absensi, melakukan code review berkala, serta menjamin kualitas output pekerjaan sehingga Anda terbebas dari beban manajemen operasional.'
        },
        {
            q: locale === 'en' ? 'What about the Intellectual Property Rights of the written code?' : 'Bagaimana dengan hak kekayaan intelektual (IP Rights) dari kode yang ditulis?',
            a: locale === 'en' ? 'Intellectual Property Rights fully belong to the client. All programming code, interface designs, Git repositories, and system documentation built by our development team will be fully handed over to your company after the contract period ends or is ongoing.' : 'Hak kekayaan intelektual (Intellectual Property Rights) sepenuhnya menjadi milik klien kawan. Seluruh kode pemrograman, desain antarmuka, repositori Git, dan dokumentasi sistem yang dibangun oleh tim pengembang kami akan diserahterimakan secara utuh ke perusahaan Anda setelah masa kontrak selesai atau berjalan.'
        },
        {
            q: locale === 'en' ? 'Can the team work directly onsite at our office?' : 'Apakah tim bisa bekerja langsung secara onsite di kantor kami?',
            a: locale === 'en' ? 'By default, our team works remote-first supported by modern digital collaboration systems. However, if the project requires intensive onsite coordination, we facilitate Hybrid work schemes (combined onsite and remote) or Full Onsite in specific city areas according to the contract agreement.' : 'Secara default, tim kami bekerja secara remote-first didukung oleh sistem kolaborasi digital modern. Namun, jika proyek memerlukan koordinasi onsite yang intensif, kami memfasilitasi skema kerja Hybrid (gabungan onsite dan remote) atau Onsite Penuh di area kota tertentu sesuai kesepakatan kontrak.'
        },
        {
            q: locale === 'en' ? 'What if a team member\'s performance is unsatisfactory?' : 'Bagaimana jika ada anggota tim yang kinerjanya kurang memuaskan?',
            a: locale === 'en' ? 'Diggity provides a fast replacement guarantee. If a squad member\'s performance is unsatisfactory, please submit a complaint to our Account Manager. We guarantee a talent replacement within a maximum of 7 days without disrupting your project timeline.' : 'Diggity memberikan jaminan replacement (penggantian talenta) secara cepat. Jika ada anggota squad yang performanya kurang memuaskan, silakan ajukan keluhan ke Account Manager kami. Kami menjamin penggantian talenta dalam waktu maksimal 7 hari tanpa mengganggu jalannya garis waktu proyek Anda.'
        }
    ]);

    useEffect(() => {
        setFaqs([
            {
                q: locale === 'en' ? 'What\'s the difference between Diggity\'s IT Outsourcing and regular agencies?' : 'Apa perbedaan IT Outsourcing di Diggity dibanding agensi biasa?',
                a: locale === 'en' ? 'We adopt a "Managed Service" model. We don\'t just place workers in your office and let you manage them yourself. We include a Dedicated Project Manager to control daily KPIs, monitor attendance, conduct regular code reviews, and guarantee output quality so you are free from operational management burdens.' : 'Kami mengadopsi model "Managed Service". Kami tidak hanya sekadar menempatkan tenaga kerja di kantor kawan lalu membiarkan Anda mengelolanya sendiri. Kami menyertakan Dedicated Project Manager untuk mengontrol KPI harian, memantau absensi, melakukan code review berkala, serta menjamin kualitas output pekerjaan sehingga Anda terbebas dari beban manajemen operasional.'
            },
            {
                q: locale === 'en' ? 'What about the Intellectual Property Rights of the written code?' : 'Bagaimana dengan hak kekayaan intelektual (IP Rights) dari kode yang ditulis?',
                a: locale === 'en' ? 'Intellectual Property Rights fully belong to the client. All programming code, interface designs, Git repositories, and system documentation built by our development team will be fully handed over to your company after the contract period ends or is ongoing.' : 'Hak kekayaan intelektual (Intellectual Property Rights) sepenuhnya menjadi milik klien kawan. Seluruh kode pemrograman, desain antarmuka, repositori Git, dan dokumentasi sistem yang dibangun oleh tim pengembang kami akan diserahterimakan secara utuh ke perusahaan Anda setelah masa kontrak selesai atau berjalan.'
            },
            {
                q: locale === 'en' ? 'Can the team work directly onsite at our office?' : 'Apakah tim bisa bekerja langsung secara onsite di kantor kami?',
                a: locale === 'en' ? 'By default, our team works remote-first supported by modern digital collaboration systems. However, if the project requires intensive onsite coordination, we facilitate Hybrid work schemes (combined onsite and remote) or Full Onsite in specific city areas according to the contract agreement.' : 'Secara default, tim kami bekerja secara remote-first didukung oleh sistem kolaborasi digital modern. Namun, jika proyek memerlukan koordinasi onsite yang intensif, kami memfasilitasi skema kerja Hybrid (gabungan onsite dan remote) atau Onsite Penuh di area kota tertentu sesuai kesepakatan kontrak.'
            },
            {
                q: locale === 'en' ? 'What if a team member\'s performance is unsatisfactory?' : 'Bagaimana jika ada anggota tim yang kinerjanya kurang memuaskan?',
                a: locale === 'en' ? 'Diggity provides a fast replacement guarantee. If a squad member\'s performance is unsatisfactory, please submit a complaint to our Account Manager. We guarantee a talent replacement within a maximum of 7 days without disrupting your project timeline.' : 'Diggity memberikan jaminan replacement (penggantian talenta) secara cepat. Jika ada anggota squad yang performanya kurang memuaskan, silakan ajukan keluhan ke Account Manager kami. Kami menjamin penggantian talenta dalam waktu maksimal 7 hari tanpa mengganggu jalannya garis waktu proyek Anda.'
            }
        ]);
    }, [locale]);

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
        <div className="relative pt-24 pb-20 md:pt-28 md:pb-28 overflow-hidden text-left">
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
                        {locale === 'en' ? 'Back to Job Connect' : 'Kembali ke Job Connect'}
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-text-main leading-tight">
                            {locale === 'en' ? 'Hire an IT Outsourcing Team Ready to Deploy in ' : 'Sewa Tim IT Outsourcing Siap Deploy dalam '}<span className="text-brand-blue">{locale === 'en' ? '7 Days' : '7 Hari'}</span>
                        </h1>
                        <p className="text-base md:text-lg text-text-gray font-medium leading-relaxed">
                            {description}
                        </p>
                        <div className="pt-2 flex flex-wrap gap-4">
                            <a 
                                href="#consultation-form"
                                className="px-6 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-blue/10 hover:scale-[1.01] transition-all"
                            >
                                {locale === 'en' ? 'Request Outsourcing Quote' : 'Minta Penawaran Outsourcing'}
                            </a>
                            <Link 
                                href="/job-connect"
                                className="px-6 py-3 bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-text-main rounded-xl text-xs font-bold transition-all"
                            >
                                {locale === 'en' ? 'Search for Jobs' : 'Cari Lowongan Kerja'}
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-blue/5 rounded-3xl blur-2xl -z-10" />
                        <SpotlightCard className="p-8 md:p-10 border border-glass-border bg-gradient-to-b from-glass-bg/60 to-glass-bg/30 rounded-3xl space-y-6">
                            <h3 className="text-lg font-extrabold text-text-main">{locale === 'en' ? 'Accelerate Your Product Delivery' : 'Akselerasi Pengiriman Produk Anda'}</h3>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                {locale === 'en' ? 'Building digital infrastructure and quality web/mobile apps requires a synchronized team. At Diggity, we gather the best talents under one coordination, supervised by an experienced Project Manager.' : 'Membangun infrastruktur digital dan aplikasi web/mobile berkualitas memerlukan tim yang sinkron. Di Diggity, kami mengumpulkan talenta terbaik dalam satu koordinasi di bawah pengawasan Project Manager berpengalaman.'}
                            </p>
                            
                            {/* Visual Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-glass-border/60">
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">{locale === 'en' ? '7 Days' : '7 Hari'}</span>
                                    <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block">{locale === 'en' ? 'Deployment Squad' : 'Deployment Squad'}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">600+</span>
                                    <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block">{locale === 'en' ? 'IT Talents' : 'Talenta IT'}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-2xl md:text-3xl font-black text-brand-blue block">100%</span>
                                    <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block">{locale === 'en' ? 'Client IP Rights' : 'IP Rights Klien'}</span>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>

                {/* Reusable Quality Banner Section (Tiru circular concept Binar) */}
                <div className="p-8 md:p-12 border border-glass-border rounded-3xl bg-glass-bg/40 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block">{locale === 'en' ? 'Quality Control Framework' : 'Quality Control Framework'}</span>
                        <h2 className="text-2xl md:text-3xl font-black text-text-main">
                            {locale === 'en' ? 'Not Just Providing Workers, We Manage Quality & Deliverables' : 'Tidak Hanya Menyediakan Pekerja, Kami Mengelola Kualitas & Hasil Kerja'}
                        </h2>
                        <p className="text-xs text-text-gray font-medium">
                            {locale === 'en' ? 'Every line of code is ensured to be secure, documented, and runs smoothly on production servers.' : 'Setiap baris kode dipastikan aman, terdokumentasi, dan berjalan lancar di server produksi.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                        <div className="space-y-2 p-4 rounded-2xl bg-glass-bg border border-glass-border/40">
                            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-2 shrink-0">
                                <Cpu className="w-4.5 h-4.5" />
                            </div>
                            <h4 className="text-sm font-extrabold text-text-main">{locale === 'en' ? 'Dedicated Project Manager' : 'Dedicated Project Manager'}</h4>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                {locale === 'en' ? 'Eliminates daily coordination burdens. All task distributions, timelines, and reporting statuses are fully managed by our Project Manager.' : 'Menghilangkan beban koordinasi harian kawan. Seluruh pembagian tugas, timeline, dan status pelaporan dikelola penuh oleh Project Manager kami.'}
                            </p>
                        </div>
                        <div className="space-y-2 p-4 rounded-2xl bg-glass-bg border border-glass-border/40">
                            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-2 shrink-0">
                                <GitBranch className="w-4.5 h-4.5" />
                            </div>
                            <h4 className="text-sm font-extrabold text-text-main">{locale === 'en' ? 'Code Review & Quality Assurance' : 'Code Review & Quality Assurance'}</h4>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                {locale === 'en' ? 'Every code merge request must be validated by Diggity\'s internal Tech Lead and validated by QA Engineers through an automation testing system.' : 'Setiap penggabungan kode (merge request) wajib divalidasi oleh Tech Lead internal Diggity dan divalidasi oleh QA Engineer melalui sistem automation testing.'}
                            </p>
                        </div>
                        <div className="space-y-2 p-4 rounded-2xl bg-glass-bg border border-glass-border/40">
                            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-2 shrink-0">
                                <Activity className="w-4.5 h-4.5" />
                            </div>
                            <h4 className="text-sm font-extrabold text-text-main">{locale === 'en' ? 'Continuous Integration / Delivery' : 'Continuous Integration / Delivery'}</h4>
                            <p className="text-xs text-text-gray leading-relaxed font-medium">
                                {locale === 'en' ? 'Weekly progress demos, transparent Git repository management, monthly team attendance, and quick talent replacement within 7 days at no extra cost.' : 'Demo progress mingguan, pengelolaan repositori Git yang transparan, absensi tim bulanan, serta pergantian talenta cepat dalam 7 hari tanpa biaya ekstra.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Selection & Deployment Process (Interactive Tabs) */}
                <div className="space-y-10">
                    <div className="max-w-3xl space-y-2">
                        <h2 className="text-2xl md:text-3xl font-black text-text-main">
                            {locale === 'en' ? 'Collaboration & Deployment Stages' : 'Tahapan Kerja Sama & Pendeploisan'}
                        </h2>
                        <p className="text-sm text-text-gray font-medium">
                            {locale === 'en' ? 'How we prepare and accompany your development team from the start to production release.' : 'Bagaimana kami mempersiapkan dan mendampingi tim pengembang Anda dari awal hingga rilis produksi.'}
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
                                        {locale === 'en' ? 'Discuss Your Project Plan' : 'Diskusikan Rencana Proyek Anda'}
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
                                {locale === 'en' ? 'Frequently Asked Questions (FAQ)' : 'Pertanyaan Umum (FAQ)'}
                            </h2>
                            <p className="text-sm text-text-gray font-medium">
                                {locale === 'en' ? 'Detailed info about financing, attendance systems, and developer replacements.' : 'Informasi detail seputar pembiayaan, sistem absensi, dan penggantian developer.'}
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
                                {locale === 'en' ? 'Contact a Consultant' : 'Hubungi Konsultan'}
                            </h2>
                            <p className="text-sm text-text-gray font-medium">
                                {locale === 'en' ? 'Start Dedicated Team building consultation.' : 'Mulai konsultasi pembangunan Dedicated Team.'}
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
