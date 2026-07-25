import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { api, Blog } from '../../../lib/api';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export const revalidate = 60; // Cache data for 60 seconds (ISR)

interface Props {
    params: Promise<{ slug: string }>;
}

// Dynamic SEO metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    try {
        const blog = await api.getBlogBySlug(slug);
        return {
            title: `${blog.meta_title || blog.title} | Diggity Blog`,
            description: blog.meta_description || 'Baca selengkapnya artikel edukasi di Diggity Blog.',
            openGraph: {
                title: blog.title,
                description: blog.meta_description,
                type: 'article',
            }
        };
    } catch {
        return {
            title: 'Artikel Blog | Diggity Blog',
        };
    }
}

export default async function BlogDetail({ params }: Props) {
    const { slug } = await params;
    let blog: Blog | null = null;
    let relatedBlogs: any[] = [];

    try {
        blog = await api.getBlogBySlug(slug);
        if (blog) {
            const currentBlog = blog; // Non-nullable constant for closure
            const allBlogs = await api.getBlogs();
            relatedBlogs = allBlogs
                .filter((b: any) => b.id !== currentBlog.id && b.category_id === currentBlog.category_id)
                .slice(0, 3);
            
            // Fallback if not enough category-matched blogs
            if (relatedBlogs.length < 3) {
                const extraBlogs = allBlogs
                    .filter((b: any) => b.id !== currentBlog.id && !relatedBlogs.some((rb) => rb.id === b.id))
                    .slice(0, 3 - relatedBlogs.length);
                relatedBlogs = [...relatedBlogs, ...extraBlogs];
            }
        }
    } catch (error) {
        console.error('Error fetching blog details / related posts:', error);
    }

    if (!blog) {
        return (
            <div className="pt-48 pb-20 text-center space-y-4">
                <h1 className="text-2xl font-bold text-text-main">Artikel Tidak Ditemukan</h1>
                <Link href="/blog" className="text-brand-blue hover:underline">
                    Kembali ke Blog
                </Link>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Social share links (using URL helper)
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = encodeURIComponent(blog.title);

    return (
        <div className="relative pt-36 pb-20 md:pt-40 md:pb-28">
            <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-8">
                
                {/* Back Button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm font-semibold text-text-muted hover:text-brand-blue transition-colors group text-left"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    Kembali ke Blog
                </Link>

                {/* Article Header */}
                <div className="space-y-4 text-left">
                    {blog.category && (
                        <span className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-full text-xs font-bold uppercase tracking-wider">
                            {blog.category.name}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-5xl font-black text-text-main tracking-tight leading-tight">
                        {blog.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-text-gray pt-2 border-b border-glass-border pb-6">
                        <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-brand-blue" />
                            <span>Oleh Admin</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-brand-blue" />
                            <span>{formatDate(blog.created_at)}</span>
                        </div>
                    </div>
                </div>

                {/* Article Image Cover */}
                <div className="relative aspect-[16/9] bg-glass-bg border border-glass-border rounded-3xl overflow-hidden flex items-center justify-center shadow-lg">
                    {blog.image ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${blog.image}`}
                            alt={blog.title}
                            fill
                            unoptimized
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center space-y-2 text-text-muted">
                            <Share2 className="w-12 h-12" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Showcase Image Cover</span>
                        </div>
                    )}
                </div>

                {/* Main Content (Rich Text) */}
                <article 
                    className="prose prose-blue dark:prose-invert max-w-none text-text-main leading-relaxed space-y-6 text-sm md:text-base text-left"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Social Share Buttons */}
                <div className="border-t border-b border-glass-border py-6 flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-text-main flex items-center space-x-2">
                        <Share2 className="w-4 h-4 text-brand-blue" />
                        <span>Bagikan Artikel</span>
                    </span>
                    <div className="flex items-center space-x-3">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-glass-bg border border-glass-border text-text-main hover:text-brand-blue hover:border-brand-blue/30 rounded-lg transition-colors"
                        >
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-glass-bg border border-glass-border text-text-main hover:text-brand-blue hover:border-brand-blue/30 rounded-lg transition-colors"
                        >
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-glass-bg border border-glass-border text-text-main hover:text-brand-blue hover:border-brand-blue/30 rounded-lg transition-colors"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Related Posts Section */}
                {relatedBlogs.length > 0 && (
                    <div className="pt-16 border-t border-glass-border space-y-8 text-left">
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest block">Rekomendasi</span>
                            <h3 className="text-2xl font-extrabold text-text-main tracking-tight">Artikel Terkait</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {relatedBlogs.map((item: any) => (
                                <Link
                                    key={item.id}
                                    href={`/blog/${item.slug}`}
                                    className="group flex flex-col space-y-3 bg-glass-bg/40 border border-glass-border rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:border-brand-blue/30 h-full justify-between"
                                >
                                    <div className="space-y-3">
                                        {/* Image Cover */}
                                        <div className="relative aspect-[16/10] bg-neutral-900 border border-glass-border/40 rounded-xl overflow-hidden flex items-center justify-center">
                                            {item.image ? (
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${item.image}`}
                                                    alt={item.title}
                                                    fill
                                                    unoptimized
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <Share2 className="w-8 h-8 text-text-muted/40" />
                                            )}
                                        </div>

                                        {/* Meta & Title */}
                                        <div className="space-y-1">
                                            {item.category && (
                                                <span className="text-[10px] font-black text-brand-blue uppercase tracking-wider">
                                                    {item.category.name}
                                                </span>
                                            )}
                                            <h4 className="text-sm font-bold text-text-main group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                                                {item.title}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <span className="text-[10px] text-text-muted font-semibold block pt-2 border-t border-glass-border/30">
                                        {formatDate(item.created_at)}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
