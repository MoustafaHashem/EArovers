"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HallOfFamePage() {
  return (
    <div
      className="relative min-h-screen w-full px-4 py-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #060B14 0%, #0A192F 35%, #112240 60%, #060B14 100%)",
      }}
    >
      {/* Starfield */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 10% 15%, white, transparent), radial-gradient(1px 1px at 80% 10%, white, transparent), radial-gradient(1.5px 1.5px at 60% 25%, white, transparent), radial-gradient(1px 1px at 30% 35%, white, transparent), radial-gradient(1px 1px at 90% 40%, white, transparent), radial-gradient(1.5px 1.5px at 45% 20%, white, transparent), radial-gradient(1px 1px at 15% 45%, white, transparent), radial-gradient(1px 1px at 70% 30%, white, transparent)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Warm gold glow, top center — echoes the emblem glow in the reference */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 5%, rgba(255,215,0,0.15) 0%, transparent 40%)",
        }}
      />

      {/* Cool blue/cyan ambient glow, mid-page — echoes the crystal trophies' glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 55%, rgba(92,124,182,0.12) 0%, transparent 35%), radial-gradient(circle at 80% 60%, rgba(124,161,230,0.10) 0%, transparent 35%)",
        }}
      />

      {/* Mountain silhouette at the bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-40 opacity-60"
        style={{
          background: "#060B14",
          clipPath:
            "polygon(0% 100%, 0% 60%, 8% 45%, 18% 65%, 28% 30%, 38% 55%, 48% 20%, 58% 50%, 68% 35%, 78% 60%, 88% 40%, 100% 55%, 100% 100%)",
        }}
      />

      <Link
        href="/"
        className="relative self-start inline-flex items-center gap-2 text-[var(--color-scout-blue-light)] hover:text-white transition"
      >
        <ArrowRight size={18} />
        العودة
      </Link>
    </div>
  );
}