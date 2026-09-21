import { FullGallery } from "@/components/gallery/FullGallery";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";
import { fetchMediaAction } from "@/actions/media";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "معرض الميديا الشامل | جوالة هندسة عين شمس",
  description: "استعرض جميع الصور ومقاطع الفيديو والذكريات الكشفية الخاصة بجوالة هندسة عين شمس عبر السنوات المختلفة.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const initialMedia = await fetchMediaAction("الكل");

  return (
    <div className="min-h-screen flex flex-col justify-between bg-transparent text-foreground font-cairo overflow-x-hidden relative" dir="rtl">
      <Navbar />

      {/* Ambient Background Blurs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4a373]/10 dark:bg-cyan-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#161e35]/10 dark:bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <main className="flex-1 pt-28 sm:pt-32 pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full relative z-10">
        <FullGallery initialMedia={initialMedia} />
      </main>

      <div className="w-full z-10 relative">
        <Identity />
      </div>
    </div>
  );
}
