
"use client";

import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@/components/editor/Canvas';
import { Sidebar } from '@/components/editor/Sidebar';
import { Toolbar } from '@/components/editor/Toolbar';
import { ZoomControls } from '@/components/editor/ZoomControls';
import { LayersPanel } from '@/components/editor/LayersPanel';
import { EditorHeader } from '@/components/editor/EditorHeader';
import { useEditorStore } from '@/store/useEditorStore';
import { useEditorShortcuts } from '@/hooks/useEditorShortcuts';

export default function EditorPage() {
    const zoom = useEditorStore((state) => state.zoom);
    const elements = useEditorStore((state) => state.elements);
    const selectElement = useEditorStore((state) => state.selectElement);
    const setSelection = useEditorStore((state) => state.setSelection);

    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionBox, setSelectionBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const startPointRef = useRef<{ x: number; y: number } | null>(null);

    // UI State
    const [showLayers, setShowLayers] = useState(true);

    useEditorShortcuts();

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.react-draggable')) return;
        if (!e.shiftKey) selectElement(null);

        startPointRef.current = { x: e.clientX, y: e.clientY };
        setIsSelecting(true);
        setSelectionBox({ x: e.clientX, y: e.clientY, width: 0, height: 0 });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isSelecting || !startPointRef.current) return;
        const currentX = e.clientX;
        const currentY = e.clientY;
        const startX = startPointRef.current.x;
        const startY = startPointRef.current.y;
        setSelectionBox({
            x: Math.min(startX, currentX),
            y: Math.min(startY, currentY),
            width: Math.abs(currentX - startX),
            height: Math.abs(currentY - startY)
        });
    };

    const handleMouseUp = () => {
        if (!isSelecting || !selectionBox) {
            setIsSelecting(false);
            setSelectionBox(null);
            startPointRef.current = null;
            return;
        }

        // Find all page elements
        const pageElements = document.querySelectorAll('[data-page-id]');
        const intersectedIds: string[] = [];

        pageElements.forEach((pageEl) => {
            const pageId = pageEl.getAttribute('data-page-id');
            const pageRect = pageEl.getBoundingClientRect();

            // Find elements belonging to this page
            const pageItems = elements.filter(el => el.pageId === pageId);

            pageItems.forEach(el => {
                // Calculate screen coordinates of the element
                const elLeft = pageRect.left + (el.x * zoom);
                const elTop = pageRect.top + (el.y * zoom);
                const elRight = elLeft + (el.width * zoom);
                const elBottom = elTop + (el.height * zoom);

                // Selection box coordinates
                const selLeft = selectionBox.x;
                const selTop = selectionBox.y;
                const selRight = selectionBox.x + selectionBox.width;
                const selBottom = selectionBox.y + selectionBox.height;

                // Check intersection
                if (elLeft < selRight && elRight > selLeft && elTop < selBottom && elBottom > selTop) {
                    intersectedIds.push(el.id);
                }
            });
        });

        if (intersectedIds.length > 0) setSelection(intersectedIds);

        setIsSelecting(false);
        setSelectionBox(null);
        startPointRef.current = null;
    };

    // Calculate Canvas Size for Scrolling
    const pages = useEditorStore((state) => state.pages);
    const A4_WIDTH = 794;
    const A4_HEIGHT = 1123;
    const fullHeight = (pages.length * A4_HEIGHT) + ((pages.length - 1) * 32) + 128 + 100;

    const handleExport = () => {
        import('@/utils/exportUtils').then(mod => mod.downloadPDF());
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
            <Sidebar />

            <main className="flex-1 h-full overflow-hidden relative flex flex-col">
                <EditorHeader
                    showLayers={showLayers}
                    setShowLayers={setShowLayers}
                    onExport={handleExport}
                />

                <Toolbar />

                <div className="flex-1 flex overflow-hidden">
                    {/* Canvas Area */}
                    <div
                        className="flex-1 overflow-auto bg-gray-100 p-8 sm:p-12 relative flex flex-col items-center"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {/* Sizing Wrapper to force Scrollbars */}
                        <div
                            style={{
                                width: `${A4_WIDTH * zoom}px`,
                                height: `${fullHeight * zoom}px`,
                                flexShrink: 0,
                                position: 'relative',
                            }}
                        >
                            {/* Transform Wrapper */}
                            <div
                                style={{
                                    transform: `scale(${zoom})`,
                                    transformOrigin: 'top left',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: `${A4_WIDTH}px`,
                                    height: `${fullHeight}px`
                                }}
                            >
                                <Canvas />
                            </div>
                        </div>

                        {/* Selection Box */}
                        {selectionBox && (
                            <div style={{
                                position: 'fixed',
                                left: selectionBox.x,
                                top: selectionBox.y,
                                width: selectionBox.width,
                                height: selectionBox.height,
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                border: '1px solid #3b82f6',
                                pointerEvents: 'none',
                                zIndex: 9999
                            }} />
                        )}
                    </div>

                    {/* Right Sidebar - Layers */}
                    {showLayers && <LayersPanel />}
                </div>

                <ZoomControls />
            </main>
        </div>
    );
}
