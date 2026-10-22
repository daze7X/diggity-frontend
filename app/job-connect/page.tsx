'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import ScrollReveal from '../../components/ScrollReveal';
import SpotlightCard from '../../components/SpotlightCard';
import { api, Career } from '../../lib/api';
import { executeRecaptcha } from '../../lib/recaptcha';
import { 
    Briefcase, MapPin, Clock, ArrowRight, UserPlus, Users, 
    UserCheck, Search, Filter, Calendar, GraduationCap, DollarSign,
    Sparkles, CheckCircle2, Award, BookOpen, Send, AlertCircle,
    Flame, ShieldCheck, ChevronRight
} from 'lucide-react';

export const DEFAULT_CAREERS: Career[] = [
    {
        id: 1,
        title: 'Full-Stack Web Developer (Next.js & Laravel)',
        slug: 'full-stack-web-developer',
        department: 'Technology',
        type: 'Full-time',
        location: 'Yogyakarta (Hybrid)',
        level: 'Junior–Middle',
        salary_min: 5000000,
        salary_max: 8500000,
        education: 'D3/S1 Teknik Informatika / Terkait',
        closing_date: '15 November 2026',
        status: 'open',
        description: 'Sebagai Full-Stack Developer di Diggity, kamu akan terlibat aktif dalam rekayasa aplikasi web modern skala menengah hingga enterprise. Kamu berkolaborasi langsung dengan Lead Architect untuk merancang arsitektur API yang reliabel, clean code, dan antarmuka interaktif yang cepat.',
        responsibilities: [
            'Mengembangkan fitur baru menggunakan Next.js App Router (TypeScript) dan Laravel 11 REST API.',
            'Mengoptimalkan database query pada PostgreSQL / MySQL dan Redis caching.',
            'Mengimplementasikan integrasi payment gateway, webhook, dan third-party services.',
            'Melakukan unit testing, code review berkala, dan dokumentasi API endpoint.'
        ],
        requirements: [
            'Pengalaman minimal 1-2 tahun dengan ekosistem React/Next.js dan PHP/Laravel.',
            'Pemahaman mendalam tentang state management, RESTful API, dan database relational.',
            'Familiar dengan Git workflow, pull request review, dan best practice clean code.',
            'Mampu berkomunikasi efektif dan bekerja kolaboratif dalam tim agile.'
        ],
        nice_to_have: [
            'Pengalaman dengan Docker container dan automated CI/CD pipeline.',
            'Pemahaman dasar arsitektur Headless CMS atau Microservices.'
        ],
        benefits: [
            'Gaji kompetitif dan evaluasi performa berkala.',
            'Skema kerja fleksibel (Hybrid Yogyakarta).',
            'Tunjangan perangkat kerja dan akses seluruh kelas Diggity Academy.',
            'BPJS Kesehatan & Ketenagakerjaan.'
        ],
        required_skills: ['Next.js', 'React', 'Laravel', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
        is_active: true,
        created_at: '2026-10-10'
    },
    {
        id: 2,
        title: 'UI/UX & Digital Product Designer',
        slug: 'ui-ux-product-designer',
        department: 'Creative & Brand',
        type: 'Full-time',
        location: 'Yogyakarta (Hybrid)',
        level: 'Junior–Middle',
        salary_min: 4500000,
        salary_max: 7500000,
        education: 'D3/S1 Desain Komunikasi Visual / Sistem Informasi',
        closing_date: '30 Oktober 2026',
        status: 'closing_soon',
        description: 'Kami mencari UI/UX & Product Designer yang berorientasi pada pengalaman pengguna dan detail visual tinggi untuk mengembangkan antarmuka SaaS Diggity dan produk klien.',
        responsibilities: [
            'Merancang user journey, wireframe, high-fidelity mockups, dan interactive prototype di Figma.',
            'Membangun serta memelihara Design System terstandarisasi untuk multi-platform.',
            'Melakukan usability testing dan wawancara pengguna untuk memvalidasi fitur baru.',
            'Bekerja erat dengan frontend engineer guna memastikan konsistensi implementasi desain.'
        ],
        requirements: [
            'Portofolio desain UI/UX yang mendemonstrasikan proses problem-solving yang kuat.',
            'Keahlian tinggi dalam menggunakan Figma, auto-layout, component variants, dan tokens.',
            'Pemahaman mengenai prinsip aksesibilitas (WCAG), visual hierarchy, dan micro-interactions.'
        ],
        nice_to_have: [
            'Pemahaman dasar HTML, CSS, dan Tailwind utility classes.',
            'Pengalaman merancang antarmuka dashboard admin enterprise atau SaaS B2B.'
        ],
        benefits: [
            'Fasilitas monitor eksternal dan lisensi Figma Professional.',
            'Mentoring intensif bersama Product Lead.',
            'Work-life balance sehat dan suasana kerja suportif.'
        ],
        required_skills: ['Figma', 'Design System', 'User Research', 'Prototyping', 'Usability Testing'],
        is_active: true,
        created_at: '2026-10-05'
    },
    {
        id: 3,
        title: 'AI Automation & LLM Engineer',
        slug: 'ai-automation-engineer',
        department: 'AI & Data',
        type: 'Contract',
        location: 'Remote (Online)',
        level: 'Middle',
        salary_min: 7000000,
        salary_max: 12000000,
        education: 'S1 Ilmu Komputer / Teknik / Matematika Terapan',
        closing_date: '20 November 2026',
        status: 'open',
        description: 'Mengembangkan agen otomasi cerdas, pipeline RAG (Retrieval-Augmented Generation), dan integrasi API AI untuk produk enterprise Diggity.',
        responsibilities: [
            'Merancang dan mendeploy pipeline RAG menggunakan vector database (Pinecone/pgvector).',
            'Mengembangkan prompt engineering, evaluasi output LLM, dan function calling automation.',
            'Membangun API mikro berbasis Python (FastAPI) yang terintegrasi dengan backend utama.',
            'Memantau token usage, latency, dan reliability performa agen AI di produksi.'
        ],
        requirements: [
            'Pengalaman praktis menggunakan OpenAI / Anthropic / Gemini API dan framework LangChain / LlamaIndex.',
            'Keahlian solid dalam Python, asynchronous programming, dan REST API architecture.',
            'Pemahaman mengenai embedding vectors, chunking strategy, dan semantic search.'
        ],
        benefits: [
            '100% Remote kerja dari mana saja di Indonesia.',
            'Kompensasi berbasis milestone kontrak yang kompetitif.',
            'Akses ke komputasi cloud GPU dan kuota API model mutakhir.'
        ],
        required_skills: ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'Vector DB', 'RAG'],
        is_active: true,
        created_at: '2026-10-12'
    },
    {
        id: 4,
        title: 'Performance Marketing & Growth Specialist',
        slug: 'performance-marketing-specialist',
        department: 'Growth Marketing',
        type: 'Full-time',
        location: 'Jakarta (On-site)',
        level: 'Middle',
        salary_min: 6000000,
        salary_max: 9500000,
        education: 'D3/S1 Pemasaran / Komunikasi / Manajemen',
        closing_date: '10 November 2026',
        status: 'open',
        description: 'Memimpin perencanaan, eksekusi, dan optimasi kampanye periklanan digital (Meta Ads, Google Ads, TikTok Ads) untuk mendorong akuisisi klien dan penjualan produk Diggity.',
        responsibilities: [
            'Merencanakan alokasi budget iklan bulanan dengan target ROAS dan CAC yang terukur.',
            'Menyiapkan copywriting iklan yang persuasif dan berkoordinasi dengan tim kreatif.',
            'Menganalisis funnel konversi menggunakan Google Analytics 4 dan Server-side Tracking.',
            'Menyusun laporan performa mingguan yang komprehensif bagi jajaran direksi.'
        ],
        requirements: [
            'Pengalaman minimal 2 tahun mengelola ad spend digital dengan rekam jejak terbukti.',
            'Keahlian mendalam dalam Meta Ads Manager, Google Search/Performance Max, dan GA4.',
            'Kemampuan berpikir analitis berbasis angka dan pemahaman sales funnel B2B/B2C.'
        ],
        benefits: [
            'Bonus insentif performa kampanye (achievement bonus).',
            'Tunjangan transportasi dan operasional kantor Jakarta.',
            'Jenjang karier jelas menuju Growth Lead.'
        ],
        required_skills: ['Meta Ads', 'Google Ads', 'GA4', 'Conversion Tracking', 'Copywriting'],
        is_active: true,
        created_at: '2026-10-08'
    },
    {
        id: 5,
        title: 'Frontend React & Tailwind Intern',
        slug: 'frontend-react-intern',
        department: 'Technology',
        type: 'Internship',
        location: 'Remote (Online)',
        level: 'Junior',
        salary_min: 1500000,
        salary_max: 2500000,
        education: 'Mahasiswa Aktif Semester 5-8 / Fresh Graduate',
        closing_date: '25 Oktober 2026',
        status: 'closing_soon',
        description: 'Program magang intensif 3-6 bulan untuk mengasah kemampuan frontend engineering dalam proyek riil bersama para mentor senior Diggity.',
        responsibilities: [
            'Mengonversi desain Figma menjadi komponen React yang rapi dan responsif.',
            'Membantu integrasi REST API dan handling data fetching.',
            'Mempelajari standar git workflow, code linting, dan performa web modern.'
        ],
        requirements: [
            'Memahami dasar HTML, CSS, JavaScript, dan konsep React component.',
            'Familiar dengan styling menggunakan Tailwind CSS.',
            'Memiliki kemauan belajar tinggi, proaktif bertanya, dan bertanggung jawab terhadap deadline tugas.'
        ],
        benefits: [
            'Uang saku bulanan dan sertifikat magang resmi industri.',
            'Mentoring 1-on-1 langsung bersama Tech Lead.',
            'Peluang besar direkrut sebagai Full-time Junior Developer setelah lulus.'
        ],
        required_skills: ['React', 'JavaScript', 'Tailwind CSS', 'Git', 'Responsive Design'],
        is_active: true,
        created_at: '2026-10-15'
    },
    {
        id: 6,
        title: 'DevOps & Cloud Infrastructure Engineer',
        slug: 'devops-cloud-engineer',
        department: 'Cloud & Cyber Security',
        type: 'Full-time',
        location: 'Remote (Online)',
        level: 'Senior',
        salary_min: 10000000,
        salary_max: 16000000,
        education: 'S1 Teknik Informatika / Sistem Komputer',
        closing_date: '05 Oktober 2026',
        status: 'closed',
        description: 'Bertanggung jawab atas orkestrasi infrastruktur server cloud, otomatisasi CI/CD pipeline, keamanan jaringan, dan ketersediaan sistem 99.9% uptime.',
        responsibilities: [
            'Mengelola klaster Kubernetes, Docker container, dan load balancer di AWS/GCP.',
            'Membangun pipeline CI/CD menggunakan GitHub Actions untuk auto-deploy multi-environment.',
            'Menjaga kepatuhan standar keamanan data ISO 27001 dan audit penetrasi berkala.'
        ],
        requirements: [
            'Pengalaman 3+ tahun dalam bidang DevOps, Cloud Engineering, atau Linux System Administration.',
            'Sertifikasi cloud (AWS Certified Solutions Architect atau CKA Kubernetes) menjadi nilai plus kuat.'
        ],
        benefits: [
            'Kompensasi level senior dengan tunjangan komprehensif.',
            '100% Remote dengan jam kerja fleksibel.',
            'Budget tahunan untuk sertifikasi dan kursus internasional.'
        ],
        required_skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Linux', 'Terraform'],
        is_active: false,
        created_at: '2026-09-15'
    }
];

