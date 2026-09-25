"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarRange, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";
import { ShagaraSection } from "./ShagaraSection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ShagaraClient({ clanData }: { clanData: any[] }) {
  const years = Array.from(new Set(clanData.map((d) => d.year.toString()))).sort((a, b) => Number(b) - Number(a));
  const defaultYear = years.length > 0 ? years[0] : new Date().getFullYear().toString();

  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const currentData = clanData.find((d) => d.year.toString() === selectedYear);

  const shell = (
    <>
      <Navbar />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-12%] left-[-10%] w-[52%] h-[52%] bg-[#d4a373]/10 dark:bg-cyan-500/10 rounded-full blur-[170px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[52%] h-[52%] bg-[#161e35]/10 dark:bg-blue-600/10 rounded-full blur-[170px]" />
      </div>

      <main className="flex-1 pt-32 pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full relative z-10" dir="rtl">
        <div className="max-w-5xl mx-auto space-y-10">
          <Link
            href="/"
            className="inline-flex items-center text-[#161e35] dark:text-cyan-400 hover:opacity-80 transition-colors font-bold text-sm sm:text-base group"
          >
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            العودة للرئيسية
          </Link>

          <section className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4a373]/15 dark:bg-cyan-500/10 border border-[#d4a373]/30 dark:border-cyan-400/20 text-[#0b1a30] dark:text-cyan-300 text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-[#d4a373] dark:text-cyan-400" />
              <span>الهيكل التنظيمي والقيادي</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0b1a30] dark:text-white tracking-tight leading-tight">
              الهيكل التنظيمي والقيادي
            </h1>

            <p className="text-[#475569] dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              تصفح الأرشيف الكامل لمجالس القيادة والهيكل المعاون عبر السنين في عرض بصري متناسق مع بقية الويب سايت.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="px-4 py-2 rounded-2xl bg-white/75 dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 shadow-sm backdrop-blur-sm">
                <div className="text-lg font-black text-[#0b1a30] dark:text-cyan-400">{years.length}</div>
                <div className="text-[11px] text-[#64748b] dark:text-gray-400 font-semibold mt-0.5">سنوات متاحة</div>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-white/75 dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#0b1a30] dark:text-white font-bold">
                  <CalendarRange className="w-4 h-4 text-[#d4a373] dark:text-cyan-400" />
                  <span>{currentData ? `${currentData.year} - عرض الهيكل الحالي` : "اختر سنة لعرض الهيكل"}</span>
                </div>
              </div>
            </div>
          </section>

          {years.length > 0 ? (
            <>
              <div className="rounded-[2rem] bg-white/80 dark:bg-[#0d1527]/85 border border-[#d4a373]/25 dark:border-white/10 shadow-[0_20px_60px_rgba(11,26,48,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md p-4 sm:p-5">
                <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                  {years.map((year) => {
                    const isActive = selectedYear === year;

                    return (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`shrink-0 px-5 py-2.5 rounded-full text-sm sm:text-base font-black transition-all duration-300 whitespace-nowrap border ${
                          isActive
                            ? "bg-gradient-to-r from-[#e0a96d] to-[#d4a373] text-[#0b1a30] border-[#d4a373]/50 shadow-[0_10px_24px_rgba(212,163,115,0.35)]"
                            : "bg-white/70 dark:bg-white/5 text-[#475569] dark:text-slate-300 border-[#d4a373]/20 dark:border-white/10 hover:text-[#0b1a30] dark:hover:text-white hover:border-[#d4a373]/45 dark:hover:border-cyan-400/40"
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>

              <ShagaraSection currentData={currentData} />
            </>
          ) : (
            <div className="rounded-[2rem] bg-white/80 dark:bg-[#0d1527]/85 border border-[#d4a373]/25 dark:border-white/10 shadow-[0_20px_60px_rgba(11,26,48,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md p-8 sm:p-12 text-center">
              <p className="text-lg text-[#0b1a30] dark:text-white">لا يوجد بيانات للهيكل التنظيمي حالياً.</p>
            </div>
          )}
        </div>
      </main>

      <Identity />
    </>
  );

  return <div className="min-h-screen flex flex-col justify-between bg-transparent text-foreground dir-rtl font-cairo relative overflow-x-hidden">{shell}</div>;
}
