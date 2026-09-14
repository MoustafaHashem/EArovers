"use client";

import { useState } from "react";
import { Search, ShieldAlert, UserCog, MoreVertical, Shield, Star } from "lucide-react";
import { updateUserRole, awardShield } from "./actions";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

type ShieldType = { id: string; name: string };

type Member = {
  id: string;
  fullName: string;
  academicYear: string | null;
  phone: string | null;
  role: UserRole;
  createdAt: Date;
};

export default function MembersClient({ initialMembers, initialShields = [] }: { initialMembers: Member[], initialShields?: ShieldType[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  
  const [awardingTo, setAwardingTo] = useState<string | null>(null);
  const [selectedShield, setSelectedShield] = useState<string>("");

  const filteredMembers = members.filter(m => 
    m.fullName.toLowerCase().includes(search.toLowerCase()) || 
    (m.academicYear && m.academicYear.includes(search))
  );

  const handleRoleChange = async (id: string, currentRole: UserRole) => {
    const newRole = currentRole === "admin" ? "scout" : "admin";
    
    // Optimistic update
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role: newRole as UserRole } : m));
    setLoadingId(id);
    
    const promise = updateUserRole(id, newRole);
    
    toast.promise(promise, {
      loading: "جاري تغيير الصلاحية...",
      success: (result) => {
        if (!result.success) throw new Error(result.error);
        return "تم تغيير الصلاحية بنجاح";
      },
      error: () => {
        setMembers(prev => prev.map(m => m.id === id ? { ...m, role: currentRole } : m));
        return "فشل تحديث الصلاحية";
      }
    });

    await promise;
    setLoadingId(null);
  };

  const handleAwardShield = async (id: string) => {
    if (!selectedShield) return;
    setLoadingId(id);
    
    const promise = awardShield(id, selectedShield);
    
    toast.promise(promise, {
      loading: "جاري منح الدرع...",
      success: (result) => {
        if (!result.success) throw new Error(result.error);
        setAwardingTo(null);
        setSelectedShield("");
        return "تم منح الدرع بنجاح";
      },
      error: (err) => err.message || "فشل منح الدرع"
    });

    await promise;
    setLoadingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">إدارة الأعضاء</h1>
          <p className="text-gray-400 text-sm">إدارة حسابات الجوالة والصلاحيات</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="البحث بالاسم أو الفرقة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-xl py-2 pl-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-scout-blue)]"
          />
          <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block glass-card rounded-2xl border border-[var(--color-dark-border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-white/5 border-b border-[var(--color-dark-border)]">
              <tr>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">الاسم</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">الفرقة</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">رقم الهاتف</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">تاريخ الانضمام</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">الصلاحية</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-dark-border)]">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    لا يوجد أعضاء يطابقون بحثك
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{member.fullName}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {member.academicYear || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {member.phone || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm text-right" dir="ltr">
                      {new Date(member.createdAt).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        member.role === "admin" 
                          ? "bg-purple-400/10 text-purple-400 border border-purple-400/20" 
                          : "bg-blue-400/10 text-blue-400 border border-blue-400/20"
                      }`}>
                        {member.role === "admin" ? <Shield size={12} /> : <UserCog size={12} />}
                        {member.role === "admin" ? "أدمن" : "جوال"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 relative">
                        <button
                          onClick={() => handleRoleChange(member.id, member.role)}
                          disabled={loadingId === member.id}
                          className="p-2 text-gray-400 hover:text-white disabled:opacity-50 transition-colors bg-white/5 rounded-lg"
                          title="تغيير الصلاحية"
                        >
                          {loadingId === member.id ? (
                            <div className="w-4 h-4 border-2 border-t-[var(--color-scout-blue)] border-white/20 rounded-full animate-spin" />
                          ) : (
                            <ShieldAlert size={16} />
                          )}
                        </button>
                        
                        {initialShields.length > 0 && (
                          <div className="relative">
                            <button
                              onClick={() => setAwardingTo(awardingTo === member.id ? null : member.id)}
                              className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors bg-white/5"
                              title="منح درع"
                            >
                              <Star size={16} />
                            </button>
                            
                            {awardingTo === member.id && (
                              <div className="absolute top-10 right-0 z-50 w-48 bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-xl p-3 shadow-xl">
                                <h4 className="text-xs font-bold text-gray-400 mb-2">اختر الدرع:</h4>
                                <select 
                                  className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-lg text-sm text-white p-2 mb-2 focus:outline-none focus:border-[var(--color-scout-blue)]"
                                  value={selectedShield}
                                  onChange={(e) => setSelectedShield(e.target.value)}
                                >
                                  <option value="">-- اختر درع --</option>
                                  {initialShields.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                  ))}
                                </select>
                                <div className="flex gap-2">
                                  <button onClick={() => handleAwardShield(member.id)} disabled={!selectedShield || loadingId === member.id} className="flex-1 bg-[var(--color-scout-blue)] text-white text-xs font-bold py-1.5 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors">منح</button>
                                  <button onClick={() => setAwardingTo(null)} className="flex-1 bg-white/10 text-gray-300 text-xs py-1.5 rounded-lg hover:bg-white/20 transition-colors">إلغاء</button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile List View Cards */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {filteredMembers.length === 0 ? (
          <div className="py-8 text-center text-gray-500 glass-card rounded-2xl border border-[var(--color-dark-border)]">
            لا يوجد أعضاء يطابقون بحثك
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div key={member.id} className="glass-card rounded-2xl border border-[var(--color-dark-border)] p-5 flex flex-col gap-4 relative">
              <div className="absolute top-5 left-5">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  member.role === "admin" 
                    ? "bg-purple-400/10 text-purple-400 border border-purple-400/20" 
                    : "bg-blue-400/10 text-blue-400 border border-blue-400/20"
                }`}>
                  {member.role === "admin" ? <Shield size={12} /> : <UserCog size={12} />}
                  {member.role === "admin" ? "أدمن" : "جوال"}
                </span>
              </div>
              
              <div>
                <h3 className="font-bold text-white text-lg pr-14 mb-1">{member.fullName}</h3>
                <p className="text-[var(--color-scout-blue)] text-sm">{member.academicYear || "—"}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-sm pt-3 border-t border-[var(--color-dark-border)]">
                <div>
                  <span className="block text-gray-500 mb-1 text-xs">رقم الهاتف</span>
                  <a href={`tel:${member.phone}`} className="text-gray-300 hover:text-[var(--color-scout-blue)]" dir="ltr">{member.phone || "—"}</a>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1 text-xs">تاريخ الانضمام</span>
                  <span className="text-gray-300" dir="ltr">{new Date(member.createdAt).toLocaleDateString("ar-EG")}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--color-dark-border)] mt-1">
                <button
                  onClick={() => handleRoleChange(member.id, member.role)}
                  disabled={loadingId === member.id}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loadingId === member.id ? (
                    <div className="w-4 h-4 border-2 border-t-[var(--color-scout-blue)] border-white/20 rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldAlert size={16} />
                      تغيير الصلاحية
                    </>
                  )}
                </button>
                
                {initialShields.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setAwardingTo(awardingTo === member.id ? null : member.id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20 rounded-lg transition-colors"
                    >
                      <Star size={16} />
                      منح درع
                    </button>
                    
                    {awardingTo === member.id && (
                      <div className="absolute bottom-12 left-0 z-50 w-[260px] bg-[#0a1122] border border-[var(--color-scout-blue)] rounded-xl p-4 shadow-xl">
                        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                          <Star size={16} className="text-yellow-400" />
                          اختر الدرع لمنحه
                        </h4>
                        <select 
                          className="w-full bg-black/40 border border-white/10 rounded-lg text-sm text-white p-3 mb-3 focus:outline-none focus:border-[var(--color-scout-blue)] appearance-none"
                          value={selectedShield}
                          onChange={(e) => setSelectedShield(e.target.value)}
                        >
                          <option value="" className="bg-[#0a1122]">-- اختر درع --</option>
                          {initialShields.map(s => (
                            <option key={s.id} value={s.id} className="bg-[#0a1122]">{s.name}</option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <button onClick={() => handleAwardShield(member.id)} disabled={!selectedShield || loadingId === member.id} className="flex-1 bg-[var(--color-scout-blue)] text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors">منح الدرع</button>
                          <button onClick={() => setAwardingTo(null)} className="flex-1 bg-white/10 text-gray-300 text-sm py-2 rounded-lg hover:bg-white/20 transition-colors">إلغاء</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
