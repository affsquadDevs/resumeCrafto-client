
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Layout, FileText, Settings } from 'lucide-react';

export const DashboardSidebar = () => {
    return (
        <aside className="w-64 border-r border-gray-100 flex flex-col h-full bg-white shrink-0">
            <div className="p-8 pb-4 flex items-center gap-3">
                <div className="w-10 h-10 relative shrink-0">
                    <Image
                        src="/logo.svg"
                        alt="Craftor Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <span className="font-black text-2xl tracking-tighter text-gray-900 uppercase">Craftor</span>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 text-purple-600 bg-purple-50/50 rounded-xl font-bold transition-all">
                    <Home size={22} />
                    <span>Dashboard</span>
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50/80 rounded-xl font-semibold transition-all text-left">
                    <Layout size={22} />
                    <span>My Projects</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50/80 rounded-xl font-semibold transition-all text-left">
                    <FileText size={22} />
                    <span>Templates</span>
                </button>
            </nav>

            <div className="p-6 border-t border-gray-50">
                <Link href="/settings" className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-gray-900 transition-colors">
                    <Settings size={20} />
                    <span className="font-medium">Settings</span>
                </Link>
            </div>
        </aside>
    );
};
