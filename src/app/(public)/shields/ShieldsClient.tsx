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
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
          >
            ← العودة إلى جميع الدروع
          </button>

          {/* Selected Badge Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center sm:text-right shadow-2xl">
            {selectedBadge.image && (
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src={selectedBadge.image}
                  alt={selectedBadge.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-black">{selectedBadge.title}</h1>
              {selectedBadge.description && (
                <p className="text-gray-400 text-sm mt-2 max-w-2xl">
                  {selectedBadge.description}
                </p>
              )}
            </div>
          </div>

          {/* SECTION 1 */}
          <section className="bg-black/30 backdrop-blur-sm p-6 rounded-3xl border border-white/10 space-y-4">
            <h2 className="text-xl font-bold text-[var(--color-scout-blue-light)] border-b border-white/10 pb-2">
              متطلبات الدرع
            </h2>
            <div className="text-gray-400 text-sm min-h-[120px] flex items-center justify-center border border-dashed border-white/20 rounded-xl">
              <span>سيتم إضافة متطلبات الدرع والتفاصيل قريباً</span>
            </div>
          </section>
        </div>
      ) : (
        /* ================= GRID MATCHING SCREENSHOT DESIGN ================= */
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-white">الدروع الكشفية</h1>
            <input
              type="text"
              placeholder="بحث عن درع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-3 mt-4 rounded-xl bg-black/40 border border-[var(--color-dark-border)] focus:outline-none focus:border-[var(--color-scout-blue)] text-right text-sm text-white placeholder-gray-500 shadow-inner backdrop-blur-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {filteredBadges.map((badge) => (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className="bg-black/20 border border-[var(--color-dark-border)] hover:border-[var(--color-scout-blue-light)] rounded-3xl p-8 cursor-pointer transition-all hover:-translate-y-1.5 shadow-xl hover:shadow-[0_0_20px_rgba(92,124,182,0.3)] flex flex-col items-center justify-between min-h-[280px] group backdrop-blur-sm"
              >
                <div className="relative w-40 h-40 my-auto flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                  {badge.image ? (
                    <Image
                      src={badge.image}
                      alt={badge.title}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <span className="text-3xl text-gray-400">🛡️</span>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-xl text-white pt-6 text-center group-hover:text-[var(--color-scout-blue-light)] transition-colors">
                  {badge.title}
                </h3>
              </div>
            ))}
          </div>
          
          {filteredBadges.length === 0 && (
             <div className="text-center py-20 text-gray-500">لا توجد دروع تطابق بحثك</div>
          )}
        </div>
      )}
    </>
  );
}
