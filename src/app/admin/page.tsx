import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./components/AdminDashboardClient";

export default async function AdminDashboardPage() {
  let activeMembersCount = 0;
  let upcomingEventsCount = 0;
  let pendingRequestsCount = 0;
  let achievementsCount = 0;
  
  let demographics: { name: string; value: number }[] = [];
  let upcomingEventsList: any[] = [];
  let pendingRequestsList: any[] = [];
  let initialVisits: any[] = [];

  try {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    const [
      members, 
      events, 
      requests, 
      achievements,
      demoGroups,
      upcoming,
      pendingReqs,
      visits
    ] = await Promise.all([
      prisma.profile.count(),
      prisma.event.count({ where: { startDate: { gte: now } } }),
      prisma.joinRequest.count({ where: { status: "pending" } }),
      prisma.achievement.count(),
      prisma.profile.groupBy({
        by: ['academicYear'],
        _count: { id: true }
      }),
      prisma.event.findMany({
        where: { startDate: { gte: now } },
        orderBy: { startDate: 'asc' },
        take: 3
      }),
      prisma.joinRequest.findMany({
        where: { status: "pending" },
        orderBy: { createdAt: 'asc' },
        take: 5
      }),
      prisma.pageVisit.findMany({
        where: { createdAt: { gte: sevenDaysAgo } },
        select: { createdAt: true, path: true },
        orderBy: { createdAt: 'asc' }
      })
    ]);
    
    activeMembersCount = members;
    upcomingEventsCount = events;
    pendingRequestsCount = requests;
    achievementsCount = achievements;
    
    // Map demographics for pie chart
    demographics = demoGroups
      .filter(g => g.academicYear)
      .map(g => ({
        name: g.academicYear!,
        value: g._count.id
      }))
      .sort((a, b) => b.value - a.value);

    upcomingEventsList = upcoming;
    pendingRequestsList = pendingReqs;
    initialVisits = visits;

  } catch (error) {
    console.error("Dashboard fetch error:", error);
  }

  const stats = [
    { label: "الأعضاء النشطين", value: activeMembersCount.toString(), iconName: "users", color: "text-blue-400", bg: "bg-blue-400/10", glow: "bg-blue-400/20" },
    { label: "الفعاليات القادمة", value: upcomingEventsCount.toString(), iconName: "calendar", color: "text-green-400", bg: "bg-green-400/10", glow: "bg-green-400/20" },
    { label: "طلبات انضمام جديدة", value: pendingRequestsCount.toString(), iconName: "requests", color: "text-yellow-400", bg: "bg-yellow-400/10", glow: "bg-yellow-400/20" },
    { label: "إجمالي الإنجازات", value: achievementsCount.toString(), iconName: "achievements", color: "text-purple-400", bg: "bg-purple-400/10", glow: "bg-purple-400/20" },
  ];

  return (
    <AdminDashboardClient 
      stats={stats}
      initialVisits={initialVisits}
      demographics={demographics}
      upcomingEvents={upcomingEventsList}
      pendingRequests={pendingRequestsList}
    />
  );
}
