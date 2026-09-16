"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const islands = [
  {
    id: 1,
    image: "/images/island_1_.png",
    text: "عشيرة هندسة عين شمس ضد عشائر الهندسة من جامعات اخرى",
    href: "/island-1",
  },
  {
    id: 2,
    image: "/images/island_2_.png",
    text: "عشيرة الهندسة ضد عشائر عين شمس الاخريات",
    href: "/island-2",
  },
  {
    id: 3,
    image: "/images/island_3.png",
    text: "3",
    href: "/island-3",
  },
  {
    id: 4,
    image: "/images/island_4.png",
    text: "4",
    href: "/island-4",
  },
  {
    id: 5,
    image: "/images/island_5.png",
    text: "5",
    href: "/island-5",
  },
  {
    id: 6,
    image: "/images/island_6.png",
    text: "6",
    href: "/island-6",
  },
  {
    id: 7,
    image: "/images/island_7.png",
    text: "7",
    href: "/island-7",
  },
];

export default function HallOfFamePage() {
  const [hoveredIsland, setHoveredIsland] = useState<number | null>(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden px-4 py-16"
      style={{
        background:
          "linear-gradient(to bottom, #17283d 0%, #101d2d 35%, #0b1420 70%, #060b14 100%)",
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

      {/* Warm gold glow */}
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

      {/* Mountain silhouette */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-full opacity-60"
        style={{
          background: "#060B14",
          clipPath:
            "polygon(0% 100%, 0% 60%, 8% 45%, 18% 65%, 28% 30%, 38% 55%, 48% 20%, 58% 50%, 68% 35%, 78% 60%, 88% 40%, 100% 55%, 100% 100%)",
        }}
      />

      {/* Back button */}
      <Link
        href="/"
        className="relative z-50 inline-flex items-center gap-2 text-[var(--color-scout-blue-light)] transition hover:text-white"
      >
        <ArrowRight size={18} />
        العودة
      </Link>

      {/* Main circular area */}
      <div className="relative z-10 mx-auto mt-4 h-[900px] w-full max-w-[1200px]">
        {/* Center image */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/center.png"
            alt="Center"
            width={420}
            height={420}
            className="h-[420px] w-[420px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* Islands */}
        {islands.map((island, index) => {
          const angle = -90 + index * (360 / islands.length);

          return (
            <div
              key={island.id}
              className={`absolute left-1/2 top-1/2 ${
                hoveredIsland === island.id ? "z-40" : "z-20"
              }`}
              style={{
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translateX(clamp(230px, 32vw, 410px))
                  rotate(${-angle}deg)
                `,
              }}
            >
              <div
                className="
                  relative
                  flex
                  h-[190px]
                  w-[190px]
                  items-center
                  justify-center
                  sm:h-[220px]
                  sm:w-[220px]
                  md:h-[260px]
                  md:w-[260px]
                "
                onMouseEnter={() => setHoveredIsland(island.id)}
                onMouseLeave={() => setHoveredIsland(null)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();

                  setPosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }}
              >
                {/* Clickable island */}
                <Link
                  href={island.href}
                  aria-label={island.text}
                  className="
                    block
                    h-full
                    w-full
                    cursor-pointer
                    transition-transform
                    duration-300
                    ease-out
                    hover:scale-110
                    active:scale-95
                    focus:outline-none
                    focus-visible:scale-110
                  "
                >
                  <Image
                    src={island.image}
                    alt={island.text}
                    width={320}
                    height={320}
                    className="
                      h-full
                      w-full
                      object-contain
                      drop-shadow-[0_15px_25px_rgba(0,0,0,0.45)]
                    "
                  />
                </Link>

                {/* Hover text */}
                {hoveredIsland === island.id && (
                  <div
                    dir="rtl"
                    className="
                      pointer-events-none
                      absolute
                      z-50
                      w-max
                      max-w-[320px]
                      rounded-xl
                      border
                      border-white/10
                      bg-[#0b1420]/95
                      px-4
                      py-2
                      text-center
                      text-sm
                      leading-6
                      text-white
                      shadow-2xl
                      backdrop-blur-sm
                    "
                    style={{
                      left: position.x + 18,
                      top: position.y + 18,
                    }}
                  >
                    {island.text}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}