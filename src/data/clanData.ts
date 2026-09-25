export type Member = {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
};

// --- TREE DATA STRUCTURE ---
export type RoleNode = {
  member: Member;
  role: string;
  promotesTo?: number; // Year this person becomes clan leader (for testing animations)
  subordinates?: RoleNode[]; // Assistants or Deputies that branch directly below this person
};

export type ClanTier = {
  title: string;
  members: RoleNode[];
};

export type ComplexYearData = {
  year: number;
  tiers: {
    highCouncil: ClanTier;      // قائد العشيرة، قائدة الجوالات في المنتصف (صف واحد)
    auxiliary: ClanTier;        // قادة الهيكل المعاون (وتحتهم المساعدين)
    management: ClanTier;       // رواد الرهوط (وتحتهم الوكلاء)
    base: ClanTier;             // الجوالين والمرشحين
  };
};

// Persons Dictionary
const p = {
  leader: { id: "p-leader", name: "عمر أحمد", initials: "عم" },
  guideLeader: { id: "p-guideL", name: "ندى محمد", initials: "ند" },
  seniorRover: { id: "p-seniorR", name: "أحمد سيد", initials: "أح" },
  seniorGuide: { id: "p-seniorG", name: "سلمى ياسر", initials: "سل" },
  assistantLeader: { id: "p-assist", name: "كريم مجدي", initials: "كر" },
  mo3sab: { id: "p-mo3sab", name: "مصعب محمد", initials: "مص" },
  arwi: { id: "p-arwi", name: "أروي زين", initials: "أر" },
  michael: { id: "p-michael", name: "مايكل جورج", initials: "ما" },
  ahmedMashal: { id: "p-ahmedMashal", name: "احمد مشعل", initials: "أم" },
  yusufAlaa: { id: "p-yusufAlaa", name: "يوسف علاء", initials: "يو" },
  hamsa: { id: "p-hamsa", name: "همسه احمد", initials: "هم" },
  
  media: { id: "p-media", name: "علي حسن", initials: "عل" },
  mediaAssist: { id: "p-mediaA", name: "زياد كمال", initials: "زي" },
  sec: { id: "p-sec", name: "سارة عادل", initials: "سا" },
  secAssist: { id: "p-secA", name: "مريم طارق", initials: "مر" },
  quartermaster: { id: "p-quarter", name: "محمود سعد", initials: "مح" },
  abdulrahmanWahid: { id: "p-abdulrahmanWahid", name: "عبدالرحمن وحيد", initials: "عب" },
  malakEhab: { id: "p-malakEhab", name: "ملك ايهاب", initials: "مل" },
  nourhanShoukat: { id: "p-nourhanShoukat", name: "نورهان شوكت", initials: "نو" },
  tasneemAhmed: { id: "p-tasneemAhmed", name: "تسنيم احمد", initials: "تن" },
  omarZaki: { id: "p-omarZaki", name: "عمر ذكي", initials: "عم" },
  mustafaHashem: { id: "p-mustafaHashem", name: "مصطفي هاشم", initials: "مص" },
  yuusufAlaa: { id: "p-yuusufAlaa", name: "يوسف علاء", initials: "يو" },
  ayaSalah: { id: "p-ayaSalah", name: "هيا صالح", initials: "هي" },
  mazenTaha: { id: "p-mazenTaha", name: "مازن طه", initials: "ما" },
  abdelhalimShukri: { id: "p-abdelhalimShukri", name: "عبد الحليم شكري", initials: "عب" },
  jamilaTawfiq: { id: "p-jamilaTawfiq", name: "جميله توفيق", initials: "جم" },
  maryamBahr: { id: "p-maryamBahr", name: "مريم بحر", initials: "مر" },
  menaDiab: { id: "p-menaDiab", name: "منه دياب", initials: "من" },
  minaShahdy: { id: "p-minaShahdy", name: "مينا شهدي", initials: "مي" },
  mohammedElHassan: { id: "p-mohammedElHassan", name: "محمد الحسن", initials: "مح" },
  noorKhaled: { id: "p-noorKhaled", name: "نور خالد", initials: "نو" },
  omarKhamis: { id: "p-omarKhamis", name: "عمر خميس", initials: "عم" },
  safaaIsmail: { id: "p-safaaIsmail", name: "صفاء اسماعيل", initials: "صف" },
  yahyaMohammed: { id: "p-yahyaMohammed", name: "يحيي محمد", initials: "يح" },
  rawanAshraf: { id: "p-rawanAshraf", name: "روان اشرف", initials: "رو" },

  rahtLeader1: { id: "p-raht1", name: "خالد محمود", initials: "خا" },
  rahtDeputy1: { id: "p-dep1", name: "يوسف طارق", initials: "يو" },
  rover1: { id: "p-rov1", name: "طارق زياد", initials: "طا" },
  candidate1: { id: "p-cand1", name: "حسن نبيل", initials: "حس" },

  rahtLeader2: { id: "p-raht2", name: "مصطفى جمال", initials: "مص" },
  rahtDeputy2: { id: "p-dep2", name: "أدهم سعيد", initials: "أد" },
  rover2: { id: "p-rov2", name: "مازن علي", initials: "ما" },
  candidate2: { id: "p-cand2", name: "رامي كمال", initials: "را" },
};


