'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, CircleUser, Menu, X, Sparkles, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidGlass from '@/components/ui/liquid-glass/LiquidGlass';
import { useUserStore } from '@/store/useUserStore';

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
    const { data: session, status } = useSession();
    const { user, setUser } = useUserStore();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const { authModal, setAuthModal } = useUserStore();
    const profileRef = React.useRef<HTMLDivElement>(null);

    // Sync session user with Zustand store
    React.useEffect(() => {
        if (session?.user && !user) {
            setUser({
                id: (session.user as any).id,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
            });
        } else if (!session?.user && user) {
            setUser(null);
        }
    }, [session, user, setUser]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const openLogin = () => setAuthModal({ isOpen: true, mode: 'login' });
    const openRegister = () => setAuthModal({ isOpen: true, mode: 'register' });

    // Close profile dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Auth modal is handled globally by GlobalAuthModal

    return (
        <div className="fixed top-6 left-0 right-0 flex justify-center z-[100] px-4 transition-all duration-300">
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
                                {status === 'authenticated' ? (
                                    <>
                                        <button
                                            onClick={() => setActiveTab?.('profile')}
                                            className={`flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'profile'
                                                ? 'text-purple-600 bg-purple-50/50 shadow-sm'
                                                : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'
                                                }`}
                                        >
                                            <CircleUser size={20} />
                                            <span className="hidden sm:inline">Profile</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab?.('login')}
                                            className={`flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'login'
                                                ? 'text-purple-600 bg-purple-50/50 shadow-sm'
                                                : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'
                                                }`}
                                        >
                                            <ShieldCheck size={20} />
                                            <span className="hidden sm:inline">Login</span>
                                        </button>

                                        <div className="relative ml-2" ref={profileRef}>
                                            <button
                                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-bold ${isProfileOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'}`}
                                            >
                                                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center overflow-hidden">
                                                    {user?.image ? (
                                                        <Image src={user.image} alt={user.name || ''} width={32} height={32} />
                                                    ) : (
                                                        <CircleUser size={20} />
                                                    )}
                                                </div>
                                                <span className="text-sm max-w-[100px] truncate">{user?.name?.split(' ')[0] || 'Profile'}</span>
                                            </button>

                                            <AnimatePresence>
                                                {isProfileOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[60]"
                                                    >
                                                        <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                                            <p className="text-sm font-black text-gray-900 truncate">{user?.name}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 truncate">{user?.email}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                setIsProfileOpen(false);
                                                                router.push('/settings');
                                                            }}
                                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-purple-600 transition-all text-left"
                                                        >
                                                            <Settings size={18} />
                                                            <span>Profile Settings</span>
                                                        </button>
                                                        <button
                                                            onClick={() => signOut()}
                                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all text-left"
                                                        >
                                                            <LogOut size={18} />
                                                            <span>Logout</span>
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        onClick={openLogin}
                                        className="flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50/80 hover:text-gray-900 transition-all"
                                    >
                                        <CircleUser size={20} />
                                        <span className="hidden sm:inline">Login</span>
                                    </button>
                                )}
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
                                {[
                                    { name: 'Dashboard', href: '/' },
                                    { name: 'About Us', href: '/about' },
                                    { name: 'Templates', href: '/templates' },
                                    { name: 'Settings', href: '/settings' },
                                ].map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`text-xs font-black uppercase tracking-[0.2em] transition-all px-4 py-2 rounded-xl ${pathname === link.href
                                            ? 'text-purple-600 bg-purple-50/50 shadow-sm'
                                            : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>

                            {/* Action & Account Section (Desktop Only) */}
                            <div className="hidden lg:flex items-center gap-4 shrink-0">
                                {status === 'authenticated' ? (
                                    <>
                                        <Link
                                            href="/editor"
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-purple-200"
                                        >
                                            My Designs
                                        </Link>
                                        <div className="pl-2 border-l border-gray-200 relative" ref={profileRef}>
                                            <button
                                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-bold ${isProfileOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50/50'}`}
                                            >
                                                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center overflow-hidden">
                                                    {user?.image ? (
                                                        <Image src={user.image} alt={user.name || ''} width={32} height={32} />
                                                    ) : (
                                                        <CircleUser size={20} />
                                                    )}
                                                </div>
                                                <span className="text-sm">{user?.name?.split(' ')[0] || 'Profile'}</span>
                                            </button>

                                            <AnimatePresence>
                                                {isProfileOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[60]"
                                                    >
                                                        <div className="px-5 py-4 border-b border-gray-50 mb-1">
                                                            <p className="text-sm font-black text-gray-900 truncate">{user?.name}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 truncate">{user?.email}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                setIsProfileOpen(false);
                                                                router.push('/settings');
                                                            }}
                                                            className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-purple-600 transition-all text-left"
                                                        >
                                                            <Settings size={18} />
                                                            <span>Profile Settings</span>
                                                        </button>
                                                        <button
                                                            onClick={() => signOut()}
                                                            className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all text-left"
                                                        >
                                                            <LogOut size={18} />
                                                            <span>Logout</span>
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={openLogin}
                                            className="text-gray-500 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] px-4 py-2"
                                        >
                                            Sign In
                                        </button>
                                        <button
                                            onClick={openRegister}
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-purple-200"
                                        >
                                            Get Started
                                        </button>
                                    </>
                                )}
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

            {/* Mobile Menu Overlay */}
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
                                { name: status === 'authenticated' ? 'My Designs' : 'Start Designing', href: '/editor', highlight: true }
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
                            {status !== 'authenticated' && (
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        openLogin();
                                    }}
                                    className="flex items-center justify-between px-6 py-4 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-left"
                                >
                                    <span>Login / Register</span>
                                    <CircleUser size={16} />
                                </button>
                            )}
                            {status === 'authenticated' && (
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        signOut();
                                    }}
                                    className="flex items-center justify-between px-6 py-4 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-all text-left"
                                >
                                    <span>Logout</span>
                                    <X size={16} />
                                </button>
                            )}
                        </nav>
                    </LiquidGlass>
                </div>
            )}

        </div>
    );
};
