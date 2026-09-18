# EArovers - Memory & Context

## 🛠️ Tech Stack & Architecture
- **Framework**: Next.js 16.3 (App Router). *Note: The middleware file convention has changed to `src/proxy.ts` in this version.*
- **Database ORM**: Prisma (`prisma/schema.prisma`).
- **Database Host**: Supabase (PostgreSQL).
- **Authentication**: Supabase Auth integrated with Next.js Server Actions and `proxy.ts` (middleware).
- **Media Hosting**: Cloudinary for direct image/video uploads, but Prisma `Media` model stores the URLs and metadata for fast querying and custom sorting.
- **Styling**: Tailwind CSS with custom CSS variables defined in `src/app/globals.css`. Built with a dual-mode professional design system:
  - **Concept 1 (Deep Tech Dark Mode)**: Deep charcoal and midnight black background (`#080b10`) fading into midnight blue at edges, electric cyan interactive accents and glowing edges, polished rich gold accents (`#ffd700`), crisp off-white typography, and layered dark-blue-tinted glass cards.
  - **Concept 2 (Organic Light Mode)**: Crisp off-white/cream background (`#fbfbf9`) with subtle tactile warm linen texture, deep rich navy blue typography (`#0b1a30`), authentic clan scarf navy buttons & CTAs (`#161e35` to `#1e2746`), warm sandy gold accents (`#d4a373`), and subtle layered white cards with soft neumorphic depth shadows.
- **Theming**: `next-themes` handles dark/light mode switching via a `ThemeProvider` wrapper in `src/app/layout.tsx` (attribute `class`, default theme `dark`). The animated sun/moon toggle is in `src/components/theme-toggle.tsx` with CSS in `src/app/toggle.css`.
- **UI Components**: `shadcn/ui` is integrated. Migrated to `@base-ui/react` (which requires the `render` prop instead of `asChild`) for accessible unstyled components (like Tabs, buttons). Magic UI concepts (`framer-motion` layout animations) are used for animated navigation pills.

## 🎨 Design Philosophy
- **Aesthetic**: Premium, elite, high-contrast, and tactile. High fidelity textures, modern glass effects, and soft depth without device frames.
- **UI Elements**: Layered cards (`glass-card` & `honor-card` CSS classes), neon ambient electric cyan glows (`shadow-[0_0_20px_rgba(...)]`), fine gold borders on honor cards, animated sun/moon theme toggle.
- **Layout Direction**: Arabic (RTL - Right to Left). Ensure flex directions, margins (`ml`/`mr`), borders (`border-l`/`border-r`), and gradients (`bg-gradient-to-l`) are mapped correctly for RTL.

## 🧩 Key Components
- **Unified Member Model**: The database previously separated `Profile` (for auth users) and `Person` (for historical tree data). These have been merged into a single `Member` model using a `hasAccount` boolean.
- **Traffic Tracking**: `<TrafficTracker>` in `src/components/TrafficTracker.tsx` runs silently on every page view and calls the `logPageView` Server Action to log metrics to the `PageVisit` Prisma model.
- **Admin Dashboard**: `src/app/admin/components/AdminDashboardClient.tsx`. Heavily relies on Recharts for visual analytics. Data is fetched on the server in `src/app/admin/page.tsx` and passed as initial props.
- **Sidebar**: `src/app/admin/components/AdminSidebar.tsx`. Contains custom logic to highlight the active tab using an edge-to-edge gradient and right-border.
- **Media Galleries**: 
  - `src/components/FullGallery.tsx`: Used on `/gallery`. Has categories, loads everything, and uses `yet-another-react-lightbox`.
  - `src/components/MediaGallery.tsx`: Used on the homepage. Drops the "All" filter and limits the return to max 12 items.
