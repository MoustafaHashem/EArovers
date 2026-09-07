import { prisma } from "@/lib/prisma";
import EventsClient from "./EventsClient";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startDate: "desc" },
  });

  return <EventsClient initialEvents={events} />;
}
