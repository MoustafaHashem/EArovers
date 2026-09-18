import { Sessions } from "@/components/home/Sessions";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";

export const metadata = {
  title: "التأهيل والدراسات | عشيرة جوالة هندسة عين شمس",
  description: "الدورات التأهيلية والدراسات الكشفية في عشيرة جوالة هندسة جامعة عين شمس",
};

export default function TrainingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24 bg-transparent text-foreground">
      <Navbar />
      
      <section className="w-full py-12 px-6 z-10 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#0b1a30] dark:text-white mb-4">التأهيل والدراسات الكشفية</h1>
          <p className="text-[#475569] dark:text-gray-400 text-lg max-w-2xl mx-auto">
            مسارات التدريب والتأهيل لإعداد قادة الجوالة
          </p>
        </div>
        <Sessions />
      </section>
      
      <Identity />
    </main>
  );
}
