import { FameIslands } from "@/components/home/FameIslands";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Sparkles, ChevronLeft, Award } from "lucide-react";
import { Metadata } from "next";
import { FAME_CATEGORIES } from "@/data/fameCategories";
import { TOURNAMENTS_DATA, getTournamentsByCategory } from "@/data/tournamentsData";

export const metadata: Metadata = {
  title: "لوحة الشرف والبطولات | عشيرة جوالة هندسة عين شمس",
  description: "لوحة الشرف وتاريخ بطولات وإنجازات عشيرة جوالة هندسة جامعة عين شمس عبر السنوات المختلفة.",
};

export const revalidate = 60;

export default function FamePage() {
  const totalTournaments = TOURNAMENTS_DATA.length;

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-transparent text-foreground font-cairo overflow-x-hidden relative"
      dir="rtl"
    >
      <Navbar />

      {/* Ambient Background Blurs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4a373]/10 dark:bg-cyan-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#161e35]/10 dark:bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <main className="flex-1 pt-28 sm:pt-32 pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full relative z-10 space-y-10">
        {/* ================= HERO HEADER ================= */}
        <section className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center text-[#161e35] dark:text-cyan-400 hover:opacity-80 transition-opacity font-bold text-sm sm:text-base group"
          >
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            العودة للرئيسية
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4a373]/15 dark:bg-cyan-500/10 border border-[#d4a373]/30 dark:border-cyan-400/20 text-[#0b1a30] dark:text-cyan-300 text-xs sm:text-sm font-bold shadow-sm">
                <Trophy className="w-4 h-4 text-[#d4a373] dark:text-cyan-400" />
                <span>لوحة الشرف وسجل البطولات الكشفية</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0b1a30] dark:text-white tracking-tight">
                لوحة الشرف والبطولات
              </h1>

              <p className="text-[#475569] dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                سجل تاريخي يخلّد بطولات وإنجازات عشيرة جوالة هندسة عين شمس، من
                المسابقات الوفدية والقمية إلى بطولات المهارات الكشفية، الأنشطة
                الرياضية، الفنون والأسمار، والملاحة البحرية.
              </p>
            </div>

            {/* Quick Stats Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3 self-start md:self-auto w-full md:w-auto">
              <div className="px-4 py-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 shadow-sm backdrop-blur-sm text-center">
                <div className="text-2xl font-black text-[#0b1a30] dark:text-cyan-400">
                  {totalTournaments}
                </div>
                <div className="text-xs text-[#64748b] dark:text-gray-400 font-semibold mt-0.5">
                  إجمالي البطولات
                </div>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 shadow-sm backdrop-blur-sm text-center">
                <div className="text-2xl font-black text-[#d4a373] dark:text-amber-400">
                  {FAME_CATEGORIES.length}
                </div>
                <div className="text-xs text-[#64748b] dark:text-gray-400 font-semibold mt-0.5">
                  أقسام تخصصية
                </div>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 shadow-sm backdrop-blur-sm text-center">
                <div className="text-2xl font-black text-amber-500 dark:text-[#ffd700]">
                  ١٥+
                </div>
                <div className="text-xs text-[#64748b] dark:text-gray-400 font-semibold mt-0.5">
                  دروع وجوائز
                </div>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 shadow-sm backdrop-blur-sm text-center">
                <div className="text-2xl font-black text-teal-600 dark:text-teal-400">
                  100%
                </div>
                <div className="text-xs text-[#64748b] dark:text-gray-400 font-semibold mt-0.5">
                  سجل التميز الكشفي
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= DESKTOP 3D ISLANDS CHAMPIONSHIP PLATFORM ================= */}
        {/* Shown only on laptop/desktop (md:) */}
        <section className="w-full relative py-2 hidden md:block">
          <FameIslands />
        </section>

        {/* ================= MOBILE VIEW: SLOGAN & STACKED CATEGORY CARDS ================= */}
        {/* Shown only on mobile (< md) instead of the spinning wheel */}
        <section className="md:hidden space-y-6 pt-2">
          {/* Mobile Slogan Card */}
          <div className="relative overflow-hidden rounded-3xl p-6 bg-white/80 dark:bg-[#0c1626]/85 border border-[#d4a373]/30 dark:border-white/10 shadow-lg text-center space-y-3 backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d4a373]/10 via-transparent to-transparent pointer-events-none" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4a373]/15 dark:bg-cyan-500/10 text-[#d4a373] dark:text-cyan-300 text-xs font-bold border border-[#d4a373]/25 dark:border-cyan-400/20">
              <Sparkles size={13} />
              <span>شعار بطولات العشيرة</span>
            </div>
            <h3 className="text-2xl font-black text-[#0b1a30] dark:text-white leading-snug">
              من عبدو باشا وجي بصوته
              <br />
              <span className="text-[#d4a373] dark:text-[#E0B84B]">يهز الدورة دي!!</span>
            </h3>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <h2 className="text-xl font-black text-[#0b1a30] dark:text-white flex items-center gap-2">
                <Trophy className="text-[#d4a373] dark:text-cyan-400" size={20} />
                <span>أقسام وبطولات العشيرة</span>
              </h2>
              <p className="text-xs text-[#64748b] dark:text-gray-400 mt-0.5">
                اختر القسم للاطلاع على مسابقاته وسجل إنجازاته
              </p>
            </div>
            <span className="text-xs font-bold text-[#0b1a30] dark:text-cyan-300 bg-[#d4a373]/15 dark:bg-cyan-500/10 border border-[#d4a373]/30 dark:border-cyan-400/20 px-2.5 py-1 rounded-full">
              5 أقسام
            </span>
          </div>

          {/* Stacked Cards for Mobile */}
          <div className="flex flex-col gap-4">
            {FAME_CATEGORIES.map((cat) => {
              const catTournaments = getTournamentsByCategory(cat.slug);

              return (
                <Link
                  key={cat.id}
                  href={`/fame/${cat.slug}`}
                  className="group relative flex flex-col p-5 rounded-3xl bg-white/80 dark:bg-[#0c1626]/85 border border-[#d4a373]/25 dark:border-white/10 shadow-md hover:shadow-xl active:scale-[0.99] transition-all backdrop-blur-md space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-[#d4a373]/20 dark:bg-cyan-500/20 text-[#0b1a30] dark:text-cyan-300 border border-[#d4a373]/30 dark:border-cyan-400/30">
                      قسم {cat.name}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748b] dark:text-gray-400 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full">
                      <Trophy size={13} className="text-[#d4a373] dark:text-cyan-400" />
                      <span>{catTournaments.length} بطولات</span>
                    </div>
                  </div>

                  {/* 3D Crystal Island Image */}
                  <div className="relative w-full h-40 flex items-center justify-center overflow-visible">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-black text-[#0b1a30] dark:text-white">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#475569] dark:text-gray-300 line-clamp-2 leading-relaxed mt-1.5">
                      {cat.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-bold text-[#161e35] dark:text-cyan-400">
                    <span>استعراض مسابقات القسم</span>
                    <div className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center">
                      <ChevronLeft size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <div className="w-full z-20 relative">
        <Identity />
      </div>
    </div>
  );
}
