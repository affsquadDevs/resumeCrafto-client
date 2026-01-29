import React from 'react';
import { useEditorStore, EditorElement } from '@/store/useEditorStore';
import { Type, Square, Circle, Image as ImageIcon, ChevronLeft, Layout } from 'lucide-react';
import { TEMPLATES } from '@/utils/templates';
import { TemplatePreview } from './TemplatePreview';

export const Sidebar = () => {
    const addElement = useEditorStore((state) => state.addElement);
    const loadTemplate = useEditorStore((state) => state.loadTemplate);
    const [width, setWidth] = React.useState(300);
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [isResizing, setIsResizing] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<'design' | 'elements'>('design');

    const startResizing = React.useCallback((mouseDownEvent: React.MouseEvent) => {
        mouseDownEvent.preventDefault();
        setIsResizing(true);

        const startX = mouseDownEvent.clientX;
        const startWidth = width;

        const onMouseMove = (mouseMoveEvent: MouseEvent) => {
            const newWidth = startWidth + (mouseMoveEvent.clientX - startX);
            // Clamp width between 80px (icon only equiv) and 500px
            if (newWidth >= 80 && newWidth <= 500) {
                setWidth(newWidth);
                if (newWidth < 180) { // Increased threshold for collapse
                    setIsCollapsed(true);
                } else {
                    setIsCollapsed(false);
                }
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

    // Icon only mode if collapsed
    const effectiveWidth = isCollapsed ? 80 : width;

    return (
        <div
            className="h-full bg-white border-r border-gray-200 flex flex-col relative shrink-0"
            style={{ width: isCollapsed ? 80 : width, transition: isResizing ? 'none' : 'width 0.2s ease' }}
        >
            <div className="flex border-b border-gray-100 h-14 shrink-0">
                <button
                    onClick={() => setActiveTab('design')}
                    className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${activeTab === 'design' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Layout size={18} />
                    {!isCollapsed && <span>Templates</span>}
                </button>
                <button
                    onClick={() => setActiveTab('elements')}
                    className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${activeTab === 'elements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Square size={18} />
                    {!isCollapsed && <span>Elements</span>}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
                {activeTab === 'design' ? (
                    <div className="flex flex-col gap-4">
                        {!isCollapsed && (
                            <>
                                <h3 className="text-sm font-bold text-gray-800">Choose a Template</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {TEMPLATES.map((template) => (
                                        <button
                                            key={template.id}
                                            onClick={() => loadTemplate(template.elements as EditorElement[])}
                                            className="group relative flex flex-col gap-1.5 text-left"
                                        >
                                            <div className="relative aspect-[1/1.414] bg-white rounded-md overflow-hidden border border-gray-200 group-hover:border-blue-500 transition-all shadow-sm group-hover:shadow-md">
                                                <TemplatePreview elements={template.elements} />
                                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-[10px] text-white font-bold px-2 py-1 bg-blue-600 rounded-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">Apply</span>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-gray-500 font-medium truncate px-1 group-hover:text-blue-600 transition-colors">{template.name}</p>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                        {isCollapsed && (
                            <div className="flex flex-col gap-4 items-center">
                                <Layout size={24} className="text-gray-400" />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {!isCollapsed && <p className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wider whitespace-nowrap">Add to Canvas</p>}

                        <button
                            onClick={() => addElement('text')}
                            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors text-left group"
                            title="Text Box"
                        >
                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 text-gray-600 shrink-0">
                                <Type size={18} />
                            </div>
                            {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Text Box</span>}
                        </button>

                        <button
                            onClick={() => addElement('shape')}
                            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors text-left group"
                            title="Rectangle"
                        >
                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 text-gray-600 shrink-0">
                                <Square size={18} />
                            </div>
                            {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Rectangle</span>}
                        </button>

                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                id="image-upload"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            const src = event.target?.result as string;
                                            addElement('image', {
                                                src,
                                                width: 200,
                                                height: 200,
                                                styles: { backgroundColor: 'transparent' }
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button
                                onClick={() => document.getElementById('image-upload')?.click()}
                                className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors text-left group w-full"
                                title="Image"
                            >
                                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 text-gray-600 shrink-0">
                                    <ImageIcon size={18} />
                                </div>
                                {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Image</span>}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Resize Handle */}
            <div
                className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-400 z-10 opacity-0 hover:opacity-100 transition-opacity"
                onMouseDown={startResizing}
            />

            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 shadow-sm z-20 transition-transform"
                style={{ transform: `translateY(-50%) ${isCollapsed ? 'rotate(180deg)' : ''}` }}
            >
                <ChevronLeft size={14} />
            </button>
        </div>
    );
};
