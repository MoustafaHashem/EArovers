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

const curatedScoutMedia = [
  {
    id: "m-1",
    title: "مشاريع الريادة الكشفية وبناء الجسور والأبراج الخشبية",
    url: "/images/hero/hero-6-pioneering.jpg",
    category: "معسكرات",
    format: "jpg"
  },
  {
    id: "m-2",
    title: "أرض المخيم وطابور تحية العلم والتقاليد الكشفية",
    url: "/images/hero/hero-1.jpg",
    category: "معسكرات",
    format: "jpg"
  },
  {
    id: "m-3",
    title: "فيديو توثيقي لأنشطة العشيرة والروح الكشفية",
    url: "/videos/hero-mobile.mp4",
    category: "معسكرات",
    format: "mp4"
  },
  {
    id: "m-4",
    title: "حفلات السمر الكشفي والمخيمات الخلوية",
    url: "/images/hero/hero-2.jpg",
    category: "معسكرات",
    format: "jpg"
  },
  {
    id: "m-5",
    title: "بطولة المهارات الكشفية والتنافس القمي",
    url: "/images/fame/scout.jpg",
    category: "مسابقات",
    format: "jpg"
  },
  {
    id: "m-6",
    title: "دوري العشيرة والأنشطة الرياضية التنافسية",
    url: "/images/fame/sports.jpg",
    category: "مسابقات",
    format: "jpg"
  },
  {
    id: "m-7",
    title: "ملتقى العشائر السنوي لجامعة عين شمس",
    url: "/images/fame/wafdeya.jpg",
    category: "مسابقات",
    format: "jpg"
  },
  {
    id: "m-8",
    title: "بطولة الملاحة البحرية وإشارات السيمافور والتجديف",
    url: "/images/fame/naval.jpg",
    category: "مسابقات",
    format: "jpg"
  },
  {
    id: "m-9",
    title: "معرض الفنون والأركيت والسترنج آرت بالكلية",
    url: "/images/hero/hero-4.jpg",
    category: "دروع",
    format: "jpg"
  },
  {
    id: "m-10",
    title: "ورش الحرق على الجلد والإبداع اليدوي",
    url: "/images/hero/hero-3.jpg",
    category: "دروع",
    format: "jpg"
  },
  {
    id: "m-11",
    title: "معرض الفنون التشكيلية والتراث الكشفي",
    url: "/images/fame/arts.jpg",
    category: "دروع",
    format: "jpg"
  },
  {
    id: "m-12",
    title: "كواليس تجهيز المعارض والورش الفنية بالورشة",
    url: "/images/hero/hero-3.jpg",
    category: "كواليس",
    format: "jpg"
  },
  {
    id: "m-13",
    title: "لحظات الإعداد والروح الأخوية في كواليس الأنشطة",
    url: "/images/hero/hero-1.jpg",
    category: "كواليس",
    format: "jpg"
  },
  {
    id: "m-14",
    title: "قوافل الخير وحملات خدمة وتنمية المجتمع والكلية",
    url: "/images/hero/hero-5-community.jpg",
    category: "كواليس",
    format: "jpg"
  },
  {
    id: "m-15",
    title: "مسير خلوي ورحلات الاستكشاف والمغامرة",
    url: "/images/hero/hero-2.jpg",
    category: "رحلات",
    format: "jpg"
  },
  {
    id: "m-16",
    title: "رحلات الاستكشاف البيئي والمخيمات الساحلية",
    url: "/images/fame/naval.jpg",
    category: "رحلات",
    format: "jpg"
  }
];

