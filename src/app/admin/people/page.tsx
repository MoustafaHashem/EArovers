import { prisma } from "@/lib/prisma";
import PeopleClient from "./PeopleClient";

export default async function PeoplePage() {
  const people = await prisma.member.findMany({
    orderBy: [
      { createdAt: "desc" }
    ],
  });

  return <PeopleClient initialMembers={people} />;
}