export const clanTreeData: ComplexYearData[] = [
  {
    year: 2026,
    tiers: {
      highCouncil: {
        title: "مجلس القيادة",
        members: [
          { member: p.mo3sab, role: "قائد العشيرة" },
          { member: p.arwi, role: "قائده المرشدات" },
          { member: p.michael, role: "مساعد قائد العشيرة" },
          { member: p.ahmedMashal, role: "مساعد قائد العشيرة" },
          { member: p.yusufAlaa, role: "الرائد الاكير" },
          { member: p.hamsa, role: "الرائده الكبري" },
        ],
      },
      auxiliary: {
        title: "الهيكل المعاون",
        members: [
          { member: p.mustafaHashem, role: "قائد التحول الرقمي" },
          { member: p.abdulrahmanWahid, role: "قائد الميديا" },
          { member: p.malakEhab, role: "مساعده قائد الميديا" },
          { member: p.nourhanShoukat, role: "قائده السكرتاريه" },
          { member: p.tasneemAhmed, role: "مساعده قائده السكرتاريه" },
          { member: p.omarZaki, role: "امين العهده" },
        ],
      },
      management: {
        title: "مجلس الإدارة",
        members: [
          { member: p.yusufAlaa, role: "عضو مجلس الإدارة" },
          { member: p.hamsa, role: "عضو مجلس الإدارة" },
          { member: p.mustafaHashem, role: "عضو مجلس الإدارة" },
          { member: p.ayaSalah, role: "عضو مجلس الإدارة" },
          { member: p.mazenTaha, role: "عضو مجلس الإدارة" },
          { member: p.abdelhalimShukri, role: "عضو مجلس الإدارة" },
          { member: p.abdulrahmanWahid, role: "عضو مجلس الإدارة" },
          { member: p.jamilaTawfiq, role: "عضو مجلس الإدارة" },
          { member: p.malakEhab, role: "عضو مجلس الإدارة" },
          { member: p.maryamBahr, role: "عضو مجلس الإدارة" },
          { member: p.menaDiab, role: "عضو مجلس الإدارة" },
          { member: p.minaShahdy, role: "عضو مجلس الإدارة" },
          { member: p.mohammedElHassan, role: "عضو مجلس الإدارة" },
          { member: p.noorKhaled, role: "عضو مجلس الإدارة" },
          { member: p.omarKhamis, role: "عضو مجلس الإدارة" },
          { member: p.safaaIsmail, role: "عضو مجلس الإدارة" },
          { member: p.tasneemAhmed, role: "عضو مجلس الإدارة" },
          { member: p.yahyaMohammed, role: "عضو مجلس الإدارة" },
          { member: p.nourhanShoukat, role: "عضو مجلس الإدارة" },
          { member: p.rawanAshraf, role: "عضو مجلس الإدارة" },
        ]
      },
      base: {
        title: "قاعدة العشيرة",
        members: [
          { member: p.leader, role: "جوال (فايكنج)" },
          { member: p.guideLeader, role: "مرشح (فايكنج)" },
          { member: p.seniorRover, role: "جوال (فرسان)" },
        ]
      }
    },
  },
];

// --- SHIELDS DATA ---
export type ShieldCategory = {
  id: string;
  title: string;
  description: string;
  image: string;
  items: { title: string; desc?: string; icon: string }[];
};

