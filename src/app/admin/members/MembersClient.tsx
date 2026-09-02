"use client";

import { useState } from "react";
import { Search, ShieldAlert, UserCog, MoreVertical, Shield } from "lucide-react";
import { updateUserRole } from "./actions";
import { UserRole } from "@prisma/client";

type Profile = {
  id: string;
  fullName: string;
  academicYear: string | null;
  phone: string | null;
  role: UserRole;
  createdAt: Date;
};

export default function MembersClient({ initialMembers }: { initialMembers: Profile[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredMembers = members.filter(m => 
    m.fullName.toLowerCase().includes(search.toLowerCase()) || 
    (m.academicYear && m.academicYear.includes(search))
  );

  const handleRoleChange = async (id: string, currentRole: UserRole) => {
    const newRole = currentRole === "admin" ? "scout" : "admin";
    
    // Optimistic update
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role: newRole as UserRole } : m));
    setLoadingId(id);
    
    const result = await updateUserRole(id, newRole);
    
    if (!result.success) {
      // Revert on failure
      setMembers(prev => prev.map(m => m.id === id ? { ...m, role: currentRole } : m));
      alert("فشل تحديث الصلاحية");
    }
    
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

      <div className="glass-card rounded-2xl border border-[var(--color-dark-border)] overflow-hidden">
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
                      <button
                        onClick={() => handleRoleChange(member.id, member.role)}
                        disabled={loadingId === member.id}
                        className="text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                        title="تغيير الصلاحية"
                      >
                        {loadingId === member.id ? (
                          <div className="w-5 h-5 border-2 border-t-[var(--color-scout-blue)] border-white/20 rounded-full animate-spin" />
                        ) : (
                          <ShieldAlert size={18} />
                        )}
                      </button>
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
