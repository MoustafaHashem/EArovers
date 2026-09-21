import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  await prisma.roleHistory.deleteMany({
    where: { member: { hasAccount: false } }
  });
  await prisma.member.deleteMany({
    where: { hasAccount: false }
  });

  // 2026 Members (High Council)
  const highCouncil2026 = [
    { title: "قائد العشيرة", name: "مصعب سمير", avatarUrl: "/leadershippl/mosab.png" },
    { title: "قائدة الجوالات", name: "اروى زين", avatarUrl: "/leadershippl/arwa.png" },
    { title: "مساعد قائد العشيرة", name: "مايكل جورج", avatarUrl: "/leadershippl/michael.png" },
    { title: "مساعد قائد العشيرة", name: "أحمد مشعل", avatarUrl: "/leadershippl/mashal.png" },
    { title: "الرائد الأكبر", name: "يوسف علاء", avatarUrl: "/leadershippl/alaaa.png" },
    { title: "الرائدة الكبرى", name: "همسة أحمد", avatarUrl: "/leadershippl/hamsa.png" }
  ];

  for (const hc of highCouncil2026) {
    await prisma.member.create({
      data: {
        id: crypto.randomUUID(),
        fullName: hc.name,
        avatarUrl: hc.avatarUrl,
        hasAccount: false,
        roles: { create: { year: 2026, roleTitle: hc.title } }
      }
    });
  }

  // الهيكل المعاون 2026 (Placeholders as requested)
  const auxRoles = ['قائد الميديا', 'مساعد قائد الميديا', 'قائد السكريتارية', 'مساعد قائد السكريتارية', 'أمين العهدة'];
  for (const role of auxRoles) {
    await prisma.member.create({
      data: {
        id: crypto.randomUUID(),
        fullName: `${role} 2026`,
        avatarUrl: '/gold-circle.png',
        hasAccount: false,
        roles: { create: { year: 2026, roleTitle: role, isSecondary: true } }
      }
    });
  }

  // Board 2026
  for(let i=1; i<=4; i++) {
    await prisma.member.create({
      data: {
        id: crypto.randomUUID(),
        fullName: `عضو ${i}`,
        avatarUrl: '/gold-circle.png',
        hasAccount: false,
        roles: { create: { year: 2026, roleTitle: `رائد رهط ${i}` } }
      }
    });
  }


  // 2025 Members
  const roles2025 = [
    { roleTitle: 'قائد العشيرة', fullName: 'اسم القائد 2025' },
    { roleTitle: 'قائدة الجوالات', fullName: 'اسم القائدة 2025' },
    { roleTitle: 'مساعد قائد العشيرة', fullName: 'اسم المساعد 1 (2025)' },
    { roleTitle: 'مساعد قائد العشيرة', fullName: 'اسم المساعد 2 (2025)' },
    { roleTitle: 'الرائد الأكبر', fullName: 'اسم الرائد (2025)' },
    { roleTitle: 'الرائدة الكبرى', fullName: 'اسم الرائدة (2025)' },
  ];

  for (const r of roles2025) {
    await prisma.member.create({
      data: {
        id: crypto.randomUUID(),
        fullName: r.fullName,
        avatarUrl: '/gold-circle.png',
        hasAccount: false,
        roles: { create: { year: 2025, roleTitle: r.roleTitle } }
      }
    });
  }
  
  // Board 2025
  for(let i=1; i<=4; i++) {
    await prisma.member.create({
      data: {
        id: crypto.randomUUID(),
        fullName: `عضو ${i} (2025)`,
        avatarUrl: '/gold-circle.png',
        hasAccount: false,
        roles: { create: { year: 2025, roleTitle: `رائد رهط ${i}` } }
      }
    });
  }

  // 2024 Members
  const roles2024 = [
    { roleTitle: 'قائد العشيرة', fullName: 'اسم القائد 2024' },
    { roleTitle: 'قائدة الجوالات', fullName: 'اسم القائدة 2024' },
    { roleTitle: 'مساعد قائد العشيرة', fullName: 'مساعد 2024' },
    { roleTitle: 'مساعد قائد العشيرة', fullName: 'مساعد 2 2024' },
    { roleTitle: 'الرائد الأكبر', fullName: 'رائد 2024' },
    { roleTitle: 'الرائدة الكبرى', fullName: 'رائدة 2024' },
  ];

  for (const r of roles2024) {
    await prisma.member.create({
      data: {
        id: crypto.randomUUID(),
        fullName: r.fullName,
        avatarUrl: '/gold-circle.png',
        hasAccount: false,
        roles: { create: { year: 2024, roleTitle: r.roleTitle } }
      }
    });
  }

  console.log('Seed completed.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
