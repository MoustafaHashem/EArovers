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
  academicYear: string;
  interests: string | null;
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">طلبات الانضمام</h1>
          <p className="text-gray-400 text-sm">مراجعة طلبات الانضمام الجديدة للعشيرة</p>
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
          filteredRequests.map((request) => (
            <div key={request.id} className="glass-card rounded-2xl border border-[var(--color-dark-border)] p-6 flex flex-col h-full relative overflow-hidden">
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                {getStatusBadge(request.status)}
              </div>

              <h3 className="text-xl font-bold text-white mb-1 pr-4">{request.fullName}</h3>
              <p className="text-[var(--color-scout-blue)] text-sm mb-4">{request.academicYear}</p>
              
              <div className="space-y-3 mb-6 flex-1 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-[var(--color-dark-border)]">
                  <span className="text-gray-400">رقم الهاتف</span>
                  <a href={`tel:${request.phone}`} className="text-white hover:text-[var(--color-scout-blue)] transition-colors" dir="ltr font-mono">{request.phone}</a>
                </div>
                
                {request.email && (
                  <div className="flex justify-between items-center py-2 border-b border-[var(--color-dark-border)]">
                    <span className="text-gray-400">البريد الإلكتروني</span>
                    <a href={`mailto:${request.email}`} className="text-white hover:text-[var(--color-scout-blue)] transition-colors truncate max-w-[200px]" dir="ltr">{request.email}</a>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-2 border-b border-[var(--color-dark-border)]">
                  <span className="text-gray-400">تاريخ الطلب</span>
                  <span className="text-white" dir="ltr">{new Date(request.createdAt).toLocaleDateString("ar-EG")}</span>
                </div>

                <div className="pt-2">
                  <span className="text-gray-400 block mb-1">الاهتمامات الكشفية</span>
                  <p className="text-gray-300 bg-white/5 p-3 rounded-xl min-h-[60px] line-clamp-3">
                    {request.interests || "لم يحدد اهتمامات معينة"}
                  </p>
                </div>
              </div>

              {request.status === "pending" && (
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button
                    onClick={() => handleStatusChange(request.id, "approved")}
                    disabled={loadingId === request.id || !request.email}
                    title={!request.email ? "لا يمكن القبول بدون بريد إلكتروني" : ""}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition-colors disabled:opacity-50"
                  >
                    <CheckCircle2 size={18} />
                    قبول
                  </button>
                  <button
                    onClick={() => handleStatusChange(request.id, "rejected")}
                    disabled={loadingId === request.id}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50"
                  >
                    <XCircle size={18} />
                    رفض
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
