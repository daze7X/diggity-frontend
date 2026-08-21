'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LayoutDashboard, Lock, BookOpen, ShoppingCart, Sparkles, ArrowRight } from 'lucide-react';
import SpotlightCard from '../../components/SpotlightCard';

export default function DashboardOverview() {
    const { user } = useAuth();
    const { language: locale } = useLanguage();
    const [stats, setStats] = useState({
        products: 0,
        courses: 0,
        orders: 0
    });
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

    useEffect(() => {
        const fetchStats = async () => {
            if (!user) return;
            try {
                // Fetch user specific counts from backend
                const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
                const headers: HeadersInit = token ? { Authorization: `Bearer ${decodeURIComponent(token)}` } : {};
                
                const [ordersRes, productsRes, coursesRes] = await Promise.all([
                    fetch(`${API_URL}/user/orders`, { headers }).then(r => r.json().catch(() => [])),
                    fetch(`${API_URL}/user/products`, { headers }).then(r => r.json().catch(() => [])),
                    fetch(`${API_URL}/user/courses`, { headers }).then(r => r.json().catch(() => []))
                ]);

                setStats({
                    orders: Array.isArray(ordersRes) ? ordersRes.length : 0,
                    products: Array.isArray(productsRes) ? productsRes.length : 0,
                    courses: Array.isArray(coursesRes) ? coursesRes.length : 0
                });
            } catch (err) {
                console.error('Failed to fetch dashboard overview metrics:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user, API_URL]);

    if (!user) return null;

    return (
        <div className="space-y-8 text-left animate-fade-in">
            {/* Welcome Banner Card */}
            <SpotlightCard className="p-8 border border-glass-border bg-gradient-to-r from-brand-blue/10 via-brand-blue/5 to-transparent flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-2">
                    <span className="px-2.5 py-0.5 bg-brand-blue/10 border border-brand-blue/15 text-[10px] font-black text-brand-blue uppercase tracking-widest rounded-md inline-block">
                        {locale === 'en' ? 'Welcome' : 'Selamat Datang'}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-text-main tracking-tight leading-tight">
                        {locale === 'en' ? 'Hello' : 'Halo'}, {user.name}!
                    </h2>
                    <p className="text-xs md:text-sm text-text-gray font-medium leading-relaxed max-w-xl">
                        {locale === 'en' ? 'Welcome to the Diggity client portal. Access your digital products, license certificates, and training classes in one unified dashboard.' : 'Selamat datang di portal klien Diggity. Akses produk digital, sertifikat lisensi, dan kelas pelatihan Anda dalam satu panel kendali terpadu.'}
                    </p>
                </div>
                <div className="shrink-0 flex items-center space-x-2 px-4 py-2.5 bg-brand-blue/5 border border-brand-blue/15 rounded-xl text-brand-blue text-xs font-bold animate-pulse">
                    <Sparkles className="w-4 h-4" />
                    <span>{locale === 'en' ? 'Verified Client' : 'Klien Terverifikasi'}</span>
                </div>
            </SpotlightCard>

            {/* Metrics Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Stat 1: Products */}
                <Link href="/dashboard/products" className="block group">
                    <SpotlightCard className="p-6 border border-glass-border bg-glass-bg/40 group-hover:border-brand-blue/30 transition-all flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">{locale === 'en' ? 'Products & Licenses' : 'Produk & Lisensi'}</span>
                            <span className="text-3xl font-black text-text-main">
                                {loading ? '...' : stats.products}
                            </span>
                            <span className="text-[10px] text-brand-blue font-bold flex items-center gap-0.5 pt-1">
                                {locale === 'en' ? 'Manage Licenses' : 'Kelola Lisensi'} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue">
                            <Lock className="w-5 h-5" />
                        </div>
                    </SpotlightCard>
                </Link>

                {/* Stat 2: Courses */}
                <Link href="/dashboard/academy" className="block group">
                    <SpotlightCard className="p-6 border border-glass-border bg-glass-bg/40 group-hover:border-brand-blue/30 transition-all flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">{locale === 'en' ? 'Learning Classes' : 'Kelas Pembelajaran'}</span>
                            <span className="text-3xl font-black text-text-main">
                                {loading ? '...' : stats.courses}
                            </span>
                            <span className="text-[10px] text-brand-blue font-bold flex items-center gap-0.5 pt-1">
                                {locale === 'en' ? 'Start Learning' : 'Mulai Belajar'} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue">
                            <BookOpen className="w-5 h-5" />
                        </div>
                    </SpotlightCard>
                </Link>

                {/* Stat 3: Orders */}
                <Link href="/dashboard/orders" className="block group">
                    <SpotlightCard className="p-6 border border-glass-border bg-glass-bg/40 group-hover:border-brand-blue/30 transition-all flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">{locale === 'en' ? 'Transaction History' : 'Riwayat Transaksi'}</span>
                            <span className="text-3xl font-black text-text-main">
                                {loading ? '...' : stats.orders}
                            </span>
                            <span className="text-[10px] text-brand-blue font-bold flex items-center gap-0.5 pt-1">
                                {locale === 'en' ? 'Order History' : 'Riwayat Pesanan'} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue">
                            <ShoppingCart className="w-5 h-5" />
                        </div>
                    </SpotlightCard>
                </Link>

            </div>

            {/* Quick Helper Info */}
            <SpotlightCard className="p-6 border border-glass-border bg-glass-bg/20 text-xs text-text-gray font-medium leading-relaxed space-y-2">
                <h4 className="font-bold text-text-main">{locale === 'en' ? 'Client Service & Help Center' : 'Pusat Layanan Klien & Bantuan'}</h4>
                <p>
                    {locale === 'en' ? 'Experiencing issues with your digital product license activation? Or have questions about the curriculum syllabus at Diggity Academy? Our technical support team is ready to help you 24/7. Contact us instantly via WhatsApp via the button in the bottom right corner of this page.' : 'Mengalami kendala dengan aktivasi lisensi produk digital Anda? Atau memiliki pertanyaan mengenai silabus kurikulum di Diggity Academy? Tim support teknis kami siap membantu Anda 24/7. Hubungi kami secara instan via WhatsApp di tombol pojok kanan bawah halaman ini.'}
                </p>
            </SpotlightCard>
        </div>
    );
}
