import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/roles";
import { prisma } from "@/lib/prisma";
import { MobileDashboard } from "@/components/dashboard/MobileDashboard";
import { DesktopDashboard } from "@/components/dashboard/DesktopDashboard";

export default async function ScoutDashboardPage() {
  const user = await getCurrentUser();

  if (!user || !user.member) {
    redirect("/login");
  }

  // Fetch Member Data
  const memberId = user.member.id;

  const [upcomingEvents, userShields, pendingRequests] = await Promise.all([
    prisma.event.findMany({
      where: {
        participants: { some: { memberId } },
        startDate: { gte: new Date() },
      },
      orderBy: { startDate: "asc" },
      take: 3,
    }),
    prisma.userShield.findMany({
      where: { memberId },
      include: { shield: true },
      orderBy: { awardedAt: "desc" },
      take: 4,
    }),
    prisma.joinRequest.findMany({
      where: { email: user.email, status: "pending" },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <DesktopDashboard 
          user={user}
          upcomingEvents={upcomingEvents}
          userShields={userShields}
          pendingRequests={pendingRequests}
        />
      </div>

      {/* Mobile Version */}
      <div className="block lg:hidden">
        <MobileDashboard 
          user={user}
          upcomingEvents={upcomingEvents}
          userShields={userShields}
          pendingRequests={pendingRequests}
        />
      </div>
    </>
  );
}
