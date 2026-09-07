const fs = require('fs');
const file = 'lib/api.ts';
let content = fs.readFileSync(file, 'utf8');

const targetLF = `    getProductHierarchy: (): Promise<CategoryHierarchy[]> => fetchAPI('/products/hierarchy?v=2', { cache: 'no-store' }),
    getProductsBySubcategory: (slug: string): Promise<{ subcategory: CategoryHierarchy, products: Product[] }> => fetchAPI(\`/products/subcategory/\${slug}\`),
    getProducts: (category?: string): Promise<Product[]> => {
        const query = category ? \`?category=\${category}\` : '';
        return fetchAPI(\`/products\${query}\`);
    },`;

const targetCRLF = targetLF.replace(/\n/g, '\r\n');

const replacement = `    getProductHierarchy: (): Promise<CategoryHierarchy[]> => fetchAPI('/products/hierarchy?v=2', { cache: 'no-store' }),
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
        return fetchAPI(\`/products/subcategory/\${slug}\${qs}\`);
    },
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
        return fetchAPI(\`/products\${qs}\`);
    },`;

if (content.includes(targetLF)) {
    content = content.replace(targetLF, replacement);
    fs.writeFileSync(file, content);
    console.log('Success LF');
} else if (content.includes(targetCRLF)) {
    content = content.replace(targetCRLF, replacement);
    fs.writeFileSync(file, content);
    console.log('Success CRLF');
} else {
    console.log('Target not found!');
}
