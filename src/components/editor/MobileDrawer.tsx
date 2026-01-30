'use client';

import React, { useEffect, useState } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import LiquidGlass from '@/components/ui/liquid-glass/LiquidGlass';
import { DesignPanel } from './panels/DesignPanel';
import { ElementsPanel } from './panels/ElementsPanel';
import { IconsPanel } from './panels/IconsPanel';
import { LayersPanelContent } from './panels/LayersPanelContent';
import { X } from 'lucide-react';

export const MobileDrawer = () => {
    const { mobileActivePanel, setMobileActivePanel } = useEditorStore();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (mobileActivePanel) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = '';
            return () => clearTimeout(timer);
        }
    }, [mobileActivePanel]);

    if (!isVisible && !mobileActivePanel) return null;

    const renderContent = () => {
        switch (mobileActivePanel) {
            case 'design': return <DesignPanel />;
            case 'elements': return <ElementsPanel />;
            case 'icons': return <IconsPanel />;
            case 'layers': return <LayersPanelContent />;
            default: return null;
        }
    };

    const getTitle = () => {
        switch (mobileActivePanel) {
            case 'design': return 'Design & Templates';
            case 'elements': return 'Add Elements';
            case 'icons': return 'Search Icons';
            case 'layers': return 'Layers & Properties';
            default: return '';
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[110] transition-opacity duration-300 sm:hidden ${mobileActivePanel ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setMobileActivePanel(null)}
            />

            {/* Drawer */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-[120] transition-transform duration-300 ease-out sm:hidden ${mobileActivePanel ? 'translate-y-0' : 'translate-y-full'
                    }`}
                style={{ maxHeight: '85vh' }}
            >
                <LiquidGlass
                    displacementScale={0}
                    blurAmount={25}
                    saturation={120}
                    elasticity={0}
                    cornerRadius={32}
                    padding="0"
                    centered={false}
                    compact
                    overLight={true}
                    className="w-full h-full shadow-2xl border-t border-white/30 rounded-t-[32px] overflow-hidden"
                    style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                    }}
                >
                    <div className="flex flex-col h-full max-h-[85vh]">
                        {/* Drawer Handle */}
                        <div className="flex justify-center p-3 shrink-0">
                            <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                        </div>

                        {/* Header */}
                        <div className="px-6 pb-4 flex items-center justify-between shrink-0">
                            <h2 className="text-lg font-black text-gray-900 tracking-tight">{getTitle()}</h2>
                            <button
                                onClick={() => setMobileActivePanel(null)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto px-6 pb-24 pt-2">
                            {renderContent()}
                        </div>
                    </div>
                </LiquidGlass>
            </div>
        </>
    );
};
