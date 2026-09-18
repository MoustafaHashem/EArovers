
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { MobileShieldsGallery } from "@/components/home/MobileShieldsGallery";
import { Identity } from "@/components/layout/Identity";
import { Trophy, BookOpen, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { fetchMediaAction } from "@/actions/media";
import { shieldsData } from "@/data/clanData";

export async function MobileHome() {
  const shieldsMediaPromises = shieldsData.map(shield => fetchMediaAction(shield.title, 6));
  const shieldsMediaArray = await Promise.all(shieldsMediaPromises);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialMedia = shieldsData.reduce((acc, shield, index) => {
    acc[shield.id] = shieldsMediaArray[index];
    return acc;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<string, any[]>);
  return (
    <div className="flex flex-col items-center overflow-x-hidden pb-20">
      {/* Dynamic Red Bull Style Hero Carousel */}
      <HeroCarousel />

      {/* Combined Shields & Media Gallery */}
      <section id="shields" className="w-full py-16 px-4 z-10 border-t border-[#d4a373]/20 dark:border-cyan-500/15 bg-transparent dark:bg-gradient-to-b dark:from-transparent dark:to-black/30">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-[#0b1a30] dark:text-white mb-2">الدروع الكشفية وأنشطتنا</h2>
          <p className="text-[#475569] dark:text-slate-400 text-sm max-w-2xl mx-auto px-4">تغطي أنشطة الجوالة مجالات متعددة لبناء شخصية متكاملة</p>
        </div>
        <MobileShieldsGallery initialMedia={initialMedia} />
        
        <div className="mt-8 px-4 text-center">
          <Link 
            href="/shields" 
            className="inline-block w-full px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-md active:scale-95 bg-white hover:bg-[#fbfbf9] text-[#0b1a30] border border-[#d4a373]/30 dark:bg-[#0d1527] dark:hover:bg-[#112038] dark:text-cyan-300 dark:border-cyan-500/30 dark:shadow-[0_0_20px_rgba(0,240,255,0.12)]"
          >
            عرض جميع الدروع
            <span className="block text-xs font-normal text-[#64748b] dark:text-slate-400 mt-1">تصفح الدروع الكشفية ومتطلباتها بالتفصيل</span>
          </Link>
        </div>
      </section>

      {/* Hall of Fame Teaser */}
      <section className="w-full py-12 px-6 z-10 border-t border-[#d4a373]/20 dark:border-cyan-500/15 bg-gradient-to-b from-transparent to-[#d4a373]/5 dark:to-black/20">
        <div className="glass-card honor-card p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd700]/15 dark:bg-[#ffd700]/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Trophy className="text-[#080b10]" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#0b1a30] dark:text-white">لوحة الشرف</h3>
              <p className="text-[#475569] dark:text-slate-400 text-sm">سجل إنجازات وبطولات العشيرة</p>
            </div>
          </div>
          <p className="text-[#334155] dark:text-slate-300 text-sm mb-6 leading-relaxed">
            تعرف على تاريخ العشيرة المشرف في المسابقات القمية والمحلية، وأبرز الدروع والمراكز التي حصدناها عبر الأجيال.
          </p>
          <Link 
            href="/fame" 
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all bg-[#d4a373]/10 hover:bg-[#d4a373]/20 text-[#0b1a30] border border-[#d4a373]/30 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:text-white"
          >
            <span>تصفح لوحة الشرف</span>
            <ChevronLeft size={18} className="text-[#d4a373] dark:text-[#ffd700]" />
          </Link>
        </div>
      </section>

      {/* Sessions Teaser */}
      <section className="w-full py-12 px-6 z-10 border-t border-[#d4a373]/20 dark:border-cyan-500/15 bg-gradient-to-b from-transparent to-[#161e35]/5 dark:to-cyan-950/20">
        <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#161e35]/10 dark:bg-cyan-500/15 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#161e35] to-[#26355d] dark:from-cyan-400 dark:to-teal-500 rounded-2xl flex items-center justify-center shadow-md">
              <BookOpen className="text-white dark:text-[#080b10]" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#0b1a30] dark:text-white">التأهيل والدراسات</h3>
              <p className="text-[#475569] dark:text-slate-400 text-sm">برامج إعداد القادة وصقل المهارات</p>
            </div>
          </div>
          <p className="text-[#334155] dark:text-slate-300 text-sm mb-6 leading-relaxed">
            اكتشف البرامج التدريبية المتاحة لتطوير مهاراتك الكشفية والشخصية، وتعرف على الجلسات السابقة.
          </p>
          <Link 
            href="/training" 
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all bg-[#161e35]/5 hover:bg-[#161e35]/15 text-[#161e35] border border-[#161e35]/20 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:text-white"
          >
            <span>عرض الدراسات</span>
            <ChevronLeft size={18} className="text-[#161e35] dark:text-cyan-400" />
          </Link>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section id="join" className="w-full flex flex-col items-center py-20 px-6 z-10 relative border-t border-[#d4a373]/20 dark:border-cyan-500/15 bg-gradient-to-b from-transparent to-[#161e35]/10 dark:to-cyan-950/25">
        <div className="text-center max-w-2xl w-full">
          <h2 className="text-3xl font-black text-[#0b1a30] dark:text-white mb-4">مستعد للمغامرة؟</h2>
          <p className="text-[#334155] dark:text-slate-300 text-base mb-8">
            انضم إلى عشيرة جوالة هندسة عين شمس واكتشف قدراتك الحقيقية.
          </p>
          <Link 
            href="/join" 
            className="inline-block w-full px-8 py-4 rounded-full font-bold text-lg shadow-lg bg-gradient-to-r from-[#161e35] to-[#1e2746] text-white border border-[#161e35]/20 shadow-[0_10px_25px_rgba(22,30,53,0.3)] dark:bg-gradient-to-r dark:from-cyan-400 dark:via-teal-400 dark:to-cyan-300 dark:text-[#080b10] dark:shadow-[0_0_30px_rgba(0,240,255,0.6)]"
          >
            سجل بياناتك الآن
          </Link>
        </div>
      </section>

      {/* Footer / Identity */}
      <Identity />
    </div>
  );
}
