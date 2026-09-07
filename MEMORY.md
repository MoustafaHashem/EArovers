# EArovers - Memory & Context

## 🛠️ Tech Stack & Architecture
- **Framework**: Next.js 16.3 (App Router). *Note: The middleware file convention has changed to `src/proxy.ts` in this version.*
- **Database ORM**: Prisma (`prisma/schema.prisma`).
- **Database Host**: Supabase (PostgreSQL).
- **Authentication**: Supabase Auth integrated with Next.js Server Actions and `proxy.ts` (middleware).
- **Media Hosting**: Cloudinary for direct image/video uploads, but Prisma `Media` model stores the URLs and metadata for fast querying and custom sorting.
- **Styling**: Tailwind CSS with custom CSS variables (`var(--color-scout-blue)`, `var(--color-scout-navy)`, etc.) defined in `src/app/globals.css`.

## 🎨 Design Philosophy
- **Aesthetic**: Premium, sleek, and modern. Dark mode by default.
- **UI Elements**: Glassmorphism (`glass-card` CSS class), neon ambient glows (`shadow-[0_0_20px_rgba(...)]`), smooth transitions. 
- **Layout Direction**: Arabic (RTL - Right to Left). Ensure flex directions, margins (`ml`/`mr`), borders (`border-l`/`border-r`), and gradients (`bg-gradient-to-l`) are mapped correctly for RTL.

## 🧩 Key Components
- **Traffic Tracking**: `<TrafficTracker>` in `src/components/TrafficTracker.tsx` runs silently on every page view and calls the `logPageView` Server Action to log metrics to the `PageVisit` Prisma model.
- **Admin Dashboard**: `src/app/admin/components/AdminDashboardClient.tsx`. Heavily relies on Recharts for visual analytics. Data is fetched on the server in `src/app/admin/page.tsx` and passed as initial props.
- **Sidebar**: `src/app/admin/components/AdminSidebar.tsx`. Contains custom logic to highlight the active tab using an edge-to-edge gradient and right-border.
- **Media Galleries**: 
  - `src/components/FullGallery.tsx`: Used on `/gallery`. Has categories, loads everything, and uses `yet-another-react-lightbox`.
  - `src/components/MediaGallery.tsx`: Used on the homepage. Drops the "All" filter and limits the return to max 12 items.

## 🚨 Known Gotchas
1. **Next.js 16.3 proxy.ts**: Do not recreate a `middleware.ts` file; it is now `proxy.ts` with the exported function named `proxy`.
2. **Cloudinary Images**: Do not query the Cloudinary API directly to render images on the frontend. We fetch the `Media` model from Prisma because it supports `sortOrder` for drag-and-drop.
3. **Tailwind JIT**: Be careful with string interpolation for Tailwind classes (e.g., `bg-[${color}]/20`). Tailwind scans files for *static* class strings. Always explicitly define the full class string (like `bg-blue-400/20`) in an object or array to ensure it compiles.
4. **Icons**: Using `lucide-react` for iconography. When passing icons to client components, pass their string name (e.g. `iconName: "users"`) instead of the raw React Component to avoid Server/Client boundary serialization errors.
