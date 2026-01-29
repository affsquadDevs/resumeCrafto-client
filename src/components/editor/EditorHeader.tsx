
import React from 'react';
import Link from 'next/link';
import { Layers, ChevronLeft } from 'lucide-react';

interface EditorHeaderProps {
    showLayers: boolean;
    setShowLayers: (show: boolean) => void;
    onExport: () => void;
}

export const EditorHeader = ({ showLayers, setShowLayers, onExport }: EditorHeaderProps) => {
    return (
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 justify-between shrink-0 z-20 sticky top-0">
            <div className="flex items-center gap-4">
                <Link href="/" className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition-colors" title="Back to Dashboard">
                    <ChevronLeft size={20} />
                </Link>
                <h1 className="font-semibold text-gray-800">Untitled Design - A4</h1>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => setShowLayers(!showLayers)}
                    className={`p-2 rounded-md transition-colors ${showLayers ? 'bg-gray-100 text-purple-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    title="Toggle Layers"
                >
                    <Layers size={20} />
                </button>
                <div className="w-px h-6 bg-gray-200 mx-2 self-center" />
                <button
                    onClick={onExport}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                    Export PDF
                </button>
            </div>
        </header>
    );
};
