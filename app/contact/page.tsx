import React from 'react';
import ContactForm from '../../components/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';
import { api, CompanySetting } from '../../lib/api';
import SpotlightCard from '../../components/SpotlightCard';
import { getLocaleServer } from '../../lib/locale-server';
import ScrollReveal from '../../components/ScrollReveal';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function ContactPage() {
    const locale = await getLocaleServer();
    let settings: CompanySetting = {
        name: 'Diggity Agency',
        email: 'hello@diggity.com',
        whatsapp: '628123456789',
        address: 'Jakarta, Indonesia',
    };

    try {
        settings = await api.getCompanySettings();
    } catch (error) {
        console.error('Error fetching contact settings:', error);
    }

    return (
        <div className="min-h-screen relative pb-20 selection:bg-brand-blue/20">
            {/* 1. HERO HEADER (Enterprise Style) */}
            <div className="bg-brand-blue dark:bg-brand-bg relative pt-32 pb-48 px-6 overflow-hidden">
                {/* Glowing orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                    
                    {/* Morphing Blob Decoration */}
                    <div className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob pointer-events-none hidden lg:block opacity-50">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '15s' }} />
                    </div>
                    
                    <div className="absolute left-0 lg:left-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 border border-white/10 shadow-2xl overflow-hidden animate-morph-blob-fast pointer-events-none hidden lg:block opacity-30 delay-700">
                        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-white/20 animate-spin-slow" style={{ animationDuration: '12s' }} />
                    </div>

                    <ScrollReveal animation="fade-up" className="max-w-2xl relative z-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                            {locale === 'en' ? 'Let\'s Discuss Your' : 'Diskusikan Proyek'}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">
                                {locale === 'en' ? 'Digital Project' : 'Digital Anda'}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100/80 font-medium">
                            {locale === 'en' ? 'Discuss your project needs directly with our senior consulting team.' : 'Diskusikan kebutuhan proyek Anda langsung dengan tim konsultan senior kami.'}
                        </p>
                    </ScrollReveal>
                </div>
            </div>

            {/* 2. OVERLAPPING CONTENT (-mt-24) */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-24">
                
                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    
                    {/* Left Column: Info */}
                    <ScrollReveal animation="slide-right" delay={100} className="space-y-8 lg:sticky lg:top-32 text-left bg-white dark:bg-glass-bg border border-glass-border p-8 md:p-10 rounded-3xl shadow-xl">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-black text-text-main">{locale === 'en' ? 'Hub Info & Office' : 'Hub Info & Kantor'}</h2>
                            <p className="text-text-gray font-medium leading-relaxed">
                                {locale === 'en' ? 'We are ready to provide digital consultation in application development, brand growth strategy, VPS cloud hosting setup, and in-house bootcamps.' : 'Kami siap melayani konsultasi digital dalam bidang pengembangan aplikasi, strategi pertumbuhan brand, setup VPS cloud hosting, dan in-house bootcamps.'}
                            </p>
                        </div>

                        {/* Contact details cards */}
                        <div className="space-y-4 text-sm font-medium">
                            <SpotlightCard className="flex items-center space-x-4 p-5 rounded-2xl bg-white dark:bg-brand-bg/50">
                                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-text-muted font-black uppercase tracking-widest text-left">{locale === 'en' ? 'Official Email' : 'Email Official'}</div>
                                    <div className="text-text-main text-base font-bold text-left">{settings.email}</div>
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="flex items-center space-x-4 p-5 rounded-2xl bg-white dark:bg-brand-bg/50">
                                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-text-muted font-black uppercase tracking-widest text-left">{locale === 'en' ? 'WhatsApp Number' : 'Nomor WhatsApp'}</div>
                                    <div className="text-text-main text-base font-bold text-left">+{settings.whatsapp}</div>
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="flex items-center space-x-4 p-5 rounded-2xl bg-white dark:bg-brand-bg/50">
                                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-text-muted font-black uppercase tracking-widest text-left">{locale === 'en' ? 'Office Address' : 'Alamat Kantor'}</div>
                                    <div className="text-text-main text-sm leading-relaxed font-bold text-left">{settings.address}</div>
                                </div>
                            </SpotlightCard>
                        </div>
                    </ScrollReveal>

                    {/* Right Column: Contact Form */}
                    <ScrollReveal animation="slide-left" delay={200} className="bg-white dark:bg-glass-bg border border-glass-border p-8 md:p-10 rounded-3xl shadow-xl">
                        <ContactForm />
                    </ScrollReveal>

                </div>
            </div>
        </div>
    );
}
