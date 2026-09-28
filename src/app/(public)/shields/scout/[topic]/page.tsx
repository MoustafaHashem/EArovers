"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  Wrench,
  BookOpen,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Hammer,
} from "lucide-react";

// بيانات المناهج والمواضيع مع الصور الخاصة بكل موضوع
const TOPICS_DATA: Record<
  string,
  {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    description: string;
    images: { src: string; alt: string }[];
    sections: { title: string; desc: string; items: string[] }[];
    rules: string[];
  }
> = {
  pioneering: {
    title: "الريادة والكادجات الميدانية",
    subtitle:
      "فن تشييد المنشآت الهيكلية الخشبية باستخدام الحبال والعصي الكشفية دون أدوات معدنية.",
    icon: <Wrench size={22} />,
    description:
      "تعتمد الريادة الكشفية على التفكير الهندسي والعمل الجماعي لتأسيس المخيمات الكشفية وإقامة الأبراج والجسور.",
    images: [
      { src: "/images/pioneering-1.jpg", alt: "أبراج المراقبة الكشفية" },
      { src: "/images/pioneering-2.jpg", alt: "الجسور المعلقة بالحبال" },
      { src: "/images/pioneering-3.jpg", alt: "بناء وتشييد الكادجات" },
      { src: "/images/pioneering-4.jpg", alt: "تطبيقات المطبخ الخلوي" },
    ],
    sections: [
      {
        title: "1. أبراج المراقبة والإشارة",
        desc: "تُبنى الأبراج للاستكشاف وتأمين المخيمات وتعتمد على دقة توزيع الأحمال والربطات المربعة.",
        items: [
          "البرج المربع: يتكون من 4 قواعد رئيسية مربوطة بربطات مربعة متينة.",
          "البرج المثلث (القائم بذاته): يمتاز بسرعة التشييد والثبات الميكانيكي دون الحاجة لربط أرضي معقد.",
        ],
      },
      {
        title: "2. الجسور الكشفية والعبور",
        desc: "تستخدم لتخطي الموانع المائية والمرتفعات أثناء المخيمات والرحلات الخلوية.",
        items: [
          "جسر الحبل الواحد: يعتمد على حبل رئيسي مشدود بعقدة الثبات المشدودة للنقل السريع.",
          "الجسر المعلق الخشبي: هيكل خشبي كامل يدعمه حبال تعليق للتنقل الجماعي الآمن.",
        ],
      },
    ],
    rules: [
      "اختبر متانة الحبال وتأكد من عدم وجود تآكل قبل البدء بالرفع.",
      "تأكد من إحكام الربطة المربعة والربطة القطرية على الأخشاب الرئيسية.",
      "ارتداء قفازات العمل الميداني لحماية اليدين أثناء شد الحبال.",
    ],
  },
  knots: {
    title: "العقد والربطات الكشفية",
    subtitle: "الأساس المتين لكافة أعمال الريادة وتأمين الحبال والمخيمات.",
    icon: <BookOpen size={22} />,
    description:
      "مهارة استخدام الحبال وإتقان العقد والربطات الكشفية المختلفة لربط الأخشاب وسحب الأثقال.",
    images: [
      { src: "/images/knots-1.jpg", alt: "العقد الأساسية وتطبيقاتها" },
      { src: "/images/knots-2.jpg", alt: "الربطات الميدانية المربعة والقطرية" },
      { src: "/images/knots-3.jpg", alt: "اللفات والدورات المتقدمة" },
      { src: "/images/knots-4.jpg", alt: "استخدام الحبال في الإنقاذ" },
    ],
    sections: [
      {
        title: "1. العقد الأساسية (Knots)",
        desc: "تُستخدم لربط حبل بآخر أو لصنع حلقة ثابتة لا تنزلق.",
        items: [
          "عقدة الثبات (Bowline): ملكة العقد الكشفية، تستخدم في عمليات الإنقاذ ولا تنزلق تحت الضغط.",
          "العقدة الأفقية (Reef Knot): لربط حبلين من نفس السمك بسرعة وسهولة.",
        ],
      },
      {
        title: "2. الربطات الميدانية (Lashings)",
        desc: "تُستخدم لربط عصيين أو خشبين معاً بزوايا مختلفة.",
        items: [
          "الربطة المربعة (Square Lashing): لربط خشبين يتقاطعان بزاوية قائمة 90 درجة.",
          "الربطة القطرية (Diagonal Lashing): لمنع تباعد الأخشاب المتقاطعة بغير زاوية قائمة.",
        ],
      },
    ],
    rules: [
      "اختر سمك الحبل المناسب لنوع العقدة والوزن المراد تحمله.",
      "قم بإنهاء كل ربطة بدورة ختامية وتثبيت آمن لمنع انفكاكها.",
      "تأكد من العناية بالحبال وتخزينها بشكل جاف لحمايتها من التآكل.",
    ],
  },
  navigation: {
    title: "الأنشطة الخلوية والاتجاهات",
    subtitle: "استكشاف الطبيعة والملاحة بواسطة الخريطة والبوصلة والرموز الكشفية.",
    icon: <Compass size={22} />,
    description:
      "مجموعة المهارات الخلوية الخاصة بتحديد المسارات والقراءة الطبوغرافية والتتبع في الرحلات الاستكشافية.",
    images: [
      { src: "/images/nav-1.jpg", alt: "قراءة الخرائط الطبوغرافية" },
      { src: "/images/nav-2.jpg", alt: "تحديد الاتجاهات بالبوصلة" },
      { src: "/images/nav-3.jpg", alt: "علامات ورموز السير الخلوي" },
      { src: "/images/nav-4.jpg", alt: "رحلات الهايكنج والمخيّمات" },
    ],
    sections: [
      {
        title: "1. البوصلة والخرائط الطبوغرافية",
        desc: "معرفة الاتجاهات الجغرافية وقراءة خطوط الكنتور وتحديد الموقع.",
        items: [
          "تحديد الشمال المغناطيسي: ضبط الخريطة مع البوصلة لتحديد المسار الصحيح.",
          "خطوط الارتفاع (الكنتور): فهم تضاريس الأرض من المرتفعات والوديان من الخريطة.",
        ],
      },
      {
        title: "2. التتبع ورموز السير الخلوي",
        desc: "علامات ميدانية يتم وضعها للأفرع والطلائع للوصول للهدف أثناء الرحلات الخلوية.",
        items: [
          "علامات الطريق: استخدام الأحجار والعصي لرسم إشارات (اتبع هذا الاتجاه / خطر / عُد).",
          "تقارير الرحلة الخلوية: توثيق المسافات والمعالم والزوايا أثناء الهايكنج.",
        ],
      },
    ],
    rules: [
      "اصطحب دائماً بوصلة وخريطة للمنطقة أثناء الرحلات الخلوية.",
      "تأكد من متابعة علامات السير الكشفية وحماية البيئة أثناء الاستكشاف.",
      "التزام الطلائع بالمسار المعتمد وإبلاغ القائد عند وجود أي تغيير.",
    ],
  },
};

