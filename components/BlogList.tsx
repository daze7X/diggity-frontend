'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Blog, Category } from '../lib/api';
import { FileText, Search, ArrowRight } from 'lucide-react';

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                {/* Search Bar */}
                <div className="relative col-span-1 lg:col-span-1">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari artikel..."
                        className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl focus:border-amber-500 focus:outline-none text-sm text-white placeholder-neutral-600"
                    />
                    <Search className="w-5 h-5 text-neutral-600 absolute left-4 top-3" />
                </div>

                {/* Category Filters */}
                <div className="col-span-1 lg:col-span-2 flex flex-wrap gap-2.5 justify-start lg:justify-end">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all border ${
                            activeCategory === 'All'
                                ? 'bg-amber-500 text-neutral-950 border-amber-500'
                                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                        }`}
                    >
                        Semua
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all border ${
                                activeCategory === cat.name
                                    ? 'bg-amber-500 text-neutral-950 border-amber-500'
                                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
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
                    filteredBlogs.map((blog) => (
                        <Link
                            key={blog.id}
                            href={`/blog/${blog.slug}`}
                            className="group bg-neutral-900 border border-neutral-850 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all flex flex-col h-full"
                        >
                            {/* Image Placeholder */}
                            <div className="relative aspect-[16/10] bg-neutral-950 flex items-center justify-center border-b border-neutral-800">
                                {blog.image ? (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${blog.image}`}
                                        alt={blog.title}
                                        fill
                                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center space-y-2 text-neutral-600">
                                        <FileText className="w-10 h-10" />
                                        <span className="text-xs font-semibold uppercase tracking-wider">Artikel Edukasi</span>
                                    </div>
                                )}
                                {blog.category && (
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-900/90 backdrop-blur border border-neutral-800 rounded-full text-xs font-bold text-amber-500">
                                        {blog.category.name}
                                    </span>
                                )}
                            </div>

                            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                                <div className="space-y-2">
                                    <span className="text-xs text-neutral-500 font-semibold">
                                        {formatDate(blog.created_at)}
                                    </span>
                                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
                                        {blog.title}
                                    </h3>
                                    <div 
                                        className="text-sm text-neutral-500 line-clamp-2 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: blog.content }}
                                    />
                                </div>
                                <div className="flex items-center text-xs font-bold text-amber-500 uppercase tracking-widest pt-4 border-t border-neutral-850 group-hover:translate-x-1 transition-transform">
                                    Baca Selengkapnya
                                    <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center text-neutral-600 py-20">
                        Tidak ada artikel yang cocok dengan pencarian Anda.
                    </div>
                )}
            </div>
        </div>
    );
}
