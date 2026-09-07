"use server";

import { prisma } from "@/lib/prisma";

export async function fetchVisitsAction(timeframe: string) {
  const now = new Date();
  let startDate = new Date();

  switch (timeframe) {
    case '7d':
      startDate.setDate(now.getDate() - 7);
      break;
    case '1m':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case '1y':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    case 'all':
      startDate = new Date(0); // Beginning of time
      break;
    default:
      startDate.setDate(now.getDate() - 7);
  }

  const visits = await prisma.pageVisit.findMany({
    where: {
      createdAt: {
        gte: startDate,
      }
    },
    select: {
      createdAt: true,
      path: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return visits;
}

export async function approveRequestAction(requestId: string) {
  try {
    const request = await prisma.joinRequest.findUnique({
      where: { id: requestId }
    });

    if (!request) throw new Error("Request not found");

    await prisma.joinRequest.update({
      where: { id: requestId },
      data: {
        status: "approved",
        reviewedAt: new Date()
      }
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
