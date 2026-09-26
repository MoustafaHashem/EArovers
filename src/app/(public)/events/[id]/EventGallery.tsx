"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface EventGalleryProps {
  photos: string[];
  eventTitle: string;
}

export function EventGallery({ photos, eventTitle }: EventGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="space-y-6 pt-8 border-t border-[#d4a373]/20 dark:border-white/10">
      <h2 className="text-3xl font-black text-[#0b1a30] dark:text-white">معرض الصور</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photoUrl, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-2xl overflow-hidden border border-[#d4a373]/20 dark:border-white/10 group shadow-md cursor-pointer"
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={photoUrl}
              alt={`${eventTitle} - photo ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex >= 0 ? lightboxIndex : 0}
        close={() => setLightboxIndex(-1)}
        plugins={[Zoom]}
        slides={photos.map((src) => ({ src }))}
        carousel={{ finite: false }}
        render={{
          buttonPrev: photos.length <= 1 ? () => null : undefined,
          buttonNext: photos.length <= 1 ? () => null : undefined,
        }}
      />
    </div>
  );
}
