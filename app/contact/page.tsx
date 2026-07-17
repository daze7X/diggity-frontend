import React from 'react';
import ContactForm from '../../components/ContactForm';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { api, CompanySetting } from '../../lib/api';

export const revalidate = 60; // Cache data for 60 seconds (ISR)

export default async function ContactPage() {
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
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                        Hubungi Kami
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 font-medium">
                        Diskusikan kebutuhan proyek Anda langsung dengan tim konsultan senior kami.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Column: Info */}
                    <div className="space-y-8 lg:sticky lg:top-32">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white">Hub Info & Kantor</h2>
                            <p className="text-neutral-400 leading-relaxed">
                                Kami siap melayani konsultasi digital dalam bidang pengembangan aplikasi, strategi pertumbuhan brand, setup VPS cloud hosting, dan in-house bootcamps.
                            </p>
                        </div>

                        {/* Contact details cards */}
                        <div className="space-y-4 text-sm font-medium">
                            <div className="flex items-center space-x-4 p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Email Official</div>
                                    <div className="text-white text-base font-semibold">{settings.email}</div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Nomor WhatsApp</div>
                                    <div className="text-white text-base font-semibold">+{settings.whatsapp}</div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Alamat Kantor</div>
                                    <div className="text-white text-sm leading-relaxed font-semibold">{settings.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <ContactForm />

                </div>

            </div>
        </div>
    );
}
