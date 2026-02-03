'use client';

import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Loader2, Search, X } from 'lucide-react';
import { useIconify } from '@/hooks/useIconify';

export const IconsPanel = () => {
    const addElement = useEditorStore((state) => state.addElement);
    const setMobileActivePanel = useEditorStore((state) => state.setMobileActivePanel);
    const {
        searchQuery,
        setSearchQuery,
        remoteIcons,
        isLoading,
        selectIcon: baseSelectIcon,
        clearSearch
    } = useIconify('icons');

    const selectIcon = async (name: string) => {
        await baseSelectIcon(name);
        setMobileActivePanel(null);
    };

    const handleAddFeatured = (icon: any) => {
        addElement('icon', {
            styles: { iconPath: icon.path, viewBox: '0 0 24 24' }
        });
        setMobileActivePanel(null);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="mb-2">
                <p className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wider whitespace-nowrap px-1">Social & Contact</p>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search icons..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-gray-50/80 border border-gray-100 rounded-xl text-[12px] focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition-all shadow-inner"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={14} strokeWidth={2.5} />
                    </div>
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X size={12} strokeWidth={2.5} />
                        </button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {/* Featured Icons (Only show if no search query) */}
                {!searchQuery && [
                    { name: 'Telegram', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.35 3.68-1.54 4.45-1.81 4.95-1.81.11 0 .36.03.52.16.13.11.17.26.19.37z' },
                    { name: 'Viber', path: 'M17.5 11c0 3.58-2.42 6.5-5.5 6.5-1.07 0-2.07-.35-2.91-.97L5 18l1.39-3.41c-1.16-1.03-1.89-2.48-1.89-4.09 0-3.58 2.42-6.5 5.5-6.5s5.5 2.92 5.5 6.5z' },
                    { name: 'WhatsApp', path: 'M12.01 2.01C6.49 2.01 2.01 6.49 2.01 12.01c0 2.16.68 4.15 1.85 5.79L2 22l4.39-1.33c1.55.93 3.37 1.45 5.32 1.45 5.52 0 10-4.48 10-10s-4.48-10-10-10zM8.3 7.82c.16 0 .33.01.48.02.13.01.28.02.43.34.16.35.54 1.35.58 1.45.05.09.08.2.02.32s-.1.21-.2.33c-.1.12-.21.27-.3.37-.1.11-.21.23-.09.43s.54.91 1.15 1.46c.79.7 1.44.92 1.65 1.01.21.1.34.08.46-.06s.52-.61.66-.82c.14-.2.28-.17.47-.1.19.07 1.19.56 1.39.67.2.11.33.16.38.25.05.09.05.51-.15.91-.2.4-.99.98-1.38 1.01-.39.03-.89.15-2.61-.54-1.72-.69-2.85-2.49-2.94-2.61-.09-.12-.72-.98-.72-1.87 0-.89.46-1.33.63-1.51.17-.18.37-.23.49-.23z' },
                    { name: 'LinkedIn', path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-2.1.7-2.5 1.6v-1.4h-2.5v10.5h2.5V13c0-.7.5-1.2 1.2-1.2.7 0 1.2.5 1.2 1.2v5.3h2.8M7.2 8.3a1.4 1.4 0 0 0 1.4-1.4c0-.8-.6-1.4-1.4-1.4-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4m1.2 10.2V8h-2.5v10.5h2.5' },
                    { name: 'Email', path: 'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.1-8 4.9-8-4.9V6l8 4.9L20 6z' },
                    { name: 'Phone', path: 'M6.62 10.79c1.44 2.82 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' },
                    { name: 'Web', path: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 17.93V16c0-.55-.45-1-1-1h-1a1 1 0 0 0-1 1v2.93a8 8 0 0 1-5-6.93V11c0-.55.45-1 1-1h1a1 1 0 0 0 1-1V5.07A8 8 0 0 1 19 12a8 8 0 0 1-6 7.93z' },
                    { name: 'Map Pin', path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z' },
                    { name: 'Instagram', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.36 1.05.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.05.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.17-.42-.36-1.05-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.05-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07m0-2.16c-3.26 0-3.67.01-4.95.07-1.28.06-2.15.26-2.91.56-.79.31-1.46.72-2.13 1.39S.94 3.29.63 4.08C.33 4.85.13 5.71.07 6.99.01 8.27 0 8.68 0 11.94s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13s1.34 1.08 2.13 1.39c.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.39s1.33-1.34 1.64-2.13c.3-.76.49-1.63.55-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.39-2.13s-1.34-1.34-2.13-1.64c-.76-.3-1.63-.49-2.91-.55-1.28-.06-1.69-.07-4.95-.07zM12 5.8a6.14 6.14 0 1 0 6.14 6.14A6.14 6.14 0 0 0 12 5.8zm0 10.12a3.98 3.98 0 1 1 3.98-3.98 3.98 3.98 0 0 1-3.98 3.98zm6.4-10.61a1.44 1.44 0 1 1-1.44 1.44 1.44 1.44 0 0 1 1.44-1.44z' },
                ].map((icon) => (
                    <button
                        key={icon.name}
                        onClick={() => handleAddFeatured(icon)}
                        className="
                        aspect-square flex flex-col items-center justify-center p-3
                        rounded-2xl bg-white border border-gray-50
                        transition-all duration-300
                        hover:shadow-xl hover:shadow-purple-100/50
                        hover:border-purple-100
                        active:scale-95
                        group
                    "
                        title={icon.name}
                    >
                        <div className="w-12 h-12 flex items-center justify-center text-gray-400 group-hover:text-purple-600 transition-colors duration-300">
                            <svg
                                viewBox="0 0 24 24"
                                className="
                                w-10 h-10 fill-current
                                transition-transform duration-300
                                group-hover:scale-125
                            "
                            >
                                <path d={icon.path} />
                            </svg>
                        </div>

                        <span className="text-[11px] font-bold text-gray-500 group-hover:text-purple-700 mt-2 truncate w-full text-center transition-colors duration-300">
                            {icon.name}
                        </span>
                    </button>
                ))}

                {/* Remote Icons */}
                {isLoading ? (
                    <div className="col-span-2 py-8 flex flex-col items-center justify-center text-gray-400 gap-2">
                        <Loader2 className="animate-spin" size={20} />
                        <span className="text-xs">Searching database...</span>
                    </div>
                ) : remoteIcons.length > 0 ? (
                    remoteIcons.map((iconName) => (
                        <button
                            key={iconName}
                            onClick={() => selectIcon(iconName)}
                            className="
                                aspect-square flex flex-col items-center justify-center p-3
                                rounded-2xl bg-white border border-gray-50
                                transition-all duration-300
                                hover:shadow-xl hover:shadow-purple-100/50
                                hover:border-purple-100
                                active:scale-95
                                group
                            "
                            title={iconName}
                        >
                            <div className="w-12 h-12 flex items-center justify-center text-gray-400 group-hover:text-purple-600 transition-colors duration-300">
                                <img
                                    src={`https://api.iconify.design/${iconName.replace(':', '/')}.svg`}
                                    className="
                                    w-10 h-10 fill-current
                                    transition-transform duration-300
                                    group-hover:scale-125
                                "
                                    alt={iconName}
                                />
                            </div>

                            <span className="text-[11px] font-bold text-gray-500 group-hover:text-purple-700 mt-2 truncate w-full text-center transition-colors duration-300">
                                {iconName.split(':')[1]}
                            </span>
                        </button>
                    ))
                ) : searchQuery && !isLoading && (
                    <div className="col-span-2 py-8 text-center text-xs text-gray-400">
                        No icons found for "{searchQuery}"
                    </div>
                )}
            </div>
        </div>
    );
};
