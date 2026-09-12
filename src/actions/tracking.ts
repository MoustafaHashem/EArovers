"use server";

import { prisma } from "@/lib/prisma";

export async function logPageView(path: string) {
  try {
    // Avoid logging static files or API routes if they accidentally get tracked
    if (path.startsWith('/_next') || path.startsWith('/api') || path.includes('.')) {
      return { success: true };
    }

    await prisma.pageVisit.create({
      data: {
        path,
      }
    });
    
    return { success: true };
  } catch (error) {
    console.error("Failed to log page view:", error);
    return { success: false };
  }
}
