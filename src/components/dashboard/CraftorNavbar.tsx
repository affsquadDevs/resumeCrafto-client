'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, CircleUser, Menu, X, Sparkles, Settings, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/useUserStore';
import dynamic from 'next/dynamic';

const LiquidGlass = dynamic(() => import('@/components/ui/liquid-glass/LiquidGlass'), {
    loading: () => <div className="w-full h-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-full" />,
    ssr: false
});

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
    const { user, setUser, authModal, setAuthModal } = useUserStore();
    const router = useRouter();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const [isMoreOpen, setIsMoreOpen] = React.useState(false);
    const profileRef = React.useRef<HTMLDivElement>(null);
    const moreRef = React.useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

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

    // Close dropdowns on click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
                setIsMoreOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Templates', href: '/templates' },
        { name: 'Blog', href: '/blog' },
    ];

    const extraLinks = [
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'Settings', href: '/settings' },
    ];

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
                className={`w-full shadow-lg rounded-full transition-all duration-300 max-w-7xl`}
                style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
                <div className="flex items-center justify-between w-full px-1 gap-4 md:gap-8 lg:gap-10 transition-all duration-300 h-16">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2 md:gap-4 group shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 relative">
                            <Image src="/logo.svg" alt="Craftor Logo" fill className="object-contain" />
                        </div>
                        <span className="font-black text-xl md:text-2xl tracking-tighter transition-colors">
                            <span className="text-gray-900 group-hover:text-purple-700 transition-colors">Resume</span>
                            <span className="text-purple-600 group-hover:text-purple-500 transition-colors">Craftor</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1 md:gap-3">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`
            text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] transition-all px-3 md:px-5 py-2 rounded-full
            ${pathname === link.href
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                                        : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50/30'}
            hover:shadow-md
        `}
                                style={{ transition: 'all 0.25s ease-in-out' }}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Dropdown "More" */}
                        <div
                            className="relative"
                            ref={moreRef}
                            onMouseEnter={() => {
                                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                                setIsMoreOpen(true);
                            }}
                            onMouseLeave={() => {
                                hoverTimeoutRef.current = setTimeout(() => setIsMoreOpen(false), 300);
                            }}
                        >
                            <button
                                onClick={() => setIsMoreOpen(!isMoreOpen)}
                                className={`
            text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] px-3 md:px-5 py-2 rounded-full
            text-gray-400 transition-all duration-200
            hover:text-purple-600 hover:bg-purple-50/30 hover:shadow-md
        `}
                            >
                                More
                            </button>

                            <AnimatePresence>
                                {isMoreOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 5, scale: 0.95, transition: { delay: 0.2 } }}
                                        transition={{ duration: 0.25 }}
                                        className="absolute top-full left-0 mt-2 w-44 z-50"
                                    >
                                        <LiquidGlass
                                            displacementScale={0}
                                            blurAmount={12}
                                            saturation={110}
                                            elasticity={0}
                                            cornerRadius={24}
                                            padding="8px"
                                            centered={false}
                                            compact
                                            overLight
                                            className="w-full shadow-lg rounded-2xl"
                                            style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
                                        >
                                            <nav className="flex flex-col gap-1">
                                                {extraLinks.map(link => (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        onClick={() => setIsMoreOpen(false)}
                                                        className={`
                                    block px-4 py-2 rounded-lg text-gray-600 font-bold text-sm
                                    transition-all duration-200
                                    hover:bg-purple-50 hover:text-purple-600 hover:shadow-sm
                                `}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                ))}
                                            </nav>
                                        </LiquidGlass>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </nav>

                    {/* Auth / Profile */}
                    <div className="hidden lg:flex items-center gap-2 md:gap-4 shrink-0">
                        {status === 'authenticated' ? (
                            <>
                                <Link href="/resume-builder" className="bg-purple-600 hover:bg-purple-700 text-white px-4 xl:px-8 py-3 rounded-full text-[10px] xl:text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-purple-200">
                                    Create New
                                </Link>

                                <div className="pl-2 border-l border-gray-200 relative" ref={profileRef}>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className={`flex items-center gap-2 px-2 md:px-3 py-2 rounded-xl transition-all font-bold ${isProfileOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50/50'}`}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center overflow-hidden">
                                            {user?.image ? <Image src={user.image} alt={user.name || ''} width={32} height={32} /> : <CircleUser size={20} />}
                                        </div>
                                        <span className="text-sm hidden xl:block">{user?.name?.split(' ')[0] || 'Profile'}</span>
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95, transition: { delay: 0.2 } }}
                                                className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[60]"
                                            >
                                                <div className="px-5 py-4 border-b border-gray-50 mb-1">
                                                    <p className="text-sm font-black text-gray-900 truncate">{user?.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 truncate">{user?.email}</p>
                                                </div>
                                                <button
                                                    onClick={() => { setIsProfileOpen(false); router.push('/settings'); }}
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
                                <button onClick={openLogin} className="text-gray-500 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] px-4 py-2">
                                    Sign In
                                </button>
                                <button onClick={openRegister} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-purple-200">
                                    Get Started
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 transition-colors"
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </LiquidGlass>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-[calc(100%+12px)] left-2 right-2 max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 z-[100] rounded-3xl no-scrollbar">
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
                        style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        <nav className="flex flex-col gap-1">
                            {[...navLinks, ...extraLinks, { name: status === 'authenticated' ? 'My Designs' : 'Start Designing', href: '/resume-builder' }].map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center justify-between px-6 py-4 rounded-xl font-bold transition-all ${pathname === link.href ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <span>{link.name}</span>
                                    {link.href === '/resume-builder' && <Sparkles size={16} />}
                                </Link>
                            ))}
                            {status !== 'authenticated' && (
                                <button onClick={() => { setIsMenuOpen(false); openLogin(); }} className="flex items-center justify-between px-6 py-4 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-left">
                                    <span>Login / Register</span>
                                    <CircleUser size={16} />
                                </button>
                            )}
                            {status === 'authenticated' && (
                                <button onClick={() => { setIsMenuOpen(false); signOut(); }} className="flex items-center justify-between px-6 py-4 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-all text-left">
                                    <span>Logout</span>
                                    <LogOut size={16} />
                                </button>
                            )}
                        </nav>
                    </LiquidGlass>
                </div>
            )}
        </div>
    );
};
