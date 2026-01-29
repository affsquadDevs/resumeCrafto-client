
"use client";

import React from 'react';
import { SettingsSidebar } from '@/components/settings/SettingsSidebar';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import { ProfileSection } from '@/components/settings/ProfileSection';
import { LoginSection } from '@/components/settings/LoginSection';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = React.useState('profile');

    return (
        <div className="flex h-screen w-screen bg-white overflow-hidden text-gray-900">
            <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Settings Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50/20">
                <SettingsHeader />

                <div className="max-w-4xl mx-auto px-12 py-12">
                    {activeTab === 'profile' && <ProfileSection />}
                    {activeTab === 'login' && <LoginSection />}
                </div>
            </main>
        </div>
    );
}
