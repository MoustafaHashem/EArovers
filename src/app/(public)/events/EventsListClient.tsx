"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  MapPin,
  Users,
  Tent,
  GraduationCap,
  Presentation,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type EventCategory =
  | "all"
  | "معسكرات"
  | "دراسات"
  | "سيشنات"
  | "خدمة عامة"
  | "متنوع";

interface EventItem {
  id: string;
  title: string;
  description: string | null;
  startDate: Date | string;
  endDate: Date | string | null;
  location: string | null;
  eventType: string;
  coverImage: string | null;
  maxParticipants?: number | null;
}

interface EventsListClientProps {
  events: EventItem[];
}

export function getNormalizedCategory(
  type: string
): "معسكرات" | "دراسات" | "سيشنات" | "خدمة عامة" | "متنوع" {
  if (!type) return "متنوع";
  const normalized = type.trim();
  if (normalized.includes("معسكر")) return "معسكرات";
  if (normalized.includes("دراس")) return "دراسات";
  if (
    normalized.includes("سيشن") ||
    normalized.includes("ندوة") ||
    normalized.includes("ورشة")
  )
    return "سيشنات";
  if (normalized.includes("خدم")) return "خدمة عامة";
  return "متنوع";
}

const categoryIcons = {
  all: Sparkles,
  معسكرات: Tent,
  دراسات: GraduationCap,
  سيشنات: Presentation,
  "خدمة عامة": HeartHandshake,
  متنوع: Sparkles,
};

const categoryLabels: { key: EventCategory; label: string }[] = [
  { key: "all", label: "جميع الفعاليات" },
  { key: "معسكرات", label: "معسكرات" },
  { key: "دراسات", label: "دراسات" },
  { key: "سيشنات", label: "سيشنات" },
  { key: "خدمة عامة", label: "خدمة عامة" },
  { key: "متنوع", label: "متنوع" },
];

