import { prisma } from "@/lib/prisma";
import MediaClient from "./MediaClient";

export default async function MediaPage() {
  let mediaList = [];
  try {
    mediaList = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database connection failed for Media page:", error);
    mediaList = [
      {
        id: "m-1",
        title: "معسكر إعداد قادة 2024",
        url: "https://images.unsplash.com/photo-1523580494112-071d45815637",
        category: "معسكرات",
        createdAt: new Date(),
      },
      {
        id: "m-2",
        title: "مسابقة التميز الكشفي",
        url: "https://images.unsplash.com/photo-1526976663112-0059bf6b595b",
        category: "مسابقات",
        createdAt: new Date("2024-01-01T00:00:00Z"),
      }
    ] as any;
  }

  return <MediaClient initialMedia={mediaList} />;
}
