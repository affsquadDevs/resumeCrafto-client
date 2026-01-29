import { useEditorStore } from '@/store/useEditorStore';
import { Trash2, Palette, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Group, Ungroup } from 'lucide-react';

export const Toolbar = () => {
    const selectedIds = useEditorStore((state) => state.selectedIds);
    const elements = useEditorStore((state) => state.elements);
    const updateElement = useEditorStore((state) => state.updateElement);
    const deleteSelectedElements = useEditorStore((state) => state.deleteSelectedElements);
    const saveHistory = useEditorStore((state) => state.saveHistory);
    const groupSelected = useEditorStore((state) => state.groupSelected);
    const ungroupSelected = useEditorStore((state) => state.ungroupSelected);

    const selectedElements = elements.filter((el) => selectedIds.includes(el.id));
    const firstSelected = selectedElements[0];
    const isMultiSelect = selectedIds.length > 1;

    if (!firstSelected) {
        return (
            <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 text-sm text-gray-500">
                Select an element to edit
            </div>
        );
    }

    const handleChange = (key: string, value: any) => {
        saveHistory();
        selectedIds.forEach(id => {
            const el = elements.find(e => e.id === id);
            if (el) {
                updateElement(id, {
                    styles: {
                        ...el.styles,
                        [key]: value,
                    },
                });
            }
        });
    };

    const handleDelete = () => {
        deleteSelectedElements();
    };

    return (
        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
                <span className="text-xs font-semibold text-gray-500 uppercase">
                    {isMultiSelect ? `${selectedIds.length} items` : firstSelected.type}
                </span>
            </div>

            {/* Grouping Actions */}
            {isMultiSelect && (
                <div className="flex items-center gap-1 border-r border-gray-200 pr-4">
                    <button onClick={groupSelected} className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded text-sm">
                        <Group size={16} /> Group
                    </button>
                </div>
            )}

            {/* Ungroup - show if any selected item is part of a group */}
            {selectedElements.some(el => el.groupId) && (
                <div className="flex items-center gap-1 border-r border-gray-200 pr-4">
                    <button onClick={ungroupSelected} className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded text-sm">
                        <Ungroup size={16} /> Ungroup
                    </button>
                </div>
            )}

            {/* Color Picker (Simplified as presets for now) */}
            <div className="flex items-center gap-2">
                <Palette size={18} className="text-gray-600" />
                <div className="flex gap-1">
                    {['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#000000', '#ffffff'].map((color) => (
                        <button
                            key={color}
                            className="w-6 h-6 rounded-full border border-gray-300 shadow-sm hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => handleChange(firstSelected.type === 'text' ? 'color' : 'backgroundColor', color)}
                        />
                    ))}
                </div>
            </div>

            <div className="w-px h-6 bg-gray-200 mx-2" />

            {firstSelected.type === 'text' && (
                <>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={parseInt(firstSelected.styles.fontSize) || 16}
                            onChange={(e) => handleChange('fontSize', `${e.target.value}px`)}
                            className="w-16 h-8 border border-gray-300 rounded px-2 text-sm"
                        />
                        <span className="text-sm text-gray-500">px</span>
                    </div>

                    <div className="flex items-center gap-1 bg-gray-100 rounded p-1">
                        <button
                            onClick={() => handleChange('fontWeight', firstSelected.styles.fontWeight === 'bold' ? 'normal' : 'bold')}
                            className={`p-1 rounded hover:bg-white ${firstSelected.styles.fontWeight === 'bold' ? 'bg-white shadow-sm' : ''}`}
                        >
                            <Bold size={16} />
                        </button>
                        <button
                            onClick={() => handleChange('fontStyle', firstSelected.styles.fontStyle === 'italic' ? 'normal' : 'italic')}
                            className={`p-1 rounded hover:bg-white ${firstSelected.styles.fontStyle === 'italic' ? 'bg-white shadow-sm' : ''}`}
                        >
                            <Italic size={16} />
                        </button>
                    </div>

                    <div className="flex items-center gap-1 bg-gray-100 rounded p-1">
                        <button onClick={() => handleChange('textAlign', 'left')} className={`p-1 rounded hover:bg-white ${firstSelected.styles.textAlign === 'left' ? 'bg-white shadow-sm' : ''}`}><AlignLeft size={16} /></button>
                        <button onClick={() => handleChange('textAlign', 'center')} className={`p-1 rounded hover:bg-white ${firstSelected.styles.textAlign === 'center' ? 'bg-white shadow-sm' : ''}`}><AlignCenter size={16} /></button>
                        <button onClick={() => handleChange('textAlign', 'right')} className={`p-1 rounded hover:bg-white ${firstSelected.styles.textAlign === 'right' ? 'bg-white shadow-sm' : ''}`}><AlignRight size={16} /></button>
                    </div>
                </>
            )}

            {firstSelected.type === 'shape' && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Radius:</span>
                    <input
                        type="number"
                        value={parseInt(firstSelected.styles.borderRadius) || 0}
                        onChange={(e) => handleChange('borderRadius', `${e.target.value}px`)}
                        className="w-16 h-8 border border-gray-300 rounded px-2 text-sm"
                    />
                </div>
            )}

            <div className="flex-1" /> {/* Spacer */}

            <button
                onClick={handleDelete}
                className="flex items-center justify-center p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Delete Element"
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
};
