"use client";

import { useState, useMemo, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Users, Calendar, ShieldAlert, Award, CalendarDays, CheckCircle, Clock, Search } from "lucide-react";
import { fetchVisitsAction, approveRequestAction } from "@/app/admin/actions";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type StatCard = { label: string; value: string; iconName?: string; color: string; bg: string; glow: string };

type DashboardProps = {
  stats: StatCard[];
  initialVisits: { createdAt: string | Date }[];
  demographics: { name: string; value: number }[];
  upcomingEvents: { id: string; eventType: string; title: string; startDate: string | Date; location?: string }[];
  pendingRequests: { id: string; fullName: string; academicYear: string }[];
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

const iconsMap: Record<string, React.ElementType> = {
  users: Users,
  calendar: Calendar,
  requests: ShieldAlert,
  achievements: Award
};

export function MobileAdminDashboard({ stats, initialVisits, demographics, upcomingEvents, pendingRequests: initialRequests }: DashboardProps) {
  const [timeframe, setTimeframe] = useState('7d');
  const [visits, setVisits] = useState(initialVisits);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState(initialRequests);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setLoading(true);
      const newVisits = await fetchVisitsAction(timeframe);
      if (mounted) {
        setVisits(newVisits);
        setLoading(false);
      }
    }
    
    if (timeframe !== '7d') {
      loadData();
    } else {
      setTimeout(() => {
        if (mounted) setVisits(initialVisits);
      }, 0);
    }
    return () => { mounted = false; };
  }, [timeframe, initialVisits]);

  const chartData = useMemo(() => {
    const aggregated: Record<string, number> = {};
    visits.forEach((v: { createdAt: string | Date }) => {
      const dateStr = new Date(v.createdAt).toISOString().split('T')[0];
      aggregated[dateStr] = (aggregated[dateStr] || 0) + 1;
    });

    return Object.keys(aggregated).sort().map(date => ({
      date,
      views: aggregated[date]
    }));
  }, [visits]);

  const handleApprove = async (id: string) => {
    const previous = [...requests];
    setRequests(prev => prev.filter(r => r.id !== id));
    
    const res = await approveRequestAction(id);
    if (res.success) {
      toast.success("تم قبول الطلب بنجاح");
    } else {
      setRequests(previous);
      toast.error("فشل قبول الطلب");
    }
  };

  return (
    <div className="space-y-6 pb-safe pt-6">

      {/* Stats Grid - 2x2 Layout */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {stats.map((stat, i) => {
          const Icon = iconsMap[stat.iconName || ""] || Users;
          return (
            <Card key={i} className="border-white/5 bg-[var(--color-dark-surface)] shadow-lg overflow-hidden relative group">
              <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-[40px] opacity-20 ${stat.glow}`} />
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className={`p-3 rounded-2xl ${stat.bg} mb-3 relative z-10 transition-transform group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter mb-1 relative z-10">{stat.value}</h3>
                <p className="text-xs font-bold text-gray-400 relative z-10">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="px-4 space-y-6">
        {/* Pending Requests Section */}
        <Card className="border-white/5 bg-[var(--color-dark-surface)] shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-black flex items-center gap-2 text-white">
              <ShieldAlert className="text-amber-500 w-5 h-5" />
              طلبات الانضمام
            </CardTitle>
            {requests.length > 0 && (
              <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-500 bg-amber-500/10">
                {requests.length} جديد
              </Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {requests.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-10 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <div className="w-12 h-12 rounded-full bg-green-400/10 text-green-400 flex items-center justify-center mb-3">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">لا توجد طلبات معلقة</h3>
              </div>
            ) : (
              requests.map(req => (
                <div key={req.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-white/10">
                      <AvatarFallback className="bg-[var(--color-scout-blue)]/20 text-[var(--color-scout-blue-light)] text-sm font-black">
                        {req.fullName.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-white text-sm mb-0.5">{req.fullName}</h4>
                      <p className="text-[10px] text-gray-400 font-medium">{req.academicYear}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleApprove(req.id)}
                    size="sm"
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold rounded-xl h-8 px-3 text-xs"
                  >
                    قبول
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Traffic Chart */}
        <Card className="border-white/5 bg-[var(--color-dark-surface)] shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-black text-white">إحصائيات الزيارات</CardTitle>
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] font-bold text-white focus:outline-none"
            >
              <option value="7d">آخر 7 أيام</option>
              <option value="1m">آخر شهر</option>
            </select>
          </CardHeader>
          <CardContent>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 h-[250px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-scout-blue)]/5 blur-3xl pointer-events-none rounded-full" />
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-t-[var(--color-scout-blue)] border-white/20 rounded-full animate-spin" />
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViewsMob" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-scout-blue)" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="var(--color-scout-blue)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    stroke="#4b5563" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => new Date(val).getDate().toString()}
                  />
                  <YAxis 
                    stroke="#4b5563" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="var(--color-scout-blue)" strokeWidth={2} fillOpacity={1} fill="url(#colorViewsMob)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                لا توجد بيانات
              </div>
            )}
          </div>
          </CardContent>
        </Card>

        {/* Demographics Chart */}
        <Card className="border-white/5 bg-[var(--color-dark-surface)] shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-black text-white">توزيع الأعضاء</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 h-[250px]">
            {demographics.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographics}
                    cx="50%"
                    cy="45%"
                    innerRadius="50%"
                    outerRadius="75%"
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {demographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '10px', color: '#9ca3af' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                لا توجد بيانات
              </div>
            )}
          </div>
          </CardContent>
        </Card>

        {/* Upcoming Events List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black flex items-center gap-2 text-white">
              <CalendarDays className="text-purple-400 w-5 h-5" />
              الفعاليات القادمة
            </h2>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-10 text-gray-500 bg-white/5 rounded-2xl border border-dashed border-white/10 text-sm">
                لا توجد فعاليات قادمة
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="relative overflow-hidden p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[9px] bg-[var(--color-scout-blue)]/10 text-[var(--color-scout-blue-light)] border-[var(--color-scout-blue)]/20 px-2 py-0 h-5">
                      {event.eventType}
                    </Badge>
                    <span className="text-[10px] text-gray-400 font-bold" dir="ltr">{new Date(event.startDate).toLocaleDateString("ar-EG")}</span>
                  </div>
                  <h4 className="text-white font-bold text-sm leading-tight">{event.title}</h4>
                  {event.location && (
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                      <Clock size={12}/>
                      {event.location}
                    </span>
                  )}
                </div>
              ))
            )}
            
            {upcomingEvents.length > 0 && (
              <Button render={<Link href="/admin/events">عرض المزيد من الفعاليات</Link>} variant="outline" className="w-full bg-white/5 border-white/10 text-gray-400 hover:text-white rounded-xl h-10 mt-2 font-bold text-xs" />
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
