"use client";

import { useState, useMemo, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Users, Calendar, ShieldAlert, Award, CalendarDays, CheckCircle } from "lucide-react";
import { fetchVisitsAction, approveRequestAction } from "../actions";
import { toast } from "sonner";
import Link from "next/link";

type StatCard = { label: string; value: string; iconName?: string; color: string; bg: string; glow: string };

type DashboardProps = {
  stats: StatCard[];
  initialVisits: any[];
  demographics: { name: string; value: number }[];
  upcomingEvents: any[];
  pendingRequests: any[];
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

const iconsMap: Record<string, any> = {
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
    async function loadData() {
      setLoading(true);
      const newVisits = await fetchVisitsAction(timeframe);
      setVisits(newVisits);
      setLoading(false);
    }
    
    // Initial fetch already provided via props for 7d, so only fetch if it changes
    if (timeframe !== '7d') {
      loadData();
    } else {
      setVisits(initialVisits);
    }
  }, [timeframe, initialVisits]);

  // Aggregate visits by day
  const chartData = useMemo(() => {
    const aggregated: Record<string, number> = {};
    visits.forEach(v => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = iconsMap[stat.iconName || ""] || Users;
          return (
            <div key={i} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.glow} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl`} />
              <div className="relative glass-card p-6 rounded-2xl flex items-center gap-4 border border-[var(--color-dark-border)] overflow-hidden">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Traffic Chart (Spans 2 columns) */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-[var(--color-dark-border)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">إحصائيات الزيارات</h2>
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-xl px-4 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--color-scout-blue)]"
            >
              <option value="7d">آخر 7 أيام</option>
              <option value="1m">آخر شهر</option>
              <option value="1y">آخر سنة</option>
              <option value="all">كل الأوقات</option>
            </select>
          </div>
          <div className="h-72 w-full">
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
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={10}
                    minTickGap={30}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    width={35}
                    tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #2d3748', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="views" name="الزيارات" stroke="var(--color-scout-blue)" fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                لا توجد بيانات لهذه الفترة
              </div>
            )}
          </div>
        </div>

        {/* Actionable Pending Requests */}
        <div className="glass-card p-6 rounded-2xl border border-[var(--color-dark-border)] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">طلبات بانتظار المراجعة</h2>
            <Link href="/admin/requests" className="text-sm text-[var(--color-scout-blue)] hover:underline">عرض الكل</Link>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {requests.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-400/10 text-green-400 flex items-center justify-center mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-white font-bold mb-1">لا توجد طلبات معلقة</h3>
                <p className="text-gray-500 text-sm">تمت مراجعة جميع الطلبات بنجاح!</p>
              </div>
            ) : (
              requests.map(req => (
                <div key={req.id} className="bg-white/5 border border-white/5 rounded-xl p-3 flex justify-between items-center group hover:bg-white/10 transition-colors">
                  <div>
                    <h4 className="text-white text-sm font-bold">{req.fullName}</h4>
                    <p className="text-gray-400 text-xs">{req.academicYear}</p>
                  </div>
                  <button 
                    onClick={() => handleApprove(req.id)}
                    className="bg-[var(--color-scout-blue)] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    قبول
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Demographics Pie Chart */}
        <div className="glass-card p-6 rounded-2xl border border-[var(--color-dark-border)]">
          <h2 className="text-xl font-bold text-white mb-6">توزيع الأعضاء</h2>
          <div className="h-64 w-full">
            {demographics.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographics}
                    cx="50%"
                    cy="50%"
                    innerRadius="50%"
                    outerRadius="70%"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {demographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #2d3748', borderRadius: '0.75rem', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                لا توجد بيانات
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events Timeline */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-[var(--color-dark-border)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">الفعاليات القادمة</h2>
            <Link href="/admin/events" className="text-sm text-[var(--color-scout-blue)] hover:underline">إدارة الفعاليات</Link>
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">لا توجد فعاليات قادمة مجدولة.</div>
            ) : (
              upcomingEvents.map((event, i) => (
                <div key={event.id} className="relative pl-6 sm:pl-0 sm:pr-6 border-l-2 sm:border-l-0 sm:border-r-2 border-[var(--color-dark-border)] pr-4 py-2">
                  <div className="absolute top-4 -left-[7px] sm:left-auto sm:-right-[7px] w-3 h-3 rounded-full bg-[var(--color-scout-blue)] shadow-[0_0_10px_var(--color-scout-blue)]" />
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-white/10 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--color-scout-blue)]/20 text-[var(--color-scout-blue-light)]">
                          {event.eventType}
                        </span>
                        <h4 className="text-white font-bold text-lg">{event.title}</h4>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><CalendarDays size={14}/> 
                          <span dir="ltr">{new Date(event.startDate).toLocaleDateString("ar-EG")}</span>
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1 before:content-['•'] before:mx-2 before:text-gray-600">
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