export async function fetchMediaAction(category: string, limit?: number) {
  try {
    const media = await getCachedMedia(category, limit);
    
    // Filter out items without proper URLs or dummy 3D island models
    const validMedia = media.filter(m => m.url && !m.url.includes("island_"));

    if (validMedia.length > 0) {
      return validMedia.map(m => ({
        id: m.id,
        url: m.url,
        title: m.title || "ذكرى كشفية",
        category: m.category || "معسكرات",
        format: m.url.endsWith(".mp4") ? "mp4" : "jpg"
      }));
    }
  } catch (err) {
    console.error("fetchMediaAction database error:", err);
  }

  // Curated fallback
  const filtered = category === "الكل"
    ? curatedScoutMedia
    : curatedScoutMedia.filter(m => m.category === category);

  const result = limit ? filtered.slice(0, limit) : filtered;
  return result;
}

const fallbackShieldMediaMap: Record<string, { id: string; url: string; title: string; format: string }[]> = {
  scout: [
    { id: "s-1", url: "/images/hero/hero-6-pioneering.jpg", title: "مشاريع الريادة الكشفية الكبرى وبناء الجسور", format: "jpg" },
    { id: "s-2", url: "/images/hero/hero-1.jpg", title: "أرض المخيم والتقاليد الكشفية", format: "jpg" },
    { id: "s-3", url: "/images/hero/hero-2.jpg", title: "حفلات السمر والمخيمات الكشفية", format: "jpg" },
    { id: "s-4", url: "/images/hero/hero-3.jpg", title: "العقد والربطات ومهارات الحبال", format: "jpg" },
  ],
  art: [
    { id: "a-1", url: "/images/hero/hero-4.jpg", title: "معرض الفنون والأركيت والسترنج آرت", format: "jpg" },
    { id: "a-2", url: "/images/hero/hero-3.jpg", title: "أعمال الحرق على الجلد والإبداع اليدوي", format: "jpg" },
    { id: "a-3", url: "/images/hero/hero-1.jpg", title: "المعارض الفنية وتجهيزات الديكور", format: "jpg" },
  ],
  sports: [
    { id: "sp-1", url: "/images/hero/hero-2.jpg", title: "دوري العشيرة والأنشطة والمسابقات الرياضية", format: "jpg" },
    { id: "sp-2", url: "/images/hero/hero-1.jpg", title: "اللياقة البدنية ومنافسات كرة القدم والطائرة", format: "jpg" },
    { id: "sp-3", url: "/images/hero/hero-6-pioneering.jpg", title: "ألعاب كشفية حركية وروح رياضية", format: "jpg" },
  ],
  service: [
    { id: "sv-1", url: "/images/hero/hero-5-community.jpg", title: "قوافل الخير وخدمة المجتمع", format: "jpg" },
    { id: "sv-2", url: "/images/hero/hero-3.jpg", title: "أنشطة التنمية المجتمعية والتطوع", format: "jpg" },
    { id: "sv-3", url: "/images/hero/hero-1.jpg", title: "حملات النظافة والتشجير بالكلية", format: "jpg" },
  ],
  culture: [
    { id: "c-1", url: "/images/hero/hero-1.jpg", title: "المجلات الحائطية والندوات الثقافية", format: "jpg" },
    { id: "c-2", url: "/images/hero/hero-4.jpg", title: "البامفلت والمناظرات الفكرية والمعلومات العامة", format: "jpg" },
    { id: "c-3", url: "/images/hero/hero-3.jpg", title: "المسابقات الثقافية واللقاءات المعرفية", format: "jpg" },
  ],
};

