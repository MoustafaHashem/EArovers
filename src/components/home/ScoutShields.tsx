"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { shieldsData } from "@/data/clanData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { ChevronLeft, ArrowLeft } from "lucide-react";

export function ScoutShields() {
  const [activeTab, setActiveTab] = useState(shieldsData[0].id);

  const activeCategory = shieldsData.find((s) => s.id === activeTab)!;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      
      {/* Tabs Header */}
      <div 
        className="flex overflow-x-auto md:flex-wrap justify-start md:justify-center items-center gap-2 mb-12 w-full max-w-[95vw] md:max-w-full px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {shieldsData.slice(0, 3).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "whitespace-nowrap flex-shrink-0 relative px-6 py-3 rounded-full text-sm md:text-lg font-bold transition-colors z-10 overflow-hidden cursor-pointer",
              activeTab === tab.id 
                ? "text-[#0b1a30] dark:text-[#080b10]" 
                : "text-[#475569] hover:text-[#0b1a30] bg-[#f0eee6] hover:bg-[#e8e5dc] dark:text-slate-300 dark:hover:text-white dark:bg-white/5"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-shield-tab"
                className="absolute inset-0 bg-gradient-to-r from-[#e0a96d] to-[#d4a373] dark:from-[#00f0ff] dark:to-[#38f4ff] rounded-full -z-10 shadow-[0_2px_12px_rgba(212,163,115,0.3)] dark:shadow-[0_0_20px_#00f0ff]"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{tab.title}</span>
          </button>
        ))}

        {/* 4th Tab: "عرض المزيد" Link to /shields */}
        <Link
          href="/shields"
          className="whitespace-nowrap flex-shrink-0 relative px-6 py-3 rounded-full text-sm md:text-lg font-bold transition-all z-10 overflow-hidden cursor-pointer text-[#475569] hover:text-[#0b1a30] bg-[#f0eee6] hover:bg-[#e8e5dc] dark:text-slate-300 dark:hover:text-white dark:bg-white/5 border border-dashed border-[#d4a373]/50 dark:border-cyan-500/30 hover:border-solid hover:border-[#d4a373] dark:hover:border-cyan-400 hover:scale-105 active:scale-95 flex items-center gap-1.5"
          title="عرض جميع الدروع"
        >
          <span>عرض المزيد</span>
          <ChevronLeft size={18} />
        </Link>
      </div>

      {/* Content Area */}
      <div className="w-full relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center w-full"
          >
            {/* Shield Image */}
            <Link
              href={`/shields?shield=${activeCategory.id}`}
              className="relative w-64 h-52 md:w-80 md:h-64 mb-6 flex items-center justify-center overflow-visible cursor-pointer group/shield"
              title={`عرض تفاصيل ${activeCategory.title}`}
            >
              <Image
                src={activeCategory.image}
                alt={activeCategory.title}
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className="object-contain scale-125 md:scale-140 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_10px_25px_rgba(0,240,255,0.25)] transition-transform duration-300 group-hover/shield:scale-130 md:group-hover/shield:scale-145"
                priority
              />
            </Link>
            
            {(() => {
              const hasMore = activeCategory.items.length > 3;
              const displayedItems = hasMore ? activeCategory.items.slice(0, 2) : activeCategory.items;

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {displayedItems.map((item, idx) => (
                    <motion.div 
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <Link
                        href={`/shields?shield=${activeCategory.id}&field=${encodeURIComponent(item.title)}`}
                        className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:glass-card-hover transition-all group min-h-[140px] cursor-pointer hover:-translate-y-1.5 shadow-sm hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] block w-full"
                        title={`عرض مجال ${item.title}`}
                      >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3 bg-[#d4a373]/10 border border-[#d4a373]/25 dark:bg-cyan-500/10 dark:border-cyan-400/30 dark:shadow-[0_0_15px_rgba(0,240,255,0.15)] group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <h4 className="text-xl font-bold text-[#0b1a30] dark:text-white group-hover:text-[#d4a373] dark:group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h4>
                      </Link>
                    </motion.div>
                  ))}

                  {hasMore && (
                    <motion.div 
                      key="show-more"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 2 * 0.1 }}
                    >
                      <Link
                        href={`/shields?shield=${activeCategory.id}`}
                        className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:glass-card-hover transition-all group min-h-[140px] cursor-pointer hover:-translate-y-1.5 shadow-sm hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] border border-dashed border-[#d4a373]/40 dark:border-cyan-500/30 hover:border-solid hover:border-[#d4a373] dark:hover:border-cyan-400 block w-full bg-[#d4a373]/5 dark:bg-cyan-500/5"
                        title={`عرض جميع مجالات ${activeCategory.title}`}
                      >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-3 bg-[#d4a373]/15 border border-[#d4a373]/30 dark:bg-cyan-500/15 dark:border-cyan-400/40 text-[#0b1a30] dark:text-cyan-300 group-hover:scale-110 transition-transform">
                          <ArrowLeft className="w-7 h-7 transition-transform group-hover:-translate-x-1" />
                        </div>
                        <h4 className="text-xl font-bold text-[#0b1a30] dark:text-white group-hover:text-[#d4a373] dark:group-hover:text-cyan-300 transition-colors">
                          عرض المزيد
                        </h4>
                      </Link>
                    </motion.div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
