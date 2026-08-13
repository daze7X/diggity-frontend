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
    BookOpen,
    Users,
    UserCheck,
    Briefcase
} from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api, Blog } from '../lib/api';

export default function Navbar() {
    const { user, loading } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [activeDropdown, setActiveDropdown] = useState<'product_solution' | 'academy' | 'insights' | null>(null);
    const [mobileExpanded, setMobileExpanded] = useState<'product_solution' | 'academy' | 'insights' | null>(null);
    const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        // Fetch featured blogs for the dropdown panel
        api.getInsights()
            .then((data) => {
                setFeaturedBlogs(data.slice(0, 4));
            })
            .catch((err) => {
                console.error('Failed to load insights in navbar:', err);
            });
    }, []);

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

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('nav')) {
                setActiveDropdown(null);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
        };
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

    const handleDropdownToggle = (type: 'product_solution' | 'academy' | 'insights') => {
        setActiveDropdown(activeDropdown === type ? null : type);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled || activeDropdown
                    ? 'bg-brand-bg/85 backdrop-blur-md border-b border-glass-border py-4'
                    : 'bg-transparent py-6'
            }`}
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

                        {/* Combined Product & Solution Dropdown Menu (On Click) */}
                        <div className="relative">
                            <button
                                onClick={() => handleDropdownToggle('product_solution')}
                                className={`text-sm font-semibold transition-colors hover:text-brand-blue px-3 py-2 rounded-lg flex items-center space-x-1.5 cursor-pointer ${
                                    isActive('/solutions') || isActive('/products') || isActive('/job-connect') 
                                        ? 'text-brand-blue' 
                                        : 'text-text-gray'
                                }`}
                            >
                                <span>{t('nav.product_solution')}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'product_solution' ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Academy Dropdown Menu (On Click) */}
                        <div className="relative">
                            <button
                                onClick={() => handleDropdownToggle('academy')}
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

                        {/* Insights Dropdown Menu (On Click) */}
                        <div className="relative">
                            <button
                                onClick={() => handleDropdownToggle('insights')}
                                className={`text-sm font-semibold transition-colors hover:text-brand-blue px-3 py-2 rounded-lg flex items-center space-x-1.5 cursor-pointer ${
                                    isActive('/insights') ? 'text-brand-blue' : 'text-text-gray'
                                }`}
                            >
                                <span>{t('nav.insights')}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'insights' ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                        
                        <Link
                            href="/about"
                            className={`text-sm font-semibold transition-colors hover:text-brand-blue px-3 py-2 rounded-lg ${
                                isActive('/about') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.about')}
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
                    DESKTOP MEGA DROP-DOWN PANELS (ON CLICK)
                    ======================================================== */}
                
                {/* 1. Combined Product & Solution Mega-Menu Panel */}
                {activeDropdown === 'product_solution' && (
                    <div 
                        className="absolute left-0 right-0 top-full mt-4 mx-auto max-w-7xl bg-brand-bg/95 border border-glass-border rounded-3xl p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-4 gap-8 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                    >
                        {/* Col 1: Layanan Rekayasa & Optimasi (Solutions) */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Layanan &amp; Solusi (BUILD-GROW)
                            </span>
                            <div className="space-y-3.5">
                                <Link href="/solutions/technology-solutions" className="group block space-y-0.5">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Code className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Technology Solutions
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium leading-normal">Pengembangan web app, mobile native, &amp; ERP.</p>
                                </Link>
                                <Link href="/solutions/ai-emerging-technology" className="group block space-y-0.5">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Cpu className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        AI &amp; Emerging Technology
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium leading-normal">Asisten AI, chatbots pintar, &amp; integrasi data.</p>
                                </Link>
                                <Link href="/solutions/cloud-cyber-security" className="group block space-y-0.5">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Cloud &amp; Cyber Security
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium leading-normal">Setup cloud infrastructure, DevOps, &amp; security.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Col 2: Kategori Layanan Lanjutan */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Strategi &amp; Desain
                            </span>
                            <div className="space-y-3.5">
                                <Link href="/solutions/creative-brand-experience" className="group block space-y-0.5">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Creative &amp; Brand Experience
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium leading-normal">UI/UX Figma wireframing, branding, &amp; video.</p>
                                </Link>
                                <Link href="/solutions/growth-marketing" className="group block space-y-0.5">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <TrendingUp className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Growth Marketing &amp; SEO
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium leading-normal">Dominasi SEO lokal &amp; iklan Google/Meta Ads.</p>
                                </Link>
                                <Link href="/solutions/consulting" className="group block space-y-0.5">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <HelpCircle className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        IT Consulting &amp; Strategy
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium leading-normal">Advisory transformasi teknologi digital.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Col 3: Produk SaaS & Aset Digital (SCALE) */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Produk &amp; Aset Digital (SCALE)
                            </span>
                            <div className="space-y-3.5">
                                <Link href="/products/diggity-erp" className="group block space-y-0.5">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Server className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Diggity ERP &amp; CRM
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium leading-normal">SaaS akuntansi, inventory, payroll B2B.</p>
                                </Link>
                                <Link href="/products/diggity-ai-agent" className="group block space-y-0.5">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Cpu className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Diggity AI Agent
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium leading-normal">Otomatisasi asisten chat &amp; customer lead.</p>
                                </Link>
                                <Link href="/products/sleek-dashboard-ui-kit" className="group block space-y-0.5">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Sleek Dashboard UI Kit
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium leading-normal">Aset digital UI Kit, templates &amp; assets.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Col 4: Tech Talent Solutions (Job Connect B2B/B2C) */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Penyediaan Talenta IT
                            </span>
                            <div className="space-y-3.5">
                                <Link href="/job-connect/headhunting" className="group block space-y-0.5">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <UserCheck className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        IT Headhunting
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium leading-normal">Rekrut individu terbaik sesuai kebutuhan tim secara cepat.</p>
                                </Link>
                                <Link href="/job-connect/outsourcing" className="group block space-y-0.5">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        IT Outsourcing
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium leading-normal">Bangun tim dengan rekrut skala besar dalam 7 hari.</p>
                                </Link>
                                <Link href="/job-connect?tab=careers" className="group block space-y-0.5">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Briefcase className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Job Connect
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium leading-normal">Menghubungkan talenta digital bersertifikat dengan partner.</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Academy Mega-Menu Panel */}
                {activeDropdown === 'academy' && (
                    <div 
                        className="absolute left-0 right-0 top-full mt-4 mx-auto max-w-6xl bg-brand-bg/95 border border-glass-border rounded-3xl p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                    >
                        {/* Col 1: Program Belajar (EMPOWER) */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Program Utama (EMPOWER)
                            </span>
                            <div className="space-y-3">
                                <Link href="/academy" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <GraduationCap className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Coding Bootcamps
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Pelatihan pemrograman intensif bersertifikat standar industri.</p>
                                </Link>
                                <Link href="/academy" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
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
                                        <BookOpen className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Self-Paced E-Courses
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Akses belajar mandiri materi koding lengkap beserta kuis kompetensi.</p>
                                </Link>
                                <Link href="/academy" className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
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

                {/* 3. Insights Mega-Menu Panel */}
                {activeDropdown === 'insights' && (
                    <div 
                        className="absolute left-0 right-0 top-full mt-4 mx-auto max-w-7xl bg-brand-bg/95 border border-glass-border rounded-3xl p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                    >
                        {/* Col 1: Categories (Left side) */}
                        <div className="space-y-4 border-r border-glass-border/40 pr-8">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                {language === 'id' ? 'Kategori Wawasan' : 'Categories'}
                            </span>
                            <div className="space-y-4">
                                <Link href="/insights" className="group flex items-start space-x-3 p-2 rounded-xl hover:bg-glass-bg transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                                        <BookOpen className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue">
                                            Blog
                                        </h4>
                                        <p className="text-[10px] text-text-gray font-medium leading-relaxed">
                                            {language === 'id' 
                                                ? 'Wawasan terkini seputar teknologi dan implementasinya dalam bisnis' 
                                                : 'Latest insights about technology and its implementation in business'}
                                        </p>
                                    </div>
                                </Link>
                                <Link href="/news" className="group flex items-start space-x-3 p-2 rounded-xl hover:bg-glass-bg transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue">
                                            {language === 'id' ? 'Berita & Pengumuman' : 'News & Announcements'}
                                        </h4>
                                        <p className="text-[10px] text-text-gray font-medium leading-relaxed">
                                            {language === 'id' 
                                                ? 'Kabar terkini seputar kemitraan, perilisan produk, dan inovasi Diggity' 
                                                : 'Latest news regarding partnerships, product releases, and innovations'}
                                        </p>
                                    </div>
                                </Link>
                                <Link href="/resources" className="group flex items-start space-x-3 p-2 rounded-xl hover:bg-glass-bg transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                                        <Layers className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue">
                                            {language === 'id' ? 'Resource Gratis' : 'Free Resources'}
                                        </h4>
                                        <p className="text-[10px] text-text-gray font-medium leading-relaxed">
                                            {language === 'id' 
                                                ? 'Template, dokumen panduan, dan e-book gratis untuk akselerasi kerja Anda' 
                                                : 'Free templates, guides, and e-books to accelerate your work'}
                                        </p>
                                    </div>
                                </Link>
                                <Link href="/community" className="group flex items-start space-x-3 p-2 rounded-xl hover:bg-glass-bg transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue">
                                            {language === 'id' ? 'Komunitas Digital' : 'Digital Community'}
                                        </h4>
                                        <p className="text-[10px] text-text-gray font-medium leading-relaxed">
                                            {language === 'id' 
                                                ? 'Tumbuh, berbagi, dan berjejaring bersama ratusan praktisi & talenta IT' 
                                                : 'Grow, share, and network with hundreds of IT practitioners & talents'}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Col 2 & 3: Featured Articles (Right side, spans 2 columns) */}
                        <div className="md:col-span-2 space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                {language === 'id' ? 'Unggulan dari Wawasan Digital' : 'Featured Insights'}
                            </span>
                            {featuredBlogs.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {featuredBlogs.map((blog) => {
                                        const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://yspcisyxfmxguqybhxam.supabase.co/storage/v1/object/public/diggity';
                                        const imageUrl = blog.image 
                                            ? `${storageUrl}/${blog.image}` 
                                            : '/placeholder-blog.jpg';
                                        
                                        return (
                                            <Link 
                                                key={blog.id} 
                                                href={`/insights/${blog.slug}`}
                                                className="group flex space-x-3 items-start p-2 rounded-xl hover:bg-glass-bg/60 transition-all border border-transparent hover:border-glass-border/30"
                                            >
                                                <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-neutral-900/10">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img 
                                                        src={imageUrl} 
                                                        alt={blog.title} 
                                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="space-y-1 min-w-0">
                                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                                                        {blog.title}
                                                    </h4>
                                                    <span className="text-[9px] font-bold text-brand-blue uppercase tracking-wider block">
                                                        {language === 'id' ? 'Baca lebih lanjut' : 'Read more'}
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-8 text-center text-xs text-text-gray font-medium">
                                    {language === 'id' ? 'Tidak ada artikel unggulan saat ini.' : 'No featured articles found.'}
                                </div>
                            )}

                            <div className="pt-2 border-t border-glass-border/40 flex justify-start">
                                <Link 
                                    href="/insights"
                                    className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark transition-colors flex items-center gap-1 group"
                                >
                                    {language === 'id' ? 'Lihat semua wawasan' : 'View all insights'}
                                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </Link>
                            </div>
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

                        {/* Mobile Product & Solution Accordion */}
                        <div className="border-b border-glass-border/40 py-1.5">
                            <button
                                onClick={() => setMobileExpanded(mobileExpanded === 'product_solution' ? null : 'product_solution')}
                                className="w-full text-base font-semibold text-text-gray flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={isActive('/solutions') || isActive('/products') || isActive('/job-connect') ? 'text-brand-blue' : ''}>
                                    {t('nav.product_solution')}
                                </span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'product_solution' ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileExpanded === 'product_solution' && (
                                <div className="mt-3 pl-4 space-y-3 text-sm animate-in fade-in duration-200">
                                    <Link href="/solutions/technology-solutions" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Technology Solutions
                                    </Link>
                                    <Link href="/solutions/ai-emerging-technology" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        AI &amp; Emerging Tech
                                    </Link>
                                    <Link href="/solutions/creative-brand-experience" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Creative &amp; Brand Experience
                                    </Link>
                                    <Link href="/solutions/growth-marketing" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Growth Marketing &amp; SEO
                                    </Link>
                                    <Link href="/solutions/cloud-cyber-security" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Cloud &amp; Cyber Security
                                    </Link>
                                    <Link href="/solutions/consulting" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        IT Consulting
                                    </Link>
                                    <Link href="/products" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1 border-t border-glass-border/30 pt-2 mt-2">
                                        SaaS &amp; Aset Digital
                                    </Link>
                                    <Link href="/job-connect/headhunting" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        IT Headhunting
                                    </Link>
                                    <Link href="/job-connect/outsourcing" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        IT Outsourcing
                                    </Link>
                                    <Link href="/job-connect?tab=careers" onClick={() => setIsOpen(false)} className="block text-brand-blue font-bold py-1">
                                        Job Connect &rarr;
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

                        {/* Mobile Insights Accordion */}
                        <div className="border-b border-glass-border/40 py-1.5">
                            <button
                                onClick={() => setMobileExpanded(mobileExpanded === 'insights' ? null : 'insights')}
                                className="w-full text-base font-semibold text-text-gray flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={isActive('/insights') ? 'text-brand-blue' : ''}>{t('nav.insights')}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'insights' ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileExpanded === 'insights' && (
                                <div className="mt-3 pl-4 space-y-3 text-sm animate-in fade-in duration-200">
                                    <Link href="/insights" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Blog
                                    </Link>
                                    <Link href="/news" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        {language === 'id' ? 'Berita & Pengumuman' : 'News & Announcements'}
                                    </Link>
                                    <Link href="/resources" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        {language === 'id' ? 'Resource Gratis' : 'Free Resources'}
                                    </Link>
                                    <Link href="/community" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        {language === 'id' ? 'Komunitas Digital' : 'Digital Community'}
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className={`text-base font-semibold py-1.5 transition-colors border-b border-glass-border/40 ${
                                isActive('/about') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.about')}
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
