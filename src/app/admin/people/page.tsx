import { prisma } from "@/lib/prisma";
import PeopleClient from "./PeopleClient";

export default async function PeoplePage() {
  const people = await prisma.person.findMany({
    orderBy: [
      { createdAt: "desc" }
    ],
  });

  return <PeopleClient initialPeople={people} />;
}
