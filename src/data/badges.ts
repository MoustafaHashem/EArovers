export interface Badge {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export const BADGES_DATA: Badge[] = [
  {
    id: "religious",
    title: "درع ديني",
    category: "منافسات",
    image: "/images/badges/religious.png",
    description: "مجال التنافس الديني",
  },
  {
    id: "sports",
    title: "درع رياضي",
    category: "منافسات",
    image: "/images/badges/sports.png",
    description: "مجال التنافس الرياضي",
  },
  {
    id: "cultural",
    title: "درع ثقافي",
    category: "منافسات",
    image: "/images/badges/cultural.png",
    description: "مجال التنافس الثقافي",
  },
  {
    id: "public-service",
    title: "خدمة عامة",
    category: "خدمة",
    image: "/images/badges/service.png",
    description: "مجال الخدمة العامة والمجتمعية",
  },
  {
    id: "scout",
    title: "درع كشفي",
    category: "كشفي",
    image: "/images/badges/scout.png",
    description: "التقاليد والمهارات الكشفية",
  },
  {
    id: "scientific",
    title: "درع علمي",
    category: "علمي",
    image: "/images/badges/scientific.png",
    description: "الابتكار والمجال العلمي",
  },
  {
    id: "artistic",
    title: "درع فني",
    category: "فني",
    image: "/images/badges/artistic.png",
    description: "المجال الفني والمعارض",
  },
  {
    id: "bavarians",
    title: "درع بحري",
    category: "خاص",
    image: "/images/badges/sea.png",
    description: "الكشافة البحرية",
  },

  {
    id: "environmental",
    title: "درع بيئي",
    category: "خاص",
    image: "/images/badges/environmental.png",
    description: "الكشافة البيئية",
  },
];
