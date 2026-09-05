import { prisma } from "@/lib/prisma";
import EventDetailsClient from "./EventDetailsClient";
import { notFound } from "next/navigation";

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      participants: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!event) return notFound();

  const allProfiles = await prisma.profile.findMany({
    orderBy: { fullName: "asc" },
  });

  return <EventDetailsClient event={event} allProfiles={allProfiles} />;
}