export const shieldsData: ShieldCategory[] = [
  {
    id: "scout",
    title: "الدرع الكشفي",
    description: "أساس الحركة الكشفية، مهارات البقاء، والريادة.",
    image: "/images/badges/scout.png",
    items: [
      { title: "الريادة والكادجات", icon: "🏕️" },
      { title: "العقد والربطات", icon: "🪢" },
      { title: "حفلات السمر", icon: "🔥" },
      { title: "الملاحة والخرائط", icon: "🧭" },
    ],
  },
  {
    id: "religious",
    title: "درع ديني",
    description: "تنمية الروح الدينية والوعي العقدي لدى الجوالين.",
    image: "/images/badges/religious.png",
    items: [
      { title: "العبادة والتدبر", icon: "🕌" },
      { title: "أثر الحضور الديني", icon: "📖" },
      { title: "المحافظة على العبادات", icon: "🕊️" },
    ],
  },
  {
    id: "scientific",
    title: "درع علمي",
    description: "تعزيز التفكير العلمي والابتكار والتجريب.",
    image: "/images/badges/scientific.png",
    items: [
      { title: "العلوم التطبيقية", icon: "🔬" },
      { title: "البحوث والاختبارات", icon: "🧪" },
      { title: "الابتكار والتجريب", icon: "⚙️" },
    ],
  },
  {
    id: "art",
    title: "الدرع الفني",
    description: "تنمية المواهب الفنية والإبداعية لدى الجوالين.",
    image: "/images/badges/artistic.png",
    items: [
      { title: "أركيت", icon: "🪵" },
      { title: "سترنج آرت", icon: "🧵" },
      { title: "حرق على الجلد", icon: "🔥" },
      { title: "أشغال النحاس والمعادن", icon: "🔨" },
    ],
  },
  {
    id: "sports",
    title: "الدرع الرياضي",
    description: "بناء الجسم السليم وتعزيز الروح الرياضية.",
    image: "/images/badges/sports.png",
    items: [
      { title: "كرة قدم", icon: "⚽" },
      { title: "كرة سلة", icon: "🏀" },
      { title: "كرة طائرة", icon: "🏐" },
      { title: "تنس طاولة", icon: "🏓" },
    ],
  },
  {
    id: "service",
    title: "درع الخدمة العامة",
    description: "خدمة المجتمع وتنمية روح العطاء.",
    image: "/images/badges/service.png",
    items: [
      { title: "الأعمال الخيرية", icon: "🤲" },
      { title: "الخدمة المجتمعية", icon: "🧹" },
      { title: "مساندة الفئات", icon: "🤝" },
    ],
  },
  {
    id: "culture",
    title: "الدرع الثقافي",
    description: "نشر الوعي وتبادل المعرفة.",
    image: "/images/badges/cultural.png",
    items: [
      { title: "البامفلت", icon: "📰" },
      { title: "المجلات المسطحة", icon: "🗞️" },
      { title: "القراءة والمعرفة", icon: "📚" },
    ],
  },
  {
    id: "sea",
    title: "درع بحري",
    description: "الاستعداد البحري والمهارات الملاحية والبيئة البحرية.",
    image: "/images/badges/sea.png",
    items: [
      { title: "المهارات البحرية", icon: "⚓" },
      { title: "الاستكشاف البحري", icon: "🧭" },
      { title: "السلامة البحرية", icon: "🛟" },
    ],
  },
  {
    id: "environmental",
    title: "درع بيئي",
    description: "الحفاظ على البيئة وتنمية الوعي البيئي.",
    image: "/images/badges/environmental.png",
    items: [
      { title: "التشجير", icon: "🌱" },
      { title: "نظافة البيئة", icon: "♻️" },
      { title: "التوعية البيئية", icon: "🌍" },
    ],
  },
];

// --- HALL OF FAME ---
export type FameItem = {
  id: string;
  eventName: string;
  year: number;
  placement: string;
  specialAwards: string[];
  image?: string;
};

export const fameData: FameItem[] = [
  {
    id: "f1",
    eventName: "مهرجان الجوالة بجامعة عين شمس",
    year: 2023,
    placement: "المركز الأول عام",
    specialAwards: ["درع التميز الكشفي", "أفضل مخرج سمر"],
    image: "/images/hero/hero-2.jpg",
  },
  {
    id: "f2",
    eventName: "المسابقة القمية",
    year: 2022,
    placement: "المركز الثاني",
    specialAwards: ["جوال مثالي"],
    image: "/images/hero/hero-3.jpg",
  },
];

// --- SESSIONS ---
export type Session = {
  id: string;
  title: string;
  date: string;
  instructor: string;
};

export const sessionsData: Session[] = [
  { id: "s1", title: "دراسة أثر (إعداد قادة)", date: "١٥ سبتمبر ٢٠٢٤", instructor: "القائد/ عمر أحمد" },
  { id: "s2", title: "أساسيات الريادة", date: "٢٢ أكتوبر ٢٠٢٤", instructor: "القائد/ أحمد سيد" },
  { id: "s3", title: "الإسعافات الأولية", date: "٥ نوفمبر ٢٠٢٤", instructor: "د. خالد محمود" },
];
