
import React from 'react';

export const SettingsHeader = () => {
    return (
        <header className="h-20 px-12 flex items-center justify-end sticky top-0 bg-white/40 backdrop-blur-xl z-20 border-b border-gray-50/50">
            <div className="flex items-center gap-6">
                <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-sm font-bold text-purple-700 shadow-sm">
                    AD
                </div>
            </div>
        </header>
    );
};
