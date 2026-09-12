"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HallOfFamePage() {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="relative min-h-screen w-full px-4 py-16">
      {/* Starfield */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 10% 15%, white, transparent), radial-gradient(1px 1px at 80% 10%, white, transparent), radial-gradient(1.5px 1.5px at 60% 25%, white, transparent), radial-gradient(1px 1px at 30% 35%, white, transparent), radial-gradient(1px 1px at 90% 40%, white, transparent), radial-gradient(1.5px 1.5px at 45% 20%, white, transparent), radial-gradient(1px 1px at 15% 45%, white, transparent), radial-gradient(1px 1px at 70% 30%, white, transparent)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Warm gold glow, top center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 5%, rgba(255,215,0,0.15) 0%, transparent 40%)",
        }}
      />

      {/* Cool blue/cyan ambient glow */}
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

      {/* Island, icon-sized image with cursor-following tooltip */}
      <div className="flex flex-col items-center mt-32">
        <div
          className="relative flex items-center justify-center"
          style={{ width: 280, height: 280 }}
        >
          <Image
            src="/images/island1.png"
            alt=""
            width={280}
            height={280}
            className="object-contain cursor-pointer"
          />

          {/* Smaller invisible hover zone, centered on top of the image */}
          <div
            className="absolute"
            style={{
              width: 150,
              height: 290,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isHovering && (
              <div
                className="absolute whitespace-nowrap bg-[var(--color-scout-navy-light)] text-white text-sm px-3 py-1.5 rounded-lg pointer-events-none border border-[var(--color-dark-border)] z-10"
                style={{
                  left: position.x + 16,
                  top: position.y + 16,
                }}
              >
                اكتب النص هنا
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}