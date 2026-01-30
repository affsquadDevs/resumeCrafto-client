import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface Page {
    id: string;
    order: number;
}

export interface EditorElement {
    id: string;
    pageId: string; // Add pageId
    type: 'text' | 'shape' | 'image' | 'star' | 'icon';
    x: number;
    y: number;
    width: number;
    height: number;
    content?: string;
    src?: string; // For images
    styles: Record<string, any>;
    locked?: boolean;
    groupId?: string;
}

interface HistoryState {
    pages: Page[];
    elements: EditorElement[];
    activePageId: string;
}

interface EditorState {
    pages: Page[];
    activePageId: string;
    elements: EditorElement[];
    selectedIds: string[];
    zoom: number;
    // History
    past: HistoryState[];
    future: HistoryState[];
    undo: () => void;
    redo: () => void;
    saveHistory: () => void;

    addPage: () => void;
    removePage: (id: string) => void;
    setActivePage: (id: string) => void;
    addElement: (type: 'text' | 'shape' | 'image' | 'star' | 'icon', payload?: any) => void;
    updateElement: (id: string, updates: Partial<EditorElement>) => void;
    selectElement: (id: string | null) => void;
    toggleSelection: (id: string) => void;
    setSelection: (ids: string[]) => void;
    deleteElement: (id: string) => void;
    setZoom: (zoom: number) => void;
    bringToFront: (id: string) => void;
    sendToBack: (id: string) => void;
    moveSelectedElements: (dx: number, dy: number) => void;
    reorderElements: (activeId: string, overId: string) => void;
    deleteSelectedElements: () => void;
    resizeSelectedElements: (dw: number, dh: number) => void;
    loadTemplate: (elements: EditorElement[]) => void;
    hoveredId: string | null;
    setHoveredId: (id: string | null) => void;
    isAltPressed: boolean;
    setAltPressed: (pressed: boolean) => void;
    toggleLock: (id: string) => void;
    duplicateElement: (id: string) => void;
    clipboard: EditorElement[];
    copySelectedElements: () => void;
    pasteElements: () => void;
    groupSelected: () => void;
    ungroupSelected: () => void;
    mobileActivePanel: 'design' | 'elements' | 'icons' | 'layers' | null;
    setMobileActivePanel: (panel: 'design' | 'elements' | 'icons' | 'layers' | null) => void;

    // Resume Identity
    resumeId: string | null;
    resumeName: string;
    setResumeInfo: (id: string | null, name: string) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
    pages: [{ id: 'page-1', order: 0 }],
    activePageId: 'page-1',
    elements: [],
    selectedIds: [],
    zoom: 1,
    hoveredId: null,
    past: [],
    future: [],
    clipboard: [],
    mobileActivePanel: null,
    setMobileActivePanel: (panel) => set({ mobileActivePanel: panel }),

    resumeId: null,
    resumeName: 'Untitled Resume',
    setResumeInfo: (id, name) => set({ resumeId: id, resumeName: name }),

    saveHistory: () => {
        const { pages, elements, activePageId, past } = get();
        const currentSnapshot: HistoryState = {
            pages: JSON.parse(JSON.stringify(pages)),
            elements: JSON.parse(JSON.stringify(elements)),
            activePageId
        };

        // Avoid duplicate snapshots
        if (past.length > 0) {
            const last = past[0];
            const isSame = JSON.stringify(last.elements) === JSON.stringify(currentSnapshot.elements) &&
                JSON.stringify(last.pages) === JSON.stringify(currentSnapshot.pages) &&
                last.activePageId === currentSnapshot.activePageId;
            if (isSame) return;
        }

        set({
            past: [currentSnapshot, ...past].slice(0, 20),
            future: []
        });
    },

    undo: () => {
        const { past, future, pages, elements, activePageId } = get();
        if (past.length === 0) return;

        const previous = past[0];
        const newPast = past.slice(1);
        const current: HistoryState = {
            pages: JSON.parse(JSON.stringify(pages)),
            elements: JSON.parse(JSON.stringify(elements)),
            activePageId
        };

        set({
            ...previous,
            past: newPast,
            future: [current, ...future].slice(0, 20),
            selectedIds: []
        });
    },

    redo: () => {
        const { past, future, pages, elements, activePageId } = get();
        if (future.length === 0) return;

        const next = future[0];
        const newFuture = future.slice(1);
        const current: HistoryState = {
            pages: JSON.parse(JSON.stringify(pages)),
            elements: JSON.parse(JSON.stringify(elements)),
            activePageId
        };

        set({
            ...next,
            future: newFuture,
            past: [current, ...past].slice(0, 20),
            selectedIds: []
        });
    },

