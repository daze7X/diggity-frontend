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
            description: 'Dokumen panduan standar audit keamanan infrastruktur cloud dan aplikasi web/mobile. Membantu tim teknologi kawan bersiap menghadapi standar kepatuhan industri (SOC2, ISO 27001, GDPR).',
            type: 'Panduan PDF & Excel',
            size: '2.4 MB',
            icon: ShieldCheck,
            downloadUrl: '#',
            benefits: [
                '50+ Poin penilaian infrastruktur cloud',
                'Template dokumen kebijakan keamanan internal',
                'Standar audit enkripsi data & akses credential'
            ]
        },
        {
            id: 'saas-ui-kit',
            title: 'SaaS Dashboard Figma Wireframe Kit',
            description: 'Ratusan komponen UI, ikon, bagan, dan layout halaman admin panel SaaS siap pakai di Figma. Mempercepat proses wireframing dan perancangan desain antarmuka aplikasi kawan.',
            type: 'Berkas UI Kit (.fig)',
            size: '12.8 MB',
            icon: Layers,
            downloadUrl: '#',
            benefits: [
                'Komponen responsif (Auto Layout 5.0)',
                '15+ Kerangka halaman dashboard modular',
                'Sistem tipografi dan palet warna global'
            ]
        },
        {
            id: 'laravel-boilerplate',
            title: 'Laravel 11 & Next.js 16 SaaS Starter Boilerplate',
            description: 'Kode boilerplate siap pakai untuk proyek SaaS. Terintegrasi penuh dengan sistem login, manajemen langganan Stripe/Midtrans, database PostgreSQL, dan dasbor admin dasar.',
            type: 'Repositori Kode (ZIP)',
            size: '4.2 MB',
            icon: Code2,
            downloadUrl: '#',
            benefits: [
                'Arsitektur RESTful API & Next.js Server Components',
                'Setup autentikasi JWT & Role Permission',
                'Konfigurasi Docker & Deploy script Vercel'
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
                message: `Mendownload resource: ${selectedResource.title} (ID: ${selectedResource.id})`,
            };

            await api.submitLead(payload);
            setSuccess(true);

            // Simulating a real file download trigger
            setTimeout(() => {
                alert(`Unduhan dimulai otomatis: ${selectedResource.title}`);
            }, 500);

        } catch (err: any) {
            console.error('Resource download lead submission error:', err);
            setError(err.message || 'Gagal memproses permintaan unduhan kawan. Silakan coba lagi.');
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
                        Kembali ke Wawasan & Edukasi
                    </Link>
                </div>

                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-main leading-tight">
                        Resource Digital <span className="text-brand-blue">Gratis</span> untuk Anda
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        Unduh e-book premium, panduan teknis, dan template desain siap pakai gratis yang dikurasi oleh tim ahli teknologi Diggity.
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
                                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Yang kawan dapatkan:</span>
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
                                        Unduh Gratis Sekarang
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
                                Formulir Akses Unduhan
                            </span>
                            <h3 className="text-xl font-extrabold text-text-main pr-8">{selectedResource.title}</h3>
                            <p className="text-xs text-text-gray font-medium leading-relaxed">
                                Silakan isi formulir singkat berikut kawan. Tautan unduhan file akan langsung terbuka otomatis setelah kawan mengirimkan data.
                            </p>
                        </div>

                        {success ? (
                            <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
                                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-base font-bold text-text-main">Data Terverifikasi Sukses!</h4>
                                    <p className="text-xs text-text-gray max-w-sm mx-auto leading-relaxed">
                                        Terima kasih kawan. Klik tombol di bawah ini jika file tidak terunduh secara otomatis di browser kawan.
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                    }}
                                    className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-xs font-bold shadow-md shadow-brand-blue/15 cursor-pointer"
                                >
                                    Selesai &amp; Tutup
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
                                    <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Masukkan nama lengkap Anda"
                                        className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider">Nama Perusahaan</label>
                                    <input
                                        type="text"
                                        name="company"
                                        required
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Contoh: Diggity Agensi"
                                        className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider">Email Bisnis</label>
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
                                        <label className="text-[10px] font-bold text-text-gray uppercase tracking-wider">No. WhatsApp</label>
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
                                            <span>Mempersiapkan Unduhan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4" />
                                            <span>Kirim &amp; Buka File</span>
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
