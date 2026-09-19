import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ar';
import { BADGES_DATA } from '../src/data/badges';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  // Be careful with these in production!
  await prisma.roleHistory.deleteMany();
  await prisma.eventParticipant.deleteMany();
  await prisma.specialAward.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.media.deleteMany();
  await prisma.session.deleteMany();
  await prisma.event.deleteMany();
  await prisma.userShield.deleteMany();
  await prisma.shield.deleteMany();
  await prisma.member.deleteMany();

  console.log('Seeding fake members...');
  const members = [];
  const years = [2023, 2024, 2025, 2026];

  for (let i = 0; i < 50; i++) {
    const member = await prisma.member.create({
      data: {
        id: faker.string.uuid(),
        hasAccount: true,
        fullName: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        academicYear: faker.helpers.arrayElement(['الفرقة الأولى', 'الفرقة الثانية', 'الفرقة الثالثة', 'الفرقة الرابعة']),
        avatarUrl: faker.image.avatar(),
        role: faker.helpers.arrayElement(['scout', 'admin']),
        bio: faker.lorem.sentence(),
        joinYear: faker.helpers.arrayElement(years),
        status: faker.helpers.arrayElement(['active', 'graduated', 'inactive']),
      }
    });
    members.push(member);
  }

  console.log('Seeding roles for 2026 tree...');
  const roles2026 = [
    { title: "قائد العشيرة", isSecondary: false },
    { title: "قائدة الجوالات", isSecondary: false },
    { title: "مساعد قائد العشيرة", isSecondary: true },
    { title: "مساعدة قائدة الجوالات", isSecondary: true },
    { title: "الرائد الأكبر", isSecondary: false },
    { title: "الرائدة الكبرى", isSecondary: false },
    { title: "قائد العهدة", isSecondary: false },
    { title: "مساعد قائد العهدة", isSecondary: true },
    { title: "قائد السكرتارية", isSecondary: false },
    { title: "قائد الميديا", isSecondary: false },
  ];

  for (let i = 0; i < roles2026.length; i++) {
    await prisma.roleHistory.create({
      data: {
        memberId: members[i].id,
        year: 2026,
        roleTitle: roles2026[i].title,
        isSecondary: roles2026[i].isSecondary,
      }
    });
  }

  // Also seed some random roles for 2025
  for (let i = 10; i < 20; i++) {
    await prisma.roleHistory.create({
      data: {
        memberId: members[i].id,
        year: 2025,
        roleTitle: faker.helpers.arrayElement(roles2026).title,
        isSecondary: false,
      }
    });
  }

  console.log('Seeding events...');
  for (let i = 0; i < 10; i++) {
    await prisma.event.create({
      data: {
        title: `فعالية ${faker.lorem.word()}`,
        description: faker.lorem.paragraph(),
        eventType: faker.helpers.arrayElement(['معسكر', 'مسابقة', 'حفل', 'ندوة']),
        location: faker.location.streetAddress(),
        startDate: faker.date.recent(),
        endDate: faker.date.soon(),
        isPublic: true,
        coverImage: faker.image.urlPicsumPhotos(),
        createdBy: members[0].id
      }
    });
  }

  console.log('Seeding shields...');
  for (let i = 0; i < BADGES_DATA.length; i++) {
    await prisma.shield.create({
      data: {
        name: BADGES_DATA[i].title,
        description: BADGES_DATA[i].description,
        sortOrder: i,
        image: BADGES_DATA[i].image,
      }
    });
  }

  console.log('Seeding complete! 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
