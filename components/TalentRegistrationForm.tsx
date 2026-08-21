'use client';

import React, { useState } from 'react';
import { api } from '../lib/api';
import { Send, CheckCircle, Sparkles, User, Briefcase, Plus, X } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function TalentRegistrationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState<'individual' | 'dedicated_team'>('individual');
    const [skillInput, setSkillInput] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [portfolioInput, setPortfolioInput] = useState('');
    const [portfolioLinks, setPortfolioLinks] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleAddSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (indexToRemove: number) => {
        setSkills(skills.filter((_, i) => i !== indexToRemove));
    };

    const handleAddLink = () => {
        if (portfolioInput.trim() && !portfolioLinks.includes(portfolioInput.trim())) {
            setPortfolioLinks([...portfolioLinks, portfolioInput.trim()]);
            setPortfolioInput('');
        }
    };

    const handleRemoveLink = (indexToRemove: number) => {
        setPortfolioLinks(portfolioLinks.filter((_, i) => i !== indexToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.submitTalentProfile({
                name,
                email,
                phone: phone || undefined,
                type,
                skills,
                portfolio_links: portfolioLinks,
                description: description || undefined,
            });
            setStatus('success');
            setName('');
            setEmail('');
            setPhone('');
            setSkills([]);
            setPortfolioLinks([]);
            setDescription('');
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'Gagal mengirimkan profil talenta. Silakan coba kembali.');
        }
    };

    if (status === 'success') {
        return (
            <SpotlightCard className="p-8 text-center space-y-6 border border-emerald-500/30 bg-emerald-500/5">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-text-main">{language === 'en' ? 'Registration Successful!' : 'Registrasi Berhasil!'}</h3>
                    <p className="text-sm text-text-gray max-w-md mx-auto leading-relaxed">
                        {language === 'en' ? 'Thank you for registering in the Diggity talent network. Our team will review your qualifications and contact you if there is a suitable project.' : 'Terima kasih telah mendaftarkan diri Anda di jaringan talenta Diggity. Tim kami akan meninjau kualifikasi dan menghubungi Anda jika ada proyek yang sesuai.'}
                    </p>
                </div>
                <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 bg-brand-blue text-white rounded-lg text-sm font-semibold hover:bg-brand-blue-dark transition-colors cursor-pointer"
                >
                    Daftar Kembali
                </button>
            </SpotlightCard>
        );
    }

    return (
        <SpotlightCard className="p-8 text-left border border-glass-border">
            <div className="space-y-6">
                <div>
                    <span className="px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-[10px] font-bold text-brand-blue uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3 h-3" /> Talent Network
                    </span>
                    <h3 className="text-xl font-bold text-text-main">{language === 'en' ? 'Join Talent Network' : 'Gabung Jaringan Talenta'}</h3>
                    <p className="text-xs text-text-gray leading-relaxed pt-1">
                        {language === 'en' ? 'Register yourself as a freelance individual or specialized team for Diggity partnership projects.' : 'Daftarkan diri Anda sebagai talenta lepas individu atau tim khusus untuk proyek kemitraan Diggity.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm">
                    {/* Tipe Registrasi */}
                    <div className="space-y-2 text-left">
                        <label className="font-bold text-text-gray block text-xs">Tipe Talenta</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setType('individual')}
                                className={`p-4 flex items-center space-x-3 rounded-xl border text-left cursor-pointer transition-colors ${
                                    type === 'individual'
                                        ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                                        : 'border-glass-border bg-glass-bg text-text-gray hover:border-brand-blue/30'
                                }`}
                            >
                                <User className="w-5 h-5 shrink-0" />
                                <div>
                                    <span className="font-bold block text-sm">Individu</span>
                                    <span className="text-[10px] opacity-75">Freelancer / Profesional</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setType('dedicated_team')}
                                className={`p-4 flex items-center space-x-3 rounded-xl border text-left cursor-pointer transition-colors ${
                                    type === 'dedicated_team'
                                        ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                                        : 'border-glass-border bg-glass-bg text-text-gray hover:border-brand-blue/30'
                                }`}
                            >
                                <Briefcase className="w-5 h-5 shrink-0" />
                                <div>
                                    <span className="font-bold block text-sm">Dedicated Team</span>
                                    <span className="text-[10px] opacity-75">Agensi / Tim Pengembang</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 text-left">
                            <label className="font-bold text-text-gray block text-xs">Nama Lengkap / Nama Tim</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={language === 'en' ? 'Enter your name' : 'Masukkan nama Anda'}
                                className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-text-main placeholder-text-muted"
                            />
                        </div>

                        <div className="space-y-1.5 text-left">
                            <label className="font-bold text-text-gray block text-xs">Alamat Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nama@email.com"
                                className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-text-main placeholder-text-muted"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                        <label className="font-bold text-text-gray block text-xs">Nomor WhatsApp (Opsional)</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Contoh: 08123456789"
                            className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-text-main placeholder-text-muted"
                        />
                    </div>

                    {/* Input Skills / Keahlian */}
                    <div className="space-y-1.5 text-left">
                        <label className="font-bold text-text-gray block text-xs">Keahlian / Tech Stack</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                placeholder="Contoh: React, Laravel, UI/UX"
                                className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-text-main placeholder-text-muted"
                            />
                            <button
                                type="button"
                                onClick={handleAddSkill}
                                className="px-4 bg-brand-blue text-white rounded-xl hover:bg-brand-blue-dark transition-colors flex items-center justify-center cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        {skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2">
                                {skills.map((skill, idx) => (
                                    <span key={idx} className="px-2.5 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-md text-[10px] font-bold text-brand-blue flex items-center gap-1">
                                        {skill}
                                        <X className="w-3 h-3 hover:text-rose-500 cursor-pointer" onClick={() => handleRemoveSkill(idx)} />
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input Portfolio Links */}
                    <div className="space-y-1.5 text-left">
                        <label className="font-bold text-text-gray block text-xs">Link Portfolio / Profil (LinkedIn/Github)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={portfolioInput}
                                onChange={(e) => setPortfolioInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLink())}
                                placeholder="https://github.com/username"
                                className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-text-main placeholder-text-muted"
                            />
                            <button
                                type="button"
                                onClick={handleAddLink}
                                className="px-4 bg-brand-blue text-white rounded-xl hover:bg-brand-blue-dark transition-colors flex items-center justify-center cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        {portfolioLinks.length > 0 && (
                            <div className="flex flex-col gap-1.5 pt-2">
                                {portfolioLinks.map((link, idx) => (
                                    <span key={idx} className="px-2.5 py-1 bg-glass-bg border border-glass-border rounded-md text-[10px] font-medium text-text-main flex items-center justify-between gap-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                                        <span>{link}</span>
                                        <X className="w-3.5 h-3.5 hover:text-rose-500 cursor-pointer shrink-0" onClick={() => handleRemoveLink(idx)} />
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-1.5 text-left">
                        <label className="font-bold text-text-gray block text-xs">Deskripsi Singkat / Pengalaman Kerja</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={language === 'en' ? 'Briefly describe your specialization and project background.' : 'Jelaskan secara singkat mengenai spesialisasi dan latar belakang proyek Anda.'}
                            rows={3}
                            className="w-full px-4 py-3 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-xl focus:border-brand-blue focus:outline-none text-text-main placeholder-text-muted text-sm"
                        />
                    </div>

                    {status === 'error' && (
                        <p className="text-xs text-rose-500 font-bold text-left">{message}</p>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-3.5 bg-brand-blue text-white hover:bg-brand-blue-dark disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl text-sm font-bold transition-all shadow-md shadow-brand-blue/15 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <Send className="w-4 h-4" />
                            {status === 'loading' ? 'Mengirim...' : 'Kirim Registrasi'}
                        </button>
                    </div>
                </form>
            </div>
        </SpotlightCard>
    );
}
