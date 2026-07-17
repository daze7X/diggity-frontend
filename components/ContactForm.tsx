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
        service: 'Website Development',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const servicesList = [
        'Website Development',
        'Mobile Apps Development',
        'UI/UX Design',
        'Search Engine Optimization (SEO)',
        'Digital Advertising (Ads)',
        'Cloud Server & VPS Hosting',
        'Corporate Training & Bootcamp',
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
                service: 'Website Development',
                message: '',
            });
            setMessage('Pesan Anda berhasil terkirim! Tim kami akan segera menghubungi Anda.');
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'Gagal mengirim pesan. Silakan coba kembali.');
        }
    };

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 md:p-10 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Konsultasi Gratis</h3>
            
            {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                    <h4 className="text-lg font-semibold text-white">Terima Kasih!</h4>
                    <p className="text-sm text-neutral-400 max-w-sm">{message}</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="mt-4 px-5 py-2 text-sm font-semibold text-neutral-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors"
                    >
                        Kirim Pesan Lain
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                Nama Lengkap <span className="text-amber-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Masukkan nama Anda"
                                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:border-amber-500 focus:outline-none text-sm text-white placeholder-neutral-600"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                Email Bisnis <span className="text-amber-500">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="nama@perusahaan.com"
                                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:border-amber-500 focus:outline-none text-sm text-white placeholder-neutral-600"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                No. WhatsApp <span className="text-amber-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Contoh: 08123456789"
                                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:border-amber-500 focus:outline-none text-sm text-white placeholder-neutral-600"
                            />
                        </div>

                        {/* Company */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                Nama Perusahaan (Opsional)
                            </label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                placeholder="Perusahaan Anda"
                                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:border-amber-500 focus:outline-none text-sm text-white placeholder-neutral-600"
                            />
                        </div>
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            Layanan Yang Dibutuhkan
                        </label>
                        <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:border-amber-500 focus:outline-none text-sm text-white"
                        >
                            {servicesList.map((service) => (
                                <option key={service} value={service} className="bg-neutral-950">
                                    {service}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            Pesan / Detail Proyek <span className="text-amber-500">*</span>
                        </label>
                        <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Ceritakan tentang kebutuhan bisnis Anda..."
                            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:border-amber-500 focus:outline-none text-sm text-white placeholder-neutral-600"
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
                        className="flex items-center justify-center w-full px-6 py-4 text-base font-bold text-neutral-950 bg-amber-500 rounded-xl hover:bg-amber-400 transition-colors disabled:bg-amber-700 disabled:text-neutral-500 group"
                    >
                        {status === 'loading' ? (
                            'Mengirim...'
                        ) : (
                            <>
                                Kirim Pengajuan Proyek
                                <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
