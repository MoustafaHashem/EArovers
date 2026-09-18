"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { shieldsData } from "@/data/clanData";
import { ImageIcon, PlayCircle, ChevronLeft } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

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
      {/* Top Half: Photo Carousel */}
      <div className="w-full relative bg-[#f3f1ec] dark:bg-[#050b14] h-[260px] overflow-hidden">
        {/* Subtle top inner shadow for depth */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/20 dark:from-black/50 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 py-4 h-full items-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {images.length === 0 ? (
            <div className="w-full h-full flex-shrink-0 snap-center rounded-2xl bg-gradient-to-br from-[#ebe7df] to-[#d4a373]/10 dark:from-[#0f172a] dark:to-cyan-950/20 flex flex-col items-center justify-center text-[#64748b]/50 dark:text-white/30 border border-black/5 dark:border-white/5 relative overflow-hidden">
              <ImageIcon size={48} className="mb-3 opacity-30" />
              <p className="text-sm font-bold tracking-wider text-[#475569] dark:text-slate-400">لا توجد صور حالياً</p>
            </div>
          ) : (
            <>
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
                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
              
              {/* "Swipe for more" indicator if there are multiple images */}
              {images.length > 1 && (
                <div className="flex-shrink-0 w-8 h-full flex items-center justify-center opacity-60">
                  <ChevronLeft className="text-[#0b1a30] dark:text-white animate-pulse" size={24} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom Half: Content */}
      <div className="p-6 flex flex-col relative z-20 bg-gradient-to-b from-transparent to-white dark:to-[#0a1122]">
        <h3 className="text-2xl font-black text-[#0b1a30] dark:text-white mb-2 tracking-tight">{shield.title}</h3>
        <p className="text-[#475569] dark:text-slate-400 text-sm leading-relaxed mb-6">{shield.description}</p>
        
        {/* Sleek Feature Cards for Sub-Items */}
        <div className="flex flex-col gap-3 mt-6 w-full">
          {shield.items.map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + (idx * 0.1), type: "spring", stiffness: 100 }}
              className="group relative flex items-center gap-4 bg-[#f8f7f4] hover:bg-white dark:bg-[#0a1526]/50 dark:hover:bg-[#0a1526] border border-[#d4a373]/20 hover:border-[#d4a373]/40 dark:border-white/5 dark:hover:border-cyan-500/30 rounded-2xl p-4 transition-all duration-300 overflow-hidden"
            >
              <div className="relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-[#d4a373]/10 border border-[#d4a373]/25 dark:bg-cyan-500/10 dark:border-cyan-400/30 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <span className="text-2xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] dark:group-hover:drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">
                  {item.icon}
                </span>
              </div>
              
              <div className="relative z-10 text-right flex-1 flex flex-col justify-center">
                <h4 className="text-sm font-bold text-[#0b1a30] dark:text-white mb-1 group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#64748b] dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
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
      {shieldsData.map((shield) => (
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
