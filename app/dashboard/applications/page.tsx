'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import SpotlightCard from '../../../components/SpotlightCard';
import { CAREERS_DATABASE } from '../../../lib/careers-data';
import { 
    Briefcase, FileText, CheckCircle2, Clock, Calendar, 
    AlertCircle, ChevronRight, User, ExternalLink, Filter, Search, Award
} from 'lucide-react';

interface ApplicationRecord {
    id: number | string;
    career_id: number;
    career_slug: string;
    career_title: string;
    department: string;
    applied_date: string;
    status: 'applied' | 'reviewed' | 'interviewed' | 'hired' | 'rejected';
    cv_name: string;
    name?: string;
    email?: string;
    notes?: string;
}

export default function DashboardApplicationsPage() {
    const { user } = useAuth();
    const { language: locale } = useLanguage();

    const [applications, setApplications] = useState<ApplicationRecord[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Load applications from localStorage or populate initial demo history
        try {
            const stored = localStorage.getItem('diggity_job_applications');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setApplications(parsed);
                    return;
                }
            }
        } catch (e) {}

        // Default initial application data for demonstrated dashboard flow
        const initialApplications: ApplicationRecord[] = [
            {
                id: 101,
                career_id: 1,
                career_slug: 'full-stack-web-developer',
                career_title: 'Full-Stack Web Developer (Next.js & Laravel)',
                department: 'Technology',
                applied_date: '18 Oktober 2026',
                status: 'interviewed',
                cv_name: 'Resume_FullStack_2026.pdf',
                name: user?.name || 'Talent Diggity',
                email: user?.email || 'talent@diggity.id',
                notes: 'Jadwal technical interview dijadwalkan pada hari Jumat pukul 14.00 WIB via Google Meet.'
            },
            {
                id: 102,
                career_id: 2,
                career_slug: 'ui-ux-product-designer',
                career_title: 'UI/UX & Digital Product Designer',
                department: 'Creative & Brand',
                applied_date: '12 Oktober 2026',
                status: 'reviewed',
                cv_name: 'Portfolio_UIUX_Designer.pdf',
                name: user?.name || 'Talent Diggity',
                email: user?.email || 'talent@diggity.id',
                notes: 'Portofolio sedang dalam peninjauan oleh Head of Design Diggity.'
            }
        ];

        setApplications(initialApplications);
        try {
            localStorage.setItem('diggity_job_applications', JSON.stringify(initialApplications));
        } catch (e) {}
    }, [user]);

    const filteredApplications = applications.filter((app) => {
        const matchesStatus = selectedStatus === 'All' || app.status === selectedStatus;
        const matchesSearch = searchQuery.trim() === '' || 
            app.career_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.department.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const statusMap = {
        applied: {
            label: locale === 'en' ? 'Submitted' : 'Terkirim',
            color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
            desc: locale === 'en' ? 'Your resume has been received and is waiting for initial screening.' : 'Berkas lamaran telah terkirim dan sedang menunggu giliran skrining awal.'
        },
        reviewed: {
            label: locale === 'en' ? 'In Review' : 'Sedang Ditinjau',
            color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
            desc: locale === 'en' ? 'The recruitment team is evaluating your CV and portfolio.' : 'Rekruter dan Lead Engineer sedang memeriksa CV dan portofolio Anda.'
        },
        interviewed: {
            label: locale === 'en' ? 'Interview Stage' : 'Tahap Interview',
            color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
            desc: locale === 'en' ? 'Congratulations! You are invited to the technical/culture interview.' : 'Selamat! Anda diundang mengikuti sesi wawancara teknis / culture fit.'
        },
        hired: {
            label: locale === 'en' ? 'Accepted / Hired' : 'Lolos Seleksi',
            color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
            desc: locale === 'en' ? 'Offering letter issued. Welcome to the Diggity family!' : 'Offering letter resmi telah diterbitkan. Selamat bergabung di tim Diggity!'
        },
        rejected: {
            label: locale === 'en' ? 'Not Proceeding' : 'Belum Sesuai',
            color: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
            desc: locale === 'en' ? 'Thank you for your interest. Your profile is saved in our talent pool.' : 'Terima kasih atas partisipasi Anda. Profil Anda kami simpan dalam talent pool.'
        }
    };

    return (
        <div className="space-y-8 text-left">
            
            {/* Header & Overview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-glass-border">
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest block">
                        MINI-ATS PORTAL
                    </span>
                    <h1 className="text-2xl md:text-3xl font-black text-text-main">
                        {locale === 'en' ? 'My Job Applications' : 'Riwayat Lamaran Karier'}
                    </h1>
                    <p className="text-xs text-text-gray font-medium">
                        Pantau progres seleksi berkas, undangan interview, dan konfirmasi lamaran Anda secara transparan.
                    </p>
                </div>

                <Link
                    href="/job-connect"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold transition-all shadow-md self-start sm:self-center"
                >
                    <Briefcase className="w-3.5 h-3.5" />
                    {locale === 'en' ? 'Browse More Jobs' : 'Jelajahi Lowongan Lain'}
                </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border">
                    <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Total Lamaran</span>
                    <div className="text-2xl font-black text-text-main">{applications.length}</div>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border">
                    <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Dalam Peninjauan</span>
                    <div className="text-2xl font-black text-amber-500">
                        {applications.filter(a => a.status === 'reviewed').length}
                    </div>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border">
                    <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Tahap Interview</span>
                    <div className="text-2xl font-black text-purple-500">
                        {applications.filter(a => a.status === 'interviewed').length}
                    </div>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border">
                    <span className="text-[10px] font-bold text-text-gray uppercase tracking-wider block mb-1">Lolos / Diterima</span>
                    <div className="text-2xl font-black text-emerald-500">
                        {applications.filter(a => a.status === 'hired').length}
                    </div>
                </div>
            </div>

            {/* Search & Status Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="w-3.5 h-3.5 text-text-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Cari posisi lamaran..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-text-gray shrink-0" />
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs font-bold text-text-main outline-none cursor-pointer"
                    >
                        <option value="All">Semua Status</option>
                        <option value="applied">Terkirim (Submitted)</option>
                        <option value="reviewed">Sedang Ditinjau (In Review)</option>
                        <option value="interviewed">Tahap Interview</option>
                        <option value="hired">Lolos Seleksi (Hired)</option>
                        <option value="rejected">Belum Sesuai</option>
                    </select>
                </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {filteredApplications.length > 0 ? (
                    filteredApplications.map((app) => {
                        const config = statusMap[app.status] || statusMap.applied;

                        return (
                            <SpotlightCard
                                key={app.id}
                                className="p-6 md:p-8 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl space-y-4 shadow-sm"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase">
                                                {app.department}
                                            </span>
                                            <span className="text-[11px] font-bold text-text-gray flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-brand-blue" />
                                                Dilamar pada {app.applied_date}
                                            </span>
                                        </div>

                                        <h3 className="text-lg md:text-xl font-black text-text-main">
                                            {app.career_title}
                                        </h3>
                                        <p className="text-xs text-text-gray font-medium">CV Sinergi Cita Digital — Diggity</p>
                                    </div>

                                    {/* Visual Status Badge */}
                                    <div className="self-start md:self-center">
                                        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-black ${config.color}`}>
                                            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                            <span>{config.label}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Status Note Box */}
                                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/20 border border-glass-border/60 space-y-1">
                                    <p className="text-xs font-semibold text-text-main">{config.desc}</p>
                                    {app.notes && (
                                        <p className="text-[11px] text-brand-blue font-bold flex items-center gap-1.5 pt-0.5">
                                            <span>📌 Catatan Rekruter:</span> {app.notes}
                                        </p>
                                    )}
                                </div>

                                {/* Metadata & Resume Link */}
                                <div className="pt-3 border-t border-glass-border flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-text-gray">
                                        <FileText className="w-4 h-4 text-brand-blue shrink-0" />
                                        <span>Berkas Terlampir: <strong className="text-text-main font-bold">{app.cv_name}</strong></span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={`/job-connect/${app.career_slug}`}
                                            className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:underline"
                                        >
                                            Lihat Info Lowongan <ExternalLink className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </SpotlightCard>
                        );
                    })
                ) : (
                    <div className="p-12 text-center rounded-3xl bg-white dark:bg-glass-bg border border-glass-border space-y-3">
                        <Briefcase className="w-10 h-10 text-text-gray/40 mx-auto" />
                        <h4 className="text-base font-bold text-text-main">Belum Ada Lamaran yang Cocok</h4>
                        <p className="text-xs text-text-gray max-w-sm mx-auto">
                            Anda belum mengirimkan lamaran kerja atau tidak ada lamaran yang sesuai dengan filter status yang dipilih.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/job-connect"
                                className="inline-block px-5 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold"
                            >
                                Cari Lowongan Sekarang
                            </Link>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
