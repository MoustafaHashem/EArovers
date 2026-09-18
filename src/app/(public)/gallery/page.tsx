import { FullGallery } from "@/components/gallery/FullGallery";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "معرض الميديا الشامل | جوالة هندسة عين شمس",
  description: "استعرض جميع الصور والذكريات الكشفية الخاصة بجوالة هندسة عين شمس عبر السنوات المختلفة.",
};

export const revalidate = 60;

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#d4a373]/10 dark:bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#161e35]/10 dark:bg-blue-600/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#161e35] dark:text-cyan-400 hover:opacity-80 transition-opacity group mb-8 font-bold">
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          <span>العودة للرئيسية</span>
        </Link>
        
        <FullGallery />
      </div>
    </div>
  );
}
