'use client';

import React, { useState } from 'react';
import { api } from '../lib/api';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface B2bInquiryFormProps {
    defaultService: 'IT Headhunting' | 'IT Outsourcing' | 'IT Talent Sourcing';
}

export default function B2bInquiryForm({ defaultService }: B2bInquiryFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: defaultService,
        talentCount: '1-2',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Custom validation
        if (!formData.name || !formData.company || !formData.email || !formData.phone || !formData.message) {
            setError('Semua kolom wajib diisi kawan.');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                service: formData.service,
                message: `[Kebutuhan Talenta: ${formData.talentCount}] ${formData.message}`,
            };

            await api.submitLead(payload);
            setSuccess(true);
        } catch (err: any) {
            console.error('B2B Lead submission error:', err);
            setError(err.message || 'Gagal mengirim data. Silakan coba lagi kawan.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center p-8 space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-text-main">Permintaan Terkirim!</h3>
                <p className="text-sm text-text-gray max-w-sm mx-auto leading-relaxed">
                    Terima kasih kawan. Permintaan konsultasi B2B Anda telah kami terima. Tim Konsultan IT kami akan menghubungi Anda kembali dalam kurun waktu 1x24 jam kerja.
                </p>
                <button
                    onClick={() => {
                        setSuccess(false);
                        setFormData({
                            name: '',
                            company: '',
                            email: '',
                            phone: '',
                            service: defaultService,
                            talentCount: '1-2',
                            message: '',
                        });
                    }}
                    className="mt-2 text-xs font-bold text-brand-blue hover:text-brand-blue-dark transition-colors"
                >
                    Kirim Permintaan Baru
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-1">
                    <label className="text-[11px] font-bold text-text-gray uppercase tracking-wider">Nama Kontak</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama lengkap"
                        className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main"
                    />
                </div>
                <div className="space-y-1.5 col-span-1">
                    <label className="text-[11px] font-bold text-text-gray uppercase tracking-wider">Nama Perusahaan</label>
                    <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nama perusahaan Anda"
                        className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-1">
                    <label className="text-[11px] font-bold text-text-gray uppercase tracking-wider">Email Bisnis</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contoh@perusahaan.com"
                        className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main"
                    />
                </div>
                <div className="space-y-1.5 col-span-1">
                    <label className="text-[11px] font-bold text-text-gray uppercase tracking-wider">Nomor Telepon / WhatsApp</label>
                    <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0812xxxxxx"
                        className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-1">
                    <label className="text-[11px] font-bold text-text-gray uppercase tracking-wider">Layanan yang Dibutuhkan</label>
                    <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main appearance-none cursor-pointer"
                    >
                        <option value="IT Headhunting" className="bg-neutral-900 text-white">IT Headhunting</option>
                        <option value="IT Outsourcing" className="bg-neutral-900 text-white">IT Outsourcing</option>
                        <option value="IT Talent Sourcing" className="bg-neutral-900 text-white">Job Connect / Sourcing</option>
                    </select>
                </div>
                <div className="space-y-1.5 col-span-1">
                    <label className="text-[11px] font-bold text-text-gray uppercase tracking-wider">Estimasi Jumlah Talenta</label>
                    <select
                        name="talentCount"
                        value={formData.talentCount}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main appearance-none cursor-pointer"
                    >
                        <option value="1-2" className="bg-neutral-900 text-white">1 - 2 Orang</option>
                        <option value="3-5" className="bg-neutral-900 text-white">3 - 5 Orang</option>
                        <option value="6-10" className="bg-neutral-900 text-white">6 - 10 Orang</option>
                        <option value="10+" className="bg-neutral-900 text-white">&gt; 10 Orang (Skala Besar)</option>
                    </select>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-text-gray uppercase tracking-wider">Deskripsikan Kebutuhan Spesifik Anda</label>
                <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Contoh: Kami sedang mencari 2 Senior React Developer kontrak selama 6 bulan untuk mempercepat rilis dashboard logistik kami..."
                    className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-xs text-text-main"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-blue/15 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mengirim Data...</span>
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        <span>Kirim Permintaan Konsultasi</span>
                    </>
                )}
            </button>
        </form>
    );
}
