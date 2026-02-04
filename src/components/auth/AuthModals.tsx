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
                onClose();
                window.location.reload(); // Hard reload is sometimes safer to ensure all context providers update
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
                                        padding="32px"
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

                                            <div className="text-center mb-8">
                                                <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-200">
                                                    <Sparkles className="text-white" size={24} />
                                                </div>
                                                <Dialog.Title className="text-2xl font-black text-gray-900 tracking-tight">
                                                    {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                                                </Dialog.Title>
                                                <p className="text-gray-500 text-sm mt-2 font-medium">
                                                    {mode === 'login'
                                                        ? 'Sign in to access your saved resumes'
                                                        : 'Join thousands of professionals today'}
                                                </p>
                                            </div>

                                            {error && (
                                                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                                                    {error}
                                                </div>
                                            )}

                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                {mode === 'register' && (
                                                    <div className="group">
                                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Full Name</label>
                                                        <div className="relative">
                                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                                                                <User size={18} />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                className="w-full bg-white/50 border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-medium text-gray-900"
                                                                placeholder="John Doe"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="group">
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Email Address</label>
                                                    <div className="relative">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                                                            <Mail size={18} />
                                                        </div>
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="w-full bg-white/50 border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-medium text-gray-900"
                                                            placeholder="name@example.com"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="group">
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Password</label>
                                                    <div className="relative">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                                                            <Lock size={18} />
                                                        </div>
                                                        <input
                                                            type="password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            className="w-full bg-white/50 border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-medium text-gray-900"
                                                            placeholder="••••••••"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-black uppercase tracking-widest text-xs py-4 rounded-2xl transition-all shadow-xl shadow-purple-100 flex items-center justify-center gap-2 group active:scale-95"
                                                >
                                                    {loading ? (
                                                        <Loader2 className="animate-spin" size={20} />
                                                    ) : (
                                                        <>
                                                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                                                            <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                                                        </>
                                                    )}
                                                </button>
                                            </form>

                                            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                                <p className="text-gray-500 text-sm font-medium">
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
