import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event || !event.isPublic) notFound();

  const eventPhotos = await prisma.media.findMany({
    where: { eventId: event.id },
    take: 6,
  });

  // Check if event is upcoming
  const isUpcoming = new Date(event.startDate) >= new Date();

  // Check if user already joined (if logged in)
  let hasJoined = false;
  if (user) {
    const existingParticipant = await prisma.eventParticipant.findUnique({
      where: {
        eventId_memberId: {
          eventId: event.id,
          memberId: user.id
        }
      }
    });
    hasJoined = !!existingParticipant;
  }

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
              
              {/* Join Section */}
              <div className="pt-6 mt-6 border-t border-[var(--color-scout-blue)]/30">
                {isUpcoming ? (
                  user ? (
                    hasJoined ? (
                      <button disabled className="w-full bg-green-500/20 text-green-400 border border-green-500/50 py-3 rounded-xl font-bold cursor-not-allowed">
                        تم تسجيل حضورك
                      </button>
                    ) : (
                      <form action={async () => {
                        "use server";
                        const { prisma } = await import("@/lib/prisma");
                        await prisma.eventParticipant.create({
                          data: {
                            eventId: event.id,
                            memberId: user.id
                          }
                        });
                        const { revalidatePath } = await import("next/cache");
                        revalidatePath(`/events/${event.id}`);
                      }}>
                        <button type="submit" className="w-full bg-[var(--color-scout-blue)] hover:bg-[var(--color-scout-blue-light)] text-white py-3 rounded-xl font-bold transition-colors shadow-lg hover:shadow-[0_0_20px_rgba(92,124,182,0.4)]">
                          تسجيل الحضور
                        </button>
                      </form>
                    )
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-slate-400 mb-3">سجل الدخول لتتمكن من الانضمام للفعالية</p>
                      <Link href="/login" className="block w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 rounded-xl font-bold transition-colors">
                        تسجيل الدخول
                      </Link>
                    </div>
                  )
                ) : (
                  <button disabled className="w-full bg-slate-800 text-slate-500 py-3 rounded-xl font-bold cursor-not-allowed">
                    انتهت الفعالية
                  </button>
                )}
              </div>

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
