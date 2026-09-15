# Architecture Overview

This document outlines the high-level architecture and technical decisions for the EArovers web application.

## 1. System Architecture

- **Frontend**: Next.js 16.3 (App Router) using React Server Components (RSC).
- **Styling**: Tailwind CSS combined with `shadcn/ui` components for rapid, accessible UI development.
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
- `/public`: Static assets (fonts, icons, PR images like badges and leadership photos).
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
