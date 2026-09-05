"use server";

import { prisma } from "@/lib/prisma";

export async function fetchMediaAction(category: string, limit?: number) {
  // Fetch from the local database where we manage sortOrder, isFeatured, and category
  const whereClause = category === "الكل" ? {} : { category };
  
  const media = await prisma.media.findMany({
    where: whereClause,
    orderBy: [
      { sortOrder: 'asc' },
      { createdAt: 'desc' }
    ],
    take: limit, // If undefined, Prisma returns all records matching the query
  });
  
  // Format exactly how the frontend expects it (matching CloudinaryImage type)
  return media.map(m => ({
    id: m.id,
    url: m.url,
    title: m.title || "ذكرى جديدة",
    format: m.url.endsWith(".mp4") ? "mp4" : "jpg"
  }));
}
