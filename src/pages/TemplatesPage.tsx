"use client";

import React, { useState } from 'react';
import { Search, Filter, Layout, Sparkles, ArrowRight } from 'lucide-react';
import { CraftorNavbar } from '@/components/dashboard/CraftorNavbar';
import { DesignCard } from '@/components/dashboard/DesignCard';
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';
import { TEMPLATES } from '@/utils/templates';
import { useEditorStore } from '@/store/useEditorStore';
import { useRouter } from 'next/navigation';
import LiquidGlass from '@/components/ui/liquid-glass/LiquidGlass';

export default function TemplatesPage() {
    const router = useRouter();
    const loadTemplate = useEditorStore((state) => state.loadTemplate);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const handleSelectTemplate = (templateId: string) => {
        const template = TEMPLATES.find(t => t.id === templateId);
        if (template) {
            loadTemplate(template.elements as any);
            router.push('/editor');
        }
    };

    const categories = ['All', 'Professional', 'Creative', 'Minimal', 'Modern'];

    const filteredTemplates = TEMPLATES.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' ||
            (activeCategory === 'Professional' && (template.id.includes('corporate') || template.id.includes('structured'))) ||
            (activeCategory === 'Creative' && (template.id.includes('creative') || template.id.includes('color'))) ||
            (activeCategory === 'Minimal' && (template.id.includes('minimal'))) ||
            (activeCategory === 'Modern' && (template.id.includes('modern') || template.id.includes('editorial')));

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-purple-100 selection:text-purple-700">
            <CraftorNavbar />

            <main className="pt-24">
                {/* Hero Section */}
                <section className="px-0 py-4 md:px-6 md:py-8 lg:px-10 lg:py-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative rounded-none md:rounded-[3rem] overflow-hidden bg-gray-950 p-8 md:p-12 lg:p-20 text-white shadow-2xl shadow-gray-950/20">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-purple-600/20 to-transparent pointer-events-none" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

                            <div className="relative z-10 max-w-3xl text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs md:text-sm font-bold text-purple-200 mb-8">
                                    <Sparkles size={14} className="text-yellow-400" />
                                    Premium Library
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                                    Start with a
                                    <br className="sm:hidden" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300"> Masterpiece.</span>
                                </h1>
                                <p className="text-base md:text-xl text-gray-400 leading-relaxed font-medium mb-10 max-w-2xl mx-auto md:ml-0">
                                    Choose from our curated collection of industry-standard templates.
                                    Each one is meticulously crafted to pass ATS filters and visual standards.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Search templates..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-bold placeholder:text-gray-600"
                                        />
                                    </div>
                                    <button className="px-8 py-4 bg-white text-gray-950 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors">
                                        <Filter size={18} />
                                        Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories & Grid */}
                <section className="px-6 lg:px-10 pb-32">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 overflow-x-auto pb-8 no-scrollbar -mx-6 px-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeCategory === cat
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {filteredTemplates.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 pt-8">
                                {filteredTemplates.map((template) => (
                                    <DesignCard
                                        key={template.id}
                                        title={template.name}
                                        date="Modern Template"
                                        templateElements={template.elements}
                                        onClick={() => handleSelectTemplate(template.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-32 text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-[2rem] text-gray-300 mb-6">
                                    <Layout size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">No templates found</h3>
                                <p className="text-gray-400 font-medium">Try adjusting your search or filters to find what you&apos;re looking for.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Custom CTA */}
                <section className="py-24 px-6 lg:px-10 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto">
                        <LiquidGlass
                            displacementScale={8}
                            blurAmount={20}
                            saturation={110}
                            cornerRadius={48}
                            padding={typeof window !== 'undefined' && window.innerWidth < 768 ? "40px 24px" : "80px"}
                            className="bg-white border border-gray-100 shadow-xl"
                        >
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div className="text-center md:text-left">
                                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-6">Can&apos;t find the perfect fit?</h2>
                                    <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10">
                                        Our design team is constantly adding new templates. If you have a specific style in mind,
                                        you can start from scratch or reach out to us for a custom layout.
                                    </p>
                                    <button
                                        onClick={() => { loadTemplate([]); router.push('/editor'); }}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-950 text-white rounded-2xl font-bold hover:bg-purple-600 transition-all group"
                                    >
                                        Start with Blank Canvas <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="aspect-square bg-gray-50 rounded-2xl md:rounded-3xl border border-gray-100 p-4 md:p-6 flex flex-col justify-end">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 mb-auto" />
                                            <div className="h-2 w-full bg-gray-200 rounded mb-2" />
                                            <div className="h-2 w-2/3 bg-gray-100 rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </LiquidGlass>
                    </div>
                </section>
            </main>

            <DashboardFooter />
        </div>
    );
}
