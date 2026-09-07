const fs = require('fs');
const file = 'lib/api.ts';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix Product interface
const targetProductLF = `    is_popular: boolean;
    category?: Category;
    seo_meta?: SeoMeta;
}`;
const targetProductCRLF = targetProductLF.replace(/\n/g, '\r\n');

const replacementProduct = `    is_popular: boolean;
    benefits?: string[];
    use_cases?: string[];
    specifications?: Record<string, any>;
    integrations?: string[];
    faq?: any[];
    category?: Category;
    seo_meta?: SeoMeta;
}`;

if (content.includes(targetProductLF)) {
    content = content.replace(targetProductLF, replacementProduct);
} else if (content.includes(targetProductCRLF)) {
    content = content.replace(targetProductCRLF, replacementProduct);
} else {
    console.log('Product interface target not found!');
}

// 2. Fix downloadProduct
const targetCheckoutLF = `    checkout: (data: { purchasable_type: 'product' | 'course'; purchasable_id: number }): Promise<any> => fetchAPI('/checkout', {
        method: 'POST',
        body: JSON.stringify(data),
    })`;
const targetCheckoutCRLF = targetCheckoutLF.replace(/\n/g, '\r\n');

const replacementCheckout = `    downloadProduct: async (id: number, filename: string): Promise<void> => {
        const token = getCookie('auth_token');
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = \`Bearer \${token}\`;

        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(\`\${API_BASE}/products/\${id}/download\`, {
            method: 'GET',
            headers
        });

        if (!res.ok) {
            let errorMessage = 'Gagal mengunduh file.';
            try {
                const data = await res.json();
                if (data.message) errorMessage = data.message;
            } catch (e) {}
            throw new Error(errorMessage);
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },

    checkout: (data: { purchasable_type: 'product' | 'course'; purchasable_id: number }): Promise<any> => fetchAPI('/checkout', {
        method: 'POST',
        body: JSON.stringify(data),
    })`;

if (content.includes(targetCheckoutLF)) {
    content = content.replace(targetCheckoutLF, replacementCheckout);
} else if (content.includes(targetCheckoutCRLF)) {
    content = content.replace(targetCheckoutCRLF, replacementCheckout);
} else {
    console.log('Checkout target not found!');
}

fs.writeFileSync(file, content);
console.log('Finished restoring all missing api.ts parts');
