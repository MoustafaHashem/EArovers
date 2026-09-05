"use client";

import { useState } from "react";
import { Search, Plus, Trash2, Edit, X } from "lucide-react";
import { addPerson, deletePerson, updatePerson } from "./actions";
import { toast } from "sonner";

type Person = {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  bio: string | null;
};

export default function PeopleClient({ initialPeople }: { initialPeople: Person[] }) {
  const [people, setPeople] = useState(initialPeople);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredPeople = people.filter(p => 
    p.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الشخص؟")) return;
    
    const previous = [...people];
    setPeople(prev => prev.filter(p => p.id !== id));
    
    const promise = deletePerson(id);
    
    toast.promise(promise, {
      loading: "جاري الحذف...",
      success: (res) => {
        if (!res.success) throw new Error("فشل الحذف");
        return "تم الحذف بنجاح";
      },
      error: () => {
        setPeople(previous);
        return "فشل حذف الشخص";
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">إدارة الكوادر والتاريخ</h1>
          <p className="text-gray-400 text-sm">إضافة وتعديل قادة العشيرة السابقين والرواد</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input 
              type="text" 
              placeholder="البحث بالاسم أو المنصب..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-xl py-2 pl-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-scout-blue)]"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
          </div>
          
          <button 
            onClick={() => { setIsAdding(true); setEditingPerson(null); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-scout-blue)] text-white font-medium hover:bg-blue-600 transition-colors"
          >
            <Plus size={18} />
            إضافة
          </button>
        </div>
      </div>

      {(isAdding || editingPerson) && (
        <form 
          action={async (formData) => {
            setLoading(true);
            const promise = editingPerson 
              ? updatePerson(editingPerson.id, formData)
              : addPerson(formData);
              
            toast.promise(promise, {
              loading: editingPerson ? "جاري التعديل..." : "جاري الإضافة...",
              success: (res) => {
                if (!res.success) throw new Error("فشل العملية");
                setIsAdding(false);
                setEditingPerson(null);
                window.location.reload();
                return editingPerson ? "تم التعديل بنجاح" : "تمت الإضافة بنجاح";
              },
              error: () => {
                setLoading(false);
                return editingPerson ? "فشل التعديل" : "فشل الإضافة";
              }
            });
          }}
          className="glass-card p-6 rounded-2xl border border-[var(--color-dark-border)] grid grid-cols-1 md:grid-cols-2 gap-4 relative"
        >
          <div className="absolute top-4 right-4 md:col-span-2 flex justify-between items-center w-full px-6 pointer-events-none">
            <h3 className="text-lg font-bold text-white pointer-events-auto">{editingPerson ? "تعديل بيانات" : "إضافة كادر جديد"}</h3>
            <button type="button" onClick={() => { setIsAdding(false); setEditingPerson(null); }} className="text-gray-400 hover:text-white pointer-events-auto">
              <X size={20} />
            </button>
          </div>
          <div className="md:col-span-2 pt-6"></div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">الاسم الكامل *</label>
            <input required name="fullName" type="text" defaultValue={editingPerson?.fullName || ""} className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">رابط الصورة (مؤقتاً)</label>
            <input name="avatarUrl" type="url" defaultValue={editingPerson?.avatarUrl || ""} className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">نبذة قصيرة</label>
            <textarea name="bio" rows={3} defaultValue={editingPerson?.bio || ""} className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl px-4 py-2 text-white"></textarea>
          </div>
          <div className="md:col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" onClick={() => { setIsAdding(false); setEditingPerson(null); }} className="px-6 py-2 rounded-xl text-gray-400 hover:bg-white/5 transition-colors">
              إلغاء
            </button>
            <button disabled={loading} type="submit" className="px-6 py-2 rounded-xl bg-[var(--color-scout-blue)] text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-50">
              {loading ? "جاري الحفظ..." : "حفظ"}
            </button>
          </div>
        </form>
      )}

      <div className="glass-card rounded-2xl border border-[var(--color-dark-border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-white/5 border-b border-[var(--color-dark-border)]">
              <tr>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">الاسم</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">نبذة</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-dark-border)]">
              {filteredPeople.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    لا يوجد بيانات تطابق بحثك
                  </td>
                </tr>
              ) : (
                filteredPeople.map((person) => (
                  <tr key={person.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 shrink-0 overflow-hidden border border-[var(--color-dark-border)]">
                          {person.avatarUrl ? (
                            <img src={person.avatarUrl} alt={person.fullName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-xs">{person.fullName.substring(0, 2)}</div>
                          )}
                        </div>
                        <div className="font-bold text-white">{person.fullName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {person.bio ? (person.bio.length > 50 ? person.bio.substring(0, 50) + "..." : person.bio) : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => { setEditingPerson(person); setIsAdding(false); }}
                          className="p-2 text-gray-400 hover:text-[var(--color-scout-blue)] hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(person.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
