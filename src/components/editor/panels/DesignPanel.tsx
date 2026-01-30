'use client';

import React from 'react';
import { useEditorStore, EditorElement } from '@/store/useEditorStore';
import { TEMPLATES } from '@/utils/templates';
import { TemplatePreview } from '@/components/editor/TemplatePreview';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useMemo } from 'react';
import { Loader2, User, Sparkles, Globe, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DesignPanel = () => {
    const loadTemplate = useEditorStore((state) => state.loadTemplate);
    const { data: session } = useSession();
    const [dbTemplates, setDbTemplates] = useState<any[]>([]);
    const [resumes, setResumes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const categories = ['All', 'My Designs', 'Premium', 'Shared'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [templatesRes, resumesRes] = await Promise.all([
                    fetch('/api/templates'),
                    fetch('/api/resumes')
                ]);

                if (templatesRes.ok) {
                    const templatesData = await templatesRes.json();
                    setDbTemplates(templatesData);
                }

                if (resumesRes.ok) {
                    const resumesData = await resumesRes.json();
                    setResumes(resumesData);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredTemplates = useMemo(() => {
        const staticTemplates = TEMPLATES.map(t => ({ ...t, isStatic: true, type: 'Premium', source: 'template' }));
        const sharedTemplates = dbTemplates.map(t => ({ ...t, isStatic: false, type: 'Shared', source: 'template' }));
        const userResumes = resumes.map(r => ({ ...r, isStatic: false, type: 'Resume', source: 'resume' }));

        const all = [...staticTemplates, ...sharedTemplates, ...userResumes];

        return all.filter(template => {
            if (activeCategory === 'All') return true;
            if (activeCategory === 'My Designs') {
                return template.userId === (session?.user as any)?.id;
            }
            if (activeCategory === 'Premium') return template.isStatic;
            if (activeCategory === 'Shared') return !template.isStatic && template.userId !== (session?.user as any)?.id && template.source === 'template';
            return true;
        });
    }, [dbTemplates, resumes, activeCategory, session]);

    return (
        <div className="flex flex-col gap-6">
            <div className="px-1">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Design Library</h3>

                {/* Categories */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${activeCategory === cat
                                ? 'bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-100'
                                : 'bg-white border-gray-100 text-gray-500 hover:border-purple-200 hover:text-purple-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-3">
                    <Loader2 className="animate-spin" size={24} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Loading templates...</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredTemplates.map((template) => (
                            <motion.button
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={template.id}
                                onClick={() => loadTemplate(template.elements || template.data)}
                                className="group relative flex flex-col gap-2 text-left"
                            >
                                <div className="relative aspect-[1/1.414] bg-white rounded-2xl overflow-hidden border border-gray-100 group-hover:border-purple-500 transition-all shadow-sm group-hover:shadow-xl group-hover:shadow-purple-100/50">
                                    <TemplatePreview elements={template.elements || template.data} />

                                    {/* Badges */}
                                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                                        {template.isStatic ? (
                                            <div className="p-1.5 bg-purple-600 text-white rounded-lg shadow-lg">
                                                <Sparkles size={10} />
                                            </div>
                                        ) : template.userId === (session?.user as any)?.id ? (
                                            <div className="p-1.5 bg-blue-600 text-white rounded-lg shadow-lg">
                                                <User size={10} />
                                            </div>
                                        ) : (
                                            <div className="p-1.5 bg-gray-800 text-white rounded-lg shadow-lg">
                                                <Globe size={10} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-[10px] text-white font-extrabold px-3 py-1.5 bg-purple-600 rounded-lg shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-300">Apply</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-500 font-extrabold truncate px-1 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{template.name}</p>
                            </motion.button>
                        ))}
                    </AnimatePresence>

                    {filteredTemplates.length === 0 && (
                        <div className="col-span-2 py-12 flex flex-col items-center justify-center text-gray-400 gap-3 border-2 border-dashed border-gray-50 rounded-3xl">
                            <Layout size={32} className="opacity-20" />
                            <p className="text-[10px] font-bold uppercase tracking-widest">No templates found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
