'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, CircleUser, Menu, X, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import LiquidGlass from '@/components/ui/liquid-glass/LiquidGlass';

interface CraftorNavbarProps {
    mode?: 'default' | 'compact';
    title?: string;
    backUrl?: string;
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
}

export const CraftorNavbar = ({ mode = 'default', title, backUrl = '/', activeTab, setActiveTab }: CraftorNavbarProps) => {
    const isCompact = mode === 'compact';
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-4 transition-all duration-300">
            <LiquidGlass
                displacementScale={0}
                blurAmount={12}
                saturation={110}
                elasticity={0}
                cornerRadius={100}
                padding={isCompact ? "8px 12px" : "12px 16px"}
                centered={false}
                compact
                overLight={true}
                className={`w-full shadow-lg rounded-full transition-all duration-300 ${isCompact ? 'max-w-4xl' : 'max-w-7xl'}`}
                style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <div className={`flex items-center justify-between w-full px-6 gap-10 transition-all duration-300 h-16`}>
                    {isCompact ? (
                        <>
                            {/* Compact Mode: Back Button + Logo + Site Name + Title */}
                            <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                                <Link
                                    href={backUrl}
                                    className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-900 transition-colors shrink-0"
                                >
                                    <ChevronLeft size={24} />
                                </Link>
                                <div className="w-6 h-6 md:w-8 md:h-8 relative shrink-0">
                                    <Image
                                        src="/logo.svg"
                                        alt="Craftor Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-gray-900 font-black text-sm md:text-lg tracking-tighter shrink-0">CRAFTOR</span>
                                <span className="text-gray-300 font-black text-sm md:text-lg shrink-0">/</span>
                                <h1 className="text-sm md:text-lg font-black text-gray-900 tracking-tight truncate">{title || 'Settings'}</h1>
                            </div>

                            {/* Profile & Login Buttons (Desktop Only) */}
                            <div className="hidden sm:flex items-center gap-1 md:gap-2 shrink-0">
                                <button
                                    onClick={() => setActiveTab?.('profile')}
                                    className={`flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'profile'
                                        ? 'text-purple-600 bg-purple-50/50 shadow-sm'
                                        : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="hidden sm:inline">Your Profile</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab?.('login')}
                                    className={`flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'login'
                                        ? 'text-purple-600 bg-purple-50/50 shadow-sm'
                                        : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="hidden sm:inline">Login</span>
                                </button>
                            </div>

                            {/* Mobile Menu Toggle Button (Compact Mode) */}
                            <button
                                onClick={toggleMenu}
                                className="sm:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 transition-colors"
                            >
                                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Default Mode: Logo Section */}
                            <Link href="/" className="flex items-center gap-4 group shrink-0">
                                <div className="w-12 h-12 relative">
                                    <Image
                                        src="/logo.svg"
                                        alt="Craftor Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-gray-900 font-black text-2xl tracking-tighter group-hover:text-purple-600 transition-colors">
                                    CRAFTOR
                                </span>
                            </Link>

                            {/* Navigation Links */}
                            <nav className="hidden md:flex items-center gap-3">
                                <Link
                                    href="/"
                                    className={`text-xs font-black uppercase tracking-[0.2em] transition-all px-4 py-2 rounded-xl ${pathname === '/'
                                        ? 'text-purple-600 bg-purple-50/50 shadow-sm'
                                        : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'
                                        }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/about"
                                    className={`text-xs font-black uppercase tracking-[0.2em] transition-all px-4 py-2 rounded-xl ${pathname === '/about'
                                        ? 'text-purple-600 bg-purple-50/50 shadow-sm'
                                        : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'
                                        }`}
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/templates"
                                    className={`text-xs font-black uppercase tracking-[0.2em] transition-all px-4 py-2 rounded-xl ${pathname === '/templates'
                                        ? 'text-purple-600 bg-purple-50/50 shadow-sm'
                                        : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'
                                        }`}
                                >
                                    Templates
                                </Link>
                                <Link
                                    href="/settings"
                                    className={`text-xs font-black uppercase tracking-[0.2em] transition-all px-4 py-2 rounded-xl ${pathname === '/settings'
                                        ? 'text-purple-600 bg-purple-50/50 shadow-sm'
                                        : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'
                                        }`}
                                >
                                    Settings
                                </Link>
                            </nav>

                            {/* Action Button (Desktop Only) */}
                            <div className="hidden lg:block shrink-0">
                                <Link
                                    href="/editor"
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-purple-200"
                                >
                                    Get Started
                                </Link>
                            </div>

                            {/* Account Button (Desktop Only) */}
                            <div className="hidden lg:block shrink-0 pl-2 border-l border-gray-200 ml-2">
                                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-50 text-gray-600 hover:text-purple-600 flex items-center justify-center transition-colors">
                                    <CircleUser size={20} />
                                </button>
                            </div>

                            {/* Mobile Menu Toggle Button */}
                            <button
                                onClick={toggleMenu}
                                className="lg:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 transition-colors"
                            >
                                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </>
                    )}
                </div>
            </LiquidGlass>

            {/* Mobile Menu Overlay - Outside LiquidGlass to prevent clipping by contain:paint */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-[calc(100%+12px)] left-4 right-4 animate-in fade-in zoom-in-95 duration-200">
                    <LiquidGlass
                        displacementScale={0}
                        blurAmount={16}
                        saturation={110}
                        elasticity={0}
                        cornerRadius={24}
                        padding="12px"
                        centered={false}
                        compact
                        overLight={true}
                        className="w-full shadow-2xl rounded-3xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        <nav className="flex flex-col gap-1">
                            {[
                                { name: 'Dashboard', href: '/' },
                                { name: 'About Us', href: '/about' },
                                { name: 'Templates', href: '/templates' },
                                { name: 'Settings', href: '/settings' },
                                { name: 'Start Designing', href: '/editor', highlight: true }
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center justify-between px-6 py-4 rounded-xl font-bold transition-all ${link.highlight
                                        ? 'bg-purple-600 text-white'
                                        : pathname === link.href
                                            ? 'text-purple-600 bg-purple-50'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <span>{link.name}</span>
                                    {link.highlight && <Sparkles size={16} />}
                                </Link>
                            ))}
                        </nav>
                    </LiquidGlass>
                </div>
            )}
        </div>
    );
};
