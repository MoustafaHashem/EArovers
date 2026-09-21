import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";
import {
  getTournamentById,
  TOURNAMENTS_DATA,
} from "@/data/tournamentsData";
import {
  Trophy,
  Medal,
  Star,
  CalendarDays,
  MapPin,
  ArrowRight,
  Shield,
  Users,
  Award,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tournament = getTournamentById(id);

  if (!tournament) {
    return {
      title: "البطولة غير موجودة | عشيرة جوالة هندسة عين شمس",
    };
  }

  return {
    title: `${tournament.title} (${tournament.year}) | لوحة الشرف والبطولات`,
    description: tournament.description,
  };
}

export async function generateStaticParams() {
  return TOURNAMENTS_DATA.map((t) => ({
    id: t.id,
  }));
}

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = getTournamentById(id);

  if (!tournament) {
    notFound();
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-transparent text-foreground font-cairo overflow-x-hidden relative"
      dir="rtl"
    >
      <Navbar />

      {/* Ambient Lighting Background Blurs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-[#ffd700]/10 dark:bg-[#ffd700]/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#d4a373]/10 dark:bg-cyan-500/10 rounded-full blur-[160px]" />
      </div>

      <main className="flex-1 pt-28 sm:pt-32 pb-20 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto w-full relative z-10 space-y-12">
        {/* ================= BREADCRUMBS & BACK LINK ================= */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-black/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#64748b] dark:text-slate-300 font-medium">
            <Link
              href="/"
              className="hover:text-[#0b1a30] dark:hover:text-cyan-400 transition-colors"
            >
              الرئيسية
            </Link>
            <span>/</span>
            <Link
              href="/fame"
              className="hover:text-[#0b1a30] dark:hover:text-cyan-400 transition-colors"
            >
              لوحة الشرف
            </Link>
            <span>/</span>
            <Link
              href={`/fame/${tournament.category}`}
              className="hover:text-[#0b1a30] dark:hover:text-cyan-400 transition-colors"
            >
              {tournament.categoryName}
            </Link>
            <span>/</span>
            <span className="text-[#0b1a30] dark:text-white font-bold truncate max-w-[200px] sm:max-w-xs">
              {tournament.title}
            </span>
          </div>

          <Link
            href={`/fame/${tournament.category}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0b1a30] dark:text-cyan-300 hover:opacity-80 transition-opacity bg-white/80 dark:bg-white/5 px-4 py-2 rounded-full border border-[#d4a373]/30 dark:border-white/10 shadow-sm"
          >
            <ArrowRight className="w-4 h-4 ml-1" />
            <span>العودة لقسم {tournament.categoryName}</span>
          </Link>
        </div>

        {/* ================= HERO CHAMPIONSHIP CARD ================= */}
        <section className="relative rounded-3xl overflow-hidden glass-card honor-card shadow-2xl border border-[#d4a373]/40 dark:border-[#ffd700]/40">
          {/* Background Tournament Image */}
          <div className="relative w-full h-80 sm:h-96 md:h-[420px] overflow-hidden">
            <Image
              src={tournament.image}
              alt={tournament.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center filter saturate-125 brightness-90"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060c18] via-[#060c18]/70 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060c18]/90 via-[#060c18]/50 to-transparent" />

            {/* Floating Category Pill on Top Right */}
            <div className="absolute top-6 right-6 z-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black bg-white/20 dark:bg-black/40 text-white backdrop-blur-md border border-white/20 shadow-lg">
                <Sparkles size={14} className="text-[#ffd700]" />
                {tournament.categoryName}
              </span>
            </div>

            {/* Bottom Hero Overlay Content */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 md:p-10 z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-sm font-black bg-[#ffd700] text-[#080b10] shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                  عام {tournament.year}
                </span>
                <span className="text-xs sm:text-sm text-slate-200 font-medium flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  <CalendarDays size={14} className="text-[#ffd700]" />
                  {tournament.dateStr}
                </span>
                <span className="text-xs sm:text-sm text-slate-200 font-medium flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  <MapPin size={14} className="text-cyan-400" />
                  {tournament.location}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {tournament.title}
              </h1>
            </div>
          </div>

          {/* ================= GRAND PLACEMENT SPOTLIGHT ================= */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-amber-500/15 via-[#d4a373]/10 to-transparent dark:from-[#ffd700]/15 dark:via-yellow-500/5 dark:to-transparent border-t border-[#d4a373]/30 dark:border-[#ffd700]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-right">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#ffd700] to-amber-500 text-[#080b10] flex items-center justify-center shadow-[0_0_25px_rgba(255,215,0,0.4)] shrink-0">
                <Trophy size={36} className="text-[#080b10]" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#475569] dark:text-slate-300 block">
                  المركز والإنجاز المحقق
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1a30] dark:text-white">
                  {tournament.placement}
                </h2>
              </div>
            </div>

            {/* Quick Stats Chips */}
            {tournament.stats && (
              <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
                {tournament.stats.participantsCount && (
                  <div className="px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-black/40 border border-[#d4a373]/20 dark:border-white/10 text-center backdrop-blur-sm">
                    <div className="text-lg sm:text-xl font-black text-[#0b1a30] dark:text-[#ffd700]">
                      {tournament.stats.participantsCount}
                    </div>
                    <div className="text-[11px] text-[#64748b] dark:text-gray-400 font-semibold">
                      جوال مشارك
                    </div>
                  </div>
                )}
                {tournament.stats.competingClans && (
                  <div className="px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-black/40 border border-[#d4a373]/20 dark:border-white/10 text-center backdrop-blur-sm">
                    <div className="text-lg sm:text-xl font-black text-[#0b1a30] dark:text-cyan-400">
                      {tournament.stats.competingClans}
                    </div>
                    <div className="text-[11px] text-[#64748b] dark:text-gray-400 font-semibold">
                      عشيرة منافسة
                    </div>
                  </div>
                )}
                {tournament.stats.shieldsCount && (
                  <div className="px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-black/40 border border-[#d4a373]/20 dark:border-white/10 text-center backdrop-blur-sm">
                    <div className="text-lg sm:text-xl font-black text-[#d4a373] dark:text-amber-400">
                      {tournament.stats.shieldsCount}
                    </div>
                    <div className="text-[11px] text-[#64748b] dark:text-gray-400 font-semibold">
                      دروع وجوائز
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ================= SPECIAL AWARDS SECTION ================= */}
        {tournament.specialAwards && tournament.specialAwards.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffd700]/15 dark:bg-[#ffd700]/20 flex items-center justify-center text-[#d4a373] dark:text-[#ffd700]">
                <Medal size={22} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0b1a30] dark:text-white">
                  شارات ودروع التميز الخاصة بالبطولة
                </h3>
                <p className="text-xs sm:text-sm text-[#64748b] dark:text-gray-400">
                  الأوسمة والجوائز الفردية والجماعية التي حصدتها العشيرة في هذه البطولة
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tournament.specialAwards.map((award, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/80 dark:bg-[#0c1626]/80 border border-[#d4a373]/30 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-[#d4a373] dark:from-[#ffd700] dark:to-yellow-600 text-[#080b10] flex items-center justify-center shrink-0 shadow-sm">
                    <Star size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0b1a30] dark:text-white text-base">
                      {award}
                    </h4>
                    <span className="text-xs text-[#64748b] dark:text-slate-400">
                      وسام شرف معتمد
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= DETAILED AWARDS IF SPECIFIED ================= */}
        {tournament.awardsDetailed && tournament.awardsDetailed.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xl font-black text-[#0b1a30] dark:text-white flex items-center gap-2">
              <Award size={20} className="text-[#d4a373] dark:text-[#ffd700]" />
              <span>تفاصيل التكريمات والدروع</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tournament.awardsDetailed.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm font-bold text-[#0b1a30] dark:text-slate-200"
                >
                  <Shield size={16} className="text-[#d4a373] dark:text-cyan-400 shrink-0" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= PARTICIPATING DELEGATION (الوفد المشارك) ================= */}
        {tournament.delegation && tournament.delegation.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a373]/20 to-[#ffd700]/20 dark:from-cyan-500/20 dark:to-teal-500/20 flex items-center justify-center text-[#0b1a30] dark:text-cyan-300 shadow-sm">
                  <Users size={22} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#0b1a30] dark:text-white">
                    الوفد المشارك في البطولة
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748b] dark:text-gray-400">
                    قادة وأعضاء عشيرة الجوالة والمرشدات الذين مثلوا كلية الهندسة في هذه البطولة
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0b1a30] dark:text-cyan-300 bg-[#d4a373]/15 dark:bg-cyan-500/10 px-3 py-1 rounded-full border border-[#d4a373]/30 dark:border-cyan-400/20">
                {tournament.delegation.length} أعضاء بالوفد
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tournament.delegation.map((member, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-3.5 p-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md",
                    member.isLeader
                      ? "bg-gradient-to-r from-[#ffd700]/10 to-[#d4a373]/10 dark:from-[#ffd700]/15 dark:to-cyan-500/10 border border-[#d4a373]/40 dark:border-[#ffd700]/40 ring-1 ring-[#d4a373]/20 dark:ring-[#ffd700]/20"
                      : "bg-white/80 dark:bg-[#0c1626]/80 border border-black/5 dark:border-white/10"
                  )}
                >
                  {/* Avatar / Badge */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm",
                      member.isLeader
                        ? "bg-gradient-to-br from-[#ffd700] to-amber-500 text-[#080b10] shadow-[0_0_12px_rgba(255,215,0,0.3)]"
                        : "bg-gradient-to-br from-[#161e35] to-[#1e2746] text-white dark:from-cyan-900/60 dark:to-cyan-700/60 dark:text-cyan-200"
                    )}
                  >
                    {member.name
                      .replace(/^(القائد\s*\/|القائدة\s*\/|الجوال\s*\/|الجوالة\s*\/|الكابتن\s*\/)/, "")
                      .trim()
                      .slice(0, 2)}
                  </div>

                  {/* Member Name & Role */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-[#0b1a30] dark:text-white text-base truncate">
                        {member.name}
                      </h4>
                      {member.isLeader && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#ffd700]/25 text-[#0b1a30] dark:text-[#ffd700] shrink-0 border border-[#ffd700]/30">
                          قائد
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#64748b] dark:text-slate-300 truncate mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= TOURNAMENT STORY & DESCRIPTION ================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Overview */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-[#0c1626]/80 border border-[#d4a373]/25 dark:border-white/10 shadow-sm space-y-4 backdrop-blur-sm">
            <h3 className="text-xl font-black text-[#0b1a30] dark:text-white">
              عن البطولة والمنافسة
            </h3>
            <p className="text-[#475569] dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              {tournament.description}
            </p>
          </div>

          {/* Clan Story */}
          {tournament.clanStory && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#d4a373]/10 via-white/80 to-transparent dark:from-cyan-950/20 dark:via-[#0c1626]/80 dark:to-transparent border border-[#d4a373]/30 dark:border-cyan-500/20 shadow-sm space-y-4 backdrop-blur-sm">
              <h3 className="text-xl font-black text-[#0b1a30] dark:text-white flex items-center gap-2">
                <Sparkles size={18} className="text-[#d4a373] dark:text-cyan-400" />
                <span>ملحمة مشاركة العشيرة</span>
              </h3>
              <p className="text-[#475569] dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {tournament.clanStory}
              </p>
            </div>
          )}
        </section>

        {/* ================= TOURNAMENT PHOTO GALLERY ================= */}
        {tournament.gallery && tournament.gallery.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#0b1a30] dark:text-white">
                  توثيق ومعرض صور البطولة
                </h3>
                <p className="text-xs sm:text-sm text-[#64748b] dark:text-gray-400">
                  لقطات تخلد لحظات التتويج والعمل بروح الفريق في أرض المنافسة
                </p>
              </div>
              <span className="text-xs font-bold text-[#0b1a30] dark:text-cyan-300 bg-[#d4a373]/15 dark:bg-cyan-500/10 px-3 py-1 rounded-full border border-[#d4a373]/30 dark:border-cyan-400/20">
                {tournament.gallery.length} صور موثقة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {tournament.gallery.map((photo, i) => (
                <div
                  key={i}
                  className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#d4a373]/20 dark:border-white/10 shadow-md bg-slate-100 dark:bg-slate-800"
                >
                  <Image
                    src={photo}
                    alt={`${tournament.title} - صورة ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold">
                      {tournament.title} ({tournament.year})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= BOTTOM NAVIGATION CTA ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-black/10 dark:border-white/10">
          <Link
            href={`/fame/${tournament.category}`}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-base transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 text-center bg-gradient-to-r from-[#e0a96d] to-[#d4a373] text-[#0b1a30] dark:from-[#00f0ff] dark:to-teal-300 dark:text-[#080b10]"
          >
            استعراض باقي بطولات قسم {tournament.categoryName}
          </Link>
          <Link
            href="/fame"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-base transition-all text-center bg-white/80 dark:bg-white/5 border border-[#d4a373]/30 dark:border-white/10 text-[#0b1a30] dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
          >
            تصفح جميع الأقسام والبطولات
          </Link>
        </div>
      </main>

      <div className="w-full z-20 relative">
        <Identity />
      </div>
    </div>
  );
}
