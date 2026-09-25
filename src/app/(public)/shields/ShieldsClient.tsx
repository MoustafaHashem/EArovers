"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { shieldsData } from "@/data/clanData";
import { cn } from "@/lib/utils";
import { fetchShieldMediaAction } from "@/actions/media";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { Camera, PlayCircle, Loader2, Images } from "lucide-react";

type ShieldType = {
  id: string;
  title: string;
  description: string | null;
  image?: string;
};

type ShieldMediaItem = {
  id: string;
  url: string;
  title: string;
  format: string;
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
  
  const currentShieldParam =
    searchParams.get("shield") ||
    searchParams.get("id") ||
    (typeof window === "undefined" ? initialShieldParam : undefined);

  const currentFieldParam =
    searchParams.get("field") ||
    (typeof window === "undefined" ? initialFieldParam : undefined);

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
  const [shieldMedia, setShieldMedia] = useState<ShieldMediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Sync selected badge when URL query parameter changes
  useEffect(() => {
    if (!currentShieldParam) {
      setSelectedBadge(null);
      return;
    }

    const match = findShieldByParam(currentShieldParam);
    setSelectedBadge(match);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShieldParam, initialShields]);

  // Fetch shield-specific media whenever a badge is selected
  useEffect(() => {
    if (!selectedBadge) {
      setShieldMedia([]);
      return;
    }

    let isMounted = true;
    setLoadingMedia(true);

    fetchShieldMediaAction(selectedBadge.title, selectedBadge.id)
      .then((data: any) => {
        if (isMounted) {
          setShieldMedia(data);
          setLoadingMedia(false);
        }
      })
      .catch((err: any) => {
        console.error("Failed to load shield media:", err);
        if (isMounted) setLoadingMedia(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedBadge]);

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
    setSearchQuery("");
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
            className="relative z-20 px-5 py-2.5 bg-gradient-to-r from-[#161e35] to-[#1e2746] hover:from-[#1e2746] hover:to-[#263156] text-white dark:from-white/10 dark:to-white/10 dark:hover:bg-white/20 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
          >
            ← العودة إلى جميع الدروع
          </button>

          {/* Selected Badge Header - Enlarged Shield Image, Title removed (as it is on ribbon), Description only */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 md:gap-10 glass-card p-6 sm:p-10 rounded-3xl border border-[#d4a373]/30 dark:border-white/10 text-center sm:text-right shadow-xl">
            {selectedBadge.image && (
              <div className="pointer-events-none relative w-56 h-48 sm:w-64 sm:h-56 md:w-72 md:h-60 flex-shrink-0 overflow-visible flex items-center justify-center">
                <Image
                  src={selectedBadge.image}
                  alt={selectedBadge.title}
                  fill
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-contain scale-[1.9] sm:scale-[2.05] md:scale-[2.2] filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]"
                  priority
                />
              </div>
            )}
            <div className="flex-1">
              {selectedBadge.description ? (
                <p className="text-base sm:text-lg md:text-xl font-medium text-[#161e35] dark:text-gray-200 leading-relaxed max-w-2xl">
                  {selectedBadge.description}
                </p>
              ) : (
                <p className="text-base sm:text-lg text-[#64748b] dark:text-gray-400 font-medium">
                  المجالات والأنشطة التنافسية الخاصة بهذا الدرع موضحة أدناه
                </p>
              )}
            </div>
          </div>

          {/* SECTION 2: Shield Fields / Domains */}
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

          {/* SECTION 3: Dedicated Shield Media / Photo Gallery (Replaces Requirements) */}
          <section className="glass-card p-6 sm:p-8 rounded-3xl border border-[#d4a373]/30 dark:border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4a373]/15 dark:bg-cyan-500/10 flex items-center justify-center text-[#0b1a30] dark:text-cyan-300 border border-[#d4a373]/25 dark:border-cyan-400/20">
                  <Camera size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#161e35] dark:text-cyan-400">
                    معرض صور وفعاليات الدرع
                  </h2>
                  <p className="text-xs text-[#64748b] dark:text-gray-400 mt-0.5">
                    توثيق الأنشطة واللحظات التذكارية لمنافسات هذا الدرع
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#d4a373]/15 text-[#0b1a30] dark:bg-cyan-500/10 dark:text-cyan-300 border border-[#d4a373]/30 dark:border-cyan-400/20 flex items-center gap-1.5">
                <Images size={14} />
                <span>{shieldMedia.length} صور</span>
              </span>
            </div>

            {loadingMedia ? (
              <div className="py-20 flex flex-col items-center justify-center text-[#161e35] dark:text-cyan-400 gap-3">
                <Loader2 className="animate-spin" size={36} />
                <span className="text-sm font-medium text-[#64748b] dark:text-gray-400">جاري تحميل صور الدرع...</span>
              </div>
            ) : shieldMedia.length === 0 ? (
              <div className="text-center py-16 px-4 border border-dashed border-[#d4a373]/30 dark:border-white/15 rounded-2xl flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-3xl">
                  📷
                </div>
                <h3 className="text-base font-bold text-[#161e35] dark:text-white">لم يتم إضافة صور لهذا الدرع حتى الآن</h3>
                <p className="text-xs text-[#64748b] dark:text-gray-400 max-w-md">
                  سيتم توثيق ورفع صور المعسكرات والورش والمعارض الخاصة بهذا الدرع قريباً.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {shieldMedia.map((media, idx) => (
                  <div
                    key={media.id || idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="relative group rounded-2xl overflow-hidden aspect-[4/3] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-[#d4a373]/50 dark:hover:border-cyan-400/50 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={media.url}
                      alt={media.title || selectedBadge.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    {media.format === 'mp4' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                        <PlayCircle className="text-white/90 drop-shadow-md" size={40} />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 z-20">
                      <span className="text-white text-xs font-bold line-clamp-2">
                        {media.title || selectedBadge.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Lightbox Viewer */}
          <Lightbox
            open={lightboxIndex >= 0}
            index={lightboxIndex}
            close={() => setLightboxIndex(-1)}
            slides={shieldMedia.map((m) => ({ src: m.url, title: m.title }))}
            plugins={[Zoom]}
          />
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

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-6 sm:gap-y-8 md:gap-x-8 md:gap-y-10 mt-8">
            {filteredBadges.map((badge) => (
              <button
                key={badge.id}
                type="button"
                onClick={() => handleSelectBadge(badge)}
                title={badge.title}
                aria-label={badge.title}
                className="relative flex items-center justify-center p-0.5 sm:p-2 cursor-pointer transition-all duration-300 hover:-translate-y-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-95 bg-transparent border-0"
              >
                <div className="relative w-full aspect-[4/3] max-w-[195px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[290px] flex items-center justify-center overflow-visible">
                  {badge.image ? (
                    <Image
                      src={badge.image}
                      alt={badge.title}
                      fill
                      sizes="(max-width: 640px) 195px, (max-width: 1024px) 260px, 300px"
                      className="object-contain scale-[2.25] sm:scale-[1.85] md:scale-[1.9] lg:scale-[1.95] filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_6px_22px_rgba(0,240,255,0.22)] group-hover:scale-[2.4] sm:group-hover:scale-[1.95] md:group-hover:scale-[2.0] lg:group-hover:scale-[2.1] group-hover:drop-shadow-[0_16px_32px_rgba(0,0,0,0.4)] dark:group-hover:drop-shadow-[0_0_35px_rgba(0,240,255,0.65)] transition-all duration-300"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#f0eee6] dark:bg-white/5 flex flex-col items-center justify-center border border-[#d4a373]/20 dark:border-white/10 group-hover:scale-110 transition-transform">
                      <span className="text-3xl sm:text-4xl text-gray-400">🛡️</span>
                      <span className="text-xs text-[#0b1a30] dark:text-white font-bold mt-1">{badge.title}</span>
                    </div>
                  )}
                </div>
                <span className="sr-only">{badge.title}</span>
              </button>
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
