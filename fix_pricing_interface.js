const fs = require('fs');
const file = 'lib/api.ts';
let content = fs.readFileSync(file, 'utf8');

const targetLF = `export interface Pricing {
    id: number;
    name: string;
    price: number;
    period: string;
    description?: string;
    features: string[];
    is_popular: boolean;
}`;
const targetCRLF = targetLF.replace(/\n/g, '\r\n');

const replacement = `export interface Pricing {
    id: number;
    product_id?: number;
    pricing_type?: 'subscription' | 'one_time' | 'bundle' | 'custom';
    name: string;
    price: string;
    numeric_price?: number;
    period: string;
    description?: string;
    features: string[];
    is_popular: boolean;
    discount_percentage?: number;
    sale_price?: number;
    pricing_label?: string;
    cta_text?: string;
    license_type?: string;
    is_free_trial?: boolean;
    is_enterprise?: boolean;
    contact_sales?: boolean;
    pricing_status?: 'active' | 'draft' | 'promotional' | 'deprecated' | 'archived';
}`;

if (content.includes(targetLF)) {
    content = content.replace(targetLF, replacement);
} else if (content.includes(targetCRLF)) {
    content = content.replace(targetCRLF, replacement);
}

const targetProductLF = `    category?: Category;
    seo_meta?: SeoMeta;
}`;
const targetProductCRLF = targetProductLF.replace(/\n/g, '\r\n');

const replacementProduct = `    category?: Category;
    seo_meta?: SeoMeta;
    pricings?: Pricing[];
}`;

if (content.includes(targetProductLF)) {
    content = content.replace(targetProductLF, replacementProduct);
} else if (content.includes(targetProductCRLF)) {
    content = content.replace(targetProductCRLF, replacementProduct);
}

fs.writeFileSync(file, content);
console.log("Updated lib/api.ts successfully");
