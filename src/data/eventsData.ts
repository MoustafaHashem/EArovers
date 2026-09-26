export interface EventStatic {
  id: string;
  title: string;
  description: string | null;
  eventType: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  coverImage: string | null;
  photos?: string[];
}

export const EVENTS_DATA: EventStatic[] = [
  {
    id: "e1",
    title: "إفطار العشيرة ال46",
    description: "إفطار العشيرة الثانوي عام 2026",
    eventType: "متنوع",
    location: "كلية الهندسة",
    startDate: new Date("2026-03-07T00:00:00Z"),
    endDate: new Date("2026-03-07T00:00:00Z"),
    coverImage: "/images/hero/hero-1.jpg",
    photos: [

    ],
  },
  {
    id: "e3",
    title: "حفل الاستقبال",
    description: "حفل استقبال الجوالين الجدد",
    eventType: "متنوع",
    location: "كلية الهندسة",
    startDate: new Date("2026-09-28T00:00:00Z"),
    endDate: new Date("2026-10-05T00:00:00Z"),
    coverImage: "/images/events/estekbal.jpeg",
    photos: [
      "/images/events/estekbal2.jpeg",
      "/images/events/estekbal3.jpeg",
      "/images/events/estekbal4.jpeg",
      "/images/events/estekbal5.jpeg",
      "/images/events/estekbal6.jpeg",
      "/images/events/estekbal7.jpeg",
    ],
  },
  {
    id: "e4",
    title: "تنطيم حفلة التخرج 2026",
    description: "تنظيم المارش أثناء حفلة التخرج",
    eventType: "متنوع",
    location: "كلية الهندسة",
    startDate: new Date("2026-09-23T00:00:00Z"),
    endDate: new Date("2026-09-23T00:00:00Z"),
    coverImage: "/images/events/ta5arog.jpeg",
  },
   {
    id: "e5",
    title: "دراسة أثر",
    description: "دراسة تطلع للقيادة",
    eventType: "دراسة",
    location: "نادي حارس للكشافة البحرية",
    startDate: new Date("2026-08-13T00:00:00Z"),
    endDate: new Date("2026-08-15T00:00:00Z"),
    coverImage: "/images/events/deraset-2athar.jpeg",
    photos: [
      "/images/events/deraset-2athar2.JPG",
      "/images/events/deraset-2athar3 .JPG",
      "/images/events/deraset-2athar4.JPG",
      "/images/events/deraset-2athar5.JPG",
      "/images/events/deraset-2athar6.JPG",
    ],
  },
   {
    id: "e6",
    title: "زيارة دار أيتام",
    description: "زيارة دار أيتام ودعمهم",
    eventType: "خدمة عامة",
    location: "دار أيتام في المعادي",
    startDate: new Date("2026-09-08T00:00:00Z"),
    endDate: new Date("2026-09-08T00:00:00Z"),
    coverImage: "/images/events/dar-2aytam.jpeg",
    photos: [
      "/images/events/dar-2aytam2.jpeg",
      "/images/events/dar-2aytam3.jpeg"
    ],
  },
    {
    id: "e7",
    title: "سيشن فني",
    description: "ورشة فنية كويلنيج",
    eventType: "سيشنات",
    location: "كلية الهندسة",
    startDate: new Date("2026-09-01T00:00:00Z"),
    endDate: new Date("2026-09-01T00:00:00Z"),
    coverImage: "/images/events/fany.png",
    photos: [
      "/images/events/fany2.png",
      "/images/events/fany3.png",
    ],
  },
   {
    id: "e8",
    title: "المعسكر التدريبي ال39",
    description: "معسكر الشتاء التدريبي ال39",
    eventType: "معسكرات",
    location: "كلية الزراعة - جامعة عين شمس",
    startDate: new Date("2026-01-27T00:00:00Z"),
    endDate: new Date("2026-01-31T00:00:00Z"),
    coverImage: "/images/events/mo3askar-el39.jpeg",
    photos: [
      "/images/events/mo3askar-el39-2 (1).jpeg",
      "/images/events/mo3askar-el39-2 (2).jpeg",
      "/images/events/mo3askar-el39-2 (3).jpeg",
      "/images/events/mo3askar-el39-2 (4).jpeg",
      "/images/events/mo3askar-el39-2 (5).jpeg",
      "/images/events/mo3askar-el39-2 (6).jpeg",
    ],
  },
];
