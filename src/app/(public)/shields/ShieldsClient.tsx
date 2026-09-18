"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

type ShieldType = {
  id: string;
  title: string;
  description: string | null;
  image?: string;
};

export function ShieldsClient({ initialShields }: { initialShields: ShieldType[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<ShieldType | null>(null);

  const filteredBadges = useMemo(() => {
    return initialShields.filter((badge) =>
      badge.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );
  }, [searchQuery, initialShields]);

  return (
    <>
      {selectedBadge ? (
        /* ================= DETAIL VIEW (WHEN CLICKED) ================= */
        <div className="space-y-8 animate-in fade-in zoom-in duration-300">
          <button
            onClick={() => setSelectedBadge(null)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#161e35] to-[#1e2746] hover:from-[#1e2746] hover:to-[#263156] text-white dark:from-white/10 dark:to-white/10 dark:hover:bg-white/20 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            ← العودة إلى جميع الدروع
          </button>

          {/* Selected Badge Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 glass-card p-8 rounded-3xl border border-[#d4a373]/30 dark:border-white/10 text-center sm:text-right shadow-xl">
            {selectedBadge.image && (
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src={selectedBadge.image}
                  alt={selectedBadge.title}
                  fill
                  className="object-contain filter drop-shadow-md"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-black text-[#0b1a30] dark:text-white">{selectedBadge.title}</h1>
              {selectedBadge.description && (
                <p className="text-[#475569] dark:text-gray-400 text-sm mt-2 max-w-2xl leading-relaxed">
                  {selectedBadge.description}
                </p>
              )}
            </div>
          </div>

          {/* SECTION 1 */}
          <section className="glass-card p-6 rounded-3xl border border-[#d4a373]/30 dark:border-white/10 space-y-4">
            <h2 className="text-xl font-bold text-[#161e35] dark:text-cyan-400 border-b border-black/10 dark:border-white/10 pb-2">
              متطلبات الدرع
            </h2>
            <div className="text-[#64748b] dark:text-gray-400 text-sm min-h-[120px] flex items-center justify-center border border-dashed border-[#d4a373]/30 dark:border-white/20 rounded-xl">
              <span>سيتم إضافة متطلبات الدرع والتفاصيل قريباً</span>
            </div>
          </section>
        </div>
      ) : (
        /* ================= GRID MATCHING SCREENSHOT DESIGN ================= */
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-[#0b1a30] dark:text-white">الدروع الكشفية</h1>
            <input
              type="text"
              placeholder="بحث عن درع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-3 mt-4 rounded-xl bg-white dark:bg-black/40 border border-[#d4a373]/30 dark:border-cyan-500/30 focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 text-right text-sm text-[#0b1a30] dark:text-white placeholder-[#64748b] dark:placeholder-gray-500 shadow-sm backdrop-blur-sm transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {filteredBadges.map((badge) => (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className="glass-card hover:glass-card-hover rounded-3xl p-8 cursor-pointer transition-all hover:-translate-y-1.5 shadow-md hover:shadow-xl dark:shadow-xl dark:hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] flex flex-col items-center justify-between min-h-[280px] group"
              >
                <div className="relative w-40 h-40 my-auto flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                  {badge.image ? (
                    <Image
                      src={badge.image}
                      alt={badge.title}
                      fill
                      className="object-contain filter drop-shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#f0eee6] dark:bg-white/5 flex items-center justify-center border border-[#d4a373]/20 dark:border-white/10">
                      <span className="text-3xl text-gray-400">🛡️</span>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-xl text-[#0b1a30] dark:text-white pt-6 text-center group-hover:text-[#161e35] dark:group-hover:text-cyan-300 transition-colors">
                  {badge.title}
                </h3>
              </div>
            ))}
          </div>
          
          {filteredBadges.length === 0 && (
             <div className="text-center py-20 text-[#64748b] dark:text-gray-500 font-bold">لا توجد دروع تطابق بحثك</div>
          )}
        </div>
      )}
    </>
  );
}
