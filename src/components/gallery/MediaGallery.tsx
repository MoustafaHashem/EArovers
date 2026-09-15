"use client";

import { useEffect, useState } from "react";
import { ImageIcon, PlayCircle, Loader2 } from "lucide-react";
import { fetchMediaAction } from "@/actions/media";
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
        <h2 className="text-4xl font-black text-white mb-4">معرض الميديا الذكي</h2>
        <p className="text-gray-400 text-lg">أبرز اللحظات والذكريات السعيدة</p>
      </div>

      <div 
        className="flex overflow-x-auto md:flex-wrap justify-start md:justify-center items-center gap-3 mb-10 w-full max-w-[95vw] md:max-w-full px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => { setLoading(true); setActiveCategory(cat); }}
            className={`whitespace-nowrap flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold border transition-colors ${activeCategory === cat ? 'bg-[var(--color-scout-blue-light)] text-[var(--color-scout-navy)] border-transparent' : 'bg-transparent text-gray-300 border-[var(--color-dark-border)] hover:border-[var(--color-scout-blue-light)] hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="w-full min-h-[400px]">
        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-[var(--color-scout-blue-light)] py-20">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="text-gray-400 font-bold">جاري تحميل الذكريات...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 py-20">
            <ImageIcon size={64} className="mb-4 opacity-50" />
            <p className="text-lg font-bold">لا توجد صور في هذا القسم حالياً</p>
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
        <Link href="/gallery" className="mt-12 border border-[var(--color-scout-blue)] text-[var(--color-scout-blue-light)] px-8 py-3 rounded-full font-bold hover:bg-[var(--color-scout-blue)] hover:text-[var(--color-scout-navy)] transition-colors">
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
