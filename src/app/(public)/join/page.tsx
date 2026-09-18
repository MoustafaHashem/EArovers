import { JoinForm } from "@/components/home/JoinForm";
import { Navbar } from "@/components/layout/Navbar";
import { Identity } from "@/components/layout/Identity";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JoinPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-transparent text-foreground overflow-x-hidden relative">
      <Navbar />
      
      {/* Background styling */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#161e35]/10 dark:from-cyan-500/15 to-transparent pointer-events-none" />

      <div className="w-full max-w-4xl px-4 py-32 z-10 flex flex-col min-h-screen">
        <Link href="/" className="inline-flex items-center text-[#161e35] dark:text-cyan-400 hover:opacity-80 mb-8 transition-colors self-start font-bold">
          <ArrowRight className="w-5 h-5 ml-2" />
          العودة للرئيسية
        </Link>
        
        <div className="flex-1 w-full bg-white/70 dark:bg-black/40 rounded-3xl p-4 sm:p-8 border border-[#d4a373]/25 dark:border-cyan-500/20 shadow-xl backdrop-blur-md">
          <JoinForm />
        </div>
      </div>

      <Identity />
    </main>
  );
}
