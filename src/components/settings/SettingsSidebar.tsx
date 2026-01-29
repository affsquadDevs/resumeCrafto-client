
import React from 'react';
import Link from 'next/link';
import { User, LogIn, ChevronLeft } from 'lucide-react';

interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

interface SettingsSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const SettingsSidebar = ({ activeTab, setActiveTab }: SettingsSidebarProps) => {
    const sidebarItems: SidebarItem[] = [
        { id: 'profile', label: 'Your Profile', icon: <User size={20} /> },
        { id: 'login', label: 'Login', icon: <LogIn size={20} /> },
    ];

    return (
        <aside className="w-72 border-r border-gray-100 flex flex-col h-full bg-white shrink-0">
            <div className="p-8 pb-4 flex items-center gap-3">
                <Link href="/" className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-gray-900">
                    <ChevronLeft size={24} strokeWidth={2.5} />
                </Link>
                <span className="font-extrabold text-2xl tracking-tight text-gray-900">Settings</span>
            </div>

            <nav className="flex-1 px-4 py-8 overflow-y-auto space-y-1">
                {sidebarItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${activeTab === item.id
                                ? 'text-purple-600 bg-purple-50/50 shadow-sm'
                                : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'
                            }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};
