"use client";

import { useState } from "react";
import { ChevronsLeft } from "lucide-react";

const IMAGES_PER_VIEW = 3;

export function EventImageCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [start, setStart] = useState(0);

  if (images.length === 0) return null;

  const visibleImages = images.slice(start, start + IMAGES_PER_VIEW);
  const hasMore = start + IMAGES_PER_VIEW < images.length;

  const handleNext = () => {
    setStart(hasMore ? start + IMAGES_PER_VIEW : 0);
  };

  return (
    <div className="relative bg-[var(--color-scout-navy-light)] rounded-3xl p-6 mb-10">
      <div className="flex gap-4">
        {visibleImages.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={start + i}
            src={src}
            alt={`${alt} ${start + i + 1}`}
            className="flex-1 h-64 rounded-2xl object-cover"
          />
        ))}
      </div>

      {images.length > IMAGES_PER_VIEW && (
        <button
          onClick={handleNext}
          aria-label="عرض المزيد من الصور"
          className="absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
        >
          <ChevronsLeft size={22} className="text-[var(--color-scout-navy)]" />
        </button>
      )}
    </div>
  );
}