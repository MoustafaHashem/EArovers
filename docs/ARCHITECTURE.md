# Architecture Overview

This document outlines the high-level architecture and technical decisions for the EArovers web application.

## 1. System Architecture

- **Frontend**: Next.js 16.3 (App Router) using React Server Components (RSC).
- **Styling & Theming**: Tailwind CSS combined with `shadcn/ui` components and a dual design system:
  - *Deep Tech Dark Mode*: Deep charcoal/midnight black `#080b10`, electric cyan interactive highlights, glowing accents, polished rich gold, off-white Arabic typography, layered dark-blue cards.
  - *Organic Light Mode*: Crisp off-white/cream `#fbfbf9`, tactile warm linen textures, deep rich navy blue `#0b1a30`, authentic clan scarf navy CTAs `#161e35` to `#1e2746`, warm sandy gold `#d4a373`, layered white cards with soft neumorphic shadows.
  - *Hero Experience*: Dual-mode responsive hero (`HeroCarousel.tsx`). Mobile viewports (< `md`) play a portrait cinematic scout activity video (`public/videos/hero-mobile.mp4` with auto-extracted poster frame and muted autoplay/playsinline), while desktop/laptop viewports retain the full-screen auto-playing image carousel with dark cinematic gradient overlays, smooth cross-fades, and glowing capsule pagination.
  - Toggled seamlessly with `next-themes` and a custom animated switch.
- **Backend**: Next.js Server Actions handle form submissions, database mutations, and server-side operations securely.
- **Database**: PostgreSQL hosted on Supabase, managed via Prisma ORM.
- **Authentication**: Supabase Auth (integrated via `proxy.ts` middleware and Server Actions).
- **Media Storage**: Cloudinary for uploads, while maintaining a relational index via the `Media` Prisma model for fast retrieval, categorization, and manual sorting.

## 2. Database Schema (Prisma)

The schema centers around the `Member` model, unifying user authentication profiles and historical/structural members.

- **`Member`**: Represents individuals in the clan. 
  - `hasAccount` boolean defines if they are an authenticated user or a historical entry.
- **`RoleHistory`**: Maps a `Member` to specific clan roles in specific academic years, establishing the clan hierarchy and tree.
- **`Achievement`**: Tracks milestones, courses, and honors tied to a `Member`.
- **`Media`**: Stores metadata and URLs of photos/videos hosted on Cloudinary, categorized by type.
- **`JoinRequest`**: Handles new user applications before they are approved and converted into a `Member`.
- **`Shield`**: Details scout shields, badges, requirements, and categories (Cultural, Artistic, Scout, etc.).
- **`Event`**: Stores details about upcoming and past scouting events.

## 3. Directory Structure

- `/prisma`: Contains `schema.prisma` and generated types.
- `/public`: Static assets (clan logo `Logo.png`, `favicon.ico`, `icon.png`, fonts, PR images like badges, leadership photos, and hero video).
- `/src/app`: The Next.js App Router root.
  - `/api`: API routes (including the `/health/ping` cron target).
  - `/admin`: The secure admin dashboard (protected by `proxy.ts`).
  - `/(public)`: Dynamic client-facing routes (`/hierarchy`, `/shields`, `/events`, `/fame`, `/gallery`).
  - `/components`: Server/Client components used across the application.
  - `/lib`: Utility functions, Prisma client initialization, and shadcn utils.
- `/docs`: Project documentation and architecture details.

## 4. Key Workflows

### Authentication & Authorization
- Users authenticate via Supabase Auth.
- Next.js middleware (`src/proxy.ts`) protects `/admin` routes.
- The `hasAccount` boolean and database-level RLS (Row Level Security) ensure data integrity.

### Health Check Infrastructure
- Supabase free-tier pauses databases after inactivity.
- A GitHub Actions workflow (`.github/workflows/keep-alive.yml`) hits the `/api/health/ping` route.
- The route executes a direct Prisma `$queryRaw` to keep the connection pool active and the database warm.

