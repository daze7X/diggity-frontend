import React from 'react';
import ContactForm from '../../components/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';
import { api, CompanySetting } from '../../lib/api';
import SpotlightCard from '../../components/SpotlightCard';
import { getLocaleServer } from '../../lib/locale-server';

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
        <div className="relative pt-36 pb-20 md:pt-40 md:pb-28">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main">
                        {locale === 'en' ? 'Contact Us' : 'Hubungi Kami'}
                    </h1>
                    <p className="text-lg md:text-xl text-text-muted font-medium">
                        {locale === 'en' ? 'Discuss your project needs directly with our senior consulting team.' : 'Diskusikan kebutuhan proyek Anda langsung dengan tim konsultan senior kami.'}
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Column: Info */}
                    <div className="space-y-8 lg:sticky lg:top-32 text-left">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-text-main">{locale === 'en' ? 'Hub Info & Office' : 'Hub Info & Kantor'}</h2>
                            <p className="text-text-gray leading-relaxed">
                                {locale === 'en' ? 'We are ready to provide digital consultation in application development, brand growth strategy, VPS cloud hosting setup, and in-house bootcamps.' : 'Kami siap melayani konsultasi digital dalam bidang pengembangan aplikasi, strategi pertumbuhan brand, setup VPS cloud hosting, dan in-house bootcamps.'}
                            </p>
                        </div>

                        {/* Contact details cards */}
                        <div className="space-y-4 text-sm font-medium">
                            <SpotlightCard className="flex items-center space-x-4 p-5">
                                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted font-bold uppercase tracking-wider text-left">{locale === 'en' ? 'Official Email' : 'Email Official'}</div>
                                    <div className="text-text-main text-base font-semibold text-left">{settings.email}</div>
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="flex items-center space-x-4 p-5">
                                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted font-bold uppercase tracking-wider text-left">{locale === 'en' ? 'WhatsApp Number' : 'Nomor WhatsApp'}</div>
                                    <div className="text-text-main text-base font-semibold text-left">+{settings.whatsapp}</div>
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="flex items-center space-x-4 p-5">
                                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted font-bold uppercase tracking-wider text-left">{locale === 'en' ? 'Office Address' : 'Alamat Kantor'}</div>
                                    <div className="text-text-main text-sm leading-relaxed font-semibold text-left">{settings.address}</div>
                                </div>
                            </SpotlightCard>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <ContactForm />

                </div>

            </div>
        </div>
    );
}
