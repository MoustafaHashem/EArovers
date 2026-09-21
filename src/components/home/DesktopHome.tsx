import { HeroCarousel } from "@/components/home/HeroCarousel";
import { AboutSection } from "@/components/home/AboutSection";
import { ScoutShields } from "@/components/home/ScoutShields";
import { HallOfFame } from "@/components/home/HallOfFame";
import { MediaGallery } from "@/components/gallery/MediaGallery";
import { EventsCarousel } from "@/components/home/EventsCarousel";
import { ShagaraSection } from "@/components/clan/ShagaraSection";
import { Identity } from "@/components/layout/Identity";
import Link from "next/link";
import { fetchMediaAction } from "@/actions/media";
import { prisma } from "@/lib/prisma";
import { getClanData } from "@/lib/clanDataFetcher";

export async function DesktopHome() {
  const rawClanData = await getClanData();
  // Fetch initial media for the default category "مسابقات"
  const initialImages = await fetchMediaAction("مسابقات", 12);

  // Fetch latest public events for the carousel
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let events: any[] = [];
  try {
    events = await prisma.event.findMany({
      where: { isPublic: true },
      take: 20,
      orderBy: { startDate: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        location: true,
        eventType: true,
        coverImage: true,
      }
    });
  } catch (err) {
    console.error("Error fetching events for homepage:", err);
  }

  return (
    <div className="flex flex-col items-center overflow-x-hidden">

      {/* Dynamic Red Bull Style Hero Carousel */}
      <HeroCarousel />

      {/* About Section */}
      <AboutSection />

      {/* Scout Shields */}
      <section id="shields" className="w-full py-24 px-6 z-10 border-t border-[#d4a373]/20 dark:border-cyan-500/15 bg-transparent dark:bg-gradient-to-b dark:from-transparent dark:to-black/30">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#0b1a30] dark:text-white mb-4">الدروع الكشفية ومجالات التنافس</h2>
          <p className="text-[#475569] dark:text-slate-400 text-lg max-w-2xl mx-auto">تغطي أنشطة الجوالة مجالات متعددة لبناء شخصية متكاملة</p>
        </div>
        <ScoutShields />
      </section>

      {/* Events Carousel */}
      <section id="events" className="w-full py-24 z-10 border-t border-[#d4a373]/20 dark:border-cyan-500/15 bg-[#f7f6f2] dark:bg-[#060d16]">
        <EventsCarousel events={events} />
      </section>

      {/* Hall of Fame / Championships */}
      <section id="fame" className="w-full py-24 px-6 z-10 border-t border-[#d4a373]/20 dark:border-cyan-500/15 bg-[#f7f6f2] dark:bg-[#080b10]">
        <HallOfFame />
      </section>

      {/* Media Gallery */}
      <section id="media" className="w-full py-24 px-6 z-10 border-t border-[#d4a373]/20 dark:border-cyan-500/15 bg-black/[0.02] dark:bg-black/40 backdrop-blur-sm">
        <MediaGallery initialImages={initialImages} />
      </section>

      {/* Hierarchy Preview Section */}
      {rawClanData && rawClanData.length > 0 && (
        <section id="hierarchy-preview" className="w-full flex flex-col items-center pt-24 pb-12 bg-gradient-to-b from-transparent to-black/20 border-t border-[#d4a373]/20 dark:border-cyan-500/15 z-10 overflow-hidden">
          <div className="text-center mb-6 px-6">
            <h2 className="text-4xl md:text-5xl font-black text-[#0b1a30] dark:text-white mb-4">الهيكل التنظيمي والقيادي</h2>
            <p className="text-[#475569] dark:text-gray-400 text-lg max-w-2xl mx-auto">
              مجلس القيادة والهيكل المعاون للعام الحالي 2026.
            </p>
          </div>

          <div className="w-full max-w-7xl mx-auto">
            <ShagaraSection currentData={rawClanData[0]} />
          </div>

          <div className="mt-4 px-6 text-center">
            <Link href="/hierarchy" className="inline-block bg-gradient-to-r from-[#e0a96d] to-[#d4a373] hover:from-[#d4a373] hover:to-[#c69260] text-[#0b1a30] dark:from-[#00f0ff] dark:via-teal-400 dark:to-cyan-300 dark:text-[#080b10] border border-[#d4a373]/40 px-6 py-3 md:px-10 md:py-4 rounded-2xl font-bold text-lg md:text-xl transition-all shadow-lg hover:scale-105">
              عرض المزيد
              <span className="block text-xs md:text-sm font-normal opacity-80 mt-1">تصفح شجرة العشيرة لجميع الأجيال</span>
            </Link>
          </div>
        </section>
      )}

      {/* Join Us CTA Section */}
      <section id="join" className="w-full flex flex-col items-center py-32 px-6 z-10 relative border-t border-[#d4a373]/20 dark:border-cyan-500/15 bg-gradient-to-b from-transparent to-[#d4a373]/10 dark:to-cyan-950/20">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0b1a30] dark:text-white mb-6">مستعد للمغامرة؟</h2>
          <p className="text-[#334155] dark:text-slate-300 text-lg md:text-xl mb-10">
            انضم إلى عشيرة جوالة هندسة عين شمس واكتشف قدراتك الحقيقية. نحن نبحث دائماً عن قادة المستقبل.
          </p>
          <Link
            href="/join"
            className="inline-block px-8 py-4 md:px-12 md:py-5 rounded-full font-black text-lg md:text-2xl transition-all shadow-lg hover:scale-105 bg-gradient-to-r from-[#e0a96d] to-[#d4a373] hover:from-[#d4a373] hover:to-[#c69260] text-[#0b1a30] border border-[#d4a373]/30 shadow-[0_10px_25px_rgba(212,163,115,0.4)] dark:from-[#00f0ff] dark:via-teal-400 dark:to-cyan-300 dark:text-[#080b10] dark:shadow-[0_0_30px_rgba(0,240,255,0.6)]"
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
