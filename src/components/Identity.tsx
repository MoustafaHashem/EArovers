import { Globe, Camera, MonitorPlay, Radio } from "lucide-react";

export function Identity() {
  return (
    <footer className="w-full bg-[#050b14] pt-20 pb-10 px-6 border-t border-white/5 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right relative z-10">
        
        {/* Brand & Scarf */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-scout-blue)] to-[var(--color-anchor)] rounded-full flex items-center justify-center shadow-[0_0_15px_var(--color-scout-blue)] text-white font-black text-xl">
               ج
             </div>
             <span className="text-2xl font-black text-white tracking-wide">عشيرة جوالة هندسة</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            أعرق العشائر الكشفية بجامعة عين شمس. نبني قادة المستقبل ونعزز القيم والمبادئ الأصيلة لخدمة المجتمع.
          </p>
          
          {/* Mock Scarf Element */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-700 w-full max-w-xs relative overflow-hidden shadow-lg border border-yellow-300/30">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            <div className="relative z-10 flex items-center justify-between text-white font-bold">
              <span>منديل العشيرة</span>
              <span className="text-2xl">🎗️</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h4 className="text-white font-bold text-lg mb-2">روابط سريعة</h4>
          <a href="#hierarchy" className="text-gray-400 hover:text-[var(--color-scout-blue-light)] transition-colors">الهيكل التنظيمي</a>
          <a href="#shields" className="text-gray-400 hover:text-[var(--color-scout-blue-light)] transition-colors">الدروع الكشفية</a>
          <a href="#fame" className="text-gray-400 hover:text-[var(--color-scout-blue-light)] transition-colors">لوحة الشرف</a>
          <a href="#media" className="text-gray-400 hover:text-[var(--color-scout-blue-light)] transition-colors">معرض الميديا</a>
          <a href="#join" className="text-gray-400 hover:text-[var(--color-scout-blue-light)] transition-colors">انضم إلينا</a>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h4 className="text-white font-bold text-lg mb-2">تواصل معنا</h4>
          <p className="text-gray-400 mb-4">تابعنا على منصات التواصل الاجتماعي لمعرفة أحدث الأخبار والفعاليات.</p>
          
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-colors">
              <Globe size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-pink-600 hover:text-white transition-colors">
              <Camera size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white transition-colors">
              <MonitorPlay size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-orange-500 hover:text-white transition-colors">
              <Radio size={20} />
            </a>
          </div>
        </div>

      </div>

      <div className="mt-16 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} عشيرة جوالة كلية الهندسة جامعة عين شمس. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
