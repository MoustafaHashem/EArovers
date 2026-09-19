"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trophy, CalendarDays, MapPin, ChevronRight, ChevronLeft, Hand } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, PanInfo } from "motion/react";

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

  // Mobile Dial State
  const [dialOffset, setDialOffset] = useState(0);
  const activeIndex = ((-dialOffset % islands.length) + islands.length) % islands.length;
  const rotation = dialOffset * (360 / islands.length);

  const handleNext = () => setDialOffset(prev => prev + 1);
  const handlePrev = () => setDialOffset(prev => prev - 1);

  const handleDragEnd = (e: any, info: PanInfo) => {
    if (info.offset.x < -50) {
      handlePrev();
    } else if (info.offset.x > 50) {
      handleNext();
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-12 relative" dir="rtl">
      <div className="text-center mb-12 lg:mb-16 px-4 z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E0B84B] via-amber-200 to-[#E0B84B] flex items-center justify-center gap-4 mb-6 drop-shadow-lg">
          <Trophy className="text-[#E0B84B] drop-shadow-md" size={56} />
          لوحة الشرف
        </h2>
        <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-medium tracking-wide">
          تاريخ حافل بالبطولات والإنجازات الكشفية على مدار السنين
        </p>
      </div>

      <div className="relative w-full max-w-6xl h-[900px] lg:h-[1000px] mx-auto hidden md:block">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,184,75,0.05)_0%,transparent_50%)]" />
        
        {/* Center Text/Comment Component (Redesigned) */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] lg:w-[360px] lg:h-[360px] rounded-full p-8
          bg-gradient-to-br from-[#0b1420]/90 to-[#102A43]/90 backdrop-blur-xl
          border-4 border-[#E0B84B]/40 shadow-[0_0_60px_rgba(224,184,75,0.2)]
          overflow-visible group"
        >
          {/* Wrapper for hover scale to avoid conflicting with centering transforms */}
          <div className="relative w-full h-full flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
          {/* Decorative glowing orb inside */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,184,75,0.15)_0%,transparent_60%)] group-hover:scale-110 transition-transform duration-700" />
          
          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <h3 className="text-xl lg:text-3xl font-black leading-relaxed text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              من عبدو باشا
              <br />
              وجي بصوته
            </h3>
            
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#E0B84B] to-transparent rounded-full opacity-70" />
            
            <p className="text-2xl lg:text-4xl font-extrabold text-[#E0B84B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide">
              يهز الدورة دي!!
            </p>
          </div>
          
          {/* Rotating decorative border */}
          <div className="absolute inset-[-10px] rounded-full border-[1px] border-dashed border-[#E0B84B]/30 animate-[spin_30s_linear_infinite]" />
          </div>
        </div>
        
        {islands.map((island, index) => {
          // Perfect circle math like Nour's branch
          const angle = -90 + index * (360 / islands.length);
          
          const islandEvents = events.filter(e => e.eventType === island.category);

          return (
            <div
              key={island.id}
              className={`absolute left-1/2 top-1/2 transition-all duration-500 ease-out`}
              style={{
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translateX(clamp(210px, 32vw, 390px))
                  rotate(${-angle}deg)
                `,
                zIndex: hoveredIsland === island.id ? 50 : 20,
              }}
              onMouseEnter={() => setHoveredIsland(island.id)}
              onMouseLeave={() => setHoveredIsland(null)}
            >
              <div 
                className="animate-floating"
                style={{ animationDelay: `${index * 0.4}s` }}
              >
                <Dialog>
                  <DialogTrigger render={<button type="button" className="relative cursor-pointer group flex flex-col items-center appearance-none bg-transparent border-none p-0 m-0" />}>
                    <div className={`relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[220px] lg:h-[220px] drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ${hoveredIsland === island.id ? 'scale-110' : 'scale-100'}`}>
                      <Image
                        src={island.image}
                        alt={island.text}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain transition-transform duration-300 group-hover:scale-110 filter group-hover:brightness-110"
                      />
                    </div>
                    
                    {/* Floating Title Tag (Redesigned) */}
                    <div className={`
                      absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max z-20
                      overflow-hidden rounded-2xl
                      bg-gradient-to-b from-[#0b1420]/80 to-[#102A43]/80 
                      backdrop-blur-xl border border-white/20 
                      px-5 py-3 text-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] 
                      transition-all duration-300 ease-out
                      ${hoveredIsland === island.id ? 'opacity-100 translate-y-0 scale-100 ring-1 ring-[#E0B84B]/50' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}
                    `}>
                      {/* Glossy reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50" />
                      
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <p className="text-white text-sm md:text-base font-bold whitespace-normal leading-tight max-w-[220px] drop-shadow-md">
                          {island.text}
                        </p>
                        <div className="inline-flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full border border-white/10">
                          <Trophy size={12} className="text-[#E0B84B]" />
                          <p className="text-[#E0B84B] text-xs font-bold tracking-wider">
                            {islandEvents.length} إنجازات
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-[#0b1420]/80 backdrop-blur-2xl border border-white/10 text-white max-h-[85vh] overflow-y-auto rounded-3xl shadow-[0_0_50px_rgba(224,184,75,0.15)]" dir="rtl">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-[#E0B84B] to-amber-200 mb-6 drop-shadow-md">
                        {island.text}
                      </DialogTitle>
                    </DialogHeader>
                    
                    {islandEvents.length === 0 ? (
                      <div className="text-center text-gray-400 py-16 flex flex-col items-center gap-4">
                        <Trophy size={48} className="opacity-20" />
                        <p className="text-lg">لا توجد إنجازات مسجلة في هذا القسم حالياً</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                        {islandEvents.map(event => (
                          <Link href={`/events/${event.id}`} key={event.id} className="block group">
                            <div className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-[#E0B84B]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E0B84B]/10">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#E0B84B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full" />
                              <div className="flex gap-4 relative z-10">
                                <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0 bg-black/40 ring-1 ring-white/10 group-hover:ring-[#E0B84B]/30 transition-all">
                                  {event.coverImage ? (
                                    <Image src={event.coverImage} alt={event.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                      <Trophy size={32} />
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col flex-grow justify-between py-1">
                                  <h4 className="font-bold text-lg text-white group-hover:text-[#E0B84B] transition-colors line-clamp-2 leading-tight">
                                    {event.title}
                                  </h4>
                                  <div className="text-sm text-slate-300 mt-3 flex flex-col gap-2">
                                    <span className="flex items-center gap-2 bg-black/20 w-fit px-2 py-1 rounded-md border border-white/5"><CalendarDays size={14} className="text-[#E0B84B]"/> {new Date(event.startDate).getFullYear()}</span>
                                    {event.location && <span className="flex items-center gap-2 text-xs"><MapPin size={14} className="text-cyan-400"/> {event.location}</span>}
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
            </div>
          );
        })}
      </div>

      {/* Mobile 3D Spinning Dial Layout */}
      <div className="md:hidden w-full h-[650px] relative overflow-hidden flex items-center justify-center mt-2">
        
        {/* Swipe Hint */}
        <div className="absolute top-0 flex items-center gap-2 text-[#E0B84B]/60 text-sm animate-pulse z-30">
          <ChevronRight size={16} />
          <Hand size={16} />
          <span className="font-bold tracking-widest">اسحب للدوران</span>
          <ChevronLeft size={16} />
        </div>

        {/* Center Orb (scaled down for mobile) */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-[170px] h-[170px] rounded-full p-2
          bg-gradient-to-br from-[#0b1420]/90 to-[#102A43]/90 backdrop-blur-xl
          border-2 border-[#E0B84B]/40 shadow-[0_0_40px_rgba(224,184,75,0.2)]
          flex flex-col items-center justify-center text-center group"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,184,75,0.15)_0%,transparent_60%)] animate-pulse" />
          <div className="relative z-10 flex flex-col items-center gap-3">
             <h3 className="text-base font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 drop-shadow-md leading-tight">
               من عبدو باشا<br/>وجي بصوته
             </h3>
             <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#E0B84B] to-transparent" />
             <p className="text-base font-extrabold text-[#E0B84B] drop-shadow-md">
               يهز الدورة دي!!
             </p>
          </div>
          <div className="absolute inset-[-5px] rounded-full border-[1px] border-dashed border-[#E0B84B]/30 animate-[spin_20s_linear_infinite]" />
        </div>

        {/* Spinning Container */}
        <motion.div 
          className="absolute inset-0 z-20 touch-none"
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
          onPanEnd={handleDragEnd}
        >
          {islands.map((island, index) => {
            const baseAngle = index * (360 / islands.length);
            const isActive = index === activeIndex;
            const islandEvents = events.filter(e => e.eventType === island.category);

            return (
              <div 
                key={island.id} 
                className="absolute left-1/2 top-1/2 pointer-events-none"
                style={{
                  transform: `translate(-50%, -50%) rotate(${baseAngle}deg) translateY(-190px)` // Increased radius for bigger islands
                }}
              >
                <motion.div
                   animate={{ rotate: -rotation - baseAngle }} // Counter-rotate to stay upright!
                   transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                   className="pointer-events-auto"
                >
                  <Dialog>
                    <DialogTrigger render={<button type="button" className={`relative flex flex-col items-center transition-all duration-300 ${isActive ? 'scale-125 drop-shadow-[0_0_25px_rgba(224,184,75,0.5)] z-40' : 'scale-65 opacity-40 blur-[2px] z-10'}`} />}>
                      <div className="relative w-32 h-32 sm:w-36 sm:h-36">
                        <Image src={island.image} alt={island.text} fill sizes="150px" className="object-contain" />
                      </div>
                      <Badge variant="outline" className={`mt-2 font-bold transition-all duration-300 ${isActive ? 'border-[#E0B84B] text-[#E0B84B] bg-black/60 shadow-[0_0_10px_rgba(224,184,75,0.3)]' : 'border-white/20 text-white/50 bg-black/20'}`}>
                        {island.category}
                      </Badge>
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
                </motion.div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  );
}
