"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
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

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
);

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

export function Identity() {
  const [isScarvesModalOpen, setIsScarvesModalOpen] = useState(false);

  return (
    <footer className="w-full bg-[#f3f1ec] dark:bg-[#06090e] pt-16 md:pt-20 pb-10 px-6 border-t border-[#d4a373]/20 dark:border-cyan-500/10 relative overflow-hidden transition-colors duration-400">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#d4a373]/5 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#161e35]/5 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 text-right relative z-10">
        
        {/* Col 1: Brand & Scarf Badge */}
        <div className="flex flex-col items-center sm:items-start gap-5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 md:w-13 md:h-13 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Logo.png"
                alt="شعار عشيرة جوالة هندسة"
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(22,30,53,0.15)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-[#161e35] dark:text-white tracking-wide group-hover:text-[#1e2746] dark:group-hover:text-cyan-300 transition-colors">
                عشيرة جوالة هندسة
              </span>
              <span className="text-[11px] font-bold text-[#8c5e2d] dark:text-cyan-400/90 -mt-0.5">
                جامعة عين شمس
              </span>
            </div>
          </Link>
          <p className="text-[#475569] dark:text-slate-400 text-xs md:text-sm leading-relaxed max-w-xs text-center sm:text-right">
            أعرق العشائر الكشفية بجامعة عين شمس. نبني قادة المستقبل ونعزز القيم والمبادئ الأصيلة لخدمة وتنمية المجتمع.
          </p>
          
          {/* Scout Scarf Showcase Card (Clickable Modal Trigger) */}
          <button
            type="button"
            onClick={() => setIsScarvesModalOpen(true)}
            className="mt-1 flex flex-col items-center p-3.5 pb-4 rounded-2xl bg-white/80 dark:bg-[#0d1527]/75 border border-[#d4a373]/25 dark:border-cyan-500/20 shadow-md dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md w-full max-w-[240px] group hover:border-[#d4a373]/50 dark:hover:border-cyan-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer text-center relative focus:outline-none focus:ring-2 focus:ring-[#d4a373]/40 dark:focus:ring-cyan-400/40"
            aria-label="عرض تفاصيل مناديل العشيرة"
          >
            <div className="relative w-28 h-28 flex items-center justify-center mb-1">
              <div className="absolute inset-0 bg-[#161e35]/10 dark:bg-cyan-500/15 rounded-full blur-xl pointer-events-none group-hover:scale-115 transition-transform duration-500" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/clan-scarf.png"
                alt="منديل عشيرة جوالة هندسة"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_8px_14px_rgba(22,30,53,0.25)] dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-sm font-black text-[#161e35] dark:text-white tracking-wide pb-0.5 group-hover:text-[#1e2746] dark:group-hover:text-cyan-300 transition-colors">
              منديل العشيرة
            </span>
            <span className="text-[11px] font-semibold text-[#8c5e2d] dark:text-cyan-400/90 flex items-center gap-1 group-hover:underline">
              <span>انقر لاستعراض المناديل</span>
              <span className="text-xs">✦</span>
            </span>
          </button>
        </div>

        {/* Col 2: Quick Links */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          <h4 className="text-[#0b1a30] dark:text-white font-bold text-base md:text-lg mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d4a373] dark:bg-cyan-400" />
            روابط سريعة
          </h4>
          <nav className="flex flex-col gap-2.5 text-xs md:text-sm text-center sm:text-right w-full">
            <Link href="/hierarchy" className="text-[#475569] hover:text-[#161e35] dark:text-slate-400 dark:hover:text-cyan-300 transition-colors py-0.5">
              الهيكل التنظيمي
            </Link>
            <Link href="/shields" className="text-[#475569] hover:text-[#161e35] dark:text-slate-400 dark:hover:text-cyan-300 transition-colors py-0.5">
              الدروع الكشفية
            </Link>
            <Link href="/fame" className="text-[#475569] hover:text-[#161e35] dark:text-slate-400 dark:hover:text-cyan-300 transition-colors py-0.5">
              لوحة الشرف
            </Link>
            <Link href="/gallery" className="text-[#475569] hover:text-[#161e35] dark:text-slate-400 dark:hover:text-cyan-300 transition-colors py-0.5">
              معرض الصور والميديا
            </Link>
            <Link href="/events" className="text-[#475569] hover:text-[#161e35] dark:text-slate-400 dark:hover:text-cyan-300 transition-colors py-0.5">
              فعاليات وأنشطة العشيرة
            </Link>
            <Link href="/join" className="text-[#8c5e2d] dark:text-cyan-400 font-bold hover:underline transition-all py-0.5 flex items-center justify-center sm:justify-start gap-1">
              <span>انضم إلى العشيرة</span>
              <span className="text-xs">←</span>
            </Link>
          </nav>
        </div>

        {/* Col 3: Direct Contact (Phone & Email) */}
        <div className="flex flex-col items-center sm:items-start gap-3 w-full">
          <h4 className="text-[#0b1a30] dark:text-white font-bold text-base md:text-lg mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#161e35] dark:bg-cyan-400" />
            بيانات التواصل
          </h4>
          <p className="text-[#475569] dark:text-slate-400 text-xs leading-relaxed max-w-xs text-center sm:text-right mb-1">
            نسعد بالتواصل المباشر مع قيادة العشيرة للاستفسارات والتنسيق الكشفي:
          </p>

          <div className="flex flex-col gap-2.5 w-full max-w-[270px]">
            {/* Phone Card (Leader) */}
            <div className="p-3 rounded-2xl bg-white/75 dark:bg-white/[0.04] border border-[#d4a373]/25 dark:border-white/10 hover:border-[#161e35]/35 dark:hover:border-cyan-400/40 transition-all group shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#161e35]/10 dark:bg-cyan-500/15 text-[#161e35] dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={14} />
                  </div>
                  <span className="text-xs font-bold text-[#64748b] dark:text-slate-400">قائد العشيرة</span>
                </div>
                <a
                  href="https://wa.me/201158400222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] dark:text-[#25D366] border border-[#25D366]/30 transition-colors"
                  title="محادثة واتساب"
                >
                  <WhatsAppIcon size={11} />
                  <span>واتساب</span>
                </a>
              </div>
              <a
                href="tel:+201158400222"
                dir="ltr"
                className="text-sm font-extrabold text-[#0b1a30] dark:text-white hover:text-[#161e35] dark:hover:text-cyan-300 transition-colors block text-right font-sans tracking-wide"
              >
                +20 11 58400222
              </a>
            </div>

            {/* Email Card */}
            <a
              href="mailto:contact@earovers.me"
              className="p-3 rounded-2xl bg-white/75 dark:bg-white/[0.04] border border-[#d4a373]/25 dark:border-white/10 hover:border-[#161e35]/35 dark:hover:border-cyan-400/40 transition-all group block shadow-sm"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-[#161e35]/10 dark:bg-cyan-500/15 text-[#161e35] dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail size={14} />
                </div>
                <span className="text-xs font-bold text-[#64748b] dark:text-slate-400">البريد الإلكتروني</span>
              </div>
              <span
                dir="ltr"
                className="text-xs md:text-sm font-bold text-[#0b1a30] dark:text-white group-hover:text-[#161e35] dark:group-hover:text-cyan-300 transition-colors block text-right font-sans"
              >
                contact@earovers.me
              </span>
            </a>
          </div>
        </div>

        {/* Col 4: Headquarters & Social */}
        <div className="flex flex-col items-center sm:items-start gap-3 w-full">
          <h4 className="text-[#0b1a30] dark:text-white font-bold text-base md:text-lg mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d4a373] dark:bg-cyan-400" />
            المقر والموقع
          </h4>

          {/* Location Card with Google Maps Link */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Faculty+of+Engineering+Ain+Shams+University+1+El+Sarayat+St+Abbasseya+Cairo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-white/75 dark:bg-white/[0.04] border border-[#d4a373]/25 dark:border-white/10 hover:border-[#161e35]/35 dark:hover:border-cyan-400/40 transition-all group block w-full max-w-[270px] text-right shadow-sm"
          >
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#e0a96d]/20 dark:bg-cyan-500/15 text-[#8c5e2d] dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                <MapPin size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-black text-[#0b1a30] dark:text-white leading-tight">
                    كلية الهندسة جامعة عين شمس
                  </span>
                  <ExternalLink size={12} className="text-[#64748b] dark:text-slate-400 group-hover:text-[#161e35] dark:group-hover:text-cyan-300 shrink-0" />
                </div>
                <p className="text-[11px] font-medium text-[#475569] dark:text-slate-300 leading-snug">
                  1 شارع السرايات، العباسية، الوايلي، القاهرة 11535
                </p>
                <span dir="ltr" className="text-[10px] text-[#64748b] dark:text-slate-500 block mt-1 text-right font-sans opacity-90">
                  1 El Sarayat St., Abbassiya, Cairo 11535
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8c5e2d] dark:text-cyan-400 mt-2 group-hover:underline">
                  <span>فتح في خرائط Google</span>
                  <span className="text-xs">↗</span>
                </span>
              </div>
            </div>
          </a>

          {/* Social Platforms */}
          <div className="w-full max-w-[270px] pt-1">
            <span className="text-xs font-bold text-[#64748b] dark:text-slate-400 block mb-2 text-center sm:text-right">
              تابعنا على المنصات الكشفية
            </span>
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <a
                href="https://www.facebook.com/scoutingteam.eas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 flex items-center justify-center text-[#475569] dark:text-slate-300 hover:text-[#1877F2] dark:hover:text-cyan-300 dark:hover:border-cyan-400/50 hover:scale-105 transition-all shadow-sm"
                title="Facebook"
              >
                <FacebookIcon size={17} />
              </a>
              <a
                href="https://www.instagram.com/eng_asu_rovers/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 flex items-center justify-center text-[#475569] dark:text-slate-300 hover:text-[#E4405F] dark:hover:text-cyan-300 dark:hover:border-cyan-400/50 hover:scale-105 transition-all shadow-sm"
                title="Instagram"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href="https://www.youtube.com/@eng_asurovers3282/featured"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 flex items-center justify-center text-[#475569] dark:text-slate-300 hover:text-[#FF0000] dark:hover:text-cyan-300 dark:hover:border-cyan-400/50 hover:scale-105 transition-all shadow-sm"
                title="YouTube"
              >
                <YoutubeIcon size={17} />
              </a>
              <a
                href="https://www.tiktok.com/@eng_asu.rovers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 flex items-center justify-center text-[#475569] dark:text-slate-300 hover:text-[#010101] dark:hover:text-cyan-300 dark:hover:border-cyan-400/50 hover:scale-105 transition-all shadow-sm"
                title="TikTok"
              >
                <TikTokIcon size={17} />
              </a>
              <a
                href="https://m.soundcloud.com/eng_asu-rovers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white dark:bg-white/5 border border-[#d4a373]/20 dark:border-white/10 flex items-center justify-center text-[#475569] dark:text-slate-300 hover:text-[#ff5500] dark:hover:text-cyan-300 dark:hover:border-cyan-400/50 hover:scale-105 transition-all shadow-sm"
                title="SoundCloud"
              >
                <CloudIcon size={17} />
              </a>
            </div>
          </div>
        </div>


      </div>

      {/* Bottom Bar: Copyright & Clan Motto */}
      <div className="mt-14 pt-6 border-t border-black/10 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right text-[#64748b] dark:text-slate-500 text-xs max-w-7xl mx-auto relative z-10">
        <p>© {new Date().getFullYear()} عشيرة جوالة كلية الهندسة جامعة عين شمس. جميع الحقوق محفوظة.</p>
        <div className="flex items-center gap-2 font-medium">
          <span className="text-[#8c5e2d] dark:text-cyan-400">كُن مستعداً ⚜️</span>
          <span>•</span>
          <span>خدمة - تنمية - قيادة</span>
        </div>
      </div>

      {/* Clan Scarves Modal */}
      <ClanScarvesModal
        isOpen={isScarvesModalOpen}
        onClose={() => setIsScarvesModalOpen(false)}
      />
    </footer>
  );
}

