"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { DesignCard } from '@/components/dashboard/DesignCard';
import { TEMPLATES } from '@/utils/templates';
import { useEditorStore } from '@/store/useEditorStore';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const loadTemplate = useEditorStore((state) => state.loadTemplate);

    const handleSelectTemplate = (templateId: string | null) => {
        if (templateId) {
            const template = TEMPLATES.find(t => t.id === templateId);
            if (template) {
                // elements in TEMPLATES are Partial<EditorElement>[], loadTemplate expects EditorElement[]
                // The store action should handle mapping, but let's be safe
                loadTemplate(template.elements as any);
            }
        } else {
            // New blank
            loadTemplate([]);
        }
        router.push('/editor');
    };

    return (
        <div className="flex h-screen w-screen bg-white overflow-hidden text-gray-900">
            <DashboardSidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50/30">
                <DashboardHeader />
                <DashboardHero />

                {/* Designs List */}
                <section className="px-10 pb-12">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">Recent Designs</h3>
                        <button className="text-sm font-bold text-gray-400 hover:text-purple-600 transition-colors flex items-center gap-1 group">
                            View All <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                        <DesignCard
                            title="Create from Scratch"
                            date="Blank Canvas"
                            isCreateNew
                            onClick={() => handleSelectTemplate(null)}
                        />

                        {TEMPLATES.map((template) => (
                            <DesignCard
                                key={template.id}
                                title={template.name}
                                date="Modern Template"
                                templateElements={template.elements}
                                onClick={() => handleSelectTemplate(template.id)}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
