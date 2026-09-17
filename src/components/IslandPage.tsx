import {
  ArrowRight,
  Trophy,
  Star,
  Users,
  UserRound,
  Shield,
  Images,
  Award,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

type IslandPageProps = {
  title: string;
  subtitle?: string;
  image?: string;

  cards: {
    id: number;
    eventName: string;
    year: string;

    delegationName?: string;
    coachName?: string;

    overallPlacement?: string;

    awards?: string[];

    shieldPlacements?: {
      shieldName: string;
      placement: string;
    }[];

    members?: string[];

    photos?: string[];
  }[];
};

export default function IslandPage({
  title,
  subtitle,
  image,
  cards,
}: IslandPageProps) {
  return (
    <main
      dir="rtl"
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

      {/* Gold glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 5%, rgba(255,215,0,0.15) 0%, transparent 40%)",
        }}
      />

      {/* Blue glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 55%, rgba(92,124,182,0.12) 0%, transparent 35%), radial-gradient(circle at 80% 60%, rgba(124,161,230,0.10) 0%, transparent 35%)",
        }}
      />

      {/* Mountains */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-full opacity-60"
        style={{
          background: "#060B14",
          clipPath:
            "polygon(0% 100%, 0% 60%, 8% 45%, 18% 65%, 28% 30%, 38% 55%, 48% 20%, 58% 50%, 68% 35%, 78% 60%, 88% 40%, 100% 55%, 100% 100%)",
        }}
      />

      {/* Back button */}
      <div className="relative z-20 mx-auto mb-12 w-full max-w-5xl">
        <Link
          href="/hall-of-fame"
          className="inline-flex items-center gap-2 text-[var(--color-scout-blue-light)] transition hover:text-white"
        >
          <ArrowRight size={18} />
          العودة
        </Link>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        {/* Header */}
        <div className="mb-14 text-center">
          {image && (
            <Image
              src={image}
              alt={title}
              width={300}
              height={300}
              className="mx-auto mb-6 h-[300px] w-[300px] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.45)]"
            />
          )}

          <h1 className="mb-4 flex items-center justify-center gap-4 text-3xl font-black text-white md:text-4xl">
            <Trophy
              className="text-[var(--color-glow-gold)]"
              size={40}
            />
            {title}
          </h1>

          {subtitle && (
            <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="relative w-full space-y-12 border-r-2 border-[var(--color-dark-border)] pr-7">
          {cards.map((item) => (
            <div key={item.id} className="relative">
              {/* Timeline dot */}
              <div
                className="
                  absolute
                  -right-[36px]
                  top-7
                  h-4
                  w-4
                  rounded-full
                  bg-[var(--color-glow-gold)]
                  shadow-[0_0_12px_var(--color-glow-gold)]
                "
              />

              {/* Glass card */}
              <div className="glass-card glass-card-hover mr-4 rounded-2xl p-6 md:p-8">
                {/* Event name + year + overall placement */}
                <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row">
                  <div>
                    <h2 className="mb-3 text-2xl font-bold text-white">
                      {item.eventName}
                    </h2>

                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-[var(--color-scout-blue)]/20
                        px-3
                        py-1
                        text-sm
                        font-bold
                        text-[var(--color-scout-blue-light)]
                      "
                    >
                      {item.year}
                    </span>
                  </div>

                  {item.overallPlacement && (
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-gradient-to-r
                        from-amber-500
                        to-yellow-400
                        px-4
                        py-2
                        font-black
                        text-slate-900
                        shadow-lg
                      "
                    >
                      <Trophy size={20} />
                      المركز العام: {item.overallPlacement}
                    </div>
                  )}
                </div>

                {/* Delegation + Coach */}
                {(item.delegationName || item.coachName) && (
                  <div className="grid gap-4 border-t border-white/10 py-5 md:grid-cols-2">
                    {item.delegationName && (
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-2 flex items-center gap-2 text-[var(--color-scout-blue-light)]">
                          <Users size={18} />
                          <h3 className="font-bold">اسم الوفد</h3>
                        </div>

                        <p className="text-gray-200">
                          {item.delegationName}
                        </p>
                      </div>
                    )}

                    {item.coachName && (
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-2 flex items-center gap-2 text-[var(--color-scout-blue-light)]">
                          <UserRound size={18} />
                          <h3 className="font-bold">اسم المدرب</h3>
                        </div>

                        <p className="text-gray-200">
                          {item.coachName}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Awards */}
                {item.awards && item.awards.length > 0 && (
                  <div className="border-t border-white/10 py-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Award
                        size={18}
                        className="text-[var(--color-glow-gold)]"
                      />

                      <h3 className="font-bold text-gray-200">
                        الجوائز
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.awards.map((award, i) => (
                        <span
                          key={i}
                          className="
                            flex
                            items-center
                            gap-1.5
                            rounded-md
                            border
                            border-white/10
                            bg-white/5
                            px-3
                            py-1.5
                            text-sm
                            text-gray-200
                          "
                        >
                          <Star
                            size={14}
                            className="text-[var(--color-glow-gold)]"
                          />
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shield placements */}
                {item.shieldPlacements &&
                  item.shieldPlacements.length > 0 && (
                    <div className="border-t border-white/10 py-5">
                      <div className="mb-4 flex items-center gap-2">
                        <Shield
                          size={18}
                          className="text-[var(--color-glow-cyan)]"
                        />

                        <h3 className="font-bold text-gray-200">
                          مركز كل درع
                        </h3>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {item.shieldPlacements.map((shield, i) => (
                          <div
                            key={i}
                            className="
                              flex
                              items-center
                              justify-between
                              gap-4
                              rounded-xl
                              border
                              border-white/10
                              bg-white/5
                              p-4
                            "
                          >
                            <span className="text-gray-200">
                              {shield.shieldName}
                            </span>

                            <span
                              className="
                                rounded-lg
                                bg-[var(--color-scout-blue)]/20
                                px-3
                                py-1
                                text-sm
                                font-bold
                                text-[var(--color-scout-blue-light)]
                              "
                            >
                              {shield.placement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Members */}
                {item.members && item.members.length > 0 && (
                  <div className="border-t border-white/10 py-5">
                    <div className="mb-4 flex items-center gap-2">
                      <Users
                        size={18}
                        className="text-[var(--color-glow-cyan)]"
                      />

                      <h3 className="font-bold text-gray-200">
                        أسماء الأفراد
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.members.map((member, i) => (
                        <span
                          key={i}
                          className="
                            rounded-lg
                            border
                            border-white/10
                            bg-white/5
                            px-3
                            py-2
                            text-sm
                            text-gray-200
                          "
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photos */}
                {item.photos && item.photos.length > 0 && (
                  <div className="border-t border-white/10 pt-5">
                    <div className="mb-4 flex items-center gap-2">
                      <Images
                        size={18}
                        className="text-[var(--color-glow-cyan)]"
                      />

                      <h3 className="font-bold text-gray-200">
                        الصور
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                      {item.photos.map((photo, i) => (
                        <div
                          key={i}
                          className="
                            relative
                            aspect-[4/3]
                            overflow-hidden
                            rounded-xl
                            border
                            border-white/10
                          "
                        >
                          <Image
                            src={photo}
                            alt={`${item.eventName} - صورة ${i + 1}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            className="
                              object-cover
                              transition-transform
                              duration-300
                              hover:scale-105
                            "
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}