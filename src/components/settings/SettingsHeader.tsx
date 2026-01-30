
import React from 'react';
import { CraftorNavbar } from '@/components/dashboard/CraftorNavbar';

interface SettingsHeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const SettingsHeader = ({ activeTab, setActiveTab }: SettingsHeaderProps) => {
    return <CraftorNavbar mode="compact" title="Settings" backUrl="/" activeTab={activeTab} setActiveTab={setActiveTab} />;
};
