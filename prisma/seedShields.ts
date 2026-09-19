import { PrismaClient } from '@prisma/client';
import { BADGES_DATA } from '../src/data/badges';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing shields...');
  await prisma.shield.deleteMany();

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

  console.log('Shields seeding complete! 🛡️');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
