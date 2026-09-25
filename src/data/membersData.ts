export interface MemberStatic {
  id: string;
  fullName: string;
  avatarUrl?: string | null;
  role: string;
  academicYear?: string | null;
  bio?: string | null;
  joinYear?: number | null;
  graduationYear?: number | null;
}

export const MEMBERS_DATA: MemberStatic[] = [
  {
    id: "p-leader",
    fullName: "عمر أحمد",
    role: "قائد العشيرة",
    academicYear: "الفرقة الرابعة",
    bio: "قائد العشيرة لعام 2024",
    joinYear: 2021,
  },
  {
    id: "p-guideL",
    fullName: "ندى محمد",
    role: "قائدة الجوالات",
    academicYear: "الفرقة الرابعة",
    bio: "قائدة الجوالات لعام 2024",
    joinYear: 2021,
  },
];
