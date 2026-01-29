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

    if (!selectedElement) {
        return (
            <div className="p-4 border-b border-gray-200 text-sm text-gray-500 text-center">
                Select an item to edit properties
            </div>
        );
    }

    const { type, styles, content } = selectedElement;

    return (
        <div className="p-4 border-b border-gray-200 flex flex-col gap-4 bg-gray-50/50">
            <div className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                <Sliders size={14} />
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
                        value={type === 'text' ? styles.color : styles.backgroundColor}
                        onFocus={() => saveHistory()}
                        onChange={(e) => {
                            if (type === 'text') {
                                updateElement(selectedElement.id, { styles: { ...styles, color: e.target.value } });
                            } else if (type === 'shape') {
                                updateElement(selectedElement.id, { styles: { ...styles, backgroundColor: e.target.value } });
                            }
                        }}
                        className="w-full h-8 cursor-pointer rounded border border-gray-300 p-0.5 bg-white"
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
                            className="w-full text-sm border border-gray-300 rounded p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-y min-h-[60px]"
                            placeholder="Enter text..."
                        />
                    </div>
                )
            }


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
                group flex items-center gap-2 p-2 rounded-md cursor-pointer border select-none transition-colors
                ${isSelected ? 'bg-blue-50 border-blue-200' : 'bg-white border-transparent hover:bg-gray-50'}
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
                {el.type === 'shape' && <div className="w-3 h-3 bg-gray-400 rounded-sm" style={{ backgroundColor: el.styles.backgroundColor }} />}
                {el.type === 'image' && el.src ? (
                    <img src={el.src} className="w-full h-full object-cover" />
                ) : (el.type === 'image' && 'Img')}
            </div>

            <div className="flex-1 min-w-0 text-sm flex flex-col justify-center">
                <div className="truncate font-medium text-gray-700 leading-tight">
                    {el.type === 'text' ? (el.content || 'Text') :
                        el.type === 'shape' ? 'Shape' : 'Image'}
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
            className="bg-white border-l border-gray-200 flex flex-col h-full relative shrink-0"
            style={{ width: width, transition: isResizing ? 'none' : 'width 0.2s ease' }}
        >
            {/* Resize Handle */}
            <div
                className="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-blue-400 z-10 opacity-0 hover:opacity-100 transition-opacity"
                onMouseDown={startResizing}
            />

            {/* Header */}
            <div className="h-14 px-4 border-b border-gray-200 flex items-center justify-between font-semibold text-gray-800 shrink-0">
                <div className="flex items-center gap-2">
                    <Layers size={18} className="text-purple-600" />
                    <span>Layers & Properties</span>
                </div>
            </div>

            {/* Properties Section */}
            <PropertiesSection selectedId={firstSelectedId} />

            {/* Layers List */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-4">
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
    );
};
