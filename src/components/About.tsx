"use client";

import { motion } from "motion/react";
import { Compass, Users, Award, Heart } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "الحركة الكشفية",
    description:
      "تعلم مهارات الريادة والبقاء والعقد والربطات في بيئة تفاعلية تبني شخصية الجوال.",
  },
  {
    icon: Users,
    title: "القيادة والتطوير",
    description:
      "نظام تدرج قيادي يؤهل الجوال ليصبح قائدًا فعالًا في العشيرة والمجتمع.",
  },
  {
    icon: Award,
    title: "المسابقات والبطولات",
    description:
      "المشاركة في المهرجانات والمسابقات على مستوى الجامعة والمنطقة الكشفية.",
  },
  {
    icon: Heart,
    title: "خدمة المجتمع",
    description:
      "أنشطة تطوعية وخيرية تعزز روح العطاء والمسؤولية الاجتماعية لدى الجوالين.",
  },
];

export function About() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          عن الجوالة
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
          عشيرة جوالة كلية الهندسة جامعة عين شمس — واحدة من أعرق العشائر
          الكشفية الجامعية في مصر. تجمع بين التقاليد الكشفية العريقة وروح
          الشباب الجامعي في أنشطة متنوعة تبني القادة وتخدم المجتمع.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center group hover:border-[var(--color-scout-blue)]/50 transition-colors"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[var(--color-scout-blue)]/20 flex items-center justify-center group-hover:bg-[var(--color-scout-blue)]/30 transition-colors">
                <Icon
                  size={28}
                  className="text-[var(--color-scout-blue-light)]"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
