"use client";

import { ImageIcon, PlayCircle, Filter } from "lucide-react";

export function MediaGallery() {
  // Placeholder scaffolding
  const categories = ["الكل", "مسابقات", "دروع", "معسكرات", "كواليس"];
  
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-white mb-4">معرض الميديا الذكي</h2>
        <p className="text-gray-400 text-lg">أبرز اللحظات والذكريات السعيدة</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat, i) => (
          <button key={cat} className={`px-5 py-2 rounded-full text-sm font-bold border transition-colors ${i === 0 ? 'bg-[var(--color-scout-blue-light)] text-[var(--color-scout-navy)] border-transparent' : 'bg-transparent text-gray-300 border-[var(--color-dark-border)] hover:border-[var(--color-scout-blue-light)] hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {/* Placeholder images */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className={`relative rounded-xl overflow-hidden group bg-[var(--color-dark-card)] ${i === 1 || i === 4 ? 'row-span-2' : ''} ${i === 3 ? 'col-span-2' : ''} min-h-[150px] md:min-h-[200px] flex items-center justify-center cursor-pointer border border-[var(--color-dark-border)] hover:border-[var(--color-glow-cyan)] transition-colors`}>
            {i % 3 === 0 ? (
              <PlayCircle className="text-gray-500 group-hover:text-white transition-colors z-10" size={48} />
            ) : (
              <ImageIcon className="text-gray-500 group-hover:text-white transition-colors z-10" size={40} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-white font-bold text-sm">ذكرى رقم {i}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-12 border border-[var(--color-scout-blue)] text-[var(--color-scout-blue-light)] px-8 py-3 rounded-full font-bold hover:bg-[var(--color-scout-blue)] hover:text-[var(--color-scout-navy)] transition-colors">
        عرض المزيد
      </button>
    </div>
  );
}
