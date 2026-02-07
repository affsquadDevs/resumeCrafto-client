'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Loader2, Sparkles } from 'lucide-react';
import { signIn } from 'next-auth/react';
import LiquidGlass from '@/components/ui/liquid-glass/LiquidGlass';

interface AuthModalsProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'register';
}

export const AuthModals = ({ isOpen, onClose, initialMode = 'login' }: AuthModalsProps) => {
    const [mode, setMode] = useState<'login' | 'register'>(initialMode);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Sync mode when initialMode changes
    React.useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // Handle OAuth errors from URL
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        if (error === 'Callback') {
            setError('Account linking failed. If you previously signed up with email, please sign in with password first or use a different account.');
        } else if (error) {
            setError('Authentication failed. Please try again.');
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (mode === 'register') {
                const res = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, name }),
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.message || 'Registration failed');
                }

                // Auto login after registration
                const result = await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                });

                if (result?.error) throw new Error(result.error);

                // Refresh the router to update the session state
                const { useRouter } = await import('next/navigation');
                // GTM event - store in session storage to fire after reload
                sessionStorage.setItem('pending_sign_up', 'true');
                sessionStorage.setItem('user_email', email);

                onClose();
                setTimeout(() => window.location.reload(), 500);
            } else {
                const result = await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                });

                if (result?.error) throw new Error(result.error);

                onClose();
                window.location.reload();
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <AnimatePresence>
                {isOpen && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                            />
                        </Dialog.Overlay>

                        <Dialog.Content asChild>
                            <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                                    className="w-full max-w-md pointer-events-auto"
                                >
                                    <LiquidGlass
                                        displacementScale={0}
                                        blurAmount={20}
                                        saturation={140}
                                        elasticity={0}
                                        cornerRadius={32}
                                        padding="24px"
                                        centered={false}
                                        compact
                                        overLight={true}
                                        className="w-full shadow-2xl border border-white/20"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.85)',
                                        }}
                                    >
                                        <div className="relative">
                                            <Dialog.Close asChild>
                                                <button className="absolute -top-2 -right-2 p-2 rounded-full hover:bg-gray-100/50 text-gray-400 hover:text-gray-900 transition-colors">
                                                    <X size={20} />
                                                </button>
                                            </Dialog.Close>

                                            <div className="text-center mb-6">
                                                <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl shadow-purple-200">
                                                    <Sparkles className="text-white" size={20} />
                                                </div>
                                                <Dialog.Title className="text-xl font-black text-gray-900 tracking-tight">
                                                    {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                                                </Dialog.Title>
                                                <p className="text-gray-500 text-[13px] mt-1 font-medium">
                                                    {mode === 'login'
                                                        ? 'Sign in to access your saved resumes'
                                                        : 'Join thousands of professionals today'}
                                                </p>
                                            </div>

                                            {error && (
                                                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                                                    {error}
                                                </div>
                                            )}

                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                {mode === 'register' && (
                                                    <div className="group">
                                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 ml-1">Full Name</label>
                                                        <div className="relative">
                                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                                                                <User size={18} />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                className="w-full bg-white/50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-medium text-gray-900 text-sm"
                                                                placeholder="John Doe"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="group">
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 ml-1">Email Address</label>
                                                    <div className="relative">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                                                            <Mail size={18} />
                                                        </div>
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="w-full bg-white/50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-medium text-gray-900 text-sm"
                                                            placeholder="name@example.com"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="group">
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 ml-1">Password</label>
                                                    <div className="relative">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                                                            <Lock size={18} />
                                                        </div>
                                                        <input
                                                            type="password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            className="w-full bg-white/50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-medium text-gray-900 text-sm"
                                                            placeholder="••••••••"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-black uppercase tracking-widest text-[10px] py-3.5 rounded-2xl transition-all shadow-xl shadow-purple-100 flex items-center justify-center gap-2 group active:scale-95"
                                                >
                                                    {loading ? (
                                                        <Loader2 className="animate-spin" size={18} />
                                                    ) : (
                                                        <>
                                                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                                                            <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                                                        </>
                                                    )}
                                                </button>
                                            </form>

                                            <div className="mt-4 flex items-center gap-4">
                                                <div className="flex-1 h-px bg-gray-100" />
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">or</span>
                                                <div className="flex-1 h-px bg-gray-100" />
                                            </div>

                                            <button
                                                onClick={() =>
                                                    signIn('google', {
                                                        callbackUrl: '/',
                                                    })
                                                }
                                                className="mt-4 w-full bg-white border border-gray-100 hover:bg-gray-50 text-gray-900 font-bold text-xs py-3.5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                    <path
                                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                        fill="#4285F4"
                                                    />
                                                    <path
                                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                        fill="#34A853"
                                                    />
                                                    <path
                                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                        fill="#FBBC05"
                                                    />
                                                    <path
                                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                                                        fill="#EA4335"
                                                    />
                                                </svg>
                                                <span>Continue with Google</span>
                                            </button>

                                            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                                                <p className="text-gray-500 text-xs font-medium">
                                                    {mode === 'login'
                                                        ? "Don't have an account?"
                                                        : "Already have an account?"}
                                                    <button
                                                        onClick={() => {
                                                            setMode(mode === 'login' ? 'register' : 'login');
                                                            setError('');
                                                        }}
                                                        className="ml-2 text-purple-600 font-bold hover:underline"
                                                    >
                                                        {mode === 'login' ? 'Sign Up' : 'Sign In'}
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </LiquidGlass>
                                </motion.div>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
};