export async function fetchShieldMediaAction(shieldTitle: string, shieldId?: string) {
  const cleanKeyword = shieldTitle.replace(/^(الدرع|درع)\s*/, "").trim();

  try {
    const media = await prisma.media.findMany({
      where: {
        OR: [
          { category: shieldTitle },
          { category: `درع ${cleanKeyword}` },
          { category: `الدرع ${cleanKeyword}` },
          { category: cleanKeyword },
          ...(shieldId ? [{ category: shieldId }] : []),
          {
            AND: [
              { category: "دروع" },
              { title: { contains: cleanKeyword, mode: "insensitive" } }
            ]
          }
        ]
      },
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ],
      take: 20
    });

    if (media && media.length > 0) {
      return media.map(m => ({
        id: m.id,
        url: m.url,
        title: m.title || shieldTitle,
        format: m.url.endsWith(".mp4") ? "mp4" : "jpg"
      }));
    }
  } catch (err) {
    console.error("Error fetching shield media from DB:", err);
  }

  // Fallback to curated scout photos per category
  const key = shieldId || (
    cleanKeyword.includes("كشفي") ? "scout" :
    cleanKeyword.includes("فن") ? "art" :
    cleanKeyword.includes("رياض") ? "sports" :
    (cleanKeyword.includes("خدمة") || cleanKeyword.includes("خدمه")) ? "service" :
    cleanKeyword.includes("ثقاف") ? "culture" : ""
  );

  if (key && fallbackShieldMediaMap[key]) {
    return fallbackShieldMediaMap[key];
  }

  // General fallback for religious, marine, science, environment, etc.
  return [
    { id: "g-1", url: "/images/hero/hero-1.jpg", title: `أنشطة ومشاركات ${shieldTitle}`, format: "jpg" },
    { id: "g-2", url: "/images/hero/hero-3.jpg", title: `ورش عمل وتدريبات ${shieldTitle}`, format: "jpg" },
    { id: "g-3", url: "/images/hero/hero-6-pioneering.jpg", title: `إنجازات العشيرة في ${shieldTitle}`, format: "jpg" },
  ];
}

export const fetchBatchShieldsMediaAction = unstable_cache(
  async (shields: { id: string; title: string }[]) => {
    try {
      const allMedia = await prisma.media.findMany({
        orderBy: [
          { sortOrder: 'asc' },
          { createdAt: 'desc' }
        ],
        take: 100,
      });

      const result: Record<string, { id: string; url: string; title: string; format: string }[]> = {};

      for (const shield of shields) {
        const cleanKeyword = shield.title.replace(/^(الدرع|درع)\s*/, "").trim();
        const matched = allMedia.filter(m =>
          m.url && !m.url.includes("island_") && (
            m.category === shield.title ||
            m.category === `درع ${cleanKeyword}` ||
            m.category === `الدرع ${cleanKeyword}` ||
            m.category === cleanKeyword ||
            m.category === shield.id ||
            (m.category === "دروع" && Boolean(m.title?.includes(cleanKeyword)))
          )
        );

        if (matched.length > 0) {
          result[shield.id] = matched.slice(0, 6).map(m => ({
            id: m.id,
            url: m.url,
            title: m.title || shield.title,
            format: m.url.endsWith(".mp4") ? "mp4" : "jpg"
          }));
        } else {
          const key = shield.id || (
            cleanKeyword.includes("كشفي") ? "scout" :
            cleanKeyword.includes("فن") ? "art" :
            cleanKeyword.includes("رياض") ? "sports" :
            (cleanKeyword.includes("خدمة") || cleanKeyword.includes("خدمه")) ? "service" :
            cleanKeyword.includes("ثقاف") ? "culture" : ""
          );
          result[shield.id] = fallbackShieldMediaMap[key] || [
            { id: `fb-${shield.id}-1`, url: "/images/hero/hero-1.jpg", title: `أنشطة ${shield.title}`, format: "jpg" },
            { id: `fb-${shield.id}-2`, url: "/images/hero/hero-3.jpg", title: `ورش ${shield.title}`, format: "jpg" },
          ];
        }
      }

      return result;
    } catch (err) {
      console.error("Error batch fetching shields media:", err);
      const fallbackResult: Record<string, { id: string; url: string; title: string; format: string }[]> = {};
      for (const shield of shields) {
        fallbackResult[shield.id] = fallbackShieldMediaMap[shield.id] || [];
      }
      return fallbackResult;
    }
  },
  ['all-shields-media-batch'],
  { tags: ['media'], revalidate: 86400 }
);


