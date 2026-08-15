'use client';

import React, { useState } from 'react';
import { api } from '../../lib/api';
import { useLanguage } from '../../context/LanguageContext';
import { executeRecaptcha } from '../../lib/recaptcha';
import SpotlightCard from '../../components/SpotlightCard';
import { Handshake, Users, Cpu, DollarSign, CheckCircle2, Send, AlertCircle } from 'lucide-react';

export default function PartnershipPage() {
    const { language } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        partnershipType: 'Strategic Partnership',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const partnershipTypes = [
        { id: 'Strategic Partnership', name: language === 'en' ? 'Strategic Partnership' : 'Kemitraan Strategis' },
        { id: 'Technology Partnership', name: language === 'en' ? 'Technology Partnership' : 'Kemitraan Teknologi' },
        { id: 'Agency Partnership', name: language === 'en' ? 'Agency Partnership' : 'Kemitraan Agency / Subkontrak' },
        { id: 'Referral Program', name: language === 'en' ? 'Referral / Affiliate Program' : 'Program Referral & Komisi' }
    ];

    const pillars = [
        {
            icon: Handshake,
            title: language === 'en' ? 'Strategic Partnership' : 'Kemitraan Strategis',
            desc: language === 'en' 
                ? 'Co-deliver end-to-end IT development and creative marketing projects. Expand service boundaries for mutual enterprise clients.' 
                : 'Kolaborasi bersama Diggity untuk menghadirkan proyek IT & pemasaran terpadu skala besar guna memperluas batas kapasitas layanan.',
        },
        {
            icon: Cpu,
            title: language === 'en' ? 'Technology Partnership' : 'Kemitraan Teknologi',
            desc: language === 'en' 
                ? 'Integrate SaaS, APIs, or digital products. Co-build core tools, plugins, and cloud orchestrations that scale businesses.' 
                : 'Integrasi sistem SaaS, API, atau produk digital. Ikut membangun perkakas inti, plugin, serta otomatisasi arsitektur cloud server.',
        },
        {
            icon: Users,
            title: language === 'en' ? 'Agency Partnership' : 'Kemitraan Agency',
            desc: language === 'en' 
                ? 'Access white-label development and performance marketing resources. Scale your delivery capability without scaling overhead.' 
                : 'Dukungan subkontrak pengerjaan rekayasa software dan periklanan digital secara white-label untuk menaikkan kapasitas produksi agensi Anda.',
        },
        {
            icon: DollarSign,
            title: language === 'en' ? 'Referral Program' : 'Program Referral',
            desc: language === 'en' 
                ? 'Introduce clients to Diggity and earn up to 10% commission on the signed contract value. Fast, transparent payout system.' 
                : 'Rekomendasikan klien baru yang membutuhkan solusi teknologi/kreatif ke Diggity dan dapatkan bagi hasil komisi hingga 10% nilai proyek.',
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const recaptchaToken = await executeRecaptcha('partnership');
            await api.submitLead({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                service: `Partnership - ${formData.partnershipType}`,
                message: formData.message,
                recaptcha_token: recaptchaToken
            });
            setStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                partnershipType: 'Strategic Partnership',
                message: '',
            });
            setStatusMessage(
                language === 'en'
                    ? 'Your partnership proposal has been submitted successfully! Our team will contact you soon.'
                    : 'Proposal kemitraan Anda berhasil dikirim! Tim kemitraan kami akan segera menghubungi Anda.'
            );
        } catch (err: any) {
            setStatus('error');
            setStatusMessage(
                err.message || 
                (language === 'en' 
                    ? 'Failed to submit proposal. Please try again.' 
                    : 'Gagal mengirim proposal. Silakan coba kembali.')
            );
        }
    };

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden text-left">
            {/* Spotlight glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-24">
                
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight pt-2">
                        {language === 'en' ? 'Partnership & Referral' : 'Program Kemitraan & Referral'}
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium leading-relaxed max-w-2xl mx-auto">
                        {language === 'en' 
                            ? 'Build high-quality digital products, expand service boundaries, or refer clients to unlock revenue sharing.' 
                            : 'Membangun produk digital berkualitas tinggi, memperluas cakupan layanan, atau merekomendasikan klien baru untuk membuka potensi bagi hasil.'}
                    </p>
                </div>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((p, idx) => {
                        const Icon = p.icon;
                        return (
                            <SpotlightCard key={idx} className="p-6 flex flex-col justify-between border border-glass-border bg-glass-bg/40 h-full min-h-[220px]">
                                <div className="space-y-4">
                                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <h3 className="text-base font-extrabold text-text-main leading-tight">{p.title}</h3>
                                        <p className="text-xs text-text-gray font-medium leading-relaxed">{p.desc}</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        );
                    })}
                </div>

                {/* Content & Form Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Benefits Column */}
                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
                        <div className="space-y-3">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest block">
                                {language === 'en' ? 'PARTNER BENEFITS' : 'KEUNTUNGAN MITRA'}
                            </span>
                            <h2 className="text-2xl md:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
                                {language === 'en' ? 'Why Partner with Diggity?' : 'Mengapa Bermitra dengan Diggity?'}
                            </h2>
                        </div>
                        
                        <p className="text-text-gray text-sm md:text-base leading-relaxed">
                            {language === 'en'
                                ? 'We combine modern technology stacks, creative design, and business-driven growth marketing to deliver exceptional ROI for clients.'
                                : 'Kami menggabungkan rekayasa teknologi modern, desain visual berestetika tinggi, dan strategi growth marketing terarah untuk memberikan ROI terbaik bagi klien.'}
                        </p>

                        <div className="space-y-4">
                            {[
                                language === 'en' ? 'High project success rate with strict QA control' : 'Success rate proyek yang tinggi dengan kontrol QA yang ketat',
                                language === 'en' ? 'Transparent tracking for client referrals & payouts' : 'Pencatatan referral klien & pembayaran bagi hasil yang transparan',
                                language === 'en' ? 'Access to experienced software developers & marketers' : 'Akses ke tim pengembang software & pemasar digital berpengalaman',
                                language === 'en' ? 'Modular contract terms tailored for mutual benefit' : 'Kontrak kerja sama modular yang dirancang saling menguntungkan'
                            ].map((benefit, bIdx) => (
                                <div key={bIdx} className="flex items-start space-x-3 text-xs text-text-main font-medium">
                                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue shrink-0 mt-0.5" />
                                    <span className="leading-snug">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Proposal Form Column */}
                    <div className="lg:col-span-7 w-full">
                        <SpotlightCard className="p-8 md:p-10 border border-glass-border bg-glass-bg/60">
                            <h3 className="text-2xl font-bold text-text-main mb-6">
                                {language === 'en' ? 'Partnership Proposal' : 'Ajukan Proposal Kemitraan'}
                            </h3>

                            {status === 'success' ? (
                                <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-text-main">
                                        {language === 'en' ? 'Proposal Sent!' : 'Proposal Terkirim!'}
                                    </h4>
                                    <p className="text-sm text-text-gray max-w-sm">{statusMessage}</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-6 px-6 py-2.5 text-sm font-semibold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors cursor-pointer"
                                    >
                                        {language === 'en' ? 'Send Another Proposal' : 'Kirim Proposal Lain'}
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-extrabold text-text-main uppercase tracking-wider block">
                                                {language === 'en' ? 'Your Name' : 'Nama Anda'}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder={language === 'en' ? 'e.g. John Doe' : 'Nama Lengkap Anda'}
                                                className="w-full px-4 py-3 bg-brand-bg/50 border border-glass-border rounded-xl text-xs text-text-main placeholder-text-muted focus:outline-none focus:border-brand-blue transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-extrabold text-text-main uppercase tracking-wider block">
                                                {language === 'en' ? 'Business Email' : 'Email Bisnis'}
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="name@company.com"
                                                className="w-full px-4 py-3 bg-brand-bg/50 border border-glass-border rounded-xl text-xs text-text-main placeholder-text-muted focus:outline-none focus:border-brand-blue transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-extrabold text-text-main uppercase tracking-wider block">
                                                {language === 'en' ? 'WhatsApp Number' : 'No. WhatsApp'}
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="08123456789"
                                                className="w-full px-4 py-3 bg-brand-bg/50 border border-glass-border rounded-xl text-xs text-text-main placeholder-text-muted focus:outline-none focus:border-brand-blue transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-extrabold text-text-main uppercase tracking-wider block">
                                                {language === 'en' ? 'Company Name' : 'Nama Perusahaan'}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                placeholder={language === 'en' ? 'e.g. PT Maju Bersama' : 'Nama Perusahaan/Agensi'}
                                                className="w-full px-4 py-3 bg-brand-bg/50 border border-glass-border rounded-xl text-xs text-text-main placeholder-text-muted focus:outline-none focus:border-brand-blue transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-extrabold text-text-main uppercase tracking-wider block">
                                            {language === 'en' ? 'Partnership Category' : 'Kategori Kemitraan'}
                                        </label>
                                        <select
                                            value={formData.partnershipType}
                                            onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                                            className="w-full px-4 py-3 bg-brand-bg/95 border border-glass-border rounded-xl text-xs text-text-main focus:outline-none focus:border-brand-blue transition-colors cursor-pointer appearance-none"
                                            style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7 9l3 3 3-3' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem', backgroundRepeat: 'no-repeat' }}
                                        >
                                            {partnershipTypes.map((type) => (
                                                <option key={type.id} value={type.id} className="bg-brand-bg">
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-extrabold text-text-main uppercase tracking-wider block">
                                            {language === 'en' ? 'Message / Collaboration Idea' : 'Pesan / Ide Kerja Sama'}
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder={language === 'en' ? 'Describe your business model and partnership idea...' : 'Jelaskan model bisnis Anda dan ide kerja sama yang ingin dilakukan...'}
                                            className="w-full px-4 py-3 bg-brand-bg/50 border border-glass-border rounded-xl text-xs text-text-main placeholder-text-muted focus:outline-none focus:border-brand-blue transition-colors resize-none"
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="flex items-center space-x-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            <span>{statusMessage}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue-dark transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-brand-blue/15"
                                    >
                                        {status === 'loading' ? (
                                            language === 'en' ? 'Submitting...' : 'Mengirim...'
                                        ) : (
                                            <>
                                                {language === 'en' ? 'Submit Proposal' : 'Kirim Proposal'}
                                                <Send className="w-3.5 h-3.5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </SpotlightCard>
                    </div>

                </div>

            </div>
        </div>
    );
}
