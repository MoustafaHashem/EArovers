"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trophy, CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const islands = [
  {
    id: 1,
    image: "/images/island_1_.png",
    text: "عشيرة هندسة عين شمس ضد عشائر الهندسة من جامعات اخرى",
    category: "مسابقات هندسية",
  },
  {
    id: 2,
    image: "/images/island_2_.png",
    text: "عشيرة الهندسة ضد عشائر عين شمس الاخريات",
    category: "مسابقات الجامعة",
  },
  {
    id: 3,
    image: "/images/island_3.png",
    text: "مسابقات الجوالة المحلية",
    category: "مسابقات محلية",
  },
  {
    id: 4,
    image: "/images/island_4.png",
    text: "الأنشطة الكشفية والدورات",
    category: "دورات كشفية",
  },
  {
    id: 5,
    image: "/images/island_5.png",
    text: "مهرجانات الإرشاد",
    category: "إرشاد",
  },
  {
    id: 6,
    image: "/images/island_6.png",
    text: "المعسكرات والمخيمات",
    category: "معسكرات",
  },
  {
    id: 7,
    image: "/images/island_7.png",
    text: "المشاركات الدولية",
    category: "دولي",
  },
];

interface Event {
  id: string;
  title: string;
  description: string | null;
  startDate: Date;
  location: string | null;
  eventType: string;
  coverImage: string | null;
}

interface FameIslandsProps {
  events: Event[];
}

export function FameIslands({ events }: FameIslandsProps) {
  const [hoveredIsland, setHoveredIsland] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col items-center py-12 relative" dir="rtl">
      <div className="text-center mb-16 px-4 z-10">
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white to-[#E0B84B] flex items-center justify-center gap-4 mb-4">
          <Trophy className="text-[#E0B84B]" size={48} />
          لوحة الشرف
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          تاريخ حافل بالبطولات والإنجازات الكشفية على مدار السنين
        </p>
      </div>

      <div className="relative w-full max-w-6xl h-[900px] lg:h-[1000px] mx-auto hidden md:block">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,184,75,0.05)_0%,transparent_50%)]" />
        
        {islands.map((island, index) => {
          // Calculate positions for a scattered organic layout (avoiding exact center)
          const angle = index * (360 / islands.length) * (Math.PI / 180);
          // Alternate radius to prevent overlap
          const radiusX = index % 2 === 0 ? 38 : 28;
          const radiusY = index % 2 === 0 ? 35 : 25;
          const left = 50 + (Math.cos(angle) * radiusX); // using %
          const top = 50 + (Math.sin(angle) * radiusY); // using %
          
          const islandEvents = events.filter(e => e.eventType === island.category);

          return (
            <div
              key={island.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out hover:z-50 ${hoveredIsland === island.id ? 'scale-110' : 'scale-100'} animate-floating`}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${index * 0.5}s`,
                zIndex: hoveredIsland === island.id ? 50 : 10,
              }}
              onMouseEnter={() => setHoveredIsland(island.id)}
              onMouseLeave={() => setHoveredIsland(null)}
            >
              <Dialog>
                <DialogTrigger render={<button type="button" className="cursor-pointer group flex flex-col items-center appearance-none bg-transparent border-none p-0 m-0" />}>
                  <div className="relative w-[180px] h-[180px] lg:w-[220px] lg:h-[220px] drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]">
                      <Image
                        src={island.image}
                        alt={island.text}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain transition-transform duration-300 group-hover:scale-110 filter group-hover:brightness-110"
                      />
                    </div>
                    
                    {/* Floating Title Tag */}
                    <div className={`mt-2 bg-black/80 backdrop-blur-md border border-[#E0B84B]/30 px-4 py-2 rounded-xl text-center shadow-xl transition-opacity duration-300 ${hoveredIsland === island.id ? 'opacity-100' : 'opacity-70'}`}>
                      <p className="text-white text-sm font-bold whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis">
                        {island.text}
                      </p>
                      <p className="text-[#E0B84B] text-xs mt-1">
                        {islandEvents.length} إنجازات
                      </p>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-[#0b1420] border-slate-800 text-white max-h-[80vh] overflow-y-auto" dir="rtl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-center text-[#E0B84B] mb-6">
                      {island.text}
                    </DialogTitle>
                  </DialogHeader>
                  
                  {islandEvents.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                      لا توجد إنجازات مسجلة في هذا القسم حالياً
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {islandEvents.map(event => (
                        <Link href={`/events/${event.id}`} key={event.id} className="block group">
                          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 transition-all hover:bg-slate-800/80 hover:border-[#E0B84B]/50 hover:-translate-y-1">
                            <div className="flex gap-4">
                              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-800">
                                {event.coverImage && (
                                  <Image src={event.coverImage} alt={event.title} fill className="object-cover" />
                                )}
                              </div>
                              <div className="flex flex-col flex-grow justify-between">
                                <h4 className="font-bold text-lg text-white group-hover:text-[#E0B84B] transition-colors line-clamp-2">
                                  {event.title}
                                </h4>
                                <div className="text-sm text-slate-400 mt-2 flex flex-col gap-1">
                                  <span className="flex items-center gap-1"><CalendarDays size={14}/> {new Date(event.startDate).getFullYear()}</span>
                                  {event.location && <span className="flex items-center gap-1"><MapPin size={14}/> {event.location}</span>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          );
        })}
      </div>

      {/* Mobile Grid Layout */}
      <div className="md:hidden w-full px-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {islands.map((island) => {
          const islandEvents = events.filter(e => e.eventType === island.category);
          return (
            <Dialog key={island.id}>
              <DialogTrigger render={<button type="button" className="bg-black/30 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center gap-4 w-full appearance-none" />}>
                  <div className="relative w-32 h-32">
                    <Image src={island.image} alt={island.text} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{island.text}</h3>
                    <Badge variant="outline" className="border-[#E0B84B] text-[#E0B84B]">
                      {islandEvents.length} بطولات
                    </Badge>
                  </div>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] bg-[#0b1420] border-slate-800 text-white max-h-[85vh] overflow-y-auto rounded-3xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-black text-center text-[#E0B84B] mb-4">
                    {island.text}
                  </DialogTitle>
                </DialogHeader>
                {islandEvents.length === 0 ? (
                  <div className="text-center text-gray-500 py-12 text-sm">
                    لا توجد إنجازات مسجلة
                  </div>
                ) : (
                  <div className="space-y-4">
                    {islandEvents.map(event => (
                      <Link href={`/events/${event.id}`} key={event.id} className="block group">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-3 flex gap-3">
                           <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-800">
                              {event.coverImage && (
                                <Image src={event.coverImage} alt={event.title} fill className="object-cover" />
                              )}
                            </div>
                            <div className="flex flex-col justify-center">
                               <h4 className="font-bold text-sm text-white line-clamp-2 mb-1">{event.title}</h4>
                               <span className="text-xs text-slate-400 flex items-center gap-1"><CalendarDays size={12}/> {new Date(event.startDate).getFullYear()}</span>
                            </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )
        })}
      </div>
    </div>
  );
}
