'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Blog, Category } from '../lib/api';
import { FileText, Search, ArrowRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

interface BlogListProps {
    blogs: Blog[];
    categories: Category[];
}

export default function BlogList({ blogs, categories }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('All');

    // Filter by category first, then by search query
    const filteredBlogs = blogs.filter((blog) => {
        const matchesCategory = activeCategory === 'All' || blog.category?.name === activeCategory;
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-12">
            {/* Search and Category filters */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center text-left">
                {/* Search Bar */}
                <div className="relative col-span-1 lg:col-span-1">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari artikel..."
                        className="w-full pl-11 pr-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-sm text-text-main placeholder-text-muted"
                    />
                    <Search className="w-5 h-5 text-text-muted absolute left-4 top-3" />
                </div>

                {/* Category Filters */}
                <div className="col-span-1 lg:col-span-2 flex flex-wrap gap-2.5 justify-start lg:justify-end">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all border backdrop-blur-md cursor-pointer ${
                            activeCategory === 'All'
                                ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/15'
                                : 'bg-glass-bg text-text-gray border-glass-border hover:text-brand-blue hover:border-brand-blue/30'
                        }`}
                    >
                        Semua
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all border backdrop-blur-md cursor-pointer ${
                                activeCategory === cat.name
                                    ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/15'
                                    : 'bg-glass-bg text-text-gray border-glass-border hover:text-brand-blue hover:border-brand-blue/30'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog, index) => (
                        <Link
                            key={blog.id}
                            href={`/blog/${blog.slug}`}
                            className="group flex flex-col h-full cursor-pointer"
                        >
                            <SpotlightCard className="flex flex-col h-full">
                                {/* Image Placeholder */}
                                <div className="relative aspect-[16/10] bg-neutral-950/10 dark:bg-neutral-950/40 flex items-center justify-center border-b border-glass-border overflow-hidden">
                                    {blog.image ? (
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${blog.image}`}
                                            alt={blog.title}
                                            fill
                                            unoptimized
                                            priority={index === 0}
                                            className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center space-y-2 text-text-muted">
                                            <FileText className="w-10 h-10" />
                                            <span className="text-xs font-semibold uppercase tracking-wider">Artikel Edukasi</span>
                                        </div>
                                    )}
                                    {blog.category && (
                                        <span className="absolute top-4 left-4 px-3 py-1 bg-brand-bg/95 backdrop-blur border border-glass-border rounded-full text-xs font-bold text-brand-blue">
                                            {blog.category.name}
                                        </span>
                                    )}
                                </div>

                                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between text-left">
                                    <div className="space-y-2">
                                        <span className="text-xs text-text-muted font-semibold">
                                            {formatDate(blog.created_at)}
                                        </span>
                                        <h3 className="text-base md:text-lg font-bold text-text-main group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                                            {blog.title}
                                        </h3>
                                        <div 
                                            className="text-sm text-text-gray line-clamp-2 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: blog.content }}
                                        />
                                    </div>
                                    <div className="flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest pt-4 border-t border-glass-border group-hover:translate-x-1 transition-transform">
                                        Baca Selengkapnya
                                        <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </SpotlightCard>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center text-text-muted py-20">
                        Tidak ada artikel yang cocok dengan pencarian Anda.
                    </div>
                )}
            </div>
        </div>
    );
}
