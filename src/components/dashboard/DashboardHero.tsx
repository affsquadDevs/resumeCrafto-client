import React, { memo } from 'react';
import Link from 'next/link';
import { Plus, Sparkles, Settings2, Share2, Download, CircleUser } from 'lucide-react';

const ToolbarButton = memo(({ icon: Icon }: { icon: any }) => (
    <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
        <Icon size={14} />
    </div>
));

const CanvasBlock = memo(
    ({ height, width = 'full', className }: { height: string; width?: string; className?: string }) => {
        // Tailwind won't pick up dynamic class strings like `w-${width}`
        // So we map common values or use inline styles for numbers
        const isFraction = width.includes('/');
        const hValue = isNaN(Number(height)) ? height : `${parseInt(height) * 4}px`;
        const wValue = isFraction ? (width === 'full' ? '100%' : `${(eval(width) * 100)}%`) : (width === 'full' ? '100%' : `${parseInt(width) * 4}px`);

        return (
            <div
                className={`rounded ${className || ''}`}
                style={{
                    height: isNaN(Number(height)) ? undefined : hValue,
                    width: isFraction ? wValue : (width === 'full' ? '100%' : (isNaN(Number(width)) ? undefined : wValue))
                }}
            />
        );
    }
);

// Simpler CanvasBlock for common classes to avoid style overhead if possible
const CanvasPulse = memo(({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <div className={`rounded ${className}`} style={style} />
));

const Toolbar = memo(() => (
    <div className="h-10 border-b w-full mb-8 border-white/10 flex items-center px-4 gap-2 bg-white/5">
        <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="ml-auto flex gap-1 text-white/30 items-center">
            <ToolbarButton icon={CircleUser} />
            <ToolbarButton icon={Settings2} />
            <ToolbarButton icon={Share2} />
            <ToolbarButton icon={Download} />
        </div>
    </div>
));

const ExportBadge = memo(() => (
    <div className="absolute -bottom-4 -left-4 bg-gray-900/90 border border-white/10 p-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce z-20">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
            <Download size={20} className="text-white" />
        </div>
        <div className="whitespace-nowrap">
            <div className="text-[10px] text-white/50 font-bold">EXPORT</div>
            <div className="text-sm font-bold text-white leading-tight">PDF Ready</div>
        </div>
    </div>
));

const RightPanel = memo(() => (
    <div className="hidden lg:block relative [perspective:900px] group/card pl-10">
        <div className="relative w-full aspect-[4/3] [transform:rotateY(-10deg)_rotateX(4deg)] group-hover/card:[transform:rotateY(-6deg)_rotateX(2deg)] transition-all duration-500 will-change-transform">

            {/* Blob lighter */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-purple-500/20 blur-[16px] rounded-full pointer-events-none" />

            {/* Window */}
            <div className="absolute items-center inset-4 rounded-xl bg-gray-900/50 backdrop-blur-md border border-white/20 shadow-xl flex flex-col overflow-hidden">
                <Toolbar />

                {/* Canvas */}
                <div className="relative w-[340px] aspect-[1/1.414] bg-white text-gray-800 rounded-sm shadow-xl p-5 flex flex-col gap-4 transition-transform group-hover/card:scale-[1.02]">
                    {/* Header */}
                    <div className="flex gap-3 border-b border-gray-200 pb-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex-shrink-0" />
                        <div className="flex-1 space-y-2 py-1">
                            <div className="w-1/2 h-3 bg-gray-900 rounded" />
                            <div className="w-1/3 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded" />
                            <div className="w-2/3 h-2 bg-gray-100 rounded" />
                        </div>
                    </div>

                    {/* Columns */}
                    <div className="flex gap-4 flex-1 overflow-hidden">
                        {/* Left */}
                        <div className="w-1/3 space-y-3">
                            <div className="h-3 w-2/3 bg-gray-800 rounded" />
                            <div className="h-20 bg-purple-50/50 rounded" />
                            <div className="flex-1 bg-stripe-light rounded min-h-[100px]" />
                        </div>

                        {/* Right */}
                        <div className="flex-1 space-y-3 flex flex-col">
                            <div className="h-3 w-1/3 bg-gray-800 rounded" />
                            <div className="h-20 bg-gray-50 rounded" />
                            <div className="flex gap-2 h-24">
                                <div className="flex-1 bg-stripe-gray rounded" />
                                <div className="flex-1 bg-stripe-gray rounded" />
                            </div>
                            <div className="flex-1 bg-gray-50 rounded" />
                        </div>
                    </div>

                    {/* paper shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent pointer-events-none" />
                </div>
            </div>

            <ExportBadge />
        </div>
    </div>
));

export const DashboardHero = () => {
    return (
        <section className="px-0 py-4 md:px-6 md:py-6 lg:px-10 lg:py-8">
            <div className="relative rounded-none md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 p-8 md:p-12 lg:p-20 shadow-2xl shadow-purple-900/40 text-white">

                {/* Background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)] pointer-events-none" />

                <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    {/* LEFT */}
                    <div className="max-w-2xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs md:text-sm text-purple-200 mb-6">
                            <Sparkles size={14} className="text-yellow-300" />
                            New Generation Editor
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                            Create your next
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-pink-200">
                                Perfect Document.
                            </span>
                        </h2>

                        <p className="text-base md:text-lg lg:text-xl text-purple-100/80 mb-10 max-w-lg mx-auto md:ml-0 font-medium leading-relaxed">
                            Powerful PDF & Resume editor with drag-and-drop simplicity.
                            Build stunning documents in minutes.
                        </p>

                        <Link
                            href="/editor"
                            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-purple-950 rounded-2xl font-bold hover:shadow-xl hover:shadow-white/20 transition-all active:scale-[0.98] w-full sm:w-auto"
                        >
                            <Plus size={22} className="text-purple-600 transition-transform group-hover:rotate-90" />
                            Create New Design
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <RightPanel />
                </div>
            </div>
        </section>
    );
};
