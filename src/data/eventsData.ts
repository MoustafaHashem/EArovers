export interface EventStatic {
  id: string;
  title: string;
  description: string | null;
  eventType: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  coverImage: string | null;
}

export const EVENTS_DATA: EventStatic[] = [
  {
    id: "e1",
    title: "مهرجان الجوالة 2024",
    description: "مهرجان الجوالة السنوي بجامعة عين شمس",
    eventType: "مسابقة",
    location: "المخيم الكشفي الدائم - جامعة عين شمس",
    startDate: new Date("2024-11-01T00:00:00Z"),
    endDate: new Date("2024-11-15T00:00:00Z"),
    coverImage: "/images/hero/hero-2.jpg",
  },
  {
    id: "e2",
    title: "المعسكر التدريبي الأول",
    description: "المعسكر التدريبي لإعداد الجوالين الجدد",
    eventType: "معسكر",
    location: "كلية الهندسة",
    startDate: new Date("2024-10-15T00:00:00Z"),
    endDate: new Date("2024-10-18T00:00:00Z"),
    coverImage: "/images/hero/hero-1.jpg",
  },
];
