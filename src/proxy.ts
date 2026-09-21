import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis and Rate Limiter conditionally to avoid warnings and startup overhead
const isRedisConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

const redis = isRedisConfigured
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      // 10 requests per 10 seconds per IP
      limiter: Ratelimit.slidingWindow(10, "10 s"),
      analytics: true,
    })
  : null;

export default async function proxy(request: NextRequest) {
  // Rate Limiting
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  
  if (ratelimit) {
    try {
      const { success } = await ratelimit.limit(`ratelimit_${ip}`);
      if (!success) {
        return new NextResponse("Too Many Requests", { status: 429 });
      }
    } catch (error) {
      console.error("Rate limiting error:", error);
      // Fallback to allow request if Redis fails
    }
  }

  const pathname = request.nextUrl.pathname;

  // Protected and auth route patterns
  const protectedPaths = ["/dashboard", "/profile"];
  const adminPaths = ["/admin"];
  const authPaths = ["/login"];

  const isProtected =
    protectedPaths.some((p) => pathname.startsWith(p)) ||
    adminPaths.some((p) => pathname.startsWith(p));
  const isAuth = authPaths.some((p) => pathname.startsWith(p));

  // Check if any Supabase authentication cookie exists
  const allCookies = request.cookies.getAll();
  const hasAuthCookie = allCookies.some(
    (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token")
  );

  // FAST PATH: If the visitor is on a public page and has no auth cookies,
  // skip all Supabase network roundtrips completely! This eliminates 150-400ms latency.
  if (!isProtected && !isAuth && !hasAuthCookie) {
    return NextResponse.next({ request });
  }

  // FAST PATH: If hitting a protected route without any auth cookie,
  // redirect immediately to /login without calling Supabase over the network.
  if (isProtected && !hasAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session - important for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in and trying to access protected routes
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If user is logged in and trying to access auth pages
  if (user && isAuth) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
