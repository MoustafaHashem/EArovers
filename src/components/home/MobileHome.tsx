import { HeroCarousel } from "@/components/home/HeroCarousel";
import { MobileShieldsGallery } from "@/components/home/MobileShieldsGallery";
import { EventsCarousel } from "@/components/home/EventsCarousel";
import { HallOfFame } from "@/components/home/HallOfFame";
import { Identity } from "@/components/layout/Identity";
import Link from "next/link";
import { fetchBatchShieldsMediaAction } from "@/actions/media";
import { shieldsData } from "@/data/clanData";
import { prisma } from "@/lib/prisma";

export async function MobileHome() {
  const initialMedia = await fetchBatchShieldsMediaAction(
    shieldsData.map((s) => ({ id: s.id, title: s.title }))
  );

  // Fetch latest public events
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
    console.error("Error fetching events for mobile home:", err);
  }

  return (
    <div className="flex flex-col items-center overflow-x-hidden pb-20">
      {/* Dynamic Red Bull Style Hero Carousel / Mobile Video */}
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
            className="inline-block w-full px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-md active:scale-95 bg-gradient-to-r from-[#e0a96d] to-[#d4a373] text-[#0b1a30] dark:from-[#00f0ff] dark:to-[#38f4ff] dark:text-[#080b10] dark:shadow-[0_0_20px_rgba(0,240,255,0.4)] border border-[#d4a373]/40"
          >
            عرض جميع الدروع
            <span className="block text-xs font-medium text-[#0b1a30]/80 dark:text-[#080b10]/80 mt-1">تصفح الدروع الكشفية ومتطلباتها بالتفصيل</span>
          </Link>
        </div>
      </section>

      {/* Events Carousel */}
      <section className="w-full py-12 z-10 border-t border-[#d4a373]/20 dark:border-cyan-500/15 bg-[#f7f6f2] dark:bg-[#060d16]">
        <EventsCarousel events={events} />
      </section>

      {/* Hall of Fame / Championships */}
      <section id="fame" className="w-full py-12 px-4 sm:px-6 z-10 border-t border-[#d4a373]/20 dark:border-cyan-500/15 bg-gradient-to-b from-transparent to-[#d4a373]/5 dark:to-black/20">
        <HallOfFame />
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
            className="inline-block w-full px-8 py-4 rounded-full font-black text-lg shadow-lg bg-gradient-to-r from-[#e0a96d] to-[#d4a373] text-[#0b1a30] border border-[#d4a373]/30 shadow-[0_10px_25px_rgba(212,163,115,0.4)] dark:from-[#00f0ff] dark:via-teal-400 dark:to-cyan-300 dark:text-[#080b10] dark:shadow-[0_0_30px_rgba(0,240,255,0.6)]"
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
