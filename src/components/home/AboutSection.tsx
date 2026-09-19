"use client";

import React from "react";
import { Compass, Users, Map, ShieldCheck } from "lucide-react";

export function AboutSection() {
  const values = [
    {
      icon: <Compass className="text-[var(--color-scout-blue-light)]" size={32} />,
      title: "رحلات واستكشاف",
      description: "نكتشف الطبيعة ونتعلم مهارات البقاء والاعتماد على النفس في مختلف الظروف.",
    },
    {
      icon: <Users className="text-[var(--color-scout-blue-light)]" size={32} />,
      title: "خدمة المجتمع",
      description: "نؤمن بدورنا في بناء المجتمع وتقديم المساعدة والمشاركة في الأعمال التطوعية.",
    },
    {
      icon: <ShieldCheck className="text-[var(--color-scout-blue-light)]" size={32} />,
      title: "بناء الشخصية",
      description: "نعمل على صقل مهارات القيادة والعمل الجماعي والالتزام بالقيم الأصيلة.",
    },
    {
      icon: <Map className="text-[var(--color-scout-blue-light)]" size={32} />,
      title: "أنشطة متنوعة",
      description: "مشاركات ثقافية، فنية، رياضية، ودينية تساهم في تطوير وتنمية الجوال.",
    },
  ];

  return (
    <section className="w-full bg-transparent py-20 px-6 border-b border-white/5 relative overflow-hidden text-right" id="about" dir="rtl">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-scout-blue)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--color-scout-blue-light)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            عن <span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-[var(--color-scout-blue-light)]">العشيرة</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            عشيرة جوالة كلية الهندسة جامعة عين شمس، من أعرق العشائر الكشفية التي تهدف إلى بناء الشباب بدنياً وثقافياً واجتماعياً ليكونوا قادة في مجتمعاتهم.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-black/40 rounded-xl flex items-center justify-center mb-6 border border-white/5 shadow-lg">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
