"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { shieldsData } from "@/data/clanData";
import { PlayCircle, ChevronLeft, ArrowLeft } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import Link from "next/link";

type GalleryImage = {
  id: string;
  url: string;
  title: string;
  format: string;
};

type Shield = typeof shieldsData[0];

function ShieldSection({ 
  shield, 
  initialImages,
  onOpenLightbox 
}: { 
  shield: Shield; 
  initialImages: GalleryImage[];
  onOpenLightbox: (images: GalleryImage[], index: number) => void;
}) {
  const images = initialImages || [];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-sm mx-auto bg-white/95 dark:bg-[#0a1122]/80 backdrop-blur-xl rounded-[32px] border border-[#d4a373]/25 dark:border-cyan-500/20 overflow-hidden flex flex-col mb-12 shadow-lg dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative group"
    >
      {/* Top Half: Shield Badge Header or Photo Carousel */}
      <div className="w-full relative bg-gradient-to-b from-[#f3f1ec] to-[#ebe7df]/60 dark:from-[#050b14] dark:to-[#0a1122]/70 h-[220px] flex items-center justify-center overflow-hidden border-b border-[#d4a373]/15 dark:border-white/5">
        {images.length === 0 ? (
          <Link
            href={`/shields?shield=${shield.id}`}
            className="w-full h-full flex items-center justify-center relative cursor-pointer active:scale-95 transition-transform"
            title={`عرض تفاصيل ${shield.title}`}
          >
            <div className="relative w-56 h-44 flex items-center justify-center">
              <Image
                src={shield.image}
                alt={shield.title}
                fill
                sizes="224px"
                className="object-contain scale-125 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_8px_25px_rgba(0,240,255,0.25)]"
                priority
              />
            </div>
          </Link>
        ) : (
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 py-4 h-full items-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* First slide: Shield badge */}
            <Link
              href={`/shields?shield=${shield.id}`}
              className="relative w-[85%] max-w-[280px] h-full flex-shrink-0 snap-center rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4"
              title={`عرض تفاصيل ${shield.title}`}
            >
              <div className="relative w-44 h-40">
                <Image
                  src={shield.image}
                  alt={shield.title}
                  fill
                  sizes="176px"
                  className="object-contain filter drop-shadow-md scale-110"
                />
              </div>
            </Link>
            {images.map((img, i) => (
              <motion.div 
                key={img.id} 
                whileTap={{ scale: 0.96 }}
                onClick={() => onOpenLightbox(images, i)}
                className="relative w-[85%] max-w-[280px] h-full flex-shrink-0 snap-center rounded-2xl overflow-hidden cursor-pointer shadow-md border border-black/10 dark:border-white/10"
              >
                {img.format === 'mp4' && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                    <PlayCircle className="text-white drop-shadow-lg opacity-80" size={40} />
                  </div>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.url} 
                  alt={`${shield.title} - ${i + 1}`} 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
            
            {images.length > 0 && (
              <div className="flex-shrink-0 w-8 h-full flex items-center justify-center opacity-60">
                <ChevronLeft className="text-[#0b1a30] dark:text-white animate-pulse" size={24} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Half: Content (Domains) */}
      <div className="p-5 flex flex-col items-center relative z-20 bg-gradient-to-b from-transparent to-white dark:to-[#0a1122]">
        {/* Sleek Feature Cards for Sub-Items */}
        <div className="flex flex-col gap-3 w-full">
          {(() => {
            const hasMore = shield.items.length > 3;
            const displayedItems = hasMore ? shield.items.slice(0, 2) : shield.items;

            return (
              <>
                {displayedItems.map((item, idx) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + (idx * 0.1), type: "spring", stiffness: 100 }}
                  >
                    <Link
                      href={`/shields?shield=${shield.id}&field=${encodeURIComponent(item.title)}`}
                      className="group relative flex items-center gap-4 bg-[#f8f7f4] hover:bg-white dark:bg-[#0a1526]/50 dark:hover:bg-[#0a1526] border border-[#d4a373]/20 hover:border-[#d4a373]/40 dark:border-white/5 dark:hover:border-cyan-500/30 rounded-2xl p-4 transition-all duration-300 overflow-hidden active:scale-[0.98] cursor-pointer block"
                      title={`عرض مجال ${item.title}`}
                    >
                      <div className="relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-[#d4a373]/10 border border-[#d4a373]/25 dark:bg-cyan-500/10 dark:border-cyan-400/30 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                        <span className="text-2xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] dark:group-hover:drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">
                          {item.icon}
                        </span>
                      </div>
                      
                      <div className="relative z-10 text-right flex-1 flex items-center">
                        <h4 className="text-sm font-bold text-[#0b1a30] dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                {hasMore && (
                  <motion.div
                    key="show-more"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 100 }}
                  >
                    <Link
                      href={`/shields?shield=${shield.id}`}
                      className="group relative flex items-center justify-between bg-[#f8f7f4] hover:bg-white dark:bg-[#0a1526]/50 dark:hover:bg-[#0a1526] border border-dashed border-[#d4a373]/35 hover:border-solid hover:border-[#d4a373] dark:border-cyan-500/25 dark:hover:border-cyan-400 rounded-2xl p-4 transition-all duration-300 overflow-hidden active:scale-[0.98] cursor-pointer block"
                      title={`عرض جميع مجالات ${shield.title}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-[#d4a373]/15 border border-[#d4a373]/30 dark:bg-cyan-500/15 dark:border-cyan-400/40 text-[#0b1a30] dark:text-cyan-300 group-hover:scale-110 transition-transform">
                          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        </div>
                        <div className="relative z-10 text-right">
                          <h4 className="text-sm font-bold text-[#0b1a30] dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors">
                            عرض المزيد
                          </h4>
                        </div>
                      </div>
                      <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-[#0b1a30] dark:group-hover:text-cyan-300 transition-colors" />
                    </Link>
                  </motion.div>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </motion.div>
  );
}

export function MobileShieldsGallery({ initialMedia }: { initialMedia: Record<string, GalleryImage[]> }) {
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    images: GalleryImage[];
    index: number;
  }>({
    isOpen: false,
    images: [],
    index: -1
  });

  const handleOpenLightbox = (images: GalleryImage[], index: number) => {
    setLightboxData({ isOpen: true, images, index });
  };

  const handleCloseLightbox = () => {
    setLightboxData(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="w-full flex flex-col items-center py-6 px-4">
      {shieldsData.slice(0, 3).map((shield) => (
        <ShieldSection 
          key={shield.id} 
          shield={shield} 
          initialImages={initialMedia[shield.id] || []}
          onOpenLightbox={handleOpenLightbox} 
        />
      ))}

      <Lightbox
        open={lightboxData.isOpen}
        index={lightboxData.index}
        close={handleCloseLightbox}
        slides={lightboxData.images.map(img => ({ src: img.url }))}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    </div>
  );
}
