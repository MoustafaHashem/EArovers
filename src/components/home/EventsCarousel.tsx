"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin, Calendar } from "lucide-react";
import { useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  description: string | null;
  startDate: Date;
  location: string | null;
  eventType: string;
  coverImage: string | null;
}

interface EventsCarouselProps {
  events: Event[];
}

function EventImage({ src, alt }: { src: string | null; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#161e35] to-[#0b1a30] dark:from-[#0a1628] dark:to-[#060d1a]">
        <Calendar size={40} className="text-[#d4a373]/40 dark:text-cyan-500/30" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
      onError={() => setHasError(true)}
      className="object-cover group-hover:scale-105 transition-transform duration-500"
    />
  );
}

export function EventsCarousel({ events }: EventsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const now = new Date();

  // Upcoming events sorted from newest to oldest (startDate desc)
  const upcomingEvents = useMemo(() => {
    return events
      .filter((e) => new Date(e.startDate) >= now)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }, [events]);

  // Past events sorted from newest to oldest (startDate desc)
  const pastEvents = useMemo(() => {
    return events
      .filter((e) => new Date(e.startDate) < now)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }, [events]);

  const displayedEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 350;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!events || events.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6" dir="rtl">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="h-px w-16 bg-[#d4a373]/40 dark:bg-white/30" />
          <h2 className="text-3xl md:text-4xl font-black text-[#0b1a30] dark:text-white">
            الفعاليات
          </h2>
          <span className="h-px w-16 bg-[#d4a373]/40 dark:bg-white/30" />
        </div>
        <p className="text-[#475569] dark:text-gray-400 text-sm md:text-base font-medium">
          حكايات تُعاش، وذكريات تُخلّد، ومغامرات جمعتنا دائماً
        </p>
      </div>

      {/* 2 Tabs: الفعاليات القادمة & الفعاليات السابقة */}
      <div className="flex justify-center items-center mb-10">
        <div className="inline-flex p-1.5 rounded-full bg-[#f0eee6] dark:bg-white/5 border border-[#d4a373]/30 dark:border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setActiveTab("upcoming");
              scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
            }}
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
            onClick={() => {
              setActiveTab("past");
              scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
            }}
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

      {/* Empty State for Selected Tab */}
      {displayedEvents.length === 0 ? (
        <div className="text-center py-16 px-6 glass-card rounded-3xl border border-[#d4a373]/25 dark:border-cyan-500/20 max-w-lg mx-auto mb-8">
          <Calendar className="w-12 h-12 text-[#d4a373] dark:text-cyan-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-xl font-bold text-[#0b1a30] dark:text-white mb-1">
            {activeTab === "upcoming" ? "لا توجد فعاليات قادمة حالياً" : "لا توجد فعاليات سابقة"}
          </h3>
          <p className="text-[#475569] dark:text-gray-400 text-sm">
            {activeTab === "upcoming"
              ? "ترقبوا إعلان مواعيد معسكراتنا ومسابقاتنا القادمة قريباً."
              : "سيتم أرشفة الفعاليات فور انتهائها."}
          </p>
        </div>
      ) : (
        /* Carousel Track with Side Navigation Buttons (buttons only if more than 3 events) */
        <div className="relative group/carousel">
          {displayedEvents.length > 3 && (
            <>
              {/* Navigation Button - Right */}
              <button
                type="button"
                onClick={() => scroll("right")}
                className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#102A43] text-[#E0B84B] border-2 border-[#E0B84B] dark:bg-[#080b10] dark:text-[#ffd700] dark:border-[#ffd700] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 hover:bg-[#E0B84B] hover:text-[#102A43] dark:hover:bg-[#ffd700] dark:hover:text-[#080b10] transition-all hidden sm:flex opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
                aria-label="التمرير لليمين"
              >
                <ChevronLeft className="w-6 h-6 rotate-180" />
              </button>

              {/* Navigation Button - Left */}
              <button
                type="button"
                onClick={() => scroll("left")}
                className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#102A43] text-[#E0B84B] border-2 border-[#E0B84B] dark:bg-[#080b10] dark:text-[#ffd700] dark:border-[#ffd700] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 hover:bg-[#E0B84B] hover:text-[#102A43] dark:hover:bg-[#ffd700] dark:hover:text-[#080b10] transition-all hidden sm:flex opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
                aria-label="التمرير لليسار"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Horizontal event cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayedEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group flex flex-col bg-[#F3ECD6] dark:bg-[#0c1a2e] rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1.5 transition-all duration-300 shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] snap-start border border-[#e5d9ba] dark:border-cyan-500/20 hover:border-[#102A43]/40 dark:hover:border-cyan-400/50"
              >
                {/* Cover Image */}
                <div className="relative w-full h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <EventImage src={event.coverImage} alt={event.title} />

                  {/* Event Type Badge */}
                  {event.eventType && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-[#0b1a30]/80 text-white dark:bg-cyan-500/90 dark:text-[#080b10] shadow backdrop-blur-sm">
                        {event.eventType}
                      </span>
                    </div>
                  )}
                </div>

                {/* Overlapping Pill Bar with Event Title (on Right) & Circular Arrow Icon (on Left) */}
                <div className="px-4 -mt-5 relative z-10">
                  <div className="flex items-center justify-between gap-2 bg-[#E0B84B] dark:bg-gradient-to-r dark:from-[#d4af37] dark:to-[#E0B84B] rounded-full px-4 py-2.5 shadow-md group-hover:shadow-lg transition-all">
                    {/* Title on the right (Arabic start) */}
                    <span className="font-black text-[#102A43] dark:text-[#080b10] text-sm md:text-base truncate text-right flex-1">
                      {event.title}
                    </span>

                    {/* Circular Chevron Button on the left */}
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#102A43] dark:bg-[#080b10] text-[#E0B84B] dark:text-[#ffd700] shrink-0 group-hover:-translate-x-0.5 transition-transform">
                      <ChevronLeft size={14} />
                    </span>
                  </div>
                </div>

                {/* Bottom Date & Location */}
                <div className="px-4 py-6 text-center">
                  <p className="font-bold text-[#102A43] dark:text-white text-base">
                    {new Date(event.startDate).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {event.location && (
                    <p className="flex items-center justify-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mt-2">
                      <MapPin size={13} className="text-red-500 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Centered "عرض جميع الفعاليات" Action Button */}
      <div className="flex justify-center mt-8">
        <Link
          href="/events"
          className="group flex items-center gap-2.5 bg-[#0b1a30] hover:bg-[#161e35] text-white dark:bg-white/5 dark:hover:bg-white/10 border border-[#0b1a30]/30 dark:border-white/15 px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
        >
          <span className="font-bold">عرض جميع الفعاليات</span>
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#d4a373] dark:text-cyan-400" />
        </Link>
      </div>
    </div>
  );
}
