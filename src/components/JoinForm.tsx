"use client";

import { Send } from "lucide-react";

export function JoinForm() {
  return (
    <div className="w-full max-w-xl mx-auto glass-card p-8 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-scout-blue)] rounded-full blur-[80px] opacity-20" />
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-black text-white mb-2">انضم إلينا</h2>
        <p className="text-gray-400">سجل بياناتك للالتحاق בעشيرة جوالة هندسة عين شمس</p>
      </div>

      <form className="flex flex-col gap-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">الاسم الثلاثي</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-scout-blue-light)] transition-colors" placeholder="أحمد محمد محمود" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">رقم الهاتف (واتساب)</label>
          <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-scout-blue-light)] transition-colors text-right" placeholder="01xxxxxxxxx" dir="ltr" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">الفرقة الدراسية</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-[var(--color-scout-blue-light)] transition-colors">
            <option className="bg-[var(--color-scout-navy)] text-white">إعدادي</option>
            <option className="bg-[var(--color-scout-navy)] text-white">الفرقة الأولى</option>
            <option className="bg-[var(--color-scout-navy)] text-white">الفرقة الثانية</option>
            <option className="bg-[var(--color-scout-navy)] text-white">الفرقة الثالثة</option>
            <option className="bg-[var(--color-scout-navy)] text-white">الفرقة الرابعة</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">مجالات الاهتمام (اختياري)</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-scout-blue-light)] transition-colors" placeholder="رياضة، فنون، سمر..." />
        </div>

        <button type="submit" className="mt-4 bg-[var(--color-scout-blue)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--color-scout-blue-light)] hover:text-[var(--color-scout-navy)] transition-colors shadow-lg">
          إرسال الطلب
          <Send size={18} className="rotate-180" />
        </button>
      </form>
    </div>
  );
}
