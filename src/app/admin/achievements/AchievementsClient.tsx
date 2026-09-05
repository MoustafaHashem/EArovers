"use client";

import { useState } from "react";
import { Search, Plus, Trash2, Trophy } from "lucide-react";
import { addAchievement, deleteAchievement } from "./actions";
import { toast } from "sonner";

type Achievement = {
  id: string;
  title: string;
  year: number;
  placement: string | null;
  competitionName: string | null;
  awards: string[];
};

export default function AchievementsClient({ initialAchievements }: { initialAchievements: Achievement[] }) {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const filtered = achievements.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (a.competitionName && a.competitionName.includes(search)) ||
    a.year.toString().includes(search)
  );

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الإنجاز؟")) return;
    
    const previous = [...achievements];
    setAchievements(prev => prev.filter(a => a.id !== id));
    
    const promise = deleteAchievement(id);
    
    toast.promise(promise, {
      loading: "جاري الحذف...",
      success: (res) => {
        if (!res.success) throw new Error("فشل الحذف");
        return "تم حذف الإنجاز بنجاح";
      },
      error: () => {
        setAchievements(previous);
        return "فشل حذف الإنجاز";
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">لوحة الشرف</h1>
          <p className="text-gray-400 text-sm">إدارة إنجازات وجوائز العشيرة التاريخية</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input 
              type="text" 
              placeholder="البحث بالاسم أو السنة..."
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
            إضافة
          </button>
        </div>
      </div>

      {isAdding && (
        <form 
          action={async (formData) => {
            setLoading(true);
            const promise = addAchievement(formData);
            
            toast.promise(promise, {
              loading: "جاري الإضافة...",
              success: (res) => {
                if (!res.success) throw new Error("فشل الإضافة");
                setIsAdding(false);
                window.location.reload(); 
                return "تمت الإضافة بنجاح";
              },
              error: () => {
                setLoading(false);
                return "فشل إضافة الإنجاز";
              }
            });
          }}
          className="glass-card p-6 rounded-2xl border border-[var(--color-dark-border)] grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">عنوان الإنجاز *</label>
            <input required name="title" type="text" placeholder="مثال: درع التفوق العام" className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">السنة *</label>
            <input required name="year" type="number" defaultValue={new Date().getFullYear()} className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">المركز (اختياري)</label>
            <input name="placement" type="text" placeholder="مثال: المركز الأول" className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">اسم المسابقة أو المهرجان</label>
            <input name="competitionName" type="text" placeholder="مثال: الدورة الكشفية 33" className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">الجوائز التفصيلية (مفصولة بفاصلة ,)</label>
            <input name="awards" type="text" placeholder="مثال: درع السمر, المركز الأول مجال ديني, ..." className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
          </div>
          <div className="md:col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2 rounded-xl text-gray-400 hover:bg-white/5 transition-colors">
              إلغاء
            </button>
            <button disabled={loading} type="submit" className="px-6 py-2 rounded-xl bg-[var(--color-scout-blue)] text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-50">
              {loading ? "جاري الإضافة..." : "حفظ"}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 glass-card rounded-2xl border border-[var(--color-dark-border)]">
            لا توجد إنجازات مسجلة
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="glass-card rounded-2xl border border-[var(--color-dark-border)] p-6 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rounded-bl-full -z-10 blur-xl"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                  <Trophy size={24} />
                </div>
                
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              
              <div className="flex gap-2 mb-4">
                <span className="text-xs font-bold bg-[var(--color-scout-blue)]/20 text-[var(--color-scout-blue-light)] px-2.5 py-1 rounded-full border border-[var(--color-scout-blue)]/20">
                  {item.year}
                </span>
                {item.placement && (
                  <span className="text-xs font-bold bg-yellow-400/10 text-yellow-400 px-2.5 py-1 rounded-full border border-yellow-400/20">
                    {item.placement}
                  </span>
                )}
              </div>
              
              {item.competitionName && (
                <p className="text-sm text-gray-400 mb-4 pb-4 border-b border-[var(--color-dark-border)]">
                  {item.competitionName}
                </p>
              )}
              
              {item.awards && item.awards.length > 0 && (
                <div className="mt-auto">
                  <h4 className="text-xs font-bold text-gray-500 mb-2">تفاصيل الجوائز:</h4>
                  <ul className="text-sm text-gray-300 space-y-1 pl-4 list-disc marker:text-[var(--color-scout-blue)]" dir="rtl">
                    {item.awards.map((award, i) => (
                      <li key={i}>{award}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
