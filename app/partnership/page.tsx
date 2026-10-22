'use client';

import React, { useState } from 'react';
import { api } from '../../lib/api';
import { useLanguage } from '../../context/LanguageContext';
import { executeRecaptcha } from '../../lib/recaptcha';
import SpotlightCard from '../../components/SpotlightCard';
import { 
    Handshake, Users, Cpu, DollarSign, CheckCircle2, Send, 
    AlertCircle, Building2, Briefcase, GraduationCap, ArrowRight,
    TrendingUp, ShieldCheck, Sparkles, Layers, FileText
} from 'lucide-react';

export default function PartnershipPage() {
    const { language: locale } = useLanguage();
    const [activeTab, setActiveTab] = useState<'b2b' | 'referral'>('b2b');

    // B2B Partnership Form State
    const [b2bData, setB2bData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        partnershipType: 'Strategic Partnership',
        message: '',
    });

    // Referral Form State
    const [referralData, setReferralData] = useState({
        referrerName: '',
        referrerContact: '',
        clientName: '',
        clientCompany: '',
        clientContact: '',
        serviceNeeded: 'Custom Software Development',
        projectEstimatedScope: '',
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    // B2B Form Submission
    const handleB2BSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const recaptchaToken = await executeRecaptcha('partnership_b2b');
            await api.submitLead({
                name: b2bData.name,
                email: b2bData.email,
                phone: b2bData.phone,
                company: b2bData.company,
                service: `B2B Partnership - ${b2bData.partnershipType}`,
                message: b2bData.message,
                recaptcha_token: recaptchaToken
            });
            setStatus('success');
            setB2bData({
                name: '',
                email: '',
                phone: '',
                company: '',
                partnershipType: 'Strategic Partnership',
                message: '',
            });
            setStatusMessage(
                locale === 'en'
                    ? 'Your partnership proposal has been submitted successfully! Our team will contact you within 1-2 business days.'
                    : 'Proposal kemitraan B2B Anda berhasil dikirim! Tim kemitraan strategis kami akan menghubungi Anda dalam 1-2 hari kerja.'
            );
        } catch (err: any) {
            setStatus('error');
            setStatusMessage(
                err.message || 
                (locale === 'en' 
                    ? 'Failed to submit proposal. Please try again.' 
                    : 'Gagal mengirim proposal kemitraan. Silakan coba kembali.')
            );
        }
    };

    // Referral Form Submission
    const handleReferralSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const recaptchaToken = await executeRecaptcha('client_referral');
            const compositeMessage = `[PROGRAM REFERRAL KLIEN]
Nama Pengirim Referral: ${referralData.referrerName}
Kontak Pengirim: ${referralData.referrerContact}
Prospek Klien: ${referralData.clientName} (${referralData.clientCompany})
Kontak Klien: ${referralData.clientContact}
Kebutuhan Proyek: ${referralData.serviceNeeded}
Catatan Tambahan: ${referralData.projectEstimatedScope || '-'}`;

            await api.submitLead({
                name: referralData.referrerName,
                email: referralData.referrerContact.includes('@') ? referralData.referrerContact : 'referral@diggity.id',
                phone: referralData.referrerContact,
                company: `Referral for: ${referralData.clientCompany}`,
                service: `Client Referral - ${referralData.serviceNeeded}`,
                message: compositeMessage,
                recaptcha_token: recaptchaToken
            });
            setStatus('success');
            setReferralData({
                referrerName: '',
                referrerContact: '',
                clientName: '',
                clientCompany: '',
                clientContact: '',
                serviceNeeded: 'Custom Software Development',
                projectEstimatedScope: '',
            });
            setStatusMessage(
                locale === 'en'
                    ? 'Thank you! The client lead has been recorded. Our consultant team will reach out and keep you updated on progress.'
                    : 'Terima kasih! Data prospek klien berhasil didaftarkan. Tim konsultan Diggity akan segera memproses dan memperbarui status komisi Anda.'
            );
        } catch (err: any) {
            setStatus('error');
            setStatusMessage(
                err.message || 
                (locale === 'en' 
                    ? 'Failed to submit referral. Please try again.' 
                    : 'Gagal mendaftarkan data referral. Silakan coba kembali.')
            );
        }
    };

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden text-left bg-bg-canvas">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* 01. HEADER SECTION */}
                <div className="text-center space-y-4 max-w-3xl mx-auto relative">
                    <span className="text-xs font-black uppercase tracking-widest text-brand-blue block">
                        {locale === 'en' ? 'EXPAND & EARN WITH DIGGITY' : 'KOLABORASI BISNIS & BAGI HASIL'}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        {locale === 'en' ? (
                            <>Partnership &amp; <span className="text-brand-blue">Referral Hub</span></>
                        ) : (
                            <>Program Kemitraan &amp; <span className="text-brand-blue">Referral Klien</span></>
                        )}
                    </h1>
                    <p className="text-base md:text-lg text-text-gray font-medium leading-relaxed max-w-2xl mx-auto">
                        {locale === 'en' 
                            ? 'Build collaborative software ventures as an enterprise partner, or refer prospective clients to unlock up to 10% commission on closed contracts.' 
                            : 'Membangun sinergi teknologi bersama Diggity sebagai mitra korporasi/agensi, atau rekomendasikan klien potensial untuk meraih bagi hasil komisi hingga 10% nilai kontrak.'}
                    </p>
                </div>

                {/* 02. INTERACTIVE TAB SELECTOR */}
                <div className="flex justify-center">
                    <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border shadow-sm">
                        <button
                            onClick={() => {
                                setActiveTab('b2b');
                                setStatus('idle');
                            }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                                activeTab === 'b2b'
                                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                                    : 'text-text-gray hover:text-text-main'
                            }`}
                        >
                            <Building2 className="w-4 h-4" />
                            {locale === 'en' ? 'Program Kemitraan (B2B)' : '1. Program Kemitraan (B2B)'}
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('referral');
                                setStatus('idle');
                            }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                                activeTab === 'referral'
                                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                                    : 'text-text-gray hover:text-text-main'
                            }`}
                        >
                            <DollarSign className="w-4 h-4" />
                            {locale === 'en' ? 'Program Referral (Komisi)' : '2. Program Referral (Komisi)'}
                        </button>
                    </div>
                </div>

                {/* ========================================================
                    TAB 1: PROGRAM KEMITRAAN (B2B & INSTITUSI)
                    ======================================================== */}
                {activeTab === 'b2b' && (
                    <div className="space-y-16 animate-in fade-in duration-300">
                        {/* 4 Pillars of B2B Partnership */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: Handshake,
                                    title: 'Kemitraan Strategis',
                                    target: 'Korporasi & Startup Skala Menengah',
                                    desc: 'Sinergi pengerjaan proyek transformasi IT skala enterprise dengan model konsorsium atau co-delivery terpadu.'
                                },
                                {
                                    icon: Cpu,
                                    title: 'Kemitraan Teknologi & SaaS',
                                    target: 'ISV & Penyedia Solusi Cloud',
                                    desc: 'Integrasi modul Diggity HRIS / POS ke dalam API klien untuk menciptakan nilai tambah ekosistem produk digital.'
                                },
                                {
                                    icon: Users,
                                    title: 'White-Label Agency',
                                    target: 'Agensi Pemasaran & Desain Kreatif',
                                    desc: 'Akses tim software engineering teruji untuk mengerjakan pesanan aplikasi klien agensi Anda secara white-label.'
                                },
                                {
                                    icon: GraduationCap,
                                    title: 'Kemitraan Akademik & Kampus',
                                    target: 'Universitas, Politeknik, & SMK',
                                    desc: 'Penyelarasan kurikulum industri, fasilitasi magang bersertifikat, dan penyaluran lulusan ke jaringan industri Diggity.'
                                }
                            ].map((p, idx) => {
                                const Icon = p.icon;
                                return (
                                    <SpotlightCard key={idx} className="p-6 border border-glass-border bg-white dark:bg-glass-bg rounded-2xl flex flex-col justify-between">
                                        <div className="space-y-3">
                                            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-base font-extrabold text-text-main">{p.title}</h3>
                                            <p className="text-[11px] font-bold text-brand-blue">{p.target}</p>
                                            <p className="text-xs text-text-gray font-medium leading-relaxed">{p.desc}</p>
                                        </div>
                                    </SpotlightCard>
                                );
                            })}
                        </div>

                        {/* Alur Kemitraan (4 Tahap) */}
                        <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border">
                            <h3 className="text-xl md:text-2xl font-black text-text-main mb-6">
                                Alur Menjadi Mitra B2B Diggity
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    { step: '01', title: 'Kirim Proposal', desc: 'Isi formulir pengajuan dengan menjelaskan profil perusahaan dan rencana kerja sama.' },
                                    { step: '02', title: 'Diskusi Teknis', desc: 'Tim kemitraan Diggity menjadwalkan meeting penyelarasan lingkup kerja & kapabilitas.' },
                                    { step: '03', title: 'MoU & Perjanjian', desc: 'Penandatanganan nota kesepahaman resmi yang memuat hak, kewajiban, dan SLA layanan.' },
                                    { step: '04', title: 'Eksekusi Kolaborasi', desc: 'Proyek atau integrasi sistem mulai berjalan dengan pendampingan tim teknis Diggity.' }
                                ].map((s, idx) => (
                                    <div key={idx} className="space-y-2 border-l-2 md:border-l-0 md:border-t-2 border-brand-blue/30 pl-4 md:pl-0 md:pt-4">
                                        <span className="text-xs font-black text-brand-blue tracking-wider block">TAHAP {s.step}</span>
                                        <h4 className="text-sm font-extrabold text-text-main">{s.title}</h4>
                                        <p className="text-xs text-text-gray font-medium leading-relaxed">{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form B2B */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            <div className="lg:col-span-5 space-y-6">
                                <span className="text-xs font-black uppercase tracking-widest text-brand-blue block">PENGAJUAN MITRA</span>
                                <h2 className="text-2xl md:text-3xl font-black text-text-main">
                                    Diskusikan Peluang Kemitraan Strategis
                                </h2>
                                <p className="text-sm text-text-gray font-medium leading-relaxed">
                                    Kami membuka ruang kemitraan yang transparan dan saling menguntungkan. Tim Business Development kami akan meninjau dan merespons dalam 1–2 hari kerja.
                                </p>
                                <div className="space-y-3 pt-2">
                                    {[
                                        'Standar rekayasa software teruji & bersertifikasi ISO 27001',
                                        'Perjanjian kerahasiaan (Non-Disclosure Agreement / NDA) sebelum kick-off',
                                        'Dukungan dedicated project manager & tim teknis senior',
                                        'Model kerja sama modular (revenue share, subkontrak, atau lisensi)'
                                    ].map((pt, i) => (
                                        <div key={i} className="flex items-start gap-2.5 text-xs text-text-main font-medium">
                                            <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                                            <span>{pt}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-7">
                                <SpotlightCard className="p-8 md:p-10 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl shadow-sm">
                                    <h3 className="text-xl font-black text-text-main mb-6">Formulir Proposal Kemitraan B2B</h3>
                                    
                                    {status === 'success' ? (
                                        <div className="text-center py-10 space-y-4">
                                            <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mx-auto">
                                                <CheckCircle2 className="w-8 h-8" />
                                            </div>
                                            <h4 className="text-lg font-bold text-text-main">Proposal Terkirim!</h4>
                                            <p className="text-xs md:text-sm text-text-gray max-w-sm mx-auto leading-relaxed">{statusMessage}</p>
                                            <button
                                                onClick={() => setStatus('idle')}
                                                className="mt-4 px-6 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-brand-blue-hover transition-colors cursor-pointer"
                                            >
                                                Kirim Pengajuan Lainnya
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleB2BSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-text-gray uppercase tracking-wider block">Nama Anda</label>
                                                    <input 
                                                        type="text" 
                                                        required 
                                                        value={b2bData.name} 
                                                        onChange={(e) => setB2bData({ ...b2bData, name: e.target.value })}
                                                        placeholder="Nama Lengkap" 
                                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue transition-colors"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-text-gray uppercase tracking-wider block">Email Bisnis</label>
                                                    <input 
                                                        type="email" 
                                                        required 
                                                        value={b2bData.email} 
                                                        onChange={(e) => setB2bData({ ...b2bData, email: e.target.value })}
                                                        placeholder="name@company.com" 
                                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue transition-colors"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-text-gray uppercase tracking-wider block">No. WhatsApp</label>
                                                    <input 
                                                        type="tel" 
                                                        required 
                                                        value={b2bData.phone} 
                                                        onChange={(e) => setB2bData({ ...b2bData, phone: e.target.value })}
                                                        placeholder="08123456789" 
                                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue transition-colors"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-text-gray uppercase tracking-wider block">Perusahaan / Institusi</label>
                                                    <input 
                                                        type="text" 
                                                        required 
                                                        value={b2bData.company} 
                                                        onChange={(e) => setB2bData({ ...b2bData, company: e.target.value })}
                                                        placeholder="Nama Perusahaan / Kampus" 
                                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue transition-colors"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-text-gray uppercase tracking-wider block">Bentuk Kemitraan</label>
                                                <select
                                                    value={b2bData.partnershipType}
                                                    onChange={(e) => setB2bData({ ...b2bData, partnershipType: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue transition-colors cursor-pointer"
                                                >
                                                    <option value="Strategic Partnership">Kemitraan Strategis (Co-Development Proyek)</option>
                                                    <option value="Technology Partnership">Kemitraan Teknologi &amp; Integrasi SaaS</option>
                                                    <option value="Agency Partnership">White-Label Software untuk Agensi</option>
                                                    <option value="Academic Partnership">Kemitraan Kampus / Institusi Pendidikan</option>
                                                </select>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-text-gray uppercase tracking-wider block">Deskripsi Ide Kolaborasi</label>
                                                <textarea 
                                                    required 
                                                    rows={4} 
                                                    value={b2bData.message} 
                                                    onChange={(e) => setB2bData({ ...b2bData, message: e.target.value })}
                                                    placeholder="Jelaskan kebutuhan kerja sama, skala proyek, atau bentuk kolaborasi yang diharapkan..." 
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue transition-colors resize-none"
                                                />
                                            </div>

                                            {status === 'error' && (
                                                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-500 text-xs font-semibold">
                                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                                    <span>{statusMessage}</span>
                                                </div>
                                            )}

                                            <button 
                                                type="submit" 
                                                disabled={status === 'loading'}
                                                className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                                            >
                                                {status === 'loading' ? 'Mengirim Proposal...' : 'Kirim Proposal Kemitraan B2B'}
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
                    TAB 2: PROGRAM REFERRAL (AFILIASI KLIEN & KOMISI)
                    ======================================================== */}
                {activeTab === 'referral' && (
                    <div className="space-y-16 animate-in fade-in duration-300">
                        {/* Referral Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    value: 'Hingga 10%',
                                    label: 'Komisi Bagi Hasil',
                                    desc: 'Dihitung dari total nilai kontrak resmi proyek yang ditandatangani oleh klien referensi Anda.'
                                },
                                {
                                    value: 'Transparan',
                                    label: 'Tracking Progres Klien',
                                    desc: 'Anda akan menerima konfirmasi dan update status berkala sejak pitch awal hingga closing kontrak.'
                                },
                                {
                                    value: 'Fleksibel',
                                    label: 'Siapa Saja Bisa Ikut',
                                    desc: 'Terbuka untuk freelancer, mahasiswa, konsultan bisnis, maupun profesional tanpa ikatan kontrak eksklusif.'
                                }
                            ].map((c, idx) => (
                                <SpotlightCard key={idx} className="p-8 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl text-center">
                                    <div className="text-3xl md:text-4xl font-black text-brand-blue mb-2">{c.value}</div>
                                    <h4 className="text-sm font-extrabold text-text-main mb-2">{c.label}</h4>
                                    <p className="text-xs text-text-gray font-medium leading-relaxed">{c.desc}</p>
                                </SpotlightCard>
                            ))}
                        </div>

                        {/* Alur Program Referral */}
                        <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border">
                            <h3 className="text-xl md:text-2xl font-black text-text-main mb-6">
                                Cara Kerja &amp; Alur Pembayaran Komisi Referral
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    { step: '01', title: 'Submit Lead Klien', desc: 'Isi formulir referral dengan informasi kontak prospek klien yang membutuhkan solusi digital.' },
                                    { step: '02', title: 'Follow-up oleh Diggity', desc: 'Konsultan teknis Diggity menghubungi klien, menyusun proposal solusi, dan melakukan demo.' },
                                    { step: '03', title: 'Closing & Kontrak', desc: 'Klien menandatangani kontrak kerja sama dan membayarkan termin awal proyek.' },
                                    { step: '04', title: 'Pencairan Komisi', desc: 'Komisi bagi hasil ditransfer langsung ke rekening bank Anda secara transparan.' }
                                ].map((s, idx) => (
                                    <div key={idx} className="space-y-2 border-l-2 md:border-l-0 md:border-t-2 border-brand-blue/30 pl-4 md:pl-0 md:pt-4">
                                        <span className="text-xs font-black text-brand-blue tracking-wider block">LANGKAH {s.step}</span>
                                        <h4 className="text-sm font-extrabold text-text-main">{s.title}</h4>
                                        <p className="text-xs text-text-gray font-medium leading-relaxed">{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Referral */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            <div className="lg:col-span-5 space-y-6">
                                <span className="text-xs font-black uppercase tracking-widest text-brand-blue block">DAFTARKAN KLIEN</span>
                                <h2 className="text-2xl md:text-3xl font-black text-text-main">
                                    Punya Teman atau Kolega yang Butuh Solusi Digital?
                                </h2>
                                <p className="text-sm text-text-gray font-medium leading-relaxed">
                                    Cukup hubungkan kami dengan pengambil keputusan (decision maker) di perusahaan mereka. Tim Diggity akan menangani seluruh proses konsultasi, teknis, dan negosiasi komersial.
                                </p>
                                <div className="p-5 rounded-2xl bg-brand-blue/5 border border-brand-blue/20 space-y-2">
                                    <div className="flex items-center gap-2 font-bold text-xs text-brand-blue uppercase tracking-wider">
                                        <ShieldCheck className="w-4 h-4" /> Komitmen Integritas
                                    </div>
                                    <p className="text-xs text-text-gray font-medium leading-relaxed">
                                        Identitas pengirim referral dijaga kerahasiaannya apabila diminta, dan persentase komisi akan dituangkan dalam surat konfirmasi resmi sebelum penagihan termin klien.
                                    </p>
                                </div>
                            </div>

                            <div className="lg:col-span-7">
                                <SpotlightCard className="p-8 md:p-10 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl shadow-sm">
                                    <h3 className="text-xl font-black text-text-main mb-6">Formulir Rekomendasi Klien (Referral)</h3>
                                    
                                    {status === 'success' ? (
                                        <div className="text-center py-10 space-y-4">
                                            <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mx-auto">
                                                <CheckCircle2 className="w-8 h-8" />
                                            </div>
                                            <h4 className="text-lg font-bold text-text-main">Data Referral Diterima!</h4>
                                            <p className="text-xs md:text-sm text-text-gray max-w-sm mx-auto leading-relaxed">{statusMessage}</p>
                                            <button
                                                onClick={() => setStatus('idle')}
                                                className="mt-4 px-6 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-brand-blue-hover transition-colors cursor-pointer"
                                            >
                                                Rekomendasikan Klien Lain
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleReferralSubmit} className="space-y-4">
                                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-glass-border space-y-3">
                                                <span className="text-[11px] font-black uppercase text-brand-blue tracking-wider block">INFORMASI ANDA (PENGIRIM REFERRAL)</span>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-[11px] font-bold text-text-gray block mb-1">Nama Lengkap Anda</label>
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            value={referralData.referrerName} 
                                                            onChange={(e) => setReferralData({ ...referralData, referrerName: e.target.value })}
                                                            placeholder="Nama Anda" 
                                                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[11px] font-bold text-text-gray block mb-1">No. WhatsApp / Email Anda</label>
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            value={referralData.referrerContact} 
                                                            onChange={(e) => setReferralData({ ...referralData, referrerContact: e.target.value })}
                                                            placeholder="08123456789 atau email" 
                                                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-glass-border space-y-3">
                                                <span className="text-[11px] font-black uppercase text-brand-blue tracking-wider block">INFORMASI CALON KLIEN PROSPEKTIF</span>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-[11px] font-bold text-text-gray block mb-1">Nama Kontak Prospek</label>
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            value={referralData.clientName} 
                                                            onChange={(e) => setReferralData({ ...referralData, clientName: e.target.value })}
                                                            placeholder="Nama PIC / Decision Maker" 
                                                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[11px] font-bold text-text-gray block mb-1">Nama Perusahaan Prospek</label>
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            value={referralData.clientCompany} 
                                                            onChange={(e) => setReferralData({ ...referralData, clientCompany: e.target.value })}
                                                            placeholder="PT / CV / Brand Klien" 
                                                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[11px] font-bold text-text-gray block mb-1">No. WhatsApp / Email Klien</label>
                                                    <input 
                                                        type="text" 
                                                        required 
                                                        value={referralData.clientContact} 
                                                        onChange={(e) => setReferralData({ ...referralData, clientContact: e.target.value })}
                                                        placeholder="Kontak yang dapat dihubungi tim kami" 
                                                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-glass-bg border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-text-gray uppercase tracking-wider block">Kebutuhan Solusi Klien</label>
                                                <select
                                                    value={referralData.serviceNeeded}
                                                    onChange={(e) => setReferralData({ ...referralData, serviceNeeded: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue transition-colors cursor-pointer"
                                                >
                                                    <option value="Custom Software Development">Pembuatan Aplikasi Kustom (Web / Mobile / ERP)</option>
                                                    <option value="Diggity HRIS / POS SaaS">Implementasi Diggity HRIS / POS SaaS</option>
                                                    <option value="Digital Marketing & Performance Ads">Digital Marketing &amp; Performance Ads</option>
                                                    <option value="Corporate Tech Training & Academy">Pelatihan Teknologi Karyawan (Diggity Academy)</option>
                                                </select>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-text-gray uppercase tracking-wider block">Catatan Tambahan (Opsional)</label>
                                                <textarea 
                                                    rows={3} 
                                                    value={referralData.projectEstimatedScope} 
                                                    onChange={(e) => setReferralData({ ...referralData, projectEstimatedScope: e.target.value })}
                                                    placeholder="Ceritakan gambaran singkat kebutuhan klien atau preferensi waktu follow up..." 
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-glass-border text-xs text-text-main outline-none focus:border-brand-blue transition-colors resize-none"
                                                />
                                            </div>

                                            {status === 'error' && (
                                                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-500 text-xs font-semibold">
                                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                                    <span>{statusMessage}</span>
                                                </div>
                                            )}

                                            <button 
                                                type="submit" 
                                                disabled={status === 'loading'}
                                                className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                                            >
                                                {status === 'loading' ? 'Mendaftarkan Referral...' : 'Daftarkan Prospek Klien (Raih Komisi)'}
                                                <Send className="w-3.5 h-3.5" />
                                            </button>
                                        </form>
                                    )}
                                </SpotlightCard>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
