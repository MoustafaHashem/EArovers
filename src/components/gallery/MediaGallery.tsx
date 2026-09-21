"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageIcon, PlayCircle, Loader2 } from "lucide-react";
import { fetchMediaAction } from "@/actions/media";
import { cn } from "@/lib/utils";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Link from "next/link";

type GalleryImage = {
  id: string;
  url: string;
  title: string;
  format: string;
};

export function MediaGallery({ initialImages }: { initialImages: GalleryImage[] }) {
  const categories = ["مسابقات", "دروع", "معسكرات", "كواليس"];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [images, setImages] = useState<GalleryImage[]>(initialImages || []);
  const [loading, setLoading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    // Skip fetching if it's the first category and we already have the initial images
    if (activeCategory === categories[0] && images === initialImages) {
      return;
    }

    let mounted = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    
    fetchMediaAction(activeCategory, 12)
      .then((data) => {
        if (mounted) {
          setImages(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);
  
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-black text-[#0b1a30] dark:text-white mb-4">معرض الميديا الذكي</h2>
        <p className="text-[#475569] dark:text-slate-400 text-lg">أبرز اللحظات والذكريات السعيدة</p>
      </div>

      <div 
        className="flex overflow-x-auto md:flex-wrap justify-start md:justify-center items-center gap-3 mb-10 w-full max-w-[95vw] md:max-w-full px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button 
              key={cat} 
              onClick={() => { setLoading(true); setActiveCategory(cat); }}
              className={cn(
                "whitespace-nowrap flex-shrink-0 relative px-6 py-2.5 rounded-full text-sm md:text-base font-bold transition-all z-10 overflow-hidden cursor-pointer",
                isActive 
                  ? "text-[#0b1a30] dark:text-[#080b10]" 
                  : "text-[#475569] hover:text-[#0b1a30] bg-[#f0eee6] hover:bg-[#e8e5dc] dark:text-slate-300 dark:hover:text-white dark:bg-white/5 border border-[#d4a373]/25 dark:border-white/10"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-media-category"
                  className="absolute inset-0 bg-gradient-to-r from-[#e0a96d] to-[#d4a373] dark:from-[#00f0ff] dark:to-[#38f4ff] rounded-full -z-10 shadow-[0_2px_12px_rgba(212,163,115,0.35)] dark:shadow-[0_0_20px_#00f0ff]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>

      <div className="w-full min-h-[400px]">
        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#d4a373] dark:text-cyan-400 py-20">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="text-[#475569] dark:text-slate-400 font-bold">جاري تحميل الذكريات...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 py-20">
            <ImageIcon size={64} className="mb-4 opacity-50 text-[#d4a373]/50 dark:text-slate-500" />
            <p className="text-lg font-bold text-[#475569] dark:text-slate-400">لا توجد صور في هذا القسم حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {images.map((img, i) => (
              <div 
                key={img.id} 
                onClick={() => setLightboxIndex(i)}
                className={`relative rounded-xl overflow-hidden group bg-[var(--color-dark-card)] ${i === 1 || i === 4 ? 'row-span-2' : ''} ${i === 3 ? 'col-span-2' : ''} min-h-[150px] md:min-h-[200px] flex items-center justify-center cursor-pointer border border-[var(--color-dark-border)] hover:border-[var(--color-glow-cyan)] transition-colors`}
              >
                {img.format === 'mp4' ? (
                  <PlayCircle className="absolute text-white/70 group-hover:text-white transition-colors z-20" size={48} />
                ) : null}
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.url} 
                  alt="Gallery Item" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-end p-4 z-10">
                  <span className="text-white font-bold text-sm">ذكرى جديدة</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {!loading && images.length > 0 && (
        <Link 
          href="/gallery" 
          className="mt-12 inline-flex items-center justify-center px-8 py-3.5 rounded-full font-black text-base transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 bg-gradient-to-r from-[#e0a96d] to-[#d4a373] hover:from-[#d4a373] hover:to-[#c69260] text-[#0b1a30] shadow-[0_4px_16px_rgba(212,163,115,0.35)] dark:from-[#00f0ff] dark:to-[#38f4ff] dark:hover:from-[#38f4ff] dark:hover:to-[#00d8e6] dark:text-[#080b10] dark:shadow-[0_0_25px_rgba(0,240,255,0.5)] border border-[#d4a373]/30"
        >
          عرض كل الصور
        </Link>
      )}

      <Lightbox
        index={lightboxIndex}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={images.map(img => ({ src: img.url }))}
        plugins={[Zoom, Thumbnails]}
        zoom={{
          maxZoomPixelRatio: 3,
        }}
      />
    </div>
  );
}
