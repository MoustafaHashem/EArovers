"use client";

import { fameData } from "@/data/clanData";
import { Trophy, Medal, Star } from "lucide-react";
import Link from "next/link";

export function HallOfFame() {
  return (

    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-white flex items-center justify-center gap-4 mb-4">
          <Trophy className="text-[var(--color-glow-gold)]" size={40} />
          لوحة الشرف والبطولات
        </h2>
        <p className="text-gray-400 text-lg">سجل إنجازات العشيرة في المسابقات القمية والمحلية</p>
      </div>

      <div className="w-full relative border-r-2 border-[var(--color-dark-border)] pr-6 space-y-12">
        {fameData.map((item, index) => (
          <div key={item.id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -right-[33px] top-4 w-4 h-4 rounded-full bg-[var(--color-glow-gold)] shadow-[0_0_10px_var(--color-glow-gold)]" />
            <div className="glass-card p-6 rounded-2xl mr-4 hover:-translate-x-2 transition-transform duration-300">
              <div className="flex justify-between items-start mb-4 flex-col md:flex-row gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.eventName}</h3>
                  <div className="inline-flex items-center gap-2 bg-[var(--color-scout-blue)]/20 text-[var(--color-scout-blue-light)] px-3 py-1 rounded-full text-sm font-bold">
                    <span>{item.year}</span>
                  </div>
                </div>
                <div className={`bg-gradient-to-r ${index === 1 ? "from-zinc-500 to-slate-200" : "from-amber-500 to-yellow-400"} text-slate-900 font-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-2`}>
                  <Medal size={20} />
                  {item.placement}
                </div>
              </div>

              {item.specialAwards.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <h4 className="text-gray-300 mb-3 text-sm font-semibold">شارات التميز الخاصة:</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.specialAwards.map((award, i) => (
                      <span key={i} className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-sm text-gray-200">
                        <Star size={14} className="text-[var(--color-glow-cyan)]" />
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
      <Link
        href="/hall-of-fame"
        className="mt-10 inline-flex items-center gap-2 bg-[var(--color-glow-gold)] text-slate-900 font-bold px-6 py-3 rounded-lg shadow-lg hover:brightness-110 transition"
      >
        عرض المزيد
      </Link>
    </div>
  );
}
