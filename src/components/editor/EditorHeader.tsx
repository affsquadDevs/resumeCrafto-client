
import React from 'react';
import Link from 'next/link';
import { Layers, ChevronLeft, ChevronDown, FileDown, LayoutPanelTop, Check, Loader2, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/useUserStore';

interface EditorHeaderProps {
    showLayers: boolean;
    setShowLayers: (show: boolean) => void;
    showToolbar: boolean;
    setShowToolbar: (show: boolean) => void;
    onExport: () => void;
    onSaveTemplate: () => void;
    isSavingTemplate?: boolean;
    resumeName: string;
}

export const EditorHeader = ({
    showLayers,
    setShowLayers,
    showToolbar,
    setShowToolbar,
    onExport,
    onSaveTemplate,
    isSavingTemplate,
    resumeName
}: EditorHeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-2 sm:px-4 justify-between shrink-0 z-20 sticky top-0">
            <div className="flex items-center gap-1.5 sm:gap-4 min-w-0">
                <Link href="/" className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition-colors" title="Back to Dashboard">
                    <ChevronLeft size={20} />
                </Link>
                <div className="flex flex-col min-w-0">
                    <h1 className="text-xs sm:text-sm font-bold text-gray-900 leading-none truncate max-w-[80px] xs:max-w-[120px] sm:max-w-none">{resumeName || 'Untitled'}</h1>
                    <span className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1 hidden sm:block">A4 Standard</span>
                </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3">
                <button
                    onClick={() => setShowToolbar(!showToolbar)}
                    className={`p-1.5 sm:p-2 rounded-xl transition-all duration-300 ${showToolbar ? 'bg-purple-50 text-purple-600 ring-1 ring-purple-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                    title="Toggle Toolbar"
                >
                    <SlidersHorizontal size={18} />
                </button>

                <button
                    onClick={() => setShowLayers(!showLayers)}
                    className={`p-1.5 sm:p-2 rounded-xl transition-all duration-300 ${showLayers ? 'bg-purple-50 text-purple-600 ring-1 ring-purple-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                    title="Toggle Layers"
                >
                    <Layers size={18} />
                </button>

                <div className="w-px h-6 bg-gray-200 mx-0.5" />

                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-1 sm:gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95"
                    >
                        <span className="hidden xs:inline">Share</span>
                        <span className="xs:hidden">Export</span>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 z-[100]"
                            >
                                <div className="px-3 py-2 mb-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Editor Actions</p>
                                </div>

                                <button
                                    onClick={() => {
                                        onExport();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all group"
                                >
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                        {isSavingTemplate ? <Loader2 size={18} className="animate-spin" /> : <FileDown size={18} />}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold">Download PDF</p>
                                        <p className="text-[10px] text-gray-400">
                                            {isSavingTemplate ? 'Saving...' : 'Export as high quality file'}
                                        </p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => {
                                        onSaveTemplate();
                                        setIsMenuOpen(false);
                                    }}
                                    disabled={isSavingTemplate}
                                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all group mt-1"
                                >
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                        {isSavingTemplate ? <Loader2 size={18} className="animate-spin" /> : <LayoutPanelTop size={18} />}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold leading-tight">Share this Resume Example with Everyone</p>
                                        <p className="text-[10px] text-gray-400 italic">Make this design a public template</p>
                                    </div>
                                </button>

                                <div className="mt-2 pt-2 border-t border-gray-50">
                                    <p className="text-[9px] text-center text-gray-400 font-medium px-4">
                                        Changes are automatically saved to your browser session.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};
