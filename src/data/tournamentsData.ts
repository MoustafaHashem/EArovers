export interface DelegationMember {
  name: string;
  role: string;
  avatar?: string;
  isLeader?: boolean;
}

export interface TournamentItem {
  id: string;
  title: string;
  category: "wafdeya" | "sports" | "scout" | "naval" | "arts";
  categoryName: string;
  year: number;
  dateStr: string;
  location: string;
  placement: string;
  specialAwards: string[];
  image: string;
  description: string;
  clanStory?: string;
  stats?: {
    participantsCount?: number;
    competingClans?: number;
    shieldsCount?: number;
  };
  awardsDetailed?: {
    title: string;
    type: "trophy" | "medal" | "shield" | "star";
    winner?: string;
  }[];
  delegation?: DelegationMember[];
  gallery?: string[];
}

export const TOURNAMENTS_DATA: TournamentItem[] = [
  // ================= 1. المسابقات الوفدية والقمية (wafdeya) =================
  {
    id: "f1",
    title: "الوفدية ال55",
    category: "wafdeya",
    categoryName: "المسابقات الوفدية والقمية",
    year: 2026,
    dateStr: "فبراير ٢٠٢٦",
    location: "كلية زراعة - جامعة عين شمس",
    placement: "المركز الأول ",
    specialAwards: ["قائد مثالي/ مصعب محمد", "مثالية وفد/ تسنيم أحمد", "مثالي وفد/ مصطفى هاشم", "مثالي عام/ عبدالحليم شكري"],
    image: "/images/hero/hero-2.jpg",
    description:
      "المهرجان الكشفي السنوي الأكبر على مستوى جامعة عين شمس، والذي تتنافس فيه عشائر كليات الجامعة على الدرع العام في مختلف الأنشطة الكشفية والوفدية والفنية والرياضية.",
    clanStory:
      "قدمت عشيرة جوالة هندسة عين شمس أداءً استثنائياً حصدت من خلاله المركز الأول على مستوى الجامعة بالدرع العام، وتألقت العشيرة في حفلات السمر الكشفي والريادة ونماذج المخيمات المعمارية التي أبهرت لجان التحكيم.",
    stats: {
      participantsCount: 45,
      competingClans: 14,
      shieldsCount: 4,
    },
    awardsDetailed: [
      { title: "مركز اول جميع الدروع", type: "trophy" },

    ],
    delegation: [
      { name: "القائد / مصعب محمد", role: "قائد الوفد العام", isLeader: true },
      { name: "القائدة / اروى زين", role: "قائدة مرشدات الوفد", isLeader: true },
      { name: "الجوال / يوسف شوكت", role: "مدرب الوفد", isLeader: true },
      { name: "الجوال / يوسف علاء", role: "وكيل الوفد" },
      { name: "الجوال / مايكل جورج", role: "قائد الارض" },
      { name: "الجوال / احمد مشعل", role: "" },
      { name: "الجوال / مازن طه", role: "" },
      { name: "الجوال / مصطفى هاشم", role: "" },
      { name: "الجوال / عبدالحليم شكري", role: "" },
      { name: "الجوال / محمد الحسن", role: "" },
      { name: "الجوال / يحيى محمد", role: "" },
      { name: "الجوالة / همسة احمد", role: "" },
      { name: "الجوالة / صفاء اسماعيل", role: "" },
      { name: "الجوالة / تسنيم احمد", role: "" },
      { name: "الجوالة / نورهان شوكت", role: "" },
      { name: "الجوالة / مريم بحر", role: "" },
      { name: "الجوالة / منة دياب", role: "" },
      { name: "الجوالة / هيا صالح", role: "" },


    ],
    gallery: [
      "/images/hero/hero-2.jpg",
      "/images/hero/pic1.jpg",
      "/images/hero/pic2.jpg",
    ],
  },
  {
    id: "f54",
    title: "الوفدية ال54",
    category: "wafdeya",
    categoryName: "المسابقات الوفدية والقمية",
    year: 2024,
    dateStr: "5/9/2024",
    location: "كلية زراعة",
    placement: "المركز الاول عام",
    specialAwards: [
      "وكيل مثالي/ كريم احمد",
      "مثالي وفد/ مصعب محمد",
      "مثالية عامه/ حنين احمد",
      "مثالية وفد/ مروة احمد",
      "مسامرة مثالية/ مريم هندي",
      "مثالي ميديا/ محمد علاء",
    ],
    image: "/images/hero/541.jpg",
    description: "",
    clanStory: "",
    awardsDetailed: [
      { title: "المركز الاول عام", type: "trophy" },
    ],
    delegation: [
      { name: "القائد / حسين احمد", role: "قائد الوفد", isLeader: true },
      { name: "القائدة / مريم علي (كركر)", role: "قائدة الوفد", isLeader: true },
      { name: "الجوال / كريم احمد", role: "وكيل الوفد" },
      { name: "الجوال / مصعب محمد", role: "قائد الارض" },
      { name: "الجوال / محمود هشام", role: "" },
      { name: "الجوال / كريم يسري", role: "" },
      { name: "الجوال / احمد صابر (دراجون)", role: "" },
      { name: "الجوال / نورالدين علي", role: "" },
      { name: "الجوال / يوسف علاء", role: "" },
      { name: "الجوال / محمد السيد", role: "" },
      { name: "الجوال / احمد مشعل", role: "" },
      { name: "الجوالة / حنين احمد", role: "" },
      { name: "الجوالة / مروه احمد", role: "" },
      { name: "الجوالة / روان احمد", role: "" },
      { name: "الجوالة / ايه حمدي", role: "" },
      { name: "الجوالة / مريم ققلي", role: "" },
      { name: "الجوالة / ندي اسامه", role: "" },
      { name: "الجوالة / مريم هندي", role: "" },
    ],
    gallery: [
      "/images/hero/541.jpg",
      "/images/hero/542.jpg",
      "/images/hero/543.jpg",
    ],
  },
  {
    id: "f53",
    title: "الوفدية ال53",
    category: "wafdeya",
    categoryName: "المسابقات الوفدية والقمية",
    year: 2022,
    dateStr: "15/9/2022",
    location: "كلية زراعة",
    placement: "المركز الاول عام",
    specialAwards: [
      "مثالي الوفد/ محمد اسامه",
      "مثالي عام الدورة/ يوسف احمد",
      "قائدة مثالية/ ندي رافت",
      "مثالية الوفد/ مريم علي",
      "مسامر مثالي/ احمد خالد و حنين احمد",
      "مثالية عامه الدورة/ ماسا داهام",
    ],
    image: "/images/hero/wafdeya53.jpg",
    description: "",
    clanStory: "",
    awardsDetailed: [
      { title: "المركز الاول عام", type: "trophy" },
    ],
    delegation: [
      { name: "القائد / كريم سلطان", role: "قائد الوفد", isLeader: true },
      { name: "القائدة / ندي رافت", role: "قائدة الوفد", isLeader: true },
      { name: "الجوال / يوسف احمد", role: "وكيل الوفد" },
      { name: "الجوال / حسين احمد", role: "قائد الارض" },
      { name: "الجوال / محمود هشام", role: "" },
      { name: "الجوال / حسام سليم", role: "" },
      { name: "الجوال / احمد صابر (دراجون)", role: "" },
      { name: "الجوال / محمد اسامه", role: "" },
      { name: "الجوال / احمد خالد", role: "" },
      { name: "الجوال / كريم يسري", role: "" },
      { name: "الجوال / عمر طمان", role: "" },
      { name: "الجوالة / حنين احمد", role: "" },
      { name: "الجوالة / مريم علي (كركر)", role: "" },
      { name: "الجوالة / مريم ياسر (منشي)", role: "" },
      { name: "الجوالة / سهيله هلال", role: "" },
      { name: "الجوالة / ماسا دهام", role: "" },
      { name: "الجوالة / ايه حمدي", role: "" },
      { name: "الجوالة / مايا شرف", role: "" },
    ],
    gallery: [
      "/images/hero/wafdeya53.jpg",
    ],
  },

  // ================= 2. المسابقات والبطولات الرياضية (sports) =================
  {
    id: "sports-28-11-2025",
    title: "الرياضية ال28 للجوالين وال11 للجوالات",
    category: "sports",
    categoryName: "المسابقات والبطولات الرياضية",
    year: 2025,
    dateStr: "23/7/2025",
    location: "كلية زراعة",
    placement: "المركز الأول جوالين والمركز الأول جوالات",
    specialAwards: [
      "مثالي عام/ يوسف علاء",
      "مثالي وفد/ مازن طه",
      "مثالية وفد/ دارين هاني",
      "قائد مثالي/ احمد صابر (دراجون)",
    ],
    image: "/images/hero/hero-3.jpg",
    description: "",
    clanStory: "",
    awardsDetailed: [
      { title: "المركز الأول جوالين", type: "trophy" },
      { title: "المركز الأول جوالات", type: "trophy" },
    ],
    delegation: [
      {
        name: "القائد / احمد صابر (دراجون)",
        role: "قائد وفد الجوالين",
        isLeader: true,
      },
      {
        name: "الجوال / مصعب محمد",
        role: "وكيل وفد الجوالين",
        isLeader: true,
      },
      { name: "الجوال / احمد مشعل", role: "" },
      { name: "الجوال / مازن طه", role: "" },
      { name: "الجوال / عبدالرحمن وحيد", role: "" },
      { name: "الجوال / يوسف علاء", role: "" },
      { name: "الجوال / محمد الحسن", role: "" },
      { name: "الجوال / قاسم احمد", role: "" },
      { name: "الجوال / محمد علاء", role: "" },
      { name: "الجوال / يوسف غريب", role: "" },

      {
        name: "القائدة / روان احمد",
        role: "قائدة وفد الجوالات",
        isLeader: true,
      },
      {
        name: "الجوالة / همسة احمد",
        role: "وكيلة وفد الجوالات",
        isLeader: true,
      },
      { name: "الجوالة / سلسبيل علي", role: "" },
      { name: "الجوالة / صفاء اسماعيل", role: "" },
      { name: "الجوالة / مروة احمد", role: "" },
      { name: "الجوالة / دارين هاني", role: "" },
    ],
    gallery: [
      "/images/hero/hero-3.jpg",
    ],
  },

  // ================= 3. المسابقات والمهارات الكشفية (scout) =================

  // ================= 4. المسابقات والأنشطة البحرية (naval) =================

  // ================= 5. مسابقات الفنون والأسمار (arts) =================
  {
    id: "arts-festival-4-2023",
    title: "مهرجان الفنون والاسمار ال4",
    category: "arts",
    categoryName: "مسابقات الفنون والأسمار",
    year: 2023,
    dateStr: "6/8/2023",
    location: "",
    placement: "المركز الثاني",
    specialAwards: [
      "مثالي عام/ احمد صابر (دراجون)",
      "قائد مثالي/ حسين احمد",
      "مثالي عام/ محمد اسامة",
      "مثالية عامة/ ماسة دهام",
      "مسامرة مثالية/ مريم هندي",
      "مثالي وفد/ معتز محمد",
      "مثالية وفد/ مريم قللي",
      "مثالي سواعد/ كريم احمد",
      "مثالي لجنة اعلامية/ يوسف هيثم",
    ],
    image: "/images/hero/arts-festival-4-2.jpeg",
    description: "",
    clanStory: "",
    awardsDetailed: [
      { title: "المركز الثاني", type: "trophy" },
    ],
    delegation: [
      {
        name: "القائد / حسين احمد",
        role: "قائد الوفد",
        isLeader: true,
      },
      {
        name: "القائدة / مريم علي (كركر)",
        role: "قائدة الوفد",
        isLeader: true,
      },
      {
        name: "الجوال / محمد اسامة",
        role: "وكيل الوفد",
        isLeader: true,
      },
      { name: "الجوال / محمود هشام", role: "" },
      { name: "الجوال / احمد صابر (دراجون)", role: "" },
      { name: "الجوال / معتز محمد", role: "" },
      { name: "الجوال / سيف الدين ابراهيم", role: "" },
      { name: "الجوال / محمد توبجي", role: "" },
      { name: "الجوال / احمد مرزوق", role: "" },
      { name: "الجوال / عمر محمد (توني)", role: "" },

      { name: "الجوالة / ماسا دهام", role: "" },
      { name: "الجوالة / مريم هندي", role: "" },
      { name: "الجوالة / ندي اسامة", role: "" },
      { name: "الجوالة / نوران هاني", role: "" },
      { name: "الجوالة / مريم قللي", role: "" },
    ],
    gallery: [
      "/images/hero/arts-festival-4-1.jpeg",
      "/images/hero/arts-festival-4-2.jpeg",
      "/images/hero/arts-festival-4-3.jpeg",
      "/images/hero/arts-festival-4-4.jpeg",
      "/images/hero/arts-festival-4-5.jpeg",
      "/images/hero/arts-festival-4-6.jpeg",
      "/images/hero/arts-festival-4-7.jpeg",
      "/images/hero/arts-festival-4-8.jpeg",
      "/images/hero/arts-festival-4-9.jpeg",
      "/images/hero/arts-festival-4-10.jpeg",
    ],
  },

];

export function getTournamentById(id: string): TournamentItem | undefined {
  const decodedId = decodeURIComponent(id).trim().toLowerCase();
  return TOURNAMENTS_DATA.find((t) => t.id.toLowerCase() === decodedId);
}

export function getTournamentsByCategory(
  categorySlug: string
): TournamentItem[] {
  const slug = categorySlug.toLowerCase().trim();
  return TOURNAMENTS_DATA.filter((t) => t.category === slug);
}
