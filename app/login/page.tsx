'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { KeyRound, Mail, ArrowRight, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';

export default function LoginPage() {
    const { user, login, loading } = useAuth();
    const { language: locale } = useLanguage();
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
            router.push('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            setStatus('error');
            setErrorMessage(err.message || (locale === 'en' ? 'Failed to login. Please check your credentials.' : 'Gagal masuk. Periksa kembali kredensial Anda.'));
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
                            {locale === 'en' ? 'Sign In' : 'Masuk'}
                        </h1>
                        <p className="text-xs text-text-gray font-medium leading-relaxed">
                            {locale === 'en' 
                                ? 'Log in to your Diggity customer dashboard portal to access your licenses and products.' 
                                : 'Masuk ke Portal Dashboard pelanggan Diggity untuk mengakses lisensi dan produk Anda.'}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        
                        {status === 'error' && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium text-center flex items-center justify-center gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                {errorMessage}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    {locale === 'en' ? 'Email Address' : 'Alamat Email'}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                                        placeholder="nama@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        {locale === 'en' ? 'Password' : 'Kata Sandi'}
                                    </label>
                                    <Link href="/contact?forgot-password" className="text-[11px] font-bold text-brand-blue hover:text-brand-blue-dark transition-colors">
                                        {locale === 'en' ? 'Forgot password?' : 'Lupa kata sandi?'}
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <KeyRound className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-blue/20 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            {locale === 'en' ? 'Login Securely' : 'Masuk dengan Aman'}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer link */}
                    <div className="text-center text-xs text-text-gray font-medium pt-2 border-t border-glass-border/40">
                        {locale === 'en' ? 'Don\'t have an account?' : 'Belum punya akun?'} {' '}
                        <Link href="/register" className="text-brand-blue font-bold hover:underline inline-flex items-center gap-0.5">
                            {locale === 'en' ? 'Register Now' : 'Daftar Sekarang'} <Sparkles className="w-3 h-3" />
                        </Link>
                    </div>

                </SpotlightCard>
            </div>
        </div>
    );
}
