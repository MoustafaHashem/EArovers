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
  
  media: { id: "p-media", name: "علي حسن", initials: "عل" },
  mediaAssist: { id: "p-mediaA", name: "زياد كمال", initials: "زي" },
  sec: { id: "p-sec", name: "سارة عادل", initials: "سا" },
  secAssist: { id: "p-secA", name: "مريم طارق", initials: "مر" },
  quartermaster: { id: "p-quarter", name: "محمود سعد", initials: "مح" },

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
    year: 2024,
    tiers: {
      highCouncil: {
        title: "مجلس القيادة",
        // Ordered to put Leader and Guide Leader in the center. 
        // We will force flex-nowrap in UI so they stay on one line.
        members: [
          { member: p.assistantLeader, role: "مساعد قائد العشيرة" },
          { member: p.seniorRover, role: "الرائد الأكبر", promotesTo: 2025 },
          { member: p.leader, role: "قائد العشيرة" },
          { member: p.guideLeader, role: "قائدة الجوالات" },
          { member: p.seniorGuide, role: "الرائدة الكبرى" },
        ],
      },
      auxiliary: {
        title: "الهيكل المعاون",
        members: [
          { 
            member: p.media, role: "قائد الميديا",
            subordinates: [{ member: p.mediaAssist, role: "مساعد الميديا" }]
          },
          { 
            member: p.sec, role: "قائد السكرتارية",
            subordinates: [{ member: p.secAssist, role: "مساعد السكرتارية" }]
          },
          { 
            member: p.quartermaster, role: "أمين العهدة" 
            // No assistant
          },
        ],
      },
      management: {
        title: "مجلس الإدارة",
        members: [
          { 
            member: p.rahtLeader1, role: "رائد رهط الفايكنج", promotesTo: 2026,
            subordinates: [{ member: p.rahtDeputy1, role: "وكيل الرهط" }]
          },
          { 
            member: p.rahtLeader2, role: "رائد رهط الفرسان",
            subordinates: [{ member: p.rahtDeputy2, role: "وكيل الرهط" }]
          },
        ]
      },
      base: {
        title: "قاعدة العشيرة",
        members: [
          { member: p.rover1, role: "جوال (فايكنج)" },
          { member: p.candidate1, role: "مرشح (فايكنج)" },
          { member: p.rover2, role: "جوال (فرسان)" },
          { member: p.candidate2, role: "مرشح (فرسان)" },
        ]
      },
    },
  },
  {
    year: 2025,
    tiers: {
      highCouncil: {
        title: "مجلس القيادة",
        members: [
          { member: p.guideLeader, role: "مساعد قائد العشيرة" },
          { member: p.rahtLeader1, role: "الرائد الأكبر", promotesTo: 2026 },
          { member: p.seniorRover, role: "قائد العشيرة" },
          { member: p.seniorGuide, role: "قائدة الجوالات" },
          { member: p.sec, role: "الرائدة الكبرى" },
        ],
      },
      auxiliary: {
        title: "الهيكل المعاون",
        members: [
          { member: p.quartermaster, role: "قائد الميديا" },
          { member: p.media, role: "أمين العهدة" },
        ],
      },
      management: {
        title: "مجلس الإدارة",
        members: [
          { 
            member: p.rahtDeputy1, role: "رائد الرهط (فايكنج)",
            subordinates: [{ member: p.rover1, role: "وكيل الرهط" }]
          },
          { 
            member: p.rahtLeader2, role: "رائد الرهط (فرسان)",
            subordinates: [{ member: p.candidate2, role: "وكيل الرهط" }]
          },
        ]
      },
      base: {
        title: "قاعدة العشيرة",
        members: [
          { member: p.candidate1, role: "جوال" }
        ]
      }
    },
  },
  {
    year: 2026,
    tiers: {
      highCouncil: {
        title: "مجلس القيادة",
        members: [
          { member: p.media, role: "مساعد قائد العشيرة" },
          { member: p.rahtDeputy1, role: "الرائد الأكبر" },
          { member: p.rahtLeader1, role: "قائد العشيرة" },
          { member: p.secAssist, role: "قائدة الجوالات" },
          { member: p.rover1, role: "الرائدة الكبرى" },
        ],
      },
      auxiliary: {
        title: "الهيكل المعاون",
        members: [
          { 
            member: p.rover2, role: "قائد الميديا",
            subordinates: [{ member: p.candidate1, role: "مساعد الميديا" }]
          },
          { 
            member: p.candidate2, role: "قائد السكرتارية",
            subordinates: [{ member: p.mediaAssist, role: "مساعد السكرتارية" }]
          },
          { 
            member: p.sec, role: "أمين العهدة" 
          },
        ],
      },
      management: {
        title: "مجلس الإدارة",
        members: [
          { 
            member: p.rahtDeputy2, role: "رائد رهط الفايكنج",
            subordinates: [{ member: p.assistantLeader, role: "وكيل الرهط" }]
          },
          { 
            member: p.quartermaster, role: "رائد رهط الفرسان",
            subordinates: [{ member: p.seniorGuide, role: "وكيل الرهط" }]
          },
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
  items: { title: string; desc: string; icon: string }[];
};

export const shieldsData: ShieldCategory[] = [
  {
    id: "scout",
    title: "الدرع الكشفي",
    description: "أساس الحركة الكشفية، مهارات البقاء، والريادة.",
    items: [
      { title: "الريادة والكادجات", desc: "بناء الهياكل الخشبية بالحبال.", icon: "🏕️" },
      { title: "العقد والربطات", desc: "أساسيات التعامل مع الحبال.", icon: "🪢" },
      { title: "حفلات السمر", desc: "الكشفي، الفردي، والتراث.", icon: "🔥" },
    ],
  },
  {
    id: "art",
    title: "الدرع الفني",
    description: "تنمية المواهب الفنية والإبداعية لدى الجوالين.",
    items: [
      { title: "أركيت", desc: "النحت وتفريغ الأخشاب.", icon: "🪵" },
      { title: "سترنج آرت", desc: "الرسم بالمسامير والخيوط.", icon: "🧵" },
      { title: "حرق على الجلد", desc: "النقش على الجلود.", icon: "🔥" },
    ],
  },
  {
    id: "sports",
    title: "الدرع الرياضي",
    description: "بناء الجسم السليم وتعزيز الروح الرياضية.",
    items: [
      { title: "كرة قدم", desc: "دوريات العشيرة.", icon: "⚽" },
      { title: "كرة سلة", desc: "الرميات الثلاثية والعمل الجماعي.", icon: "🏀" },
      { title: "كرة طائرة", desc: "بطولات الطائرة الشاطئية.", icon: "🏐" },
    ],
  },
  {
    id: "service",
    title: "درع الخدمة العامة",
    description: "خدمة المجتمع وتنمية روح العطاء.",
    items: [
      { title: "الأعمال الخيرية", desc: "توزيع الوجبات والملابس.", icon: "🤲" },
      { title: "الخدمة المجتمعية", desc: "تنظيف وتجميل الكلية.", icon: "🧹" },
    ],
  },
  {
    id: "culture",
    title: "الدرع الثقافي",
    description: "نشر الوعي وتبادل المعرفة.",
    items: [
      { title: "البامفلت", desc: "تصميم ونشر المطويات.", icon: "📰" },
      { title: "المجلات المسطحة", desc: "مجلات حائط ثقافية.", icon: "🗞️" },
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
};

export const fameData: FameItem[] = [
  {
    id: "f1",
    eventName: "مهرجان الجوالة بجامعة عين شمس",
    year: 2023,
    placement: "المركز الأول عام",
    specialAwards: ["درع التميز الكشفي", "أفضل مخرج سمر"],
  },
  {
    id: "f2",
    eventName: "المسابقة القمية",
    year: 2022,
    placement: "المركز الثاني",
    specialAwards: ["جوال مثالي"],
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
