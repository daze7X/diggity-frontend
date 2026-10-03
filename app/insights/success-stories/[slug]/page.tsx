'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../../context/LanguageContext';
import ScrollReveal from '../../../../components/ScrollReveal';
import { 
    ArrowLeft, Target, Rocket, Lightbulb, 
    Settings, CheckCircle2, TrendingUp, Quote, Building2, Briefcase, Calendar 
} from 'lucide-react';

export default function SuccessStoryDetailPage({ params }: { params: { slug: string } }) {
    const { language: locale } = useLanguage();

    // Dummy data. In reality, fetch from API using params.slug
    const story = {
        client: 'CarePro',
        industry: 'Healthcare',
        scale: 'Small and Medium Business',
        scope: 'Marketing & Growth',
        duration: '2 Months',
        year: '2026',
        title: 'CarePro Meningkatkan Lead Generation melalui Strategi Digital Marketing Terintegrasi',
        excerpt: 'CarePro bekerja sama dengan Diggity untuk membangun strategi digital marketing yang lebih terukur melalui kombinasi Meta Ads, Google Ads, creative campaign, dan performance optimization.',
        challenge: [
            'Digital acquisition belum menghasilkan lead secara optimal.',
            'Targeting audiens yang terlalu luas dan tidak terukur.',
            'Kurangnya conversion tracking pada website utama.'
        ],
        objective: [
            'Meningkatkan qualified leads untuk layanan unggulan.',
            'Menurunkan Cost Per Lead (CPL) agar lebih efisien.',
            'Membangun sistem tracking yang transparan.'
        ],
        approach: 'Kami melakukan audit menyeluruh terhadap campaign yang sedang berjalan, merombak struktur targeting, dan merancang ulang creative assets agar lebih resonan dengan pain points pasien. Selanjutnya, kami mengimplementasikan conversion tracking end-to-end.',
        solution: 'Integrated Digital Marketing Campaign menggunakan Meta Ads dan Google Ads.',
        results: [
            { value: '68', label: 'Qualified Leads Generated' },
            { value: '12.5K+', label: 'Targeted Reach' },
            { value: 'Rp9.590', label: 'Cost per Lead' },
            { value: '45%', label: 'Conversion Rate Increase' }
        ],
        impact: 'Klien memiliki channel acquisition digital yang lebih terukur dan dapat dioptimalkan berdasarkan data, mengurangi ketergantungan pada metode pemasaran konvensional.',
        takeaways: [
            'Data changes the strategy: Campaign performance menjadi dasar pengambilan keputusan berikutnya.',
            'The right audience matters: Targeting yang tepat lebih penting daripada sekadar memperbesar budget.',
            'Optimization is continuous: Digital campaign membutuhkan monitoring dan iterasi secara berkelanjutan.'
        ]
    };

    return (
        <div className="min-h-screen bg-bg-canvas pt-24 pb-12 overflow-hidden relative">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                
                <div className="mb-8">
                    <Link href="/insights/success-stories" className="inline-flex items-center gap-2 text-sm font-bold text-text-gray hover:text-amber-500 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Success Stories
                    </Link>
                </div>

                {/* 1. HERO SECTION */}
                <ScrollReveal animation="fade-up">
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-glass-bg border border-glass-border flex items-center justify-center font-black text-xl text-text-gray shadow-sm">
                                {story.client.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-text-gray uppercase tracking-widest mb-1">SUCCESS STORY</div>
                                <h2 className="text-xl font-black text-text-main">{story.client}</h2>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-main mb-6 leading-tight">
                            {story.title}
                        </h1>
                        <p className="text-xl text-text-gray font-medium leading-relaxed">
                            {story.excerpt}
                        </p>
                    </div>

                    {/* Project Information Metadata */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 pt-8 border-t border-glass-border">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-text-gray flex items-center gap-1"><Building2 className="w-3 h-3" /> INDUSTRY</span>
                            <span className="text-sm font-bold text-text-main">{story.industry}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-text-gray flex items-center gap-1"><Target className="w-3 h-3" /> SCALE</span>
                            <span className="text-sm font-bold text-text-main">{story.scale}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-text-gray flex items-center gap-1"><Briefcase className="w-3 h-3" /> SCOPE</span>
                            <span className="text-sm font-bold text-text-main">{story.scope}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-text-gray flex items-center gap-1"><Calendar className="w-3 h-3" /> DURATION</span>
                            <span className="text-sm font-bold text-text-main">{story.duration}</span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* 2. THE STORY */}
                <div className="space-y-16">
                    
                    <ScrollReveal animation="fade-up">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 shrink-0">
                                <h3 className="text-2xl font-black text-text-main flex items-center gap-2 mb-4">
                                    <Target className="w-6 h-6 text-amber-500" /> The Challenge
                                </h3>
                            </div>
                            <div className="w-full md:w-2/3">
                                <ul className="space-y-3">
                                    {story.challenge.map((c, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0"></div>
                                            <span className="text-text-gray font-medium text-lg leading-relaxed">{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 shrink-0">
                                <h3 className="text-2xl font-black text-text-main flex items-center gap-2 mb-4">
                                    <Rocket className="w-6 h-6 text-amber-500" /> The Objective
                                </h3>
                            </div>
                            <div className="w-full md:w-2/3">
                                <ul className="space-y-3">
                                    {story.objective.map((o, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                                            <span className="text-text-gray font-medium text-lg leading-relaxed">{o}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 shrink-0">
                                <h3 className="text-2xl font-black text-text-main flex items-center gap-2 mb-4">
                                    <Lightbulb className="w-6 h-6 text-amber-500" /> Our Approach
                                </h3>
                            </div>
                            <div className="w-full md:w-2/3">
                                <p className="text-text-gray font-medium text-lg leading-relaxed">{story.approach}</p>
                                <div className="mt-6 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                    <h4 className="font-bold text-amber-600 mb-2">The Solution:</h4>
                                    <p className="text-amber-700 dark:text-amber-500 font-medium">{story.solution}</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* 3. THE RESULTS */}
                    <ScrollReveal animation="fade-up" className="pt-8 border-t border-glass-border">
                        <h3 className="text-3xl font-black text-text-main flex items-center gap-2 mb-8">
                            <TrendingUp className="w-8 h-8 text-amber-500" /> The Results
                        </h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            {story.results.map((res, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-white dark:bg-glass-bg border border-glass-border text-center shadow-sm">
                                    <div className="text-3xl md:text-4xl font-black text-amber-500 mb-2">{res.value}</div>
                                    <div className="text-xs font-bold text-text-gray uppercase">{res.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-50 dark:bg-black/20 rounded-3xl p-8 border border-glass-border">
                            <h4 className="text-xl font-black text-text-main mb-3">Business Impact</h4>
                            <p className="text-lg text-text-gray font-medium leading-relaxed">{story.impact}</p>
                        </div>
                    </ScrollReveal>

                    {/* 4. KEY TAKEAWAYS */}
                    <ScrollReveal animation="fade-up">
                        <div className="bg-brand-blue/5 rounded-3xl p-8 md:p-10 border border-brand-blue/20">
                            <h3 className="text-2xl font-black text-brand-blue mb-6">What We Learned</h3>
                            <ul className="space-y-4">
                                {story.takeaways.map((t, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
                                        <span className="text-text-main font-medium text-lg">{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* 5. TESTIMONIAL (Optional) */}
                    <ScrollReveal animation="fade-up">
                        <div className="text-center py-12 px-6">
                            <Quote className="w-12 h-12 text-amber-500/30 mx-auto mb-6" />
                            <p className="text-xl md:text-2xl font-bold text-text-main italic mb-8 max-w-2xl mx-auto leading-relaxed">
                                "Sistem tracking yang dibangun oleh tim Diggity sangat mengubah cara kami melihat data marketing. Semua menjadi lebih terukur dan objektif."
                            </p>
                            <div>
                                <h5 className="font-black text-text-main text-lg">Marketing Director</h5>
                                <p className="text-text-gray font-medium">CarePro Healthcare</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* 6. CTA */}
                    <ScrollReveal animation="fade-up" className="pt-16 pb-8 border-t border-glass-border text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-text-main mb-6">
                            Your Challenge Could Be Our Next Success Story.
                        </h2>
                        <p className="text-lg text-text-gray font-medium mb-10 max-w-2xl mx-auto">
                            Mari diskusikan kebutuhan Anda dan temukan pendekatan yang tepat bersama Diggity.
                        </p>
                        <Link href="/contact" className="inline-flex px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold transition-all text-lg shadow-lg hover:shadow-xl">
                            Start a Conversation
                        </Link>
                    </ScrollReveal>

                </div>
            </div>
        </div>
    );
}
