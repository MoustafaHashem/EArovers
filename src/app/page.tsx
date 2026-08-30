import { ClanTree } from "@/components/ClanTree";
import { ScoutShields } from "@/components/ScoutShields";
import { HallOfFame } from "@/components/HallOfFame";
import { MediaGallery } from "@/components/MediaGallery";
import { Sessions } from "@/components/Sessions";
import { JoinForm } from "@/components/JoinForm";
import { Identity } from "@/components/Identity";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="w-full bg-[var(--color-scout-navy)]/90 backdrop-blur-md border-b border-[var(--color-dark-border)] sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-scout-blue)] to-[var(--color-anchor)] rounded-full flex items-center justify-center shadow-lg text-white font-bold text-lg">
              ج
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              جوالة هندسة عين شمس
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-[var(--color-scout-blue-light)] font-bold">
            <a href="#home" className="hover:text-white transition-colors">الرئيسية</a>
            <a href="#hierarchy" className="hover:text-white transition-colors">الشجرة</a>
            <a href="#fame" className="hover:text-white transition-colors">الشرف</a>
            <a href="#shields" className="hover:text-white transition-colors">الدروع</a>
            <a href="#media" className="hover:text-white transition-colors">الميديا</a>
            <a href="#sessions" className="hover:text-white transition-colors">التأهيل</a>
            <a href="#join" className="bg-[var(--color-scout-blue)] text-[var(--color-scout-navy)] px-4 py-2 rounded-full hover:bg-white transition-colors">انضم إلينا</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="w-full min-h-[85vh] flex flex-col items-center justify-center relative px-6 text-center">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--color-scout-blue)] rounded-full blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="z-10 flex flex-col items-center mt-10">
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
            <a href="#hierarchy" className="bg-[var(--color-scout-blue)] hover:bg-[var(--color-scout-blue-light)] text-[var(--color-scout-navy)] px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(92,124,182,0.4)] hover:shadow-[0_0_30px_rgba(124,161,230,0.6)] hover:-translate-y-1">
              اكتشف شجرة العشيرة
            </a>
            <a href="#join" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-md">
              انضم إلينا الآن
            </a>
          </div>
        </div>
      </section>

      {/* Hierarchy Section */}
      <section id="hierarchy" className="w-full flex flex-col items-center py-24 bg-gradient-to-b from-transparent to-black/20 border-t border-[var(--color-dark-border)] z-10">
        <div className="text-center mb-10 px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">الهيكل التنظيمي والقيادي</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            تدرج المناصب القيادية عبر السنين. اضغط على أي قائد أو رائد رهط لمشاهدة رحلته القيادية في السنوات التالية.
          </p>
        </div>
        
        <div className="w-full">
          <ClanTree />
        </div>
      </section>

      {/* Hall of Fame */}
      <section id="fame" className="w-full py-24 px-6 z-10 border-t border-[var(--color-dark-border)] bg-[var(--color-scout-navy)]">
        <HallOfFame />
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

      {/* Sessions & Studies */}
      <section id="sessions" className="w-full py-24 px-6 z-10 border-t border-[var(--color-dark-border)]">
        <Sessions />
      </section>

      {/* Join Us */}
      <section id="join" className="w-full py-32 px-6 z-10 relative border-t border-[var(--color-dark-border)] bg-gradient-to-b from-transparent to-blue-900/20">
        <JoinForm />
      </section>

      {/* Footer / Identity */}
      <Identity />

    </main>
  );
}
