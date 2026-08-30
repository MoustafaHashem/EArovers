"use client";

import { motion } from "motion/react";
import { type RoleNode } from "@/data/clanData";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

type PersonCardProps = {
  node: RoleNode;
  onClick?: () => void;
  isClicked?: boolean;
};

export function PersonCard({ node, onClick, isClicked }: PersonCardProps) {
  const { person, role, promotesTo } = node;
  const isPromotable = !!promotesTo;

  return (
    <motion.div
      layoutId={person.id}
      className={cn(
        "relative flex flex-col items-center p-4 rounded-2xl w-48 transition-all duration-300",
        "glass-card cursor-default z-10",
        isPromotable && "cursor-pointer glass-card-hover",
        isClicked && "ring-2 ring-[var(--color-glow-cyan)] ring-offset-2 ring-offset-[var(--color-dark-bg)] shadow-[0_0_20px_var(--color-glow-cyan)]"
      )}
      onClick={isPromotable ? onClick : undefined}
      whileHover={isPromotable && !isClicked ? { scale: 1.05, y: -5 } : {}}
      transition={{
        layout: { type: "spring", stiffness: 200, damping: 25 },
      }}
    >
      {/* Promotable Indicator */}
      {isPromotable && !isClicked && (
        <motion.div
          className="absolute -top-2 -left-2 bg-[var(--color-glow-cyan)] text-[var(--color-scout-navy)] p-1.5 rounded-full shadow-lg"
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

      {/* Avatar (Initials for now) */}
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-3 shadow-inner overflow-hidden",
          role.includes("قائد") && !role.includes("مساعد")
            ? "bg-gradient-to-br from-[var(--color-scout-blue)] to-[var(--color-anchor)] text-white border-2 border-[var(--color-glow-cyan)]"
            : "bg-[var(--color-anchor)] text-gray-200 border border-[var(--color-dark-border)]"
        )}
      >
        {person.avatar ? (
          <img
            src={person.avatar}
            alt={person.name}
            className="w-full h-full object-cover"
          />
        ) : (
          person.initials
        )}
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="font-bold text-sm truncate w-full text-white">
          {person.name}
        </h3>
        <p className="text-xs text-[var(--color-scout-blue-light)] mt-1 font-semibold">{role}</p>
      </div>

      {/* Subtle bottom glow for Clan Leader only */}
      {role === "قائد العشيرة" && (
        <div className="absolute bottom-0 w-3/4 h-1 bg-[var(--color-glow-cyan)] rounded-t-full blur-[2px] opacity-70" />
      )}
    </motion.div>
  );
}
