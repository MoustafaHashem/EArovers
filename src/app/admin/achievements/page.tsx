import { prisma } from "@/lib/prisma";
import AchievementsClient from "./AchievementsClient";

export default async function AchievementsPage() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AchievementsClient initialAchievements={achievements} />;
}
