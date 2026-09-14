import { HallOfFame } from "@/components/home/HallOfFame";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";

export const metadata = {
  title: "لوحة الشرف | عشيرة جوالة هندسة عين شمس",
  description: "لوحة الشرف وإنجازات عشيرة جوالة هندسة جامعة عين شمس",
};

export const revalidate = 60;

export default function FamePage() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24 bg-[var(--color-scout-navy)]">
      <Navbar />
      
      <section className="w-full py-12 px-6 z-10 flex-grow">
        <HallOfFame />
      </section>
      
      <Identity />
    </main>
  );
}
