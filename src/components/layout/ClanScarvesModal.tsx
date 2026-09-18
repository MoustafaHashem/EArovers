"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface ClanScarvesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScarfItem {
  id: string;
  title: string;
  role: string;
  badge: string;
  image: string;
  alt: string;
  badgeClass: string;
  borderHoverClass: string;
  glowClass: string;
  isFeatured?: boolean;
}

const scarves: ScarfItem[] = [
  // 1. Right (First item in RTL): منديل هيكل العشيرة (الخط الأحمر)
  {
    id: "board",
    title: "هيكل العشيرة",
    role: "مجلس الإدارة ومسؤولو اللجان",
    badge: "الهيكل الإداري",
    image: "/images/scarfs/board-scarf.png",
    alt: "منديل هيكل عشيرة جوالة هندسة ذو الخط الأحمر",
    badgeClass: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20",
    borderHoverClass: "hover:border-red-500/40 dark:hover:border-red-400/50",
    glowClass: "from-red-500/15 via-rose-500/5 to-transparent",
  },
  // 2. Center (Middle item): منديل قائد العشيرة / قائدة المرشدات (اللبني)
  {
    id: "leader",
    title: "قائد العشيرة / قائدة المرشدات",
    role: "القيادة العامة للعشيرة والمرشدات",
    badge: "القيادة العليا",
    image: "/images/scarfs/leader-scarf.png",
    alt: "منديل قائد العشيرة وقائدة المرشدات اللبني",
    badgeClass: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
    borderHoverClass: "hover:border-amber-500/50 dark:hover:border-amber-400/60",
    glowClass: "from-blue-500/20 via-cyan-400/10 to-transparent",
    isFeatured: true,
  },
  // 3. Left (Last item in RTL): منديل أعضاء العشيرة (الخط اللبني/التركواز)
  {
    id: "member",
    title: "أعضاء العشيرة",
    role: "جوالو ومرشدات عشيرة الهندسة",
    badge: "عضوية العشيرة",
    image: "/images/scarfs/member-scarf.png",
    alt: "منديل أعضاء عشيرة جوالة هندسة ذو الخط اللبني",
    badgeClass: "bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border-cyan-500/20",
    borderHoverClass: "hover:border-cyan-500/40 dark:hover:border-cyan-400/50",
    glowClass: "from-cyan-500/15 via-blue-500/5 to-transparent",
  },
];

export function ClanScarvesModal({ isOpen, onClose }: ClanScarvesModalProps) {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-md transition-all cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="clan-scarves-title"
            className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#fcfbf7] dark:bg-[#0c1322] border border-[#d4a373]/30 dark:border-cyan-500/25 shadow-2xl dark:shadow-[0_20px_70px_rgba(0,0,0,0.85)] p-5 sm:p-7 md:p-9 text-right transition-colors"
          >
            {/* Ambient decorative glow at top */}
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-80 h-36 bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl rounded-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-4 left-4 sm:top-6 sm:left-6 w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#161e35] dark:text-white transition-all cursor-pointer z-20 active:scale-95"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#d4a373]/15 dark:bg-cyan-500/10 text-[#8c5e2d] dark:text-cyan-300 border border-[#d4a373]/30 dark:border-cyan-500/20 mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>تقاليد وشارات الكشفية</span>
              </div>
              <h2
                id="clan-scarves-title"
                className="text-2xl sm:text-3xl md:text-4xl font-black text-[#161e35] dark:text-white tracking-wide mb-2.5"
              >
                مناديل العشيرة
              </h2>
              <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300 max-w-xl leading-relaxed">
                رمز الانتماء والفخر الكشفي، يحمل كل منديل دلالات وألوان تميز مختلف الرتب والمسؤوليات داخل عشيرة جوالة كلية الهندسة.
              </p>
            </div>

            {/* Scarves Showcase Grid (3 Columns on Desktop, Responsive on Mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 relative z-10">
              {scarves.map((scarf) => {
                return (
                  <div
                    key={scarf.id}
                    className={`group relative flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-white/85 dark:bg-[#121b2f]/80 border transition-all duration-300 shadow-sm hover:shadow-xl backdrop-blur-sm hover:-translate-y-1.5 ${
                      scarf.isFeatured
                        ? "border-[#d4a373]/50 dark:border-amber-400/40 ring-1 ring-[#d4a373]/20 dark:ring-amber-400/20 md:-translate-y-2 md:hover:-translate-y-3"
                        : "border-[#d4a373]/25 dark:border-slate-800"
                    } ${scarf.borderHoverClass}`}
                  >
                    {/* Top featured badge if leader */}
                    {scarf.isFeatured && (
                      <div className="absolute -top-3 right-1/2 translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>الرتبة القيادية</span>
                      </div>
                    )}

                    {/* Scarf Image Container with Ambient Glow */}
                    <div className="relative w-full h-44 sm:h-48 md:h-52 flex items-center justify-center my-2">
                      <div
                        className={`absolute inset-0 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b ${scarf.glowClass} pointer-events-none`}
                      />
                      <div className="relative z-10 w-full h-full max-w-[200px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={scarf.image}
                          alt={scarf.alt}
                          width={260}
                          height={260}
                          priority
                          className="w-full h-full object-contain filter drop-shadow-[0_10px_18px_rgba(22,30,53,0.22)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
                        />
                      </div>
                    </div>

                    {/* Category / Role Badge */}
                    <span
                      className={`inline-block text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-2 ${scarf.badgeClass}`}
                    >
                      {scarf.badge}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#161e35] dark:text-white tracking-wide mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {scarf.title}
                    </h3>

                    {/* Role Description */}
                    <p className="text-xs sm:text-sm text-[#64748b] dark:text-slate-400 leading-snug">
                      {scarf.role}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-5 border-t border-black/10 dark:border-white/10 text-center">
              <p className="text-xs text-[#64748b] dark:text-slate-400">
                يُرتدى المنديل الكشفي بكل فخر واعتزاز، ويُعد ميثاقاً للعهد والخدمة العامة وتوارث قيم العشيرة عبر الأجيال.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
