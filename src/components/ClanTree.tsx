"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clanTreeData, type ClanTier, type RoleNode } from "@/data/clanData";
import { PersonCard } from "./PersonCard";
import { cn } from "@/lib/utils";

// Component for a Node that might have subordinates branching from it
function NodeWithSubordinates({
  node,
  onPromote,
  clickedId,
  isFadingOut,
}: {
  node: RoleNode;
  onPromote: (year: number, id: string) => void;
  clickedId: string | null;
  isFadingOut: boolean;
}) {
  const isClicked = clickedId === node.person.id;
  const hasSubordinates = node.subordinates && node.subordinates.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* The Main Node (Leader) */}
      <motion.div
        layout
        animate={{
          opacity: isFadingOut && !isClicked ? 0 : 1,
          scale: isFadingOut && !isClicked ? 0.9 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <PersonCard
          node={node}
          isClicked={isClicked}
          onClick={() => node.promotesTo && onPromote(node.promotesTo, node.person.id)}
        />
      </motion.div>

      {/* Subordinates Branch (Assistants / Deputies) */}
      {hasSubordinates && (
        <div className="relative flex flex-col items-center mt-6">
          {/* Vertical line going down from leader */}
          <div className="absolute -top-6 w-px h-6 bg-[var(--color-scout-blue)] opacity-50" />
          
          <div className="flex gap-4 relative pt-4 justify-center">
            {/* Horizontal line if multiple subordinates */}
            {node.subordinates!.length > 1 && (
              <div
                className="absolute top-0 h-px bg-[var(--color-scout-blue)] opacity-50"
                style={{
                  left: `calc(50% / ${node.subordinates!.length})`,
                  width: `calc(100% - 100% / ${node.subordinates!.length})`,
                }}
              />
            )}

            {node.subordinates!.map((sub) => (
              <div key={sub.person.id} className="relative flex flex-col items-center">
                {/* Vertical line for subordinate */}
                <div className="absolute -top-4 w-px h-4 bg-[var(--color-scout-blue)] opacity-50" />
                <motion.div
                  layout
                  animate={{
                    opacity: isFadingOut && clickedId !== sub.person.id ? 0 : 1,
                  }}
                >
                  <PersonCard
                    node={sub}
                    isClicked={clickedId === sub.person.id}
                    onClick={() => sub.promotesTo && onPromote(sub.promotesTo, sub.person.id)}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Component for a full Tier
function TierSection({
  tier,
  onPromote,
  clickedId,
  isFadingOut,
  forceSingleRow = false,
}: {
  tier: ClanTier;
  onPromote: (year: number, id: string) => void;
  clickedId: string | null;
  isFadingOut: boolean;
  forceSingleRow?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="relative flex flex-col items-center w-full my-8"
    >
      {/* Tier Title */}
      <div className="text-xl font-bold text-[var(--color-scout-blue-light)] mb-8 bg-[var(--color-scout-navy)] px-6 py-2 rounded-full border border-[var(--color-dark-border)] shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20">
        {tier.title}
      </div>

      {/* Members Container */}
      <div
        className={cn(
          "flex justify-center gap-6 relative z-10 w-full",
          forceSingleRow ? "flex-nowrap min-w-max px-4" : "flex-wrap max-w-6xl"
        )}
      >
        {tier.members.map((node) => (
          <NodeWithSubordinates
            key={node.person.id}
            node={node}
            onPromote={onPromote}
            clickedId={clickedId}
            isFadingOut={isFadingOut}
          />
        ))}
      </div>

      {/* Vertical connection line to next tier */}
      <div className="absolute top-[100%] w-px h-16 bg-gradient-to-b from-[var(--color-scout-blue)] to-transparent opacity-50 -z-10" />
    </motion.div>
  );
}

export function ClanTree() {
  const [currentYear, setCurrentYear] = useState(2024);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeData = clanTreeData.find((d) => d.year === currentYear) || clanTreeData[0];

  const handlePromote = (targetYear: number, personId: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setClickedId(personId);

    setTimeout(() => {
      setCurrentYear(targetYear);
      setClickedId(null);
      setTimeout(() => setIsAnimating(false), 600);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-12 w-full px-4 overflow-x-hidden">
      {/* Timeline Tabs */}
      <div className="mb-20 bg-white/5 backdrop-blur-md p-2 rounded-full border border-white/10 flex items-center justify-center gap-2">
        {clanTreeData.map((data) => (
          <button
            key={data.year}
            className={cn(
              "relative px-8 py-3 rounded-full text-lg font-bold transition-colors duration-300 z-10",
              currentYear === data.year ? "text-[var(--color-scout-navy)]" : "text-[var(--color-scout-blue)] hover:text-white"
            )}
            onClick={() => !isAnimating && setCurrentYear(data.year)}
          >
            {currentYear === data.year && (
              <motion.div
                layoutId="timeline-bubble-3"
                className="absolute inset-0 bg-[var(--color-glow-cyan)] rounded-full -z-10 shadow-[0_0_15px_var(--color-glow-cyan)]"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{data.year}</span>
          </button>
        ))}
      </div>

      {/* Main Tree Container */}
      <div className="relative w-full overflow-x-auto pb-12 custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentYear}
            className="flex flex-col items-center min-w-max mx-auto relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {/* 1. High Council (Forced Single Row) */}
            <TierSection
              tier={activeData.tiers.highCouncil}
              onPromote={handlePromote}
              clickedId={clickedId}
              isFadingOut={!!clickedId}
              forceSingleRow={true}
            />

            {/* 2. Auxiliary (Leaders with Assistants below them) */}
            <TierSection
              tier={activeData.tiers.auxiliary}
              onPromote={handlePromote}
              clickedId={clickedId}
              isFadingOut={!!clickedId}
            />

            {/* 3. Management (Raht Leaders with Deputies below them) */}
            <TierSection
              tier={activeData.tiers.management}
              onPromote={handlePromote}
              clickedId={clickedId}
              isFadingOut={!!clickedId}
            />

            {/* 4. Base (Rovers & Candidates) */}
            <TierSection
              tier={activeData.tiers.base}
              onPromote={handlePromote}
              clickedId={clickedId}
              isFadingOut={!!clickedId}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
