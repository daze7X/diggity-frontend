import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center space-y-4 px-4">
            <div className="relative flex items-center justify-center">
                {/* Outer pulsing ring */}
                <div className="absolute w-16 h-16 rounded-full border border-brand-blue/20 animate-ping opacity-75" />
                
                {/* Rotating spinner */}
                <Loader2 className="w-10 h-10 text-brand-blue animate-spin relative z-10" />
            </div>
            
            <div className="text-center space-y-1">
                <p className="text-sm font-bold text-slate-800 dark:text-white tracking-wide">
                    Menghubungkan Layanan...
                </p>
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest animate-pulse">
                    Build. Grow. Scale.
                </p>
            </div>
        </div>
    );
}
