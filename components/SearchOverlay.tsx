'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Loader2, Sparkles, Briefcase, BookOpen } from 'lucide-react';
import { api, SearchResults } from '../lib/api';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResults | null>(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Keyboard ESC hook
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Debounced search logic
    useEffect(() => {
        if (!query.trim()) {
            setResults(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        const delayDebounceFn = setTimeout(async () => {
            try {
                const res = await api.searchGlobal(query);
                setResults(res);
            } catch (err) {
                console.error('Error fetching global search results:', err);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleClose = () => {
        setQuery('');
        setResults(null);
        onClose();
    };

    if (!isOpen) return null;

    const hasResults = results && (
        results.services.length > 0 ||
        results.portfolios.length > 0 ||
        results.blogs.length > 0
    );

    return (
        <div 
            className="fixed inset-0 bg-neutral-950/70 z-[100] flex items-start justify-center pt-20 md:pt-28 px-4"
            onClick={handleClose}
        >
            <div 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[70vh] flex flex-col overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Bar Header */}
                <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800 py-4 relative">
                    <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari Layanan, Portofolio, atau Artikel..."
                        className="w-full bg-transparent border-none text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-base font-medium"
                    />
                    
                    {loading ? (
                        <Loader2 className="w-5 h-5 text-brand-blue animate-spin mr-3" />
                    ) : query ? (
                        <button 
                            onClick={() => setQuery('')}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded mr-2"
                        >
                            <X className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        </button>
                    ) : null}

                    <button 
                        onClick={handleClose}
                        className="p-1.5 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-800 cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs font-bold"
                    >
                        ESC
                    </button>
                </div>

                {/* Search Results Area */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {/* Placeholder when search is empty */}
                    {!query && (
                        <div className="text-center py-10 space-y-2">
                            <Search className="w-10 h-10 text-brand-blue/60 mx-auto animate-pulse" />
                            <p className="text-sm font-bold text-slate-800 dark:text-white">Pencarian Terpadu Diggity</p>
                            <p className="text-xs font-medium text-slate-600 dark:text-slate-200 max-w-xs mx-auto leading-relaxed">
                                Temukan informasi mengenai Layanan Divisi, Studi Kasus Portofolio, atau Artikel Blog secara cepat.
                            </p>
                        </div>
                    )}

                    {/* Loader */}
                    {loading && !results && (
                        <div className="flex flex-col items-center justify-center py-12 space-y-3">
                            <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Mencari kecocokan data...</span>
                        </div>
                    )}

                    {/* No results */}
                    {query && !loading && !hasResults && (
                        <div className="text-center py-10 space-y-2">
                            <p className="text-sm font-semibold text-slate-800 dark:text-white">Tidak ada hasil cocok</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                                Coba ketik kata kunci lain yang berhubungan dengan pengembangan sistem, SEO, hosting, atau digital skill.
                            </p>
                        </div>
                    )}

                    {/* Results lists */}
                    {query && hasResults && (
                        <div className="space-y-6 text-left">
                            
                            {/* 1. Services */}
                            {results.services.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2">
                                        Layanan Divisi ({results.services.length})
                                    </h4>
                                    <div className="flex flex-col">
                                        {results.services.map((service) => (
                                            <Link
                                                key={service.id}
                                                href={`/services/${service.slug}`}
                                                onClick={handleClose}
                                                className="flex items-center p-3 border border-slate-200/60 dark:border-slate-800/80 rounded-xl transition-all group bg-white/20 dark:bg-slate-950/20 hover:bg-white/60 dark:hover:bg-slate-900/60 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 mb-2 last:mb-0 shadow-sm"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 flex-shrink-0">
                                                    <Sparkles className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-brand-blue transition-colors">
                                                        {service.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                                        {service.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 2. Portfolios */}
                            {results.portfolios.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2">
                                        Studi Kasus Portofolio ({results.portfolios.length})
                                    </h4>
                                    <div className="flex flex-col">
                                        {results.portfolios.map((project) => (
                                            <Link
                                                key={project.id}
                                                href={`/portfolio/${project.slug}`}
                                                onClick={handleClose}
                                                className="flex items-center p-3 border border-slate-200/60 dark:border-slate-800/80 rounded-xl transition-all group bg-white/20 dark:bg-slate-950/20 hover:bg-white/60 dark:hover:bg-slate-900/60 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 mb-2 last:mb-0 shadow-sm"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mr-3 flex-shrink-0">
                                                    <Briefcase className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-brand-blue transition-colors">
                                                        {project.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                                        Klien: {project.client} &bull; {project.problem}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 3. Blogs */}
                            {results.blogs.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2">
                                        Artikel Blog ({results.blogs.length})
                                    </h4>
                                    <div className="flex flex-col">
                                        {results.blogs.map((blog) => (
                                            <Link
                                                key={blog.id}
                                                href={`/blog/${blog.slug}`}
                                                onClick={handleClose}
                                                className="flex items-center p-3 border border-slate-200/60 dark:border-slate-800/80 rounded-xl transition-all group bg-white/20 dark:bg-slate-950/20 hover:bg-white/60 dark:hover:bg-slate-900/60 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 mb-2 last:mb-0 shadow-sm"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-3 flex-shrink-0">
                                                    <BookOpen className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-brand-blue transition-colors">
                                                        {blog.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                                        {blog.category?.name || 'Umum'} &bull; Baca artikel edukasi
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
