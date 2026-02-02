import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Youtube, Instagram, Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';

export const DashboardFooter = () => {
    return (
        <footer className="bg-white border-t border-gray-100/50 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                    {/* Brand & Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <Link href="/" className="flex items-center gap-3 group mb-6">
                                <div className="w-12 h-12 relative transition-transform group-hover:scale-110 duration-500">
                                    <Image
                                        src="/logo.svg"
                                        alt="Craftor Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="font-black text-2xl tracking-tighter transition-colors">
                                    <span className="text-gray-950 group-hover:text-purple-700 transition-colors">Resume</span>
                                    <span className="text-purple-600 group-hover:text-purple-500 transition-colors">Craftor</span>
                                </span>
                            </Link>
                            <p className="text-gray-500 text-base leading-relaxed max-w-sm">
                                Empowering professionals to create world-class documents.
                                The ultimate design tool for documents, resumes, and portfolios.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, href: 'https://www.facebook.com/people/ResumeCraftor/61586853676415/' },
                                { Icon: Instagram, href: 'https://www.instagram.com/resumecraftor26' },
                                { Icon: Youtube, href: 'https://www.youtube.com/@ResumeCraftor' }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50 transition-all duration-300"
                                >
                                    <social.Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h4 className="text-gray-950 font-bold text-sm uppercase tracking-widest">Platform</h4>
                            <ul className="space-y-4">
                                {['Editor', 'Templates', 'Features', 'Pricing'].map((item) => (
                                    <li key={item}>
                                        <Link href={`/${item.toLowerCase()}`} className="text-gray-500 hover:text-purple-600 text-sm font-medium transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-gray-950 font-bold text-sm uppercase tracking-widest">Company</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: 'About', href: '/about' },
                                    { name: 'Blog', href: '/blog' },
                                    { name: 'Careers', href: '/careers' },
                                    { name: 'Privacy', href: '/privacy-policy' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-gray-500 hover:text-purple-600 text-sm font-medium transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <h4 className="text-gray-950 font-bold text-sm uppercase tracking-widest">Stay Updated</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Join over 5,000+ creators receiving our weekly design tips and template updates.
                        </p>
                        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 transition-colors group-focus-within:text-purple-500">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                            />
                            <button className="absolute right-2 top-2 bottom-2 px-4 bg-gray-950 text-white rounded-xl hover:bg-purple-600 transition-colors flex items-center justify-center">
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 text-xs font-medium text-gray-400">
                        <span>© 2026 ResumeCraftor. All rights reserved.</span>
                        <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-gray-600 transition-colors">Cookies</Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Systems Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
