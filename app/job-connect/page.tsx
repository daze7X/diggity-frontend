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
    CAREERS_DATABASE, 
    HIRING_PROCESS, 
    CULTURE_VALUES, 
    WHY_DIGGITY_POINTS, 
    EVP_MATRIX, 
    CAREER_DEVELOPMENT_AREAS, 
    CAREER_GROWTH_TRACK 
} from '../../lib/careers-data';
import { 
    Briefcase, MapPin, Clock, ArrowRight, UserPlus, Users, 
    UserCheck, Search, Filter, Calendar, GraduationCap, DollarSign,
    Sparkles, CheckCircle2, Award, BookOpen, Send, AlertCircle,
    Flame, ShieldCheck, ChevronRight, Rocket, TrendingUp, Target, 
    Globe, Heart, Compass, Lightbulb, Zap, X, Check, Laptop, Layers
} from 'lucide-react';

export const DEFAULT_CAREERS: Career[] = CAREERS_DATABASE;

const DEPARTMENTS = [
    'All', 
    'Technology', 
    'AI & Emerging Technology', 
    'Creative & Brand', 
    'Growth Marketing', 
    'Cloud & Cyber Security'
];
const TYPES = ['All', 'Full-time', 'Internship', 'Project-based / Full-time'];
const MECHANISMS = ['All', 'Remote', 'Hybrid', 'On-site'];
const LEVELS = ['All', 'Junior', 'Middle', 'Senior', 'Junior–Middle'];
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

    // Talent Pool / Community Modal State
    const [talentModalOpen, setTalentModalOpen] = useState(false);
    const [talentModalType, setTalentModalType] = useState<'pool' | 'community'>('pool');
    const [talentForm, setTalentForm] = useState({
        name: '',
        email: '',
        phone: '',
        domain: 'Technology & Engineering',
        portfolioUrl: '',
        note: ''
    });
    const [talentStatus, setTalentStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [talentMessage, setTalentMessage] = useState('');

    // Mentor / Contributor Form State
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
        return CAREERS_DATABASE.filter((job) => {
            const matchesSearch = searchQuery.trim() === '' || 
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (job.department && job.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
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

    const handleTalentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTalentStatus('loading');
        try {
            const token = await executeRecaptcha('talent_pool_registration');
            const messagePayload = `[PENDAFTARAN ${talentModalType === 'pool' ? 'TALENT POOL' : 'TALENT COMMUNITY'} DIGGITY]
Nama: ${talentForm.name}
Email: ${talentForm.email}
WhatsApp: ${talentForm.phone}
Bidang Minat: ${talentForm.domain}
Portofolio / LinkedIn / GitHub: ${talentForm.portfolioUrl}
Catatan Tambahan: ${talentForm.note}`;

            await api.submitLead({
                name: talentForm.name,
                email: talentForm.email,
                phone: talentForm.phone,
                company: 'Talent Pool Candidate',
                service: `${talentModalType === 'pool' ? 'Talent Pool' : 'Talent Community'} - ${talentForm.domain}`,
                message: messagePayload,
                recaptcha_token: token
            });

            setTalentStatus('success');
            setTalentMessage(
                locale === 'en'
                    ? 'Thank you! Your profile has been added to the Diggity Talent Database. We will reach out when a relevant opportunity arises.'
                    : 'Terima kasih! Profil Anda telah tersimpan di Talent Database Diggity. Tim People & Culture akan menghubungi Anda saat ada peluang atau program yang relevan.'
            );
            setTalentForm({
                name: '',
                email: '',
                phone: '',
                domain: 'Technology & Engineering',
                portfolioUrl: '',
                note: ''
            });
        } catch (err: any) {
            setTalentStatus('error');
            setTalentMessage(err.message || 'Gagal mengirimkan profil. Silakan coba kembali beberapa saat lagi.');
        }
    };

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

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen relative pb-24 selection:bg-brand-blue/20 bg-bg-canvas text-left">
            {/* 1. HERO SECTION (01 Sesuai Brief) */}
            <div className="bg-brand-blue dark:bg-brand-bg relative pt-32 pb-44 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                
                <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
                        <Briefcase className="w-3.5 h-3.5 text-white/90" />
                        <span>Karier &amp; Ekosistem Talenta Diggity</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-sm">
                        Build Your Career. <br className="hidden sm:inline" />
                        <span className="text-white/80">Build the Future.</span>
                    </h1>
                    
                    <p className="text-base md:text-lg text-white/90 font-medium max-w-3xl mx-auto leading-relaxed mb-8">
                        {locale === 'en' 
                            ? 'Join Diggity and be part of the team building digital solutions for businesses, organizations, and society. At Diggity, you will work with people who love building, experimenting, learning, and creating meaningful impact.' 
                            : 'Bergabung bersama Diggity dan jadilah bagian dari tim yang membangun solusi digital untuk bisnis, organisasi, dan masyarakat. Di Diggity, kamu bukan sekadar mengisi posisi. Kamu akan bekerja bersama orang-orang yang senang membangun, bereksperimen, belajar, dan menciptakan sesuatu yang berdampak.'}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <button
                            onClick={() => {
                                setActiveTab('careers');
                                scrollToSection('open-positions');
                            }}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-brand-blue font-black text-sm hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl cursor-pointer flex items-center justify-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            {locale === 'en' ? 'Explore Open Positions' : 'Lihat Lowongan'}
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('careers');
                                scrollToSection('culture');
                            }}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all backdrop-blur-sm cursor-pointer flex items-center justify-center gap-2"
                        >
                            <Heart className="w-4 h-4 text-white/80" />
                            {locale === 'en' ? 'Our Culture' : 'Kenali Budaya Diggity'}
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. MAIN SEGMENTED CONTENT WRAPPER (Overlapping Container) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 -mt-20">
                <div className="bg-white/95 dark:bg-brand-bg/95 backdrop-blur-3xl rounded-3xl border border-glass-border p-6 md:p-10 shadow-2xl space-y-12">
                    
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
                        TAB 1: LOWONGAN KARIER & EMPLOYER BRANDING ECOSYSTEM
                        ======================================================== */}
                    {activeTab === 'careers' && (
                        <div className="space-y-16 animate-in fade-in duration-300">
                            
                            {/* 05. OPEN POSITIONS & ATS MULTI-FILTER */}
                            <section id="open-positions" className="space-y-8 scroll-mt-32">
                                <div className="text-center max-w-3xl mx-auto space-y-2">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-brand-blue block">
                                        OPPORTUNITIES
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-black text-text-main">
                                        Find Your Place at Diggity
                                    </h2>
                                    <p className="text-xs md:text-sm text-text-gray font-medium">
                                        Temukan posisi yang sesuai dengan keahlian, pengalaman, dan perjalanan kariermu.
                                    </p>
                                </div>

                                {/* Filter Controls Bar */}
                                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-black/20 border border-glass-border space-y-4">
                                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                        <div className="relative w-full md:w-96">
                                            <Search className="w-4 h-4 text-text-gray absolute left-4 top-1/2 -translate-y-1/2" />
                                            <input
                                                type="text"
                                                placeholder={locale === 'en' ? "Search position or skill (e.g. Laravel, React, Figma)..." : "Cari posisi atau keahlian (contoh: Laravel, React, Figma)..."}
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs font-medium text-text-main outline-none focus:border-brand-blue"
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-text-gray self-start md:self-center">
                                            {filteredCareers.length} {locale === 'en' ? 'positions available' : 'posisi ditemukan'}
                                        </span>
                                    </div>

                                    {/* Multi-Filter Dropdowns */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 border-t border-glass-border">
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

                                {/* Job Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredCareers.map((job) => {
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

                                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-black shrink-0 ${statusConfig.badge}`}>
                                                            <span className={`w-2 h-2 rounded-full ${statusConfig.dot} animate-pulse`} />
                                                            <span>{statusConfig.label}</span>
                                                        </div>
                                                    </div>

                                                    {/* Metadata Tags */}
                                                    <div className="flex flex-wrap gap-2 pt-1">
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
                                                            <span>{job.level}</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-xs text-text-gray font-medium line-clamp-2 leading-relaxed">
                                                        {job.description}
                                                    </p>

                                                    {/* Skills Tags */}
                                                    {job.required_skills && job.required_skills.length > 0 && (
                                                        <div className="flex flex-wrap gap-1.5 pt-2">
                                                            {job.required_skills.map((skill, sIdx) => (
                                                                <span key={sIdx} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-glass-bg border border-glass-border text-[10px] font-bold text-text-gray">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Footer: Deadline & Link */}
                                                <div className="pt-6 mt-6 border-t border-glass-border flex items-center justify-between">
                                                    <div className="text-[11px] font-semibold text-text-gray flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                                                        <span>Ditutup: {job.closing_date}</span>
                                                    </div>

                                                    <Link 
                                                        href={`/careers/${job.slug}`}
                                                        className="inline-flex items-center gap-1.5 text-xs font-black text-brand-blue group-hover:text-brand-blue-hover group-hover:translate-x-1 transition-all"
                                                    >
                                                        {locale === 'en' ? 'View & Apply' : 'Lihat Detail'} <ChevronRight className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </SpotlightCard>
                                        );
                                    })}

                                    {filteredCareers.length === 0 && (
                                        <div className="col-span-1 md:col-span-2 text-center py-16 bg-slate-50 dark:bg-black/20 rounded-3xl border border-glass-border space-y-3">
                                            <p className="text-sm font-bold text-text-gray">Tidak ada lowongan yang sesuai kriteria pencarian Anda saat ini.</p>
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

                                {/* 06. DON'T SEE YOUR ROLE? (TALENT POOL) */}
                                <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-brand-blue to-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                                    <div className="space-y-3 text-center md:text-left max-w-2xl">
                                        <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider inline-block">
                                            TALENT PIPELINE
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-black">
                                            Don&apos;t See Your Role?
                                        </h3>
                                        <p className="text-xs md:text-sm text-white/90 leading-relaxed font-medium">
                                            Kami selalu terbuka untuk bertemu dengan orang-orang yang memiliki passion untuk technology, creativity, business, dan innovation. Jika belum menemukan posisi yang sesuai, kamu tetap dapat mengirimkan profil dan portfolio kamu kepada kami.
                                        </p>
                                        <p className="text-[11px] text-white/70 italic">
                                            Simpan talent terbaik hari ini, bukan hanya ketika posisi sudah terbuka.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setTalentModalType('pool');
                                            setTalentModalOpen(true);
                                        }}
                                        className="px-6 py-3.5 rounded-xl bg-white text-brand-blue hover:bg-slate-50 font-black text-xs transition-all shadow-lg shrink-0 cursor-pointer flex items-center gap-2"
                                    >
                                        <UserPlus className="w-4 h-4" />
                                        <span>Join Our Talent Pool →</span>
                                    </button>
                                </div>

                                {/* Dashboard Application Notice */}
                                <div className="p-6 md:p-8 rounded-3xl bg-brand-blue/5 border border-brand-blue/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="space-y-1 text-center sm:text-left">
                                        <h4 className="text-base font-black text-text-main">Sudah Mengirim Lamaran?</h4>
                                        <p className="text-xs text-text-gray font-medium">
                                            Masuk ke Dashboard Akun Diggity Anda untuk memantau status lamaran kerja, jadwal wawancara, dan riwayat seleksi.
                                        </p>
                                    </div>
                                    <Link
                                        href="/dashboard/applications"
                                        className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold transition-all shrink-0 shadow-md"
                                    >
                                        Cek Status di Dashboard
                                    </Link>
                                </div>
                            </section>

                            {/* 02. INTRODUCTION (GROW WITH DIGGITY) */}
                            <section className="pt-10 border-t border-glass-border space-y-8">
                                <div className="text-center max-w-3xl mx-auto space-y-3">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-brand-blue block">
                                        GROW WITH DIGGITY
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-black text-text-main">
                                        Kami Percaya Perusahaan yang Hebat Dibangun oleh Orang-orang yang Terus Berkembang
                                    </h2>
                                    <p className="text-xs md:text-sm text-text-gray font-medium leading-relaxed">
                                        Diggity mempertemukan technology, creativity, business, AI, cloud, marketing, dan education dalam satu ekosistem terpadu. Karena itu, setiap orang di dalam tim memiliki kesempatan untuk belajar lintas bidang, mengambil tanggung jawab baru, dan mengembangkan kompetensinya.
                                    </p>
                                </div>

                                {/* 4-Step Framework Flow: Build -> Grow -> Scale -> Empower */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                                    {[
                                        { step: '01', title: 'Build', desc: 'Membangun keahlian teknis dan fondasi kerja yang kuat melalui proyek digital nyata.' },
                                        { step: '02', title: 'Grow', desc: 'Mengembangkan kapabilitas lintas disiplin dan memperluas horizon keahlian profesional.' },
                                        { step: '03', title: 'Scale', desc: 'Meningkatkan dampak karya, memimpin inisiatif, dan menyempurnakan solusi bernilai tinggi.' },
                                        { step: '04', title: 'Empower', desc: 'Memberdayakan tim lain, membagikan wawasan, dan mentransformasi ekosistem sekitar.' }
                                    ].map((f, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-black/20 border border-glass-border space-y-2 relative group hover:border-brand-blue/40 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-black text-brand-blue/30 group-hover:text-brand-blue transition-colors">
                                                    {f.step}
                                                </span>
                                                {i < 3 && <ChevronRight className="w-4 h-4 text-text-gray/40 hidden lg:block" />}
                                            </div>
                                            <h4 className="text-base font-black text-text-main">{f.title}</h4>
                                            <p className="text-xs text-text-gray font-medium leading-relaxed">{f.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-center text-xs font-bold text-text-gray italic">
                                    Itulah perjalanan yang ingin kami bangun bersama setiap anggota tim Diggity.
                                </p>
                            </section>

                            {/* 03. WHY DIGGITY? (6 VALUE CARDS) */}
                            <section className="pt-10 border-t border-glass-border space-y-8">
                                <div className="text-center max-w-3xl mx-auto space-y-2">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-brand-blue block">
                                        KENAPA BERGABUNG DENGAN DIGGITY?
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-black text-text-main">
                                        More Than Just a Workplace
                                    </h2>
                                    <p className="text-xs md:text-sm text-text-gray font-medium">
                                        Bukan sekadar tempat bekerja, melainkan ruang bereksperimen, belajar, dan menciptakan dampak berkelanjutan.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {WHY_DIGGITY_POINTS.map((item, idx) => {
                                        const iconMap = {
                                            Rocket,
                                            BookOpen,
                                            Users,
                                            TrendingUp,
                                            Target,
                                            Globe
                                        }[item.icon] || Sparkles;
                                        const IconComponent = iconMap;

                                        return (
                                            <SpotlightCard key={idx} className="p-6 md:p-8 rounded-3xl border border-glass-border bg-white dark:bg-glass-bg flex flex-col justify-between">
                                                <div className="space-y-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                                        <IconComponent className="w-6 h-6" />
                                                    </div>
                                                    <h3 className="text-lg font-black text-text-main">{item.title}</h3>
                                                    <p className="text-xs text-text-gray font-medium leading-relaxed">{item.desc}</p>
                                                </div>
                                            </SpotlightCard>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* 04. LIFE AT DIGGITY & CULTURE */}
                            <section id="culture" className="pt-10 border-t border-glass-border space-y-8 scroll-mt-32">
                                <div className="text-center max-w-3xl mx-auto space-y-2">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-brand-blue block">
                                        OUR CULTURE
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-black text-text-main">
                                        Work. Learn. Create. Grow.
                                    </h2>
                                    <p className="text-xs md:text-sm text-text-gray font-medium leading-relaxed">
                                        Di Diggity, kehidupan kerja bukan hanya tentang deadline dan meeting. Kami ingin menciptakan lingkungan di mana setiap orang dapat berkolaborasi dalam proyek nyata, bertukar knowledge, mengikuti program L&amp;D, mengeksplorasi teknologi baru, dan mengambil ownership terhadap hasil karyanya.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {CULTURE_VALUES.map((cv, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-black/20 border border-glass-border space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-brand-blue text-white flex items-center justify-center font-black text-xs">
                                                    {cv.number}
                                                </div>
                                                <h4 className="text-base font-black text-text-main">{cv.title}</h4>
                                            </div>
                                            <p className="text-xs text-text-gray font-medium leading-relaxed">{cv.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 07 & 08. CAREER DEVELOPMENT & NON-LINEAR PATH */}
                            <section className="pt-10 border-t border-glass-border space-y-10">
                                <div className="text-center max-w-3xl mx-auto space-y-2">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-brand-blue block">
                                        CAREER DEVELOPMENT &amp; PATH
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-black text-text-main">
                                        Your Growth Is Part of Our Growth
                                    </h2>
                                    <p className="text-xs md:text-sm text-text-gray font-medium">
                                        Kami ingin setiap anggota Diggity memiliki ruang untuk berkembang—baik sebagai specialist maupun future leader.
                                    </p>
                                </div>

                                {/* 5 Growth Areas */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                    {CAREER_DEVELOPMENT_AREAS.map((area, aIdx) => (
                                        <div key={aIdx} className="p-5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border space-y-2 flex flex-col justify-between">
                                            <div className="space-y-1.5">
                                                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs">
                                                    0{aIdx + 1}
                                                </div>
                                                <h4 className="text-sm font-extrabold text-text-main">{area.title}</h4>
                                                <p className="text-xs text-text-gray font-medium leading-relaxed">{area.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Career Growth Track Visual & Non-Linear Note */}
                                <div className="p-6 md:p-8 rounded-3xl bg-slate-50 dark:bg-black/20 border border-glass-border space-y-6">
                                    <h3 className="text-base font-black text-text-main">Jenjang Pertumbuhan Karier di Diggity</h3>
                                    
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                                        {CAREER_GROWTH_TRACK.map((track, tIdx) => (
                                            <div key={tIdx} className="p-4 rounded-xl bg-white dark:bg-glass-bg border border-glass-border space-y-1 text-center">
                                                <span className="text-[10px] font-black text-brand-blue uppercase">Tahap {tIdx + 1}</span>
                                                <h5 className="text-xs font-bold text-text-main">{track.level}</h5>
                                                <p className="text-[10px] text-text-gray font-medium">{track.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Non-linear note */}
                                    <div className="p-4 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-start gap-3 text-xs text-text-main font-medium">
                                        <Compass className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="font-extrabold text-brand-blue block mb-0.5">Your career doesn&apos;t have to be linear.</strong>
                                            Kamu dapat berkembang sebagai specialist, people leader, business leader, maupun mengeksplorasi bidang baru sesuai kompetensi dan aspirasimu. Fleksibilitas ini selaras dengan ekosistem multidisiplin Diggity.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 09. HIRING PROCESS (6 STEPS) */}
                            <section className="pt-10 border-t border-glass-border space-y-8">
                                <div className="text-center max-w-3xl mx-auto space-y-2">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-brand-blue block">
                                        HIRING PROCESS
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-black text-text-main">
                                        How We Hire
                                    </h2>
                                    <p className="text-xs md:text-sm text-text-gray font-medium">
                                        Tahapan seleksi transparan, terstruktur, dan saling menghargai waktu kedua belah pihak.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {HIRING_PROCESS.map((step, sIdx) => (
                                        <div key={sIdx} className="p-6 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border space-y-3 hover:border-brand-blue/40 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-black text-brand-blue">{step.step}</span>
                                                <span className="text-[10px] font-bold text-text-gray px-2 py-0.5 rounded-md bg-slate-100 dark:bg-black/30">
                                                    {step.duration}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="text-base font-extrabold text-text-main">{step.title}</h4>
                                                <p className="text-[11px] font-bold text-brand-blue mb-1">{step.subtitle}</p>
                                                <p className="text-xs text-text-gray font-medium leading-relaxed">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 10. EMPLOYEE VALUE PROPOSITION (WHAT YOU GET) */}
                            <section className="pt-10 border-t border-glass-border space-y-8">
                                <div className="text-center max-w-3xl mx-auto space-y-2">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-brand-blue block">
                                        EMPLOYEE VALUE PROPOSITION
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-black text-text-main">
                                        What You Get at Diggity
                                    </h2>
                                    <p className="text-xs md:text-sm text-text-gray font-medium">
                                        Standar komitmen kami dalam mendukung perjalanan profesional dan kesejahteraan setiap talenta.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {EVP_MATRIX.map((evp, eIdx) => (
                                        <div key={eIdx} className="p-5 rounded-2xl bg-slate-50 dark:bg-black/20 border border-glass-border space-y-2">
                                            <span className="px-2.5 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-wider inline-block">
                                                {evp.area}
                                            </span>
                                            <p className="text-xs text-text-main font-medium leading-relaxed">{evp.offer}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 11. DIGGITY ACADEMY × CAREER (CROSSOVER) */}
                            <section className="pt-10 border-t border-glass-border">
                                <div className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/20 blur-[90px] rounded-full pointer-events-none" />
                                    
                                    <div className="space-y-4 max-w-2xl relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-wider">
                                            <GraduationCap className="w-3.5 h-3.5 text-brand-blue" />
                                            <span>DIGGITY ACADEMY × CAREER</span>
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-black">
                                            Learn With Us. Grow With Us.
                                        </h3>
                                        <p className="text-xs md:text-sm text-white/80 leading-relaxed font-medium">
                                            Bagi kami, recruitment bukan hanya tentang mencari orang yang sudah siap. Kami juga berkomitmen membantu membentuk talent masa depan. Melalui Diggity Academy, kamu dapat mengembangkan kapabilitas melalui:
                                        </p>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {['Bootcamp Intensif', 'Online Course', 'Professional Certification', 'Corporate Training', 'Workshop & Webinar', 'Learning Community'].map((item, idx) => (
                                                <span key={idx} className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-xs font-semibold text-white/90">
                                                    • {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative z-10 shrink-0">
                                        <Link
                                            href="/academy"
                                            className="px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-black text-xs transition-all shadow-lg inline-flex items-center gap-2"
                                        >
                                            <BookOpen className="w-4 h-4" />
                                            <span>Explore Diggity Academy →</span>
                                        </Link>
                                    </div>
                                </div>
                            </section>

                            {/* 12. TALENT COMMUNITY */}
                            <section className="pt-6">
                                <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="space-y-3 max-w-2xl">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue block">
                                            NETWORKING &amp; KNOWLEDGE
                                        </span>
                                        <h3 className="text-xl md:text-3xl font-black text-text-main">
                                            Stay Connected With Diggity
                                        </h3>
                                        <p className="text-xs md:text-sm text-text-gray font-medium leading-relaxed">
                                            Belum siap melamar sekarang? Tidak masalah. Bergabunglah dengan Diggity Talent Community untuk mendapatkan info lowongan terbaru, kesempatan internship, project opportunities, bootcamp, workshop, webinar, tips karier, dan insight industri teknologi.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setTalentModalType('community');
                                            setTalentModalOpen(true);
                                        }}
                                        className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-black text-xs transition-all shrink-0 cursor-pointer flex items-center gap-2"
                                    >
                                        <Users className="w-4 h-4" />
                                        <span>Join Talent Community →</span>
                                    </button>
                                </div>
                            </section>

                            {/* 13. EMPLOYER BRANDING FINAL CTA */}
                            <section className="pt-6 pb-2">
                                <div className="p-8 md:p-12 rounded-3xl bg-brand-blue text-white text-center space-y-6 shadow-xl relative overflow-hidden">
                                    <div className="max-w-2xl mx-auto space-y-3 relative z-10">
                                        <h3 className="text-2xl md:text-4xl font-black">
                                            Ready to Build What&apos;s Next?
                                        </h3>
                                        <p className="text-xs md:text-sm text-white/90 font-medium leading-relaxed">
                                            Your next opportunity could start here. Bergabunglah bersama Diggity dan ikut membangun masa depan digital melalui technology, AI, creativity, growth, cloud, dan education.
                                        </p>
                                    </div>
                                    <div className="relative z-10">
                                        <button
                                            onClick={() => scrollToSection('open-positions')}
                                            className="px-8 py-3.5 rounded-xl bg-white text-brand-blue hover:bg-slate-50 font-black text-xs transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
                                        >
                                            <Search className="w-4 h-4" />
                                            <span>Explore Open Positions</span>
                                        </button>
                                    </div>
                                </div>
                            </section>

                        </div>
                    )}

                    {/* ========================================================
                        TAB 2: BERGABUNG SEBAGAI MENTOR & CONTRIBUTOR
                        ======================================================== */}
                    {activeTab === 'mentor' && (
                        <div className="space-y-12 animate-in fade-in duration-300">
                            
                            <div className="text-left space-y-3 max-w-3xl">
                                <span className="text-xs font-black uppercase tracking-widest text-brand-blue block">JALUR KONTRIBUTOR RESMI</span>
                                <h2 className="text-2xl md:text-4xl font-black text-text-main">
                                    Bergabung sebagai Mentor / Contributor Diggity
                                </h2>
                                <p className="text-sm text-text-gray font-medium leading-relaxed">
                                    Jalur kontribusi khusus bagi para praktisi, software engineer, desainer, tech writer, dan inovator teknologi yang ingin berbagi keahlian, membimbing talenta muda, dan mendapatkan apresiasi profesional.
                                </p>
                            </div>

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
                                                        placeholder="Contoh: Laravel & Next.js, AI Engineering, UI/UX Design System, DevOps AWS"
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
                                            href="/contact"
                                            className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-blue-hover"
                                        >
                                            Konsultasi Layanan Headhunting <ArrowRight className="w-4 h-4" />
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
                                            href="/contact"
                                            className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-blue-hover"
                                        >
                                            Konsultasi Layanan Outsourcing <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </SpotlightCard>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* ========================================================
                TALENT POOL / TALENT COMMUNITY INTERACTIVE MODAL
                ======================================================== */}
            {talentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-brand-bg border border-glass-border rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => {
                                setTalentModalOpen(false);
                                setTalentStatus('idle');
                            }}
                            className="absolute top-5 right-5 text-text-gray hover:text-text-main p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-glass-bg transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue block">
                                {talentModalType === 'pool' ? 'TALENT POOL REGISTRATION' : 'TALENT COMMUNITY JOIN'}
                            </span>
                            <h3 className="text-xl font-black text-text-main">
                                {talentModalType === 'pool' ? 'Gabung ke Diggity Talent Pool' : 'Gabung ke Diggity Talent Community'}
                            </h3>
                            <p className="text-xs text-text-gray font-medium leading-relaxed">
                                {talentModalType === 'pool'
                                    ? 'Kirimkan data profil dan portofolio Anda. Kami akan menghubungi saat posisi atau proyek yang sesuai dibuka.'
                                    : 'Dapatkan kabar terkini seputar lowongan baru, webinar, workshop teknologi, dan kesempatan networking.'}
                            </p>
                        </div>

                        {talentStatus === 'success' ? (
                            <div className="text-center py-6 space-y-3">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-7 h-7" />
                                </div>
                                <h4 className="text-sm font-bold text-text-main">Profil Berhasil Disimpan</h4>
                                <p className="text-xs text-text-gray">{talentMessage}</p>
                                <button
                                    onClick={() => setTalentModalOpen(false)}
                                    className="px-5 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold cursor-pointer"
                                >
                                    Tutup
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleTalentSubmit} className="space-y-3.5">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-text-gray block">Nama Lengkap *</label>
                                    <input
                                        type="text"
                                        required
                                        value={talentForm.name}
                                        onChange={(e) => setTalentForm({ ...talentForm, name: e.target.value })}
                                        placeholder="Nama Lengkap Anda"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-text-gray block">Email Aktif *</label>
                                        <input
                                            type="email"
                                            required
                                            value={talentForm.email}
                                            onChange={(e) => setTalentForm({ ...talentForm, email: e.target.value })}
                                            placeholder="nama@domain.com"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-text-gray block">No. WhatsApp *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={talentForm.phone}
                                            onChange={(e) => setTalentForm({ ...talentForm, phone: e.target.value })}
                                            placeholder="08123456789"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-text-gray block">Bidang Minat / Keahlian *</label>
                                    <select
                                        value={talentForm.domain}
                                        onChange={(e) => setTalentForm({ ...talentForm, domain: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue cursor-pointer"
                                    >
                                        <option value="Technology & Engineering">Technology &amp; Software Engineering</option>
                                        <option value="AI & Data Science">AI &amp; Data Science</option>
                                        <option value="UI/UX & Product Design">UI/UX &amp; Product Design</option>
                                        <option value="Growth & Digital Marketing">Growth &amp; Digital Marketing</option>
                                        <option value="Cloud, DevOps & Cyber Security">Cloud, DevOps &amp; Cyber Security</option>
                                        <option value="Business, PM & Consulting">Business, PM &amp; Consulting</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-text-gray block">Link LinkedIn / GitHub / Portofolio *</label>
                                    <input
                                        type="url"
                                        required
                                        value={talentForm.portfolioUrl}
                                        onChange={(e) => setTalentForm({ ...talentForm, portfolioUrl: e.target.value })}
                                        placeholder="https://linkedin.com/in/... atau https://github.com/..."
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-text-gray block">Ceritakan Singkat Minat atau Pengalaman Anda</label>
                                    <textarea
                                        rows={2}
                                        value={talentForm.note}
                                        onChange={(e) => setTalentForm({ ...talentForm, note: e.target.value })}
                                        placeholder="Keahlian utama, tools yang biasa digunakan, atau tipe peran yang Anda cari..."
                                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue resize-none"
                                    />
                                </div>

                                {talentStatus === 'error' && (
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-500 text-xs font-semibold">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{talentMessage}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={talentStatus === 'loading'}
                                    className="w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                                >
                                    {talentStatus === 'loading' ? 'Mengirim Data...' : 'Kirim Profil ke Talent Pool'}
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
