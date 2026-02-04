"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Trash2, Loader2 } from 'lucide-react';
import { CraftorNavbar } from '@/components/dashboard/CraftorNavbar';

import { TEMPLATES } from '@/utils/templates';
import { useEditorStore } from '@/store/useEditorStore';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { DashboardHero } from '@/components/dashboard/DashboardHero';

const DesignCard = dynamic(() => import('@/components/dashboard/DesignCard').then(mod => mod.DesignCard), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full animate-pulse bg-gray-100 rounded-xl" />
});

const DashboardFooter = dynamic(() => import('@/components/dashboard/DashboardFooter').then(mod => mod.DashboardFooter));


export default function DashboardPage() {
    const router = useRouter();
    const loadTemplate = useEditorStore((state) => state.loadTemplate);
    const setResumeInfo = useEditorStore((state) => state.setResumeInfo);
    const { data: session, status } = useSession();
    const [resumes, setResumes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
            return;
        }
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
    }, [session, status, router]);

    const handleSelectTemplate = (templateId: string | null, isResume: boolean = false) => {
        if (isResume && templateId) {
            const resume = resumes.find(r => r.id === templateId);
            if (resume) {
                loadTemplate(resume.data as any);
                setResumeInfo(resume.id, resume.name);
                router.push('/resume-builder');
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
        router.push('/resume-builder');
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
            <main className="min-h-screen bg-gray-50/30 pt-24 pb-12 overflow-x-hidden">
                <CraftorNavbar />
                <DashboardHero />

                {/* My Designs List */}
                <section className="px-6 md:px-10 pb-12">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">My Designs</h3>
                            <span className="px-3 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-full border border-purple-100 uppercase tracking-wider whitespace-nowrap">
                                {resumes.length} {resumes.length === 1 ? 'Design' : 'Designs'}
                            </span>
                        </div>
                        <Link
                            href="/templates"
                            className="text-sm font-bold text-gray-400 hover:text-purple-600 transition-colors flex items-center gap-1 group whitespace-nowrap"
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
                        ) : resumes.length > 0 ? (
                            resumes.map((resume) => (
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
                            ))
                        ) : (
                            <div className="col-span-full md:col-span-1 py-10 px-8 border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
                                <p className="text-gray-400 font-medium text-sm">You haven&apos;t created any designs yet.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Standard Templates Section */}
                <section className="px-6 md:px-10 pb-12 mt-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Standard Templates</h3>
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full border border-gray-200 uppercase tracking-wider whitespace-nowrap">
                                {TEMPLATES.length} Library
                            </span>
                        </div>
                        <Link
                            href="/templates"
                            className="text-sm font-bold text-gray-400 hover:text-purple-600 transition-colors flex items-center gap-1 group whitespace-nowrap"
                        >
                            Explore All <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
                        {TEMPLATES.slice(0, 8).map((template) => (
                            <DesignCard
                                key={template.id}
                                title={template.name}
                                date="Official Template"
                                templateElements={template.elements}
                                onClick={() => handleSelectTemplate(template.id)}
                            />
                        ))}

                        {/* Direct shortcut to templates page */}
                        <Link
                            href="/templates"
                            className="group flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-[2.5rem] hover:border-purple-300 hover:bg-purple-50/50 transition-all gap-4 text-center"
                        >
                            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ChevronRight size={32} />
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900">View More</h4>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Full Library</p>
                            </div>
                        </Link>
                    </div>
                </section>

                <DashboardFooter />
            </main>
        </div>
    );
}
