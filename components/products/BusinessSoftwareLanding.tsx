import React from 'react';
import Link from 'next/link';
import { CategoryHierarchy } from '../../lib/api';
import ScrollReveal from '../ScrollReveal';
import SpotlightCard from '../SpotlightCard';
import SubServiceIcon from '../SubServiceIcon';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';
import { getLocaleServer } from '../../lib/locale-server';

interface Props {
    mainCat: CategoryHierarchy;
}

export default async function BusinessSoftwareLanding({ mainCat }: Props) {
    const locale = await getLocaleServer();
    const freeProducts = await api.getProducts({ category: mainCat.slug, filter: 'free', limit: 4 }).catch(() => []);
    const paidProducts = await api.getProducts({ category: mainCat.slug, filter: 'paid', limit: 4 }).catch(() => []);

    return (
        <div className="min-h-screen bg-bg-canvas relative overflow-hidden">
            {/* HERO SECTION */}
            <div className="bg-brand-blue dark:bg-brand-bg dark:border-b dark:border-glass-border relative pt-32 pb-24 px-6 overflow-hidden">
                {/* Glowing orbs — same visual language as Career hero */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                            Business Software
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <p className="text-lg text-white/80 font-medium leading-relaxed max-w-2xl mx-auto">
                            {locale === 'en'
                                ? 'A fully integrated suite of business applications designed to help enterprises manage end-to-end business processes.'
                                : 'Rangkaian aplikasi bisnis terintegrasi yang dirancang untuk membantu perusahaan mengelola proses bisnis secara end-to-end.'}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={200} className="pt-4">
                        <Link href="#free-products" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-blue font-bold rounded-full hover:bg-glass-bg transition-all transform hover:scale-105 shadow-xl">
                            {locale === 'en' ? 'Start Free Trial' : 'Mulai Free Trial'} <ArrowRight className="w-5 h-5" />
                        </Link>
                    </ScrollReveal>
                </div>
                {/* Soft Blue Bleed Downwards (Hidden in Dark Mode) */}
                <div className="w-full h-24 bg-gradient-to-b from-brand-blue to-transparent dark:hidden pointer-events-none -mb-24 absolute bottom-0 left-0 right-0 z-0" />
            </div>

            {/* CATEGORIES SECTION */}
            <div id="categories" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-text-main">{locale === 'en' ? 'Solution Categories' : 'Kategori Solusi'}</h2>
                    <p className="text-text-gray mt-3 font-medium">{locale === 'en' ? "Choose the module that best suits your team's needs." : 'Pilih modul yang paling sesuai dengan kebutuhan divisi Anda.'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mainCat.children?.map((sub, i) => (
                        <ScrollReveal key={sub.slug} animation="fade-up" delay={i * 50}>
                            <Link href={`/products/business-software/${sub.slug}`} className="block h-full group">
                                <SpotlightCard className="h-full p-6 flex flex-col gap-4 border border-glass-border bg-glass-bg transition-all hover:bg-glass-bg/80 hover:border-brand-blue/30 group-hover:-translate-y-1">
                                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <SubServiceIcon slug={sub.slug || ""} fallbackCategoryIcon="layers" className="w-5 h-5 text-brand-blue" />
                                    </div>
                                    <div className="space-y-1.5 flex-1">
                                        <h3 className="text-lg font-extrabold text-text-main group-hover:text-brand-blue transition-colors">
                                            {sub.name}
                                        </h3>
                                        <p className="text-sm text-text-gray font-medium">
                                            {sub.products_count || 0} {locale === 'en' ? 'Products' : 'Produk'}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-glass-border/50 flex items-center justify-between text-xs font-bold text-text-muted group-hover:text-brand-blue transition-colors">
                                        {locale === 'en' ? 'View Solutions' : 'Lihat Solusi'}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </SpotlightCard>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            
            {/* FREE PRODUCTS SECTION */}
            {freeProducts.length > 0 && (
                <div id="free-products" className="bg-glass-bg border-y border-glass-border py-24 scroll-mt-24">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-text-main">{locale === 'en' ? 'Free Business Modules' : 'Modul Bisnis Gratis'}</h2>
                            <p className="text-text-gray mt-3 font-medium">{locale === 'en' ? 'Start optimizing your operations today with zero cost.' : 'Mulai optimasi operasional Anda hari ini tanpa biaya.'}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {freeProducts.map(product => (
                                <SpotlightCard key={product.id} className="p-8 border border-glass-border bg-bg-canvas flex items-start gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                                        <SubServiceIcon slug={product.slug || ""} fallbackCategoryIcon="layers" className="w-8 h-8 text-brand-blue" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-text-main mb-2">{product.name}</h3>
                                        <p className="text-sm text-text-gray mb-4 line-clamp-2">{product.description}</p>
                                        <Link href={`/products/business-software/${product.category?.slug}/${product.slug}`} className="text-xs font-bold text-brand-blue flex items-center hover:underline">{locale === 'en' ? 'Learn More' : 'Pelajari Lebih Lanjut'} <ArrowRight className="w-3 h-3 ml-1" /></Link>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* PAID PRODUCTS SECTION */}
            {paidProducts.length > 0 && (
                <div id="paid-products" className="bg-bg-canvas border-b border-glass-border py-24 scroll-mt-24">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-text-main">{locale === 'en' ? 'Premium Business Solutions' : 'Solusi Bisnis Premium'}</h2>
                            <p className="text-text-gray mt-3 font-medium">{locale === 'en' ? 'Enterprise-grade modules designed for scalability and high performance.' : 'Modul skala enterprise yang dirancang untuk skalabilitas dan performa tinggi.'}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {paidProducts.map(product => (
                                <SpotlightCard key={product.id} className="p-8 border border-glass-border bg-glass-bg flex items-start gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                                        <SubServiceIcon slug={product.slug || ""} fallbackCategoryIcon="layers" className="w-8 h-8 text-brand-blue" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-text-main mb-2">{product.name}</h3>
                                        <p className="text-sm text-text-gray mb-4 line-clamp-2">{product.description}</p>
                                        <Link href={`/products/business-software/${product.category?.slug}/${product.slug}`} className="text-xs font-bold text-brand-blue flex items-center hover:underline">{locale === 'en' ? 'Learn More' : 'Pelajari Lebih Lanjut'} <ArrowRight className="w-3 h-3 ml-1" /></Link>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* BENEFITS SECTION */}
            <div className="bg-glass-bg border-y border-glass-border py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-text-main">{locale === 'en' ? 'Why Choose Our Ecosystem?' : 'Kenapa Memilih Ekosistem Kami?'}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-bg-canvas rounded-2xl border border-glass-border">
                            <CheckCircle2 className="w-10 h-10 text-brand-blue mb-4" />
                            <h3 className="text-xl font-bold text-text-main mb-2">{locale === 'en' ? 'Fully Integrated' : 'Terintegrasi Penuh'}</h3>
                            <p className="text-text-gray text-sm leading-relaxed">{locale === 'en' ? 'All modules communicate seamlessly, eliminating data silos across departments.' : 'Semua modul saling berkomunikasi, menghilangkan silo data antar departemen.'}</p>
                        </div>
                        <div className="p-6 bg-bg-canvas rounded-2xl border border-glass-border">
                            <CheckCircle2 className="w-10 h-10 text-brand-blue mb-4" />
                            <h3 className="text-xl font-bold text-text-main mb-2">{locale === 'en' ? 'High Scalability' : 'Skalabilitas Tinggi'}</h3>
                            <p className="text-text-gray text-sm leading-relaxed">{locale === 'en' ? 'Designed to grow with your business, from mid-market to enterprise scale.' : 'Dirancang untuk tumbuh bersama bisnis Anda, dari skala menengah hingga enterprise.'}</p>
                        </div>
                        <div className="p-6 bg-bg-canvas rounded-2xl border border-glass-border">
                            <CheckCircle2 className="w-10 h-10 text-brand-blue mb-4" />
                            <h3 className="text-xl font-bold text-text-main mb-2">{locale === 'en' ? 'Industry-Grade Security' : 'Keamanan Standar Industri'}</h3>
                            <p className="text-text-gray text-sm leading-relaxed">{locale === 'en' ? 'Your data is protected with advanced encryption and role-based access control.' : 'Data perusahaan Anda dilindungi dengan enkripsi tingkat lanjut dan akses berbasis peran.'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PRICING OVERVIEW SECTION */}
            <div id="pricing" className="max-w-5xl mx-auto px-6 py-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-text-main">{locale === 'en' ? 'Flexible Subscription Plans' : 'Paket Berlangganan Fleksibel'}</h2>
                    <p className="text-text-gray mt-3 font-medium">{locale === 'en' ? 'Start free, upgrade as your business grows.' : 'Mulai dengan gratis, upgrade seiring pertumbuhan bisnis Anda.'}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {/* Starter */}
                    <SpotlightCard className="h-full p-10 border border-glass-border bg-glass-bg flex flex-col">
                        <h3 className="text-xl font-bold text-text-main">Starter</h3>
                        <p className="text-text-gray text-sm mt-2 mb-6">{locale === 'en' ? 'Perfect for small teams' : 'Cocok untuk tim kecil'}</p>
                        <div className="text-4xl font-black text-text-main mb-6">Free</div>
                        <ul className="space-y-3 mb-6">
                            <li className="flex gap-2 text-sm text-text-gray"><CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />{locale === 'en' ? 'Access 1 Core Module' : 'Akses 1 Modul Dasar'}</li>
                            <li className="flex gap-2 text-sm text-text-gray"><CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />{locale === 'en' ? 'Up to 5 Users' : 'Maksimal 5 User'}</li>
                        </ul>
                        <Link href="/register" className="mt-auto block w-full py-4 rounded-xl bg-brand-blue/10 text-brand-blue font-bold text-center hover:bg-brand-blue/20 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 transition-all duration-200">{locale === 'en' ? 'Create Free Account' : 'Buat Akun Gratis'}</Link>
                    </SpotlightCard>

                    {/* Professional — badge absolutely positioned, does NOT affect card layout */}
                    <div className="relative h-full">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap z-10">
                            {locale === 'en' ? 'Most Popular' : 'Paling Populer'}
                        </div>
                        <SpotlightCard className="h-full p-10 border-2 border-brand-blue bg-glass-bg flex flex-col shadow-xl shadow-brand-blue/10">
                            <h3 className="text-xl font-bold text-text-main">Professional</h3>
                            <p className="text-text-gray text-sm mt-2 mb-6">{locale === 'en' ? 'For mid-size businesses' : 'Untuk perusahaan menengah'}</p>
                            <div className="text-4xl font-black text-text-main mb-6 flex items-end gap-1">
                                {locale === 'en' ? 'Paid' : 'Berbayar'} <span className="text-sm font-medium text-text-gray mb-1">{locale === 'en' ? '/ month' : '/ bulan'}</span>
                            </div>
                            <ul className="space-y-3 mb-6">
                                <li className="flex gap-2 text-sm text-text-gray"><CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />{locale === 'en' ? 'All Pro Modules Included' : 'Akses Semua Modul Pro'}</li>
                                <li className="flex gap-2 text-sm text-text-gray"><CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />Unlimited Users (Tiers)</li>
                                <li className="flex gap-2 text-sm text-text-gray"><CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />{locale === 'en' ? 'Priority Support' : 'Prioritas Support'}</li>
                            </ul>
                            <Link href="/register" className="mt-auto block w-full py-4 rounded-xl bg-brand-blue text-white font-bold text-center hover:bg-brand-blue-dark hover:shadow-lg hover:shadow-brand-blue/25 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 transition-all duration-200">{locale === 'en' ? 'Get Started' : 'Mulai Berlangganan'}</Link>
                        </SpotlightCard>
                    </div>

                    {/* Enterprise */}
                    <SpotlightCard className="h-full p-10 border border-glass-border bg-glass-bg flex flex-col">
                        <h3 className="text-xl font-bold text-text-main">Enterprise</h3>
                        <p className="text-text-gray text-sm mt-2 mb-6">{locale === 'en' ? 'Custom solutions for corporations' : 'Solusi kustom untuk korporat'}</p>
                        <div className="text-4xl font-black text-text-main mb-6">Custom</div>
                        <ul className="space-y-3 mb-6">
                            <li className="flex gap-2 text-sm text-text-gray"><CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />{locale === 'en' ? 'Full Modules & Customization' : 'Modul & Kustomisasi Penuh'}</li>
                            <li className="flex gap-2 text-sm text-text-gray"><CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />Dedicated Account Manager</li>
                            <li className="flex gap-2 text-sm text-text-gray"><CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />On-Premise / Private Cloud</li>
                        </ul>
                        <Link href="/contact" className="mt-auto block w-full py-4 rounded-xl bg-brand-blue/10 text-brand-blue font-bold text-center hover:bg-brand-blue/20 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 transition-all duration-200">{locale === 'en' ? 'Contact Sales' : 'Hubungi Sales'}</Link>
                    </SpotlightCard>
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="bg-glass-bg border-t border-glass-border py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-text-main">{locale === 'en' ? 'Business Software FAQ' : 'FAQ Business Software'}</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="p-6 bg-bg-canvas border border-glass-border rounded-2xl">
                            <h3 className="font-bold text-text-main mb-2">{locale === 'en' ? 'Can I subscribe to specific modules only?' : 'Apakah saya bisa berlangganan modul tertentu saja?'}</h3>
                            <p className="text-sm text-text-gray leading-relaxed">{locale === 'en' ? 'Yes. Our modular architecture lets you subscribe only to the modules you need (e.g. HR and Finance only) and add more modules as your business grows.' : 'Ya, arsitektur modular kami memungkinkan Anda untuk hanya berlangganan modul yang Anda butuhkan (misalnya hanya HR dan Finance) dan menambah modul lain di masa mendatang.'}</p>
                        </div>
                        <div className="p-6 bg-bg-canvas border border-glass-border rounded-2xl">
                            <h3 className="font-bold text-text-main mb-2">{locale === 'en' ? "How is my company's data secured?" : 'Bagaimana dengan keamanan data perusahaan?'}</h3>
                            <p className="text-sm text-text-gray leading-relaxed">{locale === 'en' ? 'We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. Servers are hosted in Tier-3 data centers with ISO 27001 certification.' : 'Kami menggunakan enkripsi AES-256 untuk data at rest dan TLS 1.3 untuk data in transit. Server berlokasi di data center Tier-3 terpercaya dengan sertifikasi ISO 27001.'}</p>
                        </div>
                        <div className="p-6 bg-bg-canvas border border-glass-border rounded-2xl">
                            <h3 className="font-bold text-text-main mb-2">{locale === 'en' ? 'Is a free trial available?' : 'Apakah tersedia masa percobaan gratis?'}</h3>
                            <p className="text-sm text-text-gray leading-relaxed">{locale === 'en' ? 'Absolutely. We offer a full 14-day free trial to evaluate all premium features — no credit card required.' : 'Tentu. Kami menyediakan Free Trial 14 hari penuh untuk mengevaluasi semua fitur premium kami tanpa memerlukan kartu kredit.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}