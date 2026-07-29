'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Mail, MailCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function UnsubscribeFormContent() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setStatus('idle');
        setMessage('');

        try {
            const res = await api.unsubscribeNewsletter(email);
            if (res.success) {
                setStatus('success');
                setMessage(res.message || 'Anda telah sukses berhenti berlangganan dari newsletter kami.');
            } else {
                setStatus('error');
                setMessage(res.message || 'Gagal memproses permintaan Anda.');
            }
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'Gagal memproses permintaan Anda. Pastikan email Anda benar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl relative overflow-hidden transition-all duration-300">
                {/* Decorative gradients */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-slate-500/10 rounded-full blur-2xl"></div>

                <div className="relative">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-red-500/10 dark:bg-red-500/20 text-red-500 rounded-xl mb-4">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                            Berhenti Berlangganan
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            Kami sedih melihat Anda pergi. Masukkan email Anda di bawah untuk membatalkan langganan newsletter kami.
                        </p>
                    </div>

                    {status === 'success' ? (
                        <div className="text-center space-y-6">
                            <div className="inline-flex p-3 bg-green-500/10 dark:bg-green-500/20 text-green-500 rounded-xl">
                                <MailCheck className="w-8 h-8" />
                            </div>
                            <div className="p-4 bg-green-50/50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl">
                                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                                    {message}
                                </p>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Terima kasih telah bergabung bersama kami sebelumnya. Anda selalu dapat berlangganan kembali kapan saja melalui footer utama kami.
                            </p>
                            <div className="pt-4">
                                <Link 
                                    href="/" 
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Alamat Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@domain.com"
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {status === 'error' && (
                                <div className="flex gap-2 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-red-800 dark:text-red-300">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm font-medium">{message}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Memproses...</span>
                                    </>
                                ) : (
                                    <span>Konfirmasi Berhenti Berlangganan</span>
                                )}
                            </button>

                            <div className="text-center pt-2">
                                <Link 
                                    href="/" 
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Batal dan Kembali
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function UnsubscribePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
                <div className="w-10 h-10 border-4 border-slate-300 dark:border-slate-800 border-t-red-500 rounded-full animate-spin"></div>
            </div>
        }>
            <UnsubscribeFormContent />
        </Suspense>
    );
}
