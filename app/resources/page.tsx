'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Download, 
    ArrowLeft, 
    ArrowRight, 
    Sparkles, 
    BookOpen, 
    Layers, 
    Code2, 
    CheckCircle2, 
    AlertCircle, 
    Loader2, 
    X,
    ShieldCheck
} from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';
import { api } from '../../lib/api';
import { useLanguage } from '../../context/LanguageContext';

interface ResourceItem {
    id: string;
    title: string;
    description: string;
    type: string;
    size: string;
    icon: React.ElementType;
    downloadUrl: string;
    benefits: string[];
}

export default function FreeResourcesPage() {
    const { language: locale } = useLanguage();
    const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
    });
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resources: ResourceItem[] = [
        {
            id: 'it-audit',
            title: 'IT Audit & Security Compliance Checklist',
            description: locale === 'en' ? 'Standard guide document for cloud infrastructure and web/mobile application security audits. Helps your tech team prepare for industry compliance standards (SOC2, ISO 27001, GDPR).' : 'Dokumen panduan standar audit keamanan infrastruktur cloud dan aplikasi web/mobile. Membantu tim teknologi kawan bersiap menghadapi standar kepatuhan industri (SOC2, ISO 27001, GDPR).',
            type: locale === 'en' ? 'PDF & Excel Guide' : 'Panduan PDF & Excel',
            size: '2.4 MB',
            icon: ShieldCheck,
            downloadUrl: '#',
            benefits: [
                locale === 'en' ? '50+ Cloud infrastructure assessment points' : '50+ Poin penilaian infrastruktur cloud',
                locale === 'en' ? 'Internal security policy document templates' : 'Template dokumen kebijakan keamanan internal',
                locale === 'en' ? 'Data encryption & credential access audit standards' : 'Standar audit enkripsi data & akses credential'
            ]
        },
        {
            id: 'saas-ui-kit',
            title: 'SaaS Dashboard Figma Wireframe Kit',
            description: locale === 'en' ? 'Hundreds of ready-to-use SaaS admin panel UI components, icons, charts, and page layouts in Figma. Speeds up the wireframing and interface design process of your application.' : 'Ratusan komponen UI, ikon, bagan, dan layout halaman admin panel SaaS siap pakai di Figma. Mempercepat proses wireframing dan perancangan desain antarmuka aplikasi kawan.',
            type: locale === 'en' ? 'UI Kit File (.fig)' : 'Berkas UI Kit (.fig)',
            size: '12.8 MB',
            icon: Layers,
            downloadUrl: '#',
            benefits: [
                locale === 'en' ? 'Responsive components (Auto Layout 5.0)' : 'Komponen responsif (Auto Layout 5.0)',
                locale === 'en' ? '15+ Modular dashboard page frameworks' : '15+ Kerangka halaman dashboard modular',
                locale === 'en' ? 'Global typography system and color palette' : 'Sistem tipografi dan palet warna global'
            ]
        },
        {
            id: 'laravel-boilerplate',
            title: 'Laravel 11 & Next.js 16 SaaS Starter Boilerplate',
            description: locale === 'en' ? 'Ready-to-use boilerplate code for SaaS projects. Fully integrated with login system, Stripe/Midtrans subscription management, PostgreSQL database, and basic admin dashboard.' : 'Kode boilerplate siap pakai untuk proyek SaaS. Terintegrasi penuh dengan sistem login, manajemen langganan Stripe/Midtrans, database PostgreSQL, dan dasbor admin dasar.',
            type: locale === 'en' ? 'Code Repository (ZIP)' : 'Repositori Kode (ZIP)',
            size: '4.2 MB',
            icon: Code2,
            downloadUrl: '#',
            benefits: [
                locale === 'en' ? 'RESTful API Architecture & Next.js Server Components' : 'Arsitektur RESTful API & Next.js Server Components',
                locale === 'en' ? 'JWT Authentication & Role Permission Setup' : 'Setup autentikasi JWT & Role Permission',
                locale === 'en' ? 'Docker Configuration & Vercel Deploy script' : 'Konfigurasi Docker & Deploy script Vercel'
            ]
        }
    ];

    const handleOpenModal = (resource: ResourceItem) => {
        setSelectedResource(resource);
        setSuccess(false);
        setError(null);
        setIsModalOpen(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedResource) return;

        setLoading(true);
        setError(null);

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                service: 'Free Resource Download',
                message: locale === 'en' ? `Downloading resource: ${selectedResource.title} (ID: ${selectedResource.id})` : `Mendownload resource: ${selectedResource.title} (ID: ${selectedResource.id})`,
            };

            await api.submitLead(payload);
            setSuccess(true);

            // Simulating a real file download trigger
            setTimeout(() => {
                alert(locale === 'en' ? `Download started automatically: ${selectedResource.title}` : `Unduhan dimulai otomatis: ${selectedResource.title}`);
            }, 500);

        } catch (err: any) {
            console.error('Resource download lead submission error:', err);
            setError(err.message || (locale === 'en' ? 'Failed to process download request. Please try again.' : 'Gagal memproses permintaan unduhan kawan. Silakan coba lagi.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden text-left">
            {/* Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Back Button */}
                <div className="flex items-center">
                    <Link 
                        href="/insights"
                        className="inline-flex items-center gap-2 text-xs font-bold text-text-gray hover:text-brand-blue transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                        {locale === 'en' ? 'Back to Insights & Education' : 'Kembali ke Wawasan & Edukasi'}
                    </Link>
                </div>

                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-main leading-tight">
                        {locale === 'en' ? 'Digital Resources ' : 'Resource Digital '} <span className="text-brand-blue">{locale === 'en' ? 'Free' : 'Gratis'}</span> {locale === 'en' ? 'for You' : 'untuk Anda'}
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        {locale === 'en' ? 'Download premium e-books, technical guides, and free ready-to-use design templates curated by the Diggity technology expert team.' : 'Unduh e-book premium, panduan teknis, dan template desain siap pakai gratis yang dikurasi oleh tim ahli teknologi Diggity.'}
                    </p>
                </div>

                {/* Grid list of resources */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {resources.map((res) => {
                        const Icon = res.icon;
                        return (
                            <SpotlightCard 
                                key={res.id}
                                className="p-8 border border-glass-border bg-glass-bg/60 rounded-3xl flex flex-col justify-between h-full"
                            >
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-3">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] uppercase font-black text-text-muted tracking-wider block">
                                            {res.type} &bull; {res.size}
                                        </span>
                                        <h3 className="text-lg font-black text-text-main leading-snug">{res.title}</h3>
                                        <p className="text-xs text-text-gray font-medium leading-relaxed pt-1">
                                            {res.description}
                                        </p>
                                    </div>

                                    {/* Features Checkpoints */}
                                    <div className="border-t border-glass-border/60 pt-5 space-y-3">
                                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">{locale === 'en' ? 'What you get:' : 'Yang kawan dapatkan:'}</span>
                                        <ul className="space-y-2 list-none m-0 p-0 text-xs text-text-gray font-medium">
                                            {res.benefits.map((b, idx) => (
                                                <li key={idx} className="flex items-start space-x-2">
                                                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button
                                        onClick={() => handleOpenModal(res)}
                                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-xs font-bold bg-brand-blue hover:bg-brand-blue-dark text-white shadow-md shadow-brand-blue/15 hover:scale-[1.01] transition-all cursor-pointer"
                                    >
                                        <Download className="w-4 h-4" />
                                        {locale === 'en' ? 'Download for Free Now' : 'Unduh Gratis Sekarang'}
                                    </button>
                                </div>
                            </SpotlightCard>
                        );
                    })}
                </div>

            </div>

            {/* Leads Modal Popup */}
            {isModalOpen && selectedResource && (
                <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
                    <div className="relative w-full max-w-lg bg-brand-bg border border-glass-border rounded-3xl p-8 shadow-2xl space-y-6 text-left animate-in slide-in-from-bottom-4 duration-300">
                        {/* Close button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 p-1.5 rounded-lg border border-glass-border hover:bg-glass-bg transition-colors text-text-gray hover:text-text-main cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="space-y-2">
                            <span className="inline-block px-2.5 py-0.5 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[9px] font-bold uppercase tracking-wider rounded-md">
                                {locale === 'en' ? 'Download Access Form' : 'Formulir Akses Unduhan'}
                            </span>
                            <h3 className="text-xl font-extrabold text-text-main pr-8">{selectedResource.title}</h3>
                            <p className="text-xs text-text-gray font-medium leading-relaxed">
                                {locale === 'en' ? 'Please fill out this short form. The file download link will automatically open after you submit the data.' : 'Silakan isi formulir singkat berikut kawan. Tautan unduhan file akan langsung terbuka otomatis setelah kawan mengirimkan data.'}
                            </p>
                        </div>

                        {success ? (
                            <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
                                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-base font-bold text-text-main">{locale === 'en' ? 'Data Verified Successfully!' : 'Data Terverifikasi Sukses!'}</h4>
                                    <p className="text-xs text-text-gray max-w-sm mx-auto leading-relaxed">
                                        {locale === 'en' ? 'Thank you. Click the button below if the file does not download automatically in your browser.' : 'Terima kasih kawan. Klik tombol di bawah ini jika file tidak terunduh secara otomatis di browser kawan.'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                    }}
                                    className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-xs font-bold shadow-md shadow-brand-blue/15 cursor-pointer"
                                >
                                    {locale === 'en' ? 'Done & Close' : 'Selesai & Tutup'}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-semibold flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider">{locale === 'en' ? 'Full Name' : 'Nama Lengkap'}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={locale === 'en' ? 'Enter your full name' : 'Masukkan nama lengkap Anda'}
                                        className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider">{locale === 'en' ? 'Company Name' : 'Nama Perusahaan'}</label>
                                    <input
                                        type="text"
                                        name="company"
                                        required
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder={locale === 'en' ? 'Example: Diggity Agency' : 'Contoh: Diggity Agensi'}
                                        className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider">{locale === 'en' ? 'Business Email' : 'Email Bisnis'}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="contoh@perusahaan.com"
                                            className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider">{locale === 'en' ? 'WhatsApp No.' : 'No. WhatsApp'}</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="0812xxxxxx"
                                            className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-blue/15 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>{locale === 'en' ? 'Preparing Download...' : 'Mempersiapkan Unduhan...'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4" />
                                            <span>{locale === 'en' ? 'Submit & Open File' : 'Kirim & Buka File'}</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
