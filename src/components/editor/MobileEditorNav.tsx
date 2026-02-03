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
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-20px)] max-w-lg sm:hidden">
            <LiquidGlass
                displacementScale={0}
                blurAmount={20}
                saturation={140}
                elasticity={0}
                cornerRadius={100}
                padding="6px"
                centered={false}
                compact
                overLight={true}
                className="w-full shadow-2xl border border-white/20"
                style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                }}
            >
                <div className="flex items-center justify-between px-1 gap-0.5">
                    <div className="flex items-center gap-0.5">
                        <button
                            onClick={() => stepZoom(-0.1)}
                            className="p-1.5 rounded-full text-gray-500 hover:bg-white/20 active:scale-95 transition-all"
                        >
                            <Minus size={18} />
                        </button>
                        <span className="text-[9px] font-black w-7 text-center text-gray-700">
                            {Math.round(zoom * 100)}%
                        </span>
                        <button
                            onClick={() => stepZoom(0.1)}
                            className="p-1.5 rounded-full text-gray-500 hover:bg-white/20 active:scale-95 transition-all"
                        >
                            <Plus size={15} />
                        </button>
                    </div>

                    <div className="w-px h-5 bg-gray-900/10 mx-0.5" />

                    <div className="flex-1 flex items-center justify-around gap-0.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = mobileActivePanel === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setMobileActivePanel(isActive ? null : item.id)}
                                    className={`flex flex-col items-center justify-center gap-0.5 p-1.5 rounded-xl transition-all ${isActive
                                        ? 'text-purple-600 bg-white/40 scale-105 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900 active:scale-95'
                                        }`}
                                >
                                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[7px] font-black uppercase tracking-tighter">
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {mobileActivePanel && (
                        <>
                            <div className="w-px h-5 bg-gray-900/10 mx-0.5" />
                            <button
                                onClick={() => setMobileActivePanel(null)}
                                className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                            >
                                <X size={18} />
                            </button>
                        </>
                    )}
                </div>
            </LiquidGlass>
        </div>
    );
};