    setHoveredId: (id) => set({ hoveredId: id }),
    isAltPressed: false,
    setAltPressed: (pressed) => set({ isAltPressed: pressed }),
    addPage: () => set((state) => {
        // Capture snapshot before change
        const snapshot = {
            pages: JSON.parse(JSON.stringify(state.pages)),
            elements: JSON.parse(JSON.stringify(state.elements)),
            activePageId: state.activePageId
        };
        const newPageId = uuidv4();
        return {
            past: [snapshot, ...state.past].slice(0, 20),
            future: [],
            pages: [...state.pages, { id: newPageId, order: state.pages.length }],
            activePageId: newPageId
        };
    }),
    removePage: (id) => set((state) => {
        if (state.pages.length <= 1) return {};
        const snapshot = {
            pages: JSON.parse(JSON.stringify(state.pages)),
            elements: JSON.parse(JSON.stringify(state.elements)),
            activePageId: state.activePageId
        };
        const newPages = state.pages.filter(p => p.id !== id);
        return {
            past: [snapshot, ...state.past].slice(0, 20),
            future: [],
            pages: newPages,
            activePageId: state.activePageId === id ? newPages[0].id : state.activePageId,
            elements: state.elements.filter(el => el.pageId !== id)
        };
    }),
    setActivePage: (id) => set({ activePageId: id }),
    addElement: (type, payload) =>
        set((state) => {
            const snapshot = {
                pages: JSON.parse(JSON.stringify(state.pages)),
                elements: JSON.parse(JSON.stringify(state.elements)),
                activePageId: state.activePageId
            };
            const pageId = state.activePageId;
            const newElement: EditorElement = {
                id: uuidv4(),
                pageId,
                type,
                x: 100,
                y: 100,
                width: type === 'text' ? 200 : type === 'icon' ? 40 : 100,
                height: type === 'text' ? 50 : type === 'icon' ? 40 : 100,
                content: type === 'text' ? 'Double click to edit' : undefined,
                styles: {
                    backgroundColor: (type === 'shape' || type === 'star' || type === 'icon') ? '#3b82f6' : 'transparent',
                    color: '#000000',
                    fontSize: '16px',
                    fontWeight: 'normal',
                    textAlign: 'left',
                    borderRadius: type === 'shape' && payload?.shapeType === 'circle' ? '50%' : '0px',
                    zIndex: state.elements.length + 1,
                    ...payload?.styles
                },
                ...payload
            };
            return {
                past: [snapshot, ...state.past].slice(0, 20),
                future: [],
                elements: [...state.elements, newElement],
                selectedIds: [newElement.id]
            };
        }),
    updateElement: (id, updates) =>
        set((state) => ({
            elements: state.elements.map((el) => {
                if (el.id === id && el.locked && !updates.locked) return el; // Prevent updates if locked unless unlocking
                return el.id === id ? { ...el, ...updates } : el;
            }),
        })),
    selectElement: (id) => set({ selectedIds: id ? [id] : [] }),
    toggleSelection: (id) =>
        set((state) => {
            if (state.selectedIds.includes(id)) {
                return { selectedIds: state.selectedIds.filter((item) => item !== id) };
            } else {
                return { selectedIds: [...state.selectedIds, id] };
            }
        }),
    setSelection: (ids) => set({ selectedIds: ids }),
    deleteElement: (id) =>
        set((state) => {
            const snapshot = {
                pages: JSON.parse(JSON.stringify(state.pages)),
                elements: JSON.parse(JSON.stringify(state.elements)),
                activePageId: state.activePageId
            };
            return {
                past: [snapshot, ...state.past].slice(0, 20),
                future: [],
                elements: state.elements.filter((el) => el.id !== id),
                selectedIds: state.selectedIds.filter((selectedId) => selectedId !== id),
            }
        }),
    setZoom: (zoom) => set({ zoom }),
    bringToFront: (id) =>
        set((state) => {
            const snapshot = {
                pages: JSON.parse(JSON.stringify(state.pages)),
                elements: JSON.parse(JSON.stringify(state.elements)),
                activePageId: state.activePageId
            };
            const maxZ = Math.max(...state.elements.map(e => e.styles.zIndex || 0), 0);
            return {
                past: [snapshot, ...state.past].slice(0, 20),
                future: [],
                elements: state.elements.map(el => el.id === id ? { ...el, styles: { ...el.styles, zIndex: maxZ + 1 } } : el)
            }
        }),
    sendToBack: (id) =>
        set((state) => {
            const snapshot = {
                pages: JSON.parse(JSON.stringify(state.pages)),
                elements: JSON.parse(JSON.stringify(state.elements)),
                activePageId: state.activePageId
            };
            const minZ = Math.min(...state.elements.map(e => e.styles.zIndex || 0), 0);
            return {
                past: [snapshot, ...state.past].slice(0, 20),
                future: [],
                elements: state.elements.map(el => el.id === id ? { ...el, styles: { ...el.styles, zIndex: minZ - 1 } } : el)
            }
        }),
    moveSelectedElements: (dx, dy) =>
        set((state) => ({
            elements: state.elements.map((el) => {
                if (state.selectedIds.includes(el.id)) {
                    return { ...el, x: el.x + dx, y: el.y + dy };
                }
                return el;
            })
        })),
    deleteSelectedElements: () =>
        set((state) => {
            const snapshot = {
                pages: JSON.parse(JSON.stringify(state.pages)),
                elements: JSON.parse(JSON.stringify(state.elements)),
                activePageId: state.activePageId
            };
            return {
                past: [snapshot, ...state.past].slice(0, 20),
                future: [],
                elements: state.elements.filter(el => !state.selectedIds.includes(el.id)),
                selectedIds: []
            }
        }),
    resizeSelectedElements: (dw, dh) =>
        set((state) => ({
            elements: state.elements.map(el => {
                if (state.selectedIds.includes(el.id)) {
                    return {
                        ...el,
                        width: Math.max(1, el.width + dw),
                        height: Math.max(1, el.height + dh)
                    };
                }
                return el;
            })
        })),
    loadTemplate: (templateElements) =>
        set((state) => {
            const snapshot = {
                pages: JSON.parse(JSON.stringify(state.pages)),
                elements: JSON.parse(JSON.stringify(state.elements)),
                activePageId: state.activePageId
            };

            // Reset to page-1 for templates
            const pages = [{ id: 'page-1', order: 0 }];
            const activePageId = 'page-1';

            const newElements = templateElements.map(el => ({
                ...JSON.parse(JSON.stringify(el)),
                id: uuidv4(),
                pageId: activePageId,
                styles: el.styles || {}
            }));

            return {
                past: [snapshot, ...state.past].slice(0, 20),
                future: [],
                elements: newElements,
                selectedIds: [],
                pages,
                activePageId,
                resumeId: null, // Reset identity when loading template
                resumeName: 'Untitled Resume'
            };
        }),
    reorderElements: (activeId: string, overId: string) =>
        set((state) => {
            const snapshot = {
                pages: JSON.parse(JSON.stringify(state.pages)),
                elements: JSON.parse(JSON.stringify(state.elements)),
                activePageId: state.activePageId
            };
            // 1. Sort current elements by z-index to get the visual order
            const sorted = [...state.elements].sort((a, b) => (a.styles.zIndex || 0) - (b.styles.zIndex || 0));

            // 2. Find indices in this sorted array
            const oldIndex = sorted.findIndex((el) => el.id === activeId);
            const newIndex = sorted.findIndex((el) => el.id === overId);

            if (oldIndex === -1 || newIndex === -1) return {};

            // 3. Move the item locally
            const [movedItem] = sorted.splice(oldIndex, 1);
            sorted.splice(newIndex, 0, movedItem);

            // 4. Re-assign z-indexes based on new order (0 to N)
            // We want higher index = on top.
            // visual list in LayersPanel usually puts Top element first.
            // If LayersPanel displays [Top, ..., Bottom], then dragging Top to Bottom means decreasing z-index.
            // My default sort in LayersPanel was `zB - zA` (Descending).
            // So index 0 is Top (Max Z).

            // Let's assume the incoming IDs depend on the list direction.
            // If we use dnd-kit on the list [Top, Middle, Bottom], and we drag Top to Bottom (over Bottom).
            // The new list is [Middle, Bottom, Top].
            // If we assign z-indexes based on this list:
            // Middle -> z=0? No.

            // Wait, standard z-index: Higher is Top.
            // Layers Panel List usually shows Top element at the TOP of the list.
            // So List Index 0 = Highest Z-Index.

            // If `sorted` here is Ascending (a - b) -> Index 0 is Bottom (Min Z).
            // This is safer for math: Z-Index = Array Index + 1.

            // So if I have Bottom (z=1), Top (z=2). Sorted Asc: [Bottom, Top].
            // Layers Panel shows: Top (z=2), Bottom (z=1).
            // If I drag Top in Layers Panel (Index 0) to below Bottom (Index 1).
            // I want new order: Bottom, Top? No. I want Top to be below Bottom.
            // So visual: Bottom, Top.
            // Real Order (Z-Index): Bottom (z=2), Top (z=1).

            // This bidirectional mapping is confusing.
            // Let's stick to: The STORE keeps truth. `reorderElements` receives `activeId` and `overId` from the UI.
            // The UI list is sorted Descending (Max Z first).
            // So `arrayMove` in UI logic happens on Descending list.

            // Let's replicate the UI sort here to apply the move, then re-normalize.
            const descending = [...state.elements].sort((a, b) => (b.styles.zIndex || 0) - (a.styles.zIndex || 0));

            const fromIndex = descending.findIndex(el => el.id === activeId);
            const toIndex = descending.findIndex(el => el.id === overId);

            if (fromIndex === -1 || toIndex === -1) return {};

            // Move in descending array
            const [item] = descending.splice(fromIndex, 1);
            descending.splice(toIndex, 0, item);

            // Now `descending` is the new desired visual order (Index 0 = Top = Max Z).
            // So assign Z-indexes: Length - Index.
            // e.g. Length 3. Index 0 gets z=3. Index 2 gets z=1.

            return {
                past: [snapshot, ...state.past].slice(0, 20),
                future: [],
                elements: state.elements.map(el => {
                    const newRank = descending.findIndex(d => d.id === el.id);
                    return {
                        ...el,
                        styles: {
                            ...el.styles,
                            zIndex: descending.length - newRank
                        }
                    };
                })
            };
        }),

