import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { api } from '../../../lib/api';
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
    let blog = null;

    try {
        blog = await api.getBlogBySlug(slug);
    } catch (error) {
        console.error('Error fetching blog details:', error);
    }

    if (!blog) {
        return (
            <div className="pt-48 pb-20 text-center space-y-4">
                <h1 className="text-2xl font-bold text-white">Artikel Tidak Ditemukan</h1>
                <Link href="/blog" className="text-amber-500 hover:underline">
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
                    className="inline-flex items-center text-sm font-semibold text-neutral-450 hover:text-amber-500 transition-colors group"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    Kembali ke Blog
                </Link>

                {/* Article Header */}
                <div className="space-y-4">
                    {blog.category && (
                        <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                            {blog.category.name}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        {blog.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 pt-2 border-b border-neutral-900 pb-6">
                        <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-amber-500" />
                            <span>Oleh Admin</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-amber-500" />
                            <span>{formatDate(blog.created_at)}</span>
                        </div>
                    </div>
                </div>

                {/* Article Image Cover */}
                <div className="relative aspect-[16/9] bg-neutral-900 border border-neutral-850 rounded-3xl overflow-hidden flex items-center justify-center">
                    {blog.image ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage'}/${blog.image}`}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center space-y-2 text-neutral-700">
                            <Share2 className="w-12 h-12" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Showcase Image Cover</span>
                        </div>
                    )}
                </div>

                {/* Main Content (Rich Text) */}
                <article 
                    className="prose prose-invert prose-amber max-w-none text-neutral-300 leading-relaxed space-y-6 text-sm md:text-base"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Social Share Buttons */}
                <div className="border-t border-b border-neutral-900 py-6 flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-white flex items-center space-x-2">
                        <Share2 className="w-4 h-4 text-amber-500" />
                        <span>Bagikan Artikel</span>
                    </span>
                    <div className="flex items-center space-x-3">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-neutral-900 hover:text-amber-500 rounded-lg transition-colors"
                        >
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-neutral-900 hover:text-amber-500 rounded-lg transition-colors"
                        >
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-neutral-900 hover:text-amber-500 rounded-lg transition-colors"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
