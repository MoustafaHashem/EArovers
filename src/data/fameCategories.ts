export interface FameCategory {
  id: number;
  slug: string;
  name: string; // وفدية، رياضية، كشفي، بحري، فنون واسمار
  title: string;
  image: string;
  description: string;
  keywords: string[];
}

export const FAME_CATEGORIES: FameCategory[] = [
  {
    id: 1,
    slug: "wafdeya",
    name: "وفدية",
    title: "المسابقات الوفدية والقمية",
    image: "/images/fame/wafdeya.jpg",
    description:
      "مسابقات الوفود والأنشطة القمية الرسمية لعشيرة جوالة هندسة عين شمس، وسجل الدروع العامة والتمثيل الرسمي للعشيرة في كبرى المحافل والجامعات المصرية.",
    keywords: ["وفد", "قمي", "قمية", "صداقة", "العشائر", "درع عام"],
  },
  {
    id: 2,
    slug: "sports",
    name: "رياضية",
    title: "المسابقات والبطولات الرياضية",
    image: "/images/fame/sports.jpg",
    description:
      "المسابقات والبطولات الرياضية في ألعاب القوى، كرة القدم، اللياقة البدنية والأنشطة التنافسية المختلفة التي تعزز الروح الرياضية والقوة البدنية.",
    keywords: ["رياض", "كرة", "دوري", "قدم", "ماراثون", "لياقة", "طائرة", "سباق جري"],
  },
  {
    id: 3,
    slug: "scout",
    name: "كشفي",
    title: "المسابقات والمهارات الكشفية",
    image: "/images/fame/scout.jpg",
    description:
      "المسابقات والمهارات الكشفية الأصيلة، إقامة المخيمات ونماذج الريادة، الطهي الخلوي، الملاحة واستخدامات الحبال وفنون الخلاء.",
    keywords: ["كشف", "معسكر", "مخيم", "ريادة", "خلاء", "طهي خلوي"],
  },
  {
    id: 4,
    slug: "naval",
    name: "بحري",
    title: "المسابقات والأنشطة البحرية",
    image: "/images/fame/naval.jpg",
    description:
      "المسابقات والمهارات الملاحية والبحرية، التجديف والشراع، إشارات المورس والسيمافور، وعقد وفنون الملاحة في الكشافة البحرية.",
    keywords: ["بحر", "ملاح", "تجديف", "شراع", "مورس", "سيمافور"],
  },
  {
    id: 5,
    slug: "arts",
    name: "فنون واسمار",
    title: "مسابقات الفنون والأسمار",
    image: "/images/fame/arts.jpg",
    description:
      "حفلات السمر الكشفي، معارض الفنون والتصميم، التمثيل المسرحي، الإنشاد والمواهب الثقافية والإبداعية التي تميز عشيرة الجوالة.",
    keywords: ["فن", "سمر", "أسمار", "حفل", "مسرح", "معرض", "إنشاد", "تشكيل"],
  },
];

export function getFameCategoryBySlug(slug: string): FameCategory | undefined {
  const decoded = decodeURIComponent(slug).trim().toLowerCase();
  return FAME_CATEGORIES.find(
    (c) =>
      c.slug.toLowerCase() === decoded ||
      c.name.toLowerCase() === decoded ||
      c.name.replace(/\s+/g, "") === decoded.replace(/\s+/g, "")
  );
}

export function isEventMatchingCategory(
  event: { eventType?: string | null; title?: string | null; description?: string | null },
  category: FameCategory
): boolean {
  const type = (event.eventType || "").toLowerCase().trim();
  const title = (event.title || "").toLowerCase().trim();
  const desc = (event.description || "").toLowerCase().trim();

  // 1. Direct match on eventType
  if (type.includes(category.name.toLowerCase())) return true;
  if (category.slug === "wafdeya" && type.includes("وفد")) return true;
  if (category.slug === "sports" && type.includes("رياض")) return true;
  if (category.slug === "scout" && (type.includes("كشف") || type.includes("معسكر"))) return true;
  if (category.slug === "naval" && type.includes("بحر")) return true;
  if (category.slug === "arts" && (type.includes("فن") || type.includes("سمر") || type.includes("حفل"))) return true;

  // 2. Keyword matches on title and description
  return category.keywords.some(
    (kw) => type.includes(kw) || title.includes(kw) || desc.includes(kw)
  );
}
