"use client";

import { motion } from "motion/react";
import { type RoleNode } from "@/data/clanData";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PersonCardProps = {
  node: RoleNode;
  onClick?: () => void;
  isClicked?: boolean;
};

export function PersonCard({ node, onClick, isClicked }: PersonCardProps) {
  const { member, role, promotesTo } = node;
  const isPromotable = !!promotesTo;

  return (
    <Link href={`/people/${member.id}`}>
      <motion.div
        layoutId={member.id}
        className={cn(
          "relative flex flex-col items-center p-4 rounded-2xl w-36 sm:w-40 md:w-48 transition-all duration-300",
          "glass-card cursor-pointer glass-card-hover z-10",
          isClicked &&
            "ring-2 ring-[var(--color-glow-cyan)] ring-offset-2 ring-offset-[var(--color-dark-bg)] shadow-[0_0_20px_var(--color-glow-cyan)]"
        )}
        onClick={isPromotable ? onClick : undefined}
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{
          layout: { type: "spring", stiffness: 200, damping: 25 },
        }}
      >
        {/* Promotable Indicator */}
        {isPromotable && !isClicked && (
          <motion.div
            className="absolute -top-2 -left-2 bg-gradient-to-r from-[#161e35] to-[#1e2746] text-white dark:from-cyan-400 dark:to-teal-300 dark:text-[#080b10] p-1.5 rounded-full shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
            }}
          >
            <Sparkles size={16} />
          </motion.div>
        )}

        {/* Avatar */}
        <div
          className={cn(
            "w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mb-3 shadow-inner overflow-hidden",
            role.includes("قائد") && !role.includes("مساعد")
              ? "bg-gradient-to-br from-[#161e35] to-[#26355d] text-white border-2 border-[#d4a373] dark:border-cyan-400 shadow-md"
              : "bg-[#f0eee6] dark:bg-[#0f172a] text-[#0b1a30] dark:text-gray-200 border border-[#d4a373]/30 dark:border-white/10"
          )}
        >
          {member.avatar ? (
            <Image
              src={member.avatar}
              alt={member.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            member.initials
          )}
        </div>

        {/* Info */}
        <div className="text-center w-full px-1">
          <h3 className="font-bold text-xs sm:text-sm truncate w-full text-[#0b1a30] dark:text-white">
            {member.name}
          </h3>
          <p className="text-xs text-[#161e35] dark:text-cyan-400 mt-1 font-bold truncate w-full">
            {role}
          </p>
        </div>

        {/* Subtle bottom glow for Clan Leader only */}
        {role === "قائد العشيرة" && (
          <div className="absolute bottom-0 w-3/4 h-1 bg-[#161e35] dark:bg-cyan-400 rounded-t-full blur-[2px] opacity-70" />
        )}
      </motion.div>
    </Link>
  );
}
