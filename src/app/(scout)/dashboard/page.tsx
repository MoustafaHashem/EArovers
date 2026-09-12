import { requireAuth } from "@/lib/auth/roles";
import { prisma } from "@/lib/prisma";
import { LogOut, Calendar, Award, User } from "lucide-react";
import Link from "next/link";
import { DashboardActions } from "./DashboardActions";

export const metadata = {
  title: "لوحة الجوال | جوالة هندسة عين شمس",
};

export default async function ScoutDashboardPage() {
  const user = await requireAuth();
  
  const upcomingEvents = await prisma.event.findMany({
    where: {
      participants: {
        some: { memberId: user.id }
      },
      startDate: { gte: new Date() }
    },
    orderBy: { startDate: "asc" },
    take: 3
  });

  const allShields = await prisma.shield.findMany({
    orderBy: { sortOrder: "asc" }
  });

  const userShields = await prisma.userShield.findMany({
    where: { memberId: user.id },
    include: { shield: true }
  });

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-white p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--color-dark-border)]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-scout-blue)] to-[var(--color-anchor)] flex items-center justify-center text-2xl font-bold border-2 border-[var(--color-dark-border)]">
              {user.member?.fullName?.substring(0, 1) || "ج"}
            </div>
            <div>
              <h1 className="text-2xl font-black text-white mb-1">
                مرحباً بك، {user.member?.fullName?.split(' ')[0] || "يا جوال"}
              </h1>
              <p className="text-gray-400 text-sm">{user.member?.academicYear || "عضو في العشيرة"}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {user.member?.role === "admin" && (
              <Link href="/admin" className="px-5 py-2 rounded-xl bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30 hover:bg-purple-500/30 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                لوحة الإدارة
              </Link>
            )}
            <DashboardActions />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Events */}
            <section className="glass-card rounded-2xl p-6 border border-[var(--color-scout-blue)]/20 shadow-[0_0_30px_rgba(40,160,255,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Calendar className="text-[var(--color-scout-blue)]" />
                  فعالياتك القادمة
                </h2>
                <a href="/events" className="text-sm text-[var(--color-scout-blue)] hover:underline">عرض كل الفعاليات</a>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 bg-white/5 rounded-xl border border-dashed border-[var(--color-dark-border)]">
                    لم تقم بالتسجيل في أي فعاليات قادمة
                  </div>
                ) : (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  upcomingEvents.map((event: any) => (
                    <div key={event.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-[var(--color-dark-border)]">
                      <div className="w-16 h-16 rounded-xl bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] flex flex-col items-center justify-center shrink-0">
                        <span className="text-xs text-gray-400 uppercase">{new Date(event.startDate).toLocaleDateString("ar-EG", { month: "short" })}</span>
                        <span className="text-xl font-black text-white">{new Date(event.startDate).getDate()}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{event.location}</p>
                        <div className="flex gap-2">
                          <span className="inline-block px-2 py-1 text-xs rounded bg-green-500/10 text-green-400 border border-green-500/20">
                            مسجل
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Progress / Shields */}
            <section className="glass-card rounded-2xl p-6 border border-[var(--color-scout-blue)]/20 shadow-[0_0_30px_rgba(40,160,255,0.05)]">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <Award className="text-[var(--color-scout-blue)]" />
                تقدمك الكشفي (الدروع)
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {allShields.map(shield => {
                  const earned = userShields.find(us => us.shieldId === shield.id);
                  return (
                    <div 
                      key={shield.id}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                        earned 
                          ? "bg-[var(--color-scout-blue)]/10 border-[var(--color-scout-blue)]/30" 
                          : "bg-white/5 border-transparent grayscale opacity-50"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${
                        earned ? "bg-[var(--color-scout-blue)]/20 text-[var(--color-scout-blue)]" : "bg-black/20 text-gray-500"
                      }`}>
                        <Award size={24} />
                      </div>
                      <h3 className={`font-bold text-sm mb-1 ${earned ? "text-white" : "text-gray-400"}`}>{shield.name}</h3>
                      {earned ? (
                        <span className="text-[10px] text-[var(--color-scout-blue-light)] mt-auto pt-2 border-t border-[var(--color-scout-blue)]/20 w-full block">
                          تم الحصول عليه
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-500 mt-auto pt-2 border-t border-white/5 w-full block">
                          قفل
                        </span>
                      )}
                    </div>
                  );
                })}
                {allShields.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-500 bg-white/5 rounded-xl border border-dashed border-[var(--color-dark-border)]">
                    لا توجد دروع متاحة حالياً
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-[var(--color-scout-blue)]/20 shadow-[0_0_30px_rgba(40,160,255,0.05)]">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <User size={18} className="text-gray-400" />
                الملف الشخصي
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-[var(--color-dark-border)]">
                  <span className="text-gray-400">الاسم</span>
                  <span className="font-medium">{user.member?.fullName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--color-dark-border)]">
                  <span className="text-gray-400">الفرقة</span>
                  <span className="font-medium">{user.member?.academicYear || "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--color-dark-border)]">
                  <span className="text-gray-400">البريد</span>
                  <span className="font-medium text-gray-300" dir="ltr">{user.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--color-dark-border)]">
                  <span className="text-gray-400">رقم الهاتف</span>
                  <span className="font-medium text-gray-300" dir="ltr">{user.member?.phone || "—"}</span>
                </div>
              </div>
              <Link href="/dashboard/edit" className="flex items-center justify-center gap-2 mt-6 w-full px-6 py-3 rounded-xl bg-[var(--color-scout-blue)]/20 border border-[var(--color-scout-blue)]/30 text-[var(--color-scout-blue-light)] font-bold hover:bg-[var(--color-scout-blue)]/30 transition-all shadow-[0_0_15px_rgba(40,160,255,0.2)]">
                تعديل البيانات
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
