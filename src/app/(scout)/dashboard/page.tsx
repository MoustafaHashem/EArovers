import { requireAuth } from "@/lib/auth/roles";
import { prisma } from "@/lib/prisma";
import { Calendar, Award, User, LogOut } from "lucide-react";

export const metadata = {
  title: "لوحة الجوال | جوالة هندسة عين شمس",
};

export default async function ScoutDashboardPage() {
  const user = await requireAuth();
  
  // Try to fetch user's events from DB
  let upcomingEvents = [];
  try {
    upcomingEvents = await prisma.event.findMany({
      where: {
        participants: {
          some: { profileId: user.id }
        },
        startDate: { gte: new Date() }
      },
      orderBy: { startDate: "asc" },
      take: 3
    });
  } catch (error) {
    console.error("DB connection failed for Scout Dashboard:", error);
    // Mock data for UI
    upcomingEvents = [
      {
        id: "mock-1",
        title: "معسكر إعداد قادة",
        startDate: new Date(Date.now() + 86400000 * 3),
        location: "الكشافة البحرية - الجيزة"
      }
    ] as any;
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-white p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--color-dark-border)]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-scout-blue)] to-[var(--color-anchor)] flex items-center justify-center text-2xl font-bold border-2 border-[var(--color-dark-border)]">
              {user.profile?.fullName?.substring(0, 1) || "ج"}
            </div>
            <div>
              <h1 className="text-2xl font-black text-white mb-1">
                مرحباً بك، {user.profile?.fullName?.split(' ')[0] || "يا جوال"}
              </h1>
              <p className="text-gray-400 text-sm">{user.profile?.academicYear || "عضو في العشيرة"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user.profile?.role === "admin" && (
              <a href="/admin" className="px-5 py-2 rounded-xl bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30 hover:bg-purple-500/30 transition-colors">
                لوحة الإدارة
              </a>
            )}
            <form action="/auth/signout" method="POST">
              <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/5 text-gray-300 font-medium hover:bg-white/10 hover:text-white transition-colors border border-[var(--color-dark-border)]">
                <LogOut size={18} />
                خروج
              </button>
            </form>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Events */}
            <section className="glass-card rounded-2xl p-6 border border-[var(--color-dark-border)]">
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
            <section className="glass-card rounded-2xl p-6 border border-[var(--color-dark-border)]">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <Award className="text-[var(--color-scout-blue)]" />
                تقدمك الكشفي
              </h2>
              <div className="text-center py-10 px-4 bg-white/5 rounded-xl border border-dashed border-[var(--color-dark-border)]">
                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-dark-bg)] rounded-full flex items-center justify-center border-2 border-[var(--color-dark-border)] text-gray-500">
                  <Award size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-300 mb-2">قريباً: نظام التقدم والدروع</h3>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">
                  ستتمكن قريباً من متابعة تقدمك في الحصول على الدروع الكشفية والشارات من خلال هذه اللوحة.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-[var(--color-dark-border)]">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <User size={18} className="text-gray-400" />
                الملف الشخصي
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-[var(--color-dark-border)]">
                  <span className="text-gray-400">الاسم</span>
                  <span className="font-medium">{user.profile?.fullName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--color-dark-border)]">
                  <span className="text-gray-400">الفرقة</span>
                  <span className="font-medium">{user.profile?.academicYear || "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--color-dark-border)]">
                  <span className="text-gray-400">البريد</span>
                  <span className="font-medium text-gray-300" dir="ltr">{user.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--color-dark-border)]">
                  <span className="text-gray-400">رقم الهاتف</span>
                  <span className="font-medium text-gray-300" dir="ltr">{user.profile?.phone || "—"}</span>
                </div>
              </div>
              <button className="w-full mt-6 py-2 rounded-xl bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors border border-[var(--color-dark-border)]">
                تعديل البيانات
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
