import { getCookie } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

async function getLocale(): Promise<string> {
    if (typeof window === 'undefined') {
        try {
            // Membaca cookie secara dinamis pada sisi server Next.js (asinkron di Next.js 15)
            const { cookies } = require('next/headers');
            const cookieStore = await cookies();
            return cookieStore.get('NEXT_LOCALE')?.value || 'id';
        } catch {
            return 'id';
        }
    }
    const match = document.cookie.match(new RegExp('(^| )NEXT_LOCALE=([^;]+)'));
    return match ? match[2] : 'id';
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const token = getCookie('token');
    const authHeader: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
    const locale = await getLocale();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Language': locale,
        ...authHeader,
    };

    if (options.headers) {
        if (options.headers instanceof Headers) {
            options.headers.forEach((value, key) => {
                headers[key] = value;
            });
        } else if (Array.isArray(options.headers)) {
            options.headers.forEach(([key, value]) => {
                headers[key] = value;
            });
        } else {
            Object.assign(headers, options.headers);
        }
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        headers,
        ...options,
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch API: ${res.statusText}`);
    }

    return res.json();
}

export interface SeoMeta {
    id: number;
    seoable_type: string;
    seoable_id: number;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    canonical_url?: string;
    json_ld_schema?: any;
    created_at: string;
    updated_at: string;
}

export interface CompanySetting {
    name: string;
    email: string;
    whatsapp: string;
    address: string;
    instagram_url?: string;
    linkedin_url?: string;
    company_pt_name?: string;
    company_nib?: string;
    company_kbli?: string;
    discord_url?: string;
    telegram_url?: string;
    philosophy_build?: string;
    philosophy_grow?: string;
    philosophy_scale?: string;
    philosophy_empower?: string;
    partner_logos?: string[];
    history_timeline?: Array<{ year: string; title: string; desc: string }>;
    vision_id?: string;
    vision_en?: string;
    mission_id?: Array<{ text: string }>;
    mission_en?: Array<{ text: string }>;
}


export interface CategoryHierarchy extends Category {
    children?: (Category & { products_count?: number })[];
    parent?: Category;
}
export interface Category {
    id: number;
    name: string;
    slug?: string;
}

export interface Service {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    icon?: string;
    description?: string;
    category?: Category;
    seo_meta?: SeoMeta;
    sub_services?: string[];
    plans?: Array<{
        name: string;
        price: string;
        description?: string;
        features: string[];
        isPopular?: boolean;
    }>;
    stats?: Array<{
        label: string;
        value: string;
    }>;
    tech_stack?: string[];
}

export interface Portfolio {
    id: number;
    category_id: number;
    title: string;
    slug: string;
    client?: string;
    duration?: string;
    technologies: string[];
    problem: string;
    solution: string;
    strategy?: string;
    execution?: string;
    result?: string;
    image?: string;
    gallery?: string[];
    category?: Category;
    created_at: string;
    testimonial?: Testimonial;
    seo_meta?: SeoMeta;
}

export interface Blog {
    id: number;
    category_id: number;
    title: string;
    slug: string;
    content: string;
    image?: string;
    meta_title?: string;
    meta_description?: string;
    category?: Category;
    created_at: string;
    seo_meta?: SeoMeta;
}

export interface Team {
    id: number;
    name: string;
    role: string;
    photo?: string;
}

export interface Testimonial {
    id: number;
    name?: string;
    client_name?: string;
    company: string;
    avatar?: string;
    message?: string;
    review?: string;
    rating: number;
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
}

export interface Pricing {
    id: number;
    name: string;
    price: number;
    period: string;
    description?: string;
    features: string[];
    is_popular: boolean;
}

export interface Product {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    sku?: string;
    price: number;
    billing_period: string;
    description?: string;
    features?: string[];
    gallery?: string[];
    license_info?: string;
    version?: string;
    file_path?: string;
    is_active: boolean;
    is_popular: boolean;
    category?: Category;
    seo_meta?: SeoMeta;
}

export interface Lesson {
    id: number;
    module_id: number;
    title: string;
    slug: string;
    content_type: string;
    content?: string;
    video_url?: string;
    duration_minutes: number;
    sort_order: number;
}

export interface Module {
    id: number;
    course_id: number;
    title: string;
    description?: string;
    sort_order: number;
    lessons?: Lesson[];
}

export interface Course {
    id: number;
    category_id: number;
    title: string;
    slug: string;
    description?: string;
    syllabus?: string;
    instructor_name?: string;
    instructor_title?: string;
    price: number;
    is_active: boolean;
    is_featured: boolean;
    image?: string;
    meta_title?: string;
    meta_description?: string;
    category?: Category;
    modules?: Module[];
    seo_meta?: SeoMeta;
}

export interface Career {
    id: number;
    title: string;
    slug: string;
    department?: string;
    type: string;
    location: string;
    description: string;
    requirements?: string;
    is_active: boolean;
    created_at: string;
    seo_meta?: SeoMeta;
}

export interface SearchResults {
    services: Service[];
    portfolios: Portfolio[];
    blogs: Blog[];
}

export const api = {
    getCompanySettings: (): Promise<CompanySetting> => fetchAPI('/company-settings'),
    searchGlobal: (query: string): Promise<SearchResults> => fetchAPI(`/search?q=${encodeURIComponent(query)}`),
    
    getServices: (): Promise<Service[]> => fetchAPI('/services'),
    getServiceBySlug: (slug: string): Promise<Service> => fetchAPI(`/services/${slug}`),
    getTalentService: (slug: string): Promise<any> => fetchAPI(`/talent-services/${slug}`),
    
    getPortfolios: (): Promise<Portfolio[]> => fetchAPI('/portfolios'),
    getPortfolioBySlug: (slug: string): Promise<Portfolio> => fetchAPI(`/portfolios/${slug}`),
    
    getBlogs: (): Promise<Blog[]> => fetchAPI('/blogs'),
    getBlogBySlug: (slug: string): Promise<Blog> => fetchAPI(`/blogs/${slug}`),
    
    getTeams: (): Promise<Team[]> => fetchAPI('/teams'),
    
    getTestimonials: (): Promise<Testimonial[]> => fetchAPI('/testimonials'),
    
    getFaqs: (): Promise<Faq[]> => fetchAPI('/faqs'),
    
    getPricings: (): Promise<Pricing[]> => fetchAPI('/pricings'),
    
    getCareers: (): Promise<Career[]> => fetchAPI('/careers'),
    getCareerBySlug: (slug: string): Promise<Career> => fetchAPI(`/careers/${slug}`),
    
    getSolutions: (): Promise<Service[]> => fetchAPI('/solutions'),
    getSolutionBySlug: (slug: string): Promise<Service> => fetchAPI(`/solutions/${slug}`),
    getSolutionsByCategory: (categorySlug: string): Promise<Service[]> =>
        fetchAPI('/solutions').then((services: Service[]) =>
            services.filter(s => s.category?.slug === categorySlug)
        ),
    
    
    getProductHierarchy: (): Promise<CategoryHierarchy[]> => fetchAPI('/products/hierarchy'),
    getProductsBySubcategory: (slug: string): Promise<{ subcategory: CategoryHierarchy, products: Product[] }> => fetchAPI(`/products/subcategory/${slug}`),
    getProducts: (category?: string): Promise<Product[]> => {
        const query = category ? `?category=${category}` : '';
        return fetchAPI(`/products${query}`);
    },
    getProductBySlug: (slug: string): Promise<Product> => fetchAPI(`/products/${slug}`),
    
    getCourses: (category?: string): Promise<Course[]> => {
        const query = category ? `?category=${category}` : '';
        return fetchAPI(`/academy${query}`);
    },
    getCourseBySlug: (slug: string): Promise<Course> => fetchAPI(`/academy/${slug}`),
    
    getInsights: (): Promise<Blog[]> => fetchAPI('/insights'),
    getInsightBySlug: (slug: string): Promise<Blog> => fetchAPI(`/insights/${slug}`),
    
    getJobConnect: (): Promise<Career[]> => fetchAPI('/job-connect'),
    getJobConnectBySlug: (slug: string): Promise<Career> => fetchAPI(`/job-connect/${slug}`),
    
    submitTalentProfile: (data: {
        name: string;
        email: string;
        phone?: string;
        type: 'individual' | 'dedicated_team';
        skills?: string[];
        portfolio_links?: string[];
        description?: string;
    }) => fetchAPI('/talent-profiles', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    
    submitLead: (data: {
        name: string;
        email: string;
        phone: string;
        company?: string;
        service?: string;
        message: string;
        recaptcha_token?: string | null;
    }) => fetchAPI('/leads', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    
    submitSubscriber: (email: string, recaptcha_token?: string | null) => fetchAPI('/subscribers', {
        method: 'POST',
        body: JSON.stringify({ email, recaptcha_token }),
    }),
    
    unsubscribeNewsletter: (email: string) => fetchAPI('/subscribers/unsubscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
    }),
    
    getUserCertificates: () => fetchAPI('/user/certificates'),
    
    verifyCertificate: (hash: string) => fetchAPI(`/certificates/verify/${hash}`),
    
    getTickets: () => fetchAPI('/user/tickets'),
    
    createTicket: (data: { subject: string; category: string; message: string }) => fetchAPI('/user/tickets', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    
    getTicketDetails: (id: string | number) => fetchAPI(`/user/tickets/${id}`),
    
    replyTicket: (id: string | number, message: string) => fetchAPI(`/user/tickets/${id}/reply`, {
        method: 'POST',
        body: JSON.stringify({ message }),
    }),
    
    getSitemapUrls: () => fetchAPI('/seo/sitemap'),
    
    getRedirects: () => fetchAPI('/seo/redirects'),
    
    getStaticPageSeo: (slug: string) => fetchAPI(`/seo/page/${slug}`),
    
    submitJobApplication: async (formData: FormData) => {
        // multipart/form-data doesn't use Content-Type application/json
        const res = await fetch(`${API_URL}/job-applications`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || `Failed to submit job application`);
        }

        return res.json();
    },

    getUserCourses: (): Promise<any> => fetchAPI('/user/courses'),
    getUserProducts: (): Promise<any> => fetchAPI('/user/products'),
    checkout: (data: { purchasable_type: 'product' | 'course'; purchasable_id: number }): Promise<any> => fetchAPI('/checkout', {
        method: 'POST',
        body: JSON.stringify(data),
    })
};
