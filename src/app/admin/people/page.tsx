import { prisma } from "@/lib/prisma";
import PeopleClient from "./PeopleClient";

export default async function PeoplePage() {
  let people = [];
  try {
    people = await prisma.person.findMany({
      orderBy: [
        { year: "desc" },
        { createdAt: "desc" }
      ],
    });
  } catch (error) {
    console.error("Database connection failed for People page:", error);
    people = [
      {
        id: "p-1",
        fullName: "قائد خالد منصور",
        roleTitle: "قائد العشيرة",
        tier: "high_council",
        year: 2025,
        avatarUrl: null,
      },
      {
        id: "p-2",
        fullName: "رائد أحمد جمال",
        roleTitle: "رائد الرهط الأول",
        tier: "management",
        year: 2025,
        avatarUrl: null,
      }
    ] as any;
  }

  return <PeopleClient initialPeople={people} />;
}
