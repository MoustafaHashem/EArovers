"use server";

export async function fetchBatchShieldsMediaAction(categories: {id: string, title: string}[]) {
  return {} as Record<string, any[]>;
}

export async function fetchMediaAction(category: string, limit?: number) {
  return [];
}

export async function fetchShieldMediaAction(category: string, id: string) {
  
  // 1. الدرع الكشفي (Scout Shield)
  if (id === "scout" || category.includes("كشفي")) {
    return [
      {
        id: "scout-7",
        url: "/images/badges/scout7.jpg",
        title: "لقطة جماعية توثيقية لأنشطة المعسكر الكشفي",
        format: "jpg",
      },
      {
        id: "scout-6",
        url: "/images/badges/scout6.jpg",
        title: "يوم وادي دجلة - ذكريات النار والمرح",
        format: "jpg",
      },
      {
        id: "scout-5",
        url: "/images/badges/scout5.jpg",
        title: "يوم وادي دجلة - مهارات الخلاء والطهي الخلوي",
        format: "jpg",
      },
      {
        id: "scout-4",
        url: "/images/badges/scout4.jpg",
        title: "روح الفريق والتعاون بين الجوالة والجوالات",
        format: "jpg",
      },
      
      {
        id: "scout-2",
        url: "/images/badges/scout2.png",
        title: "تحديات الريادة وبناء الهياكل الخشبية",
        format: "png",
      },
      {
        id: "scout-1",
        url: "/images/badges/scout1.png",
        title: "الدورة الكشفية والإرشادية لجوالي وجوالات جامعة عين شمس",
        format: "png",
      },
    ];
  }

  // 2. الدرع الديني (Religion Shield)
  if (id === "religion" || category.includes("ديني")) {
    return [
      {
        id: "religion-2",
        url: "/images/badges/religion2.jpg",
        title: "المسابقات والأنشطة الدينية بالدورة الكشفية والإرشادية-تسميع الأحاديث",
        format: "jpg",
      },
      {
        id: "religion-1",
        url: "/images/badges/religion1.png",
        title: "مشاركة الجوالة والجوالات في الفعاليات الدينية والثقافية",
        format: "png",
      },
    ];
  }

  // 3. الدرع الرياضي (Sports Shield)
  if (id === "sports" || category.includes("رياضي")) {
    return [
      {
        id: "sports-5",
        url: "/images/badges/sports5.jpg",
        title: "الدورة الرياضية لجوالي وجوالات جامعة عين شمس - تنس الطاولة",
        format: "jpg",
      },
      {
        id: "sports-4",
        url: "/images/badges/sports4.jpg",
        title: "فريق عشيرة جوالة كلية الهندسة في الدورات الرياضية",
        format: "jpg",
      },
      {
        id: "sports-3",
        url: "/images/badges/sports3.jpg",
        title: "احتفالات وحماس الفريق بالفوز في المنافسات الرياضية",
        format: "jpg",
      },
      {
        id: "sports-2",
        url: "/images/badges/sports2.jpg",
        title: "فريق كرة القدم لعشيرة جوالة هندسة عين شمس",
        format: "jpg",
      },
      {
        id: "sports-1",
        url: "/images/badges/sports1.jpg",
        title: "عشيرة جوالة كلية الهندسة مع كأس البطولات الرياضية",
        format: "jpg",
      },
    ];
  }

  // 4. درع الخدمة العامة وتنمية المجتمع (Service Shield)
  if (id === "service" || category.includes("خدمة")) {
    return [
      {
        id: "service-2",
        url: "/images/badges/service2.png",
        title: "أنشطة ومبادرات خدمة المجتمع وتنمية البيئة",
        format: "png",
      },
      {
        id: "service-1",
        url: "/images/badges/service1.png",
        title: "المشاركة المجتمعية وأعمال التطوع",
        format: "png",
      },
    ];
  }

  // 5. الدرع البحري (Sea Shield)
  if (id === "sea" || category.includes("بحري")) {
    return [
      {
        id: "sea-3",
        url: "/images/badges/sea3.jpg",
        title: "المهارات البحرية والأنشطة الشاطئية",
        format: "jpg",
      },
      {
        id: "sea-2",
        url: "/images/badges/sea2.png",
        title: "تدريبات العوامات والتشكيلات البحرية",
        format: "png",
      },
      {
        id: "sea-1",
        url: "/images/badges/sea1.png",
        title: "جولات المعسكر البحري لجوالة الهندسة",
        format: "png",
      },
    ];
  }

  // 6. الدرع الثقافي (Cultural Shield)
  if (id === "cultural" || category.includes("ثقافي")) {
    return [
      {
        id: "cultural-2",
        url: "/images/badges/cultural2.png",
        title: "المسابقات الثقافية والندوات الفكرية",
        format: "png",
      },
      {
        id: "cultural-1",
        url: "/images/badges/cultural1.png",
        title: "الأنشطة المعرفية واللقاءات الثقافية",
        format: "png",
      },
    ];
  }

  // 7. الدرع الفني (Art Shield)
  if (id === "art" || category.includes("فني")) {
    return [
      {
        id: "art-3",
        url: "/images/badges/art3.png",
        title: "المعارض الفنية والأعمال اليدوية الابداعية",
        format: "png",
      },
      {
        id: "art-2",
        url: "/images/badges/art2.png",
        title: "تصاميم اللوحات والديكورات الكشفية",
        format: "png",
      },
      {
        id: "art-1",
        url: "/images/badges/art1.png",
        title: "ورش العمل الفنية والابتكار",
        format: "png",
      },
    ];
  }

  // إذا لم يتم العثور على مطابقة
  return [];
}