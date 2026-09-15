
import { ClanTree } from "@/components/clan/ClanTree";
import { ScoutShields } from "@/components/home/ScoutShields";
import { HallOfFame } from "@/components/home/HallOfFame";
import { MediaGallery } from "@/components/gallery/MediaGallery";
import { Sessions } from "@/components/home/Sessions";
import { Identity } from "@/components/layout/Identity";
import Link from "next/link";
import { fetchMediaAction } from "@/actions/media";

export async function DesktopHome() {
  // Fetch initial media for the default category "مسابقات"
  const initialImages = await fetchMediaAction("مسابقات", 12);
  return (
    <div className="flex flex-col items-center overflow-x-hidden">

      {/* Hero Section */}
      <section id="home" className="w-full pt-32 pb-24 flex flex-col items-center relative px-6 text-center">
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[var(--color-scout-blue)] rounded-full blur-[150px] opacity-20 pointer-events-none" />

        <div className="z-10 flex flex-col items-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[var(--color-scout-blue)]/20 border border-[var(--color-scout-blue)]/30 text-[var(--color-scout-blue-light)] text-sm font-bold backdrop-blur-sm">
            أعرق العشائر الكشفية الجامعية
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-[var(--color-scout-blue)] drop-shadow-sm leading-tight">
            عشيرة جوالة هندسة
            <br />
            جامعة عين شمس
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-gray-300 max-w-3xl font-medium leading-relaxed mb-12">
            منصة متكاملة لأرشيف العشيرة، التدرج القيادي، الإنجازات، وتوثيق بطولات الجوالة على مدار السنين.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <div className="relative inline-block group">
              {/* Pulsing vibrant outer glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              
              <Link href="/join" className="relative flex items-center justify-center gap-3 bg-[#081221] px-8 py-3 md:px-12 md:py-5 rounded-full text-white font-black text-lg md:text-2xl overflow-hidden transition-all duration-300 transform group-hover:scale-[1.03] border border-cyan-500/30">
                {/* Internal subtle gradient/shine */}
                <span className="absolute inset-0 w-full h-full opacity-30 bg-gradient-to-b from-white/10 via-transparent to-black/50"></span>
                
                {/* Expanding white circle on hover for a flash effect */}
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
                
                <span className="relative z-10 bg-gradient-to-r from-cyan-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] pb-1">
                  انضم إلينا الآن!
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scout Shields */}
      <section id="shields" className="w-full py-24 px-6 z-10 border-t border-[var(--color-dark-border)] bg-gradient-to-b from-transparent to-black/30">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">الدروع الكشفية ومجالات التنافس</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">تغطي أنشطة الجوالة مجالات متعددة لبناء شخصية متكاملة</p>
        </div>
        <ScoutShields />
        
        <div className="mt-12 px-6 text-center">
          <Link href="/shields" className="inline-block bg-[var(--color-scout-navy-light)] hover:bg-[var(--color-anchor)] text-[var(--color-scout-blue-light)] hover:text-white border border-[var(--color-dark-border)] px-6 py-3 md:px-10 md:py-4 rounded-2xl font-bold text-lg md:text-xl transition-all shadow-lg hover:shadow-[0_0_30px_rgba(92,124,182,0.3)] hover:-translate-y-1">
            عرض جميع الدروع
            <span className="block text-xs md:text-sm font-normal text-gray-400 mt-1">تصفح الدروع الكشفية ومتطلباتها بالتفصيل</span>
          </Link>
        </div>
      </section>

      {/* Media Gallery */}
      <section id="media" className="w-full py-24 px-6 z-10 border-t border-[var(--color-dark-border)] bg-black/40 backdrop-blur-sm">
        <MediaGallery initialImages={initialImages} />
      </section>

      {/* Hall of Fame */}
      <section id="fame" className="w-full py-24 px-6 z-10 border-t border-[var(--color-dark-border)] bg-[var(--color-scout-navy)]">
        <HallOfFame />
      </section>

      {/* Sessions & Studies */}
      <section id="sessions" className="w-full py-24 px-6 z-10 border-t border-[var(--color-dark-border)]">
        <Sessions />
      </section>

      {/* Hierarchy Preview Section */}
      <section id="hierarchy-preview" className="w-full flex flex-col items-center pt-24 pb-12 bg-gradient-to-b from-transparent to-black/20 border-t border-[var(--color-dark-border)] z-10 overflow-hidden">
        <div className="text-center mb-6 px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">الهيكل التنظيمي والقيادي</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            مجلس القيادة والهيكل المعاون للعام الحالي 2026.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto">
          <ClanTree defaultYear={2026} hideTabs={true} />
        </div>

        <div className="mt-4 px-6 text-center">
          <Link href="/hierarchy" className="inline-block bg-[var(--color-scout-navy-light)] hover:bg-[var(--color-anchor)] text-[var(--color-scout-blue-light)] hover:text-white border border-[var(--color-dark-border)] px-6 py-3 md:px-10 md:py-4 rounded-2xl font-bold text-lg md:text-xl transition-all shadow-lg hover:shadow-[0_0_30px_rgba(92,124,182,0.3)] hover:-translate-y-1">
            عرض المزيد
            <span className="block text-xs md:text-sm font-normal text-gray-400 mt-1">تصفح شجرة العشيرة لجميع الأجيال</span>
          </Link>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section id="join" className="w-full flex flex-col items-center py-32 px-6 z-10 relative border-t border-[var(--color-dark-border)] bg-gradient-to-b from-transparent to-blue-900/20">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6">مستعد للمغامرة؟</h2>
          <p className="text-gray-300 text-lg md:text-xl mb-10">
            انضم إلى عشيرة جوالة هندسة عين شمس واكتشف قدراتك الحقيقية. نحن نبحث دائماً عن قادة المستقبل.
          </p>
          <Link href="/join" className="inline-block bg-gradient-to-r from-[var(--color-scout-blue)] to-blue-500 hover:from-blue-500 hover:to-[var(--color-scout-blue-light)] text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-bold text-lg md:text-2xl transition-all shadow-[0_0_20px_rgba(92,124,182,0.5)] hover:shadow-[0_0_40px_rgba(124,161,230,0.8)] hover:scale-105">
            سجل بياناتك الآن
          </Link>
        </div>
      </section>

      {/* Footer / Identity */}
      <Identity />
    </div>
  );
}
