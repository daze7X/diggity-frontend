import React from 'react';
import { api, Category, Blog } from '../../lib/api';
import BlogList from '../../components/BlogList';
import { Sparkles } from 'lucide-react';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function BlogPage() {
    let blogs: Blog[] = [];
    let categories: Category[] = [];

    try {
        blogs = await api.getBlogs();
        
        // Extract unique categories from blogs
        const categoriesMap: Record<string, Category> = {};
        blogs.forEach((b) => {
            if (b.category) {
                categoriesMap[b.category.name] = b.category;
            }
        });
        categories = Object.values(categoriesMap);
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }

    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <span className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-xs font-semibold text-brand-blue">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>ARTIKEL & BLOG</span>
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        Wawasan & Edukasi
                    </h1>
                    <p className="text-lg md:text-xl text-text-gray font-medium">
                        Artikel edukasi, tren teknologi terbaru, dan panduan praktis digital marketing.
                    </p>
                </div>

                {/* Blog Filter & Grid List */}
                <BlogList blogs={blogs} categories={categories} />

            </div>
        </div>
    );
}
