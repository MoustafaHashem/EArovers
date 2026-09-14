"use client";

import { Calendar, Shield, MapPin, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardActions } from "@/app/(scout)/dashboard/DashboardActions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DesktopDashboard({
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
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-[var(--color-scout-blue)]/50 shadow-[0_0_20px_rgba(40,160,255,0.2)]">
              <AvatarImage src={user.member?.avatarUrl || ""} />
              <AvatarFallback className="bg-gradient-to-br from-[var(--color-scout-blue)] to-[#0f1b2d] text-white text-xl font-bold">
                {user.member?.fullName?.substring(0, 1) || "ج"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-black text-white mb-1 tracking-tight">
                مرحباً بك، {user.member?.fullName?.split(" ")[0] || "يا جوال"}
              </h1>
              <p className="text-gray-400 text-sm font-medium">{user.member?.academicYear || "عضو في العشيرة"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DashboardActions isAdmin={user.member?.role === "admin"} />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Events */}
            <Card className="bg-white/[0.02] border-white/5 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-scout-blue)]/10 blur-[100px] pointer-events-none" />
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                    <Calendar className="text-[var(--color-scout-blue)] w-5 h-5" />
                    فعالياتك القادمة
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    أهم المواعيد والأنشطة القادمة
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {upcomingEvents.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 bg-black/20 rounded-xl border border-dashed border-white/10">
                      لم تقم بالتسجيل في أي فعاليات قادمة
                    </div>
                  ) : (
                    upcomingEvents.map((event) => (
                      <div key={event.id} className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10 cursor-pointer">
                        <div className="w-16 h-16 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center shrink-0 group-hover:bg-[var(--color-scout-blue)]/10 transition-colors shadow-inner">
                          <span className="text-[10px] text-gray-400 uppercase font-bold">{new Date(event.startDate).toLocaleDateString("ar-EG", { month: "short" })}</span>
                          <span className="text-2xl font-black text-white">{new Date(event.startDate).getDate()}</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="font-bold text-white mb-1 group-hover:text-[var(--color-scout-blue-light)] transition-colors">{event.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                            <span className="flex items-center gap-1"><MapPin size={14} className="text-emerald-400" /> {event.location || "لم يحدد"}</span>
                          </div>
                          <Badge variant="outline" className="w-fit bg-white/5 border-white/10 text-gray-300">
                            {event.eventType}
                          </Badge>
                        </div>
                        <div className="hidden sm:flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[var(--color-scout-blue)] group-hover:text-[var(--color-scout-blue-light)] transition-colors">
                            <span className="text-xl">←</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Shields/Achievements */}
            <Card className="bg-white/[0.02] border-white/5 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] pointer-events-none" />
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                    <Shield className="text-[var(--color-glow-gold)] w-5 h-5" />
                    أحدث الدروع التي حصلت عليها
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    سجلك الشرفي في العشيرة
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userShields.length === 0 ? (
                    <div className="col-span-2 text-center py-10 text-gray-500 bg-black/20 rounded-xl border border-dashed border-white/10">
                      لم تحصل على أي دروع بعد. استمر في الاجتهاد!
                    </div>
                  ) : (
                    userShields.map((userShield) => (
                      <div key={userShield.id} className="relative group overflow-hidden flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-[var(--color-glow-gold)]/50 transition-all cursor-pointer">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[var(--color-glow-gold)]/10 blur-2xl rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-16 h-16 mb-4 bg-gradient-to-br from-black to-[#1a1500] border border-[var(--color-glow-gold)]/30 rounded-full flex items-center justify-center shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-500">
                          <Shield className="text-[var(--color-glow-gold)]" size={32} />
                        </div>
                        <h3 className="font-bold text-white mb-2 relative z-10">{userShield.shield.title}</h3>
                        <Badge variant="outline" className="bg-black/50 border-[var(--color-glow-gold)]/30 text-[var(--color-glow-gold)] relative z-10">
                          {new Date(userShield.awardedAt).getFullYear()}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Quick Actions / Requests Status */}
            <Card className="bg-white/[0.02] border-white/5 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <CardHeader className="border-b border-white/5 pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                  <Search className="text-purple-400 w-5 h-5" />
                  طلباتك الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {pendingRequests.length === 0 ? (
                    <div className="text-center py-6 text-gray-500 text-sm">
                      ليس لديك طلبات معلقة
                    </div>
                  ) : (
                    pendingRequests.map((req) => (
                      <div key={req.id} className="flex flex-col gap-3 p-4 rounded-xl bg-black/20 border border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">طلب الانضمام</span>
                          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                            قيد الانتظار
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400">
                          تم التقديم: {new Date(req.createdAt).toLocaleDateString("ar-EG")}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
