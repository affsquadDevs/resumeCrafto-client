'use client';

import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Type, Square, Circle, Star, Minus, Image as ImageIcon } from 'lucide-react';

export const ElementsPanel = () => {
    const addElement = useEditorStore((state) => state.addElement);

    return (
        <div className="flex flex-col gap-4">
            <p className="text-[11px] text-gray-400 font-bold mb-1 uppercase tracking-widest pl-1">Add to Canvas</p>

            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => addElement('text')}
                    className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-gray-50 hover:bg-purple-50/50 hover:border-purple-100 transition-all duration-300 group hover:scale-[1.05] active:scale-95 hover:shadow-xl hover:shadow-purple-100/30"
                    title="Text Box"
                >
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-purple-100 group-hover:text-purple-600 text-gray-500 shrink-0 transition-all duration-300">
                        <Type size={24} />
                    </div>
                    <span className="font-bold text-[12px] text-gray-600 group-hover:text-purple-900 tracking-tight">Text Box</span>
                </button>

                <button
                    onClick={() => addElement('shape')}
                    className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-gray-50 hover:bg-purple-50/50 hover:border-purple-100 transition-all duration-300 group hover:scale-[1.05] active:scale-95 hover:shadow-xl hover:shadow-purple-100/30"
                    title="Rectangle"
                >
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-purple-100 group-hover:text-purple-600 text-gray-500 shrink-0 transition-all duration-300">
                        <Square size={24} />
                    </div>
                    <span className="font-bold text-[12px] text-gray-600 group-hover:text-purple-900 tracking-tight">Rectangle</span>
                </button>

                <button
                    onClick={() => addElement('shape', { shapeType: 'circle', styles: { borderRadius: '50%' } })}
                    className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-gray-50 hover:bg-purple-50/50 hover:border-purple-100 transition-all duration-300 group hover:scale-[1.05] active:scale-95 hover:shadow-xl hover:shadow-purple-100/30"
                    title="Circle"
                >
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-purple-100 group-hover:text-purple-600 text-gray-500 shrink-0 transition-all duration-300">
                        <Circle size={24} />
                    </div>
                    <span className="font-bold text-[12px] text-gray-600 group-hover:text-purple-900 tracking-tight">Circle</span>
                </button>

                <button
                    onClick={() => addElement('star')}
                    className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-gray-50 hover:bg-purple-50/50 hover:border-purple-100 transition-all duration-300 group hover:scale-[1.05] active:scale-95 hover:shadow-xl hover:shadow-purple-100/30"
                    title="Star"
                >
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-purple-100 group-hover:text-purple-600 text-gray-500 shrink-0 transition-all duration-300">
                        <Star size={24} />
                    </div>
                    <span className="font-bold text-[12px] text-gray-600 group-hover:text-purple-900 tracking-tight">Star</span>
                </button>

                <button
                    onClick={() => addElement('shape', { height: 4, styles: { backgroundColor: '#000000' } })}
                    className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-gray-50 hover:bg-purple-50/50 hover:border-purple-100 transition-all duration-300 group hover:scale-[1.05] active:scale-95 hover:shadow-xl hover:shadow-purple-100/30"
                    title="Line"
                >
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-purple-100 group-hover:text-purple-600 text-gray-500 shrink-0 transition-all duration-300">
                        <Minus size={24} />
                    </div>
                    <span className="font-bold text-[12px] text-gray-600 group-hover:text-purple-900 tracking-tight">Line</span>
                </button>

                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        id="image-upload-panel"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    const src = event.target?.result as string;
                                    addElement('image', {
                                        src,
                                        styles: { backgroundColor: 'transparent' }
                                    });
                                };
                                reader.readAsDataURL(file);
                                e.target.value = '';
                            }
                        }}
                    />
                    <button
                        onClick={() => document.getElementById('image-upload-panel')?.click()}
                        className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-gray-50 hover:bg-purple-50/50 hover:border-purple-100 transition-all duration-300 group hover:scale-[1.05] active:scale-95 hover:shadow-xl hover:shadow-purple-100/30 w-full"
                        title="Image"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-purple-100 group-hover:text-purple-600 text-gray-500 shrink-0 transition-all duration-300">
                            <ImageIcon size={24} />
                        </div>
                        <span className="font-bold text-[12px] text-gray-600 group-hover:text-purple-900 tracking-tight">Image</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
