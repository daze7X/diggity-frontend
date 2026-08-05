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
        'nav.dashboard': 'Dashboard',
        'nav.signIn': 'Sign In',
        
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
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.solutions': 'Solutions',
        'nav.products': 'Digital Products',
        'nav.academy': 'Academy',
        'nav.portfolio': 'Case Studies',
        'nav.insights': 'Insights & Blog',
        'nav.jobConnect': 'Careers',
        'nav.dashboard': 'Dashboard',
        'nav.signIn': 'Sign In',
        
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
