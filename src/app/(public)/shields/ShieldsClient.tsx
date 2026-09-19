"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

type ShieldType = {
  id: string;
  title: string;
  description: string | null;
  image?: string;
};

export function ShieldsClient({ initialShields }: { initialShields: ShieldType[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<ShieldType | null>(null);

  const filteredBadges = useMemo(() => {
    return initialShields.filter((badge) =>
      badge.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );
  }, [searchQuery, initialShields]);

  return (
    <>
      <AnimatePresence mode="wait">
        {selectedBadge ? (
          /* ================= DETAIL VIEW (WHEN CLICKED) ================= */
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-8"
          >
            <button
              onClick={() => setSelectedBadge(null)}
              className="px-5 py-2.5 bg-[#18385C] hover:bg-[#1D4470] text-[#8C9BAE] hover:text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              ← العودة إلى جميع الدروع
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left/Top Column: Shield Image & Header (4 cols) */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-6">
                <div className="relative group">
                  {/* Glowing background effect */}
                  <div className="absolute inset-0 bg-[#E0B84B]/20 blur-3xl rounded-full mix-blend-screen scale-150 transition-transform group-hover:scale-175 duration-700"></div>
                  
                  {selectedBadge.image && (
                    <motion.div 
                      layoutId={`shield-img-${selectedBadge.id}`}
                      className="relative w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0 z-10"
                    >
                      <Image
                        src={selectedBadge.image}
                        alt={selectedBadge.title}
                        fill
                        sizes="(max-width: 640px) 192px, 256px"
                        className="object-contain drop-shadow-[0_0_15px_rgba(224,184,75,0.4)]"
                      />
                    </motion.div>
                  )}
                </div>
                
                <div>
                  <motion.h1 
                    layoutId={`shield-title-${selectedBadge.id}`}
                    className="text-4xl font-black text-white drop-shadow-md"
                  >
                    {selectedBadge.title}
                  </motion.h1>
                  {selectedBadge.description && (
                    <p className="text-[#A7A9AC] text-base mt-4 max-w-md mx-auto leading-relaxed">
                      {selectedBadge.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Right/Bottom Column: Sections (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* SECTION 1 */}
                <motion.section 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-[#1D4E89]/20 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0B84B]/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-[#E0B84B]/10"></div>
                  <h2 className="text-2xl font-bold text-[#E0B84B] flex items-center gap-3 mb-6 relative z-10">
                    <span className="w-8 h-8 rounded-lg bg-[#E0B84B]/10 flex items-center justify-center text-[#E0B84B]">1</span>
                    القسم الأول
                  </h2>
                  <div className="text-[#A7A9AC] text-sm md:text-base min-h-[140px] flex items-center justify-center border border-dashed border-white/20 rounded-2xl bg-black/20 p-6 relative z-10">
                    <span className="text-center opacity-70">محتوى القسم الأول - يمكنك إضافة تفاصيل الدرع هنا</span>
                  </div>
                </motion.section>

                {/* SECTION 2 */}
                <motion.section 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#1D4E89]/20 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0B84B]/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-[#E0B84B]/10"></div>
                  <h2 className="text-2xl font-bold text-[#E0B84B] flex items-center gap-3 mb-6 relative z-10">
                    <span className="w-8 h-8 rounded-lg bg-[#E0B84B]/10 flex items-center justify-center text-[#E0B84B]">2</span>
                    القسم الثاني
                  </h2>
                  <div className="text-[#A7A9AC] text-sm md:text-base min-h-[140px] flex items-center justify-center border border-dashed border-white/20 rounded-2xl bg-black/20 p-6 relative z-10">
                    <span className="text-center opacity-70">محتوى القسم الثاني - يمكنك إضافة المتطلبات أو الشروط هنا</span>
                  </div>
                </motion.section>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ================= GRID DESIGN ================= */
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-8">
              <h1 className="text-3xl sm:text-4xl font-black text-white">الدروع الكشفية</h1>
              <input
                type="text"
                placeholder="بحث عن درع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md mt-4 px-4 py-3 rounded-xl bg-[#18385C] border border-white/10 focus:outline-none focus:border-[#E0B84B] text-right text-sm text-white placeholder-[#8C9BAE] shadow-inner"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-12 w-full">
              {filteredBadges.map((badge) => (
                <motion.div
                  layoutId={`shield-card-${badge.id}`}
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className="w-[calc(50%-1rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(20%-1.5rem)] bg-[#1D4E89]/20 border border-white/10 hover:border-[#E0B84B]/50 rounded-3xl p-0 pb-3 sm:pb-4 cursor-pointer transition-all hover:-translate-y-3 shadow-2xl flex flex-col items-center justify-start group overflow-hidden"
                >
                  {/* Massively increased image size in the grid cards */}
                  <div className="relative w-full aspect-square flex items-center justify-center transition-transform group-hover:scale-[1.3] duration-500 scale-125 mt-2">
                    {badge.image ? (
                      <motion.div layoutId={`shield-img-${badge.id}`} className="relative w-full h-full">
                        <Image
                          src={badge.image}
                          alt={badge.title}
                          fill
                          sizes="(max-width: 768px) 144px, (max-width: 1024px) 192px, 224px"
                          className="object-contain drop-shadow-2xl"
                        />
                      </motion.div>
                    ) : (
                      <span className="text-7xl sm:text-8xl">🛡️</span>
                    )}
                  </div>

                  <motion.h3 
                    layoutId={`shield-title-${badge.id}`}
                    className="font-bold text-base sm:text-lg lg:text-xl text-white pt-4 text-center leading-tight"
                  >
                    {badge.title}
                  </motion.h3>
                </motion.div>
              ))}
            </div>
            
            {filteredBadges.length === 0 && (
               <div className="text-center py-20 text-[#8C9BAE]">لا توجد دروع تطابق بحثك</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
