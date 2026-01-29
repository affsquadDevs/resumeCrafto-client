
import React from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';

export const DashboardHeader = () => {
    return (
        <header className="h-20 px-10 flex items-center justify-end sticky top-0 bg-white/40 backdrop-blur-xl z-20 border-b border-gray-50/50">
            <div className="flex items-center gap-5 ml-6">
                <button className="p-2.5 text-gray-400 hover:bg-white hover:text-purple-600 rounded-xl transition-all shadow-sm hover:shadow-md border border-transparent hover:border-purple-100">
                    <Bell size={22} />
                </button>
                <Link href="/settings" className="w-10 h-10 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-sm font-bold text-purple-700 shadow-sm hover:scale-110 transition-transform">
                    AD
                </Link>
            </div>
        </header>
    );
};
