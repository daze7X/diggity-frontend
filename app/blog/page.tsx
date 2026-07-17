import React from 'react';
import { api, Category, Blog } from '../../lib/api';
import BlogList from '../../components/BlogList';

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
        <div className="relative pt-36 pb-20 md:pt-40 md:pb-28">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                        Wawasan & Edukasi
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 font-medium">
                        Artikel edukasi, tren teknologi terbaru, dan panduan praktis digital marketing.
                    </p>
                </div>

                {/* Blog Filter & Grid List */}
                <BlogList blogs={blogs} categories={categories} />

            </div>
        </div>
    );
}
