"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export type HeroSlide = {
  id: number;
  image: string;
  badge?: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: "/images/hero/hero-1.jpg",
    badge: "أعرق العشائر الكشفية الجامعية",
    title: "عشيرة جوالة هندسة جامعة عين شمس: قصة عائلة من جيل إلى جيل",
    subtitle: "نوثق إرثنا، تاريخنا، وأنشطتنا المستمرة",
    buttonText: "انضم إلينا",
    buttonLink: "/join",
  },
  {
    id: 2,
    image: "/images/hero/hero-2.jpg",
    badge: "البطولات والتنافس الكشفي",
    title: "تنافس وتميز: مشاركاتنا في البطولات الكشفية",
    subtitle: "نرفع اسم عشيرتنا في كل محفل",
    buttonText: "استكشاف المسابقات",
    buttonLink: "/shields",
  },
  {
    id: 3,
    image: "/images/hero/hero-3.jpg",
    badge: "الإبداع والابتكار",
    title: "التحدي والإبداع: مسابقات المهارات الفنية",
    subtitle: "نبتكر ونتميز بمهاراتنا المتعددة",
    buttonText: "استكشاف المسابقات",
    buttonLink: "/shields",
  },
  {
    id: 4,
    image: "/images/hero/hero-4.jpg",
    badge: "قيم وريادة",
    title: "قيادة وقيم: شجرة عشيرتنا العريقة",
    subtitle: "من نحن، وما هي قيمنا الجوهرية؟",
    buttonText: "اعرف احنا مين",
    buttonLink: "/hierarchy",
  },
  {
    id: 5,
    image: "/images/hero/hero-5-community.jpg",
    badge: "الخدمة العامة والمجتمعية",
    title: "رد الجميل: خدمة المجتمع وتطويره",
    subtitle: "أفعالنا تتحدث عنا، نخدم وطننا",
    buttonText: "استكشاف الأنشطة",
    buttonLink: "/events",
  },
  {
    id: 6,
    image: "/images/hero/hero-6-pioneering.jpg",
    badge: "الفنون والتقاليد الكشفية",
    title: "العمل اليدوي والإتقان: دروع ومهارات كشفية",
    subtitle: "نبني ونتعلم، نتقن فنون الكشافة",
    buttonText: "استكشاف الدروع",
    buttonLink: "/shields",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Ensure mobile video reliably autoplays
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Fallback if browser blocks autoplay
      });
    }
  }, []);

  // Auto-play every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused, currentIndex]);

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[620px] flex items-center justify-center overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      dir="rtl"
    >
      {/* Mobile Video Background (visible only on mobile: < md) */}
      <div className="md:hidden absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/hero-mobile-poster.jpg"
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/hero-mobile.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Desktop / Laptop Background Images with Preloaded Cross-Fade Animation (hidden on mobile, visible on md+) */}
      <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                loading="eager"
                decoding="async"
                className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? "scale-100" : "scale-105"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Cinematic Dark Gradient Overlays for High Text & Navbar Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/70 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.55)_100%)] pointer-events-none z-10" />

      {/* Content Container (Title, Subtitle, CTA) */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center pt-24 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Top Badge */}
            {activeSlide.badge && (
              <div className="inline-block mb-4 sm:mb-6 px-4 sm:px-5 py-1.5 rounded-full bg-black/45 border border-white/20 text-white text-xs sm:text-sm font-bold backdrop-blur-md shadow-md">
                {activeSlide.badge}
              </div>
            )}

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.25] sm:leading-[1.2] mb-3 sm:mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] max-w-3xl">
              {activeSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-medium leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-2xl sm:max-w-3xl">
              {activeSlide.subtitle}
            </p>

            {/* CTA Button */}
            <div className="relative inline-block group">
              <div className="absolute -inset-1 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-500 bg-[#d4a373]/60 dark:bg-cyan-500/40" />
              <Link
                href={activeSlide.buttonLink}
                className="relative inline-flex items-center justify-center px-6 py-3 sm:px-10 sm:py-3.5 rounded-full font-black text-sm sm:text-lg transition-all duration-300 transform group-hover:scale-105 shadow-[0_10px_25px_rgba(212,163,115,0.4)] bg-gradient-to-r from-[#e0a96d] to-[#d4a373] hover:from-[#d4a373] hover:to-[#c69260] text-[#0b1a30] dark:from-[#00f0ff] dark:to-[#38f4ff] dark:hover:from-[#38f4ff] dark:hover:to-[#00d8e6] dark:text-[#080b10] dark:shadow-[0_0_30px_rgba(0,240,255,0.6)] border border-[#d4a373]/40 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full opacity-20 bg-gradient-to-b from-white/40 via-transparent to-black/10" />
                <span className="relative z-10 pb-0.5">{activeSlide.buttonText}</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Red Bull Style Pagination Indicator */}
      <div className="absolute bottom-6 sm:bottom-10 right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-10 z-30 flex items-center gap-2 sm:gap-2.5 bg-black/35 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15 shadow-lg">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 p-0.5 transition-transform flex items-center justify-center"
              aria-label={`الانتقال إلى الشريحة ${index + 1}: ${slide.title}`}
            >
              {isActive ? (
                /* Active: Capsule with solid white center and glowing orange border */
                <motion.div
                  layoutId="active-hero-capsule"
                  className="w-8 sm:w-10 h-3 sm:h-3.5 rounded-full bg-white border-2 border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)] cursor-pointer"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              ) : (
                /* Inactive: Small solid circle */
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/50 hover:bg-white/90 transition-all cursor-pointer" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
