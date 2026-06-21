
import React from 'react';
import { useTranslations } from 'next-intl';
import { CraftorNavbar } from '@/components/dashboard/CraftorNavbar';

interface SettingsHeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const SettingsHeader = ({ activeTab, setActiveTab }: SettingsHeaderProps) => {
    const t = useTranslations('SettingsHeader');
    return <CraftorNavbar mode="compact" title={t('title')} backUrl="/" activeTab={activeTab} setActiveTab={setActiveTab} />;
};
