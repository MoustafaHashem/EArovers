"use client";

import { useState, useMemo, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Users, Calendar, ShieldAlert, Award, CalendarDays, CheckCircle, Clock } from "lucide-react";
import { fetchVisitsAction, approveRequestAction } from "@/app/admin/actions";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

export default function AdminDashboardClient({ stats, initialVisits, demographics, upcomingEvents, pendingRequests: initialRequests }: DashboardProps) {
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
    
    // Initial fetch already provided via props for 7d, so only fetch if it changes
    if (timeframe !== '7d') {
      loadData();
    } else {
      // Use setTimeout to avoid synchronous setState during render if effect runs synchronously
      setTimeout(() => {
        if (mounted) setVisits(initialVisits);
      }, 0);
    }
    return () => { mounted = false; };
  }, [timeframe, initialVisits]);

  // Aggregate visits by day
  const chartData = useMemo(() => {
    const aggregated: Record<string, number> = {};
    visits.forEach((v: { createdAt: string | Date }) => {
      // Format as YYYY-MM-DD
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">لوحة التحكم</h1>
        <p className="text-gray-400">مرحباً بك في لوحة إدارة عشيرة جوالة هندسة عين شمس</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = iconsMap[stat.iconName || ""] || Users;
          return (
            <Card key={i} className="bg-white/[0.02] border-white/5 shadow-xl relative overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.glow} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl pointer-events-none`} />
              <CardContent className="p-6 flex items-center gap-4 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Traffic Chart (Spans 2 columns) */}
        <Card className="lg:col-span-2 bg-white/[0.02] border-white/5 shadow-2xl backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-white">إحصائيات الزيارات</CardTitle>
              <CardDescription className="text-gray-400">نظرة عامة على نشاط الموقع</CardDescription>
            </div>
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-scout-blue)]"
            >
              <option value="7d">آخر 7 أيام</option>
              <option value="1m">آخر شهر</option>
              <option value="1y">آخر سنة</option>
              <option value="all">كل الأوقات</option>
            </select>
          </CardHeader>
          <CardContent className="pt-6 h-[350px]">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-t-[var(--color-scout-blue)] border-white/20 rounded-full animate-spin" />
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-scout-blue)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-scout-blue)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={10}
                    minTickGap={30}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    width={40}
                    tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: '#fff', fontSize: '14px', backdropFilter: 'blur(8px)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="views" name="الزيارات" stroke="var(--color-scout-blue)" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 bg-black/10 rounded-xl border border-dashed border-white/5">
                لا توجد بيانات لهذه الفترة
              </div>
            )}
          </CardContent>
        </Card>

        {/* Demographics Pie Chart */}
        <Card className="bg-white/[0.02] border-white/5 shadow-2xl backdrop-blur-sm">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="text-xl font-bold text-white">توزيع الأعضاء</CardTitle>
            <CardDescription className="text-gray-400">توزيع أعضاء العشيرة حسب الفئة</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 h-[350px]">
            {demographics.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographics}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {demographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: '#fff', backdropFilter: 'blur(8px)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '14px', color: '#9ca3af', paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 bg-black/10 rounded-xl border border-dashed border-white/5">
                لا توجد بيانات
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actionable Pending Requests */}
        <Card className="lg:col-span-2 bg-white/[0.02] border-white/5 shadow-2xl backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldAlert className="text-amber-500 w-5 h-5" />
                طلبات بانتظار المراجعة
              </CardTitle>
              <CardDescription className="text-gray-400">قم بمراجعة طلبات الانضمام الجديدة</CardDescription>
            </div>
            <Link href="/admin/requests" className="text-sm font-semibold text-[var(--color-scout-blue)] hover:text-white hover:underline underline-offset-4 transition-colors">
              عرض الكل
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {requests.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 rounded-full bg-green-400/10 text-green-400 flex items-center justify-center mb-4 shadow-inner">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">لا توجد طلبات معلقة</h3>
                <p className="text-gray-500">تمت مراجعة جميع الطلبات بنجاح!</p>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-black/20">
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-medium">الاسم</TableHead>
                    <TableHead className="text-gray-400 font-medium">الفرقة</TableHead>
                    <TableHead className="text-gray-400 font-medium text-left">الإجراء</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map(req => (
                    <TableRow key={req.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8 border border-white/10">
                            <AvatarFallback className="bg-[var(--color-scout-blue)]/20 text-[var(--color-scout-blue-light)] text-xs">
                              {req.fullName.substring(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-bold text-white">{req.fullName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400">{req.academicYear}</TableCell>
                      <TableCell className="text-left">
                        <Button 
                          onClick={() => handleApprove(req.id)}
                          variant="outline"
                          size="sm"
                          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20 font-bold rounded-full h-8"
                        >
                          قبول
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events Timeline */}
        <Card className="bg-white/[0.02] border-white/5 shadow-2xl backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <CalendarDays className="text-purple-400 w-5 h-5" />
                الفعاليات القادمة
              </CardTitle>
              <CardDescription className="text-gray-400">الأنشطة المجدولة قريباً</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-10 text-gray-500 bg-black/10 rounded-xl border border-dashed border-white/5">
                  لا توجد فعاليات قادمة مجدولة.
                </div>
              ) : (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="relative pl-6 sm:pl-0 sm:pr-6 border-l-2 sm:border-l-0 sm:border-r-2 border-white/10 pr-4 py-1">
                    <div className="absolute top-2.5 -left-[7px] sm:left-auto sm:-right-[7px] w-3 h-3 rounded-full bg-[var(--color-scout-blue)] shadow-[0_0_10px_var(--color-scout-blue)]" />
                    <div className="bg-black/20 border border-white/5 rounded-xl p-4 flex flex-col gap-2 hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-[10px] bg-[var(--color-scout-blue)]/10 text-[var(--color-scout-blue-light)] border-[var(--color-scout-blue)]/20 px-2 py-0">
                          {event.eventType}
                        </Badge>
                      </div>
                      <h4 className="text-white font-bold text-md group-hover:text-[var(--color-scout-blue-light)] transition-colors">{event.title}</h4>
                      <div className="flex flex-col gap-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5"><CalendarDays size={14} className="text-gray-500"/> 
                          <span dir="ltr">{new Date(event.startDate).toLocaleDateString("ar-EG")}</span>
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} className="text-gray-500"/>
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 text-center">
              <Link href="/admin/events" className="inline-flex shrink-0 justify-center items-center w-full h-10 bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-colors rounded-lg font-medium text-sm">
                إدارة جميع الفعاليات
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
