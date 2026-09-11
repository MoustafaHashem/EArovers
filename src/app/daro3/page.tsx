"use client";
import { Navbar } from "@/components/Navbar";
import { Identity } from "@/components/Identity";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BADGES_DATA } from "../../data/badges";
export default function BadgesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBadges = useMemo(() => {
    return BADGES_DATA.filter((badge) =>
      badge.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );
  }, [searchQuery]);
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--color-scout-navy)]">
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        {/* Header Section */}
        <header className="max-w-5xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-amber-500 mb-2">
            عشيرة جوالة هندسة
          </h1>
          <p className="text-lg text-slate-300">
            الدروع الكشفية ومجالات التنافس
          </p>
        </header>

        {/* Search Input */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن أي درع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-5 pr-12 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <svg
              className="w-6 h-6 absolute right-4 top-3.5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredBadges.length > 0 ? (
            filteredBadges.map((badge) => (
              <Link
                key={badge.id}
                href={`/daro3/${badge.id}`}
                className="group bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center hover:border-amber-500/50 hover:bg-slate-800/60 transition-all duration-300"
              >
                <div className="relative w-64 h-64 mb-2 group-hover:scale-110 transition-transform">
                  <Image
                    src={badge.image}
                    alt={badge.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-semibold text-lg text-slate-100 group-hover:text-amber-400">
                  {badge.title}
                </h3>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-400">
              لم يتم العثور على درع بهذا الاسم.
            </div>
          )}
        </div>
      </main>

      <Identity />
    </div>
  );
}
