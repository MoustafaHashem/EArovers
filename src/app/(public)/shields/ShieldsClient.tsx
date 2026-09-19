"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { shieldsData } from "@/data/clanData";
import { cn } from "@/lib/utils";

type ShieldType = {
  id: string;
  title: string;
  description: string | null;
  image?: string;
};

export function ShieldsClient({ 
  initialShields,
  initialShieldParam,
  initialFieldParam
}: { 
  initialShields: ShieldType[];
  initialShieldParam?: string;
  initialFieldParam?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentShieldParam = searchParams.get("shield") || searchParams.get("id") || initialShieldParam;
  const currentFieldParam = searchParams.get("field") || initialFieldParam;

  const [searchQuery, setSearchQuery] = useState("");

  // Helper to find shield by param (slug, UUID, image name, or Arabic title)
  const findShieldByParam = (param?: string | null) => {
    if (!param) return null;
    const clean = decodeURIComponent(param).toLowerCase().trim();

    const slugMap: Record<string, string> = {
      scout: "scout",
      art: "artistic",
      sports: "sports",
      service: "service",
      culture: "cultural",
    };
    const targetKey = slugMap[clean] || clean;

    return initialShields.find((badge) => {
      if (badge.id.toLowerCase() === clean) return true;
      if (badge.image && badge.image.toLowerCase().includes(targetKey)) return true;
      if (clean === "scout" && badge.title.includes("كشفي")) return true;
      if (clean === "art" && badge.title.includes("فني")) return true;
      if (clean === "sports" && badge.title.includes("رياضي")) return true;
      if (clean === "service" && (badge.title.includes("خدمة") || badge.title.includes("خدمه"))) return true;
      if (clean === "culture" && badge.title.includes("ثقافي")) return true;
      if (badge.title.toLowerCase().includes(clean)) return true;
      return false;
    }) || null;
  };

  const initialSelected = useMemo(() => {
    return findShieldByParam(currentShieldParam);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedBadge, setSelectedBadge] = useState<ShieldType | null>(initialSelected);

  // Sync selected badge when URL query parameter changes
  useEffect(() => {
    if (currentShieldParam) {
      const match = findShieldByParam(currentShieldParam);
      if (match) {
        setSelectedBadge(match);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShieldParam, initialShields]);

  // Find corresponding static clanData to retrieve domain fields & activities
  const currentClanData = useMemo(() => {
    if (!selectedBadge) return null;
    return shieldsData.find((s) => {
      if (selectedBadge.image && s.image && selectedBadge.image.includes(s.image.split("/").pop() || "---")) return true;
      if (s.title === selectedBadge.title) return true;
      if (s.id === "scout" && selectedBadge.title.includes("كشفي")) return true;
      if (s.id === "art" && selectedBadge.title.includes("فني")) return true;
      if (s.id === "sports" && selectedBadge.title.includes("رياضي")) return true;
      if (s.id === "service" && (selectedBadge.title.includes("خدمة") || selectedBadge.title.includes("خدمه"))) return true;
      if (s.id === "culture" && selectedBadge.title.includes("ثقافي")) return true;
      return false;
    });
  }, [selectedBadge]);

  const filteredBadges = useMemo(() => {
    return initialShields.filter((badge) =>
      badge.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );
  }, [searchQuery, initialShields]);

  const handleBackToAll = () => {
    setSelectedBadge(null);
    router.replace("/shields", { scroll: false });
  };

  const handleSelectBadge = (badge: ShieldType) => {
    setSelectedBadge(badge);
    router.replace(`/shields?id=${badge.id}`, { scroll: false });
  };

  return (
    <>
      {selectedBadge ? (
        /* ================= DETAIL VIEW (WHEN CLICKED) ================= */
        <div className="space-y-8 animate-in fade-in zoom-in duration-300">
          <button
            onClick={handleBackToAll}
            className="px-5 py-2.5 bg-gradient-to-r from-[#161e35] to-[#1e2746] hover:from-[#1e2746] hover:to-[#263156] text-white dark:from-white/10 dark:to-white/10 dark:hover:bg-white/20 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
          >
            ← العودة إلى جميع الدروع
          </button>

          {/* Selected Badge Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 glass-card p-8 rounded-3xl border border-[#d4a373]/30 dark:border-white/10 text-center sm:text-right shadow-xl">
            {selectedBadge.image && (
              <div className="relative w-36 h-36 flex-shrink-0">
                <Image
                  src={selectedBadge.image}
                  alt={selectedBadge.title}
                  fill
                  className="object-contain filter drop-shadow-md"
                  priority
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

          {/* SECTION: Shield Fields / Domains */}
          {currentClanData?.items && currentClanData.items.length > 0 && (
            <section className="glass-card p-6 rounded-3xl border border-[#d4a373]/30 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
                <h2 className="text-xl font-bold text-[#161e35] dark:text-cyan-400">
                  مجالات وأنشطة الدرع
                </h2>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#d4a373]/15 text-[#0b1a30] dark:bg-cyan-500/10 dark:text-cyan-300 border border-[#d4a373]/30 dark:border-cyan-400/20">
                  {currentClanData.items.length} مجالات تنافسية
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {currentClanData.items.map((item) => {
                  const isHighlighted = currentFieldParam && decodeURIComponent(currentFieldParam).trim() === item.title.trim();
                  return (
                    <div
                      key={item.title}
                      className={cn(
                        "p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 border",
                        isHighlighted
                          ? "bg-gradient-to-r from-[#d4a373]/25 via-[#e0a96d]/20 to-transparent border-[#d4a373] dark:from-cyan-950/50 dark:to-cyan-900/30 dark:border-cyan-400 shadow-md ring-2 ring-[#d4a373]/30 dark:ring-cyan-400/40 scale-[1.02]"
                          : "bg-black/[0.02] dark:bg-white/5 border-black/5 dark:border-white/5 hover:border-[#d4a373]/30 dark:hover:border-cyan-500/20"
                      )}
                    >
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-[#d4a373]/10 border border-[#d4a373]/25 dark:bg-cyan-500/10 dark:border-cyan-400/30 shadow-inner flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 text-right">
                        <h4 className={cn(
                          "font-bold text-base md:text-lg transition-colors",
                          isHighlighted
                            ? "text-[#0b1a30] dark:text-cyan-300 font-black"
                            : "text-[#0b1a30] dark:text-white"
                        )}>
                          {item.title}
                        </h4>
                        {isHighlighted && (
                          <span className="inline-block text-xs font-bold text-[#b07d4b] dark:text-cyan-400 mt-1">
                            ✦ المجال الذي اخترته
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* SECTION: Requirements */}
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
                onClick={() => handleSelectBadge(badge)}
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
