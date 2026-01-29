import React, { useMemo } from 'react';
import { useEditorStore } from '@/store/useEditorStore';

const EMPTY_ARRAY: any[] = [];

export const DistanceGuides: React.FC<{ pageId: string }> = ({ pageId }) => {
    const isAltPressed = useEditorStore((state) => state.isAltPressed);
    const selectedIds = useEditorStore((state) => state.selectedIds);
    const hoveredId = useEditorStore((state) => state.hoveredId);

    // Subscribe to elements normally to ensure we have fresh data
    const elements = useEditorStore((state) => state.elements);

    const guides = useMemo(() => {
        if (!isAltPressed || selectedIds.length !== 1 || elements.length === 0) return null;

        const selectedId = selectedIds[0];
        const selected = elements.find(el => el.id === selectedId);
        if (!selected || selected.pageId !== pageId) return null;

        let targetRect: { x: number; y: number; width: number; height: number } | null = null;
        let isPage = false;

        if (hoveredId && hoveredId !== selectedId) {
            const hovered = elements.find(el => el.id === hoveredId);
            if (hovered && hovered.pageId === selected.pageId) {
                targetRect = { x: hovered.x, y: hovered.y, width: hovered.width, height: hovered.height };
            }
        }

        if (!targetRect) {
            targetRect = { x: 0, y: 0, width: 794, height: 1123 }; // A4
            isPage = true;
        }

        const s = {
            l: selected.x,
            t: selected.y,
            r: selected.x + selected.width,
            b: selected.y + selected.height,
            cx: selected.x + selected.width / 2,
            cy: selected.y + selected.height / 2
        };

        const t = {
            l: targetRect.x,
            t: targetRect.y,
            r: targetRect.x + targetRect.width,
            b: targetRect.y + targetRect.height,
            cx: targetRect.x + targetRect.width / 2,
            cy: targetRect.y + targetRect.height / 2
        };

        const drawItems: any[] = [];
        const PINK = '#d946ef';

        if (isPage) {
            // Measure to page edges
            drawItems.push({ type: 'line', x: s.cx, y1: t.t, y2: s.t, val: Math.round(s.t - t.t), color: PINK });
            drawItems.push({ type: 'line', x: s.cx, y1: s.b, y2: t.b, val: Math.round(t.b - s.b), color: PINK });
            drawItems.push({ type: 'line', y: s.cy, x1: t.l, x2: s.l, val: Math.round(s.l - t.l), color: PINK });
            drawItems.push({ type: 'line', y: s.cy, x1: s.r, x2: t.r, val: Math.round(t.r - s.r), color: PINK });
        } else {
            // Element to Element

            // 1. Vertical Distance (measurement line is vertical)
            if (s.b < t.t || t.b < s.t) {
                const isSAbove = s.b < t.t;
                const top = isSAbove ? s.b : t.b;
                const bottom = isSAbove ? t.t : s.t;
                const dist = Math.round(bottom - top);

                // Find a good X position for the vertical measurement line
                // Preferably in the overlap zone, otherwise at an edge
                const overlapL = Math.max(s.l, t.l);
                const overlapR = Math.min(s.r, t.r);
                let xPos;
                if (overlapL < overlapR) {
                    xPos = (overlapL + overlapR) / 2;
                } else {
                    xPos = isSAbove ? (s.r < t.l ? s.r : s.l) : (t.r < s.l ? t.r : t.l);
                }

                drawItems.push({ type: 'line', x: xPos, y1: top, y2: bottom, val: dist, color: PINK });

                // Horizontal dashed extensions if the line doesn't intersect both elements' centers
                if (xPos < s.l || xPos > s.r) {
                    drawItems.push({ type: 'line', style: 'dashed', x1: Math.min(xPos, s.cx), x2: Math.max(xPos, s.cx), y: isSAbove ? s.b : s.t, color: PINK });
                }
                if (xPos < t.l || xPos > t.r) {
                    drawItems.push({ type: 'line', style: 'dashed', x1: Math.min(xPos, t.cx), x2: Math.max(xPos, t.cx), y: isSAbove ? t.t : t.b, color: PINK });
                }
            }

            // 2. Horizontal Distance (measurement line is horizontal)
            if (s.r < t.l || t.r < s.l) {
                const isSLeft = s.r < t.l;
                const left = isSLeft ? s.r : t.r;
                const right = isSLeft ? t.l : s.l;
                const dist = Math.round(right - left);

                const overlapT = Math.max(s.t, t.t);
                const overlapB = Math.min(s.b, t.b);
                let yPos;
                if (overlapT < overlapB) {
                    yPos = (overlapT + overlapB) / 2;
                } else {
                    yPos = isSLeft ? (s.b < t.t ? s.b : s.t) : (t.b < s.t ? t.b : t.t);
                }

                drawItems.push({ type: 'line', y: yPos, x1: left, x2: right, val: dist, color: PINK });

                // Vertical dashed extensions
                if (yPos < s.t || yPos > s.b) {
                    drawItems.push({ type: 'line', style: 'dashed', y1: Math.min(yPos, s.cy), y2: Math.max(yPos, s.cy), x: isSLeft ? s.r : s.l, color: PINK });
                }
                if (yPos < t.t || yPos > t.b) {
                    drawItems.push({ type: 'line', style: 'dashed', y1: Math.min(yPos, t.cy), y2: Math.max(yPos, t.cy), x: isSLeft ? t.l : t.r, color: PINK });
                }
            }
        }

        return { items: drawItems, pageId: selected.pageId };
    }, [isAltPressed, selectedIds, hoveredId, elements, pageId]);

    if (!guides) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible distance-guides">
            {guides.items.filter(item => item.val === undefined || item.val > 0).map((item, i) => (
                <React.Fragment key={i}>
                    {/* Line */}
                    <div
                        style={{
                            position: 'absolute',
                            backgroundColor: item.style === 'dashed' ? 'transparent' : item.color,
                            borderTop: item.style === 'dashed' && (item.x1 !== undefined) ? `1px dashed ${item.color}` : 'none',
                            borderLeft: item.style === 'dashed' && (item.y1 !== undefined) ? `1px dashed ${item.color}` : 'none',
                            left: item.x !== undefined ? item.x : item.x1,
                            top: item.y !== undefined ? item.y : item.y1,
                            width: item.x !== undefined ? (item.style === 'dashed' ? 0 : 1) : (item.x2 - item.x1),
                            height: item.y !== undefined ? (item.style === 'dashed' ? 0 : 1) : (item.y2 - item.y1),
                        }}
                    />
                    {/* Label */}
                    {item.val !== undefined && (
                        <div
                            style={{
                                position: 'absolute',
                                backgroundColor: item.color,
                                color: 'white',
                                fontSize: '12px',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                left: item.x !== undefined ? item.x : (item.x1 + item.x2) / 2,
                                top: item.y !== undefined ? item.y : (item.y1 + item.y2) / 2,
                                transform: 'translate(-50%, -50%)',
                                whiteSpace: 'nowrap',
                                fontWeight: 600,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                zIndex: 1000
                            }}
                        >
                            {item.val}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};
