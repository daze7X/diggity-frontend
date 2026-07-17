'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, CompanySetting } from '../lib/api';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

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
            await api.submitSubscriber(email);
            setStatus('success');
            setEmail('');
            setMessage('Thank you for subscribing to our newsletter!');
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <footer className="bg-neutral-950 border-t border-neutral-900 pt-20 pb-10 text-neutral-400">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Info */}
                    <div className="md:col-span-2 space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-black tracking-tight text-white">
                                DIGGITY<span className="text-amber-500">.</span>
                            </span>
                        </Link>
                        <p className="max-w-md text-sm leading-relaxed text-neutral-500">
                            Diggity adalah agensi digital full-service yang berfokus membangun produk, menumbuhkan brand, dan menskalakan infrastruktur teknologi bisnis Anda.
                        </p>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-amber-500" />
                                <span>{settings.email}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-amber-500" />
                                <span>+{settings.whatsapp}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-4 h-4 text-amber-500" />
                                <span>{settings.address}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {settings.instagram_url && (
                                <a
                                    href={settings.instagram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-neutral-900 rounded-lg hover:text-amber-500 transition-colors"
                                >
                                    <Instagram className="w-4 h-4" />
                                </a>
                            )}
                            {settings.linkedin_url && (
                                <a
                                    href={settings.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-neutral-900 rounded-lg hover:text-amber-500 transition-colors"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                            Quick Links
                        </h4>
                        <div className="flex flex-col space-y-3 text-sm">
                            <Link href="/about" className="hover:text-amber-500 transition-colors">
                                About Us
                            </Link>
                            <Link href="/portfolio" className="hover:text-amber-500 transition-colors">
                                Our Portfolio
                            </Link>
                            <Link href="/pricing" className="hover:text-amber-500 transition-colors">
                                Pricing Plan
                            </Link>
                            <Link href="/blog" className="hover:text-amber-500 transition-colors">
                                Blog Articles
                            </Link>
                            <Link href="/career" className="hover:text-amber-500 transition-colors">
                                Join Our Team
                            </Link>
                        </div>
                    </div>

                    {/* Column 3: Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                            Newsletter
                        </h4>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            Dapatkan update wawasan teknologi dan digital marketing terbaik langsung ke inbox Anda.
                        </p>
                        <form onSubmit={handleSubscribe} className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Alamat email Anda"
                                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl focus:border-amber-500 focus:outline-none text-sm text-white placeholder-neutral-600"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="absolute right-2 top-2 p-1.5 bg-amber-500 rounded-lg text-neutral-950 hover:bg-amber-400 transition-colors"
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
                    </div>
                </div>

                <div className="border-t border-neutral-900 pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
                    <p>&copy; {new Date().getFullYear()} {settings.name}. All rights reserved.</p>
                    <div className="flex items-center space-x-6">
                        <Link href="/privacy" className="hover:text-neutral-400">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-neutral-400">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
