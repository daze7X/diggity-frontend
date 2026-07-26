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
            className="fixed inset-0 bg-neutral-950/65 backdrop-blur-md z-[100] flex items-start justify-center pt-20 md:pt-28 px-4"
            onClick={handleClose}
        >
            <div 
                className="bg-brand-bg/95 border border-glass-border rounded-2xl w-full max-w-2xl max-h-[70vh] flex flex-col overflow-hidden shadow-2xl relative"
                style={{ boxShadow: 'var(--card-inset), var(--card-shadow)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Bar Header */}
                <div className="flex items-center px-4 border-b border-glass-border py-4 relative">
                    <Search className="w-5 h-5 text-text-muted mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari Layanan, Portofolio, atau Artikel..."
                        className="w-full bg-transparent border-none text-text-main placeholder-text-muted focus:outline-none text-base font-medium"
                    />
                    
                    {loading ? (
                        <Loader2 className="w-5 h-5 text-brand-blue animate-spin mr-3" />
                    ) : query ? (
                        <button 
                            onClick={() => setQuery('')}
                            className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded mr-2"
                        >
                            <X className="w-4 h-4 text-text-muted" />
                        </button>
                    ) : null}

                    <button 
                        onClick={handleClose}
                        className="p-1.5 border border-glass-border rounded-lg bg-glass-bg cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center text-text-muted text-xs"
                    >
                        ESC
                    </button>
                </div>

                {/* Search Results Area */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {/* Placeholder when search is empty */}
                    {!query && (
                        <div className="text-center py-10 space-y-2">
                            <Search className="w-10 h-10 text-brand-blue/30 mx-auto" />
                            <p className="text-sm font-semibold text-text-main">Pencarian Terpadu Diggity</p>
                            <p className="text-xs text-text-gray max-w-xs mx-auto leading-relaxed">
                                Temukan informasi mengenai Layanan Divisi, Studi Kasus Portofolio, atau Artikel Blog secara cepat.
                            </p>
                        </div>
                    )}

                    {/* Loader */}
                    {loading && !results && (
                        <div className="flex flex-col items-center justify-center py-12 space-y-3">
                            <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
                            <span className="text-xs text-text-muted font-medium">Mencari kecocokan data...</span>
                        </div>
                    )}

                    {/* No results */}
                    {query && !loading && !hasResults && (
                        <div className="text-center py-10 space-y-2">
                            <p className="text-sm font-semibold text-text-main">Tidak ada hasil cocok</p>
                            <p className="text-xs text-text-gray max-w-xs mx-auto leading-relaxed">
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
                                    <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2">
                                        Layanan Divisi ({results.services.length})
                                    </h4>
                                    <div className="space-y-1">
                                        {results.services.map((service) => (
                                            <Link
                                                key={service.id}
                                                href={`/services/${service.slug}`}
                                                onClick={handleClose}
                                                className="flex items-center p-3 hover:bg-neutral-900/5 dark:hover:bg-neutral-50/5 rounded-xl transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                                                    <Sparkles className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-text-main group-hover:text-brand-blue transition-colors">
                                                        {service.name}
                                                    </p>
                                                    <p className="text-xs text-text-gray line-clamp-1">
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
                                    <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2">
                                        Studi Kasus Portofolio ({results.portfolios.length})
                                    </h4>
                                    <div className="space-y-1">
                                        {results.portfolios.map((project) => (
                                            <Link
                                                key={project.id}
                                                href={`/portfolio/${project.slug}`}
                                                onClick={handleClose}
                                                className="flex items-center p-3 hover:bg-neutral-900/5 dark:hover:bg-neutral-50/5 rounded-xl transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mr-3 flex-shrink-0">
                                                    <Briefcase className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-text-main group-hover:text-brand-blue transition-colors">
                                                        {project.title}
                                                    </p>
                                                    <p className="text-xs text-text-gray line-clamp-1">
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
                                    <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2">
                                        Artikel Blog ({results.blogs.length})
                                    </h4>
                                    <div className="space-y-1">
                                        {results.blogs.map((blog) => (
                                            <Link
                                                key={blog.id}
                                                href={`/blog/${blog.slug}`}
                                                onClick={handleClose}
                                                className="flex items-center p-3 hover:bg-neutral-900/5 dark:hover:bg-neutral-50/5 rounded-xl transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mr-3 flex-shrink-0">
                                                    <BookOpen className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-text-main group-hover:text-brand-blue transition-colors">
                                                        {blog.title}
                                                    </p>
                                                    <p className="text-xs text-text-gray line-clamp-1">
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
