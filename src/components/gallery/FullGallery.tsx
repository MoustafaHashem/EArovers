"use client";

import { useEffect, useState } from "react";
import { ImageIcon, PlayCircle, Loader2 } from "lucide-react";
import { fetchMediaAction } from "@/actions/media";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type GalleryImage = {
  id: string;
  url: string;
  title: string;
  format: string;
};

export function FullGallery() {
  const categories = ["الكل", "مسابقات", "دروع", "معسكرات", "كواليس"];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    let mounted = true;
    
    // No limit passed, meaning we fetch all photos for the selected category.
    fetchMediaAction(activeCategory)
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
  }, [activeCategory]);
  
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-[#0b1a30] dark:text-white mb-4">معرض الصور الشامل</h1>
        <p className="text-[#475569] dark:text-gray-400 text-lg max-w-2xl mx-auto">تصفح كافة ذكريات جوالة هندسة عين شمس، من مسابقات ومعسكرات إلى كواليس و دروع.</p>
      </div>

      <div 
        className="flex overflow-x-auto md:flex-wrap justify-start md:justify-center items-center gap-3 mb-10 sticky top-20 z-30 bg-white/85 dark:bg-[#080b10]/80 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-[#d4a373]/30 dark:border-cyan-500/20 shadow-xl w-full max-w-[95vw] md:max-w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => { setLoading(true); setActiveCategory(cat); }}
            className={`whitespace-nowrap flex-shrink-0 px-6 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-gradient-to-r from-[#161e35] to-[#1e2746] text-white border-transparent scale-105 shadow-md dark:from-cyan-400 dark:to-teal-300 dark:text-[#080b10] dark:shadow-[0_0_15px_rgba(0,240,255,0.5)]' 
                : 'bg-white/80 dark:bg-white/5 text-[#475569] dark:text-gray-300 border-[#d4a373]/30 dark:border-white/10 hover:border-[#161e35] dark:hover:border-cyan-400 hover:text-[#0b1a30] dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="w-full min-h-[500px]">
        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#161e35] dark:text-cyan-400 py-32">
            <Loader2 className="animate-spin mb-6" size={64} />
            <p className="text-[#475569] dark:text-gray-400 font-bold text-xl">جاري تحميل المعرض بالكامل...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#64748b] dark:text-gray-500 py-32">
            <ImageIcon size={80} className="mb-6 opacity-50" />
            <p className="text-2xl font-bold">لا توجد صور في هذا القسم حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4">
            {images.map((img, i) => (
              <div 
                key={img.id} 
                onClick={() => setLightboxIndex(i)}
                className={`relative rounded-2xl overflow-hidden group bg-white/70 dark:bg-[var(--color-dark-card)] ${i % 7 === 1 || i % 7 === 4 ? 'row-span-2' : ''} ${i % 9 === 3 ? 'col-span-2' : ''} min-h-[180px] md:min-h-[250px] flex items-center justify-center cursor-pointer border border-[#d4a373]/25 dark:border-[var(--color-dark-border)] hover:border-[#161e35] dark:hover:border-[var(--color-glow-cyan)] transition-all shadow-md hover:shadow-xl dark:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]`}
              >
                {img.format === 'mp4' ? (
                  <PlayCircle className="absolute text-white/70 group-hover:text-white transition-colors z-20" size={64} />
                ) : null}
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.url} 
                  alt="Gallery Item" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-6 z-10">
                  <span className="text-white font-bold text-sm md:text-lg">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
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
