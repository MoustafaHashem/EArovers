"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Edit, Star, GripVertical } from "lucide-react";

export function SortableMediaCard({ media, onEdit, onDelete }: { media: any, onEdit: () => void, onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: media.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`group relative aspect-square rounded-2xl overflow-hidden border border-[var(--color-dark-border)] bg-gray-900 ${isDragging ? 'shadow-2xl scale-105' : ''}`}>
      <img src={media.url} alt={media.title || "صورة من المعرض"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
        
        {/* Top bar with drag handle and actions */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div 
              {...attributes} 
              {...listeners} 
              className="p-1.5 bg-black/40 text-white rounded-lg backdrop-blur-md cursor-grab active:cursor-grabbing hover:bg-white/20 transition-colors"
              title="سحب لترتيب الصورة"
            >
              <GripVertical size={16} />
            </div>
            
            {media.isFeatured && (
              <div className="p-1.5 bg-yellow-400/20 text-yellow-400 rounded-lg backdrop-blur-md border border-yellow-400/30">
                <Star size={16} fill="currentColor" />
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="p-2 bg-white/20 hover:bg-[var(--color-scout-blue)] text-white rounded-lg transition-colors backdrop-blur-md"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors backdrop-blur-md"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        {/* Bottom bar with info */}
        <div>
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--color-scout-blue)] text-white mb-1">
            {media.category || "عام"}
          </span>
          {media.title && (
            <p className="text-white font-medium text-sm line-clamp-1">{media.title}</p>
          )}
        </div>
      </div>
    </div>
  );
}
