import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event || !event.isPublic) notFound();

  // In a real app we'd fetch actual related photos from Media table where category matches event title
  const eventPhotos = await prisma.media.findMany({
    where: { category: event.eventType }, // Just an approximation for UI sake
    take: 6,
  });

  return (
    <main dir="rtl" className="min-h-screen w-full pt-32 pb-16 px-6 md:px-16 bg-[var(--color-dark-bg)] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,102,255,0.15),rgba(255,255,255,0))] font-cairo">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Back navigation */}
        <Link href="/events" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5 rotate-180" />
          <span>العودة للفعاليات</span>
        </Link>

        {/* Hero Section with Fade In effect */}
        <div className="relative rounded-3xl overflow-hidden min-h-[40vh] md:min-h-[50vh] flex items-end p-8 border border-slate-800 animate-in fade-in zoom-in-95 duration-1000">
          {event.coverImage ? (
            <Image 
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover -z-10 brightness-50"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-slate-800 -z-10" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent -z-10" />
          
          <div className="space-y-4">
            <Badge className="bg-[var(--color-scout-blue)] text-white text-sm px-4 py-1">
              {event.eventType}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-start">
          
          {/* Details Card */}
          <div className="order-2 md:order-1 glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-slate-700" />
              <h2 className="text-2xl font-black text-white">تفاصيل الفعالية</h2>
              <span className="h-px w-12 bg-slate-700" />
            </div>
            
            <p className="text-slate-300 whitespace-pre-line leading-relaxed text-lg">
              {event.description || "لا يوجد وصف لهذه الفعالية بعد."}
            </p>
          </div>

          {/* Meta Information */}
          <div className="order-1 md:order-2 space-y-4">
            <div className="glass-card p-6 rounded-3xl border border-[var(--color-scout-blue)]/30 space-y-6">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-scout-blue)]/20 flex items-center justify-center text-[var(--color-scout-blue)] shrink-0">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">التاريخ</p>
                  <p className="font-bold text-white text-lg">
                    {new Date(event.startDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {event.location && (
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">المكان</p>
                    <p className="font-bold text-white text-lg">{event.location}</p>
                  </div>
                </div>
              )}

              {event.maxParticipants && (
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">عدد المشاركين</p>
                    <p className="font-bold text-white text-lg">{event.maxParticipants} مشارك</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Gallery Section */}
        {eventPhotos.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-slate-800">
            <h2 className="text-3xl font-black text-white">معرض الصور</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {eventPhotos.map((photo) => (
                <div key={photo.id} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800 group">
                  <Image 
                    src={photo.url} 
                    alt="Event Photo" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
