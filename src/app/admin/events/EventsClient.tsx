"use client";

import { useState } from "react";
import { Search, Plus, Trash2, Edit, Users, CalendarDays, MapPin } from "lucide-react";
import { addEvent, deleteEvent } from "./actions";
import Link from "next/link";
import { toast } from "sonner";

type Event = {
  id: string;
  title: string;
  eventType: string;
  location: string | null;
  startDate: Date;
  isPublic: boolean;
  maxParticipants: number | null;
};

export default function EventsClient({ initialEvents }: { initialEvents: Event[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.eventType.includes(search)
  );

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الفعالية؟")) return;
    
    const previous = [...events];
    setEvents(prev => prev.filter(e => e.id !== id));
    
    const promise = deleteEvent(id);
    
    toast.promise(promise, {
      loading: "جاري الحذف...",
      success: (res) => {
        if (!res.success) throw new Error("فشل الحذف");
        return "تم حذف الفعالية بنجاح";
      },
      error: () => {
        setEvents(previous);
        return "فشل حذف الفعالية";
      }
    });
  };

  const getEventTypeBadge = (type: string) => {
    if (type.includes("معسكر")) return "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";
    if (type.includes("دراس")) return "bg-blue-400/10 text-blue-400 border-blue-400/20";
    if (type.includes("سيشن") || type.includes("ندوة") || type.includes("ورشة")) return "bg-purple-400/10 text-purple-400 border-purple-400/20";
    if (type.includes("خدم")) return "bg-amber-400/10 text-amber-400 border-amber-400/20";
    return "bg-cyan-400/10 text-cyan-400 border-cyan-400/20";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">الفعاليات</h1>
          <p className="text-gray-400 text-sm">إدارة المعسكرات والمسابقات والدروع</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input 
              type="text" 
              placeholder="البحث بالاسم..."
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
            const promise = addEvent(formData);
            
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
                return "فشل إضافة الفعالية";
              }
            });
          }}
          className="glass-card p-6 rounded-2xl border border-[var(--color-dark-border)] grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">اسم الفعالية *</label>
            <input required name="title" type="text" className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">التفاصيل</label>
            <textarea name="description" rows={3} className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">نوع الفعالية *</label>
            <select required name="eventType" className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white">
              <option value="معسكرات" className="bg-[var(--color-dark-bg)]">معسكرات</option>
              <option value="دراسات" className="bg-[var(--color-dark-bg)]">دراسات</option>
              <option value="سيشنات" className="bg-[var(--color-dark-bg)]">سيشنات</option>
              <option value="خدمة عامة" className="bg-[var(--color-dark-bg)]">خدمة عامة</option>
              <option value="متنوع" className="bg-[var(--color-dark-bg)]">متنوع</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">المكان</label>
            <input name="location" type="text" className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">تاريخ البدء *</label>
            <input required name="startDate" type="datetime-local" className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">تاريخ الانتهاء</label>
            <input name="endDate" type="datetime-local" className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">الحد الأقصى للمشاركين (اختياري)</label>
            <input name="maxParticipants" type="number" min="1" className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input type="checkbox" id="isPublic" name="isPublic" className="w-5 h-5 accent-[var(--color-scout-blue)]" />
            <label htmlFor="isPublic" className="text-sm font-medium text-gray-300 cursor-pointer">
              فعالية عامة (تظهر لغير المسجلين)
            </label>
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
        {filteredEvents.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 glass-card rounded-2xl border border-[var(--color-dark-border)]">
            لا توجد فعاليات
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="glass-card rounded-2xl border border-[var(--color-dark-border)] p-6 flex flex-col relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getEventTypeBadge(event.eventType)}`}>
                  {event.eventType}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-400 hover:text-[var(--color-scout-blue)] hover:bg-white/5 rounded-lg transition-colors">
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(event.id)}
                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">{event.title}</h3>
              
              <div className="space-y-3 mb-6 mt-auto">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CalendarDays size={16} className="text-gray-500" />
                  <span dir="ltr">{new Date(event.startDate).toLocaleDateString("ar-EG", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                )}
                {event.maxParticipants && (
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Users size={16} className="text-gray-500" />
                    <span>الحد الأقصى: {event.maxParticipants} فرد</span>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-[var(--color-dark-border)] flex justify-between items-center text-sm">
                <span className={event.isPublic ? "text-green-400" : "text-gray-500"}>
                  {event.isPublic ? "عام" : "خاص باللجان"}
                </span>
                <Link href={`/admin/events/${event.id}`} className="text-[var(--color-scout-blue)] font-medium hover:underline">
                  إدارة المشتركين
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
