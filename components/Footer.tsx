'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, CompanySetting } from '../lib/api';
import { executeRecaptcha } from '../lib/recaptcha';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export default function Footer() {
    const { t } = useLanguage();
    const [settings, setSettings] = useState<CompanySetting>({
        name: 'Diggity Agency',
        email: 'hello@diggity.com',
        whatsapp: '628123456789',
        address: 'Jakarta, Indonesia',
    });
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.getCompanySettings()
            .then(setSettings)
            .catch((err) => console.error('Failed to load company settings:', err));
    }, []);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const recaptchaToken = await executeRecaptcha('newsletter');
            await api.submitSubscriber(email, recaptchaToken);
            setStatus('success');
            setEmail('');
            setMessage('Thank you for subscribing to our newsletter!');
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <footer className="bg-[#020617] border-t border-slate-900 pt-20 pb-10 text-slate-400 relative z-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
                    {/* Column 1: Info */}
                    <div className="md:col-span-2 space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-black tracking-tight text-slate-100">
                                DIGGITY<span className="text-brand-blue">.</span>
                            </span>
                        </Link>
                        <p className="max-w-md text-sm leading-relaxed text-slate-400">
                            {t('footer.desc')}
                        </p>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center space-x-3 text-slate-300">
                                <Mail className="w-4 h-4 text-brand-blue" />
                                <span>{t('footer.email')}: {settings.email}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-300">
                                <Phone className="w-4 h-4 text-brand-blue" />
                                <span>{t('footer.whatsapp')}: +{settings.whatsapp}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-300">
                                <MapPin className="w-4 h-4 text-brand-blue" />
                                <span>{t('footer.office')}: {settings.address}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {settings.instagram_url && (
                                <a
                                    href={settings.instagram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:text-brand-blue transition-colors text-slate-300"
                                >
                                    <Instagram className="w-4 h-4" />
                                </a>
                            )}
                            {settings.linkedin_url && (
                                <a
                                    href={settings.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:text-brand-blue transition-colors text-slate-300"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold tracking-wider text-slate-200 uppercase">
                            Quick Links
                        </h4>
                        <div className="flex flex-col space-y-3 text-sm">
                            <Link href="/about" className="hover:text-brand-blue transition-colors text-slate-400">
                                {t('nav.about')}
                            </Link>
                            <Link href="/solutions" className="hover:text-brand-blue transition-colors text-slate-400">
                                {t('nav.solutions')}
                            </Link>
                            <Link href="/products" className="hover:text-brand-blue transition-colors text-slate-400">
                                {t('nav.products')}
                            </Link>
                            <Link href="/academy" className="hover:text-brand-blue transition-colors text-slate-400">
                                {t('nav.academy')}
                            </Link>
                            <Link href="/portfolio" className="hover:text-brand-blue transition-colors text-slate-400">
                                {t('nav.portfolio')}
                            </Link>
                            <Link href="/insights" className="hover:text-brand-blue transition-colors text-slate-400">
                                {t('nav.insights')}
                            </Link>
                            <Link href="/job-connect" className="hover:text-brand-blue transition-colors text-slate-400">
                                {t('nav.jobConnect')}
                            </Link>
                        </div>
                    </div>

                    {/* Column 3: Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold tracking-wider text-slate-200 uppercase">
                            Newsletter
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Dapatkan update wawasan teknologi dan digital marketing terbaik langsung ke inbox Anda.
                        </p>
                        <form onSubmit={handleSubscribe} className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Alamat email Anda"
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-brand-blue focus:outline-none text-sm text-slate-200 placeholder-slate-600"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="absolute right-2 top-2 p-1.5 bg-brand-blue rounded-lg text-white hover:bg-brand-blue-dark transition-colors cursor-pointer"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                        {message && (
                            <p
                                className={`text-xs ${
                                    status === 'success' ? 'text-emerald-500' : 'text-rose-500'
                                }`}
                            >
                                {message}
                            </p>
                        )}
                        <div className="pt-2 text-left">
                            <Link href="/unsubscribe" className="text-xs text-slate-500 hover:text-slate-300 transition-colors underline">
                                Berhenti berlangganan?
                            </Link>
                        </div>
                    </div>
                </div>
 
                <div className="border-t border-slate-900 pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} {settings.name}. All rights reserved.</p>
                    <div className="flex items-center space-x-6">
                        <Link href="/privacy" className="hover:text-slate-400 text-slate-500">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-slate-400 text-slate-500">
                            Terms of Service
                        </Link>
                        <Link href="/unsubscribe" className="hover:text-slate-400 text-slate-500">
                            Unsubscribe
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