### Mobile-First Responsive Design
- The application prioritizes mobile users.
- Component layouts utilize Tailwind CSS breakpoints (`sm:`, `md:`, `lg:`).
- Heavy reliance on touch-friendly targets, horizontal scrollable tabs (with hidden scrollbars), and off-canvas menus (shadcn `Sheet`).

### Events Carousel & Dynamic Feed
- **Homepage Events Section**: Implements a horizontal scrolling carousel (`EventsCarousel.tsx`) featuring 2 interactive tabs ("الفعاليات القادمة" and "الفعاليات السابقة") with count badges. Events are filtered against current date and sorted from newest to oldest (`startDate desc`). Retains the centered header structure (with decorative divider lines and subtitle), tactile cards with top cover images, floating overlapping gold scout pill badges (`-mt-5`) with RTL Arabic title on the right and arrow icon on the left, centered dates/locations, side carousel navigation buttons, and a centered "عرض جميع الفعاليات" CTA button. Kept clean without category clutter per user preference.
- **Dedicated Events Route & Details View**: `/events` lists upcoming and past events via `EventsListClient.tsx` with 2 main tabs and 5 filter categories: معسكرات, دراسات, سيشنات, خدمة عامة, متنوع. Individual event pages at `/events/[id]` (`src/app/(public)/events/[id]/page.tsx`) feature hero imagery, full event descriptions, photo galleries, and a structured meta sidebar providing Start Date ("تاريخ البدء"), End Date ("ينتهي في"), Venue/Location ("المكان"), and Participant capacity with graceful fallbacks.
### Hall of Fame & Championships System
- **Homepage Timeline Section (`HallOfFame.tsx`)**: Displays a high-contrast chronological timeline highlighted with scout gold dots, placements, and special award tags. Features rich background imagery from authentic clan tournament archives with adaptive dual-mode gradients (ensuring 100% legibility in light and dark themes) and smooth interactive zoom on hover. Positioned before Media Gallery / CTA with an explore button ("اكتشف جميع البطولات والإنجازات") navigating to `/fame`. Displays the top 2 latest tournaments (`.slice(0, 2)`).
- **Mobile Homepage Alignment (`MobileHome.tsx`)**: Replaced the previous single teaser card with the full `<HallOfFame />` component, ensuring the latest 2 tournaments appear with their full luxury visual cards and the explore button, exactly matching the desktop/laptop view.
- **Dedicated Championships Hub (`/fame`)**:
  - *Desktop Layout (`hidden md:block`)*: Displays the 3D circular platform (`FameIslands.tsx`) with the central emblem ("من عبدو باشا وجي بصوته يهز الدورة دي!!") and 5 symmetrically arranged floating 3D crystal islands (وفدية, رياضية, كشفي, بحري, فنون واسمار). The redundant bottom cards grid is removed on desktop viewports.
  - *Mobile Layout (`md:hidden`)*: Replaces the 3D rotating dial with a dedicated mobile slogan banner and 5 touch-friendly stacked category cards showing crystal island graphics, descriptions, competition counts, and direct action links.
  - *Dual-Theme Support*: Fully responsive to Light and Dark themes with ambient blur lighting and Cairo typography.
- **Dedicated Category Hub (`/fame/[category]`)**: Dynamic route powered by `FameCategoryClient.tsx` using dedicated `TOURNAMENTS_DATA`:
  - Category Hero banner featuring the 3D crystal island graphic, category badge, and competition stats.
  - **Quick Category Switcher Bar** with live tournament counts for 1-click jumping between categories.
  - **Live Search & Year Filters** with instant results counter and filter reset.
  - **Standardized Horizontal Tournament Cards**: Matches the exact homepage `HallOfFame` luxury design with cover photo background, title, year, location, gold placement badge with Medal icon, and special awards tags.
  - Links directly to individual tournament detail pages (`/fame/tournaments/[id]`).
- **Dedicated Tournament Detail Route (`/fame/tournaments/[id]`)**:
  - Independent championship presentation featuring hero banner with cover photo, placement spotlight, special awards and honors, narrative story of the clan's participation, photo gallery, and a **Participating Delegation Section (الوفد المشارك)** showcasing leaders and rovers with their respective roles.

