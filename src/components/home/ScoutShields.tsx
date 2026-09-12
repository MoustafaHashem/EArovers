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
              activeTab === tab.id ? "text-[var(--color-scout-navy)]" : "text-gray-300 hover:text-white bg-white/5"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-shield-tab"
                className="absolute inset-0 bg-[var(--color-scout-blue-light)] rounded-full -z-10 shadow-[0_0_15px_var(--color-glow-cyan)]"
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
            <h3 className="text-3xl font-black text-white mb-4 drop-shadow-md">{activeCategory.title}</h3>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl">{activeCategory.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {activeCategory.items.map((item, idx) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:glass-card-hover transition-all group"
                >
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-[var(--color-scout-blue-light)] font-medium text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
