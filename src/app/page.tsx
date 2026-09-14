import { DesktopHome } from "@/components/home/DesktopHome";
import { MobileHome } from "@/components/home/MobileHome";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="w-full">
      <Navbar />
      {/* Shown ONLY on Desktop (lg and up) */}
      <div className="hidden lg:block">
        <DesktopHome />
      </div>

      {/* Shown ONLY on Mobile (below lg) */}
      <div className="block lg:hidden">
        <MobileHome />
      </div>
    </main>
  );
}