export default function ScoutTopicPage() {
  const params = useParams();
  const router = useRouter();
  const topicKey = (params?.topic as string) || "pioneering";

  const topic = TOPICS_DATA[topicKey] || TOPICS_DATA["pioneering"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 rtl text-right">
      {/* زر العودة */}
      <div>
        <button
          onClick={() => router.push("/shields?id=scout")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#161e35] dark:text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          <ArrowRight size={18} />
          <span>العودة إلى الدرع الكشفي</span>
        </button>
      </div>

      {/* عنوان الصفحة والمحتوى الرئيسي */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-[#b07d4b] dark:text-cyan-400 font-bold text-sm">
          {topic.icon}
          <span>الدرع الكشفي • المعارف والمهارات الميدانية</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0b1a30] dark:text-white">
          {topic.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          {topic.subtitle}
        </p>
      </div>

      {/* ================= معرض الصور الأربعة المطور (4 Photo Grid) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[380px] sm:h-[420px] rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl bg-black/5 dark:bg-white/5 p-2">
        {/* الصورة الرئيسية الكبيرة */}
        <div className="md:col-span-2 relative h-full rounded-2xl overflow-hidden group">
          <Image
            src={topic.images[0].src}
            alt={topic.images[0].alt}
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
            <span className="text-white text-sm font-bold">{topic.images[0].alt}</span>
          </div>
        </div>

        {/* الصورة المتوسطة */}
        <div className="hidden md:block relative h-full rounded-2xl overflow-hidden group">
          <Image
            src={topic.images[1].src}
            alt={topic.images[1].alt}
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
            <span className="text-white text-xs font-semibold">{topic.images[1].alt}</span>
          </div>
        </div>

        {/* الصورتان الصغيرتان جهة اليمين */}
        <div className="hidden md:grid grid-rows-2 gap-3 h-full">
          <div className="relative h-full rounded-2xl overflow-hidden group">
            <Image
              src={topic.images[2].src}
              alt={topic.images[2].alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
              <span className="text-white text-xs font-semibold">{topic.images[2].alt}</span>
            </div>
          </div>
          <div className="relative h-full rounded-2xl overflow-hidden group">
            <Image
              src={topic.images[3].src}
              alt={topic.images[3].alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
              <span className="text-white text-xs font-semibold">{topic.images[3].alt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= التفاصيل والمعلومات ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
        {/* القسم الأيمن: الأقسام التفصيلية */}
        <div className="lg:col-span-2 space-y-6">
          {topic.sections.map((sec, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-4"
            >
              <div className="flex items-center gap-3 text-[#b07d4b] dark:text-cyan-400 font-bold text-lg border-b border-black/10 dark:border-white/10 pb-3">
                <Hammer size={20} />
                <h3>{sec.title}</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {sec.desc}
              </p>
              <ul className="space-y-3 text-sm text-gray-800 dark:text-gray-200">
                {sec.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5 flex items-start gap-2"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-amber-500 dark:text-cyan-400 flex-shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* الشريط الجانبي: القواعد والإرشادات */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-[#d4a373]/30 dark:border-cyan-500/30 space-y-4 bg-gradient-to-br from-[#d4a373]/10 to-transparent dark:from-cyan-950/20">
            <div className="flex items-center gap-2 text-[#0b1a30] dark:text-cyan-300 font-bold text-base border-b border-black/10 dark:border-white/10 pb-3">
              <ShieldCheck size={20} />
              <span>قواعد الأمان والسلامة</span>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {topic.rules.map((rule, rIdx) => (
                <li key={rIdx} className="flex items-start gap-1.5">
                  <span className="text-[#b07d4b] dark:text-cyan-400 font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}