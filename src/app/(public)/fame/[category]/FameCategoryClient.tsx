"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  Medal,
  Star,
  MapPin,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  Search,
  RefreshCw,
} from "lucide-react";
import { FameCategory, FAME_CATEGORIES } from "@/data/fameCategories";
import { TournamentItem } from "@/data/tournamentsData";
import { cn } from "@/lib/utils";

interface FameCategoryClientProps {
  currentCategory: FameCategory;
  tournaments: TournamentItem[];
  allTournamentsCountMap: Record<string, number>;
}

export function FameCategoryClient({
  currentCategory,
  tournaments,
  allTournamentsCountMap,
}: FameCategoryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");

  // Get available years in this category
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(tournaments.map((t) => t.year))).sort(
      (a, b) => b - a
    );
    return years;
  }, [tournaments]);

  // Filter tournaments by year & search
  const filteredTournaments = useMemo(() => {
    return tournaments.filter((item) => {
      // Year filter
      if (yearFilter !== "all" && item.year.toString() !== yearFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(q);
        const locMatch = item.location?.toLowerCase().includes(q) || false;
        const placementMatch = item.placement.toLowerCase().includes(q);
        const awardsMatch = item.specialAwards.some((a) =>
          a.toLowerCase().includes(q)
        );
        const yearMatch = item.year.toString().includes(q);
        if (
          !titleMatch &&
          !locMatch &&
          !placementMatch &&
          !awardsMatch &&
          !yearMatch
        ) {
          return false;
        }
      }

      return true;
    });
  }, [tournaments, yearFilter, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setYearFilter("all");
  };

  return (
    <div className="w-full space-y-10">
      {/* ================= BREADCRUMBS & CATEGORY SWITCHER ================= */}
      <div className="space-y-4">
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
              لوحة الشرف والبطولات
            </Link>
            <span>/</span>
            <span className="text-[#0b1a30] dark:text-white font-bold">
              قسم {currentCategory.name}
            </span>
          </div>

          <Link
            href="/fame"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0b1a30] dark:text-cyan-300 hover:opacity-80 transition-opacity bg-white/70 dark:bg-white/5 px-4 py-2 rounded-full border border-[#d4a373]/25 dark:border-white/10 shadow-sm"
          >
            <ArrowRight className="w-4 h-4 ml-1" />
            <span>جميع أقسام البطولات</span>
          </Link>
        </div>

        {/* Quick Category Switcher Tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {FAME_CATEGORIES.map((cat) => {
            const isActive = cat.slug === currentCategory.slug;
            const count = allTournamentsCountMap[cat.slug] || 0;

            return (
              <Link
                key={cat.id}
                href={`/fame/${cat.slug}`}
                className={cn(
                  "relative flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 select-none cursor-pointer",
                  isActive
                    ? "bg-gradient-to-r from-[#161e35] to-[#1e2746] dark:from-cyan-400 dark:to-teal-300 text-white dark:text-[#080b10] shadow-md scale-[1.02]"
                    : "bg-white/80 dark:bg-white/5 text-[#475569] dark:text-gray-300 border border-[#d4a373]/25 dark:border-white/10 hover:border-[#161e35] dark:hover:border-cyan-400 hover:text-[#0b1a30] dark:hover:text-white"
                )}
              >
                <span>{cat.name}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                    isActive
                      ? "bg-white/20 dark:bg-black/20 text-white dark:text-[#080b10]"
                      : "bg-black/5 dark:bg-white/10 text-[#64748b] dark:text-gray-400"
                  )}
                >
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ================= CATEGORY HERO HEADER ================= */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-white/80 dark:bg-[#0c1626]/85 border border-[#d4a373]/30 dark:border-white/10 shadow-lg backdrop-blur-md">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="space-y-4 max-w-2xl text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a373]/15 dark:bg-cyan-500/10 text-[#d4a373] dark:text-cyan-300 text-xs font-bold border border-[#d4a373]/30 dark:border-cyan-400/20">
              <Sparkles size={14} />
              <span>بطولات وإنجازات قسم {currentCategory.name}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0b1a30] dark:text-white tracking-tight leading-tight">
              {currentCategory.title}
            </h1>

            <p className="text-[#475569] dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              {currentCategory.description}
            </p>

            {/* Quick Metrics */}
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs sm:text-sm font-bold text-[#0b1a30] dark:text-cyan-300">
                <Trophy size={16} className="text-[#d4a373] dark:text-cyan-400" />
                <span>إجمالي البطولات المسجلة: {tournaments.length}</span>
              </div>
            </div>
          </div>

          {/* Category Graphic */}
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 flex-shrink-0 flex items-center justify-center">
            <Image
              src={currentCategory.image}
              alt={currentCategory.title}
              fill
              sizes="(max-width: 768px) 160px, 210px"
              className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_15px_30px_rgba(0,240,255,0.2)] hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </section>

      {/* ================= SEARCH & YEAR FILTER ================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b] dark:text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم البطولة، الإنجاز، أو المكان..."
              className="w-full bg-white/80 dark:bg-[#0c1626]/85 border border-[#d4a373]/25 dark:border-white/10 rounded-2xl pr-11 pl-4 py-3 text-sm text-[#0b1a30] dark:text-white placeholder-[#64748b] dark:placeholder-gray-400 focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#64748b] hover:text-[#0b1a30] dark:text-gray-400 dark:hover:text-white px-2 py-1 rounded-md bg-black/5 dark:bg-white/10"
              >
                مسح
              </button>
            )}
          </div>

          {/* Year Filter Pills */}
          {availableYears.length > 1 && (
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 self-stretch sm:self-auto overflow-x-auto">
              <button
                onClick={() => setYearFilter("all")}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0",
                  yearFilter === "all"
                    ? "bg-white dark:bg-cyan-500/20 text-[#0b1a30] dark:text-cyan-300 shadow-sm border border-black/5 dark:border-cyan-400/30"
                    : "text-[#64748b] dark:text-gray-400 hover:text-[#0b1a30] dark:hover:text-white"
                )}
              >
                جميع السنوات
              </button>
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setYearFilter(year.toString())}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0",
                    yearFilter === year.toString()
                      ? "bg-white dark:bg-cyan-500/20 text-[#0b1a30] dark:text-cyan-300 shadow-sm border border-black/5 dark:border-cyan-400/30"
                      : "text-[#64748b] dark:text-gray-400 hover:text-[#0b1a30] dark:hover:text-white"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Counter & Reset */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-[#64748b] dark:text-gray-400 px-2 font-medium">
          <span>
            عرض <strong className="text-[#0b1a30] dark:text-white">{filteredTournaments.length}</strong> من أصل{" "}
            {tournaments.length} بطولات مسجلة في هذا القسم
          </span>
          {(searchQuery || yearFilter !== "all") && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-[#161e35] dark:text-cyan-400 hover:underline font-bold cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>إعادة ضبط الفلاتر</span>
            </button>
          )}
        </div>
      </section>

      {/* ================= TOURNAMENTS LIST (MATCHING HOMEPAGE DESIGN) ================= */}
      <section className="pb-12 space-y-6">
        {filteredTournaments.length === 0 ? (
          <div className="rounded-3xl bg-white/70 dark:bg-white/5 border border-dashed border-[#d4a373]/30 dark:border-white/10 p-12 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#d4a373]/15 dark:bg-cyan-500/10 flex items-center justify-center text-[#d4a373] dark:text-cyan-400">
              <Trophy size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#0b1a30] dark:text-white">
              لم يتم العثور على بطولات مطابقة
            </h3>
            <p className="text-[#64748b] dark:text-gray-400 text-sm max-w-md">
              جرب تغيير كلمات البحث أو إعادة ضبط الفلاتر للاطلاع على كافة البطولات المسجلة.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#161e35] to-[#1e2746] dark:from-cyan-400 dark:to-teal-300 text-white dark:text-[#080b10] font-bold text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              عرض جميع بطولات القسم
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTournaments.map((tournament, idx) => (
                <motion.div
                  key={tournament.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(idx * 0.05, 0.3),
                  }}
                >
                  <Link
                    href={`/fame/tournaments/${tournament.id}`}
                    className="block glass-card honor-card p-6 md:p-7 rounded-2xl hover:-translate-x-2 transition-all duration-500 relative overflow-hidden group cursor-pointer"
                  >
                    {/* Background Image Layer */}
                    {tournament.image && (
                      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <Image
                          src={tournament.image}
                          alt={tournament.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 900px"
                          className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out opacity-30 dark:opacity-35 group-hover:opacity-45 dark:group-hover:opacity-50 filter saturate-125 brightness-95"
                        />
                        {/* Gradients for high contrast legibility */}
                        <div className="absolute inset-0 bg-gradient-to-l from-white/95 via-white/80 to-white/50 dark:from-[#060c18]/95 dark:via-[#081324]/85 dark:to-[#0b1a32]/50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent dark:from-[#060c18]/95 dark:via-transparent dark:to-transparent" />
                      </div>
                    )}

                    {/* Foreground Content */}
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-5 flex-col md:flex-row gap-4">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-[#0b1a30] dark:text-white mb-2 drop-shadow-sm group-hover:text-[#d4a373] dark:group-hover:text-cyan-300 transition-colors">
                            {tournament.title}
                          </h3>
                          <div className="flex items-center flex-wrap gap-2.5">
                            <div className="inline-flex items-center gap-2 bg-[#d4a373]/15 text-[#0b1a30] border border-[#d4a373]/30 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30 px-3.5 py-1 rounded-full text-sm font-bold backdrop-blur-md">
                              <span>{tournament.year}</span>
                            </div>
                            <span className="text-xs text-[#64748b] dark:text-slate-300 flex items-center gap-1">
                              <MapPin
                                size={13}
                                className="text-[#d4a373] dark:text-cyan-400 shrink-0"
                              />
                              {tournament.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end md:self-start">
                          <div className="bg-gradient-to-r from-amber-400 to-[#d4a373] text-[#0b1a30] dark:from-yellow-400 dark:to-amber-500 dark:text-[#080b10] font-black px-4 py-2 rounded-lg shadow-md dark:shadow-[0_0_18px_rgba(255,215,0,0.35)] flex items-center gap-2 backdrop-blur-sm">
                            <Medal size={20} />
                            <span>{tournament.placement}</span>
                          </div>

                          <div className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#0b1a30] dark:text-white group-hover:bg-[#d4a373] dark:group-hover:bg-cyan-400 group-hover:text-white dark:group-hover:text-[#080b10] group-hover:-translate-x-1 transition-all shadow-sm">
                            <ChevronLeft size={18} />
                          </div>
                        </div>
                      </div>

                      {tournament.specialAwards.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">
                          <h4 className="text-[#475569] dark:text-slate-300 mb-3 text-sm font-semibold">
                            شارات ودروع التميز الخاصة:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {tournament.specialAwards.map((award, i) => (
                              <span
                                key={i}
                                className="flex items-center gap-1.5 bg-white/70 border border-black/10 text-[#334155] dark:bg-black/40 dark:border-white/15 dark:text-slate-200 px-3 py-1.5 rounded-md text-sm backdrop-blur-md shadow-sm"
                              >
                                <Star
                                  size={14}
                                  className="text-amber-500 dark:text-[#00f0ff]"
                                />
                                {award}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
