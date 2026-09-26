"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import {
  Camera,
  PlayCircle,
  Loader2,
  Images,
  BookOpen,
} from "lucide-react";

import { shieldsData } from "@/data/clanData";
import { cn } from "@/lib/utils";
import { fetchShieldMediaAction } from "@/actions/media";

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

const SLUG_MAP: Record<string, string> = {
  scout: "scout",
  art: "artistic",
  sports: "sports",
  service: "service",
  culture: "cultural",
  religious: "religious",
  scientific: "scientific",
  sea: "sea",
  environmental: "environmental",
};

export function ShieldsClient({
  initialShields,
  initialShieldParam,
  initialFieldParam,
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
    initialShieldParam;

  const currentFieldParam = searchParams.get("field") || initialFieldParam;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<ShieldType | null>(null);
  const [shieldMedia, setShieldMedia] = useState<ShieldMediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const findShieldByParam = useCallback(
    (param?: string | null) => {
      if (!param) return null;
      const clean = decodeURIComponent(param).toLowerCase().trim();
      const targetKey = SLUG_MAP[clean] || clean;

      return (
        initialShields.find((badge) => {
          if (badge.id.toLowerCase() === clean) return true;
          if (badge.image && badge.image.toLowerCase().includes(targetKey))
            return true;
          if (clean === "scout" && badge.title.includes("كشفي")) return true;
          if (clean === "art" && badge.title.includes("فني")) return true;
          if (clean === "sports" && badge.title.includes("رياضي")) return true;
          if (
            clean === "service" &&
            (badge.title.includes("خدمة") || badge.title.includes("خدمه"))
          )
            return true;
          if (clean === "culture" && badge.title.includes("ثقافي")) return true;
          if (clean === "religious" && badge.title.includes("ديني")) return true;
          if (clean === "scientific" && badge.title.includes("علمي")) return true;
          if (clean === "sea" && badge.title.includes("بحري")) return true;
          if (clean === "environmental" && badge.title.includes("بيئي")) return true;
          if (badge.title.toLowerCase().includes(clean)) return true;
          return false;
        }) || null
      );
    },
    [initialShields]
  );

  useEffect(() => {
    const match = findShieldByParam(currentShieldParam);
    setSelectedBadge(match);
  }, [currentShieldParam, findShieldByParam]);

  useEffect(() => {
    if (!selectedBadge) {
      setShieldMedia([]);
      return;
    }

    let isMounted = true;
    setLoadingMedia(true);

    fetchShieldMediaAction(selectedBadge.title, selectedBadge.id)
      .then((data: ShieldMediaItem[]) => {
        if (isMounted) {
          setShieldMedia(data);
          setLoadingMedia(false);
        }
      })
      .catch((err: unknown) => {
        console.error("Failed to load shield media:", err);
        if (isMounted) setLoadingMedia(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedBadge]);

  const currentClanData = useMemo(() => {
    if (!selectedBadge) return null;
    return shieldsData.find((s) => {
      if (
        selectedBadge.image &&
        s.image &&
        selectedBadge.image.includes(s.image.split("/").pop() || "---")
      )
        return true;
      if (s.title === selectedBadge.title) return true;
      if (s.id === "scout" && selectedBadge.title.includes("كشفي")) return true;
      if (s.id === "art" && selectedBadge.title.includes("فني")) return true;
      if (s.id === "sports" && selectedBadge.title.includes("رياضي")) return true;
      if (
        s.id === "service" &&
        (selectedBadge.title.includes("خدمة") ||
          selectedBadge.title.includes("خدمه"))
      )
        return true;
      if (s.id === "culture" && selectedBadge.title.includes("ثقافي"))
        return true;
      if (s.id === "religious" && selectedBadge.title.includes("ديني")) return true;
      if (s.id === "scientific" && selectedBadge.title.includes("علمي")) return true;
      if (s.id === "sea" && selectedBadge.title.includes("بحري")) return true;
      if (s.id === "environmental" && selectedBadge.title.includes("بيئي")) return true;
      return false;
    });
  }, [selectedBadge]);

  const filteredBadges = useMemo(() => {
    return initialShields.filter((badge) =>
      badge.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
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
        <div className="space-y-8 animate-in fade-in zoom-in duration-300">
          <button
            onClick={handleBackToAll}
            className="relative z-20 px-5 py-2.5 bg-gradient-to-r from-[#161e35] to-[#1e2746] hover:from-[#1e2746] hover:to-[#263156] text-white dark:from-white/10 dark:to-white/10 dark:hover:bg-white/20 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
          >
            ← العودة إلى جميع الدروع
          </button>

          {/* Header */}
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

          {/* Shield Fields (Static Display Cards) */}
          {currentClanData?.items && currentClanData.items.length > 0 && (
            <section className="glass-card p-6 sm:p-8 rounded-3xl border border-[#d4a373]/30 dark:border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 flex-row-reverse">
                <div className="flex items-center gap-3 flex-row-reverse text-right">
                  <div className="w-10 h-10 rounded-xl bg-[#d4a373]/15 dark:bg-cyan-500/10 flex items-center justify-center text-[#0b1a30] dark:text-cyan-300 border border-[#d4a373]/25 dark:border-cyan-400/20">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#161e35] dark:text-cyan-400">
                      مجالات وأنشطة الدرع
                    </h2>
                    <p className="text-xs text-[#64748b] dark:text-gray-400 mt-0.5">
                      قائمة المجالات والأنشطة التنافسية للدرع
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#d4a373]/15 text-[#0b1a30] dark:bg-cyan-500/10 dark:text-cyan-300 border border-[#d4a373]/30 dark:border-cyan-400/20">
                  {currentClanData.items.length} مجالات تنافسية
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {currentClanData.items.map((item) => {
                  const isHighlighted =
                    currentFieldParam &&
                    decodeURIComponent(currentFieldParam).trim() ===
                      item.title.trim();

                  return (
                    <div
                      key={item.title}
                      className={cn(
                        "p-5 rounded-2xl flex items-center justify-between border transition-all duration-300",
                        isHighlighted
                          ? "bg-gradient-to-r from-[#d4a373]/25 via-[#e0a96d]/20 to-transparent border-[#d4a373] dark:from-cyan-950/50 dark:to-cyan-900/30 dark:border-cyan-400 shadow-md ring-2 ring-[#d4a373]/30 dark:ring-cyan-400/40"
                          : "bg-black/[0.02] dark:bg-white/5 border-black/5 dark:border-white/5"
                      )}
                    >
                      <div className="flex items-center gap-4 flex-row-reverse w-full text-right">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-[#d4a373]/10 border border-[#d4a373]/25 dark:bg-cyan-500/10 dark:border-cyan-400/30 shadow-inner flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h4
                            className={cn(
                              "font-bold text-base md:text-lg text-[#0b1a30] dark:text-white"
                            )}
                          >
                            {item.title}
                          </h4>
                          {item.desc && (
                            <p className="text-xs text-[#64748b] dark:text-gray-400 mt-1 line-clamp-1">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Media Gallery - Updated to match the reference image style */}
          <section className="glass-card p-6 sm:p-10 rounded-3xl border border-[#d4a373]/30 dark:border-white/10 space-y-8 bg-gradient-to-b from-[#0b1220]/95 via-[#070b14]/98 to-[#05080f]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 gap-4 flex-row-reverse">
              <div className="flex items-center gap-4 flex-row-reverse text-right">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-300 border border-cyan-400/30 shadow-lg shadow-cyan-500/10">
                  <Camera size={26} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-wide">
                    معرض صور وفعاليات الدرع
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    توثيق الأنشطة واللحظات التذكارية لمنافسات هذا الدرع
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 flex items-center gap-2 flex-row-reverse shadow-inner">
                <Images size={16} />
                <span>{shieldMedia.length} صور وفعاليات</span>
              </span>
            </div>

            {loadingMedia ? (
              <div className="py-24 flex flex-col items-center justify-center text-cyan-400 gap-4">
                <Loader2 className="animate-spin" size={42} />
                <span className="text-sm font-semibold text-gray-400">
                  جاري تحميل صور وفعاليات الدرع...
                </span>
              </div>
            ) : shieldMedia.length === 0 ? (
              <div className="text-center py-20 px-6 border border-dashed border-white/15 rounded-3xl flex flex-col items-center justify-center gap-4 bg-white/[0.01]">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-4xl border border-white/10">
                  📷
                </div>
                <h3 className="text-lg font-bold text-white">
                  لم يتم إضافة صور لهذا الدرع حتى الآن
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed">
                  سيتم توثيق ورفع صور المعسكرات والورش والمعارض الخاصة بهذا الدرع قريباً لتظهر بهذا التصميم الاحترافي.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {shieldMedia.map((media, idx) => (
                  <div
                    key={media.id || idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="relative group rounded-3xl overflow-hidden aspect-[16/10] bg-[#0f172a] border border-white/15 hover:border-cyan-400/60 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-1.5"
                  >
                    <Image
                      src={media.url}
                      alt={media.title || selectedBadge.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />

                    {media.format === "mp4" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                        <PlayCircle
                          className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                          size={54}
                        />
                      </div>
                    )}

                    {/* Gradient Overlay matching reference style */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-[#05080f]/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity z-20 flex flex-col justify-end p-6 text-right">
                      <div className="flex items-center justify-between w-full flex-row-reverse">
                        <span className="text-white text-base sm:text-lg font-black tracking-wide drop-shadow-md">
                          {media.title || selectedBadge.title}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          ↗
                        </div>
                      </div>
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
        /* GRID VIEW */
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-[#0b1a30] dark:text-white">
              الدروع الكشفية
            </h1>
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
                      <span className="text-3xl sm:text-4xl text-gray-400">
                        🛡️
                      </span>
                      <span className="text-xs text-[#0b1a30] dark:text-white font-bold mt-1">
                        {badge.title}
                      </span>
                    </div>
                  )}
                </div>
                <span className="sr-only">{badge.title}</span>
              </button>
            ))}
          </div>

          {filteredBadges.length === 0 && (
            <div className="text-center py-20 text-[#64748b] dark:text-gray-500 font-bold">
              لا توجد دروع تطابق بحثك
            </div>
          )}
        </div>
      )}
    </>
  );
}