const DEPARTMENTS = ['All', 'Technology', 'AI & Data', 'Creative & Brand', 'Growth Marketing', 'Cloud & Cyber Security'];
const TYPES = ['All', 'Full-time', 'Internship', 'Contract'];
const MECHANISMS = ['All', 'Remote', 'Hybrid', 'On-site'];
const LEVELS = ['All', 'Junior', 'Middle', 'Senior'];
const STATUSES = ['All', 'open', 'closing_soon', 'closed'];

export default function JobConnectPage() {
    const { language: locale } = useLanguage();
    const searchParams = useSearchParams();
    const tabFromUrl = searchParams.get('tab');

    const [activeTab, setActiveTab] = useState<'careers' | 'mentor' | 'b2b'>('careers');

    useEffect(() => {
        if (tabFromUrl === 'mentor') setActiveTab('mentor');
        else if (tabFromUrl === 'b2b') setActiveTab('b2b');
        else if (tabFromUrl === 'careers') setActiveTab('careers');
    }, [tabFromUrl]);

    // Vacancy Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedMechanism, setSelectedMechanism] = useState('All');
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    // Mentor / Contributor Form State (4.3)
    const [mentorForm, setMentorForm] = useState({
        name: '',
        email: '',
        phone: '',
        roleType: 'Bootcamp Mentor',
        expertise: '',
        portfolioUrl: '',
        bio: ''
    });
    const [mentorStatus, setMentorStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [mentorMessage, setMentorMessage] = useState('');

    const filteredCareers = useMemo(() => {
        return DEFAULT_CAREERS.filter((job) => {
            const matchesSearch = searchQuery.trim() === '' || 
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (job.required_skills && job.required_skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));

            const matchesDept = selectedDept === 'All' || job.department === selectedDept;
            const matchesType = selectedType === 'All' || job.type === selectedType;
            
            const matchesMechanism = selectedMechanism === 'All' || 
                (selectedMechanism === 'Remote' && job.location.includes('Remote')) ||
                (selectedMechanism === 'Hybrid' && job.location.includes('Hybrid')) ||
                (selectedMechanism === 'On-site' && job.location.includes('On-site'));

            const matchesLevel = selectedLevel === 'All' || 
                (job.level && job.level.includes(selectedLevel));

            const matchesStatus = selectedStatus === 'All' || job.status === selectedStatus;

            return matchesSearch && matchesDept && matchesType && matchesMechanism && matchesLevel && matchesStatus;
        });
    }, [searchQuery, selectedDept, selectedType, selectedMechanism, selectedLevel, selectedStatus]);

    const handleMentorSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMentorStatus('loading');
        try {
            const token = await executeRecaptcha('mentor_registration');
            const messagePayload = `[PENDAFTARAN MENTOR & CONTRIBUTOR DIGGITY]
Nama: ${mentorForm.name}
Email: ${mentorForm.email}
WhatsApp: ${mentorForm.phone}
Pilihan Peran: ${mentorForm.roleType}
Bidang Keahlian: ${mentorForm.expertise}
LinkedIn / Portofolio: ${mentorForm.portfolioUrl}
Ringkasan Pengalaman: ${mentorForm.bio}`;

            await api.submitLead({
                name: mentorForm.name,
                email: mentorForm.email,
                phone: mentorForm.phone,
                company: 'Individu / Calon Mentor',
                service: `Mentor Registration - ${mentorForm.roleType}`,
                message: messagePayload,
                recaptcha_token: token
            });

            setMentorStatus('success');
            setMentorMessage(
                locale === 'en'
                    ? 'Your mentor application has been received! Our talent team will review your profile and reach out via WhatsApp/Email.'
                    : 'Pengajuan mentor/kontributor Anda berhasil dikirim! Tim People & Culture Diggity akan meninjau profil Anda dan menghubungi via WhatsApp/Email.'
            );
            setMentorForm({
                name: '',
                email: '',
                phone: '',
                roleType: 'Bootcamp Mentor',
                expertise: '',
                portfolioUrl: '',
                bio: ''
            });
        } catch (err: any) {
            setMentorStatus('error');
            setMentorMessage(err.message || 'Gagal mengirim pendaftaran mentor. Silakan coba kembali.');
        }
    };

    return (
        <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20 bg-bg-canvas">
            {/* 1. HERO HEADER */}
            <div className="bg-brand-blue dark:bg-brand-bg relative pt-32 pb-44 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md border border-white/20">
                        <Briefcase className="w-3.5 h-3.5" />
                        {locale === 'en' ? 'DIGGITY CAREER & TALENT ECOSYSTEM' : 'EKOSISTEM KARIER & TALENTA DIGITAL'}
                    </span>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-sm">
                        {locale === 'en' ? (
                            <>Build Your Career. <span className="text-white/80">Shape the Future.</span></>
                        ) : (
                            <>Bangun Karier. <span className="text-white/80">Ciptakan Dampak Nyata.</span></>
                        )}
                    </h1>
                    
                    <p className="text-base md:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
                        {locale === 'en' 
                            ? 'Explore active job vacancies, apply to become an official mentor/contributor, or source dedicated tech teams.' 
                            : 'Jelajahi lowongan kerja aktif, daftarkan diri menjadi mentor & kontributor resmi, atau temukan talenta teknologi terbaik untuk perusahaan Anda.'}
                    </p>
                </div>
            </div>

            {/* 2. MAIN CONTENT (Overlapping) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 -mt-20">
                <div className="bg-white/95 dark:bg-brand-bg/95 backdrop-blur-3xl rounded-3xl border border-glass-border p-6 md:p-10 shadow-2xl space-y-10">
                    
                    {/* 3-Way Segmented Tab Control */}
                    <div className="flex justify-center">
                        <div className="p-1.5 bg-slate-100 dark:bg-glass-bg border border-glass-border rounded-2xl inline-flex flex-wrap items-center justify-center gap-1">
                            <button
                                onClick={() => setActiveTab('careers')}
                                className={`px-5 py-2.5 text-xs md:text-sm font-extrabold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                                    activeTab === 'careers'
                                        ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                                        : 'text-text-gray hover:text-text-main'
                                }`}
                            >
                                <Briefcase className="w-4 h-4" />
                                {locale === 'en' ? 'Open Positions (ATS)' : '1. Lowongan Karier'}
                            </button>
                            <button
                                onClick={() => setActiveTab('mentor')}
                                className={`px-5 py-2.5 text-xs md:text-sm font-extrabold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                                    activeTab === 'mentor'
                                        ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                                        : 'text-text-gray hover:text-text-main'
                                }`}
                            >
                                <GraduationCap className="w-4 h-4" />
                                {locale === 'en' ? 'Become a Mentor / Contributor' : '2. Jadi Mentor / Contributor'}
                            </button>
                            <button
                                onClick={() => setActiveTab('b2b')}
                                className={`px-5 py-2.5 text-xs md:text-sm font-extrabold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                                    activeTab === 'b2b'
                                        ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                                        : 'text-text-gray hover:text-text-main'
                                }`}
                            >
                                <Users className="w-4 h-4" />
                                {locale === 'en' ? 'B2B Hire Team & Sourcing' : '3. Sewa Tim & Rekrutmen B2B'}
                            </button>
                        </div>
                    </div>

                    {/* ========================================================
                        TAB 1: LOWONGAN KARIER & MINI-ATS (BAGIAN 4.1 & 4.2)
                        ======================================================== */}
                    {activeTab === 'careers' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            
                            {/* Search & Multi-Filter Control Bar */}
                            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-black/20 border border-glass-border space-y-4">
                                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                    <div className="relative w-full md:w-96">
                                        <Search className="w-4 h-4 text-text-gray absolute left-4 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="text"
                                            placeholder={locale === 'en' ? "Search position or skill (e.g. Next.js, Figma)..." : "Cari posisi atau keahlian (contoh: Next.js, Figma)..."}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs font-medium text-text-main outline-none focus:border-brand-blue"
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-text-gray self-start md:self-center">
                                        {filteredCareers.length} {locale === 'en' ? 'positions available' : 'posisi ditemukan'}
                                    </span>
                                </div>

                                {/* Filter Controls Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 border-t border-glass-border">
                                    {/* Departemen */}
                                    <div>
                                        <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Departemen</label>
                                        <select
                                            value={selectedDept}
                                            onChange={(e) => setSelectedDept(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs font-bold text-text-main outline-none cursor-pointer"
                                        >
                                            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>

                                    {/* Jenis Pekerjaan */}
                                    <div>
                                        <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Jenis Pekerjaan</label>
                                        <select
                                            value={selectedType}
                                            onChange={(e) => setSelectedType(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs font-bold text-text-main outline-none cursor-pointer"
                                        >
                                            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>

                                    {/* Mekanisme Kerja */}
                                    <div>
                                        <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Mekanisme Kerja</label>
                                        <select
                                            value={selectedMechanism}
                                            onChange={(e) => setSelectedMechanism(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs font-bold text-text-main outline-none cursor-pointer"
                                        >
                                            {MECHANISMS.map(m => <option key={m} value={m}>{m}</option>)}
                                        </select>
                                    </div>

                                    {/* Level Posisi */}
                                    <div>
                                        <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Level Posisi</label>
                                        <select
                                            value={selectedLevel}
                                            onChange={(e) => setSelectedLevel(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs font-bold text-text-main outline-none cursor-pointer"
                                        >
                                            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                    </div>

                                    {/* Status Lowongan */}
                                    <div>
                                        <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Status Lowongan</label>
                                        <select
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs font-bold text-text-main outline-none cursor-pointer"
                                        >
                                            <option value="All">Semua Status</option>
                                            <option value="open">Dibuka (Open)</option>
                                            <option value="closing_soon">Segera Ditutup</option>
                                            <option value="closed">Ditutup (Closed)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Job Cards Listing (Bagian 4.1 Requirement) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredCareers.map((job) => {
                                    // Status styling derived from data
                                    const statusConfig = {
                                        open: {
                                            label: locale === 'en' ? 'Open' : 'Dibuka',
                                            badge: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
                                            dot: 'bg-emerald-500'
                                        },
                                        closing_soon: {
                                            label: locale === 'en' ? 'Closing Soon' : 'Segera Ditutup',
                                            badge: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
                                            dot: 'bg-amber-500'
                                        },
                                        closed: {
                                            label: locale === 'en' ? 'Closed' : 'Ditutup',
                                            badge: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
                                            dot: 'bg-slate-400'
                                        }
                                    }[job.status || 'open'];

                                    return (
                                        <SpotlightCard
                                            key={job.id}
                                            className="p-6 md:p-8 flex flex-col justify-between border border-glass-border hover:border-brand-blue/40 rounded-3xl transition-all shadow-sm hover:shadow-xl group"
                                        >
                                            <div className="space-y-4">
                                                {/* Header & Status Badge */}
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="space-y-1">
                                                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-wider">
                                                            {job.department}
                                                        </span>
                                                        <h3 className="text-xl font-black text-text-main group-hover:text-brand-blue transition-colors leading-snug">
                                                            {job.title}
                                                        </h3>
                                                        <p className="text-xs font-semibold text-text-gray">CV Sinergi Cita Digital — Diggity</p>
                                                    </div>

                                                    {/* Real Status Badge */}
                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-black shrink-0 ${statusConfig.badge}`}>
                                                        <span className={`w-2 h-2 rounded-full ${statusConfig.dot} animate-pulse`} />
                                                        <span>{statusConfig.label}</span>
                                                    </div>
                                                </div>

                                                {/* Metadata Tags Grid (4.1 Information) */}
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    <div className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-black/30 text-xs font-bold text-text-main flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 text-brand-blue" />
                                                        <span>{job.type}</span>
                                                    </div>
                                                    <div className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-black/30 text-xs font-bold text-text-main flex items-center gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                                                        <span>{job.location}</span>
                                                    </div>
                                                    <div className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-black/30 text-xs font-bold text-text-main flex items-center gap-1.5">
                                                        <Briefcase className="w-3.5 h-3.5 text-brand-blue" />
                                                        <span>Level: {job.level}</span>
                                                    </div>
                                                </div>

                                                <p className="text-xs text-text-gray font-medium line-clamp-2 leading-relaxed">
                                                    {job.description}
                                                </p>
                                            </div>

                                            {/* Footer: Deadline & Action Link */}
                                            <div className="pt-6 mt-6 border-t border-glass-border flex items-center justify-between">
                                                <div className="text-[11px] font-semibold text-text-gray flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                                                    <span>Batas: {job.closing_date}</span>
                                                </div>

                                                <Link 
                                                    href={`/job-connect/${job.slug}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-black text-brand-blue group-hover:text-brand-blue-hover group-hover:translate-x-1 transition-all"
                                                >
                                                    {locale === 'en' ? 'View & Apply' : 'Detail & Lamar'} <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </SpotlightCard>
                                    );
                                })}

                                {filteredCareers.length === 0 && (
                                    <div className="col-span-1 md:col-span-2 text-center py-16 bg-slate-50 dark:bg-black/20 rounded-3xl border border-glass-border">
                                        <p className="text-sm font-bold text-text-gray mb-3">Tidak ada lowongan yang sesuai kriteria pencarian Anda.</p>
                                        <button
                                            onClick={() => {
                                                setSearchQuery('');
                                                setSelectedDept('All');
                                                setSelectedType('All');
                                                setSelectedMechanism('All');
                                                setSelectedLevel('All');
                                                setSelectedStatus('All');
                                            }}
                                            className="px-5 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold cursor-pointer"
                                        >
                                            Reset Semua Filter
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Dashboard Application Notice (Bagian 4.4) */}
                            <div className="p-6 md:p-8 rounded-3xl bg-brand-blue/5 border border-brand-blue/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="space-y-1 text-center sm:text-left">
                                    <h4 className="text-base font-black text-text-main">Sudah Mengirim Lamaran?</h4>
                                    <p className="text-xs text-text-gray font-medium">
                                        Masuk ke Dashboard Akun Diggity Anda untuk memantau status lamaran kerja, jadwal interview, dan riwayat seleksi.
                                    </p>
                                </div>
                                <Link
                                    href="/dashboard/applications"
                                    className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold transition-all shrink-0 shadow-md"
                                >
                                    Cek Status di Dashboard
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        TAB 2: BERGABUNG SEBAGAI MENTOR & CONTRIBUTOR (BAGIAN 4.3)
                        ======================================================== */}
                    {activeTab === 'mentor' && (
                        <div className="space-y-12 animate-in fade-in duration-300">
                            
                            {/* Intro Section */}
                            <div className="text-left space-y-3 max-w-3xl">
                                <span className="text-xs font-black uppercase tracking-widest text-brand-blue block">JALUR KONTRIBUTOR RESMI</span>
                                <h2 className="text-2xl md:text-4xl font-black text-text-main">
                                    Bergabung sebagai Mentor / Contributor Diggity
                                </h2>
                                <p className="text-sm text-text-gray font-medium leading-relaxed">
                                    Jalur kontribusi khusus bagi para praktisi, software engineer, desainer, tech writer, dan inovator teknologi yang ingin berbagi keahlian, membimbing talenta muda, dan mendapatkan apresiasi profesional.
                                </p>
                            </div>

                            {/* 4 Roles of Contribution */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    {
                                        icon: GraduationCap,
                                        title: 'Bootcamp Instructor & Mentor',
                                        desc: 'Membimbing peserta bootcamp intensif, memandu sesi live coding, dan memberikan code review 1-on-1.'
                                    },
                                    {
                                        icon: Award,
                                        title: 'Seminar Guest Speaker',
                                        desc: 'Menjadi pembicara ahli dalam seminar teknologi bulanan Diggity membahas tren rekayasa software terdepan.'
                                    },
                                    {
                                        icon: BookOpen,
                                        title: 'Tech Writer & Contributor',
                                        desc: 'Menulis artikel analitis, arsitektur framework, dan playbooks teknis di kanal ekosistem wawasan Diggity.'
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: 'Code & Portfolio Reviewer',
                                        desc: 'Mengevaluasi repositori GitHub dan portofolio desain anggota komunitas agar siap menembus rekrutmen kerja.'
                                    }
                                ].map((role, idx) => {
                                    const Icon = role.icon;
                                    return (
                                        <SpotlightCard key={idx} className="p-6 border border-glass-border bg-slate-50 dark:bg-black/20 rounded-2xl flex flex-col justify-between">
                                            <div className="space-y-3">
                                                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <h3 className="text-sm font-extrabold text-text-main">{role.title}</h3>
                                                <p className="text-xs text-text-gray font-medium leading-relaxed">{role.desc}</p>
                                            </div>
                                        </SpotlightCard>
                                    );
                                })}
                            </div>

                            {/* Perks & Form Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6 border-t border-glass-border">
                                <div className="lg:col-span-5 space-y-6">
                                    <h3 className="text-xl font-black text-text-main">Keuntungan Menjadi Contributor</h3>
                                    <div className="space-y-3">
                                        {[
                                            'Honorarium kompetitif per jam mengajar / per sesi seminar',
                                            'Lencana profil terverifikasi sebagai Official Diggity Mentor',
                                            'Akses gratis ke seluruh materi & source code Diggity Academy',
                                            'Jejaring luas dengan ekosistem klien & startup partner Diggity',
                                            'Jadwal kontribusi fleksibel (Weekend atau Malam Hari)'
                                        ].map((benefit, bIdx) => (
                                            <div key={bIdx} className="flex items-start gap-2.5 text-xs text-text-main font-medium">
                                                <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                                                <span>{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:col-span-7">
                                    <SpotlightCard className="p-8 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl shadow-sm">
                                        <h3 className="text-lg font-black text-text-main mb-6">Formulir Pendaftaran Mentor / Contributor</h3>

                                        {mentorStatus === 'success' ? (
                                            <div className="text-center py-8 space-y-4">
                                                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                                                    <CheckCircle2 className="w-8 h-8" />
                                                </div>
                                                <h4 className="text-base font-bold text-text-main">Pengajuan Diterima!</h4>
                                                <p className="text-xs text-text-gray max-w-sm mx-auto">{mentorMessage}</p>
                                                <button
                                                    onClick={() => setMentorStatus('idle')}
                                                    className="px-5 py-2 rounded-xl bg-brand-blue text-white font-bold text-xs cursor-pointer"
                                                >
                                                    Kirim Pengajuan Lain
                                                </button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleMentorSubmit} className="space-y-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[11px] font-bold text-text-gray block">Nama Lengkap</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={mentorForm.name}
                                                            onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })}
                                                            placeholder="Nama Lengkap & Gelar (jika ada)"
                                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[11px] font-bold text-text-gray block">Email Aktif</label>
                                                        <input
                                                            type="email"
                                                            required
                                                            value={mentorForm.email}
                                                            onChange={(e) => setMentorForm({ ...mentorForm, email: e.target.value })}
                                                            placeholder="nama@domain.com"
                                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[11px] font-bold text-text-gray block">No. WhatsApp</label>
                                                        <input
                                                            type="tel"
                                                            required
                                                            value={mentorForm.phone}
                                                            onChange={(e) => setMentorForm({ ...mentorForm, phone: e.target.value })}
                                                            placeholder="08123456789"
                                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[11px] font-bold text-text-gray block">Pilihan Jalur Kontribusi</label>
                                                        <select
                                                            value={mentorForm.roleType}
                                                            onChange={(e) => setMentorForm({ ...mentorForm, roleType: e.target.value })}
                                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue cursor-pointer"
                                                        >
                                                            <option value="Bootcamp Mentor">Bootcamp Instructor &amp; Mentor</option>
                                                            <option value="Seminar Speaker">Seminar Guest Speaker</option>
                                                            <option value="Technical Writer">Tech Content Writer</option>
                                                            <option value="Portfolio Reviewer">Code &amp; Portfolio Reviewer</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[11px] font-bold text-text-gray block">Bidang Keahlian Utama</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={mentorForm.expertise}
                                                        onChange={(e) => setMentorForm({ ...mentorForm, expertise: e.target.value })}
                                                        placeholder="Contoh: React & Next.js, AI Engineering, UI/UX Design System, DevOps AWS"
                                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[11px] font-bold text-text-gray block">Tautan LinkedIn / GitHub / Portofolio</label>
                                                    <input
                                                        type="url"
                                                        required
                                                        value={mentorForm.portfolioUrl}
                                                        onChange={(e) => setMentorForm({ ...mentorForm, portfolioUrl: e.target.value })}
                                                        placeholder="https://linkedin.com/in/username atau https://github.com/username"
                                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[11px] font-bold text-text-gray block">Ringkasan Pengalaman Kerja &amp; Mengajar</label>
                                                    <textarea
                                                        required
                                                        rows={3}
                                                        value={mentorForm.bio}
                                                        onChange={(e) => setMentorForm({ ...mentorForm, bio: e.target.value })}
                                                        placeholder="Ceritakan latar belakang profesional Anda, proyek yang pernah dibangun, atau pengalaman mengajar sebelumnya..."
                                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue resize-none"
                                                    />
                                                </div>

                                                {mentorStatus === 'error' && (
                                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-500 text-xs font-semibold">
                                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                                        <span>{mentorMessage}</span>
                                                    </div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={mentorStatus === 'loading'}
                                                    className="w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                                                >
                                                    {mentorStatus === 'loading' ? 'Mengirim Pendaftaran...' : 'Kirim Pendaftaran Mentor'}
                                                    <Send className="w-3.5 h-3.5" />
                                                </button>
                                            </form>
                                        )}
                                    </SpotlightCard>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        TAB 3: B2B HIRE TEAM & OUTSOURCING
                        ======================================================== */}
                    {activeTab === 'b2b' && (
                        <div className="space-y-10 animate-in fade-in duration-300">
                            <div className="text-left space-y-3">
                                <h2 className="text-2xl md:text-3xl font-black text-text-main flex items-center gap-2">
                                    <Users className="w-7 h-7 text-brand-blue" />
                                    Solusi Talenta IT Terpadu untuk Perusahaan
                                </h2>
                                <p className="text-sm text-text-gray font-medium leading-relaxed max-w-3xl">
                                    Dapatkan talenta digital teruji sesuai kebutuhan proyek Anda. Bangun tim pengembang kontrak, rekrut spesialis tetap, atau manfaatkan talenta terverifikasi dari ekosistem Diggity.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <SpotlightCard className="p-8 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase rounded-lg inline-block">
                                            HEADHUNTING
                                        </span>
                                        <h3 className="text-xl font-black text-text-main">IT Headhunting &amp; Executive Search</h3>
                                        <p className="text-xs text-text-gray leading-relaxed font-medium">
                                            Rekrut Tech Lead, Senior Software Engineer, atau UI/UX Lead yang siap beradaptasi dengan budaya perusahaan Anda secara permanen.
                                        </p>
                                        <ul className="space-y-2 text-xs text-text-main font-medium pt-2">
                                            <li className="flex items-center gap-2">
                                                <UserCheck className="w-4 h-4 text-brand-blue" />
                                                <span>Penyaringan teknis menyeluruh oleh Tech Lead Diggity</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <UserCheck className="w-4 h-4 text-brand-blue" />
                                                <span>Garansi penggantian kandidat gratis hingga 90 hari</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pt-6">
                                        <Link
                                            href="/job-connect/headhunting"
                                            className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-blue-hover"
                                        >
                                            Pelajari Layanan Headhunting <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </SpotlightCard>

                                <SpotlightCard className="p-8 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase rounded-lg inline-block">
                                            DEDICATED SQUAD
                                        </span>
                                        <h3 className="text-xl font-black text-text-main">Dedicated Squad Outsourcing</h3>
                                        <p className="text-xs text-text-gray leading-relaxed font-medium">
                                            Akses satu tim pengembang lengkap (Frontend, Backend, QA, PM) untuk menyelesaikan proyek digital tanpa beban biaya rekrutmen permanen.
                                        </p>
                                        <ul className="space-y-2 text-xs text-text-main font-medium pt-2">
                                            <li className="flex items-center gap-2">
                                                <UserCheck className="w-4 h-4 text-brand-blue" />
                                                <span>Onboarding cepat dalam 5-7 hari kerja</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <UserCheck className="w-4 h-4 text-brand-blue" />
                                                <span>Manajemen sprint scrum &amp; QA reporting terstruktur</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pt-6">
                                        <Link
                                            href="/job-connect/outsourcing"
                                            className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-blue-hover"
                                        >
                                            Pelajari Layanan Outsourcing <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </SpotlightCard>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
