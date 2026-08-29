'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
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
    Briefcase,
    Info
    ChevronRight,
    ArrowUpRight,
} from 'lucide-react';
import SubServiceIcon from './SubServiceIcon';
import SearchOverlay from './SearchOverlay';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api, Blog, Product, Service , CategoryHierarchy } from "../lib/api";

export default function Navbar() {
    const { user, loading } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [activeDropdown, setActiveDropdown] = useState<'solutions' | 'products' | 'academy' | 'portfolio' | 'insights' | null>(null);
    const [mobileExpanded, setMobileExpanded] = useState<'solutions' | 'products' | 'academy' | 'portfolio' | 'insights' | null>(null);
    const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [productHierarchy, setProductHierarchy] = useState<CategoryHierarchy[]>([]);
    const [hoveredSolutionCategory, setHoveredSolutionCategory] = useState<string>('technology');
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

        // Fetch services (now using getSolutions to get all 56 items)
        api.getSolutions()
            .then((data) => {
                setServices(data || []);
            })
            .catch((err) => {
                console.error('Failed to load services in navbar:', err);
            });

        // Fetch products
        api.getProductHierarchy()
            .then((data) => {
                setProductHierarchy(data || []);
            })
            .catch((err) => {
                console.error('Failed to load product hierarchy in navbar:', err);
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

    // Keyboard shortcut CMD+K / Ctrl+K hook to toggle search kawan
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen((prev) => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

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

    const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (type: 'solutions' | 'products' | 'academy' | 'portfolio' | 'insights') => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setActiveDropdown(type);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 200);
    };

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '/#contact');
            }
        }
        setIsOpen(false);
    };

    // Helper helper for dynamic icons
    const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
        const iconMap: Record<string, any> = {
            'code': Code,
            'cpu': Cpu,
            'shield-check': ShieldCheck,
            'layers': Layers,
            'trending-up': TrendingUp,
            'help-circle': HelpCircle,
            'server': Server,
            'user-check': UserCheck,
            'users': Users,
            'briefcase': Briefcase,
        };
        const IconComponent = iconMap[name.toLowerCase()] || HelpCircle;
        return <IconComponent className={className} />;
    };

    const getServiceHref = (slug: string, categorySlug?: string) => {
        if (categorySlug === 'it-talent-workforce') {
            if (slug === 'it-headhunting') return '/job-connect/headhunting';
            if (slug === 'it-outsourcing') return '/job-connect/outsourcing';
        }
        return categorySlug ? `/solutions/${categorySlug}/${slug}` : `/solutions/${slug}`;
    };

    const SOLUTION_CATEGORIES = [
        { name: 'Technology Solutions', slug: 'technology', icon: 'code', description: 'End-to-end technology solutions to build and integrate digital systems.' },
        { name: 'AI & Emerging Technology', slug: 'ai-emerging-technology', icon: 'cpu', description: 'AI, data, automation, IoT, and emerging tech capabilities.' },
        { name: 'Creative & Brand Experience', slug: 'creative-brand-experience', icon: 'layers', description: 'Branding, creative production, and digital experience.' },
        { name: 'Growth Marketing', slug: 'growth-marketing', icon: 'trending-up', description: 'Digital marketing strategy for awareness and conversion.' },
        { name: 'Cloud & Cyber Security', slug: 'cloud-cyber-security', icon: 'shield-check', description: 'Cloud infrastructure, DevOps, security, and managed services.' },
        { name: 'Consulting', slug: 'consulting', icon: 'help-circle', description: 'Technology, business, and digital transformation consulting.' },
        { name: 'IT Talent & Workforce', slug: 'it-talent-workforce', icon: 'users', description: 'Provision and management of IT talent (Headhunting & Outsourcing).' }
    ];

    

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
                    <Link href="/" className="flex items-center space-x-2.5 shrink-0">
                        <div className="relative w-8 h-8 overflow-hidden rounded-full border border-glass-border">
                            <Image 
                                src="/logo-round.png" 
                                alt="Diggity Logo" 
                                fill 
                                className="object-cover" 
                            />
                        </div>
                        <span className="text-xl font-black tracking-tight text-text-main">
                            DIGGITY<span className="text-brand-blue">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-1 xl:space-x-3.5">
                        {/* 1. About Link */}
                        <Link
                            href="/about"
                            className={`text-[13px] font-bold transition-colors hover:text-brand-blue px-2.5 py-2 rounded-lg ${
                                isActive('/about') ? 'text-brand-blue' : 'text-text-gray'
                            }`}
                        >
                            {t('nav.about')}
                        </Link>

                        {/* 2. Solutions Dropdown Menu (Hover) */}
                        <div 
                            className="relative" 
                            onMouseEnter={() => handleMouseEnter('solutions')} 
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                href="/solutions"
                                className={`text-[13px] font-bold transition-colors hover:text-brand-blue px-2.5 py-2 rounded-lg flex items-center space-x-1 cursor-pointer ${
                                    isActive('/solutions') || isActive('/job-connect/headhunting') || isActive('/job-connect/outsourcing')
                                        ? 'text-brand-blue' 
                                        : 'text-text-gray'
                                }`}
                            >
                                <span>Solutions</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                            </Link>
                        </div>

                        {/* 3. Products Dropdown Menu (Hover) */}
                        <div 
                            className="relative"
                            onMouseEnter={() => handleMouseEnter('products')} 
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                href="/products"
                                className={`text-[13px] font-bold transition-colors hover:text-brand-blue px-2.5 py-2 rounded-lg flex items-center space-x-1 cursor-pointer ${
                                    isActive('/products') ? 'text-brand-blue' : 'text-text-gray'
                                }`}
                            >
                                <span>Products</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                            </Link>
                        </div>

                        {/* 4. Academy Dropdown Menu (Hover) */}
                        <div 
                            className="relative"
                            onMouseEnter={() => handleMouseEnter('academy')} 
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                href="/academy"
                                className={`text-[13px] font-bold transition-colors hover:text-brand-blue px-2.5 py-2 rounded-lg flex items-center space-x-1 cursor-pointer ${
                                    isActive('/academy') ? 'text-brand-blue' : 'text-text-gray'
                                }`}
                            >
                                <span>{t('nav.academy')}</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'academy' ? 'rotate-180' : ''}`} />
                            </Link>
                        </div>

                        {/* 5. Portfolio Dropdown Menu (Hover) */}
                        <div 
                            className="relative"
                            onMouseEnter={() => handleMouseEnter('portfolio')} 
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                href="/portfolio"
                                className={`text-[13px] font-bold transition-colors hover:text-brand-blue px-2.5 py-2 rounded-lg flex items-center space-x-1 cursor-pointer ${
                                    isActive('/portfolio') ? 'text-brand-blue' : 'text-text-gray'
                                }`}
                            >
                                <span>{t('nav.portfolio')}</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'portfolio' ? 'rotate-180' : ''}`} />
                            </Link>
                        </div>

                        {/* 6. Insights Dropdown Menu (Hover) */}
                        <div 
                            className="relative"
                            onMouseEnter={() => handleMouseEnter('insights')} 
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                href="/insights"
                                className={`text-[13px] font-bold transition-colors hover:text-brand-blue px-2.5 py-2 rounded-lg flex items-center space-x-1 cursor-pointer ${
                                    isActive('/insights') || isActive('/news') || isActive('/community') || isActive('/partnership')
                                        ? 'text-brand-blue' 
                                        : 'text-text-gray'
                                }`}
                            >
                                <span>{t('nav.insights')}</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'insights' ? 'rotate-180' : ''}`} />
                            </Link>
                        </div>

                        {/* 7. Career (Main Menu Link) */}
                        <Link
                            href="/job-connect"
                            className={`text-[13px] font-bold transition-colors hover:text-brand-blue px-2.5 py-2 rounded-lg ${
                                isActive('/job-connect') && !pathname.includes('/headhunting') && !pathname.includes('/outsourcing')
                                    ? 'text-brand-blue' 
                                    : 'text-text-gray'
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

                        {/* Search Button Toggle kawan */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-1.5 border border-glass-border rounded-xl bg-glass-bg cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center w-9 h-9 text-text-main"
                            aria-label="Search"
                        >
                            <Search className="w-4 h-4" />
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
                            href="/#contact"
                            onClick={handleContactClick}
                            className="inline-flex items-center justify-center px-4.5 py-2 text-sm font-extrabold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all shadow-md shadow-brand-blue/10 hover:scale-[1.02]"
                        >
                            {language === 'en' ? 'Contact Us' : 'Hubungi Kami'}
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
                
                {/* 1. Solutions Mega-Menu Panel (Mekari Style Tab UI) */}
                {activeDropdown === 'solutions' && (
                    <div 
                        onMouseEnter={() => handleMouseEnter('solutions')}
                        onMouseLeave={handleMouseLeave}
                        className="absolute left-0 right-0 top-full mt-4 mx-auto max-w-6xl bg-brand-bg/95 border border-glass-border rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row gap-6 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50 min-h-[420px]"
                    >
                        {/* Left Pane: Categories (Tab List) */}
                        <div className="w-full md:w-1/3 flex flex-col space-y-1 border-r border-glass-border/40 pr-6">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2 mb-2 shrink-0">
                                Solution Categories
                            </span>
                            <div className="space-y-1 max-h-[350px] overflow-y-auto overscroll-contain pr-2 custom-scrollbar">
                                {SOLUTION_CATEGORIES.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={`/solutions/${cat.slug}`}
                                        onMouseEnter={() => setHoveredSolutionCategory(cat.slug)}
                                        onClick={() => setActiveDropdown(null)}
                                        className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                                            hoveredSolutionCategory === cat.slug 
                                                ? 'bg-glass-bg border border-glass-border/60 shadow-sm' 
                                                : 'border border-transparent hover:bg-glass-bg/50'
                                        }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                            hoveredSolutionCategory === cat.slug 
                                                ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20' 
                                                : 'bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue/20'
                                        }`}>
                                            <DynamicIcon name={cat.icon} className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h4 className={`text-[13px] font-extrabold leading-tight transition-colors ${
                                                hoveredSolutionCategory === cat.slug ? 'text-brand-blue' : 'text-text-main group-hover:text-brand-blue'
                                            }`}>
                                                {cat.name}
                                            </h4>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 -rotate-90 transition-transform ${hoveredSolutionCategory === cat.slug ? 'text-brand-blue opacity-100 translate-x-1' : 'text-text-muted opacity-0 group-hover:opacity-50'}`} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Pane: Sub-Services Content */}
                        <div className="w-full md:w-2/3 flex flex-col">
                            {(() => {
                                const activeCat = SOLUTION_CATEGORIES.find(c => c.slug === hoveredSolutionCategory) || SOLUTION_CATEGORIES[0];
                                const subServices = services.filter(s => s.category?.slug === activeCat.slug);
                                
                                return (
                                    <>
                                        <div className="flex items-center justify-between border-b border-glass-border pb-3 mb-4">
                                            <div>
                                                <h3 className="text-lg font-black text-text-main flex items-center gap-2">
                                                    {activeCat.name}
                                                </h3>
                                                <p className="text-[11px] text-text-gray font-medium mt-0.5 max-w-md">{activeCat.description}</p>
                                            </div>
                                            <Link 
                                                href={`/solutions/${activeCat.slug}`}
                                                onClick={() => setActiveDropdown(null)}
                                                className="text-[11px] font-bold text-brand-blue bg-brand-blue/10 hover:bg-brand-blue hover:text-white transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0"
                                            >
                                                Explore All <ArrowUpRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                        
                                        {subServices.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[350px] overflow-y-auto overscroll-contain pr-2 custom-scrollbar content-start">
                                                {subServices.map((svc) => (
                                                    <Link 
                                                        key={svc.slug}
                                                        href={getServiceHref(svc.slug, activeCat.slug)}
                                                        onClick={() => setActiveDropdown(null)}
                                                        className="group p-3 rounded-xl border border-transparent hover:border-glass-border hover:bg-glass-bg transition-all flex flex-col gap-2"
                                                    >
                                                        <div className="w-7 h-7 rounded-md bg-brand-blue/5 flex items-center justify-center shrink-0 border border-brand-blue/10">
                                                            <SubServiceIcon slug={svc.slug} fallbackCategoryIcon={activeCat.icon} className="w-3.5 h-3.5 text-brand-blue/70 group-hover:text-brand-blue transition-colors" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[12px] font-extrabold text-text-main group-hover:text-brand-blue transition-colors leading-tight">
                                                                {svc.name}
                                                            </h4>
                                                            <p className="text-[10px] text-text-gray font-medium line-clamp-2 mt-1 leading-relaxed">
                                                                {svc.description || `Layanan profesional untuk ${svc.name} yang disesuaikan dengan kebutuhan Anda.`}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex-1 flex flex-col items-center justify-center text-text-muted">
                                                <div className="w-12 h-12 rounded-full border border-glass-border flex items-center justify-center mb-3 bg-glass-bg animate-pulse">
                                                    <DynamicIcon name={activeCat.icon} className="w-5 h-5 text-brand-blue/30" />
                                                </div>
                                                <p className="text-xs font-medium">Memuat sub-layanan...</p>
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                )}

                {/* 2. Products Mega-Menu Panel (Mekari-style Tab UI) */}
                {activeDropdown === 'products' && (
                    <div 
                        onMouseEnter={() => handleMouseEnter('products')}
                        onMouseLeave={handleMouseLeave}
                        className="absolute left-0 right-0 top-full mt-4 mx-auto max-w-6xl bg-brand-bg/95 border border-glass-border rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row gap-6 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50 min-h-[380px] overscroll-contain overflow-y-auto max-h-[calc(100vh-100px)]"
                    >
                        {/* Left Pane: Main Categories */}
                        <div className="w-full md:w-1/3 flex flex-col border-r border-glass-border/40 pr-6">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2 mb-2 shrink-0">
                                Product Categories
                            </span>
                            <div className="space-y-1">
                                {productHierarchy.map((mainCat) => (
                                    <Link 
                                        key={mainCat.slug}
                                        href={`/products/${mainCat.slug}`}
                                        className="w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between group hover:bg-glass-bg border border-transparent"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-brand-blue/20 bg-brand-blue/10`}>
                                                <Layers className={`w-4 h-4 text-brand-blue`} />
                                            </div>
                                            <span className="text-[13px] font-extrabold text-text-main group-hover:text-brand-blue transition-colors">
                                                {mainCat.name}
                                            </span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-text-gray/50 group-hover:text-brand-blue transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Pane: Subcategories */}
                        <div className="w-full md:w-2/3 flex flex-col">
                            <div className="flex items-center justify-between mb-4 shrink-0">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-black text-text-main">
                                        Explore Products
                                    </h3>
                                    <p className="text-xs text-text-gray font-medium">
                                        Discover our comprehensive suite of digital products.
                                    </p>
                                </div>
                                <Link 
                                    href="/products" 
                                    className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 bg-brand-blue/10 px-3 py-1.5 rounded-full transition-colors"
                                    onClick={() => setActiveDropdown(null)}
                                >
                                    Explore All <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                            
                            {/* We just list all subcategories from all main categories (or we could make it hover-based, but PDF says "Mega Menu hanya menampilkan kategori utama dan subkategori") */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto overscroll-contain pr-2 custom-scrollbar content-start">
                                {productHierarchy.flatMap(main => main.children || []).map((subCat) => (
                                    <Link 
                                        key={subCat.slug}
                                        href={`/products/${productHierarchy.find(m => m.children?.some(c => c.slug === subCat.slug))?.slug}/${subCat.slug}`}
                                        onClick={() => setActiveDropdown(null)}
                                        className="group p-3 rounded-xl border border-transparent hover:border-glass-border hover:bg-glass-bg transition-all flex flex-col gap-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <SubServiceIcon slug={subCat.slug} fallbackCategoryIcon="layers" className="w-4 h-4 text-brand-blue/70 group-hover:text-brand-blue transition-colors" />
                                            <h4 className="text-[13px] font-extrabold text-text-main group-hover:text-brand-blue transition-colors leading-tight">
                                                {subCat.name}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* 3. Academy Mega-Menu Panel */}
                {activeDropdown === 'academy' && (
                    <div 
                        onMouseEnter={() => handleMouseEnter('academy')}
                        onMouseLeave={handleMouseLeave}
                        className="absolute left-0 right-0 top-full mt-4 mx-auto max-w-6xl bg-brand-bg/95 border border-glass-border rounded-3xl p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                    >
                        {/* Col 1: Program Belajar (EMPOWER) */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Main Programs (EMPOWER)
                            </span>
                            <div className="space-y-3">
                                <Link href="/academy?category=coding-bootcamps" onClick={() => setActiveDropdown(null)} className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <GraduationCap className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Coding Bootcamps
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Intensive coding bootcamps with industry-standard certification.</p>
                                </Link>
                                <Link href="/academy?category=corporate-it-training" onClick={() => setActiveDropdown(null)} className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Corporate IT Training
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">In-house customized tech training and upskilling for companies.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Col 2: Sumber Belajar Digital */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                E-Learning &amp; Resources
                            </span>
                            <div className="space-y-3">
                                <Link href="/academy?category=self-paced-e-courses" onClick={() => setActiveDropdown(null)} className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <BookOpen className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Self-Paced E-Courses
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Self-paced coding courses with quizzes and assessments.</p>
                                </Link>
                                <Link href="/academy?category=digital-e-books" onClick={() => setActiveDropdown(null)} className="group block space-y-1">
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
                                        Digital E-Books
                                    </h4>
                                    <p className="text-[10px] text-text-gray font-medium">Download free programming guides and software engineering ebooks.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Col 3: Promosi B2B Panel */}
                        <div className="p-6 bg-glass-bg border border-glass-border/60 rounded-2xl flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                                <span className="px-2.5 py-0.5 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[9px] font-bold uppercase tracking-wider rounded-md inline-block">
                                    LMS Portal
                                </span>
                                <h4 className="text-sm font-extrabold text-text-main">Get Certified?</h4>
                                <p className="text-[11px] text-text-gray leading-relaxed font-medium">
                                    Complete the learning modules, pass the competency quizzes, and download your verified certificate instantly.
                                </p>
                            </div>
                            <Link 
                                href="/academy"
                                className="inline-flex items-center justify-center py-2 px-4 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue-dark transition-colors self-start group"
                            >
                                Open Academy
                                <ArrowUpRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </div>
                )}

                {/* 4. Portfolio Dropdown Panel */}
                {activeDropdown === 'portfolio' && (
                    <div 
                        onMouseEnter={() => handleMouseEnter('portfolio')}
                        onMouseLeave={handleMouseLeave}
                        className="absolute left-1/3 right-auto top-full mt-4 mx-auto max-w-sm bg-brand-bg/95 border border-glass-border rounded-2xl p-6 shadow-2xl backdrop-blur-2xl text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50 space-y-4"
                    >
                        <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                            Explore Portfolios
                        </span>
                        <div className="space-y-2">
                            <Link href="/portfolio/it" className="group block p-2 rounded-xl hover:bg-glass-bg transition-colors">
                                <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue">
                                    IT Portfolio
                                </h4>
                                <p className="text-[10px] text-text-gray mt-0.5 leading-relaxed">
                                    Website, Mobile App, Software, ERP, AI, Digital Platform
                                </p>
                            </Link>
                            <Link href="/portfolio/marketing" className="group block p-2 rounded-xl hover:bg-glass-bg transition-colors">
                                <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue">
                                    Marketing &amp; Creative Portfolio
                                </h4>
                                <p className="text-[10px] text-text-gray mt-0.5 leading-relaxed">
                                    Branding, Campaign, Social Media, Creative, Video, Digital Marketing
                                </p>
                            </Link>
                        </div>
                    </div>
                )}

                {/* 5. Insights Mega-Menu Panel */}
                {activeDropdown === 'insights' && (
                    <div 
                        onMouseEnter={() => handleMouseEnter('insights')}
                        onMouseLeave={handleMouseLeave}
                        className="absolute left-0 right-0 top-full mt-4 mx-auto max-w-7xl bg-brand-bg/95 border border-glass-border rounded-3xl p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                    >
                        {/* Col 1: Categories (Left side) */}
                        <div className="space-y-4 border-r border-glass-border/40 pr-8">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Categories
                            </span>
                            <div className="space-y-1">
                                <Link href="/insights" className="group flex items-center space-x-2.5 py-1.5 px-2 rounded-xl hover:bg-glass-bg transition-colors">
                                    <div className="w-7 h-7 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                        <BookOpen className="w-3.5 h-3.5" />
                                    </div>
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue">
                                        Blog &amp; Education
                                    </h4>
                                </Link>
                                <Link href="/news" className="group flex items-center space-x-2.5 py-1.5 px-2 rounded-xl hover:bg-glass-bg transition-colors">
                                    <div className="w-7 h-7 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                    </div>
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue">
                                        News &amp; Announcements
                                    </h4>
                                </Link>
                                <Link href="/community" className="group flex items-center space-x-2.5 py-1.5 px-2 rounded-xl hover:bg-glass-bg transition-colors">
                                    <div className="w-7 h-7 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                        <Users className="w-3.5 h-3.5" />
                                    </div>
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue">
                                        Digital Community
                                    </h4>
                                </Link>
                                <Link href="/portfolio" className="group flex items-center space-x-2.5 py-1.5 px-2 rounded-xl hover:bg-glass-bg transition-colors">
                                    <div className="w-7 h-7 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                        <Briefcase className="w-3.5 h-3.5" />
                                    </div>
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue">
                                        Success Stories
                                    </h4>
                                </Link>
                                <Link href="/partnership" className="group flex items-center space-x-2.5 py-1.5 px-2 rounded-xl hover:bg-glass-bg transition-colors">
                                    <div className="w-7 h-7 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                        <Users className="w-3.5 h-3.5" />
                                    </div>
                                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand-blue">
                                        Partnership / Referral
                                    </h4>
                                </Link>
                            </div>
                        </div>

                        {/* Col 2 & 3: Featured Articles (Right side, spans 2 columns) */}
                        <div className="md:col-span-2 space-y-4">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2">
                                Featured Insights
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
                                                        Read more
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-8 text-center text-xs text-text-gray font-medium">
                                    No featured articles found.
                                </div>
                            )}

                            <div className="pt-2 border-t border-glass-border/40 flex justify-start">
                                <Link 
                                    href="/insights"
                                    className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark transition-colors flex items-center gap-1 group"
                                >
                                    View all insights
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

                        {/* Mobile About Link */}
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
                                <span className={isActive('/solutions') || isActive('/job-connect/headhunting') || isActive('/job-connect/outsourcing') ? 'text-brand-blue' : ''}>
                                    Solutions
                                </span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'solutions' ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileExpanded === 'solutions' && (
                                <div className="mt-3 pl-4 space-y-3 text-sm animate-in fade-in duration-200">
                                    <Link href="/solutions" onClick={() => setIsOpen(false)} className="block text-brand-blue font-bold hover:text-brand-blue-dark py-1 mb-2 border-b border-glass-border/40 pb-2">
                                        Lihat Semua Solusi ➔
                                    </Link>
                                    {SOLUTION_CATEGORIES.map((item, idx) => (
                                        <Link key={`ms-${idx}`} href={`/solutions/${item.slug}`} onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Products Accordion */}
                        <div className="border-b border-glass-border/40 py-1.5">
                            <button
                                onClick={() => setMobileExpanded(mobileExpanded === 'products' ? null : 'products')}
                                className="w-full text-base font-semibold text-text-gray flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={isActive('/products') ? 'text-brand-blue' : ''}>
                                    Products
                                </span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'products' ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileExpanded === 'products' && (
                                <div className="mt-3 pl-4 space-y-3 text-sm animate-in fade-in duration-200">
                                    <Link href="/products" onClick={() => setIsOpen(false)} className="block text-brand-blue font-bold hover:text-brand-blue-dark py-1 mb-2 border-b border-glass-border/40 pb-2">
                                        Lihat Semua Produk ➔
                                    </Link>
                                    {productHierarchy.map((mainCat, idx) => (
                                        <Link key={`mpp-${idx}`} href={`/products/${mainCat.slug}`} onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                            {mainCat.name}
                                        </Link>
                                    ))}
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
                                    <Link href="/academy?category=coding-bootcamps" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Coding Bootcamps
                                    </Link>
                                    <Link href="/academy?category=corporate-it-training" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Corporate IT Training
                                    </Link>
                                    <Link href="/academy?category=self-paced-e-courses" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Self-Paced E-Courses
                                    </Link>
                                    <Link href="/academy?category=digital-e-books" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Digital E-Books
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Portfolio Accordion */}
                        <div className="border-b border-glass-border/40 py-1.5">
                            <button
                                onClick={() => setMobileExpanded(mobileExpanded === 'portfolio' ? null : 'portfolio')}
                                className="w-full text-base font-semibold text-text-gray flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={isActive('/portfolio') ? 'text-brand-blue' : ''}>
                                    Portfolio
                                </span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'portfolio' ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileExpanded === 'portfolio' && (
                                <div className="mt-3 pl-4 space-y-3 text-sm animate-in fade-in duration-200">
                                    <Link href="/portfolio/it" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        IT Portfolio
                                    </Link>
                                    <Link href="/portfolio/marketing" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Marketing &amp; Creative Portfolio
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Insights Accordion */}
                        <div className="border-b border-glass-border/40 py-1.5">
                            <button
                                onClick={() => setMobileExpanded(mobileExpanded === 'insights' ? null : 'insights')}
                                className="w-full text-base font-semibold text-text-gray flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={isActive('/insights') || isActive('/news') || isActive('/community') || isActive('/partnership') ? 'text-brand-blue' : ''}>{t('nav.insights')}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'insights' ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileExpanded === 'insights' && (
                                <div className="mt-3 pl-4 space-y-3 text-sm animate-in fade-in duration-200">
                                    <Link href="/insights" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Blog &amp; Education
                                    </Link>
                                    <Link href="/news" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        News &amp; Announcements
                                    </Link>
                                    <Link href="/community" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Digital Community
                                    </Link>
                                    <Link href="/portfolio" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Success Stories
                                    </Link>
                                    <Link href="/partnership" onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                        Partnership / Referral
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Career Direct Link */}
                        <Link
                            href="/job-connect"
                            onClick={() => setIsOpen(false)}
                            className={`text-base font-semibold py-1.5 transition-colors border-b border-glass-border/40 ${
                                isActive('/job-connect') && !pathname.includes('/headhunting') && !pathname.includes('/outsourcing')
                                    ? 'text-brand-blue' 
                                    : 'text-text-gray'
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
                                href="/#contact"
                                onClick={handleContactClick}
                                className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-bold text-brand-blue bg-glass-bg border border-glass-border hover:bg-glass-bg-hover rounded-xl transition-colors"
                            >
                                {language === 'en' ? 'Contact Us' : 'Hubungi Kami'}
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
