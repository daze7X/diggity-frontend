import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../lib/api';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const isFree = Number(product.price) === 0;
    
    return (
        <Link href={`/products/${(product.category as any)?.parent?.slug || 'digital-marketplace'}/${product.category?.slug}/${product.slug}`} className="group block h-full">
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
                        <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                            Free
                        </div>
                    )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                    <div className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-2">
                        {product.category?.name || 'Category'}
                    </div>
                    <h3 className="text-sm font-bold text-text-main group-hover:text-brand-blue transition-colors line-clamp-2 mb-2">
                        {product.name}
                    </h3>
                    <div className="mt-auto pt-4 border-t border-glass-border/50 flex items-center justify-between">
                        <span className={`font-black ${isFree ? 'text-green-500' : 'text-text-main'}`}>
                            {isFree ? 'Gratis' : `Rp ${Number(product.price).toLocaleString('id-ID')}`}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}