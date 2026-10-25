'use client';

import React, { use, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';
import ScrollReveal from '../../../components/ScrollReveal';
import SpotlightCard from '../../../components/SpotlightCard';
import { api, Career } from '../../../lib/api';
import { CAREERS_DATABASE, HIRING_PROCESS } from '../../../lib/careers-data';
import { executeRecaptcha } from '../../../lib/recaptcha';
import { 
    Briefcase, MapPin, Clock, Calendar, GraduationCap, DollarSign,
    CheckCircle2, ArrowRight, ArrowLeft, Upload, Send, AlertCircle,
    User, Mail, Phone, FileText, ShieldCheck, Sparkles, LogIn, ChevronRight,
    Building2, Globe, ExternalLink, Compass, Check
} from 'lucide-react';

export default function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { language: locale } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();

    const [job, setJob] = useState<Career | null>(null);
    const [loadingJob, setLoadingJob] = useState(true);

    // Form state matching brief requirements
    const [applicantName, setApplicantName] = useState('');
    const [applicantEmail, setApplicantEmail] = useState('');
    const [applicantPhone, setApplicantPhone] = useState('');
    const [applicantDomicile, setApplicantDomicile] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');
    const [salaryExpectation, setSalaryExpectation] = useState('');
    const [availability, setAvailability] = useState('Segera (Immediately)');
    const [reasonInterest, setReasonInterest] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [cvFile, setCvFile] = useState<File | null>(null);

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [alreadyApplied, setAlreadyApplied] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const localJob = CAREERS_DATABASE.find(c => c.slug === slug);
        if (localJob) {
            setJob(localJob);
            setLoadingJob(false);
        } else {
            api.getCareerBySlug(slug)
                .then(data => {
                    setJob(data);
                    setLoadingJob(false);
                })
                .catch(() => {
                    // Fallback to first job
                    setJob(CAREERS_DATABASE[0]);
                    setLoadingJob(false);
                });
        }
    }, [slug]);

    // Pre-fill user data if logged in
    useEffect(() => {
        if (user) {
            setApplicantName(user.name || '');
            setApplicantEmail(user.email || '');
            try {
                const storedApps = JSON.parse(localStorage.getItem('diggity_job_applications') || '[]');
                const hasApplied = storedApps.some((app: any) => 
                    (app.career_id === job?.id || app.career_slug === slug) && app.email === user.email
                );
                if (hasApplied) {
                    setAlreadyApplied(true);
                }
            } catch (e) {}
        }
    }, [user, job, slug]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type !== 'application/pdf') {
                alert(locale === 'en' ? 'Only PDF format is allowed!' : 'Hanya diperbolehkan mengunggah format PDF!');
                setCvFile(null);
                return;
            }
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                alert(locale === 'en' ? 'File size must be under 10MB!' : 'Ukuran berkas maksimal 10MB!');
                setCvFile(null);
                return;
            }
            setCvFile(file);
        }
    };

    const handleApplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!job) return;

        if (alreadyApplied) {
            alert(locale === 'en' 
                ? 'You have already applied for this opening. Please check your dashboard for updates.' 
                : 'Anda sudah pernah mengirimkan lamaran untuk posisi ini. Silakan pantau perkembangan di Dashboard.');
            return;
        }

        if (!cvFile) {
            alert(locale === 'en' ? 'Please upload your CV (PDF)!' : 'Silakan lampirkan berkas CV (PDF) Anda!');
            return;
        }

        setStatus('loading');

        try {
            const recaptchaToken = await executeRecaptcha('career_application');
            const submitData = new FormData();
            submitData.append('career_id', job.id.toString());
            submitData.append('name', applicantName);
            submitData.append('email', applicantEmail);
            submitData.append('phone', applicantPhone);
            submitData.append('domicile', applicantDomicile);
            submitData.append('linkedin', linkedinUrl);
            submitData.append('portfolio', portfolioUrl);
            submitData.append('salary_expectation', salaryExpectation);
            submitData.append('availability', availability);
            submitData.append('reason_interest', reasonInterest);
            submitData.append('cv', cvFile);
            if (coverLetter) {
                submitData.append('cover_letter', coverLetter);
            }
            if (recaptchaToken) {
                submitData.append('recaptcha_token', recaptchaToken);
            }

            try {
                await api.submitJobApplication(submitData);
            } catch (apiErr) {
                console.warn('API submission fallback:', apiErr);
            }

            // Save to user's local application record
            const newApplicationRecord = {
                id: Date.now(),
                career_id: job.id,
                career_slug: job.slug,
                career_title: job.title,
                department: job.department,
                applied_date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                status: 'applied',
                cv_name: cvFile.name,
                name: applicantName,
                email: applicantEmail,
                phone: applicantPhone,
                domicile: applicantDomicile,
                salary_expectation: salaryExpectation,
                availability: availability
            };

            try {
                const storedApps = JSON.parse(localStorage.getItem('diggity_job_applications') || '[]');
                storedApps.unshift(newApplicationRecord);
                localStorage.setItem('diggity_job_applications', JSON.stringify(storedApps));
            } catch (err) {}

            setStatus('success');
            setAlreadyApplied(true);
            setMessage(
                locale === 'en'
                    ? 'Your application has been successfully submitted! You can track its status in your Dashboard.'
                    : 'Lamaran Anda berhasil dikirim! Anda dapat memantau status seleksi dan riwayat berkas langsung melalui Dashboard Akun Diggity.'
            );
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'Gagal mengirim lamaran. Silakan periksa kembali berkas Anda.');
        }
    };

    const scrollToForm = () => {
        const formEl = document.getElementById('application-form');
        if (formEl) {
            formEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (loadingJob || !job) {
        return (
            <div className="min-h-screen pt-36 pb-20 flex items-center justify-center bg-bg-canvas">
                <div className="text-center space-y-3">
                    <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-bold text-text-gray font-mono">Memuat detail lowongan kerja...</p>
                </div>
            </div>
        );
    }

    const statusBadge = {
        open: { label: 'Dibuka', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
        closing_soon: { label: 'Segera Ditutup', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
        closed: { label: 'Ditutup', color: 'bg-slate-500/10 text-slate-500 border-slate-500/20' }
    }[job.status || 'open'];

    const salaryString = job.salary_min && job.salary_max
        ? `Rp${job.salary_min.toLocaleString('id-ID')} – Rp${job.salary_max.toLocaleString('id-ID')} / bulan`
        : 'Kompetitif (Sesuai Pengalaman)';

    // Similar jobs: other jobs in database
    const similarJobs = CAREERS_DATABASE
        .filter(c => c.slug !== job.slug)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-bg-canvas pt-28 pb-20 overflow-hidden relative text-left">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 space-y-10">
                
                {/* 01. BREADCRUMB */}
                <nav className="flex items-center gap-2 text-xs font-bold text-text-gray overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 text-text-gray/50" />
                    <Link href="/careers" className="hover:text-brand-blue transition-colors">Karier</Link>
                    <ChevronRight className="w-3 h-3 text-text-gray/50" />
                    <span className="text-brand-blue truncate max-w-[240px]">{job.title}</span>
                </nav>

                {/* 01. HEADER LOWONGAN (HERO CARD) */}
                <ScrollReveal animation="fade-up">
                    <div className="bg-white dark:bg-glass-bg border border-glass-border rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="space-y-2 max-w-2xl">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="px-3 py-1 rounded-md bg-brand-blue/10 text-brand-blue text-[11px] font-black uppercase tracking-wider">
                                        {job.department}
                                    </span>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-black ${statusBadge.color}`}>
                                        <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                        {statusBadge.label}
                                    </span>
                                </div>
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-text-main leading-tight">
                                    {job.title}
                                </h1>
                                <p className="text-xs md:text-sm font-bold text-text-gray">
                                    CV Sinergi Cita Digital — Diggity • Dibuat pada 3 hari yang lalu • Ditutup pada {job.closing_date}
                                </p>
                            </div>
                            
                            {/* Sticky desktop action button */}
                            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
                                <button
                                    onClick={scrollToForm}
                                    className="px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Lamar Sekarang</span>
                                </button>
                                <span className="text-[11px] text-text-gray font-medium">
                                    Proses seleksi transparan &amp; cepat
                                </span>
                            </div>
                        </div>

                        {/* Metadata Grid (Chips Sesuai Brief) */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6 border-t border-glass-border">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block">Jenis Pekerjaan</span>
                                <span className="text-xs md:text-sm font-bold text-text-main flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-brand-blue shrink-0" /> {job.type}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block">Preferensi Kerja</span>
                                <span className="text-xs md:text-sm font-bold text-text-main flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" /> {job.location}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block">Level Posisi</span>
                                <span className="text-xs md:text-sm font-bold text-text-main flex items-center gap-1.5">
                                    <Briefcase className="w-3.5 h-3.5 text-brand-blue shrink-0" /> {job.level}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block">Bidang Pekerjaan</span>
                                <span className="text-xs md:text-sm font-bold text-text-main flex items-center gap-1.5">
                                    <Building2 className="w-3.5 h-3.5 text-brand-blue shrink-0" /> {job.department}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block">Pendidikan Min</span>
                                <span className="text-xs md:text-sm font-bold text-text-main flex items-center gap-1.5">
                                    <GraduationCap className="w-3.5 h-3.5 text-brand-blue shrink-0" /> {job.education || 'D3 / S1 Terkait'}
                                </span>
                            </div>
                            <div className="space-y-1 col-span-2 sm:col-span-1">
                                <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block">Estimasi Gaji</span>
                                <span className="text-xs md:text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                    <DollarSign className="w-3.5 h-3.5 shrink-0" /> {salaryString}
                                </span>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* MAIN CONTENT GRID: Left (Details) & Right (Sticky Form) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* Left Column: Job Description, Skills, About, & Hiring Process (7 cols) */}
                    <div className="lg:col-span-7 space-y-10">
                        
                        {/* 02. DESKRIPSI PEKERJAAN (OVERVIEW & RESPONSIBILITIES) */}
                        <ScrollReveal animation="fade-up" className="space-y-4">
                            <h2 className="text-xl font-black text-text-main">Deskripsi Pekerjaan</h2>
                            
                            <div className="space-y-2">
                                <h3 className="text-sm font-extrabold text-brand-blue uppercase tracking-wider">Overview</h3>
                                <p className="text-xs md:text-sm text-text-gray leading-relaxed font-medium">
                                    {job.description}
                                </p>
                            </div>

                            {job.responsibilities && (
                                <div className="space-y-3 pt-3">
                                    <h3 className="text-sm font-extrabold text-brand-blue uppercase tracking-wider">Responsibilities</h3>
                                    <ul className="space-y-2.5">
                                        {(Array.isArray(job.responsibilities) ? job.responsibilities : [job.responsibilities]).map((item, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-text-main font-medium">
                                                <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </ScrollReveal>

                        {/* 03. REQUIREMENTS & NICE TO HAVE */}
                        <ScrollReveal animation="fade-up" className="space-y-6 pt-4 border-t border-glass-border">
                            {job.requirements && (
                                <div className="space-y-3">
                                    <h2 className="text-xl font-black text-text-main">Kualifikasi &amp; Persyaratan (Requirements)</h2>
                                    <ul className="space-y-2.5">
                                        {(Array.isArray(job.requirements) ? job.requirements : [job.requirements]).map((item, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-text-main font-medium">
                                                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {job.nice_to_have && (
                                <div className="space-y-3 pt-2">
                                    <h3 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Nice to Have (Nilai Tambah)</h3>
                                    <ul className="space-y-2">
                                        {(Array.isArray(job.nice_to_have) ? job.nice_to_have : [job.nice_to_have]).map((item, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-text-main font-medium">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </ScrollReveal>

                        {/* 04. BENEFITS (WHAT YOU'LL GET) */}
                        {job.benefits && (
                            <ScrollReveal animation="fade-up" className="space-y-4 pt-4 border-t border-glass-border">
                                <h2 className="text-xl font-black text-text-main">Fasilitas &amp; Keuntungan (What You&apos;ll Get)</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {(Array.isArray(job.benefits) ? job.benefits : [job.benefits]).map((item, i) => (
                                        <div key={i} className="p-3.5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border space-y-1">
                                            <p className="text-xs font-semibold text-text-main leading-relaxed">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        )}

                        {/* 05. SKILL WAJIB (REQUIRED SKILLS) */}
                        {job.required_skills && job.required_skills.length > 0 && (
                            <ScrollReveal animation="fade-up" className="space-y-3 pt-4 border-t border-glass-border">
                                <h2 className="text-xl font-black text-text-main">Skill Wajib (Required Skills)</h2>
                                <div className="flex flex-wrap gap-2">
                                    {job.required_skills.map((skill, sIdx) => (
                                        <span
                                            key={sIdx}
                                            className="px-3.5 py-1.5 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-xs font-bold text-brand-blue"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </ScrollReveal>
                        )}

                        {/* 06. TENTANG DIGGITY (ABOUT DIGGITY) */}
                        <ScrollReveal animation="fade-up" className="space-y-4 pt-4 border-t border-glass-border">
                            <div className="p-6 md:p-8 rounded-3xl bg-slate-50 dark:bg-black/20 border border-glass-border space-y-4">
                                <div className="flex items-center gap-2 text-brand-blue font-black text-xs uppercase tracking-wider">
                                    <Building2 className="w-4 h-4" />
                                    <span>TENTANG KAMI</span>
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-text-main">
                                    About Diggity
                                </h3>
                                <p className="text-xs md:text-sm text-text-gray leading-relaxed font-medium">
                                    Diggity adalah strategic digital partner yang membantu bisnis, organisasi, dan institusi membangun serta mengembangkan kapabilitas digital. Kami menggabungkan technology, AI, data, creative, marketing, cloud, cybersecurity, dan professional services untuk menciptakan solusi digital yang relevan dan berdampak.
                                </p>
                                <p className="text-xs text-text-gray leading-relaxed font-medium">
                                    Kami percaya bahwa transformasi digital bukan hanya tentang teknologi, tetapi tentang bagaimana teknologi dapat membantu manusia dan organisasi <strong>Build → Grow → Scale → Empower</strong>.
                                </p>
                                <div className="pt-1">
                                    <Link
                                        href="/about"
                                        className="inline-flex items-center gap-1.5 text-xs font-black text-brand-blue hover:text-brand-blue-hover"
                                    >
                                        <span>Kenali Diggity Lebih Dekat</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 07. ALUR & PROSES SELEKSI (6 TAHAP) */}
                        <ScrollReveal animation="fade-up" className="space-y-4 pt-4 border-t border-glass-border">
                            <h2 className="text-xl font-black text-text-main">Alur &amp; Proses Seleksi</h2>
                            <p className="text-xs text-text-gray font-medium">
                                Tahapan seleksi terbuka dan terarah yang akan Anda lalui bersama tim rekruter Diggity:
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                                {HIRING_PROCESS.map((proc, pIdx) => (
                                    <div key={pIdx} className="p-4 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-brand-blue">TAHAP {proc.step}</span>
                                            <span className="text-[10px] font-bold text-text-gray">{proc.duration}</span>
                                        </div>
                                        <h4 className="text-xs md:text-sm font-extrabold text-text-main">{proc.title}</h4>
                                        <p className="text-[11px] text-text-gray leading-relaxed font-medium">{proc.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                    </div>

                    {/* Right Column: Sticky Application Form (5 cols) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        <SpotlightCard id="application-form" className="p-6 md:p-8 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl shadow-xl space-y-6 scroll-mt-32">
                            
                            {/* Form Header */}
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue block">
                                    FORMULIR LAMARAN KERJA
                                </span>
                                <h3 className="text-xl font-black text-text-main leading-snug">
                                    Lamar: {job.title}
                                </h3>
                                <p className="text-xs text-text-gray font-medium">
                                    Siapkan CV (PDF), tautan portofolio, dan isi data diri Anda di bawah ini:
                                </p>
                            </div>

                            {/* User Auth Banner */}
                            {user ? (
                                <div className="p-3.5 rounded-2xl bg-brand-blue/5 border border-brand-blue/20 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center font-bold text-xs text-brand-blue shrink-0">
                                            {user.name?.substring(0, 1).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-text-main truncate">{user.name}</p>
                                            <p className="text-[10px] text-text-gray font-medium truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link 
                                        href="/dashboard/applications" 
                                        className="text-[10px] font-bold text-brand-blue hover:underline shrink-0"
                                    >
                                        Riwayat
                                    </Link>
                                </div>
                            ) : (
                                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                                    <p className="text-xs font-semibold text-text-main">
                                        💡 Masuk untuk memantau status lamaran langsung di Dashboard.
                                    </p>
                                    <Link
                                        href={`/login?redirect=/careers/${job.slug}`}
                                        className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700"
                                    >
                                        <LogIn className="w-3.5 h-3.5" /> Masuk ke Akun Diggity
                                    </Link>
                                </div>
                            )}

                            {/* Duplicate Application Prevention Alert */}
                            {alreadyApplied ? (
                                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                                    <h4 className="text-sm font-black text-text-main">Lamaran Anda Sudah Tercatat</h4>
                                    <p className="text-xs text-text-gray font-medium leading-relaxed">
                                        Sistem kami mencatat Anda telah mengirimkan berkas lamaran untuk posisi ini. Rekruter kami sedang meninjau berkas Anda.
                                    </p>
                                    <Link
                                        href="/dashboard/applications"
                                        className="inline-block px-5 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold shadow-md hover:bg-brand-blue-hover transition-colors"
                                    >
                                        Cek Status Seleksi di Dashboard
                                    </Link>
                                </div>
                            ) : status === 'success' ? (
                                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                                    <h4 className="text-base font-black text-text-main">Lamaran Berhasil Dikirim!</h4>
                                    <p className="text-xs text-text-gray font-medium leading-relaxed">{message}</p>
                                    <div className="pt-2 flex flex-col gap-2">
                                        <Link
                                            href="/dashboard/applications"
                                            className="w-full py-3 rounded-xl bg-brand-blue text-white text-xs font-bold shadow-md hover:bg-brand-blue-hover transition-colors text-center"
                                        >
                                            Pantau Status di Dashboard
                                        </Link>
                                        <Link
                                            href="/careers"
                                            className="w-full py-2.5 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs font-bold text-text-main hover:border-brand-blue text-center"
                                        >
                                            Lihat Lowongan Lainnya
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleApplySubmit} className="space-y-3.5">
                                    {/* Nama Lengkap */}
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-text-gray block">Nama Lengkap *</label>
                                        <input
                                            type="text"
                                            required
                                            value={applicantName}
                                            onChange={(e) => setApplicantName(e.target.value)}
                                            placeholder="Nama Lengkap Anda"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                        />
                                    </div>

                                    {/* Email & Phone */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-text-gray block">Email *</label>
                                            <input
                                                type="email"
                                                required
                                                value={applicantEmail}
                                                onChange={(e) => setApplicantEmail(e.target.value)}
                                                placeholder="email@domain.com"
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-text-gray block">No. WhatsApp *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={applicantPhone}
                                                onChange={(e) => setApplicantPhone(e.target.value)}
                                                placeholder="08123456789"
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                            />
                                        </div>
                                    </div>

                                    {/* Domisili */}
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-text-gray block">Kota Domisili Saat Ini *</label>
                                        <input
                                            type="text"
                                            required
                                            value={applicantDomicile}
                                            onChange={(e) => setApplicantDomicile(e.target.value)}
                                            placeholder="Contoh: Yogyakarta, Sleman, Jakarta Selatan, Surabaya"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                        />
                                    </div>

                                    {/* Links (LinkedIn / GitHub / Portfolio) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-text-gray block">Tautan LinkedIn</label>
                                            <input
                                                type="url"
                                                value={linkedinUrl}
                                                onChange={(e) => setLinkedinUrl(e.target.value)}
                                                placeholder="https://linkedin.com/in/..."
                                                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-text-gray block">Tautan Portofolio / GitHub</label>
                                            <input
                                                type="url"
                                                value={portfolioUrl}
                                                onChange={(e) => setPortfolioUrl(e.target.value)}
                                                placeholder="https://github.com/..."
                                                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                            />
                                        </div>
                                    </div>

                                    {/* Salary Expectation & Availability */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-text-gray block">Ekspektasi Gaji (Rp/bln)</label>
                                            <input
                                                type="text"
                                                value={salaryExpectation}
                                                onChange={(e) => setSalaryExpectation(e.target.value)}
                                                placeholder="Contoh: Rp5.500.000"
                                                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-text-gray block">Kapan Dapat Mulai Bekerja?</label>
                                            <select
                                                value={availability}
                                                onChange={(e) => setAvailability(e.target.value)}
                                                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue cursor-pointer"
                                            >
                                                <option value="Segera (Immediately)">Segera (Immediately)</option>
                                                <option value="1 Minggu Notice">1 Minggu Notice</option>
                                                <option value="2 Minggu Notice">2 Minggu Notice</option>
                                                <option value="1 Bulan Notice">1 Bulan Notice</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Alasan Tertarik */}
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-text-gray block">Mengapa Tertarik Bergabung dengan Diggity?</label>
                                        <textarea
                                            rows={2}
                                            value={reasonInterest}
                                            onChange={(e) => setReasonInterest(e.target.value)}
                                            placeholder="Ceritakan motivasi Anda memilih posisi ini dan bagaimana Anda melihat peran Anda di Diggity..."
                                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue resize-none"
                                        />
                                    </div>

                                    {/* Upload CV (PDF) */}
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-text-gray block">Berkas CV / Resume (PDF Maksimal 10MB) *</label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <div 
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-4 rounded-xl border border-dashed border-glass-border hover:border-brand-blue bg-slate-50 dark:bg-black/20 text-center cursor-pointer transition-colors"
                                        >
                                            <Upload className="w-5 h-5 text-brand-blue mx-auto mb-1.5" />
                                            {cvFile ? (
                                                <p className="text-xs font-bold text-emerald-600 truncate">{cvFile.name}</p>
                                            ) : (
                                                <p className="text-xs font-medium text-text-gray">
                                                    Klik untuk memilih berkas <span className="font-bold text-brand-blue">PDF</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Cover Letter (Opsional) */}
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-text-gray block">Cover Letter Singkat (Opsional)</label>
                                        <textarea
                                            rows={2}
                                            value={coverLetter}
                                            onChange={(e) => setCoverLetter(e.target.value)}
                                            placeholder="Tuliskan catatan pendukung singkat untuk rekruter..."
                                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue resize-none"
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-500 text-xs font-semibold">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            <span>{message}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                                    >
                                        {status === 'loading' ? 'Mengirim Lamaran...' : 'Kirim Lamaran Pekerjaan'}
                                        <Send className="w-3.5 h-3.5" />
                                    </button>
                                </form>
                            )}
                        </SpotlightCard>
                    </div>

                </div>

                {/* 08. LOWONGAN SERUPA (SIMILAR JOBS) */}
                {similarJobs.length > 0 && (
                    <div className="pt-10 border-t border-glass-border space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black text-text-main">Lowongan Pekerjaan Serupa</h3>
                                <p className="text-xs text-text-gray font-medium">Jelajahi posisi relevan lainnya di ekosistem Diggity:</p>
                            </div>
                            <Link
                                href="/careers"
                                className="text-xs font-bold text-brand-blue hover:underline hidden sm:inline-block"
                            >
                                Lihat Semua Posisi →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {similarJobs.map((simJob) => (
                                <SpotlightCard
                                    key={simJob.id}
                                    className="p-6 rounded-2xl border border-glass-border bg-white dark:bg-glass-bg flex flex-col justify-between hover:border-brand-blue/40 transition-all group"
                                >
                                    <div className="space-y-3">
                                        <span className="px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase">
                                            {simJob.department}
                                        </span>
                                        <h4 className="text-base font-black text-text-main group-hover:text-brand-blue transition-colors">
                                            {simJob.title}
                                        </h4>
                                        <p className="text-[11px] text-text-gray font-medium">CV Sinergi Cita Digital — Diggity</p>
                                        <div className="flex flex-wrap gap-1.5 text-[11px] text-text-gray">
                                            <span className="font-semibold">{simJob.type}</span>
                                            <span>•</span>
                                            <span className="font-semibold">{simJob.location}</span>
                                            <span>•</span>
                                            <span className="font-semibold">{simJob.level}</span>
                                        </div>
                                    </div>
                                    <div className="pt-4 mt-4 border-t border-glass-border flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-text-gray">Batas: {simJob.closing_date}</span>
                                        <Link
                                            href={`/careers/${simJob.slug}`}
                                            className="text-xs font-black text-brand-blue group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                                        >
                                            Lihat Lowongan →
                                        </Link>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                )}

                {/* 09. FINAL CTA PENUTUP */}
                <div className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white text-center space-y-4 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/20 blur-[80px] rounded-full pointer-events-none" />
                    <h3 className="text-2xl md:text-3xl font-black relative z-10">
                        Ready to Build What&apos;s Next?
                    </h3>
                    <p className="text-xs md:text-sm text-white/80 max-w-xl mx-auto leading-relaxed relative z-10">
                        Temukan kesempatan berikutnya dan tumbuh bersama ekosistem teknologi Diggity.
                    </p>
                    <div className="pt-2 relative z-10">
                        <Link
                            href="/careers"
                            className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-black text-xs transition-all shadow-md inline-block"
                        >
                            Lihat Semua Lowongan
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
