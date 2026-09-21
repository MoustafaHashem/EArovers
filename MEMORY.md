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
<<<<<<< HEAD
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
- **Mobile Hero Video Background**: Configured `HeroCarousel.tsx` to use a responsive background video on mobile (`< md` screen sizes, `public/videos/hero-mobile.mp4` with `hero-mobile-poster.jpg`) with `autoPlay`, `loop`, `muted`, and `playsInline`, while seamlessly maintaining the multi-image cross-fading carousel on desktop/laptop screens (`md:` and above). Centered pagination indicators on mobile viewports for clean visual symmetry.
- **Brand Favicon & App Icons**: Replaced default Next.js / Vercel favicon with official clan logo (`Logo.png`). Generated multi-resolution `favicon.ico` (16, 32, 48, 64), `icon.png` (192x192), and `apple-icon.png` (180x180) in both `src/app/` and `public/`, and configured `metadata.icons` in `src/app/layout.tsx`.
- **Shields Page Redesign & Dedicated Shield Media Gallery (`src/app/(public)/shields/ShieldsClient.tsx`, `src/actions/media.ts`)**:
  - Main Grid: Removed container cards and external title text. In mobile view (`grid-cols-2`), increased shield image scale (`scale-[2.25]`, `max-w-[195px]`) for a much larger, clear, and prominent presentation.
  - Detail View Top Header: Removed the duplicate `h1` title (as the shield name is integrated into the artwork's ribbon), enlarged the shield badge with rich drop-shadows (`scale-[2.05]`), and presented the description text cleanly.
  - Retained Section 2 ("مجالات وأنشطة الدرع") with competitive fields.
  - Replaced Section 3 with a dedicated "معرض صور وفعاليات الدرع" (Shield Photo & Media Gallery): connects to `fetchShieldMediaAction` to dynamically query database photos matching the shield, supports curated fallback albums per shield category, and includes full `yet-another-react-lightbox` viewer with zoom and video support.
- **Homepage Shields Domains Smart Threshold (`src/components/home/ScoutShields.tsx`, `src/components/home/MobileShieldsGallery.tsx`)**:
  - Implemented dynamic threshold rule: if a shield contains 3 or fewer domains (`items.length <= 3`), all are displayed.
  - If a shield contains more than 3 domains (`items.length > 3`), only the first 2 are displayed, and the 3rd slot renders an interactive "عرض المزيد" card that links directly to that shield's full detail page.
- **Hall of Fame & Championships (5 3D Islands & Dedicated Category Hub)**: Completely overhauled `/fame` (`src/app/(public)/fame/page.tsx`) and `FameIslands.tsx` to feature 5 new high-fidelity 3D crystal island graphics in strict user-specified order:
  1. **وفدية** (`/images/fame/wafdeya.jpg` - shield in velvet box on crystal island)
  2. **رياضية** (`/images/fame/sports.jpg` - crystal soccer trophy with laurel wreath)
  3. **كشفي** (`/images/fame/scout.jpg` - fleur-de-lis scout emblem trophy)
  4. **بحري** (`/images/fame/naval.jpg` - boat and oars trophy with water splash)
  5. **فنون واسمار** (`/images/fame/arts.jpg` - golden ornate cup with art palette & notes)
  - Arranged symmetrically at 72° circular intervals (`360 / 5 = 72°`).
  - Island click behavior: Clicking any island on desktop or mobile dial directly navigates to the dedicated category route (`/fame/[category]`).
  - **Dynamic Category Page (`/fame/[category]/page.tsx`)**:
    - Hero banner featuring the category's 3D floating island image, category badge, gold title, rich scout description, and total count of registered competitions.
    - Competitions grid sorted chronologically from newest to oldest (`startDate desc`).
    - Cards identically formatted to the homepage card design: cover image with eventType badge, overlapping gold scout pill with RTL title on right & circle arrow on left, centered date & location.
    - Each competition card links directly to its detail page at `/events/[id]`.
    - Integrated `src/data/fameCategories.ts` with dataset and `isEventMatchingCategory` matcher.
    - Seeded realistic scout competitions for all 5 categories.
- **Studies/Training Consolidated into Events (5 Categories)**: Merged the standalone "التأهيل والدراسات" into the Events domain. Removed `/training` from `Navbar.tsx` and `Identity.tsx` footer (with auto-redirect to `/events?category=دراسات`), and removed the Sessions sections from `DesktopHome.tsx` and `MobileHome.tsx`. Divided events on `/events` (`EventsListClient.tsx`) into the 5 official categories: "معسكرات", "دراسات", "سيشنات", "خدمة عامة", "متنوع" with count badges, category icons, and deep linking, while preserving the homepage `EventsCarousel` intact with its clean 2-tab layout.
- **Events 2-Tab Split (Upcoming vs Past)**: Added a 2-tab interactive switcher ("الفعاليات القادمة" and "الفعاليات السابقة") to both the homepage carousel (`EventsCarousel.tsx`) and the dedicated events directory (`EventsListClient.tsx` & `/events/page.tsx`). Tab numbers removed for clean minimal appearance. Carousel scroll buttons dynamically display only when events count exceeds 3 (`displayedEvents.length > 3`). Both tabs sort from newest to oldest (`startDate desc`) and handle empty states gracefully.
- **Events Carousel Structure & Theme Alignment**: Rebuilt `src/components/home/EventsCarousel.tsx` to match the exact structural layout loved by the user (centered header with decorative divider lines and subtitle, overlapping gold pill badges with RTL Arabic text on the right and circular arrow button on the left, centered dates & locations, side navigation scroll buttons, and centered bottom "عرض جميع الفعاليات" button) while preserving the new dual-theme design system (Organic Light + Deep Tech Dark tokens, glowing borders, image error handling, and responsive styling).
- **Scout Shields UI Streamlining & Deep Linking**: Updated `ScoutShields.tsx` (desktop), `MobileShieldsGallery.tsx` (mobile), `ShieldsClient.tsx`, and `shields/page.tsx`:
  - Replaced the text title (e.g. "الدرع الكشفي") and subtitle description with the official transparent shield badge image (`/images/badges/*.png`) centered with drop-shadow effects.
  - Streamlined each domain/activity sub-card to display only the domain title (e.g., "الريادة والكادجات") with its icon, removing the redundant description subtext.
  - Connected the shield badge image and domain cards directly to `/shields?shield=<id>&field=<name>`:
    - Clicking on the shield badge opens the dedicated shield detail view directly on `/shields`.
    - Clicking on any domain card opens the shield detail view with that specific domain automatically highlighted with a badge and border accent.
    - Added Suspense boundary and Server Component searchParams synchronization in `src/app/(public)/shields/page.tsx` with fallback to `clanData` for zero-flash SSR loading.
  - **Mobile Shields Card Layout Refinement**: In `MobileShieldsGallery.tsx`, replaced the empty photo placeholder box (`لا توجد صور حالياً`) at the top of each mobile card with the prominent official shield badge image itself, and placed the domain activity buttons directly below it, eliminating visual clutter and duplicate badges.
  - **Shields Tabs & Bottom Button Refactoring**: In `ScoutShields.tsx` and `DesktopHome.tsx`:
    - Displaying only 3 shield tabs (`الدرع الكشفي`، `الدرع الفني`، `الدرع الرياضي`).
    - Added a 4th tab labeled `"عرض المزيد"` linking directly to `/shields`.
    - Removed the bottom `"عرض جميع الدروع"` button to keep the section compact and clean.
    - Synchronized `MobileShieldsGallery.tsx` to render the top 3 shields.
- **Footer Expansion & Official Contacts Integration**:
  - Rebuilt `src/components/layout/Identity.tsx` into an enhanced, responsive 4-column layout (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) supporting both Light and Dark themes:
    1. **Brand & Clan Scarf Badge**: Official logo, clan name, mission statement, and interactive modal trigger for clan scarves.
    2. **Quick Navigation**: Full Next.js client routes (`/hierarchy`, `/shields`, `/fame`, `/gallery`, `/events`, `/training`, `/join`).
    3. **Direct Contact**: Official Clan Leader telephone number (`+20 11 58400222`) with `tel:` link and quick WhatsApp click-to-chat button (`https://wa.me/201158400222`), plus official email (`contact@earovers.me`) with `mailto:` link.
    4. **Clan Headquarters & Location**: Official faculty address (`كلية الهندسة جامعة عين شمس، 1 شارع السرايات، العباسية، الوايلي، القاهرة 11535`) linked directly to Google Maps search, alongside social media links (Facebook, Instagram, YouTube, SoundCloud, WhatsApp).
  - Bottom bar with copyright year and official scout motto (`كُن مستعداً ⚜️ • خدمة - تنمية - قيادة`).
  - Tested and visually verified via browser snapshots across light and dark modes with 0 TypeScript compilation errors.
- **Join Us Form Redesign & Interview Slots Architecture (`src/components/home/JoinForm.tsx`, `src/actions/join.ts`, `prisma/schema.prisma`, `src/app/admin/requests/RequestsClient.tsx`)**:
  - **Prisma Schema Update (`JoinRequest` model)**:
    - Added `whatsapp String? @map("whatsapp")` for direct WhatsApp communication.
    - Added `gender String? @map("gender")` ("ذكر" | "أنثى") with scout distinction (جوال / مرشدة).
    - Added `department String? @map("department")` for Faculty of Engineering Ain Shams University academic departments.
    - Added `interviewSlots String[] @default([]) @map("interview_slots")` for storing candidate's selected interview slots.
    - Preserved `adminPermissions String[] @default([]) @map("admin_permissions")` on `Member` to ensure 100% data safety.
    - Executed `prisma db push` and `prisma generate` to synchronize Supabase PostgreSQL and Prisma Client.
  - **Multi-Step Form Rebuild (4 Steps)**:
    - **Step 1 (Personal & Contact)**: Full Name (`fullName`), Gender (`gender` radio pills: ذكر (جوال) / أنثى (مرشدة)), Call Phone Number (`phone`), and WhatsApp Number (`whatsapp`) with a one-click smart sync button ("نفس رقم الهاتف").
    - **Step 2 (Academic Info)**: Academic Year (`academicYear`) and Department (`department`) with ASU Engineering departments dropdown + custom input if "أخرى (تحديد يدوي)" is chosen.
    - **Step 3 (Scout Interests)**: Interactive interest pills + notes textarea.
    - **Step 4 (Interview Slots - New)**: Full interactive calendar slots selector organized by days (السبت إلى الخميس) with 4 standard university time slots (10-12, 12-2, 2-4, 4-6). Candidates can select multiple slots across multiple days, with a per-day count badge and removable selected slots chips.
    - Hidden inputs ensure 100% reliable state serialization on native HTML Form submission across steps.
  - **Success Screen & Messaging**:
    - Animated celebratory screen displaying the requested confirmation message:
      *"تمام، تم تسجيل بياناتك بنجاح! هنبعتلك على الواتساب أو هنكلمك علشان نبلغك بميعاد الإنترفيو."*
    - Displays complete registration recap (candidate name, gender, department, phone numbers, and chosen interview slots) with quick actions to return to homepage or register a new response.
  - **Admin Requests Integration (`RequestsClient.tsx`)**:
    - Displays gender badge, academic department alongside the academic year.
    - Direct phone call link (`tel:`) + direct WhatsApp chat button (`https://wa.me/20...`) to start conversation with candidate in one click.
    - Visual tags for all selected interview slots.
- **Clan Scarves Modal & Footer Refinements (`src/components/layout/ClanScarvesModal.tsx`, `src/components/layout/Identity.tsx`)**:
  - **Mobile Scarf Order**: Made Clan Leader scarf ("قائد العشيرة / قائدة المرشدات") appear first at the top on mobile viewports using responsive Tailwind ordering (`order-1 md:order-2` for Leader, `order-2 md:order-1` for Board, `order-3 md:order-3` for Members), perfectly preserving the 3-column RTL symmetry on desktop screens.
  - **Footer Social Icons Cleanup**: Removed the redundant WhatsApp button from the social platforms row (Facebook, Instagram, YouTube, SoundCloud), keeping WhatsApp exclusively within the leader contact card.
  - Added graceful fallbacks ("غير محدد") when `endDate` or `location` are not specified in the database.
  - Populated realistic scout dates and venues for dummy events (`Dummy Event 3: المهرجان الكشفي`, `Dummy Event 2: الدورة المتقدمة`, `Dummy Event 1: مخيم الإعداد`) in the database and in `prisma/restore_events.ts`.
- **Championships & Category Pages Complete Overhaul (`/fame`, `/fame/[category]`, `src/app/(public)/fame/page.tsx`, `src/app/(public)/fame/[category]/page.tsx`, `src/components/home/FameIslands.tsx`, `FameCategoryClient.tsx`)**:
  - **Dual-Theme Harmonization**: Replaced hardcoded dark background gradients with the site-wide dual design system tokens (`bg-transparent text-foreground font-cairo`) and ambient blur background (`blur-[160px]`), ensuring flawless aesthetic symmetry in both Light Mode (warm linen & navy gold) and Dark Mode (deep tech midnight & electric cyan).
  - **Hero & Live Analytics**: Added breadcrumb link, scout badge (`🏆 لوحة الشرف وسجل البطولات الكشفية`), main heading and subtitle, and 4 quick statistics cards (إجمالي البطولات, أقسام تخصصية, مسابقات قادمة, سجل التميز الكشفي).
  - **Responsive Layout Specialization**:
    - **Desktop/Laptop View (`hidden md:block`)**: Exclusively renders the 3D circular islands platform (`FameIslands.tsx`) with the central emblem ("من عبدو باشا وجي بصوته يهز الدورة دي!!") and 5 floating category islands, eliminating the redundant bottom cards grid. Removed duplicate internal titles via `showTitle = false`.
    - **Mobile View (`md:hidden`)**: Completely removed the clunky 3D rotating dial/wheel. Replaced with an elegant mobile chant banner and 5 stacked category cards with crystal island images, badges, descriptions, competition counts, and direct links.
  - **Dedicated Category Hub (`/fame/[category]`)**:
    - Extracted client interactivity into `FameCategoryClient.tsx`.
    - Integrated a **Quick Category Switcher Bar** with count badges allowing instantaneous jumping between all 5 categories (`وفدية`, `رياضية`, `كشفي`, `بحري`, `فنون واسمار`).
    - Added **Live Search Bar** (by competition name or venue) and **Status Tabs** (الكل / القادمة / السابقة) with live results counter and filters reset.
    - Upgraded competition cards with standardized top cover images, floating type badges, overlapping gold pill banners with circular arrow buttons, and date/location metadata.
- **Homepage Tournament Cards Background Images (`src/components/home/HallOfFame.tsx`, `src/data/clanData.ts`)**:
  - Added `image?: string` attribute to `FameItem` and populated authentic scout tournament imagery from clan archives (`hero-2.jpg` for festival & `hero-3.jpg` for summit competition awards).
  - Upgraded tournament cards in `HallOfFame.tsx` with smooth background images using Next.js `Image` with responsive sizing and subtle zoom micro-interaction on hover (`group-hover:scale-105 duration-700`).
  - Added dual-mode gradient and vignette overlays ensuring 100% typography sharpness and contrast for event titles, placement badges, and special awards tags in both Dark and Light modes.
- **Tournaments / Hall of Fame Decoupling & Dedicated Tournament Pages (`src/data/tournamentsData.ts`, `src/app/(public)/fame/tournaments/[id]/page.tsx`, `src/app/(public)/fame/[category]/FameCategoryClient.tsx`)**:
  - **Strict Domain Separation**: Fully decoupled Tournaments (البطولات / لوحة الشرف) from standard Events (الفعاليات). Tournaments now have an independent domain model (`TournamentItem` in `src/data/tournamentsData.ts`) with dedicated categories (wafdeya, sports, scout, naval, arts), eliminating accidental linking to regular event routes (`/events/[id]`).
  - **Category Cards Redesign**: Completely replaced the old 3-column event grid in `/fame/[category]` with the unified horizontal luxury card design matching the homepage `HallOfFame` (cinematic background photo, year badge, venue, gold placement badge with Medal icon, and special awards badges with Star icons).
  - **Dedicated Tournament Detail Route (`/fame/tournaments/[id]`)**:
    - Hero banner with full-bleed tournament cover image, year pill, date, venue, and grand placement spotlight badge.
    - **Participating Delegation Section (الوفد المشارك في البطولة)**: Renders a dedicated grid of clan delegation members, distinguishing leaders with special gold glowing badges/borders, displaying member roles (e.g. قائد الوفد، مسؤول الريادة، مخرج السمر، حارس المرمى) and stylized avatar initials.
    - **Special Awards & Honors**: Interactive cards for all special prizes, trophies, and shields won in the tournament.
    - **Narrative Story & Overview**: Recounting the clan's preparation and championship achievements.
    - **Tournament Photo Gallery**: Multi-photo gallery documenting the championship celebration.
  - **Global Card Linking**: Clicking any tournament card from either the homepage (`HallOfFame.tsx`) or category pages (`FameCategoryClient.tsx`) seamlessly navigates to `/fame/tournaments/[id]`.
- **Mobile Homepage Championships Section (`src/components/home/MobileHome.tsx`, `src/components/home/HallOfFame.tsx`)**:
  - Replaced the old small teaser card in `MobileHome.tsx` with the `<HallOfFame />` component, ensuring the latest 2 tournaments appear with their full luxury visual cards (background photos, year badge, medal placement, special awards) followed by the explore button (`اكتشف جميع البطولات والإنجازات` linking to `/fame`), matching the desktop experience seamlessly.
  - Sliced homepage display data to explicitly render the top 2 latest tournaments (`.slice(0, 2)`).
- **Navigation Performance & Database Optimizations**:
  - **Proxy Middleware Fast-Path (`src/proxy.ts`)**: Eliminated unnecessary `supabase.auth.getUser()` network calls on public pages. If the route is public and has no Supabase auth token, the proxy returns immediately (`NextResponse.next()`), eliminating 150-400ms of blocking roundtrip latency on every link click and RSC fetch.
  - **Prisma Client Singleton (`src/lib/prisma.ts`)**: Fixed broken singleton instantiation to prevent recreating new `PrismaClient` connection pools across requests and hot-reloads.
  - **Conditional Upstash Redis (`src/proxy.ts`, `src/actions/tracking.ts`)**: Guarded Redis client instantiation so unconfigured environment variables do not emit runtime warnings or attempt dummy network pings.
  - **Batch Shield Media Query (`src/actions/media.ts`, `src/components/home/MobileHome.tsx`)**: Added `fetchBatchShieldsMediaAction` with `unstable_cache` to fetch all shields' media in a single query instead of 8 separate parallel queries on every mobile homepage render.
  - **Next.js Link Prefetching & Fixes (`Navbar.tsx`)**: Converted anchor `<a>` tags for login to `<Link prefetch={true}>` to avoid full-page browser reloads, and enabled `prefetch={true}` on primary desktop and mobile navigation links.
  - **Image `sizes` Props Fixes**: Added responsive `sizes` props across `EventsCarousel.tsx`, `MobileShieldsGallery.tsx`, `events/[id]/page.tsx`, `ShieldsClient.tsx`, and `EventsListClient.tsx` to stop Next.js full-viewport image warnings and optimize image download weight.
  - **Git Cleaning & .gitignore**: Removed tracked `__pycache__` and `*.pyc` files from git, moved temporary `prisma/restore_events.ts` to `scratch/`, and added patterns for Python cache, OS files, and IDE files to `.gitignore`.
- **Legacy PR Integration Notes:**
  - Audited and integrated PRs #2 and #5 (Shields) and PR #8 (Shagara / Clan hierarchy).
  - Maintained `AboutSection` and `ShagaraSection` preview on homepage with dual design system styling.


