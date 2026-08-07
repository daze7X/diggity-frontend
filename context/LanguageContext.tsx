'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const dictionaries = {
    id: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.solutions': 'Solutions',
        'nav.products': 'Products',
        'nav.academy': 'Academy',
        'nav.portfolio': 'Portfolio',
        'nav.insights': 'Insights',
        'nav.jobConnect': 'Job Connect',
        'nav.pricing': 'Pricing',
        'nav.dashboard': 'Dashboard',
        'nav.signIn': 'Sign In',
        'pricing.title': 'Paket Harga & Layanan Jasa',
        'pricing.subtitle': 'Investasi teknologi transparan yang dirancang khusus untuk mempercepat pertumbuhan dan skala bisnis Anda.',
        'pricing.period_month': 'bulan',
        'pricing.period_year': 'tahun',
        'pricing.period_project': 'proyek',
        'pricing.period_one_time': 'sekali bayar',
        'pricing.popular': 'Populer',
        'pricing.choose': 'Pilih Paket',
        'pricing.contact_us': 'Hubungi Kami',
        'pricing.whatsapp_msg': 'Halo%20Diggity,%20saya%20tertarik%20dengan%20paket%20[PLAN_NAME].%20Bisa%20tolong%20jelaskan%20lebih%20detail?',
        
        'footer.desc': 'Membangun, Menumbuhkan, dan Menskalakan Bisnis Anda di Era Digital.',
        'footer.office': 'Alamat Kantor',
        'footer.whatsapp': 'Nomor WhatsApp',
        'footer.email': 'Email Official',
        
        'contact.title': 'Hubungi Kami',
        'contact.desc': 'Diskusikan kebutuhan proyek Anda langsung dengan tim konsultan senior kami.',
        'contact.info_title': 'Hub Info & Kantor',
        'contact.info_desc': 'Kami siap melayani konsultasi digital dalam bidang pengembangan aplikasi, strategi pertumbuhan brand, setup VPS cloud hosting, dan in-house bootcamps.',
        'contact.form_title': 'Konsultasi Baru',
        
        'home.hero_sub': 'Kami membangun arsitektur digital terintegrasi, mengoptimalkan peringkat pencarian, dan merekayasa konversi penjualan secara sistematis.',
        'home.stats.clients': 'Happy Clients',
        'home.stats.projects': 'Projects Completed',
        'home.stats.rate': 'Success KPI Rate',
        'home.stats.exp': 'Years Experience',
        
        'about.title': 'Tentang Kami',
        'about.timeline_title': 'Pilar Utama Rekayasa Digital Kami',
        'about.timeline_desc': 'Didirikan pada tahun 2018 di Tangerang, Diggity lahir dari visi untuk memberikan solusi digital berkualitas global bagi bisnis lokal. Kami meyakini filosofi pertumbuhan terstruktur untuk membantu bisnis membangun fondasi teknis, mendominasi pasar, menskalakan kapasitas, dan melatih kemandirian internal.',
        
        'portfolio.title': 'Portfolio Kami',
        'portfolio.desc': 'Kumpulan karya terbaik dan studi kasus sukses dari transformasi digital klien kami.',
        
        'career.back': 'Kembali ke Job Connect',
        'career.not_found': 'Lowongan Kerja Tidak Ditemukan',
        'career.desc_title': 'Deskripsi Pekerjaan',
        'career.req_title': 'Persyaratan Kualifikasi',
        'career.apply_title': 'Lamar Posisi Ini',
        'career.form.name': 'Nama Lengkap',
        'career.form.name_placeholder': 'Nama Lengkap Anda',
        'career.form.email': 'Email',
        'career.form.phone': 'No. WhatsApp',
        'career.form.phone_placeholder': 'Contoh: 08123456789',
        'career.form.cv': 'Unggah CV (Format PDF, Maks 10MB)',
        'career.form.cv_placeholder': 'Pilih berkas PDF atau seret ke sini',
        'career.form.cover_letter': 'Surat Pengantar / Catatan (Opsional)',
        'career.form.cover_letter_placeholder': 'Tulis alasan mengapa Anda cocok...',
        'career.form.submit': 'Kirim Lamaran Pekerjaan',
        'career.form.submitting': 'Mengirim...',
        'career.form.success_title': 'Lamaran Terkirim!',
        'career.form.success_msg': 'Lamaran Anda berhasil dikirim! Tim HRD kami akan meninjau kualifikasi Anda.',
        'career.form.error_msg': 'Gagal mengirim lamaran. Silakan coba kembali.',
        'career.form.resubmit': 'Kirim Ulang',
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.solutions': 'Solutions',
        'nav.products': 'Products',
        'nav.academy': 'Academy',
        'nav.portfolio': 'Portfolio',
        'nav.insights': 'Insights',
        'nav.jobConnect': 'Careers',
        'nav.pricing': 'Pricing',
        'nav.dashboard': 'Dashboard',
        'nav.signIn': 'Sign In',
        'pricing.title': 'Pricing & Service Plans',
        'pricing.subtitle': 'Transparent technology investments designed custom to accelerate your business growth and scale.',
        'pricing.period_month': 'month',
        'pricing.period_year': 'year',
        'pricing.period_project': 'project',
        'pricing.period_one_time': 'one-time',
        'pricing.popular': 'Popular',
        'pricing.choose': 'Choose Plan',
        'pricing.contact_us': 'Contact Us',
        'pricing.whatsapp_msg': 'Hello%20Diggity,%20I\'m%20interested%20in%20the%20[PLAN_NAME]%20plan.%20Can%20you%20please%20explain%20more?',
        
        'footer.desc': 'Build. Grow. Scale. Your Business in the Digital Era.',
        'footer.office': 'Office Address',
        'footer.whatsapp': 'WhatsApp Contact',
        'footer.email': 'Official Email',
        
        'contact.title': 'Contact Us',
        'contact.desc': 'Discuss your project requirements directly with our senior consultant team.',
        'contact.info_title': 'Office & Hub Info',
        'contact.info_desc': 'We are ready to provide digital consultation in application development, brand growth strategies, VPS cloud hosting setups, and in-house bootcamps.',
        'contact.form_title': 'New Consultation Request',
        
        'home.hero_sub': 'We build integrated digital architectures, optimize search rankings, and systematically engineer sales conversions.',
        'home.stats.clients': 'Happy Clients',
        'home.stats.projects': 'Projects Completed',
        'home.stats.rate': 'Success KPI Rate',
        'home.stats.exp': 'Years Experience',
        
        'about.title': 'About Us',
        'about.timeline_title': 'Our Core Digital Engineering Pillars',
        'about.timeline_desc': 'Established in 2018 in Tangerang, Diggity was born from a vision to deliver global-standard digital solutions for local businesses. We believe in structured growth frameworks to help businesses build technical foundations, dominate markets, scale capacity, and train internal capabilities.',
        
        'portfolio.title': 'Our Portfolio',
        'portfolio.desc': 'A showcase of our finest work and successful digital transformations for our clients.',
        
        'career.back': 'Back to Careers',
        'career.not_found': 'Job Opening Not Found',
        'career.desc_title': 'Job Description',
        'career.req_title': 'Qualifications & Requirements',
        'career.apply_title': 'Apply for this Position',
        'career.form.name': 'Full Name',
        'career.form.name_placeholder': 'Your Full Name',
        'career.form.email': 'Email Address',
        'career.form.phone': 'WhatsApp Number',
        'career.form.phone_placeholder': 'e.g. 08123456789',
        'career.form.cv': 'Upload CV (PDF format, max 10MB)',
        'career.form.cv_placeholder': 'Select PDF file or drag here',
        'career.form.cover_letter': 'Cover Letter / Notes (Optional)',
        'career.form.cover_letter_placeholder': 'Explain why you are a good fit...',
        'career.form.submit': 'Submit Application',
        'career.form.submitting': 'Submitting...',
        'career.form.success_title': 'Application Submitted!',
        'career.form.success_msg': 'Your application has been submitted successfully! Our HR team will review your qualifications.',
        'career.form.error_msg': 'Failed to submit application. Please try again.',
        'career.form.resubmit': 'Submit Again',
    }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('id');

    useEffect(() => {
        // Load stored language preference
        const savedLang = document.cookie
            .split('; ')
            .find((row) => row.startsWith('NEXT_LOCALE='))
            ?.split('=')[1];
            
        if (savedLang === 'en' || savedLang === 'id') {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        // Persist language in cookies (expires in 1 year)
        document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
        // Reload page to refresh API calls with new header locale
        window.location.reload();
    };

    const t = (key: string): string => {
        const dict = dictionaries[language];
        return (dict as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
