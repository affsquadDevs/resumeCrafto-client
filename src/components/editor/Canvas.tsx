import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { DraggableItem } from './DraggableItem';
import { DistanceGuides } from './DistanceGuides';

export const Canvas = () => {
    const pages = useEditorStore((state) => state.pages);
    const addPage = useEditorStore((state) => state.addPage);
    const setActivePage = useEditorStore((state) => state.setActivePage);
    const activePageId = useEditorStore((state) => state.activePageId);

    return (
        <div id="canvas-content" className="flex flex-col gap-8 pb-32 items-center">
            {pages.map((page) => (
                <div
                    key={page.id}
                    className={`resume-page relative bg-white shadow-lg transition-shadow ${activePageId === page.id ? 'ring-2 ring-blue-500 ring-offset-4 ring-offset-gray-100' : ''}`}
                    style={{
                        width: '794px', // A4 width in px
                        height: '1123px', // A4 height in px
                        overflow: 'hidden',
                    }}
                    onClick={() => setActivePage(page.id)}
                    data-page-id={page.id}
                >
                    <PageElements pageId={page.id} />
                    <DistanceGuides pageId={page.id} />

                    {/* Page Number Indicator */}
                    <div className="absolute -left-12 top-0 text-gray-400 font-medium text-sm">
                        Page {page.order + 1}
                    </div>
                </div>
            ))}

            {/* Add Page Button */}
            <button
                onClick={addPage}
                className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-full shadow-sm border border-gray-200 transition-all hover:shadow-md"
            >
                <span>+ Add Page</span>
            </button>
        </div>
    );
};

const PageElements = React.memo(({ pageId }: { pageId: string }) => {
    // Select only IDs for this page to minimize renders
    const elementIds = useEditorStore((state) =>
        state.elements
            .filter(el => el.pageId === pageId)
            .map(el => el.id)
            .join(',') // Join to string for identity check
    ).split(',').filter(id => id !== '');

    return (
        <>
            {elementIds.map((id) => (
                <DraggableItem key={id} id={id} />
            ))}
        </>
    );
});
PageElements.displayName = 'PageElements';
