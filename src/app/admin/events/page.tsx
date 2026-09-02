import { prisma } from "@/lib/prisma";
import EventsClient from "./EventsClient";

export default async function EventsPage() {
  let events = [];
  try {
    events = await prisma.event.findMany({
      orderBy: { startDate: "desc" },
    });
  } catch (error) {
    console.error("Database connection failed for Events page:", error);
    events = [
      {
        id: "e-1",
        title: "معسكر إعداد القادة 2025",
        eventType: "معسكر",
        location: "الكشافة البحرية - الجيزة",
        startDate: new Date(),
        isPublic: true,
        maxParticipants: 50,
      },
      {
        id: "e-2",
        title: "مسابقة التميز الكشفي",
        eventType: "مسابقة",
        location: "كلية الهندسة",
        startDate: new Date(Date.now() + 86400000 * 5),
        isPublic: false,
        maxParticipants: null,
      }
    ] as any;
  }

  return <EventsClient initialEvents={events} />;
}
