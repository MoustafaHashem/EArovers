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
    specialAwards: ["قائد مثالي/ مصعب محمد","مثالية وفد/ تسنيم أحمد", "مثالي وفد/ مصطفى هاشم", "مثالي عام/ عبدالحليم شكري"],
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
      { name: "الجوال / يوسف شوكت", role: "مدرب الوفد" , isLeader: true  },
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
    id: "f2",
    title: "المسابقة القمية لكليات الهندسة بالجامعات المصرية",
    category: "wafdeya",
    categoryName: "المسابقات الوفدية والقمية",
    year: 2022,
    dateStr: "أكتوبر ٢٠٢٢",
    location: "جامعة القاهرة - ملاعب ومخيم الجوالة",
    placement: "المركز الثاني",
    specialAwards: ["جوال مثالي", "أفضل روح جماعية", "وسام الخدمة العامة"],
    image: "/images/hero/hero-3.jpg",
    description:
      "المسابقة القمية الرسمية التي تجمع عشائر كليات الهندسة من مختلف الجامعات المصرية في منافسة شريفة تعكس المستوى المتقدم لمهارات الجوالة الهندسية.",
    clanStory:
      "مثل وفد العشيرة كلية الهندسة خير تمثيل ونافس بقوة حتى اللحظات الأخيرة ليحصد المركز الثاني جمهورياً، مع تتويج أحد قادة العشيرة بلقب الجوال المثالي على مستوى الدورة.",
    stats: {
      participantsCount: 32,
      competingClans: 18,
      shieldsCount: 3,
    },
    awardsDetailed: [
      { title: "كأس المركز الثاني في الترتيب العام", type: "trophy" },
      { title: "شارة ولقب الجوال المثالي للدورة", type: "star" },
      { title: "وسام الروح الجماعية والتعاون الكشفي", type: "medal" },
    ],
    delegation: [
      { name: "القائد / مصطفى هاشم", role: "رئيس الوفد الكشفي", isLeader: true },
      { name: "الجوال / حسام علاء", role: "نائب قائد الوفد (الجوال المثالي)", isLeader: true },
      { name: "الجوال / عمرو خالد", role: "مسؤول المهارات الكشفية والطهي" },
      { name: "الجوال / ماجد سامي", role: "مسؤول اللياقة البدنية والماراثون" },
      { name: "الجوال / شريف نبيل", role: "مسؤول السمر والتوجيه المعنوي" },
      { name: "الجوال / تامر فؤاد", role: "أمين العهدة والمهمات" },
    ],
    gallery: [
      "/images/hero/hero-3.jpg",
      "/images/hero/hero-1.jpg",
    ],
  },
  {
    id: "engineering-clans-friendship-2024",
    title: "دورة الصداقة القمية لعشائر كليات الهندسة",
    category: "wafdeya",
    categoryName: "المسابقات الوفدية والقمية",
    year: 2024,
    dateStr: "مايو ٢٠٢٤",
    location: "المدينة الجامعية - جامعة حلوان",
    placement: "المركز الأول عام",
    specialAwards: ["درع الكفاءة العامة", "أفضل وفد كشفي", "وسام الريادة الميدانية"],
    image: "/images/hero/hero-1.jpg",
    description:
      "دورة الصداقة والمنافسات الرسمية الكبرى التي تحتفي بالروابط الأخوية والتنافس المهاري الرفيع بين عشائر الجوالة الهندسية.",
    clanStory:
      "تتويج مستحق بكأس البطولة بعد تصدر مجالات الريادة الكشفية والملاحة والأسمار الثقافية بروح حماسية لا تلين.",
    stats: {
      participantsCount: 38,
      competingClans: 12,
      shieldsCount: 3,
    },
    awardsDetailed: [
      { title: "كأس المركز الأول ودرع الصداقة العام", type: "trophy" },
      { title: "درع الكفاءة التنظيمية والميدانية", type: "shield" },
      { title: "وسام الوفد الكشفي الأفضل سلوكاً ومظهراً", type: "medal" },
    ],
    delegation: [
      { name: "القائد / عمر أحمد", role: "قائد الوفد", isLeader: true },
      { name: "الجوال / علي عادل", role: "مسؤول المشاريع الهندسية والريادة" },
      { name: "الجوال / زياد ناصر", role: "مسؤول الاتصال والعلاقات" },
      { name: "الجوال / باسل وليد", role: "قائد رهط الجوالة" },
    ],
    gallery: [
      "/images/hero/hero-1.jpg",
      "/images/hero/hero-3.jpg",
    ],
  },
 
  // ================= 2. المسابقات والبطولات الرياضية (sports) =================
  {
    id: "university-football-championship-2024",
    title: "دوري كشافة الجامعات لكرة القدم",
    category: "sports",
    categoryName: "المسابقات والبطولات الرياضية",
    year: 2024,
    dateStr: "فبراير ٢٠٢٤",
    location: "الملاعب المفتوحة - جامعة عين شمس",
    placement: "المركز الأول عام",
    specialAwards: ["كأس البطولة", "أفضل حارس مرمى", "هداف الدورة الكشفية"],
    image: "/images/hero/hero-3.jpg",
    description:
      "البطولة الرياضية السنوية لكرة القدم بين عشائر الجوالة، والتي تتطلب لياقة بدنية عالية وتناسقاً جماعياً متميزاً.",
    clanStory:
      "خاض فريق العشيرة مباريات ملحمية دون أي هزيمة وتوج بالبطولة بعد مباراة نهائية حبست الأنفاس انتهت بركلات الترجيح.",
    stats: {
      participantsCount: 16,
      competingClans: 16,
      shieldsCount: 3,
    },
    awardsDetailed: [
      { title: "كأس المركز الأول لبطولة خماسيات كرة القدم", type: "trophy" },
      { title: "قفاز أفضل حارس مرمى في البطولة", type: "star" },
      { title: "حذاء هداف البطولة الكروية", type: "medal" },
    ],
    delegation: [
      { name: "الكابتن / محمد طارق", role: "قائد الفريق ومهاجم (هداف البطولة)", isLeader: true },
      { name: "الجوال / إسلام عصام", role: "حارس مرمى (أفضل حارس في البطولة)", isLeader: true },
      { name: "الجوال / سيف الدين عادل", role: "مدافع الفريق" },
      { name: "الجوال / عبد الرحمن يحيى", role: "صانع ألعاب ووسط ميدان" },
      { name: "الجوال / نور الدين شريف", role: "جناح أيمن الفريق" },
    ],
    gallery: [
      "/images/hero/hero-3.jpg",
    ],
  },

  // ================= 3. المسابقات والمهارات الكشفية (scout) =================

  // ================= 4. المسابقات والأنشطة البحرية (naval) =================
 
  // ================= 5. مسابقات الفنون والأسمار (arts) =================
  {
    id: "grand-scout-samar-festival-2024",
    title: "مهرجان السمر الكشفي الكبير",
    category: "arts",
    categoryName: "مسابقات الفنون والأسمار",
    year: 2024,
    dateStr: "فبراير ٢٠٢٤",
    location: "المسرح الكبير - كلية الهندسة جامعة عين شمس",
    placement: "المستوى الأول متميز",
    specialAwards: ["درع الإبداع والتميز المسرحي", "أفضل مخرج سمر كشفي", "جائزة الأداء الفردي المتميز"],
    image: "/images/hero/hero-2.jpg",
    description:
      "حفل السمر الكشفي السنوي الأضخم، متضمناً العروض المسرحية الهادفة والاسكتشات الكوميدية والإنشاد والصيحات الكشفية التراثية.",
    clanStory:
      "أبهر عرض العشيرة المسرحي الحضور ولجنة التحكيم بفكرته الهادفة وإتقان ديكوره وموسيقاه الحية، ليحصد جوائز الإخراج والتمثيل والدرع العام للسمر.",
    stats: {
      participantsCount: 35,
      competingClans: 14,
      shieldsCount: 3,
    },
    awardsDetailed: [
      { title: "درع المستوى الأول للإبداع والتميز المسرحي", type: "trophy" },
      { title: "كأس أفضل مخرج سمر كشفي", type: "star" },
      { title: "وسام الأداء الفردي المتميز والإنشاد", type: "medal" },
    ],
    delegation: [
      { name: "الجوال / كريم حسن", role: "مخرج العرض المسرحي والسمر", isLeader: true },
      { name: "الجوال / يحيى زكريا", role: "بطل العرض المسرحي (أفضل ممثل)", isLeader: true },
      { name: "الجوالة / ندى سمير", role: "مسؤولة الديكور والملابس التراثية" },
      { name: "الجوال / مازن فكري", role: "مسؤول الموسيقى والمؤثرات الحية" },
      { name: "الجوال / عمر خالد", role: "قائد كورال الصيحات الكشفية" },
    ],
    gallery: [
      "/images/hero/hero-2.jpg",
      "/images/hero/hero-1.jpg",
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