- **Brand Identity & Clan Scarves Modal**: `src/components/layout/Identity.tsx` displays the official clan logo (`public/Logo.png`) alongside "عشيرة جوالة هندسة", and showcases the official scout clan scarf using `public/images/clan-scarf.png`. Clicking the footer scarf card triggers `src/components/layout/ClanScarvesModal.tsx`, an animated pop-out modal featuring the 3 official scout scarves in RTL order:
  1. Right (`/images/scarfs/board-scarf.png`): "هيكل العشيرة" (board / council scarf with red stripe).
  2. Center (`/images/scarfs/leader-scarf.png`): "قائد العشيرة / قائدة المرشدات" (featured clan leader / guide leader light blue scarf).
  3. Left (`/images/scarfs/member-scarf.png`): "أعضاء العشيرة" (member scarf with cyan/light blue stripe).
  Full support for both Organic Light and Deep Tech Dark themes, keyboard ESC exit, and backdrop click-to-close.
- **Health Check Infrastructure**: A direct internal API route (`GET /api/health/ping`) performs a `prisma.$queryRaw` to keep the Supabase connection warm, triggered by a GitHub Actions workflow (`keep-alive.yml`).

## 🚨 Known Gotchas
1. **Next.js 16.3 proxy.ts**: Do not recreate a `middleware.ts` file; it is now `proxy.ts` with the exported function named `proxy`.
2. **Cloudinary Images**: Do not query the Cloudinary API directly to render images on the frontend. We fetch the `Media` model from Prisma because it supports `sortOrder` for drag-and-drop.
3. **Tailwind JIT**: Be careful with string interpolation for Tailwind classes (e.g., `bg-[${color}]/20`). Tailwind scans files for *static* class strings. Always explicitly define the full class string (like `bg-blue-400/20`) in an object or array to ensure it compiles.
4. **Icons**: Using `lucide-react` for iconography. When passing icons to client components, pass their string name (e.g. `iconName: "users"`) instead of the raw React Component to avoid Server/Client boundary serialization errors.

## 🚀 Current Session Context & Next Steps (Read First for New Agents!)
**Current Branch:** `master`
**Code State (Completed in this session):**
- **Clan Scarves Modal**: Added `src/components/layout/ClanScarvesModal.tsx` and connected it to the footer scarf card in `src/components/layout/Identity.tsx`.
- Extracted, cleaned, and placed transparent PNG assets in `public/images/scarfs/`:
  - `leader-scarf.png` (قائد العشيرة / قائدة المرشدات)
  - `board-scarf.png` (هيكل العشيرة)
  - `member-scarf.png` (أعضاء العشيرة)
- Formatted in RTL layout: Board on the right, Clan Leader in the center with featured gold badge, and Members on the left.
- Fully verified via browser subagent tests and screenshots in both light and dark themes.
- **Unified Button Styling**: Standardized all primary action and filter buttons across the page (`Navbar` join button & mobile drawer join button, `HeroCarousel`, `MediaGallery` filter pills & view all button, `ScoutShields` & `MobileShieldsGallery`, `Sessions`, `ClanTree` year tabs, and `Join Us` CTA) to use the signature warm orange gradient (`from-[#e0a96d] to-[#d4a373]`) with dark text (`#0b1a30`), matching the active navbar pill and responsive to dark mode.
- **Hierarchy ClanTree TypeError Fix**: Resolved `TypeError: Cannot read properties of undefined (reading 'id')` in `ClanTree.tsx`:
  - Fixed node formatting in `src/app/(public)/hierarchy/page.tsx` to map DB `role.member` into both `member` and `person` object keys.
  - Added defensive member/person normalization and safe id/name/avatar property extraction in `src/components/clan/ClanTree.tsx` and `src/components/clan/PersonCard.tsx`.
  - Added fallback in `ClanTree` to `clanTreeData` when `dbData` is empty/omitted (e.g. on homepage preview).
  - Configured `images.remotePatterns` in `next.config.ts` to support external member avatar URLs (e.g. `cdn.jsdelivr.net`, Cloudinary, Unsplash).

