import { FileText, Plus } from 'lucide-react';
import { EditorElement } from '@/store/useEditorStore';
import { TemplatePreview } from '@/components/editor/TemplatePreview';

interface DesignCardProps {
    title: string;
    date: string;
    preview?: string;
    onClick?: () => void;
    isCreateNew?: boolean;
    templateElements?: Partial<EditorElement>[];
}

export const DesignCard = ({
    title,
    date,
    preview,
    onClick,
    isCreateNew,
    templateElements
}: DesignCardProps) => {
    return (
        <div className="group cursor-pointer">
            <div
                className={`aspect-[3/4] rounded-3xl overflow-hidden bg-white border border-gray-100 mb-4 group-hover:shadow-[0_20px_50px_rgba(121,57,229,0.12)] transition-all duration-500 group-hover:-translate-y-3 relative ${isCreateNew ? 'bg-slate-50 border-dashed border-2 border-gray-200' : ''
                    }`}
                onClick={onClick}
            >
                <div className="w-full h-full relative">
                    {isCreateNew ? (
                        <div className="w-full h-full flex items-center justify-center p-12">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform duration-500">
                                <Plus size={32} />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700 transform-gpu">
                            {templateElements ? (
                                <TemplatePreview elements={templateElements} className="w-full h-full" />
                            ) : preview ? (
                                <img src={preview} alt={title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                                    <FileText size={48} className="text-gray-200" strokeWidth={1} />
                                </div>
                            )}
                        </div>
                    )}

                    {!isCreateNew && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                            <div className="w-full p-4 bg-white/90 backdrop-blur-md rounded-2xl text-center font-bold text-sm text-purple-600 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                Use Template
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full">
                <h4 className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors uppercase tracking-tight antialiased transform-gpu">
                    {title}
                </h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none transform-gpu">
                    {date}
                </p>
            </div>
        </div>
    );
};
