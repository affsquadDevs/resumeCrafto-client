import React, { useState } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Layers, ChevronUp, ChevronDown, Sliders } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Properties Panel Component
const PropertiesSection = ({ selectedId }: { selectedId: string | null }) => {
    const elements = useEditorStore((state) => state.elements);
    const updateElement = useEditorStore((state) => state.updateElement);
    const saveHistory = useEditorStore((state) => state.saveHistory);

    const selectedElement = elements.find((el) => el.id === selectedId);

    const getShadowString = (intensity: number, dirs: string[], color: string) => {
        if (intensity <= 0) return undefined;
        let x = 0;
        let y = 0;
        if (dirs.includes('left')) x -= intensity / 2;
        if (dirs.includes('right')) x += intensity / 2;
        if (dirs.includes('top')) y -= intensity / 2;
        if (dirs.includes('bottom')) y += intensity / 2;
        if (dirs.includes('center')) { x = 0; y = 0; }

        return `${x}px ${y}px ${intensity}px ${color}`;
    };

    const toggleShadowDir = (dir: string) => {
        if (!selectedElement) return;
        saveHistory();
        const currentDirs = styles.shadowDirs || [];
        let newDirs: string[];

        if (dir === 'center') {
            newDirs = ['center'];
        } else {
            newDirs = currentDirs.filter((d: string) => d !== 'center');
            if (newDirs.includes(dir)) {
                newDirs = newDirs.filter((item: string) => item !== dir);
            } else {
                newDirs = [...newDirs, dir];
            }
        }

        const val = styles.boxShadow ? parseInt(styles.boxShadow.split(' ')[2]) : 10;
        const color = styles.shadowColor || 'rgba(0,0,0,0.2)';
        const shadow = val > 0 ? getShadowString(val, newDirs, color) : undefined;
        updateElement(selectedElement.id, { styles: { ...styles, shadowDirs: newDirs, boxShadow: shadow } });
    };

    if (!selectedElement) {
        return (
            <div className="p-8 border-b border-gray-100 text-[13px] font-bold text-gray-400 text-center uppercase tracking-widest bg-gray-50/30">
                Select an item to edit
            </div>
        );
    }

    const { type, styles, content } = selectedElement;

    return (
        <div className="p-4 border-b border-gray-100 flex flex-col gap-5 bg-white">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-[12px] uppercase tracking-wider">
                <Sliders size={14} className="text-purple-600" />
                <span>Properties</span>
            </div>

            {/* Dimensions & Position */}
            {/* Dimensions & Position */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Position</label>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400">X</span>
                            <input
                                type="number"
                                value={Math.round(selectedElement.x)}
                                onFocus={() => saveHistory()}
                                onChange={(e) => updateElement(selectedElement.id, { x: parseInt(e.target.value) })}
                                className="w-full text-xs border border-gray-300 rounded p-1"
                            />
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400">Y</span>
                            <input
                                type="number"
                                value={Math.round(selectedElement.y)}
                                onFocus={() => saveHistory()}
                                onChange={(e) => updateElement(selectedElement.id, { y: parseInt(e.target.value) })}
                                className="w-full text-xs border border-gray-300 rounded p-1"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Size</label>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400">W</span>
                            <input
                                type="number"
                                value={Math.round(selectedElement.width)}
                                onFocus={() => saveHistory()}
                                onChange={(e) => updateElement(selectedElement.id, { width: parseInt(e.target.value) })}
                                className="w-full text-xs border border-gray-300 rounded p-1"
                            />
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400">H</span>
                            <input
                                type="number"
                                value={Math.round(selectedElement.height)}
                                onFocus={() => saveHistory()}
                                onChange={(e) => updateElement(selectedElement.id, { height: parseInt(e.target.value) })}
                                className="w-full text-xs border border-gray-300 rounded p-1"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Color Picker (for Text Color or Shape Background) */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    {type === 'text' ? 'Text Color' : 'Fill Color'}
                </label>
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={(type === 'text' ? styles.color : styles.backgroundColor) || '#9333ea'}
                        onFocus={() => saveHistory()}
                        onChange={(e) => {
                            if (type === 'text') {
                                updateElement(selectedElement.id, { styles: { ...styles, color: e.target.value } });
                            } else {
                                updateElement(selectedElement.id, { styles: { ...styles, backgroundColor: e.target.value } });
                            }
                        }}
                        className="w-full h-10 cursor-pointer rounded-xl border border-gray-100 p-1 bg-white shadow-sm hover:shadow-md transition-shadow"
                    />
                </div>
            </div>

            {/* Text Content Editor */}
            {
                type === 'text' && (
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                            Content
                        </label>
                        <textarea
                            value={content || ''}
                            onFocus={() => saveHistory()}
                            onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                            className="w-full text-sm border border-gray-100 bg-gray-50/50 rounded-xl p-3 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 focus:bg-white outline-none resize-y min-h-[80px] transition-all"
                            placeholder="Enter text..."
                        />
                    </div>
                )
            }


            {/* Advanced Styling (Radius, Rotation, Shadow) */}
            <div className="flex flex-col gap-4">
                {/* Radius Slider - only for shapes */}
                {type === 'shape' && (
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Radius</label>
                            <span className="text-[10px] text-gray-400 font-mono">{parseInt(styles.borderRadius) || 0}px</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={parseInt(styles.borderRadius) || 0}
                            onFocus={() => saveHistory()}
                            onChange={(e) => updateElement(selectedElement.id, { styles: { ...styles, borderRadius: `${e.target.value}px` } })}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                    </div>
                )}

                {/* Shadow Section */}
                <div className="flex flex-col gap-3">
                    <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Shadow Settings</label>

                    {/* Color Picker for Shadow */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-400 uppercase">Shadow Color</span>
                            <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: styles.shadowColor || 'rgba(0,0,0,0.2)' }} />
                        </div>
                        <input
                            type="color"
                            value={styles.shadowColor?.startsWith('#') ? styles.shadowColor : '#000000'}
                            onFocus={() => saveHistory()}
                            onChange={(e) => {
                                const newColor = e.target.value;
                                // We'll keep color Opaque or handle Alpha if possible. 
                                // For now let's just use hex.
                                const val = styles.boxShadow ? parseInt(styles.boxShadow.split(' ')[2]) : 10;
                                const dirs = styles.shadowDirs || ['bottom'];
                                const shadow = val > 0 ? getShadowString(val, dirs, newColor) : undefined;
                                updateElement(selectedElement.id, { styles: { ...styles, shadowColor: newColor, boxShadow: shadow } });
                            }}
                            className="w-full h-8 cursor-pointer rounded border border-gray-300 p-0.5 bg-white"
                        />
                    </div>

                    {/* Direction Buttons (Multi-toggle) */}
                    <div className="grid grid-cols-3 gap-1 mb-1">
                        <div />
                        <button
                            onClick={() => toggleShadowDir('top')}
                            className={`p-1.5 border rounded flex items-center justify-center text-[10px] transition-colors ${(styles.shadowDirs || []).includes('top') ? 'bg-purple-100 border-purple-300 text-purple-600' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                        >
                            <ChevronUp size={12} />
                        </button>
                        <div />

                        <button
                            onClick={() => toggleShadowDir('left')}
                            className={`p-1.5 border rounded flex items-center justify-center text-[10px] transition-colors ${(styles.shadowDirs || []).includes('left') ? 'bg-purple-100 border-purple-300 text-purple-600' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                        >
                            <ChevronUp size={12} className="-rotate-90" />
                        </button>
                        <button
                            onClick={() => toggleShadowDir('center')}
                            className={`p-1.5 border rounded flex items-center justify-center text-[10px] transition-colors ${(styles.shadowDirs || []).includes('center') || !(styles.shadowDirs?.length) ? 'bg-purple-100 border-purple-300 text-purple-600' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                        >
                            •
                        </button>
                        <button
                            onClick={() => toggleShadowDir('right')}
                            className={`p-1.5 border rounded flex items-center justify-center text-[10px] transition-colors ${(styles.shadowDirs || []).includes('right') ? 'bg-purple-100 border-purple-300 text-purple-600' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                        >
                            <ChevronUp size={12} className="rotate-90" />
                        </button>

                        <div />
                        <button
                            onClick={() => toggleShadowDir('bottom')}
                            className={`p-1.5 border rounded flex items-center justify-center text-[10px] transition-colors ${(styles.shadowDirs || []).includes('bottom') ? 'bg-purple-100 border-purple-300 text-purple-600' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                        >
                            <ChevronDown size={12} />
                        </button>
                        <div />
                    </div>

                    {/* Intensity Slider */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-400 uppercase">Intensity</span>
                            <span className="text-[10px] text-gray-400 font-mono">
                                {styles.boxShadow ? parseInt(styles.boxShadow.split(' ')[2]) : 0}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={styles.boxShadow ? parseInt(styles.boxShadow.split(' ')[2]) : 0}
                            onFocus={() => saveHistory()}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                const dirs = styles.shadowDirs || ['bottom'];
                                const color = styles.shadowColor || 'rgba(0,0,0,0.2)';
                                let shadow = val > 0 ? getShadowString(val, dirs, color) : undefined;
                                updateElement(selectedElement.id, { styles: { ...styles, boxShadow: shadow } });
                            }}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                    </div>
                </div>
            </div>

        </div >
    );
};

// Sortable Item Component
const SortableLayerItem = ({ el, isSelected, onSelect, onToggle, onBringToFront, onSendToBack }: any) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: el.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 999 : 'auto',
        position: 'relative' as const,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            // Add listeners to main div to allow drag from anywhere (since we removed grip)
            // But we must stop propagation on buttons/inputs.
            {...attributes}
            {...listeners}
            className={`
                group flex items-center gap-3 p-3 rounded-xl cursor-pointer border select-none transition-all duration-300
                ${isSelected ? 'bg-purple-50/50 border-purple-200 shadow-sm' : 'bg-white border-transparent hover:bg-gray-50'}
            `}
            onClick={(e) => {
                if (e.defaultPrevented) return; // If dragged, don't select? (dnd-kit usually handles this)
                // Actually dnd-kit sensors block click on drag.
                if (e.shiftKey) {
                    onToggle(el.id);
                } else {
                    onSelect(el.id);
                }
            }}
        >
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500 overflow-hidden shrink-0 border border-gray-200">
                {el.type === 'text' && 'Tt'}
                {(el.type === 'shape' || el.type === 'icon' || el.type === 'star') && (
                    <div className="w-3 h-3 bg-gray-400 rounded-sm" style={{ backgroundColor: el.styles.backgroundColor }} />
                )}
                {el.type === 'image' && el.src ? (
                    <img src={el.src} className="w-full h-full object-cover" />
                ) : (el.type === 'image' && 'Img')}
            </div>

            <div className="flex-1 min-w-0 text-sm flex flex-col justify-center">
                <div className="truncate font-medium text-gray-700 leading-tight">
                    {el.type === 'text' ? (el.content || 'Text') :
                        el.type === 'shape' ? 'Shape' :
                            el.type === 'icon' ? 'Icon' :
                                el.type === 'star' ? 'Star' : 'Image'}
                </div>
            </div>

            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                <button
                    onPointerDown={(e) => e.stopPropagation()} // Prevent drag start on button click
                    onClick={(e) => {
                        e.stopPropagation();
                        onBringToFront(el.id);
                    }}
                    className="p-1 hover:bg-white rounded shadow-sm border border-transparent hover:border-gray-200 text-gray-500 transition-all"
                    title="Bring to Front"
                >
                    <ChevronUp size={12} />
                </button>
                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSendToBack(el.id);
                    }}
                    className="p-1 hover:bg-white rounded shadow-sm border border-transparent hover:border-gray-200 text-gray-500 transition-all"
                    title="Send to Back"
                >
                    <ChevronDown size={12} />
                </button>
            </div>
        </div>
    );
};

export const LayersPanel = () => {
    const elements = useEditorStore((state) => state.elements);
    const pages = useEditorStore((state) => state.pages);
    const selectedIds = useEditorStore((state) => state.selectedIds);
    const selectElement = useEditorStore((state) => state.selectElement);
    const toggleSelection = useEditorStore((state) => state.toggleSelection);
    const bringToFront = useEditorStore((state) => state.bringToFront);
    const sendToBack = useEditorStore((state) => state.sendToBack);
    const reorderElements = useEditorStore((state) => state.reorderElements);

    const [width, setWidth] = useState(280);
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = React.useCallback((mouseDownEvent: React.MouseEvent) => {
        mouseDownEvent.preventDefault();
        setIsResizing(true);

        const startX = mouseDownEvent.clientX;
        const startWidth = width;

        const onMouseMove = (mouseMoveEvent: MouseEvent) => {
            // Dragging left increases width
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


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Require slight drag to activate, preventing accidental drags on click
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Sort elements by z-index (descending) for display
    const sortedElements = [...elements].sort((a, b) => {
        const zA = a.styles.zIndex || 0;
        const zB = b.styles.zIndex || 0;
        return zB - zA;
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            reorderElements(active.id as string, over?.id as string);
        }
    };

    const firstSelectedId = selectedIds.length > 0 ? selectedIds[0] : null;

    return (
        <div
            className="bg-white border-l border-gray-100 flex flex-col h-full relative shrink-0 shadow-sm"
            style={{ width: width, transition: isResizing ? 'none' : 'width 0.2s ease' }}
        >
            {/* Resize Handle */}
            <div
                className="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-blue-400 z-10 opacity-0 hover:opacity-100 transition-opacity"
                onMouseDown={startResizing}
            />

            {/* Header */}
            <div className="h-14 px-6 border-b border-gray-100 flex items-center justify-between font-bold text-gray-900 shrink-0">
                <div className="flex items-center gap-2">
                    <Layers size={18} className="text-purple-600" />
                    <span className="text-sm uppercase tracking-wider">Layers</span>
                </div>
            </div>

            {/* Properties & Layers Scrollable Area */}
            <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
                <PropertiesSection selectedId={firstSelectedId} />

                {/* Layers List */}
                <div className="p-3 flex flex-col gap-4">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        {pages.map((page) => {
                            // Filter elements for this page
                            const pageElements = sortedElements.filter(el => el.pageId === page.id);

                            return (
                                <div key={page.id} className="flex flex-col gap-2">
                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <span>Page {page.order + 1}</span>
                                        <span className="h-px bg-gray-200 flex-1"></span>
                                    </div>

                                    {pageElements.length === 0 && (
                                        <div className="text-center text-gray-300 text-xs py-2 italic">
                                            Empty Page
                                        </div>
                                    )}

                                    <SortableContext
                                        items={pageElements.map(el => el.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {pageElements.map((el) => (
                                            <SortableLayerItem
                                                key={el.id}
                                                el={el}
                                                isSelected={selectedIds.includes(el.id)}
                                                onSelect={selectElement}
                                                onToggle={toggleSelection}
                                                onBringToFront={bringToFront}
                                                onSendToBack={sendToBack}
                                            />
                                        ))}
                                    </SortableContext>
                                </div>
                            );
                        })}
                    </DndContext>

                    {elements.length === 0 && pages.length === 0 && (
                        <div className="text-center text-gray-400 text-sm mt-10 italic">
                            No elements
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
