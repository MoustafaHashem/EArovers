"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { shieldsData } from "@/data/clanData";
import { fetchMediaAction } from "@/actions/media";
import { ImageIcon, Loader2, PlayCircle, ChevronLeft } from "lucide-react";
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
  onOpenLightbox 
}: { 
  shield: Shield; 
  onOpenLightbox: (images: GalleryImage[], index: number) => void;
}) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    

    fetchMediaAction(shield.title, 6) // Fetch up to 6 images for the carousel
      .then((data) => {
        if (mounted) {
          setImages(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(`Failed to fetch photos for ${shield.title}:`, err);
        if (mounted) {
          setImages([]);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [shield.title]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-sm mx-auto bg-[#0a1122]/80 backdrop-blur-xl rounded-[32px] border border-white/10 overflow-hidden flex flex-col mb-12 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative group"
    >
      {/* Top Half: Photo Carousel */}
      <div className="w-full relative bg-[#050b14] h-[260px] overflow-hidden">
        {/* Subtle top inner shadow for depth */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 py-4 h-full items-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {loading ? (
            <div className="w-full flex-shrink-0 flex flex-col items-center justify-center text-[var(--color-scout-blue-light)] opacity-70">
              <Loader2 className="animate-spin mb-3" size={32} />
              <p className="text-xs font-bold text-gray-400">جاري تحميل الصور...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="w-full h-full flex-shrink-0 snap-center rounded-2xl bg-gradient-to-br from-[#0f172a] to-[var(--color-scout-blue)]/20 flex flex-col items-center justify-center text-white/30 border border-white/5 relative overflow-hidden">
              <ImageIcon size={48} className="mb-3 opacity-20" />
              <p className="text-sm font-bold tracking-wider">لا توجد صور حالياً</p>
            </div>
          ) : (
            <>
              {images.map((img, i) => (
                <motion.div 
                  key={img.id} 
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onOpenLightbox(images, i)}
                  className="relative w-[85%] max-w-[280px] h-full flex-shrink-0 snap-center rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-white/10"
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
                  {/* Gradient Overlay for text readability if needed later */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
              
              {/* "Swipe for more" indicator if there are multiple images */}
              {images.length > 1 && (
                <div className="flex-shrink-0 w-8 h-full flex items-center justify-center opacity-50">
                  <ChevronLeft className="text-white animate-pulse" size={24} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom Half: Content */}
      <div className="p-6 flex flex-col relative z-20 bg-gradient-to-b from-transparent to-[#0a1122]">
        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{shield.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{shield.description}</p>
        
        {/* Sleek Feature Cards for Sub-Items */}
        <div className="flex flex-col gap-3 mt-6 w-full">
          {shield.items.map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + (idx * 0.1), type: "spring", stiffness: 100 }}
              className="group relative flex items-center gap-4 bg-[#0a1526]/50 hover:bg-[#0a1526] border border-white/5 hover:border-[var(--color-scout-blue)]/30 rounded-2xl p-4 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-scout-blue)]/0 via-[var(--color-scout-blue)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <span className="text-2xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_15px_rgba(92,124,182,0.6)]">
                  {item.icon}
                </span>
              </div>
              
              <div className="relative z-10 text-right flex-1 flex flex-col justify-center">
                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-[var(--color-scout-blue-light)] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
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

export function MobileShieldsGallery() {
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
