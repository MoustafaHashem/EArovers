"use client";

import { useState, useMemo } from "react";
import { Search, X, Star } from "lucide-react";
import { deleteMedia, updateMedia, updateMediaSortOrder } from "./actions";
import CloudinaryUpload from "./CloudinaryUpload";
import { toast } from "sonner";
import { SortableMediaCard } from "./SortableMediaCard";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

type Media = {
  id: string;
  title: string | null;
  url: string;
  category: string | null;
  sortOrder: number;
  isFeatured: boolean;
  createdAt: Date;
};

export default function MediaClient({ initialMedia }: { initialMedia: Media[] }) {
  const [mediaList, setMediaList] = useState(initialMedia);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("معسكرات");

  const categories = ["معسكرات", "مسابقات", "دروع", "كواليس", "رحلات"];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredMedia = useMemo(() => {
    return mediaList
      .filter(m => selectedCategory === "الكل" || m.category === selectedCategory)
      .filter(m => 
        (m.title && m.title.toLowerCase().includes(search.toLowerCase())) || 
        (m.category && m.category.includes(search))
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [mediaList, selectedCategory, search]);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;
    const previous = [...mediaList];
    setMediaList(prev => prev.filter(m => m.id !== id));
    const promise = deleteMedia(id);
    toast.promise(promise, {
      loading: "جاري الحذف...",
      success: (res) => {
        if (!res.success) throw new Error("فشل الحذف");
        return "تم الحذف بنجاح";
      },
      error: () => {
        setMediaList(previous);
        return "فشل حذف الصورة";
      }
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = filteredMedia.findIndex(item => item.id === active.id);
      const newIndex = filteredMedia.findIndex(item => item.id === over.id);
      
      const newFilteredMedia = arrayMove(filteredMedia, oldIndex, newIndex);
      
      const updates = newFilteredMedia.map((media, index) => ({
        id: media.id,
        sortOrder: index + 1 // Assign sequential numbers 1 to N
      }));

      // Optimistic update
      setMediaList(prev => prev.map(m => {
        const update = updates.find(u => u.id === m.id);
        return update ? { ...m, sortOrder: update.sortOrder } : m;
      }));

      toast.promise(updateMediaSortOrder(updates), {
        loading: "جاري حفظ الترتيب...",
        success: "تم حفظ الترتيب بنجاح",
        error: "فشل حفظ الترتيب"
      });
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">معرض الصور (الميديا)</h1>
          <p className="text-gray-400 text-sm">إدارة صور الفعاليات والمعسكرات والدروع</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="البحث في الميديا..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-xl py-2 pl-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-scout-blue)]"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select 
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white h-[42px] focus:outline-none focus:border-[var(--color-scout-blue)] [&>option]:bg-[#1a1f2e]"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <CloudinaryUpload selectedCategory={uploadCategory} />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("الكل")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === "الكل" ? 'bg-[var(--color-scout-blue)] text-white' : 'bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] text-gray-400 hover:text-white'}`}
        >
          الكل
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-[var(--color-scout-blue)] text-white' : 'bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] text-gray-400 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {editingMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form 
            action={async (formData) => {
              setLoading(true);
              const promise = updateMedia(editingMedia.id, formData);
              
              toast.promise(promise, {
                loading: "جاري التعديل...",
                success: (res) => {
                  if (!res.success) throw new Error("فشل التعديل");
                  setEditingMedia(null);
                  window.location.reload(); 
                  return "تم التعديل بنجاح";
                },
                error: () => {
                  setLoading(false);
                  return "فشل التعديل";
                }
              });
            }}
            className="glass-card w-full max-w-md p-6 rounded-2xl border border-[var(--color-dark-border)] relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">تعديل بيانات الصورة</h3>
              <button type="button" onClick={() => setEditingMedia(null)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="aspect-video w-full mb-6 rounded-xl overflow-hidden bg-gray-900 border border-[var(--color-dark-border)]">
              <img src={editingMedia.url} alt="Preview" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">العنوان</label>
                <input name="title" type="text" defaultValue={editingMedia.title || ""} className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">التصنيف</label>
                <select name="category" defaultValue={editingMedia.category || ""} className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white [&>option]:bg-[#1a1f2e]">
                  <option value="">بدون تصنيف</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">الترتيب (الأصغر يظهر أولاً)</label>
                <input name="sortOrder" type="number" defaultValue={editingMedia.sortOrder} className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
              </div>
              
              <div className="flex items-center gap-3 mt-4">
                <input id="isFeatured" name="isFeatured" type="checkbox" defaultChecked={editingMedia.isFeatured} className="w-4 h-4 rounded bg-white/5 border-[var(--color-dark-border)] text-[var(--color-scout-blue)] focus:ring-[var(--color-scout-blue)]" />
                <label htmlFor="isFeatured" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Star size={16} className="text-yellow-400" /> عرض في الصفحة الرئيسية
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setEditingMedia(null)} className="px-6 py-2 rounded-xl text-gray-400 hover:bg-white/5 transition-colors">
                إلغاء
              </button>
              <button disabled={loading} type="submit" className="px-6 py-2 rounded-xl bg-[var(--color-scout-blue)] text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-50">
                {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DND Kit Sortable Grid */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <SortableContext 
            items={filteredMedia.map(m => m.id)}
            strategy={rectSortingStrategy}
          >
            {filteredMedia.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-500 glass-card rounded-2xl border border-[var(--color-dark-border)]">
                لا يوجد صور في هذا التصنيف
              </div>
            ) : (
              filteredMedia.map((media) => (
                <SortableMediaCard 
                  key={media.id} 
                  media={media} 
                  onEdit={() => setEditingMedia(media)}
                  onDelete={() => handleDelete(media.id)}
                />
              ))
            )}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}
