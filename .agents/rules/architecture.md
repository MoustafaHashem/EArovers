# Architecture & File Structure Rules

## MANDATORY NEXT.JS FILE STRUCTURE
This project strictly follows a customized Enterprise Next.js App Router structure. You MUST adhere to this exact structure when creating new files, components, or routes.

1. **Components (src/components/)**:
   - ALL React components must be placed here.
   - Do NOT place components loosely in src/app.
   - Components MUST be organized by domain/feature inside src/components/:
     - src/components/layout/ (Navbar, Footer/Identity, Sidebars)
     - src/components/home/ (Landing page sections)
     - src/components/gallery/ (Media related)
     - src/components/clan/ (Hierarchy, Profiles)
     - src/components/admin/ (Dashboard blocks, admin sidebars)
     - src/components/analytics/ (Tracking)
     - src/components/ui/ (Shadcn/UI primitive components ONLY)

2. **Server Actions (src/actions/)**:
   - ALL global server actions must reside in src/actions/.
   - Do not place global actions inside src/app/actions.

3. **Public Routes (src/app/(public)/)**:
   - All standard public-facing pages MUST go inside the (public) route group to keep the root src/app clean.
   - Examples: src/app/(public)/events, src/app/(public)/gallery, src/app/(public)/people.

4. **Imports**:
   - Always use the absolute path alias @/ when importing (e.g., import { Navbar } from "@/components/layout/Navbar";).

Failure to follow this folder structure will break the established project architecture. Always check this rule before generating new files.
