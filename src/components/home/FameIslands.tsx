"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, ChevronLeft } from "lucide-react";
import { FAME_CATEGORIES, FameCategory } from "@/data/fameCategories";
import { getTournamentsByCategory } from "@/data/tournamentsData";

interface FameIslandsProps {
  events?: any[];
  showTitle?: boolean;
}

export function FameIslands({ showTitle = false }: FameIslandsProps) {
  const [hoveredIsland, setHoveredIsland] = useState<number | null>(null);

  const getIslandTournamentsCount = (category: FameCategory) => {
    return getTournamentsByCategory(category.slug).length;
  };

  return (
    <div className="w-full hidden md:flex flex-col items-center py-4 relative" dir="rtl">
      {showTitle && (
        <div className="text-center mb-10 px-4 z-10">
          <h2 className="text-3xl md:text-5xl font-black text-[#0b1a30] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#E0B84B] dark:via-amber-200 dark:to-[#E0B84B] flex items-center justify-center gap-4 mb-4 drop-shadow-sm">
            <Trophy className="text-[#d4a373] dark:text-[#E0B84B] drop-shadow-md" size={44} />
            لوحة الشرف والبطولات
          </h2>
          <p className="text-[#64748b] dark:text-gray-300 text-base md:text-lg max-w-3xl mx-auto font-medium">
            تاريخ حافل بالبطولات والإنجازات الكشفية على مدار السنين
          </p>
        </div>
      )}

      {/* Desktop Circular 3D Islands Layout */}
      <div className="relative w-full max-w-6xl h-[900px] lg:h-[1000px] mx-auto">
        {/* Decorative Background Glow Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,163,115,0.12)_0%,transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(224,184,75,0.08)_0%,transparent_60%)]" />

        {/* Center Emblem/Quote Component */}
        <div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] lg:w-[350px] lg:h-[350px] rounded-full p-8
          bg-white/90 dark:bg-gradient-to-br dark:from-[#0b1420]/95 dark:to-[#102A43]/95 backdrop-blur-xl
          border-4 border-[#d4a373]/40 dark:border-[#E0B84B]/40 shadow-2xl dark:shadow-[0_0_60px_rgba(224,184,75,0.25)]
          overflow-visible group"
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,163,115,0.2)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(224,184,75,0.15)_0%,transparent_60%)] group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10 flex flex-col items-center text-center gap-4 lg:gap-5">
              <h3 className="text-xl lg:text-3xl font-black leading-relaxed text-[#0b1a30] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:via-blue-100 dark:to-blue-300 drop-shadow-sm">
                من عبدو باشا
                <br />
                وجي بصوته
              </h3>

              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#d4a373] dark:via-[#E0B84B] to-transparent rounded-full opacity-80" />

              <p className="text-2xl lg:text-4xl font-black text-[#d4a373] dark:text-[#E0B84B] drop-shadow-sm tracking-wide">
                يهز الدورة دي!!
              </p>
            </div>

            {/* Rotating decorative dashed border */}
            <div className="absolute inset-[-10px] rounded-full border-[1.5px] border-dashed border-[#d4a373]/40 dark:border-[#E0B84B]/30 animate-[spin_35s_linear_infinite]" />
          </div>
        </div>

        {/* 5 Islands arranged symmetrically around the circle (72 deg apart) */}
        {FAME_CATEGORIES.map((island, index) => {
          const angle = -90 + index * (360 / FAME_CATEGORIES.length);
          const tournamentsCount = getIslandTournamentsCount(island);

          return (
            <div
              key={island.id}
              className="absolute left-1/2 top-1/2 transition-all duration-500 ease-out"
              style={{
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translateX(clamp(230px, 32vw, 390px))
                  rotate(${-angle}deg)
                `,
                zIndex: hoveredIsland === island.id ? 50 : 20,
              }}
              onMouseEnter={() => setHoveredIsland(island.id)}
              onMouseLeave={() => setHoveredIsland(null)}
            >
              <div
                className="animate-floating"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <Link
                  href={`/fame/${island.slug}`}
                  className="relative cursor-pointer group flex flex-col items-center appearance-none bg-transparent border-none p-0 m-0"
                >
                  {/* Island 3D Graphic */}
                  <div
                    className={`relative w-[170px] h-[220px] lg:w-[210px] lg:h-[270px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] transition-all duration-300 ${
                      hoveredIsland === island.id
                        ? "scale-110 drop-shadow-[0_25px_40px_rgba(212,163,115,0.4)] dark:drop-shadow-[0_25px_40px_rgba(224,184,75,0.4)]"
                        : "scale-100"
                    }`}
                  >
                    <Image
                      src={island.image}
                      alt={island.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-105 filter group-hover:brightness-105"
                      priority={index < 2}
                    />
                  </div>

                  {/* Floating Title & Action Tag */}
                  <div
                    className={`
                    absolute top-[85%] left-1/2 -translate-x-1/2 mt-2 w-max min-w-[190px] z-30
                    overflow-hidden rounded-2xl
                    bg-white/90 dark:bg-gradient-to-b dark:from-[#0b1420]/95 dark:to-[#102A43]/95 
                    backdrop-blur-xl border border-[#d4a373]/30 dark:border-white/20 
                    px-5 py-3 text-center shadow-xl dark:shadow-[0_12px_36px_rgba(0,0,0,0.4)] 
                    transition-all duration-300 ease-out
                    ${
                      hoveredIsland === island.id
                        ? "opacity-100 translate-y-0 scale-100 ring-2 ring-[#d4a373] dark:ring-[#E0B84B]"
                        : "opacity-95 translate-y-0 scale-95"
                    }
                  `}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center gap-1.5">
                      <p className="text-[#0b1a30] dark:text-white text-base lg:text-lg font-black tracking-wide drop-shadow-sm">
                        {island.name}
                      </p>
                      <div className="inline-flex items-center gap-1.5 bg-black/5 dark:bg-black/40 px-3 py-0.5 rounded-full border border-black/5 dark:border-white/10">
                        <Trophy size={12} className="text-[#d4a373] dark:text-[#E0B84B]" />
                        <span className="text-[#0b1a30] dark:text-[#E0B84B] text-xs font-bold">
                          {tournamentsCount} بطولات
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-[#161e35] dark:text-amber-300/80 group-hover:text-[#0b1a30] dark:group-hover:text-amber-300 flex items-center gap-1 mt-0.5">
                        <span>تصفح المسابقات</span>
                        <ChevronLeft
                          size={12}
                          className="group-hover:-translate-x-0.5 transition-transform"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
