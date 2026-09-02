import Link from "next/link";
import { Compass } from "lucide-react";

export const metadata = {
  title: "الصفحة غير موجودة | جوالة هندسة عين شمس",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="relative mb-8">
        <Compass className="w-32 h-32 text-[var(--color-scout-blue)] animate-pulse" />
        <div className="absolute inset-0 border-4 border-dashed border-[var(--color-dark-border)] rounded-full animate-[spin_10s_linear_infinite]" />
      </div>
      
      <h1 className="text-6xl font-black text-white mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-300 mb-6">لقد ضللت الطريق يا كشاف!</h2>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        يبدو أنك تبحث عن صفحة غير موجودة، أو ربما تم نقلها. لا تقلق، حتى أمهر الكشافة يضلون طريقهم أحياناً.
      </p>
      
      <Link 
        href="/"
        className="px-8 py-3 rounded-full bg-[var(--color-scout-blue)] text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-[var(--color-scout-blue)]/20"
      >
        العودة للمعسكر (الرئيسية)
      </Link>
    </div>
  );
}