    toggleLock: (id) => set((state) => {
        const snapshot = {
            pages: JSON.parse(JSON.stringify(state.pages)),
            elements: JSON.parse(JSON.stringify(state.elements)),
            activePageId: state.activePageId
        };
        return {
            past: [snapshot, ...state.past].slice(0, 20),
            future: [],
            elements: state.elements.map(el =>
                el.id === id ? { ...el, locked: !el.locked } : el
            )
        };
    }),

    duplicateElement: (id) => set((state) => {
        const element = state.elements.find(el => el.id === id);
        if (!element) return {};

        const snapshot = {
            pages: JSON.parse(JSON.stringify(state.pages)),
            elements: JSON.parse(JSON.stringify(state.elements)),
            activePageId: state.activePageId
        };

        const newElement: EditorElement = {
            ...JSON.parse(JSON.stringify(element)),
            id: uuidv4(),
            x: element.x + 20,
            y: element.y + 20,
            styles: {
                ...element.styles,
                zIndex: Math.max(...state.elements.map(e => e.styles.zIndex || 0), 0) + 1
            }
        };

        return {
            past: [snapshot, ...state.past].slice(0, 20),
            future: [],
            elements: [...state.elements, newElement],
            selectedIds: [newElement.id]
        };
    }),

    copySelectedElements: () => {
        const { elements, selectedIds } = get();
        const selected = elements.filter(el => selectedIds.includes(el.id));
        if (selected.length === 0) return;

        set({ clipboard: JSON.parse(JSON.stringify(selected)) });
    },

