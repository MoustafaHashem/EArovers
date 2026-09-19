import { MobileShieldsGallery } from "@/components/home/MobileShieldsGallery";
import { Identity } from "@/components/layout/Identity";
import { Trophy, BookOpen, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { fetchMediaAction } from "@/actions/media";
import { shieldsData } from "@/data/clanData";
import { AboutSection } from "@/components/home/AboutSection";
import { EventsCarousel } from "@/components/home/EventsCarousel";
import { prisma } from "@/lib/prisma";
import { getClanData } from "@/lib/clanDataFetcher";
import { ShagaraSection } from "@/components/clan/ShagaraSection";

export async function MobileHome() {
  const rawClanData = await getClanData();
  const shieldsMediaPromises = shieldsData.map(shield => fetchMediaAction(shield.title, 6));
  const shieldsMediaArray = await Promise.all(shieldsMediaPromises);
  const events = await prisma.event.findMany({
    where: { isPublic: true },
    take: 5,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialMedia = shieldsData.reduce((acc, shield, index) => {
    acc[shield.id] = shieldsMediaArray[index];
    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<string, any[]>);
  return (
    <div className="flex flex-col items-center overflow-x-hidden pb-20">
      {/* Cinematic Full-Bleed Hero Section */}
      <section id="home" className="w-full pt-32 pb-16 flex flex-col items-center relative text-center overflow-hidden">
        {/* Deep Space / Glowing Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a] via-[#0a1526] to-transparent -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-scout-blue)]/20 via-blue-900/10 to-transparent blur-[80px] -z-10 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-[var(--color-glow-cyan)]/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="w-full px-6 flex flex-col items-center relative z-10">
          <div className="w-full mb-8">
            <ShagaraSection currentData={rawClanData[0]} />
          </div>
          <div className="inline-block mb-8 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[var(--color-scout-blue-light)] text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-md">
            أعرق العشائر الكشفية الجامعية
          </div>

          <h1 className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-50 to-[var(--color-scout-blue)] drop-shadow-[0_0_30px_rgba(92,124,182,0.3)] leading-[1.2]">
            عشيرة جوالة
            <br />
            هندسة عين شمس
          </h1>

          <p className="text-base text-gray-300 font-medium leading-relaxed mb-10 max-w-[280px]">
            منصة متكاملة لأرشيف العشيرة، التدرج القيادي، وتوثيق البطولات على مدار السنين.
          </p>

          <div className="relative inline-block group w-[280px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-scout-blue)] via-cyan-400 to-indigo-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <Link href="/join" className="relative w-full flex items-center justify-center gap-3 bg-[#060d1a] px-8 py-5 rounded-full text-white font-black text-lg overflow-hidden transition-all duration-300 border border-white/20 hover:border-cyan-400/50 active:scale-95 shadow-[0_0_40px_rgba(92,124,182,0.4)]">
              <span className="absolute inset-0 w-full h-full opacity-30 bg-gradient-to-b from-white/10 via-transparent to-black/50"></span>
              <span className="relative z-10 bg-gradient-to-r from-cyan-50 to-white bg-clip-text text-transparent">
                انضم إلينا الآن!
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Combined Shields & Media Gallery */}
      <section id="shields" className="w-full py-16 px-4 z-10 border-t border-[var(--color-dark-border)] bg-gradient-to-b from-transparent to-black/30">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">الدروع الكشفية وأنشطتنا</h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto px-4">تغطي أنشطة الجوالة مجالات متعددة لبناء شخصية متكاملة</p>
        </div>
        <MobileShieldsGallery initialMedia={initialMedia} />

        <div className="mt-8 px-4 text-center">
          <Link href="/shields" className="inline-block w-full bg-[var(--color-scout-navy-light)] hover:bg-[var(--color-anchor)] text-[var(--color-scout-blue-light)] hover:text-white border border-[var(--color-dark-border)] px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95">
            عرض جميع الدروع
            <span className="block text-xs font-normal text-gray-400 mt-1">تصفح الدروع الكشفية ومتطلباتها بالتفصيل</span>
          </Link>
        </div>
      </section>

      {/* Recent Events / Timeline */}
      <section id="events" className="w-full pt-12 pb-16 border-t border-[var(--color-dark-border)] bg-[#030811] relative">
        <EventsCarousel events={events} />
      </section>

      {/* Hall of Fame Teaser */}
      <section className="w-full py-12 px-6 z-10 border-t border-[var(--color-dark-border)] bg-gradient-to-b from-transparent to-black/20">
        <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-glow-gold)]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Trophy className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">لوحة الشرف</h3>
              <p className="text-gray-400 text-sm">سجل إنجازات وبطولات العشيرة</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            تعرف على تاريخ العشيرة المشرف في المسابقات القمية والمحلية، وأبرز الدروع والمراكز التي حصدناها عبر الأجيال.
          </p>
          <Link href="/fame" className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-xl font-bold transition-all">
            <span>تصفح لوحة الشرف</span>
            <ChevronLeft size={18} className="text-[var(--color-glow-gold)]" />
          </Link>
        </div>
      </section>

      {/* Sessions Teaser */}
      <section className="w-full py-12 px-6 z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-[var(--color-scout-navy)]/30">
        <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-scout-blue)]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-scout-blue)] to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(92,124,182,0.3)]">
              <BookOpen className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">التأهيل والدراسات</h3>
              <p className="text-gray-400 text-sm">برامج إعداد القادة وصقل المهارات</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            اكتشف البرامج التدريبية المتاحة لتطوير مهاراتك الكشفية والشخصية، وتعرف على الجلسات السابقة.
          </p>
          <Link href="/training" className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-xl font-bold transition-all">
            <span>عرض الدراسات</span>
            <ChevronLeft size={18} className="text-[var(--color-scout-blue-light)]" />
          </Link>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section id="join" className="w-full flex flex-col items-center py-20 px-6 z-10 relative border-t border-[var(--color-dark-border)] bg-gradient-to-b from-transparent to-blue-900/20">
        <div className="text-center max-w-2xl w-full">
          <h2 className="text-3xl font-black text-white mb-4">مستعد للمغامرة؟</h2>
          <p className="text-gray-300 text-base mb-8">
            انضم إلى عشيرة جوالة هندسة عين شمس واكتشف قدراتك الحقيقية.
          </p>
          <Link href="/join" className="inline-block w-full bg-gradient-to-r from-[var(--color-scout-blue)] to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(92,124,182,0.5)]">
            سجل بياناتك الآن
          </Link>
        </div>
      </section>

      {/* Footer / Identity */}
      <Identity />
    </div>
  );
}
