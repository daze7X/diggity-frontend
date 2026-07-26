'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Search } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
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

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Blog', path: '/blog' },
        { name: 'Career', path: '/career' },
    ];

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(path);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isSearchOpen
                    ? 'bg-transparent border-transparent py-6 backdrop-blur-none'
                    : scrolled
                    ? 'bg-brand-bg/85 backdrop-blur-md border-b border-glass-border py-4'
                    : 'bg-transparent py-6'
            }`}
        >
            <div className={`max-w-7xl mx-auto px-6 md:px-8 transition-opacity duration-200 ${isSearchOpen ? 'opacity-0 pointer-events-none' : ''}`}>
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-black tracking-tight text-text-main">
                            DIGGITY<span className="text-brand-blue">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                                    isActive(link.path) ? 'text-brand-blue font-semibold' : 'text-text-gray'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 border border-glass-border rounded-lg bg-glass-bg cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center w-8 h-8 text-text-main"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
                            )}
                        </button>

                        {/* Search Button */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 border border-glass-border rounded-lg bg-glass-bg cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center w-8 h-8 text-text-main"
                            aria-label="Search"
                        >
                            <Search className="w-4 h-4" />
                        </button>

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-lg transition-colors group shadow-md shadow-brand-blue/10"
                        >
                            Contact Us
                            <ArrowUpRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button & Toggler */}
                    <div className="md:hidden flex items-center space-x-4">
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

                        {/* Mobile Search Button */}
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
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {isOpen && (
                    <div className="md:hidden mt-4 bg-brand-bg/95 border border-glass-border rounded-2xl p-6 absolute top-full left-6 right-6 shadow-2xl backdrop-blur-xl transition-all duration-300">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-base font-medium py-1.5 transition-colors border-b border-glass-border ${
                                        isActive(link.path) ? 'text-brand-blue font-semibold' : 'text-text-gray'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-colors"
                            >
                                Contact Us
                                <ArrowUpRight className="ml-1.5 w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Global Search Overlay (FR-012) */}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav>
    );
}
