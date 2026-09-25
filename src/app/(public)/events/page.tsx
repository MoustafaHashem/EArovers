import { EVENTS_DATA } from "@/data/eventsData";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";
import { EventsListClient } from "./EventsListClient";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفعاليات والأنشطة | عشيرة جوالة هندسة عين شمس",
  description: "تعرف على أحدث أنشطتنا ومعسكراتنا القادمة، وانضم إلينا في رحلتنا الكشفية.",
};

export default async function EventsPage() {
  const events = EVENTS_DATA;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-transparent text-foreground font-cairo" dir="rtl">
      <Navbar />
      
      {/* Ambient Background Blurs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4a373]/10 dark:bg-cyan-500/10 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#161e35]/10 dark:bg-blue-600/10 rounded-full blur-[160px]"></div>
      </div>

      <main className="flex-1 container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center text-[#161e35] dark:text-cyan-400 hover:opacity-80 mb-4 transition-colors font-bold">
              <ArrowRight className="w-5 h-5 ml-2" />
              العودة للرئيسية
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-[#0b1a30] dark:text-white">
              فعاليات وأنشطة العشيرة
            </h1>
            <p className="text-[#475569] dark:text-gray-400 text-lg max-w-2xl">
              تعرف على أحدث أنشطتنا ومعسكراتنا القادمة، وانضم إلينا في رحلتنا الكشفية.
            </p>
          </div>

          {/* 2 Tabs & Filtered Events List */}
          <EventsListClient events={events} />

        </div>
      </main>

      <div className="w-full z-10 relative">
        <Identity />
      </div>
    </div>
  );
}
