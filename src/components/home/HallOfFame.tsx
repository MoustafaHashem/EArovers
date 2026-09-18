"use client";

import { fameData } from "@/data/clanData";
import { Trophy, Medal, Star } from "lucide-react";

export function HallOfFame() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#0b1a30] dark:text-white flex items-center justify-center gap-2 md:gap-4 mb-4 text-balance">
          <Trophy className="text-[#d4a373] dark:text-[#ffd700] dark:drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]" size={40} />
          لوحة الشرف والبطولات
        </h2>
        <p className="text-[#475569] dark:text-slate-400 text-lg">سجل إنجازات العشيرة في المسابقات القمية والمحلية</p>
      </div>

      <div className="w-full relative border-r-2 border-[#d4a373]/30 dark:border-[#ffd700]/30 pr-6 space-y-12">
        {fameData.map((item) => (
          <div key={item.id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -right-[33px] top-4 w-4 h-4 rounded-full bg-[#d4a373] dark:bg-[#ffd700] shadow-[0_0_10px_rgba(212,163,115,0.5)] dark:shadow-[0_0_15px_#ffd700]" />
            
            <div className="glass-card honor-card p-6 rounded-2xl mr-4 hover:-translate-x-2 transition-all duration-300">
              <div className="flex justify-between items-start mb-4 flex-col md:flex-row gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#0b1a30] dark:text-white mb-2">{item.eventName}</h3>
                  <div className="inline-flex items-center gap-2 bg-[#d4a373]/15 text-[#0b1a30] border border-[#d4a373]/30 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30 px-3 py-1 rounded-full text-sm font-bold">
                    <span>{item.year}</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-400 to-[#d4a373] text-[#0b1a30] dark:from-yellow-400 dark:to-amber-500 dark:text-[#080b10] font-black px-4 py-2 rounded-lg shadow-md dark:shadow-[0_0_18px_rgba(255,215,0,0.35)] flex items-center gap-2">
                  <Medal size={20} />
                  {item.placement}
                </div>
              </div>

              {item.specialAwards.length > 0 && (
                <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">
                  <h4 className="text-[#475569] dark:text-slate-300 mb-3 text-sm font-semibold">شارات التميز الخاصة:</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.specialAwards.map((award, i) => (
                      <span key={i} className="flex items-center gap-1.5 bg-black/[0.03] border border-black/10 text-[#334155] dark:bg-white/5 dark:border-white/10 dark:text-slate-200 px-3 py-1.5 rounded-md text-sm">
                        <Star size={14} className="text-sky-600 dark:text-[#00f0ff]" />
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
