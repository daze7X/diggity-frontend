const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch API: ${res.statusText}`);
    }

    return res.json();
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
    philosophy_build?: string;
    philosophy_grow?: string;
    philosophy_scale?: string;
    philosophy_empower?: string;
    partner_logos?: string[];
    history_timeline?: Array<{ year: string; title: string; desc: string }>;
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
    
    getProducts: (): Promise<Product[]> => fetchAPI('/products'),
    getProductBySlug: (slug: string): Promise<Product> => fetchAPI(`/products/${slug}`),
    
    getCourses: (): Promise<Course[]> => fetchAPI('/academy'),
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
    }
};
