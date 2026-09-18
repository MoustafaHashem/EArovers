import { prisma } from "@/lib/prisma";
import { Calendar, MapPin, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export const revalidate = 60; // Revalidate every minute

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: {
      isPublic: true,
    },
    orderBy: {
      startDate: "asc",
    },
  });

  const now = new Date();
  const upcomingEvents = events.filter(e => new Date(e.startDate) >= now);
  const pastEvents = events.filter(e => new Date(e.startDate) < now);

  return (
    <div className="min-h-screen bg-transparent text-foreground font-cairo" dir="rtl">
      <Navbar />
      
      <main className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-[#0b1a30] dark:text-white">
              فعاليات وأنشطة العشيرة
            </h1>
            <p className="text-[#475569] dark:text-gray-400 text-lg max-w-2xl mx-auto">
              تعرف على أحدث أنشطتنا ومعسكراتنا القادمة، وانضم إلينا في رحلتنا الكشفية.
            </p>
          </div>

          {upcomingEvents.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0b1a30] dark:text-white flex items-center gap-2">
                <span className="w-8 h-1 rounded-full bg-[#161e35] dark:bg-cyan-400" />
                الفعاليات القادمة
              </h2>
              
              <div className="grid gap-6">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {pastEvents.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#475569] dark:text-gray-300 flex items-center gap-2 mt-12">
                <span className="w-8 h-1 rounded-full bg-[#d4a373] dark:bg-gray-600" />
                فعاليات سابقة
              </h2>
              
              <div className="grid gap-6 opacity-75">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {events.length === 0 && (
            <div className="text-center py-20 glass-card rounded-3xl border border-[#d4a373]/25 dark:border-[var(--color-dark-border)]">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0b1a30] dark:text-white mb-2">لا توجد فعاليات معلنة حالياً</h3>
              <p className="text-[#475569] dark:text-gray-400">تابعنا لمعرفة أحدث أنشطتنا قريباً.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EventCard({ event }: { event: any }) {
  return (
    <div className="glass-card hover:glass-card-hover p-6 rounded-2xl border border-[#d4a373]/25 dark:border-[var(--color-dark-border)] hover:border-[#161e35] dark:hover:border-cyan-400/50 transition-all shadow-md group">
      <div className="flex flex-col md:flex-row gap-6">
        
        <div className="shrink-0 w-32 flex flex-col items-center justify-center text-center p-4 bg-[#f0eee6] dark:bg-white/5 rounded-xl border border-[#d4a373]/20 dark:border-white/5 group-hover:bg-[#161e35]/10 dark:group-hover:bg-cyan-500/10 transition-colors">
          <span className="text-sm font-bold text-[#475569] dark:text-gray-400 group-hover:text-[#161e35] dark:group-hover:text-cyan-400">
            {new Date(event.startDate).toLocaleDateString('ar-EG', { month: 'long' })}
          </span>
          <span className="text-4xl font-black text-[#161e35] dark:text-white my-1">
            {new Date(event.startDate).getDate()}
          </span>
          <span className="text-xs font-bold text-[#64748b] dark:text-gray-500">
            {new Date(event.startDate).getFullYear()}
          </span>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#161e35]/10 text-[#161e35] border border-[#161e35]/20 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30">
                {event.eventType}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#0b1a30] dark:text-white">{event.title}</h3>
            {event.description && (
              <p className="text-[#475569] dark:text-gray-400 mt-2 leading-relaxed text-sm">
                {event.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[#334155] dark:text-gray-300">
            {event.location && (
              <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                <MapPin size={16} className="text-red-500" />
                <span>{event.location}</span>
              </div>
            )}
            {event.maxParticipants && (
              <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                <Users size={16} className="text-emerald-600 dark:text-green-400" />
                <span>الحد الأقصى: {event.maxParticipants}</span>
              </div>
            )}
            {event.endDate && (
              <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                <Calendar size={16} className="text-indigo-600 dark:text-purple-400" />
                <span>إلى {new Date(event.endDate).toLocaleDateString('ar-EG')}</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
