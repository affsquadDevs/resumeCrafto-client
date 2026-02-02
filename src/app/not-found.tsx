'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Search, FileX } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 relative">
            {/* Subtle Gradient Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_70%)] pointer-events-none" />

            <div className="w-full max-w-xl text-center space-y-12 relative z-10">
                {/* Minimalist Visual */}
                <div className="relative inline-flex items-center justify-center">
                    <div className="absolute inset-0 bg-purple-100 rounded-full blur-3xl opacity-50 scale-150 animate-pulse" />
                    <div className="relative w-32 h-32 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center border border-gray-50">
                        <FileX size={48} className="text-purple-600" strokeWidth={1.5} />
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gray-950 rounded-xl flex items-center justify-center shadow-lg border border-white/10">
                            <Search size={16} className="text-white" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-gray-900 text-6xl md:text-7xl font-black tracking-tight leading-tight">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                        Page not found
                    </h2>
                    <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
                        The page you are looking for doesn&apos;t exist or has been moved.
                        Let&apos;s get you back to creating.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-gray-950 text-white rounded-2xl font-bold hover:bg-purple-600 transition-all duration-300 shadow-xl shadow-gray-950/10 active:scale-[0.98]"
                    >
                        <Home size={20} />
                        Go to Dashboard
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </div>

                <div className="pt-20">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <span className="text-gray-300 font-black text-xs uppercase tracking-[0.3em] group-hover:text-purple-600 transition-colors">
                            ResumeCraftor
                        </span>
                    </Link>
                </div>
            </div>

            {/* Bottom Decoration */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-30 pointer-events-none">
                <svg width="100%" height="40" viewBox="0 0 1200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 20C200 20 400 0 600 0C800 0 1000 20 1200 20" stroke="#E5E7EB" strokeWidth="1" />
                </svg>
            </div>
        </div>
    );
}
