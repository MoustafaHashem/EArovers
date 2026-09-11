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
    <div className="min-h-screen flex flex-col justify-between bg-[#070E1B] text-white dir-rtl">
      <Navbar />

      <main className="flex-1 pt-28 pb-16 px-6 max-w-7xl mx-auto w-full">
        {selectedBadge ? (
          /* ================= DETAIL VIEW (WHEN CLICKED) ================= */
          <div className="space-y-8 animate-fadeIn">
            <button
              onClick={() => setSelectedBadge(null)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
            >
              ← العودة إلى جميع الدروع
            </button>

            {/* Selected Badge Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#0B1528] p-8 rounded-2xl border border-white/10 text-center sm:text-right">
              {selectedBadge.image && (
                <div className="relative w-35 h-35 flex-shrink-0">
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
                  <p className="text-gray-400 text-sm mt-2">
                    {selectedBadge.description}
                  </p>
                )}
              </div>
            </div>

            {/* SECTION 1 */}
            <section className="bg-[#0B1528] p-6 rounded-2xl border border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-[var(--color-scout-blue-light)] border-b border-white/10 pb-2">
                القسم الأول
              </h2>
              <div className="text-gray-400 text-sm min-h-[120px] flex items-center justify-center border border-dashed border-white/20 rounded-xl">
                <span>محتوى القسم الأول - يمكنك إضافة تفاصيل الدرع هنا</span>
              </div>
            </section>

            {/* SECTION 2 */}
            <section className="bg-[#0B1528] p-6 rounded-2xl border border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-[var(--color-scout-blue-light)] border-b border-white/10 pb-2">
                القسم الثاني
              </h2>
              <div className="text-gray-400 text-sm min-h-[120px] flex items-center justify-center border border-dashed border-white/20 rounded-xl">
                <span>
                  محتوى القسم الثاني - يمكنك إضافة المتطلبات أو الشروط هنا
                </span>
              </div>
            </section>
          </div>
        ) : (
          /* ================= GRID MATCHING SCREENSHOT DESIGN ================= */
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-black">الدروع الكشفية</h1>
              <input
                type="text"
                placeholder="بحث عن درع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md px-4 py-2.5 rounded-xl bg-[#0B1528] border border-white/10 focus:outline-none focus:border-blue-500 text-right text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredBadges.map((badge, index) => (
                <div
                  key={badge.id || index}
                  onClick={() => setSelectedBadge(badge)}
                  className="bg-[#0B1528] border border-white/10 hover:border-blue-500/50 rounded-2xl p-8 cursor-pointer transition-all hover:-translate-y-1.5 shadow-xl flex flex-col items-center justify-between min-h-[300px] group"
                >
                  <div className="relative w-62 h-62 my-auto flex items-center justify-center transition-transform group-hover:scale-105">
                    {badge.image ? (
                      <Image
                        src={badge.image}
                        alt={badge.title}
                        fill
                        className="object-contain"
                      />
                    ) : badge.icon ? (
                      <span className="text-5xl">{badge.icon}</span>
                    ) : null}
                  </div>

                  <h3 className="font-bold text-lg text-white pt-4 text-center">
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
