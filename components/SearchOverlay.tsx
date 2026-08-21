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
            setTimeout(() => inputRef.current?.focus(), 150);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    // Debounced search logic
    useEffect(() => {
        if (!query.trim()) {
            setResults(null);
            setLoading(false);
            return;
        }

        let active = true;

        setLoading(true);
        const delayDebounceFn = setTimeout(async () => {
            try {
                const res = await api.searchGlobal(query);
                if (active) {
                    setResults(res);
                }
            } catch (err) {
                console.error('Error fetching global search results:', err);
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }, 300);

        return () => {
            active = false;
            clearTimeout(delayDebounceFn);
        };
    }, [query]);

    const handleClose = () => {
        setQuery('');
        setResults(null);
        onClose();
    };

    const hasResults = results && (
        results.services.length > 0 ||
        results.portfolios.length > 0 ||
        results.blogs.length > 0
    );

    return (
        <>
            {/* Click-away backdrop dim overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
                    onClick={handleClose}
                />
            )}

            {/* Slide-down Drawer Panel */}
            <div 
                className={`absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 ease-in-out z-50 overflow-y-auto max-h-[80vh] ${
                    isOpen ? 'py-6 opacity-100 translate-y-0' : 'py-0 opacity-0 pointer-events-none -translate-y-2'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-6">
                    {/* Search Input Bar */}
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 px-4 py-3 relative shadow-inner">
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
                                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded mr-2"
                            >
                                <X className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            </button>
                        ) : null}

                        <button 
                            onClick={handleClose}
                            className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-850 cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs font-bold shadow-sm"
                        >
                            ESC
                        </button>
                    </div>

                    {/* Results Container */}
                    <div className="space-y-6">
                        {/* Placeholder when search is empty */}
                        {!query && (
                            <div className="text-center py-8 space-y-2">
                                <Search className="w-10 h-10 text-brand-blue/60 mx-auto animate-pulse" />
                                <p className="text-sm font-bold text-slate-800 dark:text-white">Pencarian Terpadu Diggity</p>
                                <p className="text-xs font-medium text-slate-600 dark:text-slate-300 max-w-xs mx-auto leading-relaxed">
                                    Temukan informasi mengenai Layanan Divisi, Studi Kasus Portofolio, atau Artikel Blog secara cepat.
                                </p>
                            </div>
                        )}

                        {/* Loader */}
                        {loading && !results && (
                            <div className="flex flex-col items-center justify-center py-10 space-y-3">
                                <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
                                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Mencari kecocokan data...</span>
                            </div>
                        )}

                        {/* No results */}
                        {query && !loading && !hasResults && (
                            <div className="text-center py-8 space-y-2">
                                <p className="text-sm font-semibold text-slate-800 dark:text-white">{language === 'en' ? 'No matching results' : 'Tidak ada hasil cocok'}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                                    {language === 'en' ? 'Try typing other keywords related to system development, SEO, hosting, or digital skills.' : 'Coba ketik kata kunci lain yang berhubungan dengan pengembangan sistem, SEO, hosting, atau digital skill.'}
                                </p>
                            </div>
                        )}

                        {/* Results lists */}
                        {query && hasResults && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                                
                                {/* 1. Services */}
                                {results.services.length > 0 ? (
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2">
                                            Layanan Divisi ({results.services.length})
                                        </h4>
                                        <div className="flex flex-col">
                                            {results.services.map((service) => (
                                                <Link
                                                    key={service.id}
                                                    href={`/solutions/${service.slug}`}
                                                    onClick={handleClose}
                                                    className="flex items-center p-3 border border-slate-200/60 dark:border-slate-800/80 rounded-xl transition-all group bg-white dark:bg-slate-950/20 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 mb-2 last:mb-0 shadow-sm"
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
                                ) : (
                                    <div className="hidden md:block"></div>
                                )}

                                {/* 2. Portfolios */}
                                {results.portfolios.length > 0 ? (
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
                                                    className="flex items-center p-3 border border-slate-200/60 dark:border-slate-800/80 rounded-xl transition-all group bg-white dark:bg-slate-950/20 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 mb-2 last:mb-0 shadow-sm"
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
                                ) : (
                                    <div className="hidden md:block"></div>
                                )}

                                {/* 3. Blogs */}
                                {results.blogs.length > 0 ? (
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
                                                    className="flex items-center p-3 border border-slate-200/60 dark:border-slate-800/80 rounded-xl transition-all group bg-white dark:bg-slate-950/20 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 mb-2 last:mb-0 shadow-sm"
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
                                ) : (
                                    <div className="hidden md:block"></div>
                                )}

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
