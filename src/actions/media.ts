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

const SHIELDS_DATA: GalleryMediaItem[] = [
  // 1. الدرع الكشفي (Scout Shield)
  { id: "scout-7", url: "/images/badges/scout7.jpg", title: "لقطة جماعية توثيقية لأنشطة المعسكر الكشفي", format: "image", category: "دروع", subcategory: "كشفي" },
  { id: "scout-6", url: "/images/badges/scout6.jpg", title: "يوم وادي دجلة - ذكريات النار والمرح", format: "image", category: "دروع", subcategory: "كشفي" },
  { id: "scout-5", url: "/images/badges/scout5.jpg", title: "يوم وادي دجلة - مهارات الخلاء والطهي الخلوي", format: "image", category: "دروع", subcategory: "كشفي" },
  { id: "scout-4", url: "/images/badges/scout4.jpg", title: "روح الفريق والتعاون بين الجوالة والجوالات", format: "image", category: "دروع", subcategory: "كشفي" },
  { id: "scout-2", url: "/images/badges/scout2.png", title: "تحديات الريادة وبناء الهياكل الخشبية", format: "image", category: "دروع", subcategory: "كشفي" },
  { id: "scout-1", url: "/images/badges/scout1.png", title: "الدورة الكشفية والإرشادية لجوالي وجوالات جامعة عين شمس", format: "image", category: "دروع", subcategory: "كشفي" },
  
  // 2. الدرع الديني (Religion Shield)
  { id: "religion-2", url: "/images/badges/religion2.jpg", title: "المسابقات والأنشطة الدينية بالدورة الكشفية والإرشادية-تسميع الأحاديث", format: "image", category: "دروع", subcategory: "ديني" },
  { id: "religion-1", url: "/images/badges/religion1.png", title: "مشاركة الجوالة والجوالات في الفعاليات الدينية والثقافية", format: "image", category: "دروع", subcategory: "ديني" },
  
  // 3. الدرع الرياضي (Sports Shield)
  { id: "sports-5", url: "/images/badges/sports5.jpg", title: "الدورة الرياضية لجوالي وجوالات جامعة عين شمس - تنس الطاولة", format: "image", category: "دروع", subcategory: "رياضي" },
  { id: "sports-4", url: "/images/badges/sports4.jpg", title: "فريق عشيرة جوالة كلية الهندسة في الدورات الرياضية", format: "image", category: "دروع", subcategory: "رياضي" },
  { id: "sports-3", url: "/images/badges/sports3.jpg", title: "احتفالات وحماس الفريق بالفوز في المنافسات الرياضية", format: "image", category: "دروع", subcategory: "رياضي" },
  { id: "sports-2", url: "/images/badges/sports2.jpg", title: "فريق كرة القدم لعشيرة جوالة هندسة عين شمس", format: "image", category: "دروع", subcategory: "رياضي" },
  { id: "sports-1", url: "/images/badges/sports1.jpg", title: "عشيرة جوالة كلية الهندسة مع كأس البطولات الرياضية", format: "image", category: "دروع", subcategory: "رياضي" },
  
  // 4. درع الخدمة العامة وتنمية المجتمع (Service Shield)
  { id: "service-2", url: "/images/badges/service2.png", title: "أنشطة ومبادرات خدمة المجتمع وتنمية البيئة", format: "image", category: "دروع", subcategory: "خدمة" },
  { id: "service-1", url: "/images/badges/service1.png", title: "المشاركة المجتمعية وأعمال التطوع", format: "image", category: "دروع", subcategory: "خدمة" },
  { id: "service-3", url: "/images/badges/service3.png", title: "المشاركة المجتمعية وأعمال التطوع", format: "image", category: "دروع", subcategory: "خدمة" },
  { id: "service-4", url: "/images/badges/service4.png", title: "المشاركة المجتمعية وأعمال التطوع", format: "image", category: "دروع", subcategory: "خدمة" },
  { id: "service-5", url: "/images/badges/service5.png", title: "المشاركة المجتمعية وأعمال التطوع", format: "image", category: "دروع", subcategory: "خدمة" },
  
  // 5. الدرع البحري (Sea Shield)
  { id: "sea-3", url: "/images/badges/sea3.jpg", title: "المهارات البحرية والأنشطة الشاطئية", format: "image", category: "دروع", subcategory: "بحري" },
  { id: "sea-2", url: "/images/badges/sea2.png", title: "تدريبات العوامات والتشكيلات البحرية", format: "image", category: "دروع", subcategory: "بحري" },
  { id: "sea-1", url: "/images/badges/sea1.png", title: "جولات المعسكر البحري لجوالة الهندسة", format: "image", category: "دروع", subcategory: "بحري" },
  
  // 6. الدرع الثقافي (Cultural Shield)
  { id: "cultural-2", url: "/images/badges/cultural2.png", title: "المسابقات الثقافية والندوات الفكرية", format: "image", category: "دروع", subcategory: "ثقافي" },
  { id: "cultural-1", url: "/images/badges/cultural1.png", title: "الأنشطة المعرفية واللقاءات الثقافية", format: "image", category: "دروع", subcategory: "ثقافي" },
  
  // 7. الدرع الفني (Art Shield)
  { id: "art-3", url: "/images/badges/art3.png", title: "المعارض الفنية والأعمال اليدوية الابداعية", format: "image", category: "دروع", subcategory: "فني" },
  { id: "art-2", url: "/images/badges/art2.png", title: "تصاميم اللوحات والديكورات الكشفية", format: "image", category: "دروع", subcategory: "فني" },
  { id: "art-1", url: "/images/badges/art1.png", title: "ورش العمل الفنية والابتكار", format: "image", category: "دروع", subcategory: "فني" },
];

function buildGalleryMedia(): GalleryMediaItem[] {
  const media: GalleryMediaItem[] = [...SHIELDS_DATA];

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
    
    // add event photos too
    if (event.photos && event.photos.length > 0) {
      event.photos.forEach((photoUrl, index) => {
        media.push({
          id: `event-photo-${event.id}-${index}`,
          url: photoUrl,
          title: `${event.title} - صورة ${index + 1}`,
          category: "فعاليات",
          subcategory: normalizeEventCategory(event.eventType),
          format: "image",
        });
      });
    }
  });

  return media;
}

const GALLERY_MEDIA = buildGalleryMedia();

export async function fetchBatchShieldsMediaAction(categories: {id: string, title: string}[]) {
  return Object.fromEntries(
    categories.map(({ id }) => {
      return [
        id,
        GALLERY_MEDIA.filter((item) => item.category === "دروع" && item.id.startsWith(id + "-")),
      ];
    }),
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
    (item) => item.category === "دروع" && (item.subcategory === category || item.id.startsWith(id + "-")),
  );
}