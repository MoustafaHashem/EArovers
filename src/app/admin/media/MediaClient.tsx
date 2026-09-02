"use client";

import { useState } from "react";
import { Search, Plus, Trash2, Image as ImageIcon, UploadCloud } from "lucide-react";
import { addMedia, deleteMedia } from "./actions";

type Media = {
  id: string;
  title: string | null;
  url: string;
  category: string | null;
  createdAt: Date;
};

export default function MediaClient({ initialMedia }: { initialMedia: Media[] }) {
  const [mediaList, setMediaList] = useState(initialMedia);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredMedia = mediaList.filter(m => 
    (m.title && m.title.toLowerCase().includes(search.toLowerCase())) || 
    (m.category && m.category.includes(search))
  );

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الصورة؟ (ملاحظة: هذا لن يحذفها من Cloudinary حالياً)")) return;
    
    const previous = [...mediaList];
    setMediaList(prev => prev.filter(m => m.id !== id));
    
    const res = await deleteMedia(id);
    if (!res.success) {
      setMediaList(previous);
      alert("فشل الحذف");
    }
  };

  const simulateUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    // Simulate Cloudinary upload URL (placeholder for now)
    const mockCloudinaryUrl = "https://images.unsplash.com/photo-1523580494112-071d45815637?auto=format&fit=crop&q=80&w=600";
    formData.append("url", mockCloudinaryUrl);

    const res = await addMedia(formData);
    if (res.success) {
      setIsAdding(false);
      window.location.reload(); 
    } else {
      alert("فشل الإضافة");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">معرض الصور (الميديا)</h1>
          <p className="text-gray-400 text-sm">إدارة صور الفعاليات والمعسكرات والدروع</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input 
              type="text" 
              placeholder="البحث في الميديا..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-xl py-2 pl-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-scout-blue)]"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
          </div>
          
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-scout-blue)] text-white font-medium hover:bg-blue-600 transition-colors"
          >
            <Plus size={18} />
            رفع صور
          </button>
        </div>
      </div>

      {isAdding && (
        <form 
          onSubmit={simulateUpload}
          className="glass-card p-6 rounded-2xl border border-[var(--color-dark-border)] grid grid-cols-1 gap-4"
        >
          <div className="p-8 border-2 border-dashed border-[var(--color-dark-border)] rounded-xl text-center bg-white/5 flex flex-col items-center justify-center">
            <UploadCloud className="w-12 h-12 text-[var(--color-scout-blue)] mb-3" />
            <h3 className="text-white font-bold mb-1">اضغط هنا لرفع الصور</h3>
            <p className="text-gray-400 text-sm">أو قم بسحب الصور وإفلاتها هنا</p>
            <p className="text-yellow-500 text-xs mt-4">ملاحظة: الرفع الحقيقي سيعمل بعد ربط حساب Cloudinary.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">عنوان الصورة (اختياري)</label>
              <input name="title" type="text" className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">التصنيف *</label>
              <select required name="category" className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white">
                <option value="معسكرات" className="bg-[var(--color-dark-bg)]">معسكرات</option>
                <option value="مسابقات" className="bg-[var(--color-dark-bg)]">مسابقات</option>
                <option value="دروع" className="bg-[var(--color-dark-bg)]">دروع</option>
                <option value="كواليس" className="bg-[var(--color-dark-bg)]">كواليس</option>
                <option value="أخرى" className="bg-[var(--color-dark-bg)]">أخرى</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-2">
            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2 rounded-xl text-gray-400 hover:bg-white/5 transition-colors">
              إلغاء
            </button>
            <button disabled={loading} type="submit" className="px-6 py-2 rounded-xl bg-[var(--color-scout-blue)] text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-50">
              {loading ? "جاري الرفع..." : "حفظ الميديا"}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredMedia.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 glass-card rounded-2xl border border-[var(--color-dark-border)]">
            لا يوجد صور في المعرض
          </div>
        ) : (
          filteredMedia.map((media) => (
            <div key={media.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-[var(--color-dark-border)] bg-gray-900">
              <img src={media.url} alt={media.title || "صورة من المعرض"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleDelete(media.id)}
                    className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors backdrop-blur-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--color-scout-blue)] text-white mb-1">
                    {media.category || "عام"}
                  </span>
                  {media.title && (
                    <p className="text-white font-medium text-sm line-clamp-1">{media.title}</p>
                  )}
                  <p className="text-gray-300 text-xs mt-0.5" dir="ltr">
                    {new Date(media.createdAt).toLocaleDateString("ar-EG")}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
