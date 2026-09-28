"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface TournamentGalleryProps {
  photos: string[];
  title: string;
  year: number;
}

export function TournamentGallery({ photos, title, year }: TournamentGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  }, [photos.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") next();   // RTL: left = next
      if (e.key === "ArrowRight") prev();  // RTL: right = prev
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      {/* ── GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {photos.map((photo, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openLightbox(i)}
            className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#d4a373]/20 dark:border-white/10 shadow-md bg-slate-100 dark:bg-slate-800 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a373] dark:focus-visible:ring-cyan-400"
            aria-label={`فتح صورة ${i + 1}`}
          >
            <Image
              src={photo}
              alt={`${title} - صورة ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                <ZoomIn size={20} className="text-white" />
              </div>
              <span className="text-white text-xs font-bold drop-shadow">
                {title} ({year})
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="معرض الصور"
        >
          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-bold bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm select-none z-10">
            {lightboxIndex + 1} / {photos.length}
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>

          {/* Prev button (RTL: shows on left = previous) */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
            aria-label="السابق"
          >
            <ChevronRight size={24} />
          </button>

          {/* Next button (RTL: shows on right = next) */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
            aria-label="التالي"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div
            className="relative w-[92vw] h-[82vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex]}
              alt={`${title} - صورة ${lightboxIndex + 1}`}
              fill
              sizes="92vw"
              className="object-contain select-none"
              priority
            />
          </div>

          {/* Thumbnails strip */}
          {photos.length > 1 && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-2 pb-1"
              onClick={(e) => e.stopPropagation()}
            >
              {photos.map((thumb, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={`relative shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    i === lightboxIndex
                      ? "border-[#ffd700] dark:border-cyan-400 scale-110 shadow-lg"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`صورة ${i + 1}`}
                >
                  <Image
                    src={thumb}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
