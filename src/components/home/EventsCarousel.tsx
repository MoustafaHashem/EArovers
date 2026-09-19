"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin, CalendarDays } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

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
  if (!events || events.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 relative" dir="rtl">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="h-px w-16 bg-[var(--color-scout-blue)]/50" />
          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white to-gray-400">
            أحدث الفعاليات
          </h2>
          <span className="h-px w-16 bg-[var(--color-scout-blue)]/50" />
        </div>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          حكايات تُعاش، وذكريات تُخلّد، ومغامرات جمعتنا دائماً
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
          direction: "rtl",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {events.map((event) => (
            <CarouselItem key={event.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <Link href={`/events/${event.id}`}>
                <div className="group h-full flex flex-col bg-[#0f172a]/80 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-800 shadow-xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(92,124,182,0.2)] transition-all duration-300">
                  <div className="relative w-full h-56 bg-slate-800 overflow-hidden">
                    {event.coverImage ? (
                      <Image
                        src={event.coverImage}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                        لا توجد صورة
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-10">
                       <Badge variant="default" className="bg-[var(--color-scout-blue)] text-white font-bold border-none shadow-lg">
                         {event.eventType}
                       </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-[var(--color-scout-blue-light)] transition-colors">
                      {event.title}
                    </h3>
                    
                    {event.description && (
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
                        {event.description}
                      </p>
                    )}

                    <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-slate-800">
                      <div className="flex items-center text-sm font-medium text-slate-300">
                        <CalendarDays className="w-4 h-4 ml-2 text-[var(--color-scout-blue)]" />
                        {new Date(event.startDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center text-sm font-medium text-slate-300">
                          <MapPin className="w-4 h-4 ml-2 text-red-400" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -right-12 bg-slate-900 border-slate-700 text-white hover:bg-[var(--color-scout-blue)] hover:text-white" />
        <CarouselNext className="hidden sm:flex -left-12 bg-slate-900 border-slate-700 text-white hover:bg-[var(--color-scout-blue)] hover:text-white" />
      </Carousel>
      
      <div className="flex justify-center mt-10">
        <Link 
          href="/events" 
          className="group flex items-center gap-2 bg-white/5 hover:bg-[var(--color-scout-blue)]/20 border border-white/10 hover:border-[var(--color-scout-blue)]/50 px-8 py-3 rounded-full text-white transition-all duration-300"
        >
          <span className="font-bold">عرض جميع الفعاليات</span>
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
