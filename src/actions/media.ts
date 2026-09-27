"use server";

export async function fetchBatchShieldsMediaAction(categories: { id: string, title: string }[]) {
  return {} as Record<string, any[]>;
}

export async function fetchMediaAction(category: string, limit?: number) {
  const allMedia = [
    { id: "1", url: "/images/hero/hero-3.jpg", title: "صورة 1", format: "jpg", category: "مسابقات" },
    { id: "2", url: "/images/hero/hero-2.jpg", title: "صورة 2", format: "jpg", category: "مسابقات" },
    { id: "3", url: "/images/hero/pic1.jpg", title: "صورة 3", format: "jpg", category: "دروع" },
    { id: "4", url: "/images/hero/mm1.jpg", title: "صورة 4", format: "jpg", category: "معسكرات" },
    { id: "5", url: "/images/hero/mm2.jpg", title: "صورة 5", format: "jpg", category: "معسكرات" },
    { id: "6", url: "/images/hero/kk1.jpg", title: "صورة 6", format: "jpg", category: "كواليس" },
    { id: "7", url: "/images/hero/kk2.jpg", title: "صورة 7", format: "jpg", category: "كواليس" },
    { id: "8", url: "/images/hero/kk3.jpg", title: "صورة 8  ", format: "jpg", category: "كواليس" },
    { id: "9", url: "/images/hero/rr1.jpg", title: "صورة 9  ", format: "jpg", category: "رحلات" },
    { id: "10", url: "/images/hero/rr2.jpg", title: "صورة 10 ", format: "jpg", category: "رحلات" },
    { id: "11", url: "/images/hero/rr3.jpg", title: "صورة 11 ", format: "jpg", category: "رحلات" },
    

  ];

  const filtered = category === "الكل"
    ? allMedia
    : allMedia.filter((item) => item.category === category);

  return limit ? filtered.slice(0, limit) : filtered;
}

export async function fetchShieldMediaAction(category: string, id: string) {
  return [];
}