const fs = require('fs');
const file = 'lib/api.ts';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Phase 3 missing fields to Product interface
content = content.replace(
    'is_popular: boolean;\n    category?: Category;',
    'is_popular: boolean;\n    benefits?: any;\n    use_cases?: any;\n    specifications?: any;\n    integrations?: any;\n    faq?: any;\n    category?: Category;'
);

// 2. Fix getProductsBySubcategory signature
content = content.replace(
    'getProductsBySubcategory: (slug: string): Promise<{ subcategory: CategoryHierarchy, products: Product[] }> => fetchAPI(/products/subcategory/ + slug),',
    getProductsBySubcategory: (
        slug: string, 
        params?: { filter?: string | null; sort?: string | null; page?: number; search?: string }
    ): Promise<{ subcategory: CategoryHierarchy, products: Product[], pagination?: any }> => {
        let qs = '';
        if (params) {
            const searchParams = new URLSearchParams();
            if (params.filter) searchParams.set('filter', params.filter);
            if (params.sort) searchParams.set('sort', params.sort);
            if (params.page) searchParams.set('page', params.page.toString());
            if (params.search) searchParams.set('search', params.search);
            const qsStr = searchParams.toString();
            if (qsStr) qs = '?' + qsStr;
        }
        return fetchAPI(\/products/subcategory/\\\);
    },
);
content = content.replace(
    'getProductsBySubcategory: (slug: string): Promise<{ subcategory: CategoryHierarchy, products: Product[] }> => fetchAPI(/products/subcategory/),',
    getProductsBySubcategory: (
        slug: string, 
        params?: { filter?: string | null; sort?: string | null; page?: number; search?: string }
    ): Promise<{ subcategory: CategoryHierarchy, products: Product[], pagination?: any }> => {
        let qs = '';
        if (params) {
            const searchParams = new URLSearchParams();
            if (params.filter) searchParams.set('filter', params.filter);
            if (params.sort) searchParams.set('sort', params.sort);
            if (params.page) searchParams.set('page', params.page.toString());
            if (params.search) searchParams.set('search', params.search);
            const qsStr = searchParams.toString();
            if (qsStr) qs = '?' + qsStr;
        }
        return fetchAPI(\/products/subcategory/\\\);
    },
);

// 3. Fix getProducts signature
content = content.replace(
    getProducts: (category?: string): Promise<Product[]> => {\n        const query = category ? \?category=\\ : '';\n        return fetchAPI(\/products\\);\n    },,
    getProducts: (params?: { category?: string; is_popular?: boolean; limit?: number; search?: string }): Promise<Product[]> => {
        let qs = '';
        if (params) {
            const searchParams = new URLSearchParams();
            if (params.category) searchParams.set('category', params.category);
            if (params.is_popular) searchParams.set('is_popular', 'true');
            if (params.limit) searchParams.set('limit', params.limit.toString());
            if (params.search) searchParams.set('search', params.search);
            const qsStr = searchParams.toString();
            if (qsStr) qs = '?' + qsStr;
        }
        return fetchAPI(\/products\\);
    },
);

// 4. Add downloadProduct before checkout
content = content.replace(
    "checkout: (data: { purchasable_type: 'product' | 'course'; purchasable_id: number }): Promise<any> => fetchAPI('/checkout', {",
    downloadProduct: async (id: number, filename: string): Promise<void> => {
        const token = getCookie('auth_token');
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = \Bearer \\;

        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(\\/products/\/download\, {
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
);

fs.writeFileSync(file, content);
