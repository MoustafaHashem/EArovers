import React from "react";
import Link from "next/link";
// Standard brand SVGs
const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const CloudIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
  </svg>
);

export function Identity() {
  return (
    <footer className="w-full bg-[#050b14] pt-20 pb-10 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right relative z-10">
        {/* Brand & Scarf */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-scout-blue)] to-[var(--color-anchor)] rounded-full flex items-center justify-center shadow-[0_0_15px_var(--color-scout-blue)] text-white font-black text-xl">
              ج
            </div>
            <span className="text-2xl font-black text-white tracking-wide">
              عشيرة جوالة هندسة
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            أعرق العشائر الكشفية بجامعة عين شمس. نبني قادة المستقبل ونعزز القيم
            والمبادئ الأصيلة لخدمة المجتمع.
          </p>

          {/* Mock Scarf Element */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-700 w-full max-w-xs relative overflow-hidden shadow-lg border border-yellow-300/30">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            <div className="relative z-10 flex items-center justify-between text-white font-bold">
              <span>منديل العشيرة</span>
              <span className="text-2xl">🎗️</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h4 className="text-white font-bold text-lg mb-2">روابط سريعة</h4>
          <a
            href="#hierarchy"
            className="text-gray-400 hover:text-[var(--color-scout-blue-light)] transition-colors"
          >
            الهيكل التنظيمي
          </a>
          <a
            href="/daro3"
            className="text-gray-400 hover:text-[var(--color-scout-blue-light)] transition-colors"
          >
            الدروع الكشفية
          </a>
          <a
            href="#fame"
            className="text-gray-400 hover:text-[var(--color-scout-blue-light)] transition-colors"
          >
            لوحة الشرف
          </a>
          <a
            href="#media"
            className="text-gray-400 hover:text-[var(--color-scout-blue-light)] transition-colors"
          >
            معرض الميديا
          </a>
          <a
            href="#join"
            className="text-gray-400 hover:text-[var(--color-scout-blue-light)] transition-colors"
          >
            انضم إلينا
          </a>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h4 className="text-white font-bold text-lg mb-2">تواصل معنا</h4>
          <p className="text-gray-400 mb-4">
            تابعنا على منصات التواصل الاجتماعي لمعرفة أحدث الأخبار والفعاليات.
          </p>

          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/scoutingteam.eas"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#1877F2] hover:text-white transition-colors"
              title="Facebook"
            >
              <FacebookIcon size={20} />
            </a>
            <a
              href="https://www.instagram.com/eng_asu_rovers/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#E4405F] hover:text-white transition-colors"
              title="Instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href="https://www.youtube.com/@eng_asurovers3282/featured"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#FF0000] hover:text-white transition-colors"
              title="YouTube"
            >
              <YoutubeIcon size={20} />
            </a>
            <a
              href="https://m.soundcloud.com/eng_asu-rovers"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#ff5500] hover:text-white transition-colors"
              title="SoundCloud"
            >
              <CloudIcon size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>
          © {new Date().getFullYear()} عشيرة جوالة كلية الهندسة جامعة عين شمس.
          جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
