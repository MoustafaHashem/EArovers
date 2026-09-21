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
    title: "مهرجان الجوالة بجامعة عين شمس",
    category: "wafdeya",
    categoryName: "المسابقات الوفدية والقمية",
    year: 2023,
    dateStr: "نوفمبر ٢٠٢٣",
    location: "المخيم الكشفي الدائم - جامعة عين شمس",
    placement: "المركز الأول عام",
    specialAwards: ["درع التميز الكشفي", "أفضل مخرج سمر", "درع الانضباط العام"],
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
      { title: "درع المركز الأول العام على مستوى الجامعة", type: "trophy" },
      { title: "درع التميز الكشفي للريادة والمخيمات", type: "shield" },
      { title: "جائزة أفضل مخرج سمر كشفي", type: "star" },
      { title: "درع الانضباط والتقاليد الكشفية", type: "medal" },
    ],
    delegation: [
      { name: "القائد / عمر أحمد", role: "قائد الوفد العام", isLeader: true },
      { name: "القائدة / سارة محمود", role: "قائدة مرشدات الوفد", isLeader: true },
      { name: "الجوال / أحمد سيد", role: "مسؤول نشاط الريادة والمخيمات" },
      { name: "الجوال / كريم حسن", role: "مخرج السمر والعروض الفنية" },
      { name: "الجوال / محمد طارق", role: "مسؤول النشاط الرياضي" },
      { name: "الجوالة / مريم علي", role: "مسؤولة المعرض والتراث الكشفي" },
      { name: "الجوال / خالد إبراهيم", role: "مسؤول الإمداد والتجهيزات" },
      { name: "الجوال / يوسف مصطفى", role: "مسؤول الخدمة العامة والانضباط" },
    ],
    gallery: [
      "/images/hero/hero-2.jpg",
      "/images/hero/hero-1.jpg",
      "/images/hero/hero-3.jpg",
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
  {
    id: "asu-annual-clans-rally-2023",
    title: "ملتقى العشائر السنوي لجامعة عين شمس",
    category: "wafdeya",
    categoryName: "المسابقات الوفدية والقمية",
    year: 2023,
    dateStr: "مارس ٢٠٢٣",
    location: "أرض الجوالة - المدينة الجامعية بالعباسية",
    placement: "المركز الأول",
    specialAwards: ["درع التفوق الكشفي", "أفضل طهي خلوي", "جائزة التقاليد الكشفية"],
    image: "/images/hero/hero-2.jpg",
    description:
      "الملتقى السنوي الجامعي الذي يجمع جميع عشائر كليات عين شمس لاختبار الجاهزية والابتكار الكشفي.",
    clanStory:
      "تفوق وفد جوالة هندسة في كافة التحديات التنافسية وتصدر الترتيب العام بجدارة واقتدار.",
    stats: {
      participantsCount: 28,
      competingClans: 15,
      shieldsCount: 2,
    },
    awardsDetailed: [
      { title: "درع المركز الأول في ملتقى العشائر", type: "trophy" },
      { title: "وسام الإتقان والطهي الخلوي", type: "star" },
    ],
    delegation: [
      { name: "القائد / أحمد سيد", role: "قائد الوفد", isLeader: true },
      { name: "الجوال / مروان شريف", role: "مسؤول الطهي الكشفي المبتكر" },
      { name: "الجوال / هاني رمزي", role: "مسؤول التقاليد والتحكيم" },
    ],
    gallery: [
      "/images/hero/hero-2.jpg",
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
  {
    id: "rovers-athletic-marathon-2023",
    title: "ماراثون الجوالة وتحدي اللياقة البدنية",
    category: "sports",
    categoryName: "المسابقات والبطولات الرياضية",
    year: 2023,
    dateStr: "ديسمبر ٢٠٢٣",
    location: "مضمار ألعاب القوى - ستاد الجامعة",
    placement: "المركز الأول",
    specialAwards: ["درع القوة والتحمل", "الميدالية الذهبية للسباق", "وسام السرعة"],
    image: "/images/hero/hero-1.jpg",
    description:
      "سباق الضاحية والتتابع وتحديات اللياقة البدنية الشاملة بين شباب العشائر الكشفية.",
    clanStory:
      "حصد جوالو هندسة المراكز الفردية الأولى وحققوا الدرع العام للياقة البدنية بجدارة.",
    stats: {
      participantsCount: 20,
      competingClans: 12,
      shieldsCount: 2,
    },
    awardsDetailed: [
      { title: "درع بطولة اللياقة البدنية والتحمل", type: "shield" },
      { title: "الميدالية الذهبية لسباق الضاحية 5 كم", type: "medal" },
    ],
    delegation: [
      { name: "الجوال / ماجد سامي", role: "بطل سباق 5 كم (الميدالية الذهبية)", isLeader: true },
      { name: "الجوال / كمال بدر", role: "عداء تتابع ومدرب لياقة", isLeader: true },
      { name: "الجوال / عادل يونس", role: "فريق تحدي الضاحية" },
    ],
    gallery: [
      "/images/hero/hero-1.jpg",
    ],
  },
  {
    id: "engineering-volleyball-cup-2023",
    title: "كأس بطولة الطائرة لجوالة الجامعات",
    category: "sports",
    categoryName: "المسابقات والبطولات الرياضية",
    year: 2023,
    dateStr: "أبريل ٢٠٢٣",
    location: "الصالة المغطاة - جامعة القاهرة",
    placement: "المركز الثاني",
    specialAwards: ["الميدالية الفضية", "درع الروح الرياضية"],
    image: "/images/hero/hero-3.jpg",
    description:
      "منافسات الكرة الطائرة التنافسية بين فرق عشائر كليات الهندسة بالجامعات المصرية.",
    clanStory:
      "أداء بطولي حتى المباراة النهائية والتتويج بالفضية وسط إشادة كبيرة من جميع المنظمين.",
    stats: {
      participantsCount: 12,
      competingClans: 14,
      shieldsCount: 2,
    },
    awardsDetailed: [
      { title: "الميدالية الفضية للكرة الطائرة", type: "medal" },
      { title: "درع الفريق المثالي والروح الرياضية", type: "shield" },
    ],
    delegation: [
      { name: "الجوال / وائل مجدي", role: "قائد فريق الكرة الطائرة", isLeader: true },
      { name: "الجوال / سامح رفعت", role: "معد الفريق" },
      { name: "الجوال / إيهاب شكري", role: "ضارب رئيسي" },
    ],
    gallery: [
      "/images/hero/hero-3.jpg",
    ],
  },

  // ================= 3. المسابقات والمهارات الكشفية (scout) =================
  {
    id: "scout-skills-rally-2024",
    title: "مهرجان المهارات وفنون الخلاء الكشفية",
    category: "scout",
    categoryName: "المسابقات والمهارات الكشفية",
    year: 2024,
    dateStr: "فبراير ٢٠٢٤",
    location: "المخيم الكشفي الدائم - وادي النطرون",
    placement: "المستوى الأول متميز",
    specialAwards: ["درع الريادة الكشفية", "وسام الطهي الخلوي المبتكر", "شارة الملاحة الأرضية"],
    image: "/images/hero/hero-6-pioneering.jpg",
    description:
      "المنافسة الكشفية الأصيلة في بناء نماذج الريادة باستخدام الأخشاب والحبال، الطهي الخلوي بدون أواني، والمسير الكشفي في الطبيعة.",
    clanStory:
      "شيدت العشيرة نموذج برج استطلاع وجسر هوائي بارتفاع ٦ أمتار في وقت قياسي وبتقنية هندسية نالت الدرجة الكاملة من لجنة التحكيم الدولية.",
    stats: {
      participantsCount: 30,
      competingClans: 10,
      shieldsCount: 3,
    },
    awardsDetailed: [
      { title: "درع المستوى الأول في الريادة ونماذج الحبال", type: "shield" },
      { title: "وسام الابتكار في الطهي الخلوي", type: "star" },
      { title: "شارة المسير والملاحة الأرضية", type: "medal" },
    ],
    delegation: [
      { name: "القائد / أحمد سيد", role: "قائد وفد المهارات الكشفية", isLeader: true },
      { name: "الجوال / حسام علاء", role: "مسؤول هندسة وتصميم الريادة", isLeader: true },
      { name: "الجوال / مروان شريف", role: "مسؤول الطهي الخلوي" },
      { name: "الجوال / طارق سامي", role: "مسؤول الملاحة وفنون الخلاء" },
      { name: "الجوال / هيثم عادل", role: "مسؤول العقد والدورات الكشفية" },
    ],
    gallery: [
      "/images/hero/hero-6-pioneering.jpg",
      "/images/hero/hero-2.jpg",
    ],
  },
  {
    id: "pioneering-projects-cup-2023",
    title: "مسابقة نماذج الريادة وتخطيط المخيمات",
    category: "scout",
    categoryName: "المسابقات والمهارات الكشفية",
    year: 2023,
    dateStr: "أكتوبر ٢٠٢٣",
    location: "أرض المخيم الكشفي - جامعة عين شمس",
    placement: "المركز الأول",
    specialAwards: ["أفضل بوابة هندسية", "درع الإتقان الميداني", "أسرع فك وتركيب"],
    image: "/images/hero/hero-6-pioneering.jpg",
    description:
      "مسابقة هندسية كشفية خالصة تركز على العقد والدورات والربطات الحبلية وبناء بوابات وأبراج المخيمات الكشفية.",
    clanStory:
      "صمم فريق جوالة هندسة بوابة تراثية متقنة جمعت بين الفن الفرعوني والتقنيات الكشفية الحديثة وحصدت المركز الأول بإجماع الآراء.",
    stats: {
      participantsCount: 25,
      competingClans: 12,
      shieldsCount: 2,
    },
    awardsDetailed: [
      { title: "كأس المركز الأول لأفضل بوابة كشفية هندسية", type: "trophy" },
      { title: "درع الإتقان والسرعة الميدانية", type: "shield" },
    ],
    delegation: [
      { name: "الجوال / حسام علاء", role: "كبير مهندسي البوابة", isLeader: true },
      { name: "الجوال / باسم منير", role: "مسؤول الربطات والجسور المعلقة" },
      { name: "الجوال / فريد عزمي", role: "مسؤول الأخشاب والتجهيز" },
    ],
    gallery: [
      "/images/hero/hero-6-pioneering.jpg",
    ],
  },
  {
    id: "desert-navigation-challenge-2023",
    title: "تحدي الملاحة الصحراوية والمسير الكشفي",
    category: "scout",
    categoryName: "المسابقات والمهارات الكشفية",
    year: 2023,
    dateStr: "يناير ٢٠٢٣",
    location: "صحراء وادي دجلة - المعادي",
    placement: "المستوى الأول",
    specialAwards: ["شارة المغامرة المتقدمة", "المركز الأول في تحديد المواقع بالبوصلة"],
    image: "/images/hero/hero-1.jpg",
    description:
      "مسير جبلي وصحراوي شاق لمسافة ٢٠ كم يعتمد على الخرائط الطبوغرافية والبوصلة وتتبع الأثر وقراءة النجوم ليلاً.",
    clanStory:
      "اجتاز جميع أفراد الرهط المسير بنجاح ودقة مطلقة مسجلين أسرع زمن وصول لكافة نقاط الفحص.",
    stats: {
      participantsCount: 15,
      competingClans: 8,
      shieldsCount: 1,
    },
    awardsDetailed: [
      { title: "وسام المستوى الأول في الملاحة الصحراوية", type: "star" },
      { title: "شارة الاستكشاف والمغامرة المتقدمة", type: "medal" },
    ],
    delegation: [
      { name: "الجوال / طارق سامي", role: "دليل المسير والبوصلة", isLeader: true },
      { name: "الجوال / عصام جابر", role: "مسؤول الإسعافات الأولية والسلامة" },
      { name: "الجوال / شادي رمزي", role: "مسؤول الاتصال اللاسلكي" },
    ],
    gallery: [
      "/images/hero/hero-1.jpg",
    ],
  },

  // ================= 4. المسابقات والأنشطة البحرية (naval) =================
  {
    id: "naval-rowing-sailing-championship-2024",
    title: "سباق التجديف والشراع لكشافة الجامعات",
    category: "naval",
    categoryName: "المسابقات والأنشطة البحرية",
    year: 2024,
    dateStr: "مايو ٢٠٢٤",
    location: "النادي النهري للكشافة البحرية - الدقي",
    placement: "المركز الأول عام",
    specialAwards: ["كأس البطولة الملاحية", "درع التميز البحري", "أفضل طاقم تجديف متزامن"],
    image: "/images/hero/hero-4.jpg",
    description:
      "المنافسة المائية السنوية لسباقات قوارب التجديف والشراع المائي بين العشائر الكشفية على صفحة مياه النيل الخالد.",
    clanStory:
      "أثبت أبطال جوالة هندسة مهاراتهم المائية العالية وحصدوا كأس التجديف الرباعي والشراع محققين الصدارة العامة للبطولة البحرية.",
    stats: {
      participantsCount: 18,
      competingClans: 10,
      shieldsCount: 3,
    },
    awardsDetailed: [
      { title: "كأس البطولة الملاحية والتجديف النهري", type: "trophy" },
      { title: "درع التميز والمهارات البحرية", type: "shield" },
      { title: "شارة أفضل طاقم تجديف متزامن", type: "star" },
    ],
    delegation: [
      { name: "القائد / يوسف مصطفى", role: "قبطان الوفد البحري", isLeader: true },
      { name: "الجوال / معتز أمين", role: "مجدف رئيسي (سكول)", isLeader: true },
      { name: "الجوال / حازم شوقي", role: "مسؤول الشراع والملاحة النهرية" },
      { name: "الجوال / رامي فايز", role: "مجدف الفريق" },
      { name: "الجوال / أشرف كرم", role: "مجدف الفريق ومسؤول الإنقاذ" },
    ],
    gallery: [
      "/images/hero/hero-4.jpg",
      "/images/hero/hero-1.jpg",
    ],
  },
  {
    id: "semaphore-morse-navigation-cup-2023",
    title: "بطولة الملاحة وإشارات السيمافور والمورس",
    category: "naval",
    categoryName: "المسابقات والأنشطة البحرية",
    year: 2023,
    dateStr: "سبتمبر ٢٠٢٣",
    location: "نادي الصيد البحري - الإسكندرية",
    placement: "المستوى الأول متميز",
    specialAwards: ["درع التفوق الملاحي", "سرعة فك شفرات المورس", "شارة الإشارات البحرية"],
    image: "/images/hero/hero-4.jpg",
    description:
      "مسابقات التخاطب البحري بالأعلام (السيمافور) وإشارات الضوء والصوت (المورس) والعقد المائية المتخصصة.",
    clanStory:
      "تألق شباب العشيرة في مسابقة الإشارات وسجلوا زمناً قياسياً في فك وإرسال الرسائل المشفرة بدقة تامة.",
    stats: {
      participantsCount: 14,
      competingClans: 11,
      shieldsCount: 2,
    },
    awardsDetailed: [
      { title: "درع التفوق الملاحي والاتصالات البحرية", type: "shield" },
      { title: "وسام السرعة والدقة في شفرة المورس", type: "medal" },
    ],
    delegation: [
      { name: "الجوال / حازم شوقي", role: "كبير مسؤولي إشارات السيمافور", isLeader: true },
      { name: "الجوال / سامر وفيق", role: "أخصائي شفرات المورس الضوئي" },
      { name: "الجوال / مدحت خليل", role: "مسؤول عقد الحبال الملاحية" },
    ],
    gallery: [
      "/images/hero/hero-4.jpg",
    ],
  },
  {
    id: "scout-seamanship-regatta-2022",
    title: "رالي الكشافة البحرية والسباحة والإنقاذ",
    category: "naval",
    categoryName: "المسابقات والأنشطة البحرية",
    year: 2022,
    dateStr: "أغسطس ٢٠٢٢",
    location: "بحيرة التمساح - الإسماعيلية",
    placement: "المركز الثاني",
    specialAwards: ["الميدالية الفضية للسباحة الحرة", "شارة السلامة والإنقاذ المائي"],
    image: "/images/hero/hero-4.jpg",
    description:
      "منافسات السباحة الحرة والإنقاذ المائي وفنون التجديف الفردي في البيئات المائية المفتوحة.",
    clanStory:
      "مشاركة قوية توجت بالفضية وشهادات تقدير في مهارات الغطس والإنقاذ الكشفي.",
    stats: {
      participantsCount: 12,
      competingClans: 9,
      shieldsCount: 2,
    },
    awardsDetailed: [
      { title: "الميدالية الفضية لسباقات السباحة والإنقاذ", type: "medal" },
      { title: "شارة السلامة البحرية المعتمدة", type: "star" },
    ],
    delegation: [
      { name: "الجوال / أشرف كرم", role: "سباح ومنقذ معتمد", isLeader: true },
      { name: "الجوال / هاني عزت", role: "غطاس الفريق" },
    ],
    gallery: [
      "/images/hero/hero-4.jpg",
    ],
  },

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
  {
    id: "scout-heritage-art-exhibition-2023",
    title: "معرض الفنون التشكيلية والتراث الكشفي",
    category: "arts",
    categoryName: "مسابقات الفنون والأسمار",
    year: 2023,
    dateStr: "ديسمبر ٢٠٢٣",
    location: "قاعة المعارض المركزية - قصر الزعفران",
    placement: "المركز الأول",
    specialAwards: ["درع المعرض التراثي والفني", "شارة الإتقان في الأعمال اليدوية", "أفضل توثيق تاريخي"],
    image: "/images/hero/hero-3.jpg",
    description:
      "معرض الإبداعات الفنية والأعمال اليدوية والأركيت والحرق على الخشب، وتوثيق تاريخ الحركة الكشفية وهندسة عين شمس.",
    clanStory:
      "قدم جناح العشيرة مجسمات هندسية خشبية ولوحات زيتية وتوثيقاً نادراً لمسيرة العشيرة حاز إعجاب رئيس الجامعة وعميد الكلية.",
    stats: {
      participantsCount: 20,
      competingClans: 15,
      shieldsCount: 3,
    },
    awardsDetailed: [
      { title: "درع المركز الأول للمعرض التراثي والفني", type: "shield" },
      { title: "وسام الإتقان في النحت والأعمال اليدوية", type: "star" },
    ],
    delegation: [
      { name: "الجوالة / مريم علي", role: "منسقة المعرض والفنون التشكيلية", isLeader: true },
      { name: "الجوال / شريف نبيل", role: "مسؤول أعمال الأركيت والنحت الخشبي" },
      { name: "الجوال / وليد سامح", role: "مسؤول التوثيق والأرشيف التاريخي" },
    ],
    gallery: [
      "/images/hero/hero-3.jpg",
    ],
  },
  {
    id: "scout-choir-anthems-cup-2022",
    title: "مسابقة الأناشيد والصيحات الكشفية",
    category: "arts",
    categoryName: "مسابقات الفنون والأسمار",
    year: 2022,
    dateStr: "نوفمبر ٢٠٢٢",
    location: "المدرج الكبير - كلية الهندسة",
    placement: "المركز الأول",
    specialAwards: ["كأس الإنشاد الكشفي", "أفضل صيحة حماسية هادفة"],
    image: "/images/hero/hero-2.jpg",
    description:
      "مسابقة التنافس في الأداء الجماعي للأناشيد الكشفية والوطنية والصيحات الحماسية المنضبطة.",
    clanStory:
      "تألق كورال العشيرة بأداء نشيد العشيرة الرسمي وصيحات كشفية نالت تصفيق الجميع والمركز الأول بجدارة.",
    stats: {
      participantsCount: 25,
      competingClans: 12,
      shieldsCount: 2,
    },
    awardsDetailed: [
      { title: "كأس المركز الأول للإنشاد الكشفي الجماعي", type: "trophy" },
      { title: "وسام الصيحة الكشفية الأكثر حماساً", type: "star" },
    ],
    delegation: [
      { name: "الجوال / عمر خالد", role: "مايسترو وقائد الكورال الكشفي", isLeader: true },
      { name: "الجوال / هاني رفعت", role: "منشد رئيسي وعازف إيقاع" },
    ],
    gallery: [
      "/images/hero/hero-2.jpg",
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
