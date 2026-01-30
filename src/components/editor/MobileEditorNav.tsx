'use client';

import React from 'react';
import { Layout, Square, Smartphone, Layers, X, Minus, Plus } from 'lucide-react';
import { useEditorStore } from '@/store/useEditorStore';
import LiquidGlass from '@/components/ui/liquid-glass/LiquidGlass';

export const MobileEditorNav = () => {
    const { mobileActivePanel, setMobileActivePanel, zoom, setZoom } = useEditorStore();

    const navItems = [
        { id: 'design', icon: Layout, label: 'Design' },
        { id: 'elements', icon: Square, label: 'Elements' },
        { id: 'icons', icon: Smartphone, label: 'Icons' },
        { id: 'layers', icon: Layers, label: 'Layers' },
    ] as const;

    const stepZoom = (amount: number) => {
        const newZoom = Math.min(Math.max(zoom + amount, 0.1), 3);
        setZoom(Number(newZoom.toFixed(1)));
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-32px)] max-w-lg sm:hidden">
            <LiquidGlass
                displacementScale={0}
                blurAmount={20}
                saturation={140}
                elasticity={0}
                cornerRadius={100}
                padding="8px"
                centered={false}
                compact
                overLight={true}
                className="w-full shadow-2xl border border-white/20"
                style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                }}
            >
                <div className="flex items-center justify-between px-2 gap-1">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => stepZoom(-0.1)}
                            className="p-2 rounded-full text-gray-500 hover:bg-white/20 active:scale-95 transition-all"
                        >
                            <Minus size={20} />
                        </button>
                        <span className="text-[10px] font-black w-8 text-center text-gray-700">
                            {Math.round(zoom * 100)}%
                        </span>
                        <button
                            onClick={() => stepZoom(0.1)}
                            className="p-2 rounded-full text-gray-500 hover:bg-white/20 active:scale-95 transition-all"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="w-px h-6 bg-gray-900/10 mx-1" />

                    <div className="flex-1 flex items-center justify-between">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = mobileActivePanel === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setMobileActivePanel(isActive ? null : item.id)}
                                    className={`flex flex-col items-center justify-center gap-0.5 p-2 rounded-full transition-all ${isActive
                                        ? 'text-purple-600 bg-white/40 scale-110 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900 active:scale-95'
                                        }`}
                                >
                                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[8px] font-black uppercase tracking-tighter">
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {mobileActivePanel && (
                        <>
                            <div className="w-px h-6 bg-gray-900/10 mx-1" />
                            <button
                                onClick={() => setMobileActivePanel(null)}
                                className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </>
                    )}
                </div>
            </LiquidGlass>
        </div>
    );
};
