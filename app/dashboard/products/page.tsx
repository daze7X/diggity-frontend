'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, Download, Copy, Check, ShieldCheck, Sparkles, Key, Lock } from 'lucide-react';
import SpotlightCard from '../../../components/SpotlightCard';
import { useLanguage } from '../../../context/LanguageContext';

interface UserProductLicense {
    id: number;
    license_key: string;
    status: string;
    activated_at: string | null;
    expires_at: string | null;
    product?: {
        name: string;
        description: string;
        file_path: string | null;
        version: string;
        category?: {
            name: string;
        };
    };
}

export default function UserProducts() {
    const { language: locale } = useLanguage();
    const [licenses, setLicenses] = useState<UserProductLicense[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

    useEffect(() => {
        const fetchLicenses = async () => {
            try {
                const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
                const headers: HeadersInit = token ? { Authorization: `Bearer ${decodeURIComponent(token)}` } : {};
                
                const res = await fetch(`${API_URL}/user/products`, { headers });
                const data = await res.json();
                
                if (Array.isArray(data)) {
                    setLicenses(data);
                }
            } catch (err) {
                console.error('Failed to load user licenses:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLicenses();
    }, [API_URL]);

    const handleCopy = (key: string, idx: number) => {
        navigator.clipboard.writeText(key);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return locale === 'en' ? 'Lifetime' : 'Selamanya';
        return new Date(dateString).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-6 text-left animate-fade-in">
            <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-text-main tracking-tight">{locale === 'en' ? 'Licenses & Product Downloads' : 'Lisensi & Unduhan Produk'}</h2>
                <p className="text-xs md:text-sm text-text-muted">{locale === 'en' ? 'Manage your active license keys and download purchased software installation packages.' : 'Kelola kunci lisensi aktif Anda dan unduh paket instalasi software yang telah dibeli.'}</p>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-20 bg-glass-bg border border-glass-border rounded-2xl">
                        <span className="text-xs text-text-muted font-bold font-mono">{locale === 'en' ? 'Loading licenses...' : 'Memuat lisensi...'}</span>
                    </div>
                ) : licenses.length > 0 ? (
                    licenses.map((lic, idx) => {
                        const product = lic.product;
                        const isExpired = lic.status === 'expired';
                        
                        return (
                            <SpotlightCard key={lic.id} className="p-6 md:p-8 border border-glass-border">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    
                                    {/* Left Side: Product Info */}
                                    <div className="space-y-3.5 text-left max-w-xl">
                                        <div className="space-y-2">
                                            {product?.category && (
                                                <span className="inline-block px-2.5 py-0.5 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[10px] font-bold rounded-md uppercase tracking-wider">
                                                    {product.category.name}
                                                </span>
                                            )}
                                            <h3 className="text-lg md:text-xl font-bold text-text-main leading-snug">
                                                {product?.name || (locale === 'en' ? 'Custom Product' : 'Produk Kustom')} {product?.version && `v${product.version}`}
                                            </h3>
                                            {product?.description && (
                                                <p className="text-xs text-text-gray line-clamp-2 leading-relaxed">
                                                    {product.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* License Key Box */}
                                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                            <div className="flex items-center space-x-2 px-3 py-2 bg-neutral-950/10 dark:bg-neutral-950/30 border border-glass-border rounded-xl">
                                                <Key className="w-4 h-4 text-brand-blue shrink-0" />
                                                <span className="text-xs font-mono font-bold text-text-main tracking-wider">{lic.license_key}</span>
                                                <button
                                                    onClick={() => handleCopy(lic.license_key, idx)}
                                                    className="p-1 text-text-muted hover:text-brand-blue transition-colors cursor-pointer"
                                                    title="Copy License Key"
                                                >
                                                    {copiedIndex === idx ? (
                                                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                                                    ) : (
                                                        <Copy className="w-3.5 h-3.5" />
                                                    )}
                                                </button>
                                            </div>

                                            <div className="flex items-center space-x-2 text-[11px] text-text-gray font-medium">
                                                <span>Status:</span>
                                                {isExpired ? (
                                                    <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 font-bold rounded-md uppercase tracking-wider flex items-center gap-1">
                                                        <ShieldAlert className="w-3 h-3" /> Expired
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold rounded-md uppercase tracking-wider flex items-center gap-1">
                                                        <ShieldCheck className="w-3 h-3" /> {locale === 'en' ? 'Active' : 'Aktif'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-[10px] text-text-muted font-medium pt-1">
                                            {locale === 'en' ? 'Activation:' : 'Aktivasi:'} {formatDate(lic.activated_at)} | {locale === 'en' ? 'Expires:' : 'Berakhir:'} {formatDate(lic.expires_at)}
                                        </div>
                                    </div>

                                    {/* Right Side: Direct download action button */}
                                    <div className="shrink-0 w-full md:w-auto text-right">
                                        {product?.file_path && !isExpired ? (
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${product.file_path}`}
                                                download
                                                className="flex items-center justify-center gap-1.5 px-6 py-3 bg-emerald-500 text-white hover:bg-emerald-600 rounded-xl text-xs md:text-sm font-bold transition-all shadow-md shadow-emerald-500/15 w-full md:w-auto cursor-pointer"
                                            >
                                                <Download className="w-4 h-4" /> {locale === 'en' ? 'Download Software File' : 'Unduh Berkas Software'}
                                            </a>
                                        ) : (
                                            <button
                                                disabled
                                                className="flex items-center justify-center gap-1.5 px-6 py-3 bg-slate-700/30 text-text-muted border border-glass-border rounded-xl text-xs md:text-sm font-bold w-full md:w-auto cursor-not-allowed"
                                            >
                                                {isExpired ? (locale === 'en' ? 'License Expired' : 'Lisensi Berakhir') : (locale === 'en' ? 'No Download' : 'Tidak Ada Unduhan')}
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </SpotlightCard>
                        );
                    })
                ) : (
                    <div className="text-center py-20 bg-glass-bg border border-glass-border rounded-2xl space-y-4">
                        <Lock className="w-12 h-12 mx-auto text-brand-blue/30" />
                        <div className="space-y-1">
                            <h4 className="font-bold text-text-main text-sm">{locale === 'en' ? 'No Licensed Products Yet' : 'Belum Ada Produk Terlisensi'}</h4>
                            <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
                                {locale === 'en' ? 'You haven\'t purchased any ready-to-use digital products from Diggity. Browse our catalog to start.' : 'Anda belum membeli produk digital siap pakai di Diggity. Jelajahi katalog kami untuk memulai.'}
                            </p>
                        </div>
                        <Link
                            href="/products"
                            className="inline-flex items-center px-4 py-2 bg-brand-blue text-white rounded-lg text-xs font-semibold hover:bg-brand-blue-dark transition-colors"
                        >
                            {locale === 'en' ? 'Explore Products' : 'Jelajahi Produk'} <Sparkles className="ml-1 w-3 h-3" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
