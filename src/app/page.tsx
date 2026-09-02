import { Navbar } from "@/components/Navbar";
import { ClanTree } from "@/components/ClanTree";
import { ScoutShields } from "@/components/ScoutShields";
import { HallOfFame } from "@/components/HallOfFame";
import { MediaGallery } from "@/components/MediaGallery";
import { Sessions } from "@/components/Sessions";
import { JoinForm } from "@/components/JoinForm";
import { Identity } from "@/components/Identity";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="w-full min-h-[85vh] flex flex-col items-center justify-center relative px-6 text-center">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--color-scout-blue)] rounded-full blur-[150px] opacity-20 pointer-events-none" />

        <div className="z-10 flex flex-col items-center mt-28 md:mt-40">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[var(--color-scout-blue)]/20 border border-[var(--color-scout-blue)]/30 text-[var(--color-scout-blue-light)] text-sm font-bold backdrop-blur-sm">
            أعرق العشائر الكشفية الجامعية
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-[var(--color-scout-blue)] drop-shadow-sm leading-tight">
            عشيرة جوالة هندسة
            <br />
            جامعة عين شمس
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 max-w-3xl font-medium leading-relaxed mb-12">
            منصة متكاملة لأرشيف العشيرة، التدرج القيادي، الإنجازات، وتوثيق بطولات الجوالة على مدار السنين.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">

            <Link href="/join" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-md">
              انضم إلينا الآن
            </Link>
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
      </section>

      {/* Media Gallery */}
      <section id="media" className="w-full py-24 px-6 z-10 border-t border-[var(--color-dark-border)] bg-black/40 backdrop-blur-sm">
        <MediaGallery />
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
          <Link href="/hierarchy" className="inline-block bg-[var(--color-scout-navy-light)] hover:bg-[var(--color-anchor)] text-[var(--color-scout-blue-light)] hover:text-white border border-[var(--color-dark-border)] px-10 py-4 rounded-2xl font-bold text-xl transition-all shadow-lg hover:shadow-[0_0_30px_rgba(92,124,182,0.3)] hover:-translate-y-1">
            عرض المزيد
            <span className="block text-sm font-normal text-gray-400 mt-1">تصفح شجرة العشيرة لجميع الأجيال</span>
          </Link>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section id="join" className="w-full flex flex-col items-center py-32 px-6 z-10 relative border-t border-[var(--color-dark-border)] bg-gradient-to-b from-transparent to-blue-900/20">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">مستعد للمغامرة؟</h2>
          <p className="text-gray-300 text-xl mb-10">
            انضم إلى عشيرة جوالة هندسة عين شمس واكتشف قدراتك الحقيقية. نحن نبحث دائماً عن قادة المستقبل.
          </p>
          <Link href="/join" className="inline-block bg-gradient-to-r from-[var(--color-scout-blue)] to-blue-500 hover:from-blue-500 hover:to-[var(--color-scout-blue-light)] text-white px-12 py-5 rounded-full font-bold text-2xl transition-all shadow-[0_0_20px_rgba(92,124,182,0.5)] hover:shadow-[0_0_40px_rgba(124,161,230,0.8)] hover:scale-105">
            سجل بياناتك الآن
          </Link>
        </div>
      </section>

      {/* Footer / Identity */}
      <Identity />

    </main>
  );
}
