import React from 'react';
import { notFound } from 'next/navigation';
import { api } from '../../../lib/api';
import BusinessSoftwareLanding from '../../../components/products/BusinessSoftwareLanding';
import DigitalMarketplaceLanding from '../../../components/products/DigitalMarketplaceLanding';

export const revalidate = 60;

export default async function MainCategoryPage({ params }: { params: Promise<{ main: string }> }) {
    const { main } = await params;
    const hierarchy = await api.getProductHierarchy().catch(() => []);
    
    const mainCat = hierarchy.find(c => c.slug === main);
    
    if (!mainCat) {
        notFound();
    }

    if (mainCat.slug === 'business-software') {
        return <BusinessSoftwareLanding mainCat={mainCat} />;
    }

    if (mainCat.slug === 'digital-marketplace') {
        return <DigitalMarketplaceLanding mainCat={mainCat} />;
    }

    // Fallback for other categories (if any exist in the future)
    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-canvas text-text-main">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">{mainCat.name}</h1>
                <p className="text-text-gray">Landing page under construction.</p>
            </div>
        </div>
    );
}
