
"use client";

import React from 'react';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import { ProfileSection } from '@/components/settings/ProfileSection';
import { LoginSection } from '@/components/settings/LoginSection';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = React.useState('profile');

    return (
        <div className="min-h-screen w-full bg-white text-gray-900">
            {/* Main Settings Content */}
            <main className="min-h-screen bg-gray-50/20 pt-24 pb-12">
                <SettingsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
                    {activeTab === 'profile' && <ProfileSection />}
                    {activeTab === 'login' && <LoginSection />}
                </div>
            </main>
        </div>
    );
}