    pasteElements: () => {
        const { clipboard, elements, activePageId } = get();
        if (clipboard.length === 0) return;

        get().saveHistory();

        const maxZ = Math.max(...elements.map(e => e.styles.zIndex || 0), 0);

        const newElements = clipboard.map((el, index) => ({
            ...JSON.parse(JSON.stringify(el)),
            id: uuidv4(),
            pageId: activePageId, // Paste into current active page
            x: el.x + 20,
            y: el.y + 20,
            styles: {
                ...el.styles,
                zIndex: maxZ + index + 1
            }
        }));

        set({
            elements: [...elements, ...newElements],
            selectedIds: newElements.map(el => el.id)
        });
    },

    groupSelected: () => {
        const { selectedIds, elements } = get();
        if (selectedIds.length <= 1) return;

        get().saveHistory();

        const newGroupId = uuidv4();

        set({
            elements: elements.map(el =>
                selectedIds.includes(el.id)
                    ? { ...el, groupId: newGroupId }
                    : el
            )
        });
    },

    ungroupSelected: () => {
        const { selectedIds, elements } = get();
        if (selectedIds.length === 0) return;

        get().saveHistory();

        // Find all group IDs present in the current selection
        const groupIdsToClear = new Set(
            elements
                .filter(el => selectedIds.includes(el.id) && el.groupId)
                .map(el => el.groupId as string)
        );

        if (groupIdsToClear.size === 0) return;

        set({
            elements: elements.map(el =>
                el.groupId && groupIdsToClear.has(el.groupId)
                    ? { ...el, groupId: undefined }
                    : el
            )
        });
    }
}));
