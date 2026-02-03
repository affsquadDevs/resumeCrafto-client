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
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, EyeOff, Eye, Loader2, Globe, User, Check, AlertCircle, AlertTriangle, X } from 'lucide-react';

export default function TemplatesPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const loadTemplate = useEditorStore((state) => state.loadTemplate);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('Standard');
    const [dbTemplates, setDbTemplates] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);

    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    React.useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const res = await fetch('/api/templates');
            if (res.ok) {
                const data = await res.json();
                setDbTemplates(data);
            }
        } catch (error) {
            console.error('Fetch templates error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectTemplate = (template: any) => {
        // template could be from static or DB
        const elements = template.elements || template.data;
        if (elements) {
            loadTemplate(elements);
            router.push('/resume-builder');
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setTemplateToDelete(id);
    };

    const confirmDelete = async () => {
        if (!templateToDelete) return;
        const id = templateToDelete;
        setTemplateToDelete(null);

        try {
            const res = await fetch(`/api/templates?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setDbTemplates(prev => prev.filter(t => t.id !== id));
                setMessage({ type: 'success', text: 'Template deleted' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to delete' });
        } finally {
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleToggleVisibility = async (id: string, currentStatus: boolean, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const res = await fetch('/api/templates', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isPublic: !currentStatus })
            });
            if (res.ok) {
                const updated = await res.json();
                setDbTemplates(prev => prev.map(t => t.id === id ? updated : t));
                setMessage({ type: 'success', text: !currentStatus ? 'Public' : 'Hidden' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update' });
        } finally {
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const categories = ['All', 'Standard', 'My Templates', 'Premium', 'Shared Examples'];

    // Combine static and DB templates
    // Combine and shuffle templates
    const shuffledTemplates = React.useMemo(() => {
        const all = [
            ...TEMPLATES.map(t => ({ ...t, isStatic: true, type: 'Standard' })),
            ...dbTemplates.map(t => ({ ...t, isStatic: false, type: 'Shared Example' }))
        ];
        return [...all].sort(() => Math.random() - 0.5);
    }, [dbTemplates]);

    const filteredTemplates = shuffledTemplates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());

        const isProfessional = template.isStatic
            ? (template.id.includes('corporate') || template.id.includes('structured'))
            : true;

        const matchesCategory = activeCategory === 'All' ||
            (activeCategory === 'My Templates' && template.userId === (session?.user as any)?.id) ||
            (activeCategory === 'Standard' && template.type === 'Standard') ||
            (activeCategory === 'Premium' && template.isStatic && template.type !== 'Standard') ||
            (activeCategory === 'Shared Examples' && !template.isStatic);

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
                            <div className="absolute top-0 right-0 h-full bg-gradient-to-bl from-purple-600/20 to-transparent" />

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

                        {isLoading ? (
                            <div className="py-32 flex flex-col items-center justify-center gap-4 text-gray-400">
                                <Loader2 size={40} className="animate-spin" />
                                <p className="font-bold uppercase tracking-widest text-xs">Curating Masterpieces...</p>
                            </div>
                        ) : filteredTemplates.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 pt-8">
                                {filteredTemplates.map((template) => (
                                    <div key={template.id} className="group relative">
                                        <DesignCard
                                            title={template.name}
                                            date={template.isStatic ? "Official Premium" : `Shared by ${template.user?.name || 'User'}`}
                                            templateElements={template.isStatic ? template.elements : template.data}
                                            onClick={() => handleSelectTemplate(template)}
                                        />

                                        {!template.isStatic && template.userId && template.userId === (session?.user as any)?.id && (
                                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                <button
                                                    onClick={(e) => handleToggleVisibility(template.id, template.isPublic, e)}
                                                    className={`p-2 rounded-xl border shadow-xl backdrop-blur-md transition-all active:scale-90 ${template.isPublic ? 'bg-white/80 text-blue-600 border-blue-100' : 'bg-gray-900/80 text-white border-gray-700'}`}
                                                    title={template.isPublic ? "Visible to everyone" : "Private (only you see this)"}
                                                >
                                                    {template.isPublic ? <Globe size={18} /> : <EyeOff size={18} />}
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(template.id, e)}
                                                    className="p-2 bg-red-500/80 text-white rounded-xl border border-red-400 shadow-xl backdrop-blur-md hover:bg-red-600 transition-all active:scale-90"
                                                    title="Delete Template"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        )}

                                        {!template.isStatic && !template.isPublic && (
                                            <div className="absolute top-4 left-4 pointer-events-none">
                                                <div className="px-3 py-1 bg-gray-900 text-white text-[10px] font-bold rounded-lg flex items-center gap-2 shadow-xl border border-gray-700">
                                                    <EyeOff size={12} />
                                                    PRIVATE
                                                </div>
                                            </div>
                                        )}
                                    </div>
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

            </main>

            <AnimatePresence>
                {templateToDelete && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setTemplateToDelete(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl z-[111] overflow-hidden"
                        >
                            <div className="p-8 md:p-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl">
                                        <AlertTriangle size={32} />
                                    </div>
                                    <button
                                        onClick={() => setTemplateToDelete(null)}
                                        className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-4">
                                    Delete this template?
                                </h3>

                                <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                    Are you sure you want to delete this template? This action is permanent and will remove it for everyone.
                                </p>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={confirmDelete}
                                        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-200 active:scale-95"
                                    >
                                        Yes, Delete Permanent
                                    </button>
                                    <button
                                        onClick={() => setTemplateToDelete(null)}
                                        className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-2xl font-bold transition-all active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`fixed top-24 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}
                    >
                        {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                        <p className="font-bold">{message.text}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <DashboardFooter />
        </div>
    );
}
