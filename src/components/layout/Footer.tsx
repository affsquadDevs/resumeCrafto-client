'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement newsletter subscription
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    return (
        <footer className="bg-white border-t border-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 relative">
                                <Image
                                    src="/logo.svg"
                                    alt="ResumeCraftor Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-black text-xl tracking-tight">
                                <span className="text-gray-900 group-hover:text-purple-700 transition-colors">Resume</span>
                                <span className="text-purple-600 group-hover:text-purple-500 transition-colors">Craftor</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                            Empowering professionals to create world-class documents. The ultimate design tool for documents, resumes, and portfolios.
                        </p>
                        <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Contact us:</p>
                            <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">hello@resumecraftor.com</Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Platform Column */}
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-6">Platform</h3>
                        <ul className="space-y-3">
                            <li><Link href="/resume-builder" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">Resume Builder</Link></li>
                            <li><Link href="/templates" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">Templates</Link></li>
                            <li><Link href="/how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">How It Works</Link></li>
                            <li><Link href="/pricing" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-6">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">About</Link></li>
                            <li><Link href="/blog" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">Blog</Link></li>
                            <li><Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">Careers</Link></li>
                            <li><Link href="/privacy-policy" className="text-purple-600 hover:text-purple-700 transition-colors text-sm font-semibold">Privacy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-6">Stay Updated</h3>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            Join over 5,000+ creators receiving our weekly design tips and template updates.
                        </p>
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 pr-12 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-1 top-1 bottom-1 w-10 h-10 bg-gray-900 hover:bg-purple-600 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
};
