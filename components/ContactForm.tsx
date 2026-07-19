'use client';

import React, { useState } from 'react';
import { api } from '../lib/api';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'App Builder Squad',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const servicesList = [
        'App Builder Squad (Web/Mobile Apps)',
        'Brand Growth Division (SEO/Google Ads)',
        'Cloud Service Hub (VPS/Hosting/Maintenance)',
        'Digital Skill Lab (IT Training/Workshops)',
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.submitLead(formData);
            setStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                service: 'App Builder Squad',
                message: '',
            });
            setMessage('Pesan Anda berhasil terkirim! Tim kami akan segera menghubungi Anda.');
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'Gagal mengirim pesan. Silakan coba kembali.');
        }
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-glass-bg border border-glass-border p-8 md:p-10 shadow-[0_20px_50px_-12px_rgba(10,25,47,0.08)] dark:shadow-[0_12px_40px_0_rgba(0,0,0,0.6)]" style={{ boxShadow: 'var(--card-inset), var(--card-shadow)' }}>
            <div className="grain-noise pointer-events-none" />
            <div className="topographic-bg pointer-events-none" />
            
            <div className="relative z-20 space-y-6 text-left">
                <h3 className="text-2xl font-bold text-text-main">Konsultasi Baru</h3>
                
                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                        <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h4 className="text-lg font-semibold text-text-main">Terima Kasih!</h4>
                        <p className="text-sm text-text-gray max-w-sm">{message}</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-4 px-6 py-2.5 text-sm font-semibold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-lg transition-colors cursor-pointer"
                        >
                            Kirim Pesan Lain
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">
                                    Nama Lengkap <span className="text-brand-blue">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Masukkan nama Anda"
                                    className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-lg focus:border-brand-blue focus:outline-none text-sm text-text-main placeholder-text-muted"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">
                                    Email Bisnis <span className="text-brand-blue">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="nama@perusahaan.com"
                                    className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-lg focus:border-brand-blue focus:outline-none text-sm text-text-main placeholder-text-muted"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Phone */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">
                                    No. WhatsApp <span className="text-brand-blue">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Contoh: 08123456789"
                                    className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-lg focus:border-brand-blue focus:outline-none text-sm text-text-main placeholder-text-muted"
                                />
                            </div>

                            {/* Company */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">
                                    Nama Perusahaan <span className="text-brand-blue">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="PT Contoh Sukses"
                                    className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-lg focus:border-brand-blue focus:outline-none text-sm text-text-main placeholder-text-muted"
                                />
                            </div>
                        </div>

                        {/* Service Selection */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">
                                Pilih Layanan Utama <span className="text-brand-blue">*</span>
                            </label>
                            <select
                                value={formData.service}
                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-lg focus:border-brand-blue focus:outline-none text-sm text-text-main"
                                style={{ background: 'var(--input-bg)' }}
                            >
                                {servicesList.map((service) => (
                                    <option key={service} value={service} className="bg-brand-bg text-text-main">
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Message */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">
                                Detail Kebutuhan Proyek <span className="text-brand-blue">*</span>
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Tuliskan spesifikasi kebutuhan sistem Anda..."
                                className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-lg focus:border-brand-blue focus:outline-none text-sm text-text-main placeholder-text-muted"
                            ></textarea>
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center space-x-2 text-rose-500 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                <span>{message}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="flex items-center justify-center w-full px-6 py-3.5 text-base font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all cursor-pointer disabled:bg-brand-blue/30 disabled:text-text-muted group shadow-md shadow-brand-blue/15"
                        >
                            {status === 'loading' ? (
                                'Mengirim...'
                            ) : (
                                <>
                                    Kirim Pengajuan (Masuk CRM & WA)
                                    <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
