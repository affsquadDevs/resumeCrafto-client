
import React from 'react';
import Link from 'next/link';
import { Plus, FileText } from 'lucide-react';

export const DashboardHero = () => {
    return (
        <section className="px-10 py-10">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white border border-gray-100 p-16 shadow-2xl shadow-purple-100/20">
                <div className="max-w-2xl relative z-10">
                    <h2 className="text-5xl font-black mb-6 tracking-tight text-gray-900 leading-tight">Create your next<br /><span className="text-purple-600">Perfect Document.</span></h2>
                    <p className="text-xl text-gray-500 font-medium mb-10 max-w-lg">
                        The most powerful PDF and Resume editor in your browser. Clean, fast, and professional.
                    </p>

                    <Link
                        href="/editor"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-lg font-bold shadow-xl shadow-purple-200 transition-all hover:scale-105 active:scale-95"
                    >
                        <Plus size={24} strokeWidth={3} />
                        Create New Design
                    </Link>
                </div>

                {/* Soft decorative elements */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-50 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/2 right-20 -translate-y-1/2 opacity-20 hidden lg:block">
                    <FileText size={240} className="text-purple-600 rotate-12" />
                </div>
            </div>
        </section>
    );
};
