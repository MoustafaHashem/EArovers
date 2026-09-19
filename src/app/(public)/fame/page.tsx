import { FameIslands } from "@/components/home/FameIslands";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "لوحة الشرف | عشيرة جوالة هندسة عين شمس",
  description: "لوحة الشرف وإنجازات عشيرة جوالة هندسة جامعة عين شمس",
};

export const revalidate = 60;

export default async function FamePage() {
  const events = await prisma.event.findMany({
    orderBy: { startDate: 'desc' },
  });

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24" style={{
        background: "linear-gradient(to bottom, #17283d 0%, #101d2d 35%, #0b1420 70%, #060b14 100%)",
      }}>
      <Navbar />
      
      <section className="w-full z-10 flex-grow pb-16">
        <FameIslands events={events} />
      </section>
      
      <Identity />
    </main>
  );
}
