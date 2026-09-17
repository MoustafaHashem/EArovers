"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, MapPin } from "lucide-react";
import { oldEvents } from "@/data/eventsdata";
import { useEffect, useRef } from "react";

export function EventsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      container.scrollBy({
        left: e.deltaY,
        behavior: "smooth",
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto" dir="rtl">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="h-px w-16 bg-white/30" />

          <h2 className="text-3xl md:text-4xl font-black text-white">
            الايفنتات
          </h2>

          <span className="h-px w-16 bg-white/30" />
        </div>

        <p className="text-gray-400 text-sm md:text-base">
          حكايات تُعاش، وذكريات تُخلّد، ومغامرات جمعتنا دائماً
        </p>
      </div>

      {/* Horizontal event cards */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {oldEvents.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="group flex flex-col bg-[#F3ECD6] rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1 transition-transform shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] snap-start"
          >
            <div className="relative w-full h-48 bg-gray-300">
              {event.coverImage && (
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="px-4 -mt-5 relative z-10">
              <div className="flex items-center justify-between gap-2 bg-[var(--color-glow-gold)] rounded-full px-4 py-2.5 shadow-md">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-scout-navy)] text-[var(--color-glow-gold)] shrink-0">
                  <ChevronLeft size={14} />
                </span>

                <span className="font-black text-[var(--color-scout-navy)] text-sm md:text-base truncate">
                  {event.title}
                </span>
              </div>
            </div>

            <div className="px-4 py-4 text-center">
              <p className="font-bold text-[var(--color-scout-navy)]">
                {event.displayDate}
              </p>

              {event.location && (
                <p className="flex items-center justify-center gap-1 text-xs text-slate-600 mt-1">
                  <MapPin size={12} />
                  {event.location}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      
    </div>
  );
}