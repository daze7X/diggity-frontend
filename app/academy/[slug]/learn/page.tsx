'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { 
    PlayCircle, 
    FileText, 
    CheckCircle2, 
    ArrowLeft, 
    ChevronRight, 
    Loader2, 
    Award, 
    Sparkles
} from 'lucide-react';
import SpotlightCard from '../../../../components/SpotlightCard';

interface Lesson {
    id: number;
    title: string;
    content_type: string;
    content: string | null;
    video_url: string | null;
    duration_minutes: number;
}

interface Module {
    id: number;
    title: string;
    description: string | null;
    lessons: Lesson[];
}

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    modules: Module[];
}

interface Props {
    params: Promise<{ slug: string }>;
}

export default function LMSPlayer({ params }: Props) {
    const { slug } = use(params);
    const { user, loading: authLoading } = useAuth();
    const { language: locale } = useLanguage();
    const router = useRouter();

    const [course, setCourse] = useState<Course | null>(null);
    const [completedLessons, setCompletedLessons] = useState<number[]>([]);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        const fetchLMSData = async () => {
            if (!user) return;
            try {
                const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
                const headers: HeadersInit = token ? { Authorization: `Bearer ${decodeURIComponent(token)}` } : {};
                
                const res = await fetch(`${API_URL}/user/courses/${slug}/learn`, { headers });
                
                if (!res.ok) {
                    if (res.status === 403) {
                        alert(locale === 'en' ? 'You are not actively enrolled in this class.' : 'Anda belum terdaftar aktif di kelas ini.');
                        router.push(`/academy/${slug}`);
                    }
                    throw new Error('Failed to load class syllabus');
                }

                const data = await res.json();
                if (data.success) {
                    setCourse(data.course);
                    setCompletedLessons(data.completed_lessons || []);
                    
                    // Set first lesson as active by default
                    if (data.course.modules && data.course.modules.length > 0) {
                        const firstModule = data.course.modules[0];
                        if (firstModule.lessons && firstModule.lessons.length > 0) {
                            setActiveLesson(firstModule.lessons[0]);
                        }
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLMSData();
    }, [user, slug, API_URL, router, locale]);

    const handleMarkComplete = async () => {
        if (!activeLesson || !course || submitting) return;
        setSubmitting(true);
        setSuccessMessage('');

        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            const headers: HeadersInit = token ? { 
                Authorization: `Bearer ${decodeURIComponent(token)}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            } : {};

            const res = await fetch(`${API_URL}/user/courses/${slug}/lessons/${activeLesson.id}/complete`, {
                method: 'POST',
                headers
            });

            const data = await res.json();
            if (data.success) {
                setCompletedLessons(data.completed_lessons || []);
                setSuccessMessage(locale === 'en' ? 'Material successfully completed!' : 'Materi berhasil diselesaikan!');
                
                if (data.enrollment_status === 'completed') {
                    alert(locale === 'en' ? 'Congratulations! You have completed all materials in this class.' : 'Selamat! Anda telah menyelesaikan seluruh materi di kelas ini.');
                }

                // Auto-advance to next lesson if available
                setTimeout(() => {
                    setSuccessMessage('');
                    findAndSetNextLesson();
                }, 1500);
            }
        } catch (err) {
            console.error('Failed to complete lesson:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const findAndSetNextLesson = () => {
        if (!course || !activeLesson) return;
        
        let foundActive = false;
        for (const mod of course.modules) {
            for (const les of mod.lessons) {
                if (foundActive) {
                    setActiveLesson(les);
                    return;
                }
                if (les.id === activeLesson.id) {
                    foundActive = true;
                }
            }
        }
    };

    // Helper to extract YouTube ID
    const getYouTubeEmbedUrl = (url: string | null) => {
        if (!url) return '';
        // Handles youtube.com/watch?v=ID or youtu.be/ID or youtube.com/embed/ID
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        
        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`;
        }
        return url;
    };

    if (authLoading || loading || !user || !course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
                    <span className="text-xs text-text-muted font-bold font-mono">{locale === 'en' ? 'Preparing Learning Space...' : 'Menyiapkan Ruang Belajar...'}</span>
                </div>
            </div>
        );
    }

    // Calculate total lessons and completed percentage
    const allLessons = course.modules.flatMap(m => m.lessons);
    const totalLessonsCount = allLessons.length;
    const completedCount = allLessons.filter(l => completedLessons.includes(l.id)).length;
    const progressPercent = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

    return (
        <div className="min-h-screen pt-28 pb-20 bg-brand-bg text-left">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-6">
                
                {/* Header Navbar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-glass-border/30">
                    <div className="space-y-1">
                        <Link 
                            href="/dashboard/academy" 
                            className="inline-flex items-center gap-1.5 text-xs text-brand-blue font-bold hover:underline mb-1"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> {locale === 'en' ? 'Back to My LMS' : 'Kembali ke LMS Saya'}
                        </Link>
                        <h1 className="text-xl md:text-2xl font-black text-text-main tracking-tight leading-tight">
                            {course.title}
                        </h1>
                    </div>

                    {/* Progress Badge */}
                    <div className="shrink-0 flex items-center gap-3">
                        <div className="text-right space-y-0.5">
                            <span className="text-[10px] text-text-muted font-bold block uppercase">{locale === 'en' ? 'Learning Progress' : 'Progres Belajar'}</span>
                            <span className="text-sm font-black text-text-main">{progressPercent}% {locale === 'en' ? 'Completed' : 'Selesai'} ({completedCount}/{totalLessonsCount})</span>
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-brand-blue/30 flex items-center justify-center text-xs font-black text-brand-blue bg-brand-blue/5">
                            {progressPercent}%
                        </div>
                    </div>
                </div>

                {/* Certificate Completion Banner */}
                {progressPercent === 100 && (
                    <div className="p-6 md:p-8 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 border border-amber-500/30 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl shadow-amber-500/5 animate-fade-in relative overflow-hidden text-left mb-6">
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />
                        
                        <div className="flex items-center gap-4 text-left">
                            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shrink-0">
                                <Award className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-base md:text-lg font-black text-text-main">{locale === 'en' ? 'Congratulations on Your Graduation! 🏆' : 'Selamat atas Kelulusan Anda! 🏆'}</h3>
                                <p className="text-xs text-text-muted leading-relaxed">{locale === 'en' ? 'You have completed all class materials with perfect progress. Your official certificate has been issued.' : 'Anda telah menyelesaikan seluruh materi pelajaran kelas ini dengan progres sempurna. Sertifikat resmi Anda telah diterbitkan.'}</p>
                            </div>
                        </div>
                        <Link
                            href={`/dashboard/academy/${course.slug}/certificate`}
                            className="shrink-0 w-full md:w-auto flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-500/20"
                        >
                            <Award className="w-4 h-4" /> {locale === 'en' ? 'View & Download Certificate' : 'Lihat & Unduh Sertifikat'}
                        </Link>
                    </div>
                )}

                {/* Main Classroom Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Column: Video Player & Content */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Video Viewer */}
                        <div className="relative aspect-video w-full bg-neutral-900 border border-glass-border rounded-3xl overflow-hidden shadow-2xl">
                            {activeLesson?.video_url ? (
                                activeLesson.video_url.includes('youtube.com') || activeLesson.video_url.includes('youtu.be') ? (
                                    <iframe
                                        className="w-full h-full"
                                        src={getYouTubeEmbedUrl(activeLesson.video_url)}
                                        title={activeLesson.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        className="w-full h-full"
                                        src={activeLesson.video_url}
                                        controls
                                        preload="metadata"
                                    />
                                )
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-text-muted">
                                    <FileText className="w-12 h-12 text-brand-blue/30" />
                                    <span className="text-xs font-bold font-mono">{locale === 'en' ? 'Written Learning Module' : 'Modul Pembelajaran Tertulis'}</span>
                                </div>
                            )}
                        </div>

                        {/* Lesson Content Info */}
                        <SpotlightCard className="p-8 border border-glass-border">
                            <div className="space-y-6 text-left">
                                <div className="flex justify-between items-start border-b border-glass-border/30 pb-4 gap-4">
                                    <h2 className="text-lg md:text-xl font-bold text-text-main leading-snug">
                                        {activeLesson?.title || (locale === 'en' ? 'Loading Lesson...' : 'Memuat Pelajaran...')}
                                    </h2>
                                    
                                    {activeLesson && completedLessons.includes(activeLesson.id) && (
                                        <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> {locale === 'en' ? 'Completed' : 'Selesai'}
                                        </span>
                                    )}
                                </div>

                                {activeLesson?.content && (
                                    <div className="text-text-gray text-sm md:text-base leading-relaxed font-medium space-y-4 whitespace-pre-line">
                                        {activeLesson.content}
                                    </div>
                                )}

                                {/* Action bar */}
                                {activeLesson && (
                                    <div className="border-t border-glass-border/30 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                                        {successMessage && (
                                            <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                                                <Sparkles className="w-4 h-4 animate-bounce" /> {successMessage}
                                            </span>
                                        )}
                                        <div className="w-full sm:w-auto sm:ml-auto">
                                            <button
                                                onClick={handleMarkComplete}
                                                disabled={submitting || completedLessons.includes(activeLesson.id)}
                                                className="w-full sm:w-auto px-6 py-3.5 bg-brand-blue text-white hover:bg-brand-blue-dark disabled:bg-slate-700/40 disabled:text-text-muted disabled:cursor-not-allowed rounded-xl text-xs md:text-sm font-bold transition-all shadow-md shadow-brand-blue/15 flex items-center justify-center gap-1.5 cursor-pointer"
                                            >
                                                {submitting ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        <span>{locale === 'en' ? 'Saving progress...' : 'Menyimpan progres...'}</span>
                                                    </>
                                                ) : completedLessons.includes(activeLesson.id) ? (
                                                    <>
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                                        <span>{locale === 'en' ? 'Material Completed' : 'Materi Telah Selesai'}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>{locale === 'en' ? 'Mark as Completed & Continue' : 'Tandai Selesai & Lanjut'}</span>
                                                        <ChevronRight className="w-4 h-4" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </SpotlightCard>

                    </div>

                    {/* Right Column: Syllabus Navigation */}
                    <div className="lg:col-span-1 space-y-4">
                        <SpotlightCard className="p-6 border border-glass-border text-left">
                            <h3 className="text-sm font-black text-text-main uppercase tracking-wider mb-4 border-b border-glass-border/30 pb-2">
                                {locale === 'en' ? 'Class Materials' : 'Materi Kelas'}
                            </h3>

                            <div className="space-y-5">
                                {course.modules.map((mod, midx) => (
                                    <div key={mod.id} className="space-y-2">
                                        <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block">
                                            {locale === 'en' ? 'Module' : 'Modul'} {midx + 1}: {mod.title}
                                        </span>

                                        <div className="flex flex-col space-y-1.5 pl-1.5 border-l border-glass-border/40">
                                            {mod.lessons.map((les) => {
                                                const isActive = activeLesson?.id === les.id;
                                                const isCompleted = completedLessons.includes(les.id);

                                                return (
                                                    <button
                                                        key={les.id}
                                                        onClick={() => setActiveLesson(les)}
                                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                                                            isActive
                                                                ? 'bg-brand-blue/10 border border-brand-blue/20 text-brand-blue'
                                                                : 'text-text-gray hover:bg-glass-bg/60 hover:text-brand-blue'
                                                        }`}
                                                    >
                                                        <div className="flex items-center space-x-2.5 shrink-0 max-w-[80%]">
                                                            {les.content_type === 'video' ? (
                                                                <PlayCircle className="w-4 h-4 shrink-0" />
                                                            ) : (
                                                                <FileText className="w-4 h-4 shrink-0" />
                                                            )}
                                                            <span className="line-clamp-1">{les.title}</span>
                                                        </div>

                                                        {isCompleted ? (
                                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                        ) : (
                                                            <span className="text-[10px] text-text-muted font-mono font-medium shrink-0">
                                                                {les.duration_minutes}m
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SpotlightCard>
                    </div>

                </div>
            </div>
        </div>
    );
}
