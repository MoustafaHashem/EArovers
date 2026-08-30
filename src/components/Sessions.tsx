"use client";

import { sessionsData } from "@/data/clanData";
import { BookOpen, Calendar, UserCheck } from "lucide-react";

export function Sessions() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-white flex items-center justify-center gap-3 mb-4">
          <BookOpen className="text-[var(--color-scout-blue-light)]" size={36} />
          الدراسات والتأهيل
        </h2>
        <p className="text-gray-400 text-lg">برامج إعداد القادة وصقل المهارات الكشفية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessionsData.map((session) => (
          <div key={session.id} className="glass-card p-6 rounded-2xl hover:glass-card-hover transition-all">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">{session.title}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar size={20} className="text-[var(--color-scout-blue-light)]" />
                <span className="font-medium text-sm">{session.date}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <UserCheck size={20} className="text-[var(--color-glow-gold)]" />
                <span className="font-medium text-sm">{session.instructor}</span>
              </div>
            </div>
            
            <button className="w-full mt-8 bg-white/5 border border-white/10 text-white py-2 rounded-lg text-sm font-bold hover:bg-[var(--color-scout-blue-light)] hover:text-slate-900 transition-colors">
              التفاصيل
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
