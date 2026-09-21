"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Camera,
  Search,
  X,
  Sparkles,
  Tent,
  Trophy,
  Shield,
  Clapperboard,
  Compass,
  PlayCircle,
  Film,
  ImageIcon,
  Layers,
  Maximize2,
  RefreshCw,
  Clock,
  Images,
} from "lucide-react";
import { fetchMediaAction } from "@/actions/media";
import { cn } from "@/lib/utils";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

export type GalleryMediaItem = {
  id: string;
  url: string;
  title: string;
  category?: string;
  format: string;
};

interface FullGalleryProps {
  initialMedia?: GalleryMediaItem[];
}

const CATEGORIES = [
  { key: "الكل", label: "الكل", icon: Sparkles },
  { key: "معسكرات", label: "معسكرات", icon: Tent },
  { key: "مسابقات", label: "مسابقات", icon: Trophy },
  { key: "دروع", label: "دروع", icon: Shield },
  { key: "كواليس", label: "كواليس", icon: Clapperboard },
  { key: "رحلات", label: "رحلات", icon: Compass },
] as const;

export function FullGallery({ initialMedia = [] }: FullGalleryProps) {
  const [mediaList, setMediaList] = useState<GalleryMediaItem[]>(initialMedia);
  const [activeCategory, setActiveCategory] = useState<string>("الكل");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mediaType, setMediaType] = useState<"all" | "image" | "video">("all");
  const [loading, setLoading] = useState<boolean>(initialMedia.length === 0);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  // Load all media once if not provided in props
  useEffect(() => {
    if (initialMedia.length > 0) return;

    let mounted = true;
    setLoading(true);

    fetchMediaAction("الكل")
      .then((data) => {
        if (mounted) {
          setMediaList(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load gallery media:", err);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [initialMedia]);

  // Compute category count badges based on the entire mediaList
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { الكل: mediaList.length };
    CATEGORIES.forEach((cat) => {
      if (cat.key !== "الكل") {
        counts[cat.key] = mediaList.filter((m) => m.category === cat.key).length;
      }
    });
    return counts;
  }, [mediaList]);

  // Total videos count
  const videoCount = useMemo(
    () => mediaList.filter((m) => m.format === "mp4").length,
    [mediaList]
  );

  // Filtered Media
  const filteredMedia = useMemo(() => {
    return mediaList.filter((item) => {
      // 1. Category Filter
      if (activeCategory !== "الكل" && item.category !== activeCategory) {
        return false;
      }

      // 2. Type Filter (all / image / video)
      if (mediaType === "video" && item.format !== "mp4") return false;
      if (mediaType === "image" && item.format === "mp4") return false;

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const titleMatch = item.title?.toLowerCase().includes(query);
        const categoryMatch = item.category?.toLowerCase().includes(query);
        if (!titleMatch && !categoryMatch) return false;
      }

      return true;
    });
  }, [mediaList, activeCategory, mediaType, searchQuery]);

  const handleResetFilters = () => {
    setActiveCategory("الكل");
    setSearchQuery("");
    setMediaType("all");
  };

  // Convert filtered media to Lightbox slides
  const lightboxSlides = useMemo(() => {
    return filteredMedia.map((m) => {
      if (m.format === "mp4") {
        return {
          type: "video" as const,
          title: m.title,
          description: m.category ? `قسم: ${m.category}` : undefined,
          sources: [
            {
              src: m.url,
              type: "video/mp4",
            },
          ],
        };
      }
      return {
        src: m.url,
        title: m.title,
        description: m.category ? `قسم: ${m.category}` : undefined,
      };
    });
  }, [filteredMedia]);

  return (
    <div className="w-full space-y-10">
      {/* ================= HERO HEADER ================= */}
      <section className="space-y-6">
        <Link
          href="/"
          className="inline-flex items-center text-[#161e35] dark:text-cyan-400 hover:opacity-80 transition-opacity font-bold text-sm sm:text-base group"
        >
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          العودة للرئيسية
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4a373]/15 dark:bg-cyan-500/10 border border-[#d4a373]/30 dark:border-cyan-400/20 text-[#0b1a30] dark:text-cyan-300 text-xs sm:text-sm font-bold shadow-sm">
              <Camera className="w-4 h-4 text-[#d4a373] dark:text-cyan-400" />
              <span>معرض الذكريات والأنشطة الكشفية</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0b1a30] dark:text-white tracking-tight">
              معرض الميديا الشامل
            </h1>

            <p className="text-[#475569] dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              توثيق مرئي لرحلة جوالة هندسة عين شمس — من مخيمات التحدي ومشاريع الريادة
              وبناء الجسور، إلى البطولات الكشفية والدروع التنافسية والكواليس الأخوية.
            </p>
          </div>

          {/* Quick Stats Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3 self-start md:self-auto w-full md:w-auto">
            <div className="px-4 py-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 shadow-sm backdrop-blur-sm text-center">
              <div className="text-2xl font-black text-[#0b1a30] dark:text-cyan-400">
                {mediaList.length}
              </div>
              <div className="text-xs text-[#64748b] dark:text-gray-400 font-semibold mt-0.5">
                إجمالي الوسائط
              </div>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 shadow-sm backdrop-blur-sm text-center">
              <div className="text-2xl font-black text-[#d4a373] dark:text-teal-300">
                {categoryCounts["معسكرات"] || 4}
              </div>
              <div className="text-xs text-[#64748b] dark:text-gray-400 font-semibold mt-0.5">
                معسكرات كشفية
              </div>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 shadow-sm backdrop-blur-sm text-center">
              <div className="text-2xl font-black text-amber-500 dark:text-amber-400">
                {categoryCounts["مسابقات"] || 4}
              </div>
              <div className="text-xs text-[#64748b] dark:text-gray-400 font-semibold mt-0.5">
                بطولات ومسابقات
              </div>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 shadow-sm backdrop-blur-sm text-center">
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {videoCount || 1}
              </div>
              <div className="text-xs text-[#64748b] dark:text-gray-400 font-semibold mt-0.5">
                مقاطع فيديو
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTROLS & FILTER BAR ================= */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 sm:p-4 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-[#d4a373]/25 dark:border-white/10 shadow-lg backdrop-blur-md">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] dark:text-gray-400" />
            <input
              type="text"
              placeholder="ابحث بالاسم أو الفعالية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-11 pl-10 py-2.5 rounded-2xl bg-white dark:bg-black/30 border border-[#d4a373]/20 dark:border-white/10 focus:outline-none focus:border-[#161e35] dark:focus:border-cyan-400 text-sm text-[#0b1a30] dark:text-white placeholder-[#64748b] dark:placeholder-gray-500 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white p-1"
                aria-label="مسح البحث"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Media Type Filter (الكل / صور / فيديوهات) */}
          <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 p-1 rounded-2xl border border-black/5 dark:border-white/10 self-center sm:self-auto">
            <button
              onClick={() => setMediaType("all")}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
                mediaType === "all"
                  ? "bg-white dark:bg-cyan-500/20 text-[#0b1a30] dark:text-cyan-300 shadow-sm border border-black/5 dark:border-cyan-400/30"
                  : "text-[#64748b] dark:text-gray-400 hover:text-[#0b1a30] dark:hover:text-white"
              )}
            >
              <Layers size={15} />
              <span>الكل</span>
            </button>

            <button
              onClick={() => setMediaType("image")}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
                mediaType === "image"
                  ? "bg-white dark:bg-cyan-500/20 text-[#0b1a30] dark:text-cyan-300 shadow-sm border border-black/5 dark:border-cyan-400/30"
                  : "text-[#64748b] dark:text-gray-400 hover:text-[#0b1a30] dark:hover:text-white"
              )}
            >
              <ImageIcon size={15} />
              <span>صور</span>
            </button>

            <button
              onClick={() => setMediaType("video")}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
                mediaType === "video"
                  ? "bg-white dark:bg-cyan-500/20 text-[#0b1a30] dark:text-cyan-300 shadow-sm border border-black/5 dark:border-cyan-400/30"
                  : "text-[#64748b] dark:text-gray-400 hover:text-[#0b1a30] dark:hover:text-white"
              )}
            >
              <Film size={15} />
              <span>فيديوهات</span>
              {videoCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500 text-white font-black">
                  {videoCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            const count = categoryCounts[cat.key] || 0;

            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "relative flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer select-none",
                  isActive
                    ? "text-white dark:text-[#080b10] shadow-md scale-[1.02]"
                    : "bg-white/80 dark:bg-white/5 text-[#475569] dark:text-gray-300 border border-[#d4a373]/25 dark:border-white/10 hover:border-[#161e35] dark:hover:border-cyan-400 hover:text-[#0b1a30] dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-gallery-category"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#161e35] to-[#263558] dark:from-cyan-400 dark:to-teal-300 shadow-[0_4px_16px_rgba(22,30,53,0.3)] dark:shadow-[0_0_20px_rgba(0,240,255,0.45)] -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon size={16} className={isActive ? "opacity-100" : "opacity-70"} />
                <span>{cat.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors",
                    isActive
                      ? "bg-white/20 dark:bg-black/20 text-white dark:text-[#080b10]"
                      : "bg-black/5 dark:bg-white/10 text-[#64748b] dark:text-gray-400"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ================= RESULTS COUNTER ================= */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-[#64748b] dark:text-gray-400 px-2 font-medium">
        <span>
          عرض <strong className="text-[#0b1a30] dark:text-white">{filteredMedia.length}</strong> من أصل{" "}
          {mediaList.length} وسائط
        </span>
        {(activeCategory !== "الكل" || searchQuery || mediaType !== "all") && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-[#161e35] dark:text-cyan-400 hover:underline font-bold"
          >
            <RefreshCw size={13} />
            <span>إعادة ضبط الفلاتر</span>
          </button>
        )}
      </div>

      {/* ================= MEDIA GRID ================= */}
      <div className="w-full min-h-[450px]">
        {loading ? (
          /* Skeleton Loading Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/10"
              />
            ))}
          </div>
        ) : filteredMedia.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center text-center py-24 px-4 bg-white/60 dark:bg-white/5 rounded-3xl border border-dashed border-[#d4a373]/30 dark:border-white/10 backdrop-blur-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#d4a373]/15 dark:bg-cyan-500/10 flex items-center justify-center text-[#d4a373] dark:text-cyan-400">
              <Images size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#0b1a30] dark:text-white">
              لم يتم العثور على وسائط مطابقة
            </h3>
            <p className="text-sm text-[#64748b] dark:text-gray-400 max-w-md">
              جرب تغيير كلمات البحث أو اختيار قسم آخر لعرض الصور ومقاطع الفيديو المتوفرة.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#161e35] to-[#1e2746] dark:from-cyan-400 dark:to-teal-300 text-white dark:text-[#080b10] font-bold text-sm shadow-md hover:scale-105 transition-all"
            >
              عرض جميع الوسائط
            </button>
          </div>
        ) : (
          /* Cards Grid */
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredMedia.map((item, idx) => {
                const isVideo = item.format === "mp4";

                return (
                  <motion.div
                    key={item.id || item.url}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.4) }}
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/5 dark:bg-[#0c1322] border border-[#d4a373]/25 dark:border-white/10 hover:border-[#161e35] dark:hover:border-cyan-400 shadow-md hover:shadow-2xl dark:hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none"
                  >
                    {/* Media Thumbnail/Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        isVideo
                          ? "/videos/hero-mobile-poster.jpg"
                          : item.url
                      }
                      alt={item.title || "صورة من المعرض"}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Top Badges (Category & Format) */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                      {/* Category Badge */}
                      {item.category ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/15 shadow-sm">
                          {item.category}
                        </span>
                      ) : (
                        <div />
                      )}

                      {/* Video Indicator Badge */}
                      {isVideo && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-red-600/90 text-white shadow-md">
                          <Film size={12} />
                          <span>فيديو</span>
                        </span>
                      )}
                    </div>

                    {/* Video Center Play Button */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300 shadow-xl">
                          <PlayCircle size={32} />
                        </div>
                      </div>
                    )}

                    {/* Bottom Gradient & Details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 z-10">
                      <div className="flex items-end justify-between gap-2">
                        <h4 className="text-white text-sm sm:text-base font-bold leading-snug line-clamp-2 drop-shadow-sm group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h4>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex-shrink-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                          <Maximize2 size={15} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* ================= LIGHTBOX VIEWER ================= */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
        plugins={[Zoom, Thumbnails, Video, Captions]}
        zoom={{
          maxZoomPixelRatio: 3,
        }}
        captions={{
          showToggle: true,
          descriptionMaxLines: 3,
        }}
      />
    </div>
  );
}
