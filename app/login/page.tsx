'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { KeyRound, Mail, ArrowRight, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';

export default function LoginPage() {
    const { user, login, loading } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            await login(email, password);
            setStatus('success');
            router.push('/dashboard');
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || 'Login gagal. Silakan coba kembali.');
        }
    };

    if (loading || user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen pt-36 pb-20 md:pt-44 md:pb-28 flex items-center justify-center overflow-hidden">
            {/* Ambient background blur blobs */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

            <div className="w-full max-w-md px-6 z-10">
                <SpotlightCard className="p-8 border border-glass-border bg-gradient-to-b from-glass-bg/80 to-glass-bg/40 shadow-2xl backdrop-blur-md rounded-3xl text-left space-y-6">
                    
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mx-auto mb-2">
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">
                            Sign In
                        </h1>
                        <p className="text-xs text-text-gray font-medium leading-relaxed">
                            Masuk ke Portal Dashboard pelanggan Diggity untuk mengakses lisensi dan produk Anda.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm">
                        
                        {/* Email Input */}
                        <div className="space-y-1.5 text-left">
                            <label className="font-bold text-text-gray block text-xs">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                    className="w-full pl-11 pr-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-text-main placeholder-text-muted transition-colors"
                                />
                                <Mail className="w-4.5 h-4.5 text-text-muted absolute left-4 top-3.5" />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5 text-left">
                            <div className="flex justify-between items-center">
                                <label className="font-bold text-text-gray block text-xs">Password</label>
                                <Link href="/contact?forgot-password" className="text-[10px] text-brand-blue font-bold hover:underline">
                                    Lupa Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-text-main placeholder-text-muted transition-colors"
                                />
                                <KeyRound className="w-4.5 h-4.5 text-text-muted absolute left-4 top-3.5" />
                            </div>
                        </div>

                        {status === 'error' && (
                            <p className="text-xs text-rose-500 font-bold text-left pt-1">
                                {errorMessage}
                            </p>
                        )}

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-3.5 bg-brand-blue text-white hover:bg-brand-blue-dark disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl text-sm font-bold transition-all shadow-md shadow-brand-blue/15 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Menghubungkan...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Masuk Ke Akun</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer link */}
                    <div className="text-center text-xs text-text-gray font-medium pt-2 border-t border-glass-border/40">
                        Belum punya akun?{' '}
                        <Link href="/register" className="text-brand-blue font-bold hover:underline inline-flex items-center gap-0.5">
                            Daftar Sekarang <Sparkles className="w-3 h-3" />
                        </Link>
                    </div>

                </SpotlightCard>
            </div>
        </div>
    );
}
