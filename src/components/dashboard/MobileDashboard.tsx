"use client";

import { Calendar, Shield, MapPin, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardActions } from "@/app/(scout)/dashboard/DashboardActions";
import { Badge } from "@/components/ui/badge";

export function MobileDashboard({
  user,
  upcomingEvents,
  userShields,
  pendingRequests,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upcomingEvents: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userShields: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pendingRequests: any[];
}) {
  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-white font-sans pb-safe">
      {/* Dynamic Header - Compact Horizontal Layout */}
      <div className="relative pt-6 pb-6 px-4 bg-[var(--color-scout-navy)] border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-scout-blue)]/10 blur-[80px] pointer-events-none rounded-full" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-5">
            {/* Avatar on Right (RTL) */}
            <Avatar className="w-16 h-16 border-2 border-[var(--color-scout-blue)]/50 shadow-[0_0_20px_rgba(40,160,255,0.2)] bg-[#0f1b2d] shrink-0">
              <AvatarImage src={user.member?.avatarUrl || ""} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-[var(--color-scout-blue)] to-[#0f1b2d] text-white text-xl font-black">
                {user.member?.fullName?.substring(0, 1) || "ج"}
              </AvatarFallback>
            </Avatar>
            
            {/* Text on Left */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 tracking-tight mb-0.5 truncate">
                مرحباً بك، {user.member?.fullName?.split(" ")[0] || "يا جوال"}
              </h1>
              <p className="text-[var(--color-scout-blue-light)] text-xs font-bold opacity-80 truncate">
                {user.member?.academicYear || "عضو في العشيرة"}
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <DashboardActions isAdmin={user.member?.role === "admin"} />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Events Section */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-lg font-black flex items-center gap-2">
              <Calendar className="text-[var(--color-scout-blue)] w-5 h-5" />
              أحدث الفعاليات
            </h2>
            <Badge variant="outline" className="text-[10px] border-[var(--color-scout-blue)]/30 text-[var(--color-scout-blue-light)] bg-[var(--color-scout-blue)]/10">
              {upcomingEvents.length}
            </Badge>
          </div>
          
          <div className="grid gap-3">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-400 bg-white/5 rounded-2xl border border-dashed border-white/10 text-sm">
                لم تقم بالتسجيل في أي فعاليات قادمة
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="group relative overflow-hidden flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 active:scale-[0.98] transition-transform">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-scout-blue)]/5 blur-3xl rounded-full pointer-events-none" />
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-scout-navy)] to-black border border-white/10 flex flex-col items-center justify-center shrink-0 shadow-inner z-10">
                    <span className="text-[9px] text-[var(--color-scout-blue-light)] font-black uppercase tracking-wider">{new Date(event.startDate).toLocaleDateString("ar-EG", { month: "short" })}</span>
                    <span className="text-xl font-black text-white leading-tight">{new Date(event.startDate).getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0 z-10">
                    <h3 className="font-bold text-white mb-1 truncate text-base">{event.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin size={12} className="text-emerald-400" />
                      <span className="truncate">{event.location || "لم يحدد"}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Shields Section */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-lg font-black flex items-center gap-2">
              <Shield className="text-[var(--color-glow-gold)] w-5 h-5" />
              دروعك وإنجازاتك
            </h2>
            <Badge variant="outline" className="text-[10px] border-[var(--color-glow-gold)]/30 text-[var(--color-glow-gold)] bg-[var(--color-glow-gold)]/10">
              {userShields.length}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {userShields.length === 0 ? (
              <div className="col-span-2 text-center py-8 text-gray-400 bg-white/5 rounded-2xl border border-dashed border-white/10 text-sm">
                لم تحصل على أي دروع بعد.
              </div>
            ) : (
              userShields.map((userShield) => (
                <div key={userShield.id} className="relative overflow-hidden flex flex-col items-center text-center p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[var(--color-glow-gold)]/10 blur-xl rounded-full pointer-events-none" />
                  <div className="w-12 h-12 mb-3 bg-gradient-to-br from-[var(--color-scout-navy)] to-black border border-[var(--color-glow-gold)]/30 rounded-full flex items-center justify-center shadow-inner relative z-10">
                    <Shield className="text-[var(--color-glow-gold)]" size={20} />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1 leading-tight relative z-10">{userShield.shield.title}</h3>
                  <span className="text-[10px] font-medium text-gray-400 relative z-10">{new Date(userShield.awardedAt).getFullYear()}</span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Join Requests Section */}
        {pendingRequests.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-black flex items-center gap-2">
                <Search className="text-purple-400 w-5 h-5" />
                طلباتك المعلقة
              </h2>
            </div>
            
            <div className="space-y-3">
              {pendingRequests.map((req) => (
                <div key={req.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-purple-500/20">
                  <div>
                    <p className="text-sm font-bold text-white mb-1">طلب الانضمام للفريق</p>
                    <p className="text-[11px] text-gray-400">{new Date(req.createdAt).toLocaleDateString("ar-EG")}</p>
                  </div>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                    قيد الانتظار
                  </Badge>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