### Performance & Caching
- **Proxy Middleware Fast-Path (`src/proxy.ts`)**: Bypasses expensive external Supabase Auth calls (`supabase.auth.getUser()`) for unauthenticated visitors browsing public routes (`/`, `/fame/*`, `/events/*`, `/shields`, `/gallery`, `/hierarchy`, `/join`). Saves 150-400ms on every client-side route navigation and RSC payload request.
- **Database Connection Pooling (`src/lib/prisma.ts`)**: Implements the proper global singleton pattern for `PrismaClient` to maintain a persistent connection pool across requests and hot-reloads, eliminating connection churn and database handshake delays.
- **Batch Shields Media Query (`src/actions/media.ts`)**: `fetchBatchShieldsMediaAction` consolidates 8 individual category queries into a single database query cached with Next.js `unstable_cache` (`revalidate: 86400`), accelerating the mobile homepage render.
- **Conditional Upstash Redis**: Guards Redis and Ratelimiter initialization against missing environment variables to prevent unnecessary network timeouts and console warnings.
- **Incremental Static Regeneration (ISR)**: Next.js ISR is configured (`revalidate = 60`) on data-heavy public routes (`/events`, `/fame`, `/gallery`, `/hierarchy`, `/shields`) to ensure fast page loads while keeping database queries to a minimum.
- **Responsive Image Optimization**: All `<Image fill />` components declare granular `sizes` attributes, eliminating oversized image downloads and browser warnings.

### Media Gallery Architecture (`/gallery`)
- **Visual & Layout Alignment**: Integrated with the global `<Navbar />` (highlighting the "الميديا" link) and `<Identity />` footer, with ambient glowing backdrop and RTL styling.
- **Server Preloading & Client Hydration**: Server Component preloads initial media via `fetchMediaAction("الكل")` to eliminate layout shifts and spinners on first load.
- **Interactive Control Suite**: Includes real-time textual search across titles and categories, media format toggling (`all` / `image` / `video`), and 6 category filters (`الكل`, `معسكرات`, `مسابقات`, `دروع`, `كواليس`, `رحلات`) with animated selection indicators and live count badges.
- **Responsive Media Grid & Lightbox Experience**: Uniform 4:3 cards with frosted-glass category badges, format indicators, play buttons for video clips, and hover-triggered zoom effects. Lightbox is configured with Zoom, Thumbnails, Captions, and Video plugins for full-screen in-browser playback of local and Cloudinary MP4 scout videos.
- **Curated Fallback Layer**: Ensures rich content availability across all categories even when database queries return empty or when seeding new environments.

### Join Us Form & Interview Slots Architecture (`/join`, `src/actions/join.ts`)
- **Multi-Step Progressive Form**: 4 structured steps with intuitive visual indicators, responsive validation (`canGoNext`), and animated transitions:
  1. *البيانات الشخصية والتواصل*: Full Name, Gender selection (`ذكر (جوال)` / `أنثى (مرشدة)`), Call Phone Number, and WhatsApp Number with smart "نفس رقم الهاتف" one-click synchronization.
  2. *البيانات الأكاديمية*: Academic Year and Faculty of Engineering Ain Shams University department/specialization dropdown with free-text fallback for custom credit programs.
  3. *الاهتمامات الكشفية*: Multi-select activity pills (Camping, Arts, Sports, Media, Community Service, Marine Scouting) and notes.
  4. *مواعيد المقابلة الشخصية (Interview Slots)*: Multi-day calendar slots selector (Saturday through Thursday, 4 periods per day). Supports selecting multiple slots across different days, with per-day badges and removable chip summaries.
- **Submission & State Persistence**: Employs hidden inputs outside step animations to guarantee complete form data capture across unmounted steps.
- **Post-Submission Feedback**: Custom celebratory success screen with registration recap and official message:
  *"تمام، تم تسجيل بياناتك بنجاح! هنبعتلك على الواتساب أو هنكلمك علشان نبلغك بميعاد الإنترفيو."*
- **Admin Management (`/admin/requests`)**: Enhanced review cards with direct call links, 1-click WhatsApp web/app messaging (`wa.me`), academic specialization, and visual tags of candidate interview availability.

