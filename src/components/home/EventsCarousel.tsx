"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

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

export function EventsCarousel({ events }: EventsCarouselProps) {
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
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  if (!events || events.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6" dir="rtl">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="h-px w-16 bg-white/30" />
          <h2 className="text-3xl md:text-4xl font-black text-white">
            الفعاليات
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
        className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="group flex flex-col bg-[#F3ECD6] rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1 transition-transform shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] snap-start border border-[#e5d9ba]"
          >
            <div className="relative w-full h-48 bg-gray-300">
              {event.coverImage ? (
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">لا توجد صورة</div>
              )}
            </div>

            <div className="px-4 -mt-5 relative z-10">
              <div className="flex items-center justify-between gap-2 bg-[#E0B84B] rounded-full px-4 py-2.5 shadow-md">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#102A43] text-[#E0B84B] shrink-0">
                  <ChevronLeft size={14} />
                </span>
                <span className="font-black text-[#102A43] text-sm md:text-base truncate">
                  {event.title}
                </span>
              </div>
            </div>

            <div className="px-4 py-6 text-center">
              <p className="font-bold text-[#102A43]">
                {new Date(event.startDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              {event.location && (
                <p className="flex items-center justify-center gap-1 text-xs text-slate-600 mt-2">
                  <MapPin size={12} />
                  {event.location}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Link 
          href="/events" 
          className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-full text-white transition-all duration-300"
        >
          <span className="font-bold">عرض جميع الفعاليات</span>
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

