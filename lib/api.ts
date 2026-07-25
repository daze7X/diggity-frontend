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

export const api = {
    getCompanySettings: (): Promise<CompanySetting> => fetchAPI('/company-settings'),
    
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
    
    submitLead: (data: {
        name: string;
        email: string;
        phone: string;
        company?: string;
        service?: string;
        message: string;
    }) => fetchAPI('/leads', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    
    submitSubscriber: (email: string) => fetchAPI('/subscribers', {
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
