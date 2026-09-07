import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Calendar, User, Award, History } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

export default async function PersonBiographyPage({
  params,
}: {
  params: { id: string };
}) {
  const person = await prisma.person.findUnique({
    where: { id: params.id },
    include: {
      roles: {
        orderBy: { year: 'desc' }
      }
    }
  });

  if (!person) {
    notFound();
  }

  // To perfectly display shields/trophies, we could add a new model.
  // The user said "with his trophies and roles through his years".
  // For now, I'll display the roles.

  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-scout-navy)] text-white overflow-x-hidden font-cairo" dir="rtl">
      <Navbar />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-scout-blue)] rounded-full blur-[200px] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-12 z-10 max-w-4xl">
        <Link href="/hierarchy" className="inline-flex items-center text-[var(--color-scout-blue-light)] hover:text-white mb-8 transition-colors">
          <ArrowRight className="w-5 h-5 ml-2" />
          العودة للهيكل التنظيمي
        </Link>
        
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-[var(--color-dark-border)] shadow-2xl relative overflow-hidden">
          {/* Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-scout-blue)]/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-[var(--color-dark-bg)] border-2 border-[var(--color-scout-blue)]/50 shadow-xl overflow-hidden flex items-center justify-center">
                {person.avatarUrl ? (
                  <Image src={person.avatarUrl} alt={person.fullName} width={200} height={200} className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-gray-500" />
                )}
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-2">{person.fullName}</h1>
                <p className="text-xl text-[var(--color-scout-blue-light)] font-medium">
                  {person.roles[0]?.roleTitle || "كادر عشيرة"}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-[var(--color-scout-blue)]" />
                  النبذة التعريفية
                </h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {person.bio || "لا توجد نبذة تعريفية مسجلة حتى الآن."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="glass-card p-6 rounded-2xl border border-[var(--color-dark-border)]">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <History className="w-6 h-6 text-[var(--color-scout-blue)]" />
              تاريخ المناصب
            </h2>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.125rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-scout-blue)]/20 before:to-transparent">
              {person.roles.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                person.roles.map((role: any) => (
                  <div key={role.id} className="relative pl-8 md:pl-0">
                    <div className="md:flex items-center justify-between mb-1 group">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-[var(--color-scout-blue)] bg-[var(--color-dark-bg)] text-white shadow-sm shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute right-0 translate-x-1/2 md:relative md:translate-x-0"></div>
                        <h4 className="font-bold text-white text-lg">{role.roleTitle}</h4>
                      </div>
                      <time className="block mb-2 text-sm font-bold text-[var(--color-scout-blue-light)] pr-4 md:pr-0">عام {role.year}</time>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 py-4 pr-8">لا يوجد مناصب مسجلة</div>
              )}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-[var(--color-dark-border)]">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-[var(--color-anchor)]" />
              الدروع والإنجازات
            </h2>
            
            <div className="py-8 text-center bg-white/5 rounded-xl border border-white/5">
              <Award className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">نظام الدروع قيد التطوير</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
