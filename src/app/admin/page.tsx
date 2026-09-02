import { Users, Calendar, ShieldAlert, Award, Image as ImageIcon } from "lucide-react";

export default async function AdminDashboardPage() {
  // In a real app, these stats would be fetched from Prisma
  const stats = [
    { label: "الأعضاء النشطين", value: "42", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "الفعاليات القادمة", value: "3", icon: Calendar, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "طلبات انضمام جديدة", value: "15", icon: ShieldAlert, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "إجمالي الإنجازات", value: "18", icon: Award, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">لوحة التحكم</h1>
        <p className="text-gray-400">مرحباً بك في لوحة إدارة عشيرة جوالة هندسة عين شمس</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-[var(--color-dark-border)]">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="glass-card p-6 rounded-2xl border border-[var(--color-dark-border)]">
          <h2 className="text-xl font-bold text-white mb-6">أحدث النشاطات</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-2 h-2 mt-2 rounded-full bg-[var(--color-scout-blue)] shrink-0" />
                <div>
                  <p className="text-white text-sm">تم تسجيل عضو جديد: <span className="font-bold">عمر أحمد</span></p>
                  <p className="text-gray-500 text-xs mt-1">منذ ساعتين</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6 rounded-2xl border border-[var(--color-dark-border)]">
          <h2 className="text-xl font-bold text-white mb-6">إجراءات سريعة</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href="/admin/events/new" className="p-4 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
              <Calendar className="mx-auto mb-2 text-gray-400" size={24} />
              <span className="text-sm text-gray-300 font-medium">فعالية جديدة</span>
            </a>
            <a href="/admin/media/new" className="p-4 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
              <ImageIcon className="mx-auto mb-2 text-gray-400" size={24} />
              <span className="text-sm text-gray-300 font-medium">إضافة ميديا</span>
            </a>
            <a href="/admin/members/new" className="p-4 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
              <Users className="mx-auto mb-2 text-gray-400" size={24} />
              <span className="text-sm text-gray-300 font-medium">عضو جديد</span>
            </a>
            <a href="/admin/requests" className="p-4 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors relative">
              <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <ShieldAlert className="mx-auto mb-2 text-gray-400" size={24} />
              <span className="text-sm text-gray-300 font-medium">مراجعة الطلبات</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
