"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ClanScarvesModal } from "./ClanScarvesModal";

// Standard brand SVGs
const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const CloudIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
  </svg>
);

export function Identity() {
  const [isScarvesModalOpen, setIsScarvesModalOpen] = useState(false);

  return (
    <footer className="w-full bg-[#f3f1ec] dark:bg-[#06090e] pt-20 pb-10 px-6 border-t border-[#d4a373]/20 dark:border-cyan-500/10 relative overflow-hidden transition-colors duration-400">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right relative z-10">
        
        {/* Brand & Scarf */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Logo.png"
                alt="شعار عشيرة جوالة هندسة"
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(22,30,53,0.15)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              />
            </div>
            <span className="text-2xl font-black text-[#161e35] dark:text-white tracking-wide group-hover:text-[#1e2746] dark:group-hover:text-cyan-300 transition-colors">
              عشيرة جوالة هندسة
            </span>
          </Link>
          <p className="text-[#475569] dark:text-slate-400 text-sm leading-relaxed max-w-xs">
            أعرق العشائر الكشفية بجامعة عين شمس. نبني قادة المستقبل ونعزز القيم والمبادئ الأصيلة لخدمة المجتمع.
          </p>
          
          {/* Scout Scarf Showcase (Clickable Modal Trigger) */}
          <button
            type="button"
            onClick={() => setIsScarvesModalOpen(true)}
            className="mt-2 flex flex-col items-center p-4 pb-4.5 rounded-3xl bg-white/80 dark:bg-[#0d1527]/75 border border-[#d4a373]/25 dark:border-cyan-500/20 shadow-md dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md w-full max-w-[260px] group hover:border-[#d4a373]/50 dark:hover:border-cyan-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer text-center relative focus:outline-none focus:ring-2 focus:ring-[#d4a373]/40 dark:focus:ring-cyan-400/40"
            aria-label="عرض تفاصيل مناديل العشيرة"
          >
            <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center mb-2">
              {/* Subtle ambient back-glow */}
              <div className="absolute inset-0 bg-[#161e35]/10 dark:bg-cyan-500/15 rounded-full blur-xl pointer-events-none group-hover:scale-115 transition-transform duration-500" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/clan-scarf.png"
                alt="منديل عشيرة جوالة هندسة"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(22,30,53,0.25)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-base font-black text-[#161e35] dark:text-white tracking-wide pb-0.5 group-hover:text-[#1e2746] dark:group-hover:text-cyan-300 transition-colors">
              منديل العشيرة
            </span>
            <span className="text-[11px] font-medium text-[#8c5e2d] dark:text-cyan-400/90 flex items-center gap-1 group-hover:underline">
              <span>انقر للتفاصيل</span>
              <span className="text-xs">✦</span>
            </span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h4 className="text-[#0b1a30] dark:text-white font-bold text-lg mb-2">روابط سريعة</h4>
          <Link href="/hierarchy" className="text-[#475569] hover:text-[#161e35] dark:text-slate-400 dark:hover:text-cyan-300 transition-colors">الهيكل التنظيمي</Link>
          <Link href="/shields" className="text-[#475569] hover:text-[#161e35] dark:text-slate-400 dark:hover:text-cyan-300 transition-colors">الدروع الكشفية</Link>
          <a href="#fame" className="text-[#475569] hover:text-[#161e35] dark:text-slate-400 dark:hover:text-cyan-300 transition-colors">لوحة الشرف</a>
          <a href="#media" className="text-[#475569] hover:text-[#161e35] dark:text-slate-400 dark:hover:text-cyan-300 transition-colors">معرض الميديا</a>
          <a href="#join" className="text-[#475569] hover:text-[#161e35] dark:text-slate-400 dark:hover:text-cyan-300 transition-colors">انضم إلينا</a>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h4 className="text-[#0b1a30] dark:text-white font-bold text-lg mb-2">تواصل معنا</h4>
          <p className="text-[#475569] dark:text-slate-400 mb-4">تابعنا على منصات التواصل الاجتماعي لمعرفة أحدث الأخبار والفعاليات.</p>
          
          <div className="flex gap-4">
            <a href="https://www.facebook.com/scoutingteam.eas" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 flex items-center justify-center text-[#475569] dark:text-slate-300 hover:text-[#1877F2] dark:hover:text-[#ffd700] dark:hover:border-[#ffd700]/50 transition-colors shadow-sm" title="Facebook">
              <FacebookIcon size={20} />
            </a>
            <a href="https://www.instagram.com/eng_asu_rovers/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 flex items-center justify-center text-[#475569] dark:text-slate-300 hover:text-[#E4405F] dark:hover:text-[#ffd700] dark:hover:border-[#ffd700]/50 transition-colors shadow-sm" title="Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href="https://www.youtube.com/@eng_asurovers3282/featured" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 flex items-center justify-center text-[#475569] dark:text-slate-300 hover:text-[#FF0000] dark:hover:text-[#ffd700] dark:hover:border-[#ffd700]/50 transition-colors shadow-sm" title="YouTube">
              <YoutubeIcon size={20} />
            </a>
            <a href="https://m.soundcloud.com/eng_asu-rovers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 flex items-center justify-center text-[#475569] dark:text-slate-300 hover:text-[#ff5500] dark:hover:text-[#ffd700] dark:hover:border-[#ffd700]/50 transition-colors shadow-sm" title="SoundCloud">
              <CloudIcon size={20} />
            </a>
          </div>
        </div>

      </div>

      <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/5 text-center text-[#64748b] dark:text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} عشيرة جوالة كلية الهندسة جامعة عين شمس. جميع الحقوق محفوظة.</p>
      </div>

      {/* Clan Scarves Modal */}
      <ClanScarvesModal
        isOpen={isScarvesModalOpen}
        onClose={() => setIsScarvesModalOpen(false)}
      />
    </footer>
  );
}
