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

### Performance & Caching
- **Rate Limiting**: Integrated Upstash Redis within the Edge middleware (`src/proxy.ts`) to prevent abuse and DDoS attacks.
- **Incremental Static Regeneration (ISR)**: Next.js ISR is configured (`revalidate = 60`) on data-heavy public routes (`/events`, `/fame`, `/gallery`, `/hierarchy`, `/shields`) to ensure fast page loads while keeping database queries to a minimum.

### Clan Traditions & Visual Identity
- **Scout Scarves Modal**: The footer (`src/components/layout/Identity.tsx`) features an interactive showcase card for the clan scarf. Clicking this opens `ClanScarvesModal.tsx`, a centered dialog displaying the three official scarves (Board on the right, Clan/Guide Leader in the center, and Members on the left) with dedicated assets under `/public/images/scarfs/`.
- **Global Footer & Official Channels**: Built in `src/components/layout/Identity.tsx` as a 4-column responsive grid providing official Clan Leader contact (`+20 11 58400222` with WhatsApp direct link), official email (`contact@earovers.me`), and faculty headquarters location (`Faculty of Engineering Ain Shams University`) directly linked to Google Maps, alongside social channels and quick navigation.

