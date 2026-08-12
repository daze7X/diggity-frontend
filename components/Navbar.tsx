'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    Menu, 
    X, 
    ArrowUpRight, 
    Search, 
    ChevronDown, 
    Code, 
    Cpu, 
    ShieldCheck, 
    TrendingUp, 
    Layers, 
    GraduationCap, 
    Server, 
    HelpCircle,
    BookOpen
} from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
    const { user, loading } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [activeDropdown, setActiveDropdown] = useState<'solutions' | 'products' | 'academy' | null>(null);
    const [mobileExpanded, setMobileExpanded] = useState<'solutions' | 'products' | 'academy' | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Load initial theme from DOM class
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown on route change
    useEffect(() => {
        setActiveDropdown(null);
        setIsOpen(false);
    }, [pathname]);

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    };

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(path);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled || activeDropdown
                    ? 'bg-brand-bg/85 backdrop-blur-md border-b border-glass-border py-4'
                    : 'bg-transparent py-6'
            }`}
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 shrink-0">
                        <span className="text-2xl font-black tracking-tight text-text-main">
                            DIGGITY<span className="text-brand-blue">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-2 xl:space-x-5">
                        <Link
                            href="/"
                            className={`text-sm font-semibold transition-colors hover:text-brand-blue px-3 py-2 rounded-lg ${
                                isActive('/') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.home')}
                        </Link>
                        
                        <Link
                            href="/about"
                            className={`text-sm font-semibold transition-colors hover:text-brand-blue px-3 py-2 rounded-lg ${
                                isActive('/about') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.about')}
                        </Link>

                        {/* Solutions Dropdown Menu */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('solutions')}
                        >
                            <button
                                className={`text-sm font-semibold transition-colors hover:text-brand-blue px-3 py-2 rounded-lg flex items-center space-x-1.5 cursor-pointer ${
                                    isActive('/solutions') ? 'text-brand-blue' : 'text-text-gray'
                                }`}
                            >
                                <span>{t('nav.solutions')}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Products Dropdown Menu */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('products')}
                        >
                            <button
                                className={`text-sm font-semibold transition-colors hover:text-brand-blue px-3 py-2 rounded-lg flex items-center space-x-1.5 cursor-pointer ${
                                    isActive('/products') ? 'text-brand-blue' : 'text-text-gray'
                                }`}
                            >
                                <span>{t('nav.products')}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Academy Dropdown Menu */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('academy')}
                        >
                            <button
                                className={`text-sm font-semibold transition-colors hover:text-brand-blue px-3 py-2 rounded-lg flex items-center space-x-1.5 cursor-pointer ${
                                    isActive('/academy') ? 'text-brand-blue' : 'text-text-gray'
                                }`}
                            >
                                <span>{t('nav.academy')}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'academy' ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        <Link
                            href="/portfolio"
                            className={`text-sm font-semibold transition-colors hover:text-brand-blue px-3 py-2 rounded-lg ${
                                isActive('/portfolio') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.portfolio')}
                        </Link>

                        <Link
                            href="/insights"
                            className={`text-sm font-semibold transition-colors hover:text-brand-blue px-3 py-2 rounded-lg ${
                                isActive('/insights') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.insights')}
                        </Link>

                        <Link
                            href="/job-connect"
                            className={`text-sm font-semibold transition-colors hover:text-brand-blue px-3 py-2 rounded-lg ${
                                isActive('/job-connect') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.jobConnect')}
                        </Link>
                    </div>

                    {/* Desktop Right Side CTA & Action Buttons */}
                    <div className="hidden lg:flex items-center space-x-3.5 shrink-0">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 border border-glass-border rounded-xl bg-glass-bg cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center w-9 h-9 text-text-main"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
                            )}
                        </button>

                        {/* Language Toggle */}
                        <button
                            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                            className="p-1 border border-glass-border rounded-xl bg-glass-bg cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center h-9 px-3 text-[10px] font-black text-text-main"
                            aria-label="Toggle Language"
                        >
                            {language === 'id' ? 'ID' : 'EN'}
                        </button>

                        {/* Search Button */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 border border-glass-border rounded-xl bg-glass-bg cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center w-9 h-9 text-text-main"
                            aria-label="Search"
                        >
                            <Search className="w-4.5 h-4.5" />
                        </button>

                        {/* Sign In / Dashboard text link */}
                        {!loading && user ? (
                            <Link
                                href="/dashboard"
                                className="text-sm font-bold text-text-gray hover:text-brand-blue transition-colors px-2 py-1"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="text-sm font-bold text-text-gray hover:text-brand-blue transition-colors px-2 py-1"
                            >
                                Sign In
                            </Link>
                        )}

                        {/* Contact Us Premium Button (CTA) */}
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-4.5 py-2 text-sm font-extrabold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-md shadow-brand-blue/10 hover:scale-[1.02]"
                        >
                            {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
                        </Link>
                    </div>

                    {/* Mobile Navigation Actions */}
                    <div className="lg:hidden flex items-center space-x-3">
                        <button
                            onClick={toggleTheme}
                            className="p-1.5 border border-glass-border rounded-lg bg-glass-bg cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center w-8 h-8 text-text-main"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
                            )}
                        </button>

                        <button
                            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                            className="p-1 border border-glass-border rounded-lg bg-glass-bg cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center h-8 px-2 text-[10px] font-black text-text-main"
                            aria-label="Toggle Language"
                        >
                            {language === 'id' ? 'ID' : 'EN'}
                        </button>

                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-1.5 border border-glass-border rounded-lg bg-glass-bg cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center w-8 h-8 text-text-main"
                            aria-label="Search"
                        >
                            <Search className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-text-main hover:text-brand-blue focus:outline-none p-1.5"
                            aria-label="Menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* ========================================================
                    DESKTOP MEGA DROP-DOWN PANELS
                    ======================================================== */}
                
                {/* 1. Solutions Mega-Menu Panel */}
                {activeDropdown === 'solutions' && (
                    <div 
                        className="absolute left-0 right-0 top-full mt-4 mx-auto max-w-6xl bg-brand-bg/95 border border-glass-border rounded-3xl p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                        onMouseEnter={() => setActiveDropdown('solutions')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        {/* Col 1: Jasa Rekayasa (BUILD) */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Rekayasa Digital (BUILD)
                            </span>
                            <div className="space-y-3">
                                <Link href="/solutions/website-development" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Code className="w-3.5 h-3.5 shrink-0" />
                                        Technology Solutions
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Pengembangan website, aplikasi mobile, dan sistem ERP terintegrasi.</p>
                                </Link>
                                <Link href="/solutions/website-development" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Cpu className="w-3.5 h-3.5 shrink-0" />
                                        AI &amp; Emerging Technology
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Integrasi asisten kecerdasan buatan, chatbot AI, dan data analitik.</p>
                                </Link>
                                <Link href="/solutions/website-development" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Server className="w-3.5 h-3.5 shrink-0" />
                                        Cloud &amp; Cyber Security
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Setup hosting, migrasi cloud database, audit keamanan cyber &amp; DevOps.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Col 2: Strategi Pertumbuhan (GROW) */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Skala Bisnis (GROW)
                            </span>
                            <div className="space-y-3">
                                <Link href="/solutions/website-development" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 shrink-0" />
                                        Creative &amp; Brand Experience
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Perancangan UI/UX Figma, identitas brand, desain grafis &amp; video.</p>
                                </Link>
                                <Link href="/solutions/search-engine-optimization" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                                        Growth Marketing &amp; SEO
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Optimasi SEO organik, iklan PPC Google/Meta Ads, dan konversi target.</p>
                                </Link>
                                <Link href="/solutions/website-development" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                                        IT Consulting &amp; Advisory
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Konsultasi strategi transformasi digital &amp; penasihat arsitektur IT.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Col 3: Promosi B2B Panel */}
                        <div className="p-6 bg-glass-bg border border-glass-border/60 rounded-2xl flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                                <span className="px-2.5 py-0.5 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[9px] font-bold uppercase tracking-wider rounded-md inline-block">
                                    B2B Solutions
                                </span>
                                <h4 className="text-sm font-extrabold text-text-main">Butuh Penawaran Jasa Kustom?</h4>
                                <p className="text-[11px] text-text-gray leading-relaxed font-medium">
                                    Dapatkan analisis arsitektur teknis dan proposal perencanaan kustom dari arsitek solusi senior kami gratis.
                                </p>
                            </div>
                            <Link 
                                href="/solutions"
                                className="inline-flex items-center justify-center py-2 px-4 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue-dark transition-colors self-start group"
                            >
                                Lihat Paket Jasa
                                <ArrowUpRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </div>
                )}

                {/* 2. Products Mega-Menu Panel */}
                {activeDropdown === 'products' && (
                    <div 
                        className="absolute left-0 right-0 top-full mt-4 mx-auto max-w-6xl bg-brand-bg/95 border border-glass-border rounded-3xl p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                        onMouseEnter={() => setActiveDropdown('products')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        {/* Col 1: Software & SaaS (SCALE) */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Aplikasi Bisnis &amp; SaaS (SCALE)
                            </span>
                            <div className="space-y-3">
                                <Link href="/products/diggity-erp" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Server className="w-3.5 h-3.5 shrink-0" />
                                        Diggity ERP &amp; CRM
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Sistem manajemen inventory, keuangan, HR, payroll, dan pergudangan.</p>
                                </Link>
                                <Link href="/products/diggity-ai-agent" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Cpu className="w-3.5 h-3.5 shrink-0" />
                                        Diggity AI Agent
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Otomatisasi percakapan chat CS, asisten cerdas lead-generation B2B.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Col 2: Digital Marketplace Assets */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Aset Digital &amp; Templates
                            </span>
                            <div className="space-y-3">
                                <Link href="/products/sleek-dashboard-ui-kit" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 shrink-0" />
                                        Sleek Dashboard UI Kit
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Ratusan komponen UI siap pakai dengan Figma file dan React integrasi.</p>
                                </Link>
                                <Link href="/products" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Code className="w-3.5 h-3.5 shrink-0" />
                                        Web &amp; Mobile Templates
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Template website Next.js, React, tailwind, dan aset developer lengkap.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Col 3: Promosi B2B Panel */}
                        <div className="p-6 bg-glass-bg border border-glass-border/60 rounded-2xl flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                                <span className="px-2.5 py-0.5 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[9px] font-bold uppercase tracking-wider rounded-md inline-block">
                                    Product Demo
                                </span>
                                <h4 className="text-sm font-extrabold text-text-main">Minta Uji Coba Demo SaaS?</h4>
                                <p className="text-[11px] text-text-gray leading-relaxed font-medium">
                                    Lihat bagaimana aplikasi Diggity ERP dan AI Agent kami mengotomatisasi bisnis kawan melalui live demo gratis.
                                </p>
                            </div>
                            <Link 
                                href="/products"
                                className="inline-flex items-center justify-center py-2 px-4 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue-dark transition-colors self-start group"
                            >
                                Jelajahi Produk
                                <ArrowUpRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </div>
                )}

                {/* 3. Academy Mega-Menu Panel */}
                {activeDropdown === 'academy' && (
                    <div 
                        className="absolute left-0 right-0 top-full mt-4 mx-auto max-w-6xl bg-brand-bg/95 border border-glass-border rounded-3xl p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                        onMouseEnter={() => setActiveDropdown('academy')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        {/* Col 1: Program Belajar (EMPOWER) */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Program Utama (EMPOWER)
                            </span>
                            <div className="space-y-3">
                                <Link href="/academy" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                                        Coding Bootcamps
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Pelatihan pemrograman intensif bersertifikat standar industri.</p>
                                </Link>
                                <Link href="/academy" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 shrink-0" />
                                        Corporate IT Training
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Program pelatihan teknologi &amp; upskilling in-house untuk perusahaan.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Col 2: Sumber Belajar Digital */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                E-Learning &amp; Resources
                            </span>
                            <div className="space-y-3">
                                <Link href="/academy" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <BookOpen className="w-3.5 h-3.5 shrink-0" />
                                        Self-Paced E-Courses
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Akses belajar mandiri materi koding lengkap beserta kuis kompetensi.</p>
                                </Link>
                                <Link href="/academy" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 shrink-0" />
                                        Digital E-Books
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Unduh buku panduan pemrograman gratis dan tips rekayasa perangkat lunak.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Col 3: Promosi B2B Panel */}
                        <div className="p-6 bg-glass-bg border border-glass-border/60 rounded-2xl flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                                <span className="px-2.5 py-0.5 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[9px] font-bold uppercase tracking-wider rounded-md inline-block">
                                    LMS Portal
                                </span>
                                <h4 className="text-sm font-extrabold text-text-main">Mulai Sertifikasi Digital?</h4>
                                <p className="text-[11px] text-text-gray leading-relaxed font-medium">
                                    Selesaikan modul pembelajaran kawan, dapatkan nilai kuis di atas KKM, dan unduh sertifikat berverifikasi hash secara instan.
                                </p>
                            </div>
                            <Link 
                                href="/academy"
                                className="inline-flex items-center justify-center py-2 px-4 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue-dark transition-colors self-start group"
                            >
                                Buka Akademi
                                <ArrowUpRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* ========================================================
                MOBILE NAVIGATION DRAWER (ACCORDION STYLE)
                ======================================================== */}
            {isOpen && (
                <div className="lg:hidden mt-4 bg-brand-bg/95 border border-glass-border rounded-2xl p-6 absolute top-full left-6 right-6 shadow-2xl backdrop-blur-xl transition-all duration-300 max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col space-y-4">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className={`text-base font-semibold py-1.5 transition-colors border-b border-glass-border/40 ${
                                isActive('/') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.home')}
                        </Link>
                        
                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className={`text-base font-semibold py-1.5 transition-colors border-b border-glass-border/40 ${
                                isActive('/about') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.about')}
                        </Link>

                        {/* Mobile Solutions Accordion */}
                        <div className="border-b border-glass-border/40 py-1.5">
                            <button
                                onClick={() => setMobileExpanded(mobileExpanded === 'solutions' ? null : 'solutions')}
                                className="w-full text-base font-semibold text-text-gray flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={isActive('/solutions') ? 'text-brand-blue' : ''}>{t('nav.solutions')}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'solutions' ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileExpanded === 'solutions' && (
                                <div className="mt-3 pl-4 space-y-3 text-sm animate-in fade-in duration-200">
                                    <Link href="/solutions/website-development" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Technology Solutions
                                    </Link>
                                    <Link href="/solutions/website-development" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        AI &amp; Emerging Tech
                                    </Link>
                                    <Link href="/solutions/website-development" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Cloud &amp; Cyber Security
                                    </Link>
                                    <Link href="/solutions/search-engine-optimization" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Growth Marketing &amp; SEO
                                    </Link>
                                    <Link href="/solutions" onClick={() => setIsOpen(false)} className="block text-brand-blue font-bold py-1">
                                        Lihat Semua Layanan &rarr;
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Products Accordion */}
                        <div className="border-b border-glass-border/40 py-1.5">
                            <button
                                onClick={() => setMobileExpanded(mobileExpanded === 'products' ? null : 'products')}
                                className="w-full text-base font-semibold text-text-gray flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={isActive('/products') ? 'text-brand-blue' : ''}>{t('nav.products')}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'products' ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileExpanded === 'products' && (
                                <div className="mt-3 pl-4 space-y-3 text-sm animate-in fade-in duration-200">
                                    <Link href="/products/diggity-erp" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Diggity ERP &amp; CRM
                                    </Link>
                                    <Link href="/products/diggity-ai-agent" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Diggity AI Agent
                                    </Link>
                                    <Link href="/products/sleek-dashboard-ui-kit" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Sleek Dashboard UI Kit
                                    </Link>
                                    <Link href="/products" onClick={() => setIsOpen(false)} className="block text-brand-blue font-bold py-1">
                                        Lihat Semua Produk &rarr;
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Academy Accordion */}
                        <div className="border-b border-glass-border/40 py-1.5">
                            <button
                                onClick={() => setMobileExpanded(mobileExpanded === 'academy' ? null : 'academy')}
                                className="w-full text-base font-semibold text-text-gray flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={isActive('/academy') ? 'text-brand-blue' : ''}>{t('nav.academy')}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'academy' ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileExpanded === 'academy' && (
                                <div className="mt-3 pl-4 space-y-3 text-sm animate-in fade-in duration-200">
                                    <Link href="/academy" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Bootcamps &amp; Classes
                                    </Link>
                                    <Link href="/academy" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Corporate IT Training
                                    </Link>
                                    <Link href="/academy" onClick={() => setIsOpen(false)} className="block text-brand-blue font-bold py-1">
                                        Mulai Belajar Baru &rarr;
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/portfolio"
                            onClick={() => setIsOpen(false)}
                            className={`text-base font-semibold py-1.5 transition-colors border-b border-glass-border/40 ${
                                isActive('/portfolio') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.portfolio')}
                        </Link>

                        <Link
                            href="/insights"
                            onClick={() => setIsOpen(false)}
                            className={`text-base font-semibold py-1.5 transition-colors border-b border-glass-border/40 ${
                                isActive('/insights') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.insights')}
                        </Link>

                        <Link
                            href="/job-connect"
                            onClick={() => setIsOpen(false)}
                            className={`text-base font-semibold py-1.5 transition-colors border-b border-glass-border/40 ${
                                isActive('/job-connect') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.jobConnect')}
                        </Link>

                        {/* Mobile Right/Bottom CTAs */}
                        <div className="pt-4 flex flex-col space-y-3">
                            {!loading && user ? (
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors"
                                >
                                    Dashboard
                                    <ArrowUpRight className="ml-1.5 w-5 h-5" />
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors"
                                >
                                    Sign In
                                    <ArrowUpRight className="ml-1.5 w-5 h-5" />
                                </Link>
                            )}

                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-bold text-brand-blue bg-glass-bg border border-glass-border hover:bg-glass-bg-hover rounded-xl transition-colors"
                            >
                                {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Global Search Overlay (FR-012) */}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav>
    );
}
