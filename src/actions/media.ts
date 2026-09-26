"use server";

import { EVENTS_DATA } from "@/data/eventsData";
import { TOURNAMENTS_DATA } from "@/data/tournamentsData";

export type GalleryMediaItem = {
  id: string;
  url: string;
  title: string;
  category: "دروع" | "مسابقات" | "فعاليات" | "كواليس";
  subcategory?: string;
  format: "image" | "mp4";
};

function normalizeEventCategory(type: string) {
  if (type.includes("معسكر")) return "معسكرات";
  if (type.includes("دراس")) return "دراسات";
  if (type.includes("سيشن") || type.includes("ندوة") || type.includes("ورشة")) return "سيشنات";
  if (type.includes("خدم")) return "خدمة عامة";
  return "متنوع";
}

const TOURNAMENT_SUBCATEGORIES = {
  wafdeya: "وفديات",
  sports: "رياضية",
  arts: "فنون واسمار",
  scout: "كشفي",
  naval: "بحري",
} as const;

function buildGalleryMedia(): GalleryMediaItem[] {
  const media: GalleryMediaItem[] = [];

  TOURNAMENTS_DATA.forEach((tournament) => {
    const urls = [...new Set([tournament.image, ...(tournament.gallery ?? [])])];
    const subcategory = TOURNAMENT_SUBCATEGORIES[tournament.category];

    urls.forEach((url, index) => {
      media.push({
        id: `tournament-${tournament.id}-${index}`,
        url,
        title: tournament.title,
        category: "مسابقات",
        subcategory,
        format: "image",
      });
    });
  });

  EVENTS_DATA.forEach((event) => {
    if (!event.coverImage) return;
    media.push({
      id: `event-${event.id}`,
      url: event.coverImage,
      title: event.title,
      category: "فعاليات",
      subcategory: normalizeEventCategory(event.eventType),
      format: "image",
    });
  });

  return media;
}

const GALLERY_MEDIA = buildGalleryMedia();

export async function fetchBatchShieldsMediaAction(categories: {id: string, title: string}[]) {
  return Object.fromEntries(
    categories.map(({ id, title }) => [
      id,
      GALLERY_MEDIA.filter((item) => item.category === "دروع" && item.title === title),
    ]),
  ) as Record<string, GalleryMediaItem[]>;
}

export async function fetchMediaAction(category: string, limit?: number) {
  const filtered = category === "الكل"
    ? GALLERY_MEDIA
    : GALLERY_MEDIA.filter((item) => item.category === category || item.subcategory === category);

  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}

export async function fetchShieldMediaAction(category: string, id: string) {
  return GALLERY_MEDIA.filter(
    (item) => item.category === "دروع" && (item.subcategory === category || item.id === id),
  );
}
