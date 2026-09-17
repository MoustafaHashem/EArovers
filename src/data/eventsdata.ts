export interface DummyEvent {
  id: string;
  title: string;
  displayDate: string;
  location?: string;
  coverImage?: string;
  images: string[];
  description: string;
}

export const oldEvents: DummyEvent[] = [
  {
    id: "iftar-el-ashira",
    title: "إفطار العشيرة",
    displayDate: "7/9/2026",
    location: "بجوار مبنى كريديت",
    coverImage: "/events/iftar-cover.jpg",
    images: [
      "/events/iftar-1.jpg",
      "/events/iftar-2.jpg",
      "/events/iftar-3.jpg",
    ],
    description: "",
  },

  {
    id: "el-youm-el-bahary",
    title: "اليوم البحري",
    displayDate: "7/10/2026",
    location: "نادي حارس",
    coverImage: "/events/bahary-cover.jpg",
    images: ["/events/bahary-1.jpg"],
    description: "",
  },

  {
    id: "event-3",
    title: "اسم الإيفنت الثالث",
    displayDate: "7/15/2026",
    location: "مكان الإيفنت",
    coverImage: "/events/event-3-cover.jpg",
    images: [
      "/events/event-3-1.jpg",
      "/events/event-3-2.jpg",
    ],
    description: "",
  },

  {
    id: "event-4",
    title: "اسم الإيفنت الرابع",
    displayDate: "7/20/2026",
    location: "مكان الإيفنت",
    coverImage: "/events/event-4-cover.jpg",
    images: [
      "/events/event-4-1.jpg",
    ],
    description: "",
  },
];