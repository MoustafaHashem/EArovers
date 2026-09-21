"use client";

import { fameData, type FameItem } from "@/data/clanData";
import { Trophy, Medal, Star, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HallOfFame({ dbData }: { dbData?: FameItem[] }) {
  const data = (dbData && dbData.length > 0 ? dbData : fameData).slice(0, 2);
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="text-center mb-10 sm:mb-16 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1a30] dark:text-white flex items-center justify-center gap-2 md:gap-4 mb-3 sm:mb-4 text-balance">
          <Trophy className="text-[#d4a373] dark:text-[#ffd700] dark:drop-shadow-[0_0_12px_rgba(255,215,0,0.5)] shrink-0" size={36} />
          لوحة الشرف والبطولات
        </h2>
        <p className="text-[#475569] dark:text-slate-400 text-sm sm:text-lg">سجل إنجازات العشيرة في المسابقات القمية والمحلية</p>
      </div>

      <div className="w-full relative border-r-2 border-[#d4a373]/30 dark:border-[#ffd700]/30 pr-4 sm:pr-6 space-y-8 sm:space-y-12">
        {data.map((item) => (
          <div key={item.id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -right-[23px] sm:-right-[33px] top-6 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#d4a373] dark:bg-[#ffd700] shadow-[0_0_10px_rgba(212,163,115,0.5)] dark:shadow-[0_0_15px_#ffd700] z-20" />
            
            <Link
              href={`/fame/tournaments/${item.id}`}
              className="block glass-card honor-card p-5 sm:p-7 rounded-2xl mr-2 sm:mr-4 hover:-translate-x-2 transition-all duration-500 relative overflow-hidden group cursor-pointer"
            >
              {/* Background Image Layer */}
              {item.image && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <Image
                    src={item.image}
                    alt={item.eventName}
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out opacity-30 dark:opacity-35 group-hover:opacity-45 dark:group-hover:opacity-50 filter saturate-125 brightness-95"
                  />
                  {/* Subtle Vignette & Gradient Overlays for High Contrast Readability */}
                  <div className="absolute inset-0 bg-gradient-to-l from-white/95 via-white/80 to-white/50 dark:from-[#060c18]/95 dark:via-[#081324]/85 dark:to-[#0b1a32]/50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent dark:from-[#060c18]/95 dark:via-transparent dark:to-transparent" />
                </div>
              )}

              {/* Foreground Content */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4 sm:mb-5 flex-col sm:flex-row gap-3 sm:gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0b1a30] dark:text-white mb-2 drop-shadow-sm group-hover:text-[#d4a373] dark:group-hover:text-cyan-300 transition-colors">
                      {item.eventName}
                    </h3>
                    <div className="inline-flex items-center gap-2 bg-[#d4a373]/15 text-[#0b1a30] border border-[#d4a373]/30 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold backdrop-blur-md">
                      <span>{item.year}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-end sm:self-start">
                    <div className="bg-gradient-to-r from-amber-400 to-[#d4a373] text-[#0b1a30] dark:from-yellow-400 dark:to-amber-500 dark:text-[#080b10] font-black px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-md dark:shadow-[0_0_18px_rgba(255,215,0,0.35)] flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm backdrop-blur-sm">
                      <Medal size={18} />
                      <span>{item.placement}</span>
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#0b1a30] dark:text-white group-hover:bg-[#d4a373] dark:group-hover:bg-cyan-400 group-hover:text-white dark:group-hover:text-[#080b10] group-hover:-translate-x-1 transition-all shadow-sm">
                      <ChevronLeft size={16} />
                    </div>
                  </div>
                </div>

                {item.specialAwards.length > 0 && (
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-black/10 dark:border-white/10">
                    <h4 className="text-[#475569] dark:text-slate-300 mb-2 sm:mb-3 text-xs sm:text-sm font-semibold">
                      شارات التميز الخاصة:
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {item.specialAwards.map((award, i) => (
                        <span 
                          key={i} 
                          className="flex items-center gap-1 sm:gap-1.5 bg-white/70 border border-black/10 text-[#334155] dark:bg-black/40 dark:border-white/15 dark:text-slate-200 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm backdrop-blur-md shadow-sm"
                        >
                          <Star size={13} className="text-amber-500 dark:text-[#00f0ff]" />
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* View All Championships Button */}
      <div className="flex justify-center mt-10 sm:mt-12 w-full px-4">
        <Link 
          href="/fame"
          className="group flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#e0a96d] to-[#d4a373] hover:from-[#d4a373] hover:to-[#c69260] text-[#0b1a30] dark:from-[#00f0ff] dark:via-teal-400 dark:to-cyan-300 dark:text-[#080b10] px-6 sm:px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto text-center"
        >
          <span>اكتشف جميع البطولات والإنجازات</span>
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
