"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { CraftorNavbar } from '@/components/dashboard/CraftorNavbar';
import { DashboardHero } from '@/components/dashboard/DashboardHero';

const DashboardFooter = dynamic(() => import('@/components/dashboard/DashboardFooter').then(mod => mod.DashboardFooter));
const FeaturesGrid = dynamic(() => import('@/components/dashboard/FeaturesGrid').then(mod => mod.FeaturesGrid));
const FAQBlock = dynamic(() => import('@/components/dashboard/FAQBlock').then(mod => mod.FAQBlock));

export default function LandingPage() {
    return (
        <div className="min-h-screen w-full bg-white text-gray-900">
            {/* Main Content */}
            <main className="min-h-screen bg-gray-50/30 pt-24 pb-12 overflow-x-hidden">
                <CraftorNavbar />
                <DashboardHero />
                <FeaturesGrid />
                <FAQBlock />
                <DashboardFooter />
            </main>
        </div>
    );
}
