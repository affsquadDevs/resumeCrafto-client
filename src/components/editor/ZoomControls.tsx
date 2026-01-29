import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Minus, Plus } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';

export const ZoomControls = () => {
    const zoom = useEditorStore((state) => state.zoom);
    const setZoom = useEditorStore((state) => state.setZoom);

    const handleZoomChange = (value: number[]) => {
        setZoom(value[0]);
    };

    const stepZoom = (amount: number) => {
        const newZoom = Math.min(Math.max(zoom + amount, 0.1), 3);
        setZoom(Number(newZoom.toFixed(1)));
    };

    return (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-md border border-gray-200 p-2 flex items-center gap-3 z-50">
            <button
                onClick={() => stepZoom(-0.1)}
                className="p-1 hover:bg-gray-100 rounded text-gray-600"
            >
                <Minus size={16} />
            </button>

            <span className="text-sm font-medium w-12 text-center">
                {Math.round(zoom * 100)}%
            </span>

            <Slider.Root
                className="relative flex items-center select-none touch-none w-24 h-5"
                value={[zoom]}
                max={3}
                min={0.1}
                step={0.05}
                onValueChange={handleZoomChange}
            >
                <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
                    <Slider.Range className="absolute bg-purple-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                    className="block w-4 h-4 bg-white border border-gray-300 shadow hover:bg-gray-50 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-purple-400"
                    aria-label="Zoom"
                />
            </Slider.Root>

            <button
                onClick={() => stepZoom(0.1)}
                className="p-1 hover:bg-gray-100 rounded text-gray-600"
            >
                <Plus size={16} />
            </button>
        </div>
    );
};
