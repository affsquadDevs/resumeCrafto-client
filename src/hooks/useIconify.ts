import { useState, useEffect, useCallback } from 'react';
import { searchIcons, getIconDetails } from '@/utils/iconify';
import { useEditorStore } from '@/store/useEditorStore';

export const useIconify = (activeTab: string) => {
    const addElement = useEditorStore((state) => state.addElement);
    const [searchQuery, setSearchQuery] = useState('');
    const [remoteIcons, setRemoteIcons] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = useCallback(async (query: string) => {
        setIsLoading(true);
        try {
            const icons = await searchIcons(query);
            setRemoteIcons(icons);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Debounced search
    useEffect(() => {
        if (!searchQuery.trim() || activeTab !== 'icons') {
            setRemoteIcons([]);
            return;
        }

        const timer = setTimeout(() => {
            handleSearch(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, activeTab, handleSearch]);

    const selectIcon = useCallback(async (iconName: string) => {
        const details = await getIconDetails(iconName);
        if (details) {
            addElement('icon', {
                styles: {
                    iconPath: details.body,
                    viewBox: `0 0 ${details.width} ${details.height}`
                }
            });
        }
    }, [addElement]);

    const clearSearch = useCallback(() => {
        setSearchQuery('');
    }, []);

    return {
        searchQuery,
        setSearchQuery,
        remoteIcons,
        isLoading,
        selectIcon,
        clearSearch
    };
};
