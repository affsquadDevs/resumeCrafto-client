'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CraftorNavbar } from '@/components/dashboard/CraftorNavbar';
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <CraftorNavbar />

            <main className="pt-24 md:pt-32">
                {/* Hero */}
                <section className="px-1 md:px-6 lg:px-10 pb-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gray-950 text-white rounded-3xl px-8 py-16 md:px-16 md:py-24">
                            <h1 className="block md:hidden text-3xl font-black tracking-tight leading-snug mb-6">
                                Design tools for
                                <span className="block text-lg sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    professionals
                                </span>
                            </h1>

                            <h1 className="hidden md:block text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-10">
                                Design tools built for
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    real professionals
                                </span>
                            </h1>

                            <p className="block md:hidden text-gray-400 text-lg leading-relaxed font-medium">
                                ResumeCraftor was founded in 2024 to simplify professional design.
                            </p>

                            <p className="hidden md:block max-w-3xl text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
                                ResumeCraftor was founded in 2024 to remove complexity from professional
                                design. We build tools that help people create clean, accurate,
                                and modern documents without wasting time on formatting.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Story */}
                <section className="px-6 lg:px-10 pb-24">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                            Our story
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            ResumeCraftor started as a small internal project focused on making professional documents easy to create and reliable. It has since grown into a resume-building platform.                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            From resumes and cover letters to layouts and export options, each feature is designed to support clear and consistent document creation.                        </p>
                    </div>
                </section>

                {/* Principles */}
                <section className="px-6 lg:px-10 pb-24">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                            What we stand for
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            We focus on speed, precision, and trust. The editor reacts instantly,
                            templates follow strict formatting rules, and user data is protected
                            by default. No unnecessary features, no distractions — only tools
                            that help you get results.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            ResumeCraftor is built for people who care about details and want their
                            work to speak for itself.
                        </p>
                    </div>
                </section>

                {/* Team */}
                <section className="px-6 lg:px-10 pb-32">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                            The team behind ResumeCraftor
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            We are a distributed team of engineers and designers working
                            across multiple time zones. This allows us to move fast,
                            stay close to our users, and continuously improve the product.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Our background spans product design, frontend engineering,
                            and infrastructure — all focused on building reliable
                            software for everyday professional use.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="px-6 lg:px-10 pb-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-10">
                            Build something you’re proud to share
                        </h2>
                        <Link
                            href="/resume-builder"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gray-950 text-white rounded-2xl font-bold text-lg hover:bg-purple-600 transition"
                        >
                            Start designing for free
                            <ArrowRight size={22} />
                        </Link>
                    </div>
                </section>
            </main>

            <DashboardFooter />
        </div>
    );
}
