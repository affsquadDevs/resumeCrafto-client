"use client"

import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500/30 overflow-hidden">
            <CraftorNavbar />
            <main className="container mx-auto px-4 py-32 relative">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-neutral-400 mb-12">
                        Have questions or feedback? We'd love to hear from you.
                    </p>

                    <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm">
                        <p className="mb-4 text-neutral-300">Primary Contact:</p>
                        <a href="mailto:hello@affsquad.com" className="text-2xl font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                            hello@affsquad.com
                        </a>
                    </div>
                </div>
            </main>
            <DashboardFooter />
        </div>
    );
}
