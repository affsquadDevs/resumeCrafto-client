import React, { useState, useRef, useLayoutEffect } from 'react';
import { EditorElement } from '@/store/useEditorStore';

interface TemplatePreviewProps {
    elements: Partial<EditorElement>[];
    className?: string;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ elements, className = "" }) => {
    const INTERNAL_WIDTH = 794;
    const [scale, setScale] = useState(0.15);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const width = entry.contentRect.width;
                if (width > 0) {
                    setScale(width / INTERNAL_WIDTH);
                }
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative bg-white overflow-hidden ${className}`}
            style={{
                aspectRatio: '1 / 1.414',
                width: '100%'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: INTERNAL_WIDTH,
                    // We don't strictly need height here if we scale, but for absolute children it's good
                    height: 1123,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                }}
            >
                {elements
                    .sort((a, b) => (a.styles?.zIndex || 0) - (b.styles?.zIndex || 0))
                    .map((el, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                left: el.x,
                                top: el.y,
                                width: el.width,
                                height: el.height,
                                backgroundColor: (el.styles as any)?.backgroundColor || 'transparent',
                                border: (el.styles as any)?.border || 'none',
                                borderRadius: (el.styles as any)?.borderRadius || '0',
                                color: (el.styles as any)?.color || '#000',
                                fontSize: (el.styles as any)?.fontSize || '12px',
                                fontWeight: (el.styles as any)?.fontWeight || 'normal',
                                textAlign: (el.styles as any)?.textAlign as any || 'left',
                                fontFamily: (el.styles as any)?.fontFamily || 'sans-serif',
                                lineHeight: (el.styles as any)?.lineHeight || 'normal',
                                letterSpacing: (el.styles as any)?.letterSpacing || 'normal',
                                fontStyle: (el.styles as any)?.fontStyle || 'normal',
                                zIndex: (el.styles as any)?.zIndex || 0,
                                whiteSpace: 'pre-wrap',
                                overflow: 'hidden',
                                display: 'flex',
                            }}
                        >
                            {el.type === 'text' && (
                                <div style={{ width: '100%', pointerEvents: 'none' }}>
                                    {el.content}
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};
