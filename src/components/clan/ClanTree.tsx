"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clanTreeData, type ClanTier, type RoleNode } from "@/data/clanData";
import { PersonCard } from "./PersonCard";
import { cn } from "@/lib/utils";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const member = node.member || (node as any).person;
  const memberId = member?.id || "";
  const isClicked = clickedId === memberId;
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
          onClick={() => node.promotesTo && onPromote(node.promotesTo, memberId)}
        />
      </motion.div>

      {/* Subordinates Branch (Assistants / Deputies) */}
      {hasSubordinates && (
        <div className="relative flex flex-col items-center mt-6">
          {/* Vertical line going down from leader */}
          <div className="absolute -top-6 w-px h-6 bg-[#161e35]/30 dark:bg-cyan-400/40" />
          
          <div className="flex gap-4 relative pt-4 justify-center">
            {/* Horizontal line if multiple subordinates */}
            {node.subordinates!.length > 1 && (
              <div
                className="absolute top-0 h-px bg-[#161e35]/30 dark:bg-cyan-400/40"
                style={{
                  left: `calc(50% / ${node.subordinates!.length})`,
                  width: `calc(100% - 100% / ${node.subordinates!.length})`,
                }}
              />
            )}

            {node.subordinates!.map((sub, idx) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const subMember = sub.member || (sub as any).person;
              const subId = subMember?.id || `sub-${idx}`;
              return (
                <div key={subId} className="relative flex flex-col items-center">
                  {/* Vertical line for subordinate */}
                  <div className="absolute -top-4 w-px h-4 bg-[#161e35]/30 dark:bg-cyan-400/40" />
                  <motion.div
                    layout
                    animate={{
                      opacity: isFadingOut && clickedId !== subId ? 0 : 1,
                    }}
                  >
                    <PersonCard
                      node={sub}
                      isClicked={clickedId === subId}
                      onClick={() => sub.promotesTo && onPromote(sub.promotesTo, subId)}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function TierSection({
  tier,
  onPromote,
  clickedId,
  isFadingOut,
}: {
  tier: ClanTier;
  onPromote: (year: number, id: string) => void;
  clickedId: string | null;
  isFadingOut: boolean;
}) {
  if (tier.members.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="relative flex flex-col items-center w-full my-8"
    >
      <div className="text-xl font-bold text-[#161e35] dark:text-cyan-300 mb-8 bg-white dark:bg-[#0a1628] px-6 py-2.5 rounded-full border border-[#d4a373]/40 dark:border-cyan-500/30 shadow-md dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20">
        {tier.title}
      </div>

      <div className="flex justify-center gap-4 sm:gap-6 relative z-10 w-full flex-wrap max-w-6xl px-2 sm:px-4">
        {tier.members.map((node, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const nodeMember = node.member || (node as any).person;
          const nodeId = nodeMember?.id || `node-${idx}`;
          return (
            <NodeWithSubordinates
              key={nodeId}
              node={node}
              onPromote={onPromote}
              clickedId={clickedId}
              isFadingOut={isFadingOut}
            />
          );
        })}
      </div>

      <div className="absolute top-[100%] w-px h-16 bg-gradient-to-b from-[#161e35]/30 dark:from-cyan-400/40 to-transparent opacity-50 -z-10" />
    </motion.div>
  );
}

// Format DB data into the structure ClanTree expects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatTreeData(dbData: any[]) {
  if (!dbData || !Array.isArray(dbData)) return [];

  return dbData.map(yearGroup => {
    // We need to re-attach subordinates manually by heuristics based on roles.
    const rebuiltTiers = JSON.parse(JSON.stringify(yearGroup.tiers || {}));
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const normalizeNode = (m: any) => {
      if (!m) return m;
      if (!m.member && m.person) {
        m.member = m.person;
      }
      return m;
    };

    // Ensure all tiers exist and their members are normalized
    ["highCouncil", "auxiliary", "management", "base"].forEach(tierKey => {
      if (!rebuiltTiers[tierKey]) {
        const defaultTitles: Record<string, string> = {
          highCouncil: "مجلس القيادة",
          auxiliary: "الهيكل المعاون",
          management: "مجلس الإدارة",
          base: "قاعدة العشيرة",
        };
        rebuiltTiers[tierKey] = { title: defaultTitles[tierKey], members: [] };
      }
      rebuiltTiers[tierKey].members = (rebuiltTiers[tierKey].members || []).map(normalizeNode);
    });

    // Process Auxiliary: Leaders have assistants
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const aux = rebuiltTiers.auxiliary.members as any[];
    const auxLeaders = aux.filter(m => !m.role?.includes("مساعد"));
    const auxAssists = aux.filter(m => m.role?.includes("مساعد"));
    
    auxLeaders.forEach(leader => {
      leader.subordinates = [];
      const roleBase = leader.role ? leader.role.replace("قائد ", "") : "";
      const assist = auxAssists.find(a => a.role === `مساعد ${roleBase}`);
      if (assist) {
        leader.subordinates.push(assist);
      }
    });
    rebuiltTiers.auxiliary.members = auxLeaders;
    
    // Process Management: Raht Leaders have Deputies
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const man = rebuiltTiers.management.members as any[];
    const manLeaders = man.filter(m => m.role?.includes("رائد"));
    const manDeputies = man.filter(m => m.role?.includes("وكيل"));
    
    manLeaders.forEach(leader => {
      leader.subordinates = [];
      // Example matching: "رائد رهط الفايكنج" with "وكيل رهط الفايكنج"
      const roleBase = leader.role ? leader.role.replace("رائد ", "") : "";
      const deputy = manDeputies.find(d => d.role === `وكيل ${roleBase}`);
      if (deputy) {
        leader.subordinates.push(deputy);
      }
    });
    rebuiltTiers.management.members = manLeaders;

    // Order High Council so Leader is in middle
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hc = rebuiltTiers.highCouncil.members as any[];
    // Target order (rough): Assist, Senior Rover, Leader, Guide Leader, Senior Guide
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderedHc: any[] = [];
    const getByRole = (r: string) => hc.find(m => m.role === r);
    const assistL = getByRole("مساعد قائد العشيرة");
    const sr = getByRole("الرائد الأكبر");
    const leader = getByRole("قائد العشيرة");
    const gl = getByRole("قائدة الجوالات");
    const sg = getByRole("الرائدة الكبرى");

    if (assistL) orderedHc.push(assistL);
    if (sr) orderedHc.push(sr);
    if (leader) orderedHc.push(leader);
    if (gl) orderedHc.push(gl);
    if (sg) orderedHc.push(sg);
    
    // Add any missing
    hc.forEach(m => {
      const mId = m.member?.id || m.person?.id;
      if (mId && !orderedHc.find(om => (om.member?.id || om.person?.id) === mId)) {
        orderedHc.push(m);
      } else if (!mId && !orderedHc.includes(m)) {
        orderedHc.push(m);
      }
    });
    
    rebuiltTiers.highCouncil.members = orderedHc;

    return {
      year: yearGroup.year,
      tiers: rebuiltTiers
    };
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ClanTree({ dbData = [], defaultYear, hideTabs = false }: { dbData?: any[], defaultYear?: number; hideTabs?: boolean }) {
  const treeData = dbData && dbData.length > 0 ? formatTreeData(dbData) : clanTreeData;
  const initialYear = defaultYear || (treeData.length > 0 ? treeData[0].year : new Date().getFullYear());
  
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeData = treeData.find((d) => d.year === currentYear) || treeData[0];

  if (!activeData) return <div className="text-center text-white py-10">لا يوجد بيانات لعرض الهيكل.</div>;

  const handlePromote = (targetYear: number, memberId: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setClickedId(memberId);

    setTimeout(() => {
      setCurrentYear(targetYear);
      setClickedId(null);
      setTimeout(() => setIsAnimating(false), 600);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-12 w-full px-4 overflow-x-hidden">
      {!hideTabs && treeData.length > 0 && (
        <div className="mb-20 bg-white/80 dark:bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-[#d4a373]/30 dark:border-white/10 flex items-center justify-center gap-2 shadow-sm">
          {treeData.map((data) => (
            <button
              key={data.year}
              className={cn(
                "relative px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-bold transition-all duration-300 z-10 cursor-pointer",
                currentYear === data.year 
                  ? "text-[#0b1a30] dark:text-[#080b10]" 
                  : "text-[#475569] dark:text-gray-400 hover:text-[#0b1a30] dark:hover:text-white"
              )}
              onClick={() => !isAnimating && setCurrentYear(data.year)}
            >
              {currentYear === data.year && (
                <motion.div
                  layoutId="timeline-bubble-3"
                  className="absolute inset-0 bg-gradient-to-r from-[#e0a96d] to-[#d4a373] dark:from-[#00f0ff] dark:to-[#38f4ff] rounded-full -z-10 shadow-[0_2px_12px_rgba(212,163,115,0.35)] dark:shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{data.year}</span>
            </button>
          ))}
        </div>
      )}

      <div className="relative w-full pb-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentYear}
            className="flex flex-col items-center w-full max-w-7xl mx-auto relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <TierSection
              tier={activeData.tiers.highCouncil}
              onPromote={handlePromote}
              clickedId={clickedId}
              isFadingOut={!!clickedId}
            />

            <TierSection
              tier={activeData.tiers.auxiliary}
              onPromote={handlePromote}
              clickedId={clickedId}
              isFadingOut={!!clickedId}
            />

            <TierSection
              tier={activeData.tiers.management}
              onPromote={handlePromote}
              clickedId={clickedId}
              isFadingOut={!!clickedId}
            />

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
