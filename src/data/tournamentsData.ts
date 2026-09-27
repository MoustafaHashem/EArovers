export interface DelegationMember {
  name: string;
  role: string;
  avatar?: string;
  isLeader?: boolean;
}

export interface TournamentItem {
  id: string;
  title: string;
  category: "wafdeya" | "sports" | "scout" | "naval" | "arts";
  categoryName: string;
  year: number;
  dateStr: string;
  location: string;
  placement: string;
  specialAwards: string[];
  image: string;
  description: string;
  clanStory?: string;
  stats?: {
    participantsCount?: number;
    competingClans?: number;
    shieldsCount?: number;
  };
  awardsDetailed?: {
    title: string;
    type: "trophy" | "medal" | "shield" | "star";
    winner?: string;
  }[];
  delegation?: DelegationMember[];
  gallery?: string[];
}

export const TOURNAMENTS_DATA: TournamentItem[] = [];

export function getTournamentById(id: string): TournamentItem | undefined {
  const decodedId = decodeURIComponent(id).trim().toLowerCase();
  return TOURNAMENTS_DATA.find((t) => t.id.toLowerCase() === decodedId);
}

export function getTournamentsByCategory(
  categorySlug: string
): TournamentItem[] {
  const slug = categorySlug.toLowerCase().trim();
  return TOURNAMENTS_DATA.filter((t) => t.category === slug);
}
