import { prisma } from "@/lib/prisma";
import MembersClient from "./MembersClient";

export default async function MembersPage() {
  // Try to fetch members, fallback to empty array if DB connection fails
  let members = [];
  try {
    members = await prisma.profile.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database connection failed for Members page:", error);
    // Return mock data for UI testing if DB is offline
    members = [
      {
        id: "1",
        fullName: "عمر أحمد",
        academicYear: "الفرقة الثالثة مدني",
        phone: "01000000000",
        role: "admin",
        createdAt: new Date(),
      },
      {
        id: "2",
        fullName: "زياد خالد",
        academicYear: "الفرقة الرابعة عمارة",
        phone: "01111111111",
        role: "scout",
        createdAt: new Date(),
      }
    ] as any;
  }

  return <MembersClient initialMembers={members} />;
}
