"use client"

import React from 'react';
import { Link } from "@/i18n/navigation";
import Image from 'next/image';
import { Facebook, Youtube, Instagram, Twitter, Linkedin, Github, Mail, ArrowRight, AtSign as Threads } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const DashboardFooter = () => {
    const t = useTranslations('DashboardFooter');
    return (
        <footer className="bg-white border-t border-gray-100/50 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                    {/* Brand & Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <Link href="/" className="flex items-center gap-3 group mb-6">
                                <div className="w-12 h-12 relative transition-transform group-hover:scale-110 duration-500">
                                    <Image
                                        src="/logo.svg"
                                        alt={t('logoAlt')}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="font-black text-2xl tracking-tighter transition-colors">
                                    <span className="text-gray-950 group-hover:text-purple-700 transition-colors">Resume</span>
                                    <span className="text-purple-600 group-hover:text-purple-500 transition-colors">Craftor</span>
                                </span>
                            </Link>
                            <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-medium">
                                {t('disclaimer')}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, href: 'https://www.facebook.com/people/ResumeCraftor/61586853676415/', label: 'Facebook' },
                                { Icon: Instagram, href: 'https://www.instagram.com/resumecraftor26', label: 'Instagram' },
                                { Icon: Threads, href: 'https://www.threads.net/@resumecraftor26', label: 'Threads' },
                                { Icon: Youtube, href: 'https://www.youtube.com/@ResumeCraftor', label: 'YouTube' }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    aria-label={t('socialAriaLabel', { platform: social.label })}
                                    target="_blank"
                                    rel="noopener noreferrer"
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
                            <h4 className="text-gray-950 font-bold text-sm uppercase tracking-widest">{t('platformHeading')}</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: t('linkHome'), href: '/' },
                                    { name: t('linkHowItWorks'), href: '/how-it-works', emphasized: true },
                                    { name: t('linkTemplates'), href: '/templates' },
                                    { name: t('linkSettings'), href: '/settings' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`
                                                ${item.emphasized
                                                    ? 'text-purple-600 font-black'
                                                    : 'text-gray-500 font-medium'} 
                                                hover:text-purple-600 text-sm transition-colors
                                            `}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-gray-950 font-bold text-sm uppercase tracking-widest">{t('companyHeading')}</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: t('linkAboutUs'), href: '/about' },
                                    { name: t('linkBlog'), href: '/blog' },
                                    { name: t('linkContact'), href: '/contact' },
                                    { name: t('linkPrivacyPolicy'), href: '/privacy-policy' },
                                    { name: t('linkTermsOfService'), href: '/terms-of-service' }
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
                        <h4 className="text-gray-950 font-bold text-sm uppercase tracking-widest">{t('newsletterHeading')}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {t('newsletterDescription')}
                        </p>
                        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 transition-colors group-focus-within:text-purple-500">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                placeholder={t('emailPlaceholder')}
                                aria-label={t('emailAriaLabel')}
                                autoComplete="email"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                            />
                            <button type="submit" aria-label={t('subscribeAriaLabel')} className="absolute right-2 top-2 bottom-2 px-4 bg-gray-950 text-white rounded-xl hover:bg-purple-600 transition-colors flex items-center justify-center">
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 text-xs font-medium text-gray-400">
                        <span>{t('copyright')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">{t('systemsOperational')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
