"use client";

import { sessionsData } from "@/data/clanData";
import { BookOpen, Calendar, UserCheck } from "lucide-react";

export function Sessions() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#0b1a30] dark:text-white flex items-center justify-center gap-2 md:gap-3 mb-4 text-balance">
          <BookOpen className="text-[#161e35] dark:text-cyan-400" size={36} />
          الدراسات والتأهيل
        </h2>
        <p className="text-[#475569] dark:text-slate-400 text-lg">برامج إعداد القادة وصقل المهارات الكشفية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessionsData.map((session) => (
          <div key={session.id} className="glass-card p-6 rounded-2xl hover:glass-card-hover transition-all">
            <h3 className="text-xl font-bold text-[#0b1a30] dark:text-white mb-6 border-b border-black/10 dark:border-white/10 pb-4">{session.title}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#334155] dark:text-slate-300">
                <Calendar size={20} className="text-[#161e35] dark:text-cyan-400" />
                <span className="font-medium text-sm">{session.date}</span>
              </div>
              <div className="flex items-center gap-3 text-[#334155] dark:text-slate-300">
                <UserCheck size={20} className="text-[#d4a373] dark:text-[#ffd700]" />
                <span className="font-medium text-sm">{session.instructor}</span>
              </div>
            </div>
            
            <button className="w-full mt-8 py-2 rounded-lg text-sm font-bold transition-all bg-[#d4a373]/10 hover:bg-[#d4a373]/25 text-[#0b1a30] border border-[#d4a373]/30 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-cyan-400 dark:hover:text-[#080b10]">
              التفاصيل
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