function EventsListContent({ events }: EventsListClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as EventCategory | null;

  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>(
    initialCategory && categoryLabels.some((c) => c.key === initialCategory)
      ? initialCategory
      : "all"
  );

  useEffect(() => {
    const cat = searchParams.get("category") as EventCategory | null;
    if (cat && categoryLabels.some((c) => c.key === cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const now = new Date();

  // 1. Separate into upcoming and past (sorted newest to oldest)
  const upcomingEvents = useMemo(() => {
    return events
      .filter((e) => new Date(e.startDate) >= now)
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
  }, [events]);

  const pastEvents = useMemo(() => {
    return events
      .filter((e) => new Date(e.startDate) < now)
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
  }, [events]);

  const currentTabEvents =
    activeTab === "upcoming" ? upcomingEvents : pastEvents;

  // 2. Count by category in the current tab
  const categoryCounts = useMemo(() => {
    const counts: Record<EventCategory, number> = {
      all: currentTabEvents.length,
      معسكرات: 0,
      دراسات: 0,
      سيشنات: 0,
      "خدمة عامة": 0,
      متنوع: 0,
    };

    currentTabEvents.forEach((event) => {
      const cat = getNormalizedCategory(event.eventType);
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return counts;
  }, [currentTabEvents]);

  // 3. Filter by selected category
  const displayedEvents = useMemo(() => {
    if (selectedCategory === "all") return currentTabEvents;
    return currentTabEvents.filter(
      (e) => getNormalizedCategory(e.eventType) === selectedCategory
    );
  }, [currentTabEvents, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Top 2 Main Tabs: Upcoming vs Past */}
      <div className="flex justify-center items-center">
        <div className="inline-flex p-1.5 rounded-full bg-[#f0eee6] dark:bg-white/5 border border-[#d4a373]/30 dark:border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={cn(
              "px-6 md:px-8 py-2 md:py-2.5 rounded-full font-bold text-sm md:text-base transition-all cursor-pointer",
              activeTab === "upcoming"
                ? "bg-[#102A43] text-[#E0B84B] dark:bg-[#00f0ff] dark:text-[#080b10] shadow-md scale-100"
                : "text-[#475569] hover:text-[#0b1a30] dark:text-slate-300 dark:hover:text-white"
            )}
          >
            <span>الفعاليات القادمة</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("past")}
            className={cn(
              "px-6 md:px-8 py-2 md:py-2.5 rounded-full font-bold text-sm md:text-base transition-all cursor-pointer",
              activeTab === "past"
                ? "bg-[#102A43] text-[#E0B84B] dark:bg-[#00f0ff] dark:text-[#080b10] shadow-md scale-100"
                : "text-[#475569] hover:text-[#0b1a30] dark:text-slate-300 dark:hover:text-white"
            )}
          >
            <span>الفعاليات السابقة</span>
          </button>
        </div>
      </div>

      {/* 5 Categories Filter Chips */}
      <div
        className="flex items-center justify-start md:justify-center gap-2 md:gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categoryLabels.map(({ key, label }) => {
          const Icon = categoryIcons[key];
          const isSelected = selectedCategory === key;
          const count = categoryCounts[key] || 0;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedCategory(key)}
              className={cn(
                "whitespace-nowrap shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm md:text-base font-bold transition-all cursor-pointer border",
                isSelected
                  ? "bg-gradient-to-r from-[#e0a96d] to-[#d4a373] text-[#0b1a30] dark:from-[#00f0ff] dark:to-[#38f4ff] dark:text-[#080b10] border-[#d4a373] dark:border-cyan-400 shadow-md scale-105"
                  : "bg-[#f0eee6] hover:bg-[#e8e5dc] text-[#475569] hover:text-[#0b1a30] dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:hover:text-white border-[#d4a373]/20 dark:border-white/5"
              )}
            >
              <Icon size={16} className={isSelected ? "text-[#0b1a30] dark:text-[#080b10]" : "text-[#d4a373] dark:text-cyan-400"} />
              <span>{label}</span>
              <span
                className={cn(
                  "px-1.5 py-0.2 text-[11px] font-black rounded-md",
                  isSelected
                    ? "bg-[#0b1a30]/15 dark:bg-[#080b10]/20 text-[#0b1a30] dark:text-[#080b10]"
                    : "bg-black/5 dark:bg-white/10 text-[#64748b] dark:text-slate-400"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Events List */}
      {displayedEvents.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl border border-[#d4a373]/25 dark:border-[var(--color-dark-border)]">
          <Calendar className="w-16 h-16 text-[#d4a373] dark:text-cyan-400 mx-auto mb-4 opacity-60" />
          <h3 className="text-xl font-bold text-[#0b1a30] dark:text-white mb-2">
            {selectedCategory === "all"
              ? activeTab === "upcoming"
                ? "لا توجد فعاليات قادمة حالياً"
                : "لا توجد فعاليات سابقة"
              : `لا توجد ${selectedCategory} ${
                  activeTab === "upcoming" ? "قادمة حالياً" : "سابقة"
                }`}
          </h3>
          <p className="text-[#475569] dark:text-gray-400">
            {activeTab === "upcoming"
              ? "ترقبوا إعلان مواعيد أنشطتنا ومعسكراتنا القادمة قريباً."
              : "سيتم أرشفة الفعاليات هنا فور انتهائها."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {displayedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export function EventsListClient({ events }: EventsListClientProps) {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-400">جاري تحميل الفعاليات...</div>}>
      <EventsListContent events={events} />
    </Suspense>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const category = getNormalizedCategory(event.eventType);

  const getBadgeStyle = () => {
    switch (category) {
      case "معسكرات":
        return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      case "دراسات":
        return "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30";
      case "سيشنات":
        return "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30";
      case "خدمة عامة":
        return "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30";
      case "متنوع":
      default:
        return "bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-500/30";
    }
  };

  return (
    <Link href={`/events/${event.id}`}>
      <div className="glass-card hover:glass-card-hover p-6 rounded-2xl border border-[#d4a373]/25 dark:border-[var(--color-dark-border)] hover:border-[#161e35] dark:hover:border-cyan-400/50 transition-all shadow-md group cursor-pointer">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cover Image (if available) */}
          {event.coverImage && (
            <div className="relative w-full md:w-48 h-40 md:h-auto rounded-xl overflow-hidden shrink-0">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 192px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Date Badge (when no cover image) */}
          {!event.coverImage && (
            <div className="shrink-0 w-32 flex flex-col items-center justify-center text-center p-4 bg-[#f0eee6] dark:bg-white/5 rounded-xl border border-[#d4a373]/20 dark:border-white/5 group-hover:bg-[#161e35]/10 dark:group-hover:bg-cyan-500/10 transition-colors">
              <span className="text-sm font-bold text-[#475569] dark:text-gray-400 group-hover:text-[#161e35] dark:group-hover:text-cyan-400">
                {new Date(event.startDate).toLocaleDateString("ar-EG", {
                  month: "long",
                })}
              </span>
              <span className="text-4xl font-black text-[#161e35] dark:text-white my-1">
                {new Date(event.startDate).getDate()}
              </span>
              <span className="text-xs font-bold text-[#64748b] dark:text-gray-500">
                {new Date(event.startDate).getFullYear()}
              </span>
            </div>
          )}

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {/* Category Badge */}
                <span
                  className={cn(
                    "px-3 py-1 text-xs font-bold rounded-full border",
                    getBadgeStyle()
                  )}
                >
                  {category}
                </span>

                {/* Original eventType tag if different */}
                {event.eventType && event.eventType !== category && (
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-black/5 dark:bg-white/5 text-[#64748b] dark:text-gray-400 border border-black/5 dark:border-white/5">
                    {event.eventType}
                  </span>
                )}

                {event.coverImage && (
                  <span className="text-sm font-bold text-[#64748b] dark:text-gray-500 mr-auto">
                    {new Date(event.startDate).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-[#0b1a30] dark:text-white group-hover:text-[#161e35] dark:group-hover:text-cyan-300 transition-colors">
                {event.title}
              </h3>

              {event.description && (
                <p className="text-[#475569] dark:text-gray-400 mt-2 leading-relaxed text-sm line-clamp-2">
                  {event.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#334155] dark:text-gray-300">
              {event.location && (
                <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                  <MapPin size={16} className="text-red-500" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.maxParticipants && (
                <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                  <Users
                    size={16}
                    className="text-emerald-600 dark:text-green-400"
                  />
                  <span>الحد الأقصى: {event.maxParticipants}</span>
                </div>
              )}
              {event.endDate && (
                <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                  <Calendar
                    size={16}
                    className="text-indigo-600 dark:text-purple-400"
                  />
                  <span>
                    إلى {new Date(event.endDate).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
