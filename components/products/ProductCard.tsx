import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../lib/api';
import { ArrowRight } from 'lucide-react';

interface Props {
    product: Product;
    locale?: string;
}

export default function ProductCard({ product, locale = 'id' }: Props) {
    const isFree = Number(product.price) === 0;

    const formatPrice = (price: number) => {
        if (locale === 'en') {
            return `Rp ${Number(price).toLocaleString('en-US')}`;
        }
        return `Rp ${Number(price).toLocaleString('id-ID')}`;
    };
    
    // Attempt to extract tags and product_type if they exist on the object
    const pAny = product as any;
    const tags: string[] = pAny.tags || [];
    const productType = pAny.product_type;
    const mainCategory = pAny.category?.parent?.name;
    const subcategory = product.category?.name;
    const shortDesc = product.description;

    return (
        <Link href={`/products/${pAny.category?.parent?.slug || 'digital-marketplace'}/${product.category?.slug}/${product.slug}`} className="group block h-full">
            <div className="bg-glass-bg border border-glass-border rounded-2xl overflow-hidden hover:border-brand-blue/40 transition-all hover:-translate-y-1 hover:shadow-xl h-full flex flex-col">
                <div className="relative aspect-video w-full bg-brand-blue/5 overflow-hidden">
                    {product.gallery && product.gallery[0] ? (
                        <Image 
                            src={product.gallery[0]} 
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-text-muted font-bold text-sm bg-glass-bg">
                            No Image
                        </div>
                    )}
                    {isFree && (
                        <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg z-10">
                            {locale === 'en' ? 'Free' : 'Gratis'}
                        </div>
                    )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                    {/* Category Path & Product Type */}
                    <div className="flex flex-wrap items-center gap-1 text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-2">
                        {mainCategory && (
                            <>
                                <span>{mainCategory}</span>
                                <span className="text-text-muted mx-1">•</span>
                            </>
                        )}
                        <span>{subcategory || 'Category'}</span>
                        {productType && (
                            <>
                                <span className="text-text-muted mx-1">•</span>
                                <span className="text-text-muted">{productType}</span>
                            </>
                        )}
                    </div>

                    <h3 className="text-base font-bold text-text-main group-hover:text-brand-blue transition-colors line-clamp-2 mb-2">
                        {product.name}
                    </h3>

                    {/* Short Description */}
                    {shortDesc && (
                        <p className="text-xs text-text-gray line-clamp-2 mb-4 leading-relaxed">
                            {shortDesc}
                        </p>
                    )}

                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                            {tags.slice(0, 3).map((tag, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-gray-100 dark:bg-brand-bg/50 text-[9px] font-bold text-text-gray rounded-md border border-glass-border">
                                    {tag}
                                </span>
                            ))}
                            {tags.length > 3 && (
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-brand-bg/50 text-[9px] font-bold text-text-gray rounded-md border border-glass-border">
                                    +{tags.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                    {!tags?.length && <div className="mt-auto" />}

                    <div className="mt-4 pt-4 border-t border-glass-border/50 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-text-muted font-medium mb-0.5">
                                {isFree ? (locale === 'en' ? 'Free License' : 'Lisensi Gratis') : (locale === 'en' ? 'Premium License' : 'Lisensi Premium')}
                            </span>
                            <span className={`font-black ${isFree ? 'text-green-500' : 'text-text-main'}`}>
                                {isFree
                                    ? (locale === 'en' ? 'Free' : 'Gratis')
                                    : formatPrice(Number(product.price))
                                }
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue group-hover:bg-brand-blue group-hover:text-white px-3 py-1.5 rounded-lg transition-colors">
                            {locale === 'en' ? 'View Product' : 'Lihat Produk'}
                            <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
