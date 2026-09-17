"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Identity } from "@/components/Identity";
import { BADGES_DATA } from "@/data/badges";

export default function Daro3Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);

  const filteredBadges = useMemo(() => {
    return BADGES_DATA.filter((badge) =>
      badge.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#102A43] text-white dir-rtl font-sans">
      <Navbar />

      <main className="flex-1 pt-28 pb-16 px-2 sm:px-6 max-w-7xl mx-auto w-full">
        {selectedBadge ? (
          /* ================= DETAIL VIEW (WHEN CLICKED) ================= */
          <div className="space-y-8 animate-fadeIn">
            <button
              onClick={() => setSelectedBadge(null)}
              className="px-5 py-2.5 bg-[#18385C] hover:bg-[#1D4470] text-[#8C9BAE] hover:text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2"
            >
              ← العودة إلى جميع الدروع
            </button>

            {/* Selected Badge Header (Reverted Image Size) */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#1D4E89]/20 p-8 rounded-2xl border border-white/10 text-center sm:text-right shadow-2xl">
              {selectedBadge.image && (
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex-shrink-0">
                  <Image
                    src={selectedBadge.image}
                    alt={selectedBadge.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-black text-white">{selectedBadge.title}</h1>
                {selectedBadge.description && (
                  <p className="text-[#A7A9AC] text-sm mt-2">
                    {selectedBadge.description}
                  </p>
                )}
              </div>
            </div>

            {/* SECTION 1 */}
            <section className="bg-[#1D4E89]/20 p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl">
              <h2 className="text-xl font-bold text-[#E0B84B] border-b border-white/10 pb-2">
                القسم الأول
              </h2>
              <div className="text-[#A7A9AC] text-sm min-h-[120px] flex items-center justify-center border border-dashed border-white/20 rounded-xl">
                <span>محتوى القسم الأول - يمكنك إضافة تفاصيل الدرع هنا</span>
              </div>
            </section>

            {/* SECTION 2 */}
            <section className="bg-[#1D4E89]/20 p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl">
              <h2 className="text-xl font-bold text-[#E0B84B] border-b border-white/10 pb-2">
                القسم الثاني
              </h2>
              <div className="text-[#A7A9AC] text-sm min-h-[120px] flex items-center justify-center border border-dashed border-white/20 rounded-xl">
                <span>
                  محتوى القسم الثاني - يمكنك إضافة المتطلبات أو الشروط هنا
                </span>
              </div>
            </section>
          </div>
        ) : (
          /* ================= GRID DESIGN ================= */
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-black text-white">الدروع الكشفية</h1>
              <input
                type="text"
                placeholder="بحث عن درع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md px-4 py-2.5 rounded-xl bg-[#18385C] border border-white/10 focus:outline-none focus:border-[#E0B84B] text-right text-sm text-white placeholder-[#8C9BAE]"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6">
              {filteredBadges.map((badge, index) => (
                <div
                  key={badge.id || index}
                  onClick={() => setSelectedBadge(badge)}
                  className="bg-[#1D4E89]/20 border border-white/10 hover:border-[#E0B84B]/50 rounded-2xl p-1 sm:p-2 cursor-pointer transition-all hover:-translate-y-1.5 shadow-xl flex flex-col items-center justify-center group overflow-hidden"
                >
                  {/* Full-width image for the grid cards */}
                  <div className="relative w-full aspect-square flex items-center justify-center transition-transform group-hover:scale-105">
                    {badge.image ? (
                      <Image
                        src={badge.image}
                        alt={badge.title}
                        fill
                        className="object-contain p-1"
                      />
                    ) : badge.icon ? (
                      <span className="text-8xl sm:text-9xl">{badge.icon}</span>
                    ) : null}
                  </div>

                  <h3 className="font-bold text-base sm:text-xl text-white py-2 text-center">
                    {badge.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Identity />
    </div>
  );
}