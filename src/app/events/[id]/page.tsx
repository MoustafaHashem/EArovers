import { notFound } from "next/navigation";
import { EventImageCarousel } from "@/components/eventimageslider";
import { oldEvents } from "@/data/eventsdata";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = oldEvents.find((e) => e.id === id);
  if (!event) notFound();

  return (
   <main dir="rtl" className="min-h-screen w-full px-6 py-16 md:px-16">
  <div className="flex items-center justify-start gap-4 mb-10">
    <h1 className="text-3xl md:text-4xl font-black text-white">
      {event.title}
    </h1>
    <span className="h-px w-16 bg-white/40" />
  </div>

  <EventImageCarousel images={event.images} alt={event.title} />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-start">
        <ul className="order-2 md:order-1 space-y-4 text-lg font-bold text-white">
          <li className="flex items-center gap-2 justify-end md:justify-start">
            <span>•</span><span>التاريخ: {event.displayDate}</span>
          </li>
          {event.location && (
            <li className="flex items-center gap-2 justify-end md:justify-start">
              <span>•</span><span>المكان: {event.location}</span>
            </li>
          )}
        </ul>

        <div className="order-1 md:order-2 bg-gray-300/90 rounded-3xl p-8 min-h-[200px]">
          <div className="flex items-center gap-4 mb-6 justify-center">
            <span className="h-px w-12 bg-slate-500/50" />
            <h2 className="text-2xl font-black text-[var(--color-scout-navy)]">التفاصيل</h2>
            <span className="h-px w-12 bg-slate-500/50" />
          </div>
          <p className="text-slate-700 whitespace-pre-line text-center">{event.description}</p>
        </div>
      </div>
    </main>
  );
}