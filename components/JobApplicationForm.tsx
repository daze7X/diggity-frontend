'use client';

import React, { useState, useRef } from 'react';
import { api } from '../lib/api';
import { executeRecaptcha } from '../lib/recaptcha';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface JobApplicationFormProps {
    careerId: number;
}

export default function JobApplicationForm({ careerId }: JobApplicationFormProps) {
    const { language, t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cover_letter: '',
    });
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type !== 'application/pdf') {
                alert(language === 'en' ? 'Only PDF file format is allowed!' : 'Hanya diperbolehkan mengunggah berkas format PDF!');
                setCvFile(null);
                return;
            }
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                alert(language === 'en' ? 'CV file size limit is 10MB!' : 'Ukuran berkas CV maksimal adalah 10MB!');
                setCvFile(null);
                return;
            }
            setCvFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cvFile) {
            alert(language === 'en' ? 'Please select your CV file first!' : 'Silakan pilih berkas CV Anda terlebih dahulu!');
            return;
        }

        setStatus('loading');

        try {
            const recaptchaToken = await executeRecaptcha('career');

            const submitData = new FormData();
            submitData.append('career_id', careerId.toString());
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('phone', formData.phone);
            submitData.append('cv', cvFile);
            if (formData.cover_letter) {
                submitData.append('cover_letter', formData.cover_letter);
            }
            if (recaptchaToken) {
                submitData.append('recaptcha_token', recaptchaToken);
            }

            await api.submitJobApplication(submitData);
            setStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                cover_letter: '',
            });
            setCvFile(null);
            setMessage(t('career.form.success_msg'));
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || t('career.form.error_msg'));
        }
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-glass-bg border border-glass-border p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(10,25,47,0.08)] dark:shadow-[0_12px_40px_0_rgba(0,0,0,0.6)]" style={{ boxShadow: 'var(--card-inset), var(--card-shadow)' }}>
            <div className="grain-noise pointer-events-none" />
            <div className="topographic-bg pointer-events-none" />
            
            <div className="relative z-20 text-left">
                <h3 className="text-xl font-bold text-text-main mb-6">{t('career.apply_title')}</h3>

                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
                        <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                        <h4 className="text-lg font-bold text-text-main">{t('career.form.success_title')}</h4>
                        <p className="text-sm text-text-gray max-w-sm">{message}</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-4 px-6 py-2.5 text-sm font-semibold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-lg transition-colors cursor-pointer"
                        >
                            {t('career.form.resubmit')}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">
                                {t('career.form.name')} <span className="text-brand-blue">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={t('career.form.name_placeholder')}
                                className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-lg focus:border-brand-blue focus:outline-none text-sm text-text-main placeholder-text-muted"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">
                                {t('career.form.email')} <span className="text-brand-blue">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="email@domain.com"
                                className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-lg focus:border-brand-blue focus:outline-none text-sm text-text-main placeholder-text-muted"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">
                                {t('career.form.phone')} <span className="text-brand-blue">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder={t('career.form.phone_placeholder')}
                                className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-lg focus:border-brand-blue focus:outline-none text-sm text-text-main placeholder-text-muted"
                            />
                        </div>

                        {/* CV Upload */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">
                                {t('career.form.cv')} <span className="text-brand-blue">*</span>
                            </label>
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-glass-border hover:border-brand-blue/50 rounded-xl p-6 text-center cursor-pointer transition-colors space-y-2 bg-neutral-950/5 dark:bg-neutral-950/20"
                            >
                                <input
                                    type="file"
                                    accept=".pdf"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <Upload className="w-8 h-8 text-text-muted mx-auto" />
                                {cvFile ? (
                                    <p className="text-sm font-bold text-brand-blue">{cvFile.name}</p>
                                ) : (
                                    <p className="text-sm text-text-muted">{t('career.form.cv_placeholder')}</p>
                                )}
                            </div>
                        </div>

                        {/* Cover Letter */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">
                                {t('career.form.cover_letter')}
                            </label>
                            <textarea
                                rows={3}
                                value={formData.cover_letter}
                                onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                                placeholder={t('career.form.cover_letter_placeholder')}
                                className="w-full px-4 py-2.5 bg-neutral-950/5 dark:bg-neutral-950/20 border border-glass-border rounded-lg focus:border-brand-blue focus:outline-none text-sm text-text-main placeholder-text-muted"
                            ></textarea>
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center space-x-2 text-rose-500 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                <span>{message}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="flex items-center justify-center w-full px-6 py-3.5 text-base font-bold text-white bg-brand-blue hover:bg-brand-blue-dark rounded-xl transition-all cursor-pointer disabled:bg-brand-blue/30 disabled:text-text-muted shadow-md shadow-brand-blue/15"
                        >
                            {status === 'loading' ? t('career.form.submitting') : t('career.form.submit')}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
