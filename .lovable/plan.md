

# Startup Ecosystem Hub — Full Implementation Plan

## Overview

A full-stack directory, job board, and community hub with Y Combinator's "Academic/Newspaper" aesthetic. All content is admin-managed via the database. Public users can browse all content. Authentication differentiates Admin, Founder, and User roles.

---

## Step 1: Database Schema (Single Migration)

Create the following in one SQL migration:

### Enum Types
- `app_role` — values: `admin`, `founder`, `user`
- `company_status` — values: `active`, `acquired`
- `job_type` — values: `intern`, `full_time`
- `partner_category` — values: `vc`, `corporate`

### Tables
1. **profiles** — `id` (UUID, FK to auth.users, PK), `full_name`, `avatar_url`, `is_verified` (default false), timestamps
2. **user_roles** — `id`, `user_id` (FK profiles), `role` (app_role), unique(user_id, role)
3. **companies** — `id`, `name`, `slug` (unique), `one_liner`, `description`, `logo_url`, `batch`, `industry`, `status` (company_status), `founder_id` (FK profiles), `website_url`, timestamps
4. **jobs** — `id`, `company_id` (FK companies), `title`, `location`, `salary_range`, `type` (job_type), `category`, `apply_link`, timestamps
5. **events** — `id`, `title`, `date_time` (timestamptz), `location`, `registration_link`, `cover_image`, timestamps
6. **partners** — `id`, `name`, `logo_url`, `category` (partner_category), timestamps
7. **articles** — `id`, `title`, `slug` (unique), `content` (text), `author`, `published_at` (timestamptz), `cover_image`, timestamps
8. **news_updates** — `id`, `text`, `link`, `created_at` (default now())

### Security Functions
- `has_role(uuid, app_role)` — SECURITY DEFINER function checking user_roles table
- Trigger on auth.users insert to auto-create a profile row

### RLS Policies (all tables have RLS enabled)
- **profiles**: Anyone can SELECT; authenticated users can UPDATE their own row; admins can do everything
- **user_roles**: Admins can manage all; users can read their own role
- **companies, jobs, events, partners, articles, news_updates**: Public SELECT for everyone; INSERT/UPDATE/DELETE restricted to admins via `has_role()`

---

## Step 2: Design System Setup

### Google Fonts
Add Newsreader and Inter via `<link>` in `index.html`.

### CSS Variables (index.css)
Override the existing design tokens:
- `--background`: HSL equivalent of `#F5F5EE`
- `--foreground`: HSL equivalent of `#111111`
- Add `--accent-orange` for `#F26522`
- Set `--radius: 0` for square corners

### Tailwind Config
- Add `fontFamily` entries for `serif: ['Newsreader']` and `sans: ['Inter']`
- Add custom colors for `bone`, `soft-black`, `accent-orange`

---

## Step 3: Shared Layout Components

### Navbar (`src/components/Navbar.tsx`)
- Sticky top bar, bone background, 1px bottom border
- Links: Directory, Jobs, Library, Events, Login
- Mobile: hamburger menu using Sheet component
- Logo/brand on the left

### Footer (`src/components/Footer.tsx`)
- Minimal footer with copyright and links

### Layout (`src/components/Layout.tsx`)
- Wraps all pages with Navbar + Footer + bone background

### SkeletonLoaders (`src/components/SkeletonCard.tsx`, etc.)
- Reusable skeleton components matching the design system

---

## Step 4: Landing Page (`/`)

### Hero Section
- Full-width centered section
- Large Newsreader heading: *"Build the future."*
- Italicized serif quote below

### Stats Strip
- Horizontal flex row with vertical dividers
- Three stats: "Total Valuation", "Startups Funded", "Active Founders"
- Static values initially (can be made dynamic later)

### News Feed
- Dense text-only list fetched from `news_updates` table
- Each row: timestamp + title/text + optional link
- Hacker News-style numbering

---

## Step 5: Startup Directory (`/companies`)

### Sidebar
- Filter by Batch (text input or select)
- Filter by Industry (select)

