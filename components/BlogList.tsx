'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Blog, Category } from '../lib/api';
import { FileText, Search, ArrowRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { useLanguage } from '../context/LanguageContext';

interface BlogListProps {
    blogs: Blog[];
    categories: Category[];
}

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/&/g, '-')             // Replace & with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start
        .replace(/-+$/, '');            // Trim - from end
};

export default function BlogList({ blogs, categories }: BlogListProps) {
    const { language } = useLanguage();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const t = {
        searchPlaceholder: language === 'en' ? 'Search articles...' : 'Cari artikel...',
        all: language === 'en' ? 'All' : 'Semua',
        featuredArticle: language === 'en' ? 'Featured Article' : 'Artikel Utama',
        readArticle: language === 'en' ? 'Read Featured Article' : 'Baca Artikel Utama',
        readMore: language === 'en' ? 'Read More' : 'Baca Selengkapnya',
    };

    // Sync state with URL parameter on mount and when URL query changes
    useEffect(() => {
        const categoryParam = searchParams?.get('category');
        if (categoryParam) {
            const matchedCategory = categories.find(
                (cat) => slugify(cat.name) === categoryParam
            );
            if (matchedCategory) {
                setActiveCategory(matchedCategory.name);
            } else if (categoryParam === 'all') {
                setActiveCategory('All');
            }
        } else {
            setActiveCategory('All');
        }
    }, [searchParams, categories]);

    const handleCategoryChange = (categoryName: string) => {
        setActiveCategory(categoryName);
        if (categoryName === 'All') {
            router.push('/insights');
        } else {
            const cat = categories.find((c) => c.name === categoryName);
            if (cat) {
                router.push(`/insights?category=${slugify(cat.name)}`);
            }
        }
    };

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

    const featuredBlog = filteredBlogs[0];
    const secondaryBlogs = filteredBlogs.slice(1);
    const trendingBlogs = blogs.slice(0, 4);

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
                        placeholder={language === 'en' ? 'Search articles...' : 'Cari artikel...'}
                        className="w-full pl-11 pr-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-sm text-text-main placeholder-text-muted"
                    />
                    <Search className="w-5 h-5 text-text-muted absolute left-4 top-3" />
                </div>

                {/* Category Filters */}
                <div className="col-span-1 lg:col-span-2 flex flex-wrap gap-2.5 justify-start lg:justify-end">
                    <button
                        onClick={() => handleCategoryChange('All')}
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
                            onClick={() => handleCategoryChange(cat.name)}
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

            {filteredBlogs.length > 0 ? (
                /* Magazine Layout Container */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                    {/* Column Left (2/3 Width) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Cover Story (Featured Article) */}
                        {featuredBlog ? (
                            <Link href={`/insights/${featuredBlog.slug}`} className="group block">
                                <SpotlightCard className="overflow-hidden border border-glass-border/30 shadow-lg shadow-brand-blue/5 hover:shadow-brand-blue/15 hover:border-brand-blue/40 transition-all duration-300 hover:scale-[1.01]">
                                    <div className="relative aspect-[16/9] w-full bg-neutral-950/10 dark:bg-neutral-950/40 flex items-center justify-center overflow-hidden">
                                        {featuredBlog.image ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${featuredBlog.image}`}
                                                alt={featuredBlog.title}
                                                fill
                                                priority
                                                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center space-y-2 text-text-muted">
                                                <FileText className="w-12 h-12" />
                                                <span className="text-xs font-semibold uppercase tracking-wider">Artikel Utama</span>
                                            </div>
                                        )}
                                        {featuredBlog.category && (
                                            <span className="absolute top-5 left-5 px-3 py-1.5 bg-brand-bg/95 backdrop-blur border border-glass-border/50 shadow-md rounded-md text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                                                {featuredBlog.category.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-8 md:p-10 space-y-5">
                                        <div className="space-y-3">
                                            <span className="text-sm text-text-muted font-bold tracking-wide">
                                                {formatDate(featuredBlog.created_at)}
                                            </span>
                                            <h3 className="text-3xl md:text-4xl font-black text-text-main group-hover:text-brand-blue transition-colors leading-tight">
                                                {featuredBlog.title}
                                            </h3>
                                            <div 
                                                className="text-base text-text-gray line-clamp-3 leading-relaxed font-medium"
                                                dangerouslySetInnerHTML={{ __html: featuredBlog.content }}
                                            />
                                        </div>
                                        <div className="flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest pt-4 group-hover:translate-x-2 transition-transform">
                                            Baca Artikel Utama
                                            <ArrowRight className="ml-1.5 w-4 h-4" />
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </Link>
                        ) : null}

                        {/* Secondary Grid (2-Columns for other articles) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {secondaryBlogs.map((blog) => (
                                <Link key={blog.id} href={`/insights/${blog.slug}`} className="group block">
                                    <SpotlightCard className="h-full flex flex-col justify-between border border-glass-border/30 shadow-sm shadow-brand-blue/5 hover:shadow-brand-blue/15 hover:border-brand-blue/40 transition-all duration-300 hover:scale-[1.02]">
                                        <div>
                                            <div className="relative aspect-[16/10] w-full bg-neutral-950/10 dark:bg-neutral-950/40 flex items-center justify-center overflow-hidden">
                                                {blog.image ? (
                                                    <Image
                                                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${blog.image}`}
                                                        alt={blog.title}
                                                        fill
                                                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center space-y-2 text-text-muted">
                                                        <FileText className="w-8 h-8" />
                                                        <span className="text-xs font-semibold uppercase tracking-wider">Artikel</span>
                                                    </div>
                                                )}
                                                {blog.category && (
                                                    <span className="absolute top-4 left-4 px-2 py-0.5 bg-brand-bg/95 backdrop-blur border border-glass-border/50 shadow-sm rounded-md text-[9px] font-bold uppercase tracking-wider text-brand-blue">
                                                        {blog.category.name}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-6 space-y-3">
                                                <span className="text-[11px] text-text-muted font-bold tracking-wide">
                                                    {formatDate(blog.created_at)}
                                                </span>
                                                <h4 className="text-lg font-black text-text-main group-hover:text-brand-blue transition-colors line-clamp-2 leading-tight">
                                                    {blog.title}
                                                </h4>
                                                <div 
                                                    className="text-xs text-text-gray line-clamp-2 leading-relaxed font-medium"
                                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-6 pt-0 mt-auto">
                                            <div className="flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest pt-2 group-hover:translate-x-1.5 transition-transform">
                                                Baca Selengkapnya
                                                <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column Right (1/3 Width - Sidebar) */}
                    <div className="space-y-10 lg:border-l lg:border-glass-border/40 lg:pl-10">
                        <div className="space-y-3">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest block">{language === 'en' ? 'POPULAR INSIGHTS' : 'WAWASAN TERPOPULER'}</span>
                            <h3 className="text-2xl font-black text-text-main tracking-tight">{language === 'en' ? 'Trending at Diggity' : 'Trending di Diggity'}</h3>
                        </div>

                        <div className="space-y-1">
                            {trendingBlogs.map((blog, idx) => (
                                <Link key={blog.id} href={`/insights/${blog.slug}`} className="group block">
                                    <div className="flex items-start space-x-5 py-4 border-b border-glass-border/30 hover:border-brand-blue/30 transition-colors">
                                        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-blue/80 to-blue-500/60 opacity-70 group-hover:opacity-100 transition-opacity select-none font-mono shrink-0 leading-none">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <div className="space-y-1.5 pt-1">
                                            <h4 className="text-base font-bold text-text-main group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
                                                {blog.title}
                                            </h4>
                                            <span className="text-[10px] text-text-muted font-bold block tracking-wide">
                                                {formatDate(blog.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Beautiful gradient CTA card inside sidebar */}
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-700 text-left space-y-5 shadow-xl shadow-brand-blue/20 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            
                            <h4 className="text-lg font-black text-white relative z-10">Butuh Jasa Kustom?</h4>
                            <p className="text-xs text-white/90 leading-relaxed relative z-10 font-medium">
                                Diskusikan kebutuhan rekayasa perangkat lunak, sistem cloud, atau optimasi SEO bersama tim ahli kami sekarang.
                            </p>
                            <Link 
                                href="/contact" 
                                className="inline-flex items-center text-xs font-bold text-brand-blue bg-white hover:bg-neutral-100 px-5 py-2.5 rounded-lg transition-colors relative z-10 shadow-sm"
                            >
                                Konsultasi Gratis <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-text-muted py-20">
                    Tidak ada artikel yang cocok dengan pencarian Anda.
                </div>
            )}
        </div>
    );
}
