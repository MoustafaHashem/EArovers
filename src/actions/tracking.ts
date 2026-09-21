"use server";

import { Redis } from "@upstash/redis";

const isRedisConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

const redis = isRedisConfigured
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

export async function logPageView(path: string) {
  try {
    if (!redis) {
      return { success: true };
    }

    // Avoid logging static files or API routes if they accidentally get tracked
    if (path.startsWith('/_next') || path.startsWith('/api') || path.includes('.')) {
      return { success: true };
    }

    const date = new Date().toISOString().split('T')[0];
    await redis.pipeline()
      .hincrby(`pageviews:${date}`, path, 1)
      .hincrby(`pageviews:total`, path, 1)
      .exec();
    
    return { success: true };
  } catch (error) {
    console.error("Failed to log page view:", error);
    // Fail silently to not disrupt the user experience
    return { success: false };
  }
}
