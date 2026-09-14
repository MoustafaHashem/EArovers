# EArovers - Memory & Context

## 🛠️ Tech Stack & Architecture
- **Framework**: Next.js 16.3 (App Router). *Note: The middleware file convention has changed to `src/proxy.ts` in this version.*
- **Database ORM**: Prisma (`prisma/schema.prisma`).
- **Database Host**: Supabase (PostgreSQL).
- **Authentication**: Supabase Auth integrated with Next.js Server Actions and `proxy.ts` (middleware).
- **Media Hosting**: Cloudinary for direct image/video uploads, but Prisma `Media` model stores the URLs and metadata for fast querying and custom sorting.
- **Styling**: Tailwind CSS with custom CSS variables (`var(--color-scout-blue)`, `var(--color-scout-navy)`, etc.) defined in `src/app/globals.css`.
- **UI Components**: `shadcn/ui` is integrated. Migrated to `@base-ui/react` (which requires the `render` prop instead of `asChild`) for accessible unstyled components (like Tabs, buttons). Magic UI concepts (`framer-motion` layout animations) are used for animated navigation pills.

## 🎨 Design Philosophy
- **Aesthetic**: Premium, sleek, and modern. Dark mode by default.
- **UI Elements**: Glassmorphism (`glass-card` CSS class), neon ambient glows (`shadow-[0_0_20px_rgba(...)]`), smooth transitions. 
- **Layout Direction**: Arabic (RTL - Right to Left). Ensure flex directions, margins (`ml`/`mr`), borders (`border-l`/`border-r`), and gradients (`bg-gradient-to-l`) are mapped correctly for RTL.

## 🧩 Key Components
- **Unified Member Model**: The database previously separated `Profile` (for auth users) and `Person` (for historical tree data). These have been merged into a single `Member` model using a `hasAccount` boolean.
- **Traffic Tracking**: `<TrafficTracker>` in `src/components/TrafficTracker.tsx` runs silently on every page view and calls the `logPageView` Server Action to log metrics to the `PageVisit` Prisma model.
- **Admin Dashboard**: `src/app/admin/components/AdminDashboardClient.tsx`. Heavily relies on Recharts for visual analytics. Data is fetched on the server in `src/app/admin/page.tsx` and passed as initial props.
- **Sidebar**: `src/app/admin/components/AdminSidebar.tsx`. Contains custom logic to highlight the active tab using an edge-to-edge gradient and right-border.
- **Media Galleries**: 
  - `src/components/FullGallery.tsx`: Used on `/gallery`. Has categories, loads everything, and uses `yet-another-react-lightbox`.
  - `src/components/MediaGallery.tsx`: Used on the homepage. Drops the "All" filter and limits the return to max 12 items.
- **Health Check Infrastructure**: A direct internal API route (`GET /api/health/ping`) performs a `prisma.$queryRaw` to keep the Supabase connection warm, triggered by a GitHub Actions workflow (`keep-alive.yml`).

## 🚨 Known Gotchas
1. **Next.js 16.3 proxy.ts**: Do not recreate a `middleware.ts` file; it is now `proxy.ts` with the exported function named `proxy`.
2. **Cloudinary Images**: Do not query the Cloudinary API directly to render images on the frontend. We fetch the `Media` model from Prisma because it supports `sortOrder` for drag-and-drop.
3. **Tailwind JIT**: Be careful with string interpolation for Tailwind classes (e.g., `bg-[${color}]/20`). Tailwind scans files for *static* class strings. Always explicitly define the full class string (like `bg-blue-400/20`) in an object or array to ensure it compiles.
4. **Icons**: Using `lucide-react` for iconography. When passing icons to client components, pass their string name (e.g. `iconName: "users"`) instead of the raw React Component to avoid Server/Client boundary serialization errors.

## 🚀 Current Session Context & Next Steps (Read First for New Agents!)
**Current Branch:** `master` (recently merged `redesign/mobile-ui`)
**Database State:** 
- The Supabase database was successfully synced with the new `schema.prisma`. The old `profiles` table was dropped, and the new `members` table is active.
- Two test accounts were manually re-created (`admin@rovers.com` and `scouts@rovers.com`) and inserted into the `members` table.
- **Middleware Security**: `src/proxy.ts` performs Edge authentication checks, but relies on Server Components (like `admin/layout.tsx` via Prisma) for authorization and role checks using `redirect()`. This avoids slow edge DB queries.

**Code State (Completed in this session):**
- Split Mobile and Desktop home page experiences in `src/app/page.tsx` using responsive hiding.
- Integrated Upstash Redis for Edge rate limiting in `src/proxy.ts`.
- Implemented `ParticipantStatus` Prisma enum and removed the deprecated `tier` column from `RoleHistory`, relying on heuristic tier mapping via `roleTitle`.
- Overhauled the `Navbar.tsx` and `AdminSidebar.tsx` with responsive, accessible Shadcn `Sheet` drawers, replacing fragile custom Framer Motion variants for mobile menus.
- Cleaned and refactored `DashboardActions.tsx` utilizing Shadcn `Button` components.
- Configured Edge Incremental Static Regeneration (ISR) (`revalidate = 60`) on data-heavy public routes (`/events`, `/fame`, `/gallery`, `/hierarchy`).
- Created `/api/health/ping` directly pinging Prisma for the keep-alive workflow.

**Immediate Next Step (Your Task):**
- Monitor the app for any lingering bugs or missing features that were deferred.
- The repository is now fully built, type-checked, and successfully audited for mobile UI improvements and caching.
- Proceed with new user requests on the `master` branch.
