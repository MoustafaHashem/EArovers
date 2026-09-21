"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Clock, Filter, Mail } from "lucide-react";
import { updateRequestStatus } from "./actions";
import { toast } from "sonner";

type JoinRequest = {
  id: string;
  fullName: string;
  email: string | null;
  phone: string;
  whatsapp?: string | null;
  gender?: string | null;
  academicYear: string;
  department?: string | null;
  interests: string | null;
  interviewSlots?: string[];
  status: string;
  createdAt: Date;
};

export default function RequestsClient({ initialRequests }: { initialRequests: JoinRequest[] }) {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState("pending");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredRequests = requests.filter(r => filter === "all" || r.status === filter);

  const handleStatusChange = async (id: string, newStatus: "approved" | "rejected") => {
    const previousRequest = requests.find(r => r.id === id);
    if (!previousRequest) return;
    
    // Optimistic update
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    setLoadingId(id);
    
    const promise = updateRequestStatus(id, newStatus);
    
    toast.promise(promise, {
      loading: newStatus === "approved" ? "جاري الموافقة وإنشاء الحساب..." : "جاري رفض الطلب...",
      success: (result) => {
        if (!result.success) {
          throw new Error(result.error);
        }
        return newStatus === "approved" ? "تم قبول الطلب وإرسال دعوة بنجاح!" : "تم رفض الطلب";
      },
      error: (err) => {
        // Revert on failure
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: previousRequest.status } : r));
        return err.message || "حدث خطأ غير متوقع";
      }
    });

    await promise;
    setLoadingId(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/20"><CheckCircle2 size={12} /> مقبول</span>;
      case "rejected":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-400/10 text-red-400 border border-red-400/20"><XCircle size={12} /> مرفوض</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"><Clock size={12} /> قيد المراجعة</span>;
    }
  };

  const getCleanWaPhone = (phoneNum?: string | null) => {
    if (!phoneNum) return "";
    const digits = phoneNum.replace(/\D/g, "");
    if (digits.startsWith("0")) {
      return `2${digits}`;
    }
    return digits.startsWith("2") ? digits : `20${digits}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">طلبات الانضمام</h1>
          <p className="text-gray-400 text-sm">مراجعة طلبات الانضمام الجديدة والتواصل مع المتقدمين للإنترفيو</p>
        </div>
        
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-[var(--color-dark-border)] overflow-x-auto w-full sm:w-auto">
          {["pending", "approved", "rejected", "all"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                filter === status 
                  ? "bg-[var(--color-scout-blue)] text-white" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {status === "pending" && "قيد المراجعة"}
              {status === "approved" && "مقبول"}
              {status === "rejected" && "مرفوض"}
              {status === "all" && "الكل"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRequests.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 glass-card rounded-2xl border border-[var(--color-dark-border)]">
            لا توجد طلبات تطابق الفلتر الحالي
          </div>
        ) : (
          filteredRequests.map((request) => {
            const waNumber = getCleanWaPhone(request.whatsapp || request.phone);
            return (
              <div key={request.id} className="glass-card rounded-2xl border border-[var(--color-dark-border)] p-6 flex flex-col h-full relative overflow-hidden bg-[#0d1424]/80">
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  {getStatusBadge(request.status)}
                </div>

                <div className="pr-2 mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white">{request.fullName}</h3>
                    {request.gender && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-gray-300 border border-white/10 font-bold">
                        {request.gender === "ذكر" ? "👦 جوال" : "👧 مرشدة"}
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--color-scout-blue)] text-sm font-semibold">
                    {request.academicYear} {request.department ? `• ${request.department}` : ""}
                  </p>
                </div>
                
                <div className="space-y-3 mb-5 flex-1 text-sm">
                  {/* Phone Call */}
                  <div className="flex justify-between items-center py-2 border-b border-[var(--color-dark-border)]">
                    <span className="text-gray-400">رقم الهاتف (اتصال)</span>
                    <a href={`tel:${request.phone}`} className="text-white hover:text-cyan-400 transition-colors font-mono" dir="ltr">{request.phone}</a>
                  </div>
                  
                  {/* WhatsApp */}
                  <div className="flex justify-between items-center py-2 border-b border-[var(--color-dark-border)]">
                    <span className="text-gray-400">الواتساب</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono" dir="ltr">{request.whatsapp || request.phone}</span>
                      {waNumber && (
                        <a
                          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`أهلاً بك يا ${request.fullName} في عشيرة جوالة هندسة عين شمس!`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 rounded-md bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs font-bold transition-colors inline-flex items-center gap-1 border border-green-500/30"
                          title="فتح محادثة واتساب مباشرة"
                        >
                          واتساب 💬
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {request.email && (
                    <div className="flex justify-between items-center py-2 border-b border-[var(--color-dark-border)]">
                      <span className="text-gray-400">البريد الإلكتروني</span>
                      <a href={`mailto:${request.email}`} className="text-white hover:text-[var(--color-scout-blue)] transition-colors truncate max-w-[180px]" dir="ltr">{request.email}</a>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-2 border-b border-[var(--color-dark-border)]">
                    <span className="text-gray-400">تاريخ التقديم</span>
                    <span className="text-white" dir="ltr">{new Date(request.createdAt).toLocaleDateString("ar-EG")}</span>
                  </div>

                  {/* Interview Slots */}
                  {request.interviewSlots && request.interviewSlots.length > 0 && (
                    <div className="py-2 border-b border-[var(--color-dark-border)]">
                      <span className="text-cyan-400 text-xs font-bold block mb-1.5">
                        📅 المواعيد المتاحة للإنترفيو ({request.interviewSlots.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                        {request.interviewSlots.map((slot, i) => (
                          <span 
                            key={i} 
                            className="text-[11px] px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium"
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interests */}
                  <div className="pt-1">
                    <span className="text-gray-400 block mb-1 text-xs">الاهتمامات الكشفية:</span>
                    <p className="text-gray-300 bg-white/5 p-2.5 rounded-xl text-xs line-clamp-2">
                      {request.interests || "لم يحدد اهتمامات معينة"}
                    </p>
                  </div>
                </div>

                {request.status === "pending" && (
                  <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
                    <button
                      onClick={() => handleStatusChange(request.id, "approved")}
                      disabled={loadingId === request.id || !request.email}
                      title={!request.email ? "لا يمكن القبول كحساب بدون بريد إلكتروني" : ""}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition-colors disabled:opacity-50 text-sm"
                    >
                      <CheckCircle2 size={16} />
                      قبول
                    </button>
                    <button
                      onClick={() => handleStatusChange(request.id, "rejected")}
                      disabled={loadingId === request.id}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50 text-sm"
                    >
                      <XCircle size={16} />
                      رفض
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
