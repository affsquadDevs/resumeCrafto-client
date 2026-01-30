import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { ChevronLeft, Layout, Square, Smartphone } from 'lucide-react';
import { DesignPanel } from './panels/DesignPanel';
import { ElementsPanel } from './panels/ElementsPanel';
import { IconsPanel } from './panels/IconsPanel';

export const Sidebar = () => {
    const [width, setWidth] = React.useState(300);
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [isResizing, setIsResizing] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<'design' | 'elements' | 'icons'>('design');

    const startResizing = React.useCallback((mouseDownEvent: React.MouseEvent) => {
        mouseDownEvent.preventDefault();
        setIsResizing(true);

        const startX = mouseDownEvent.clientX;
        const startWidth = width;

        const onMouseMove = (mouseMoveEvent: MouseEvent) => {
            const newWidth = startWidth + (mouseMoveEvent.clientX - startX);
            if (newWidth >= 80 && newWidth <= 500) {
                setWidth(newWidth);
                setIsCollapsed(newWidth < 180);
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
            className="hidden sm:flex h-full bg-white border-r border-gray-100 relative shrink-0 shadow-sm"
            style={{ width: isCollapsed ? 70 : width, transition: isResizing ? 'none' : 'width 0.2s ease' }}
        >
            {/* Navigation Rail */}
            <div className="w-[70px] border-r border-gray-50 flex flex-col items-center py-6 gap-6 bg-white shrink-0 z-20">
                <button
                    onClick={() => { setActiveTab('design'); setIsCollapsed(false); }}
                    className={`flex flex-col items-center justify-center gap-1.5 w-full transition-all relative group ${activeTab === 'design' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    {activeTab === 'design' && <div className="absolute left-0 w-1 h-8 bg-purple-600 rounded-r-full" />}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${activeTab === 'design' ? 'bg-purple-100/50 text-purple-600 shadow-sm shadow-purple-100' : 'group-hover:bg-gray-50'}`}>
                        <Layout size={22} />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">Design</span>
                </button>
                <button
                    onClick={() => { setActiveTab('elements'); setIsCollapsed(false); }}
                    className={`flex flex-col items-center justify-center gap-1.5 w-full transition-all relative group ${activeTab === 'elements' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    {activeTab === 'elements' && <div className="absolute left-0 w-1 h-8 bg-purple-600 rounded-r-full" />}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${activeTab === 'elements' ? 'bg-purple-100/50 text-purple-600 shadow-sm shadow-purple-100' : 'group-hover:bg-gray-50'}`}>
                        <Square size={22} />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">Elements</span>
                </button>
                <button
                    onClick={() => { setActiveTab('icons'); setIsCollapsed(false); }}
                    className={`flex flex-col items-center justify-center gap-1.5 w-full transition-all relative group ${activeTab === 'icons' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    {activeTab === 'icons' && <div className="absolute left-0 w-1 h-8 bg-purple-600 rounded-r-full" />}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${activeTab === 'icons' ? 'bg-purple-100/50 text-purple-600 shadow-sm shadow-purple-100' : 'group-hover:bg-gray-50'}`}>
                        <Smartphone size={22} />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">Icons</span>
                </button>
            </div>

            {/* Content Panel Area */}
            <div className={`flex-1 flex flex-col min-w-0 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
                    {activeTab === 'design' && <DesignPanel />}
                    {activeTab === 'elements' && <ElementsPanel />}
                    {activeTab === 'icons' && <IconsPanel />}
                </div>

                {/* Resize Handle */}
                <div
                    className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-purple-400 z-10 opacity-0 hover:opacity-100 transition-opacity"
                    onMouseDown={startResizing}
                />

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-10 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-purple-600 shadow-md z-30 transition-all hover:scale-110 active:scale-95"
                    style={{ transform: `${isCollapsed ? 'rotate(180deg)' : ''}` }}
                >
                    <ChevronLeft size={14} />
                </button>
            </div>
        </div>
    );
};
