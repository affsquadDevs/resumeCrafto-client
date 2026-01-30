"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Trash2, Loader2 } from 'lucide-react';
import { CraftorNavbar } from '@/components/dashboard/CraftorNavbar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { DesignCard } from '@/components/dashboard/DesignCard';
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';
import { TEMPLATES } from '@/utils/templates';
import { useEditorStore } from '@/store/useEditorStore';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
    const router = useRouter();
    const loadTemplate = useEditorStore((state) => state.loadTemplate);
    const setResumeInfo = useEditorStore((state) => state.setResumeInfo);
    const { data: session } = useSession();
    const [resumes, setResumes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResumes = async () => {
            if (!session) {
                setIsLoading(false);
                return;
            }
            try {
                const res = await fetch('/api/resumes');
                if (res.ok) {
                    const data = await res.json();
                    setResumes(data);
                }
            } catch (error) {
                console.error('Failed to fetch resumes:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchResumes();
    }, [session]);

    const handleSelectTemplate = (templateId: string | null, isResume: boolean = false) => {
        if (isResume && templateId) {
            const resume = resumes.find(r => r.id === templateId);
            if (resume) {
                loadTemplate(resume.data as any);
                setResumeInfo(resume.id, resume.name);
                router.push('/editor');
                return;
            }
        }

        if (templateId) {
            const template = TEMPLATES.find(t => t.id === templateId);
            if (template) {
                // elements in TEMPLATES are Partial<EditorElement>[], loadTemplate expects EditorElement[]
                // The store action should handle mapping, but let's be safe
                loadTemplate(template.elements as any);
                setResumeInfo(null, template.name);
            }
        } else {
            // New blank
            loadTemplate([]);
            setResumeInfo(null, 'Untitled Resume');
        }
        router.push('/editor');
    };

    const handleDeleteResume = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this design?')) return;
        try {
            const res = await fetch(`/api/resumes?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setResumes(prev => prev.filter(r => r.id !== id));
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white text-gray-900">
            {/* Main Content */}
            <main className="min-h-screen bg-gray-50/30 pt-24 pb-12 px-6 md:px-10 overflow-x-hidden">
                <CraftorNavbar />
                <DashboardHero />

                {/* Designs List */}
                <section className="px-10 pb-12">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">Recent Designs</h3>
                        <Link
                            href="/templates"
                            className="text-sm font-bold text-gray-400 hover:text-purple-600 transition-colors flex items-center gap-1 group"
                        >
                            View All <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
                        <DesignCard
                            title="Create from Scratch"
                            date="Blank Canvas"
                            isCreateNew
                            onClick={() => handleSelectTemplate(null)}
                        />

                        {isLoading ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
                                <Loader2 className="animate-spin" size={40} />
                                <p className="font-bold">Loading your designs...</p>
                            </div>
                        ) : (
                            <>
                                {resumes.map((resume) => (
                                    <div key={resume.id} className="relative group">
                                        <DesignCard
                                            title={resume.name}
                                            date={new Date(resume.updatedAt).toLocaleDateString()}
                                            templateElements={resume.data}
                                            onClick={() => handleSelectTemplate(resume.id, true)}
                                        />
                                        <button
                                            onClick={(e) => handleDeleteResume(resume.id, e)}
                                            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur shadow-sm rounded-xl text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 active:scale-95"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}

                                {resumes.length === 0 && TEMPLATES.slice(0, 3).map((template) => (
                                    <DesignCard
                                        key={template.id}
                                        title={template.name}
                                        date="Modern Template"
                                        templateElements={template.elements}
                                        onClick={() => handleSelectTemplate(template.id)}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </section>

                <DashboardFooter />
            </main>
        </div>
    );
}
