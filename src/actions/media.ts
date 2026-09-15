"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getCachedMedia = unstable_cache(
  async (category: string, limit?: number) => {
    const whereClause = category === "الكل" ? {} : { category };
    return await prisma.media.findMany({
      where: whereClause,
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ],
      take: limit,
    });
  },
  ['media-fetch'],
  { tags: ['media'], revalidate: 86400 } // Cache for 24 hours, invalidate via tag
);

export async function fetchMediaAction(category: string, limit?: number) {
  const media = await getCachedMedia(category, limit);
  
  return media.map(m => ({
    id: m.id,
    url: m.url,
    title: m.title || "ذكرى جديدة",
    format: m.url.endsWith(".mp4") ? "mp4" : "jpg"
  }));
}
