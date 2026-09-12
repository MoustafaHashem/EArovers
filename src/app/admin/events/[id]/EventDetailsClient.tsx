"use client";

import { useState } from "react";
import { UserCheck, UserX, UserMinus, Plus, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { addParticipant, updateParticipantStatus, removeParticipant } from "./actions";

type Member = {
  id: string;
  fullName: string;
  role: string;
  academicYear: string | null;
};

type Participant = {
  id: string;
  memberId: string;
  status: string;
  member: Member;
};

type EventType = {
  id: string;
  title: string;
  eventType: string;
  participants: Participant[];
};

export default function EventDetailsClient({ 
  event, 
  allMembers 
}: { 
  event: EventType, 
  allMembers: Member[] 
}) {
  const [participants, setParticipants] = useState(event.participants);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusChange = async (participantId: string, newStatus: string) => {
    const previous = [...participants];
    setParticipants(prev => prev.map(p => p.id === participantId ? { ...p, status: newStatus } : p));
    
    const promise = updateParticipantStatus(participantId, event.id, newStatus);
    toast.promise(promise, {
      loading: "جاري تحديث الحالة...",
      success: (res) => {
        if (!res.success) throw new Error("فشل التحديث");
        return "تم تحديث الحالة بنجاح";
      },
      error: () => {
        setParticipants(previous);
        return "فشل تحديث الحالة";
      }
    });
  };

  const handleRemove = async (participantId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشترك؟")) return;
    
    const previous = [...participants];
    setParticipants(prev => prev.filter(p => p.id !== participantId));
    
    const promise = removeParticipant(participantId, event.id);
    toast.promise(promise, {
      loading: "جاري الحذف...",
      success: (res) => {
        if (!res.success) throw new Error("فشل الحذف");
        return "تم حذف المشترك بنجاح";
      },
      error: () => {
        setParticipants(previous);
        return "فشل حذف المشترك";
      }
    });
  };

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId) return;

    // Check if already in event
    if (participants.some(p => p.memberId === selectedMemberId)) {
      toast.error("هذا العضو مسجل بالفعل في الفعالية");
      return;
    }

    const promise = addParticipant(event.id, selectedMemberId);
    
    toast.promise(promise, {
      loading: "جاري الإضافة...",
      success: (res) => {
        if (!res.success) throw new Error("فشل الإضافة");
        setIsAdding(false);
        setSelectedMemberId("");
        // Reload page to get new data (or we could optimistically update with the profile data)
        window.location.reload();
        return "تم إضافة المشترك بنجاح";
      },
      error: "فشل إضافة المشترك"
    });
  };

  const filteredProfiles = allMembers.filter(p => 
    p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) && 
    !participants.some(part => part.memberId === p.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Link href="/admin/events" className="text-gray-400 hover:text-white transition-colors">
          الفعاليات
        </Link>
        <ChevronRight size={16} className="text-gray-500" />
        <span className="text-[var(--color-scout-blue)] font-medium truncate max-w-[200px] sm:max-w-md">
          {event.title}
        </span>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">إدارة المشتركين</h1>
          <p className="text-gray-400 text-sm">تسجيل وحضور فعالية: {event.title}</p>
        </div>
        
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-scout-blue)] text-white font-medium hover:bg-blue-600 transition-colors"
        >
          <Plus size={18} />
          إضافة مشترك
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddParticipant} className="glass-card p-6 rounded-2xl border border-[var(--color-dark-border)] max-w-md">
          <h3 className="text-lg font-bold text-white mb-4">إضافة مشترك جديد</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">ابحث عن عضو</label>
              <div className="relative mb-2">
                <input 
                  type="text" 
                  placeholder="اسم العضو..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-[var(--color-dark-border)] rounded-xl py-2 pl-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-scout-blue)]"
                />
                <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
              </div>
              <select 
                size={5}
                required 
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="w-full bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-xl px-2 py-2 text-white"
              >
                {filteredProfiles.map(p => (
                  <option key={p.id} value={p.id} className="p-2 border-b border-white/5 hover:bg-white/5 cursor-pointer">
                    {p.fullName} {p.academicYear ? `(${p.academicYear})` : ''}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-xl text-gray-400 hover:bg-white/5 transition-colors">
                إلغاء
              </button>
              <button disabled={!selectedMemberId} type="submit" className="px-4 py-2 rounded-xl bg-[var(--color-scout-blue)] text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-50">
                إضافة
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="glass-card rounded-2xl border border-[var(--color-dark-border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-white/5 border-b border-[var(--color-dark-border)]">
              <tr>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">الاسم</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">الفرقة</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">الحالة</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-dark-border)]">
              {participants.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    لا يوجد مشتركين مسجلين في هذه الفعالية
                  </td>
                </tr>
              ) : (
                participants.map((participant) => (
                  <tr key={participant.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{participant.member.fullName}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {participant.member.academicYear || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={participant.status}
                        onChange={(e) => handleStatusChange(participant.id, e.target.value)}
                        className={`text-sm rounded-lg px-2 py-1 bg-transparent border focus:outline-none ${
                          participant.status === "attended" ? "text-green-400 border-green-400/30" : 
                          participant.status === "cancelled" ? "text-red-400 border-red-400/30" : 
                          "text-yellow-400 border-yellow-400/30"
                        }`}
                      >
                        <option value="registered" className="bg-[var(--color-dark-bg)] text-white">مسجل</option>
                        <option value="attended" className="bg-[var(--color-dark-bg)] text-white">حاضر</option>
                        <option value="cancelled" className="bg-[var(--color-dark-bg)] text-white">معتذر/غائب</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleRemove(participant.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="حذف من الفعالية"
                      >
                        <UserMinus size={18} />
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
