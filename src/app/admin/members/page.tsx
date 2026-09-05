import { prisma } from "@/lib/prisma";
import MembersClient from "./MembersClient";

export default async function MembersPage() {
  const members = await prisma.profile.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  const shields = await prisma.shield.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return <MembersClient initialMembers={members} initialShields={shields} />;
}
