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
    description: "أساس الحركة الكشفية، مهارات البقاء، الريادة، والمسابقات الكشفية.",
    image: "/images/badges/scout.png",
    items: [
      { title: "بناء أرض كشفية والتخييم", desc: "تأسيس الأرض الكشفية والتخييم وتجهيز المعسكر", icon: "⛺" },
      { title: "الريادة والكادجات", desc: "كادج ريادة وكادج متعدد الاستخدامات (بوابة، برج، جسر)", icon: "🪵" },
      { title: "العقد والربطات", desc: "أنواع الحبال والأخشاب وأساسيات الربط", icon: "🪢" },
      { title: "الرحلات الخلوية والهايكنج", desc: "رحلات خلوية، اتجاهات، وهايكنج", icon: "🧭" },
      { title: "الطهي الخلوي", desc: "مهارات الطهي وطرق إعداد الطعام في الخلاء", icon: "🍳" },
      { title: "القياسات والارتفاعات ورفع الأثر", desc: "تحديد القياسات، حساب الارتفاعات، ورفع الأثر", icon: "📏" },
      { title: "الألعاب والمسابقات الكشفية", desc: "رمي الطوق، رمي الدقماق، شد الحبل، والقبقاب الكشفي", icon: "🎯" },
      { title: "حفلات السمر والعروض الكشفية", desc: "إشعال النيران، عروض السمر، ومسابقات هيئة التحكيم", icon: "🔥" },
      { title: "المجلات الأرضية", desc: "تصميم وإعداد المجلات الأرضية الكشفية", icon: "🗞️" },
    ],
  },
 {
    id: "religious",
    title: "الدرع الديني",
    description: "الأنشطة والمسابقات الدينية، حفظ القرآن، والأحاديث الشريفة.",
    image: "/images/badges/religious.png",
    items: [
      { title: "حفظ وتسميع قرآن بالتجويد", desc: "مسابقات حفظ وتلاوة القرآن الكريم بأحكام التجويد", icon: "📖" },
      { title: "أحاديث نبوية", desc: "حفظ وتسميع الأحاديث الشريفة", icon: "🕌" },
      { title: "عروض دينية عن الشخصيات", desc: "تقديم عروض مسرحية أو تقديمية عن الشخصيات الدينية والتاريخية", icon: "✨" },
      { title: "تفسير قرآن وأحاديث", desc: "دراسة وتفسير معاني الآيات والأحاديث", icon: "💡" },
      { title: "حلقات ذكر", desc: "إقامة حلقات الذكر والابتهالات الدينية", icon: "📿" },
    ],
  },
  {
    id: "scientific",
    title: "الدرع العلمي",
    description: "الأنشطة، التجارب، والعروض العلمية والابتكارية.",
    image: "/images/badges/scientific.png",
    items: [
      { title: "عروض وتجربة علمية", desc: "تقديم العروض والتجارب العلمية التفاعلية", icon: "🔬" },
      { title: "تجارب ونظريات علمية", desc: "استعراض ومناقشة النظريات والتجارب التطبيقية", icon: "🧪" },
    ],
  },
  {
    id: "art",
    title: "الدرع الفني",
    description: "تنمية المواهب الفنية والإبداعية لدى الجوالين.",
    image: "/images/badges/artistic.png",
    items: [
      { title: "قطعة فنية ليها استخدام", desc: "تصميم وتنفيذ قطع فنية ذات فائدة عملية", icon: "🛠️" },
      { title: "السمر", desc: "أعمال فنية مرتبطة بحفلات وعروض السمر", icon: "🎭" },
      { title: "ملصق فني", desc: "تصميم الملصقات الفنية الكشفية", icon: "🎨" },
      { title: "إعادة التدوير", desc: "تحويل المخلفات إلى أعمال فنية مفيدة", icon: "♻️" },
      { title: "رسم على الزجاج ريليف", desc: "فن الرسم والتجسيم على الزجاج", icon: "🖼️" },
      { title: "حفر على المرايا", desc: "مهارات الحفر الفني على المرايا والأسطح", icon: "🪞" },
      { title: "أركيت", desc: "أشغال الأركيت وتقطيع الخشب الفني", icon: "🪵" },
      { title: "سترنج آرت", desc: "فن خيوط المسامير واللوحات البصرية", icon: "🧵" },
      { title: "حرق على الجلد", desc: "الرسم والحرق الفني على الجلود", icon: "🔥" },
    ],
  },
  {
    id: "sports",
    title: "الدرع الرياضي",
    description: "الأنشطة الرياضية، المنافسات، والألعاب الكشفية البدنية والفردية.",
    image: "/images/badges/sports.png",
    items: [
      { title: "ألعاب كشفية", desc: "رمي الدقماق، الطوق، والتحرك بالقبقاب الكشفي", icon: "🏃‍♂️" },
      { title: "كرة قدم للجوالين", desc: "مباريات كرة القدم وضربات الجزاء", icon: "⚽" },
      { title: "كرة طائرة", desc: "منافسات وتدريبات كرة الطائرة", icon: "🏐" },
      { title: "كرة يد", desc: "مباريات وفعاليات كرة اليد", icon: "🤾‍♂️" },
      { title: "جري تتابع وفردي", desc: "سباقات الجري الفردية وتتابع الفرق", icon: "🏃‍♀️" },
      { title: "بينج بونج", desc: "بطولات تنس الطاولة (بينج بونج)", icon: "🏓" },
      { title: "شطرنج", desc: "منافسات ألعاب الذكاء والتفكير الشطرنجي", icon: "♟️" },
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
    description: "نشر الوعي وتبادل المعرفة والأنشطة الثقافية والفكرية.",
    image: "/images/badges/cultural.png",
    items: [
      { title: "مجلة مسطحه", desc: "تصميم وإعداد المجلات المسطحة الثقافية", icon: "📰" },
      { title: "مجله الحائط", desc: "إعداد وتصميم لوحات المجلات الحائطية", icon: "🗞️" },
      { title: "بامفلت", desc: "تصميم النشرات التعريفية والمطويات (بامفلت)", icon: "📄" },
      { title: "بحث", desc: "إعداد الأبحاث والدراسات الثقافية والعلمية", icon: "🔍" },
      { title: "ورق عمل", desc: "كتابة وإعداد أوراق العمل والمقترحات", icon: "📝" },
      { title: "تلخيص كتاب", desc: "قراءة وتلخيص الكتب والمراجع المختلفة", icon: "📚" },
      { title: "نشره مصوره", desc: "تصميم وإعداد النشرات المصورة التوعوية", icon: "🖼️" },
      { title: "عروض", desc: "تقديم العروض التقديمية والأنشطة الإلقائية", icon: "📊" },
    ],
  },
  {
    id: "sea",
    title: "الدرع البحري",
    description: "الاستعداد البحري والمهارات الملاحية والرياضات المائية.",
    image: "/images/badges/sea.png",
    items: [
      { title: "تجديف عشاري", desc: "مهارات التجديف الجماعي والعشاري", icon: "🛶" },
      { title: "تجديف كياك", desc: "رياضة ومهارات تجديف قوارب الكياك", icon: "🚣‍♂️" },
      { title: "أنشطة مائية", desc: "الفعاليات والأنشطة المختلفة داخل المياه", icon: "🌊" },
      { title: "تجديف وما يتطلبه من سيشن", desc: "التدريبات العملية والسيشنز الخاصة بمهارات التجديف", icon: "⚓" },
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