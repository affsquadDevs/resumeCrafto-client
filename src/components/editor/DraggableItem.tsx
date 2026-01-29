import React, { useRef, useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { useEditorStore } from '@/store/useEditorStore';
import { FloatingToolbar } from './FloatingToolbar';
import { Lock } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';


interface DraggableItemProps {
    id: string;
}

const Handle = ({ type }: { type: 'circle' | 'rect' }) => (
    <div
        style={{
            width: type === 'circle' ? 10 : 8,
            height: type === 'circle' ? 10 : 8,
            backgroundColor: 'white',
            border: '1px solid #3b82f6',
            borderRadius: type === 'circle' ? '50%' : 0,
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none' // Allow click to pass through to actual handle region? Rnd needs to grab the handle.
            // Actually Rnd replaces the handle component. So Rnd makes THIS click draggable.
            // So we don't need pointer-events none.
        }}
    />
);

export const DraggableItem: React.FC<DraggableItemProps> = ({ id }) => {
    const element = useEditorStore((state) =>
        state.elements.find((el) => el.id === id)
    );
    const updateElement = useEditorStore((state) => state.updateElement);
    const selectElement = useEditorStore((state) => state.selectElement);
    const selectedIds = useEditorStore((state) => state.selectedIds);
    const moveSelectedElements = useEditorStore((state) => state.moveSelectedElements);
    const zoom = useEditorStore((state) => state.zoom);

    const isSelected = selectedIds.includes(id);
    const [isEditing, setIsEditing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const rndRef = useRef<Rnd>(null);
    const draggingMembersRef = useRef<HTMLElement[]>([]);
    const startPositionsRef = useRef<Map<string, { x: number, y: number }>>(new Map());
    const lastUpdateRef = useRef<number>(0);


    // Reset editing mode if deselected
    useEffect(() => {
        if (!isSelected) setIsEditing(false);
    }, [isSelected]);

    if (!element) return null;

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (element.type === 'text') {
            setIsEditing(true);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        selectElement(id);
    };



    return (
        <Rnd
            scale={zoom}
            ref={rndRef}
            size={{ width: element.width, height: element.height }}
            position={{ x: element.x, y: element.y }}
            onDragStart={() => {
                useEditorStore.getState().saveHistory();
                setIsDragging(true);

                // Initialize multi-selection DOM refs for direct manipulation
                if (selectedIds.length > 1 && isSelected) {
                    const members: HTMLElement[] = [];
                    const positions = new Map<string, { x: number, y: number }>();

                    selectedIds.forEach(sid => {
                        const el = document.querySelector(`[data-element-id="${sid}"]`) as HTMLElement;
                        if (el && sid !== id) {
                            members.push(el);
                        }
                        const stateEl = useEditorStore.getState().elements.find(e => e.id === sid);
                        if (stateEl) {
                            positions.set(sid, { x: stateEl.x, y: stateEl.y });
                        }
                    });

                    draggingMembersRef.current = members;
                    startPositionsRef.current = positions;
                }
            }}
            onDrag={(e, d) => {
                const isAltPressed = useEditorStore.getState().isAltPressed;

                // If Alt is pressed, we ALWAYS update the store for live distance measurements
                // so that distance guides can track this moving object.
                if (isAltPressed) {
                    const now = Date.now();
                    if (now - lastUpdateRef.current > 16) {
                        updateElement(id, { x: d.x, y: d.y });
                        lastUpdateRef.current = now;
                    }
                }

                if (!isSelected) return;

                // Handle multi-drag DOM direct movement
                if (selectedIds.length > 1) {
                    const startPos = startPositionsRef.current.get(id);
                    if (!startPos) return;

                    const dx = d.x - startPos.x;
                    const dy = d.y - startPos.y;

                    // Move other members directly via DOM for 120fps performance
                    draggingMembersRef.current.forEach(member => {
                        const mid = member.getAttribute('data-element-id');
                        if (!mid) return;
                        const mStart = startPositionsRef.current.get(mid);
                        if (!mStart) return;

                        // Update position directly bypassing React
                        // MUST include original start position to avoid jumping to 0,0
                        member.style.transform = `translate3d(${mStart.x + dx}px, ${mStart.y + dy}px, 0)`;
                    });
                }
            }}
            onDragStop={(e, d) => {
                if (isSelected && selectedIds.length > 1) {
                    const startPos = startPositionsRef.current.get(id);
                    if (startPos) {
                        const dx = d.x - startPos.x;
                        const dy = d.y - startPos.y;

                        // Persist final positions to store
                        moveSelectedElements(dx, dy);
                    }

                    // Reset DOM transforms
                    draggingMembersRef.current.forEach(member => {
                        member.style.transform = '';
                    });
                } else {
                    // Single drag uncontrolled sync
                    updateElement(id, { x: d.x, y: d.y });
                }

                setIsDragging(false);
                draggingMembersRef.current = [];
                startPositionsRef.current.clear();
            }}
            onResizeStart={() => {
                useEditorStore.getState().saveHistory();
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                updateElement(id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    ...position,
                });
            }}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            disableDragging={element.locked || isEditing}
            enableResizing={selectedIds.length === 1 && isSelected && !isEditing && !element.locked}
            className={`absolute ${!isSelected ? 'hover:border hover:border-blue-300' : ''} ${element.locked ? 'cursor-default' : ''}`}
            data-element-id={id}
            resizeHandleComponent={isSelected ? {
                topLeft: <Handle type="circle" />,
                topRight: <Handle type="circle" />,
                bottomLeft: <Handle type="circle" />,
                bottomRight: <Handle type="circle" />,
                top: <Handle type="rect" />,
                bottom: <Handle type="rect" />,
                left: <Handle type="rect" />,
                right: <Handle type="rect" />,
            } : undefined}
            style={{
                ...element.styles,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: element.locked ? 'default' : isEditing ? 'text' : 'move',
                zIndex: isSelected ? 50 : element.styles.zIndex,
            }}
            onMouseEnter={() => useEditorStore.getState().setHoveredId(id)}
            onMouseLeave={() => useEditorStore.getState().setHoveredId(null)}
        >
            {/* Content Wrapper that rotates */}
            <div
                className={`${isSelected && !isEditing ? 'border-2 border-blue-500' : ''}`}
                style={{
                    width: '100%',
                    height: '100%',
                    transform: 'none',
                    transformOrigin: 'center center',
                    display: 'flex', // Propagate flex
                    alignItems: 'inherit',
                    justifyContent: 'inherit',
                }}
            >
                {element.type === 'text' ? (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            outline: 'none',
                            display: 'flex',
                            alignItems: element.styles.textAlign === 'center' ? 'center' : 'flex-start',
                            justifyContent: element.styles.textAlign === 'center' ? 'center' : element.styles.textAlign === 'right' ? 'flex-end' : 'flex-start',
                            cursor: isEditing ? 'text' : 'inherit',
                            // Prevent rotation form doubling if we did outer rotation (which we didn't)
                        }}
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onFocus={() => {
                            useEditorStore.getState().saveHistory();
                        }}
                        onBlur={(e) => {
                            useEditorStore.getState().saveHistory();
                            setIsEditing(false);
                            updateElement(id, { content: e.currentTarget.textContent || '' });
                        }}
                    >
                        {element.content}
                    </div>
                ) : element.type === 'image' ? (
                    <img
                        src={element.src}
                        alt="Uploaded element"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            pointerEvents: 'none',
                        }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%' }} />
                )}
            </div>

            {/* Floating Toolbar - Hide during drag for better performance */}
            <AnimatePresence>
                {isSelected && !isEditing && !isDragging && selectedIds[0] === id && (
                    <FloatingToolbar elementId={id} />
                )}
            </AnimatePresence>

            {/* Lock Indicator Badge */}
            {element.locked && isSelected && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white p-1 rounded-full shadow-md z-50">
                    <Lock size={12} />
                </div>
            )}
        </Rnd>
    );
};
