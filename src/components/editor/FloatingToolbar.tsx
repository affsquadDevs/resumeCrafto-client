import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Lock, Unlock, Copy, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingToolbarProps {
    elementId: string;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ elementId }) => {
    const element = useEditorStore((state) => state.elements.find(el => el.id === elementId));
    const toggleLock = useEditorStore((state) => state.toggleLock);
    const deleteElement = useEditorStore((state) => state.deleteElement);
    const duplicateElement = useEditorStore((state) => state.duplicateElement);

    if (!element) return null;

    const handleDuplicate = (e: React.MouseEvent) => {
        e.stopPropagation();
        duplicateElement(elementId);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteElement(elementId);
    };

    const handleToggleLock = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleLock(elementId);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%', scale: 0.9 }}
            animate={{
                opacity: 1,
                y: 0,
                x: '-50%',
                scale: 1
            }}
            exit={{ opacity: 0, y: 10, x: '-50%', scale: 0.9 }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.8
            }}
            className="absolute -top-14 left-1/2 flex items-center bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 px-2 py-1.5 gap-1.5 z-[1000]"
            style={{
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <button
                onClick={handleToggleLock}
                className={`p-2 rounded-full transition-all duration-200 relative group ${element.locked ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-600 hover:scale-110 active:scale-95'}`}
                title={element.locked ? "Unlock" : "Lock"}
            >
                {element.locked ? <Lock size={18} /> : <Unlock size={18} />}
                {/* Tooltip */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-gray-900 text-white text-[11px] rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 whitespace-nowrap shadow-xl z-[1001] font-medium">
                    {element.locked ? "Розблокировать" : "Блокировка"}
                </div>
            </button>

            <div className="w-px h-5 bg-gray-100 mx-0.5" />

            <button
                onClick={handleDuplicate}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-all duration-200 hover:scale-110 active:scale-95"
                title="Duplicate"
            >
                <Copy size={18} />
            </button>

            <button
                onClick={handleDelete}
                className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-500 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                title="Delete"
            >
                <Trash2 size={18} />
            </button>
        </motion.div>
    );
};
