import { useEffect } from 'react';
import { useEditorStore } from '@/store/useEditorStore';

export const useEditorShortcuts = () => {
    const setAltPressed = useEditorStore((state) => state.setAltPressed);
    const moveSelectedElements = useEditorStore((state) => state.moveSelectedElements);
    const resizeSelectedElements = useEditorStore((state) => state.resizeSelectedElements);
    const deleteSelectedElements = useEditorStore((state) => state.deleteSelectedElements);
    const undo = useEditorStore((state) => state.undo);
    const redo = useEditorStore((state) => state.redo);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger shortcuts if typing in an input, textarea, or contentEditable
            const target = e.target as HTMLElement;
            const isTyping =
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable;

            if (isTyping) return;

            // Alt Key (for distance guides)
            if (e.key === 'Alt') {
                e.preventDefault();
                setAltPressed(true);
            }

            // Delete Key
            if (e.key === 'Delete' || e.key === 'Backspace') {
                deleteSelectedElements();
            }

            // Undo / Redo
            const isZ = e.code === 'KeyZ';
            const isY = e.code === 'KeyY';

            if ((e.ctrlKey || e.metaKey) && isZ) {
                e.preventDefault();
                if (e.shiftKey) {
                    redo();
                } else {
                    undo();
                }
            } else if ((e.ctrlKey || e.metaKey) && isY) {
                e.preventDefault();
                redo();
            }

            // Copy / Paste
            const isC = e.code === 'KeyC';
            const isV = e.code === 'KeyV';

            if ((e.ctrlKey || e.metaKey) && isC) {
                // Focus check is already done above via isTyping
                useEditorStore.getState().copySelectedElements();
            } else if ((e.ctrlKey || e.metaKey) && isV) {
                e.preventDefault();
                useEditorStore.getState().pasteElements();
            }

            // Arrow Key Navigation & Resizing
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault(); // Prevent page scroll
                const step = e.shiftKey ? 10 : 1;
                const isCtrl = e.ctrlKey || e.metaKey;

                if (isCtrl) {
                    // Resize Logic (Figma-style)
                    useEditorStore.getState().saveHistory();
                    let dw = 0;
                    let dh = 0;
                    if (e.key === 'ArrowUp') dh = -step;
                    if (e.key === 'ArrowDown') dh = step;
                    if (e.key === 'ArrowLeft') dw = -step;
                    if (e.key === 'ArrowRight') dw = step;
                    resizeSelectedElements(dw, dh);
                } else {
                    // Move Logic
                    useEditorStore.getState().saveHistory();
                    let dx = 0;
                    let dy = 0;
                    if (e.key === 'ArrowUp') dy = -step;
                    if (e.key === 'ArrowDown') dy = step;
                    if (e.key === 'ArrowLeft') dx = -step;
                    if (e.key === 'ArrowRight') dx = step;
                    moveSelectedElements(dx, dy);
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Alt') {
                setAltPressed(false);
            }
        };

        const handleWindowBlur = () => {
            setAltPressed(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('blur', handleWindowBlur);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleWindowBlur);
        };
    }, [setAltPressed, moveSelectedElements, resizeSelectedElements, deleteSelectedElements, undo, redo]);
};