### Grid
- Cards with 1px border, no shadow, square corners
- Company logo, name (Newsreader serif), one-liner (Inter)
- Click navigates to `/companies/:slug`

### Company Detail Page (`/companies/:slug`)
- Full description, logo, batch, industry, status, website link
- Related jobs listed below

---

## Step 6: Jobs Board (`/jobs`)

### Data Table
- Columns: Company Logo | Job Title (serif) | Location + Salary (gray) | Apply button (black bg, white text)
- Filter bar: Engineering, Sales, Remote, job type
- Mobile: horizontal scroll wrapper

---

## Step 7: Knowledge Library (`/library`)

### List View
- Blog-style cards: title, author name, published date
- Sorted by `published_at` descending

### Reading View (`/library/:slug`)
- Narrow max-width container
- Newsreader serif for body text
- Clean typography optimized for reading

---

## Step 8: Board and Team (`/team`)

- Grid of profile cards
- Each card: avatar image, full_name, role badge
- Fetched from profiles table (filtered to founders and admins, or all verified)

---

## Step 9: Events (`/events`)

### List View
- Sorted by `date_time` ascending (upcoming first)
- Each row: title, formatted date/time, location
- "Register" button linking to `registration_link`
- "Add to Calendar" button that generates and downloads a `.ics` file

---

## Step 10: Authentication Pages

### Login Page (`/login`)
- Email/password form with bone aesthetic
- Square buttons, 1px borders
- Link to sign up

### Signup Page (`/signup`)
- Email/password registration
- Auto-creates profile via database trigger
- Default role: `user`

### Auth Context (`src/contexts/AuthContext.tsx`)
- Provides current user and session
- `onAuthStateChange` listener set up before `getSession()`
- Exposes `isAdmin` helper using `has_role` check

---

## Step 11: Routing (App.tsx)

Add all routes:
- `/` — Landing Page
- `/companies` — Directory
- `/companies/:slug` — Company Detail
- `/jobs` — Jobs Board
- `/library` — Articles List
- `/library/:slug` — Article Reading View
- `/team` — Board and Team
- `/events` — Events
- `/login` — Login
- `/signup` — Signup

---

## File Structure

```text
src/
  components/
    Navbar.tsx
    Footer.tsx
    Layout.tsx
    SkeletonCard.tsx
    SkeletonTable.tsx
    StatStrip.tsx
    NewsFeed.tsx
    CompanyCard.tsx
    JobRow.tsx
    EventRow.tsx
    ArticleCard.tsx
    TeamCard.tsx
  contexts/
    AuthContext.tsx
  hooks/
    useCompanies.ts
    useJobs.ts
    useEvents.ts
    useArticles.ts
    useNewsUpdates.ts
    usePartners.ts
    useProfiles.ts
  pages/
    Index.tsx
    Companies.tsx
    CompanyDetail.tsx
    Jobs.tsx
    Library.tsx
    ArticleDetail.tsx
    Team.tsx
    Events.tsx
    Login.tsx
    Signup.tsx
    NotFound.tsx
  lib/
    calendar.ts  (ICS file generation)
    utils.ts
```

---

## Technical Details

### Data Fetching Pattern
Each page uses a custom hook (e.g., `useCompanies`) built with `@tanstack/react-query` and the Supabase client. Skeleton loaders display during loading state.

### ICS Calendar Generation
The `calendar.ts` utility creates a downloadable `.ics` blob for the "Add to Calendar" feature on events.

### Mobile Responsiveness
- Navbar collapses to hamburger (Sheet-based slide-out menu)
- Jobs table wrapped in `overflow-x-auto` for horizontal scroll
- Company grid switches from multi-column to single column
- All pages use responsive Tailwind breakpoints

### Security Summary
- All tables have RLS enabled
- Public read on content tables (companies, jobs, events, partners, articles, news_updates)
- Write operations restricted to admins via `has_role()` SECURITY DEFINER function
- Profiles: self-read/update only (plus admin access)
- User roles stored in separate `user_roles` table (never on profiles)
- Auto-profile creation via trigger on auth signup

