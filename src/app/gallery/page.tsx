import { FullGallery } from "@/components/FullGallery";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "معرض الميديا الشامل | جوالة هندسة عين شمس",
  description: "استعرض جميع الصور والذكريات الكشفية الخاصة بجوالة هندسة عين شمس عبر السنوات المختلفة.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-white font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[var(--color-scout-blue)]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-8">
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-bold">العودة للرئيسية</span>
        </Link>
        
        <FullGallery />
      </div>
    </div>
  );
}
