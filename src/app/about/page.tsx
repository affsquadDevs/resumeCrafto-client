'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Users, Zap, ShieldCheck, Heart, ArrowRight, Star, Quote } from 'lucide-react';
import { CraftorNavbar } from '@/components/dashboard/CraftorNavbar';
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';
import LiquidGlass from '@/components/ui/liquid-glass/LiquidGlass';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-purple-100 selection:text-purple-700">
            <CraftorNavbar />

            <main className="pt-24 md:pt-32">
                {/* Hero Section */}
                <section className="px-0 py-4 md:px-6 md:py-8 lg:px-10 lg:py-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative rounded-none md:rounded-[3rem] overflow-hidden bg-gray-950 p-8 md:p-12 lg:p-24 text-white">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-purple-600/20 to-transparent pointer-events-none" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

                            <div className="relative z-10 max-w-4xl text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs md:text-sm font-bold text-purple-200 mb-8">
                                    <Sparkles size={14} className="text-yellow-400" />
                                    The Craftor Journey
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                                    Where design meets
                                    <br className="sm:hidden" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300"> absolute precision.</span>
                                </h1>
                                <p className="text-base md:text-xl text-gray-400 leading-relaxed font-medium mb-10 max-w-2xl mx-auto md:ml-0">
                                    Craftor started in 2024 with a mission to simplify professional design. We believe that everyone deserves tools that are both powerful and intuitive, enabling you to tell your story with confidence.
                                </p>
                                <div className="flex justify-center md:justify-start gap-4 border-t border-white/10 pt-8 mt-4">
                                    <div className="flex flex-col">
                                        <span className="text-xl md:text-2xl font-black text-white tracking-tighter">2M+</span>
                                        <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Users</span>
                                    </div>
                                    <div className="w-px h-10 bg-white/10 mx-4" />
                                    <div className="flex flex-col">
                                        <span className="text-xl md:text-2xl font-black text-white tracking-tighter">180+</span>
                                        <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Countries</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 md:py-24 px-6 lg:px-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Zap,
                                    title: "Hyper-Speed",
                                    desc: "Our engine is built for real-time creativity. Zero lag, instant feedback, and seamless interaction at every step.",
                                    color: "bg-orange-50 text-orange-600"
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Pixel-Perfect",
                                    desc: "Industry-standard formatting ensures your documents look flawless on every screen and in every print.",
                                    color: "bg-blue-50 text-blue-600"
                                },
                                {
                                    icon: Heart,
                                    title: "Privacy First",
                                    desc: "Your data stays yours. We use enterprise-grade encryption to keep your personal information secure and private.",
                                    color: "bg-pink-50 text-pink-600"
                                }
                            ].map((value, i) => (
                                <div key={i} className="group p-8 md:p-10 rounded-3xl md:rounded-[3rem] bg-gray-50 border border-transparent hover:border-gray-100 hover:bg-white transition-all duration-500">
                                    <div className={`w-14 h-14 md:w-16 md:h-16 ${value.color} rounded-2xl flex items-center justify-center mb-8`}>
                                        <value.icon size={28} />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4 tracking-tight">{value.title}</h3>
                                    <p className="text-gray-500 leading-relaxed font-medium text-sm md:text-base">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 md:py-24 px-6 lg:px-10 bg-gray-50/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 md:mb-20 gap-8 text-center md:text-left">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4 md:mb-6">The human side of code</h2>
                                <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
                                    We are a distributed team of engineers and designers across the globe, united by a passion for professional excellence.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
                            {[
                                { name: "Alex Rivera", role: "Founder & CEO", color: "bg-purple-200" },
                                { name: "Sarah Chen", role: "Head of Product", color: "bg-blue-200" },
                                { name: "Marcus Thorne", role: "CTO", color: "bg-pink-200" },
                                { name: "Elena Vogt", role: "Lead Designer", color: "bg-orange-200" }
                            ].map((member, i) => (
                                <div key={i} className="space-y-4 text-center">
                                    <div className={`aspect-square ${member.color} rounded-2xl md:rounded-[3rem] relative overflow-hidden`} />
                                    <div>
                                        <h4 className="text-sm md:text-xl font-black text-gray-900 leading-tight">{member.name}</h4>
                                        <p className="text-[10px] md:text-xs font-black text-purple-600 uppercase tracking-widest mt-1">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonial Section */}
                <section className="py-16 md:py-32 px-6 lg:px-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="p-8 md:p-12 lg:p-20 rounded-3xl md:rounded-[4rem] bg-gray-950 text-white relative overflow-hidden group text-center md:text-left">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[100px] pointer-events-none" />
                            <Quote className="text-white/10 mb-8 w-12 h-12 md:w-16 md:h-16 mx-auto md:mx-0" />
                            <p className="text-lg md:text-2xl lg:text-3xl font-medium leading-relaxed mb-10 italic">
                                &quot;Craftor changed how I present my work. I can focus on my expertise while the tool ensures my documents look like they were designed by a pro.&quot;
                            </p>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-white/10" />
                                <div>
                                    <div className="text-base md:text-lg font-black tracking-tight">James Wilson</div>
                                    <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Principal Engineer at Google</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-24 md:py-32 px-6 lg:px-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-12 tracking-tightest leading-[1.05]">
                            The future of work is beautiful.
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href="/editor"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-12 py-6 bg-gray-950 text-white rounded-[2rem] font-bold text-xl hover:bg-purple-600 transition-all duration-300 group shadow-2xl shadow-gray-950/20"
                            >
                                Start Designing Free
                                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link
                                href="/templates"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-12 py-6 bg-white border-2 border-gray-100 text-gray-900 rounded-[2rem] font-bold text-xl hover:border-purple-600 hover:text-purple-600 transition-all duration-300"
                            >
                                View Templates
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <DashboardFooter />
        </div>
    );
}
