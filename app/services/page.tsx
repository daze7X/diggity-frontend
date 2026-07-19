import React from 'react';
import SpotlightCard from '../../components/SpotlightCard';

export default function ServicesPage() {
    return (
        <div className="relative pt-36 pb-20 md:pt-48 md:pb-28">
            <section className="container max-w-7xl mx-auto px-6 md:px-8 text-center space-y-8">
                <div className="hero space-y-4" style={{ padding: '40px 0 20px' }}>
                    <span className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-xs font-semibold text-brand-blue">
                        Layanan Kami
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight max-w-3xl mx-auto">
                        Layanan Profesional <span className="text-brand-blue">Diggity</span>
                    </h1>
                    <p className="text-text-gray max-w-xl mx-auto font-medium text-sm md:text-base">
                        Solusi modular terintegrasi yang disesuaikan untuk skala bisnis Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto pt-10 text-left">
                    
                    {/* App Builder Squad */}
                    <SpotlightCard className="p-8 space-y-6">
                        <span className="inline-block px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-xs font-bold text-brand-blue">
                            APP BUILDER SQUAD
                        </span>
                        <div>
                            <h3 className="text-xl font-bold text-text-main mb-2">Rekayasa Perangkat Lunak</h3>
                            <p className="text-sm text-text-gray mb-6 leading-relaxed">
                                Membangun produk digital berspesifikasi tinggi dengan kode bersih dan arsitektur modern.
                            </p>
                        </div>
                        <ul className="text-sm text-text-gray space-y-3 list-none">
                            <li>✓ Website Development (Next.js / React)</li>
                            <li>✓ Mobile Apps (iOS & Android Native/Hybrid)</li>
                            <li>✓ Custom Software & ERP Systems</li>
                            <li>✓ UI/UX Design & Figma Prototyping</li>
                        </ul>
                    </SpotlightCard>

                    {/* Brand Growth Division */}
                    <SpotlightCard className="p-8 space-y-6">
                        <span className="inline-block px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-xs font-bold text-brand-blue">
                            BRAND GROWTH DIVISION
                        </span>
                        <div>
                            <h3 className="text-xl font-bold text-text-main mb-2">Optimasi & Pemasaran</h3>
                            <p className="text-sm text-text-gray mb-6 leading-relaxed">
                                Mengakselerasi jangkauan brand dan konversi penjualan secara bertarget di platform digital.
                            </p>
                        </div>
                        <ul className="text-sm text-text-gray space-y-3 list-none">
                            <li>✓ Search Engine Optimization (SEO Organik)</li>
                            <li>✓ Google Ads & PPC Campaigns</li>
                            <li>✓ Meta Ads (Facebook & Instagram Ads)</li>
                            <li>✓ Social Media Management & Branding</li>
                        </ul>
                    </SpotlightCard>

                    {/* Cloud Service Hub */}
                    <SpotlightCard className="p-8 space-y-6">
                        <span className="inline-block px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-xs font-bold text-brand-blue">
                            CLOUD SERVICE HUB
                        </span>
                        <div>
                            <h3 className="text-xl font-bold text-text-main mb-2">Infrastruktur & Cloud</h3>
                            <p className="text-sm text-text-gray mb-6 leading-relaxed">
                                Layanan pengelolaan server cloud yang aman, cepat, dan selalu dapat diandalkan 24/7.
                            </p>
                        </div>
                        <ul className="text-sm text-text-gray space-y-3 list-none">
                            <li>✓ Premium VPS & Cloud Server Hosting</li>
                            <li>✓ Domain & Secure Business Email Setup</li>
                            <li>✓ Server Monitoring & Maintenance</li>
                            <li>✓ Cloudflare Integration & SSL Security</li>
                        </ul>
                    </SpotlightCard>

                    {/* Digital Skill Lab */}
                    <SpotlightCard className="p-8 space-y-6">
                        <span className="inline-block px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-xs font-bold text-brand-blue">
                            DIGITAL SKILL LAB
                        </span>
                        <div>
                            <h3 className="text-xl font-bold text-text-main mb-2">Pelatihan & Edukasi</h3>
                            <p className="text-sm text-text-gray mb-6 leading-relaxed">
                                Meningkatkan kompetensi teknis tim internal perusahaan Anda agar siap bersaing.
                            </p>
                        </div>
                        <ul className="text-sm text-text-gray space-y-3 list-none">
                            <li>✓ Corporate IT Training & Bootcamps</li>
                            <li>✓ Custom UI/UX & Web Dev Workshops</li>
                            <li>✓ Digital Marketing Masterclass</li>
                            <li>✓ IT Team Upskilling & Consultation</li>
                        </ul>
                    </SpotlightCard>

                </div>
            </section>
        </div>
    );
}
