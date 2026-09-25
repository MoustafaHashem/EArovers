import { notFound } from "next/navigation";
import { EVENTS_DATA } from "@/data/eventsData";
import { CalendarDays, MapPin, Users, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = EVENTS_DATA.find((e) => e.id === id);
  const eventPhotos: any[] = [];
  const user = null;
  const hasJoined = false;

  if (!event) notFound();

  const isUpcoming = new Date(event.startDate) >= new Date();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-transparent text-foreground font-cairo" dir="rtl">
      <Navbar />

      {/* Ambient Background Blurs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4a373]/10 dark:bg-cyan-500/10 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#161e35]/10 dark:bg-blue-600/10 rounded-full blur-[160px]"></div>
      </div>

      <main className="flex-1 container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Back Navigation */}
          <Link href="/events" className="inline-flex items-center text-[#161e35] dark:text-cyan-400 hover:opacity-80 transition-colors font-bold">
            <ArrowRight className="w-5 h-5 ml-2" />
            العودة للفعاليات
          </Link>

          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden min-h-[40vh] md:min-h-[50vh] flex items-end p-8 border border-[#d4a373]/25 dark:border-white/10 shadow-xl">
            {event.coverImage ? (
              <Image 
                src={event.coverImage}
                alt={event.title}
                fill
                sizes="100vw"
                className="object-cover -z-10 brightness-[0.4]"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#161e35] to-[#0b1a30] dark:from-[#0a1628] dark:to-[#080b10] -z-10" />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent -z-10" />

            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#d4a373] text-[#0b1a30] dark:bg-cyan-500 dark:text-[#080b10]">
                  {event.eventType}
                </span>
                <span className={`px-3.5 py-1 rounded-full text-xs font-bold ${
                  isUpcoming 
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                    : "bg-black/40 text-gray-300 border border-white/10"
                }`}>
                  {isUpcoming ? "فعالية قادمة" : "فعالية منتهية"}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-md">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Description Body */}
            <div className="md:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-[#d4a373]/25 dark:border-white/10 shadow-xl space-y-4 order-2 md:order-1">
              <h2 className="text-2xl font-black text-[#0b1a30] dark:text-white border-b border-black/10 dark:border-white/10 pb-4">
                تفاصيل الفعالية
              </h2>
              <p className="text-[#334155] dark:text-gray-300 whitespace-pre-line leading-relaxed text-lg">
                {event.description || "لا يوجد وصف لهذه الفعالية بعد."}
              </p>
            </div>

            {/* Meta Information Sidebar */}
            <div className="order-1 md:order-2 space-y-4">
              <div className="glass-card p-6 rounded-3xl border border-[#d4a373]/25 dark:border-cyan-500/20 shadow-xl space-y-6">
                {/* Start Date */}
                <div className="flex items-center gap-4 text-[#334155] dark:text-gray-300">
                  <div className="w-12 h-12 rounded-xl bg-[#161e35]/10 dark:bg-cyan-500/15 flex items-center justify-center text-[#161e35] dark:text-cyan-400 shrink-0 border border-[#161e35]/10 dark:border-cyan-500/20">
                    <CalendarDays className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-[#64748b] dark:text-gray-500 font-bold">تاريخ البدء</p>
                    <p className="font-bold text-[#0b1a30] dark:text-white text-lg">
                      {new Date(event.startDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* End Date */}
                <div className="flex items-center gap-4 text-[#334155] dark:text-gray-300">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/15 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 border border-purple-500/10 dark:border-purple-500/20">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-[#64748b] dark:text-gray-500 font-bold">ينتهي في</p>
                    <p className="font-bold text-[#0b1a30] dark:text-white text-lg">
                      {event.endDate 
                        ? new Date(event.endDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
                        : "غير محدد"}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 text-[#334155] dark:text-gray-300">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-500/15 flex items-center justify-center text-red-500 dark:text-red-400 shrink-0 border border-red-500/10 dark:border-red-500/20">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-[#64748b] dark:text-gray-500 font-bold">المكان</p>
                    <p className="font-bold text-[#0b1a30] dark:text-white text-lg">
                      {event.location || "غير محدد"}
                    </p>
                  </div>
                </div>



              </div>
            </div>

          </div>

          {/* Gallery Section */}
          {eventPhotos.length > 0 && (
            <div className="space-y-6 pt-8 border-t border-[#d4a373]/20 dark:border-white/10">
              <h2 className="text-3xl font-black text-[#0b1a30] dark:text-white">معرض الصور</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {eventPhotos.map((photo) => (
                  <div key={photo.id} className="relative aspect-square rounded-2xl overflow-hidden border border-[#d4a373]/20 dark:border-white/10 group shadow-md">
                    <Image 
                      src={photo.url} 
                      alt="Event Photo" 
                      fill 
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <div className="w-full z-10 relative">
        <Identity />
      </div>
    </div>
  );
}
