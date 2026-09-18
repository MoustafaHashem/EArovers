"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { shieldsData } from "@/data/clanData";
import { cn } from "@/lib/utils";

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
        {shieldsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "whitespace-nowrap flex-shrink-0 relative px-6 py-3 rounded-full text-sm md:text-lg font-bold transition-colors z-10 overflow-hidden",
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
            <h3 className="text-3xl font-black text-[#0b1a30] dark:text-white mb-4 drop-shadow-sm">{activeCategory.title}</h3>
            <p className="text-[#475569] dark:text-slate-300 text-lg mb-10 max-w-2xl">{activeCategory.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {activeCategory.items.map((item, idx) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:glass-card-hover transition-all group"
                >
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4 bg-[#d4a373]/10 border border-[#d4a373]/25 dark:bg-cyan-500/10 dark:border-cyan-400/30 dark:shadow-[0_0_15px_rgba(0,240,255,0.15)] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-[#0b1a30] dark:text-white mb-2">{item.title}</h4>
                  <p className="text-[#64748b] dark:text-cyan-300 font-medium text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
