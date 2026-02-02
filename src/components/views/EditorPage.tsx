
"use client";

import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@/components/editor/Canvas';
import { Sidebar } from '@/components/editor/Sidebar';
import { Toolbar } from '@/components/editor/Toolbar';
import { ZoomControls } from '@/components/editor/ZoomControls';
import { MobileEditorNav } from '@/components/editor/MobileEditorNav';
import { MobileDrawer } from '@/components/editor/MobileDrawer';
import { LayersPanel } from '@/components/editor/LayersPanel';
import { EditorHeader } from '@/components/editor/EditorHeader';
import { useEditorStore } from '@/store/useEditorStore';
import { useEditorShortcuts } from '@/hooks/useEditorShortcuts';
import { Check, AlertCircle, Globe, ShieldQuestion, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

const A4_WIDTH = 794; // approx 210mm at 96dpi

export default function EditorPage() {
    const zoom = useEditorStore((state) => state.zoom);
    const elements = useEditorStore((state) => state.elements);
    const resumeId = useEditorStore((state) => state.resumeId);
    const resumeName = useEditorStore((state) => state.resumeName);
    const setResumeInfo = useEditorStore((state) => state.setResumeInfo);
    const selectElement = useEditorStore((state) => state.selectElement);
    const setSelection = useEditorStore((state) => state.setSelection);

    const { data: session } = useSession();

    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionBox, setSelectionBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const startPointRef = useRef<{ x: number; y: number } | null>(null);

    // UI State
    const [showLayers, setShowLayers] = useState(true);
    const [isSavingTemplate, setIsSavingTemplate] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [showShareConfirm, setShowShareConfirm] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEditorShortcuts();

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.react-draggable')) return;
        if (!e.shiftKey) selectElement(null);

        startPointRef.current = { x: e.clientX, y: e.clientY };
        setIsSelecting(true);
        setSelectionBox({ x: e.clientX, y: e.clientY, width: 0, height: 0 });
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        // Only trigger selection box if not touching an element
        if ((e.target as HTMLElement).closest('.react-draggable')) return;

        // Single touch only for selection box
        if (e.touches.length !== 1) return;

        const touch = e.touches[0];
        selectElement(null);
        startPointRef.current = { x: touch.clientX, y: touch.clientY };
        setIsSelecting(true);
        setSelectionBox({ x: touch.clientX, y: touch.clientY, width: 0, height: 0 });
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

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isSelecting || !startPointRef.current || e.touches.length !== 1) return;
        const touch = e.touches[0];
        const currentX = touch.clientX;
        const currentY = touch.clientY;
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

        finalizeSelection();
    };

    const handleTouchEnd = () => {
        if (!isSelecting || !selectionBox) {
            setIsSelecting(false);
            setSelectionBox(null);
            startPointRef.current = null;
            return;
        }

        finalizeSelection();
    };

    const finalizeSelection = () => {
        if (!selectionBox) return;

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
    const A4_HEIGHT = 1123;
    const fullHeight = (pages.length * A4_HEIGHT) + ((pages.length - 1) * 32) + 128 + 100;

    const handleExport = async () => {
        if (!session) {
            setMessage({ type: 'error', text: 'Please login to download' });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        setIsExporting(true);
        setMessage({ type: 'success', text: 'Saving your design...' });

        try {
            // First, save to backend
            const res = await fetch('/api/resumes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: resumeId,
                    name: resumeName,
                    data: elements
                }),
            });

            if (res.ok) {
                const savedResume = await res.json();
                setResumeInfo(savedResume.id, savedResume.name);

                // Then, trigger download
                setMessage({ type: 'success', text: 'Preparing PDF...' });
                const mod = await import('@/utils/exportUtils');
                await mod.downloadPDF();

                setMessage({ type: 'success', text: 'Downloaded successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to save before download.' });
            }
        } catch (error) {
            console.error('Export error:', error);
            setMessage({ type: 'error', text: 'Something went wrong.' });
        } finally {
            setIsExporting(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleSaveTemplate = async () => {
        setIsSavingTemplate(true);
        setMessage(null);
        setShowShareConfirm(false);
        try {
            const res = await fetch('/api/templates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `Shared Example ${new Date().toLocaleDateString()}`,
                    data: elements
                }),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Design shared with everyone!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to share design.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong.' });
        } finally {
            setIsSavingTemplate(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-100 relative">
            <Sidebar />

            <main className="flex-1 h-full overflow-hidden relative flex flex-col">
                <EditorHeader
                    showLayers={showLayers}
                    setShowLayers={setShowLayers}
                    onExport={handleExport}
                    onSaveTemplate={() => setShowShareConfirm(true)}
                    isSavingTemplate={isSavingTemplate || isExporting}
                    resumeName={resumeName}
                />

                <AnimatePresence>
                    {showShareConfirm && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowShareConfirm(false)}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden"
                            >
                                <div className="p-8 md:p-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
                                            <Globe size={32} />
                                        </div>
                                        <button
                                            onClick={() => setShowShareConfirm(false)}
                                            className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-4">
                                        Share this Resume Example with Everyone?
                                    </h3>

                                    <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                        By proceeding, you agree to make this design public. It will be added to the common templates library for all users to see and use as a reference.
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={handleSaveTemplate}
                                            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-purple-200 active:scale-95"
                                        >
                                            Yes, Share with Everyone
                                        </button>
                                        <button
                                            onClick={() => setShowShareConfirm(false)}
                                            className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-2xl font-bold transition-all active:scale-95"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center gap-3">
                                    <ShieldQuestion size={18} className="text-gray-400" />
                                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                                        This action cannot be undone by you
                                    </p>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {message && (
                    <div className={`fixed top-20 right-8 z-[70] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border animate-in slide-in-from-right-10 duration-300 ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                        {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                        <p className="font-bold">{message.text}</p>
                    </div>
                )}

                <Toolbar />

                <div className="flex-1 flex overflow-hidden">
                    {/* Canvas Area */}
                    <div
                        className="flex-1 overflow-auto bg-gray-100 p-4 sm:p-12 relative flex flex-col items-center"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
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

                        {/* Bottom Spacer for Mobile Nav */}
                        <div className="h-24 sm:hidden shrink-0" />
                    </div>

                    {/* Right Sidebar - Layers */}
                    {showLayers && <LayersPanel />}
                </div>

                <ZoomControls />
            </main>

            {/* Mobile UI */}
            <MobileEditorNav />
            <MobileDrawer />
        </div>
    );
}
