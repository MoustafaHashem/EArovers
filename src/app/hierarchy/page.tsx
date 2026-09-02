import { ClanTree } from "@/components/ClanTree";
import { Navbar } from "@/components/Navbar";
import { Identity } from "@/components/Identity";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HierarchyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[var(--color-scout-navy)] overflow-x-hidden relative">
      <Navbar />
      
      {/* Background Grid Styling for "Option C" Vibe */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(92,124,182,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(92,124,182,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-scout-blue)] rounded-full blur-[200px] opacity-10"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[var(--color-anchor)] rounded-full blur-[200px] opacity-10"></div>
      </div>

      <div className="w-full px-4 pt-32 pb-12 z-10 flex flex-col min-h-screen">
        <div className="max-w-7xl mx-auto w-full mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <Link href="/" className="inline-flex items-center text-[var(--color-scout-blue-light)] hover:text-white mb-4 transition-colors">
              <ArrowRight className="w-5 h-5 ml-2" />
              العودة للرئيسية
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-white">الهيكل التنظيمي والقيادي</h1>
            <p className="text-gray-400 text-lg mt-2 max-w-2xl">
              تصفح الأرشيف الكامل لتشكيل مجلس القيادة والهيكل المعاون والرهوط عبر السنين.
            </p>
          </div>
        </div>
        
        {/* The Tree */}
        <div className="flex-1 w-full bg-black/20 rounded-3xl sm:p-8 border border-[var(--color-dark-border)] shadow-2xl backdrop-blur-md relative overflow-hidden">
          <ClanTree />
        </div>
      </div>

      <div className="w-full z-10">
        <Identity />
      </div>
    </main>
  );
}
