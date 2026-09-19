import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting events seed...');

  // Clear existing dummy events
  await prisma.event.deleteMany({
    where: { title: { startsWith: 'Dummy Event' } }
  });

  const dummyEvents = [
    {
      title: 'Dummy Event 1: مخيم الإعداد',
      description: 'مخيم الإعداد لعشيرة الجوالة، حيث يتم تدريب الأعضاء الجدد على التقاليد الكشفية والمبيت في الخلاء.',
      startDate: new Date('2026-10-01'),
      location: 'مخيم الكشافة بالمركز',
      eventType: 'معسكر',
      isPublic: true,
      coverImage: '/images/island_1_.png',
      images: ['/images/island_1_.png', '/images/island_2_.png']
    },
    {
      title: 'Dummy Event 2: الدورة المتقدمة',
      description: 'الدورة الكشفية المتقدمة لصقل المهارات القيادية وإدارة المجموعات في الظروف الصعبة.',
      startDate: new Date('2026-11-15'),
      location: 'محافظة الفيوم',
      eventType: 'معسكر',
      isPublic: true,
      coverImage: '/images/island_3.png',
      images: ['/images/island_3.png', '/images/island_4.png']
    },
    {
      title: 'Dummy Event 3: المهرجان الكشفي',
      description: 'المهرجان السنوي الذي يجمع كافة عشائر جامعة عين شمس للتنافس في مختلف الدروع.',
      startDate: new Date('2026-12-20'),
      location: 'جامعة عين شمس',
      eventType: 'مسابقة',
      isPublic: true,
      coverImage: '/images/island_5.png',
      images: ['/images/island_5.png', '/images/island_6.png']
    }
  ];

  for (const ev of dummyEvents) {
    await prisma.event.create({
      data: {
        id: crypto.randomUUID(),
        title: ev.title,
        description: ev.description,
        startDate: ev.startDate,
        endDate: ev.startDate,
        location: ev.location,
        eventType: ev.eventType,
        isPublic: ev.isPublic,
        coverImage: ev.coverImage,
        media: {
          create: ev.images.map(url => ({
            url,
          }))
        }
      }
    });
  }

  console.log('Events seed completed.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
