'use client';

import {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';

import { fragmentShaders, ShaderDisplacementGenerator } from './shader-utils';
import { displacementMap, polarDisplacementMap, prominentDisplacementMap } from './utils';

/* ------------------ utils ------------------ */

const generateShaderDisplacementMap = (w: number, h: number) => {
    const g = new ShaderDisplacementGenerator({
        width: w,
        height: h,
        fragment: fragmentShaders.liquidGlass
    });
    const url = g.updateShader();
    g.destroy();
    return url;
};

const getMap = (mode: any, shader?: string) => {
    if (mode === 'polar') return polarDisplacementMap;
    if (mode === 'prominent') return prominentDisplacementMap;
    if (mode === 'shader') return shader || displacementMap;
    return displacementMap;
};

/* ------------------ SVG filter ------------------ */

const GlassFilter = ({
    id,
    displacementScale,
    width,
    height,
    mode,
    shaderMapUrl
}: any) => (
    <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', visibility: 'hidden' }}>
        <defs>
            <filter id={id} colorInterpolationFilters="sRGB">
                <feImage
                    href={getMap(mode, shaderMapUrl)}
                    result="map"
                    width="100%"
                    height="100%"
                />

                <feDisplacementMap
                    in="SourceGraphic"
                    in2="map"
                    scale={displacementScale}
                    xChannelSelector="R"
                    yChannelSelector="B"
                />
            </filter>
        </defs>
    </svg>
);

/* ------------------ container ------------------ */

const GlassContainer = forwardRef<any, any>(
    (
        {
            children,
            displacementScale = 12,
            blurAmount = 8,
            saturation = 120,
            cornerRadius = 999,
            padding = '24px 32px',
            glassSize,
            mode,
            isReady,
            isScrolling
        },
        ref
    ) => {
        const id = useId();
        const [shaderMapUrl, setShaderMapUrl] = useState('');

        useEffect(() => {
            if (mode === 'shader' && glassSize.width > 0) {
                // Optimization: Delay shader generation
                const timer = setTimeout(() => {
                    setShaderMapUrl(
                        generateShaderDisplacementMap(glassSize.width, glassSize.height)
                    );
                }, 100);
                return () => clearTimeout(timer);
            }
        }, [mode, glassSize]);

        const hasDisplacement = displacementScale > 0;
        const showFilter = hasDisplacement && isReady;

        return (
            <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%' }}>
                {showFilter && (
                    <GlassFilter
                        id={id}
                        displacementScale={displacementScale}
                        width={glassSize.width}
                        height={glassSize.height}
                        mode={mode}
                        shaderMapUrl={shaderMapUrl}
                    />
                )}

                {/* Glass background */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: cornerRadius,
                        backdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
                        filter: showFilter ? `url(#${id})` : 'none',
                        transform: 'translateZ(0)',
                        willChange: 'backdrop-filter',
                        zIndex: 0,
                        pointerEvents: 'none'
                    }}
                />

                <div
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        padding,
                        borderRadius: cornerRadius,
                        overflow: 'visible',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    {children}
                </div>
            </div>
        );
    }
);

GlassContainer.displayName = 'GlassContainer';

/* ------------------ main ------------------ */

export default function LiquidGlass({
    children,
    elasticity = 0.15,
    cornerRadius = 999,
    padding = '24px 32px',
    mode = 'standard',
    className = '',
    style = {},
    displacementScale = 12,
    blurAmount = 8,
    saturation = 120,
    // Filter out custom props to prevent DOM leakage warnings
    centered,
    compact,
    overLight,
    ...props
}: any) {
    const ref = useRef<HTMLDivElement>(null);

    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const [ready, setReady] = useState(false);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [isScrolling, setIsScrolling] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const rectRef = useRef<DOMRect | null>(null);

    /* ---------- detect scroll ---------- */

    useEffect(() => {
        let timeout: any;

        const onScroll = () => {
            setIsScrolling(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => setIsScrolling(false), 150);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ---------- cache rect ---------- */

    const updateRect = useCallback(() => {
        if (!ref.current) return;
        rectRef.current = ref.current.getBoundingClientRect();
        setSize({ width: rectRef.current.width, height: rectRef.current.height });
    }, []);

    useEffect(() => {
        updateRect();
        const resizeObserver = new ResizeObserver(() => updateRect());
        if (ref.current) resizeObserver.observe(ref.current);

        window.addEventListener('scroll', updateRect, { passive: true });
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('scroll', updateRect);
        };
    }, [updateRect]);

    /* ---------- throttled mouse ---------- */

    useEffect(() => {
        let ticking = false;

        const onMove = (e: MouseEvent) => {
            if (isMobile) return;
            if (!hovered && !active) return;
            if (!rectRef.current || !ref.current) return;

            if (!ticking) {
                requestAnimationFrame(() => {
                    const r = rectRef.current!;
                    const cx = r.left + r.width / 2;
                    const cy = r.top + r.height / 2;

                    const dx = (e.clientX - cx) * elasticity * 0.05;
                    const dy = (e.clientY - cy) * elasticity * 0.05;

                    if (ref.current) {
                        ref.current.style.transform =
                            `translate(${dx}px, ${dy}px) scale(${active ? 0.98 : 1})`;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [hovered, active, elasticity]);

    /* ---------- init size ---------- */

    useEffect(() => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setSize({ width: r.width, height: r.height });
        setReady(true);
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            style={{
                position: 'relative',
                willChange: 'transform',
                transform: 'translateZ(0)',
                overflow: 'visible',
                ...style
            }}
            {...props}
        >
            <GlassContainer
                glassSize={size}
                cornerRadius={cornerRadius}
                padding={padding}
                mode={isMobile ? 'standard' : mode}
                isReady={ready}
                isScrolling={isScrolling}
                displacementScale={isMobile ? 0 : displacementScale}
                blurAmount={blurAmount}
                saturation={saturation}
            >
                {children}
            </GlassContainer>
        </div >
    );
}
