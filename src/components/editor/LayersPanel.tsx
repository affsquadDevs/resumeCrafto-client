import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { LayersPanelContent } from './panels/LayersPanelContent';

export const LayersPanel = () => {
    const [width, setWidth] = useState(280);
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = React.useCallback((mouseDownEvent: React.MouseEvent) => {
        mouseDownEvent.preventDefault();
        setIsResizing(true);

        const startX = mouseDownEvent.clientX;
        const startWidth = width;

        const onMouseMove = (mouseMoveEvent: MouseEvent) => {
            const newWidth = startWidth - (mouseMoveEvent.clientX - startX);
            if (newWidth >= 200 && newWidth <= 500) {
                setWidth(newWidth);
            }
        };

        const onMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [width]);

    return (
        <div
            className="hidden sm:flex bg-white border-l border-gray-100 flex-col h-full relative shrink-0 shadow-sm"
            style={{ width: width, transition: isResizing ? 'none' : 'width 0.2s ease' }}
        >
            <div
                className="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-blue-400 z-10 opacity-0 hover:opacity-100 transition-opacity"
                onMouseDown={startResizing}
            />

            <div className="h-14 px-6 border-b border-gray-100 flex items-center justify-between font-bold text-gray-900 shrink-0">
                <div className="flex items-center gap-2">
                    <Layers size={18} className="text-purple-600" />
                    <span className="text-sm uppercase tracking-wider">Layers</span>
                </div>
            </div>

            <LayersPanelContent />
        </div>
    );
};
