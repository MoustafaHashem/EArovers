import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis and Rate Limiter
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

const ratelimit = new Ratelimit({
  redis,
  // 10 requests per 10 seconds per IP
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

export default async function proxy(request: NextRequest) {
  // Rate Limiting
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  
  if (process.env.UPSTASH_REDIS_REST_URL) {
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

  // Protected route patterns
  const protectedPaths = ["/dashboard", "/profile", "/events"];
  const adminPaths = ["/admin"];
  const authPaths = ["/login"];

  const pathname = request.nextUrl.pathname;

  // If user is not logged in and trying to access protected routes
  if (
    !user &&
    (protectedPaths.some((p) => pathname.startsWith(p)) ||
      adminPaths.some((p) => pathname.startsWith(p)))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If user is logged in and trying to access auth pages
  if (user && authPaths.some((p) => pathname.startsWith(p))) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Admin route protection - just check if user is logged in
  // Actual role authorization is handled securely in src/app/admin/layout.tsx via Prisma
  if (user && adminPaths.some((p) => pathname.startsWith(p))) {
    // If we wanted to check role here, we would need the role in the JWT
    // For now, layout.tsx will throw if they aren't admin.
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
