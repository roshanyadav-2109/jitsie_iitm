

# Startup Openings Page — Implementation Plan

## What We're Building

A new **"Startup Openings"** page at `/openings` that showcases hiring opportunities from JITSIE ecosystem startups. This is distinct from the existing Jobs Board — it focuses on startup-specific roles with richer metadata extracted from the JITSIE report (sectors like EdTech, FinTech, SaaS, BioTech, SpaceTech, etc.).

---

## Step 1: Database — New `startup_openings` Table

Create a dedicated table to hold startup-specific openings with richer fields than the generic `jobs` table:

**Table: `startup_openings`**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | Default: gen_random_uuid() |
| startup_name | text | Name of the startup |
| startup_slug | text | Links to company if exists |
| role_title | text | Position title |
| description | text | Role description |
| sector | text | e.g. EdTech, FinTech, AI/ML, BioTech |
| stage | text | e.g. Pre-Seed, Seed, Series A |
| location | text | City or Remote |
| stipend_salary | text | Range or fixed |
| type | text | intern / full_time / co_founder / freelance |
| apply_link | text | External URL |
| is_active | boolean | Default true |
| posted_at | timestamptz | Default now() |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

**RLS**: Public SELECT, admin-only INSERT/UPDATE/DELETE (same pattern as all other tables).

---

## Step 2: Seed Data from JITSIE Report

Populate with ~20 realistic openings based on the report's ecosystem (200+ startups across EdTech, FinTech, SaaS, BioTech, SpaceTech, DeepTech, Sustainability, FoodTech, Tourism, Consulting, ERP):

Examples:
- **AgniKul Cosmos** — Propulsion Engineer Intern (SpaceTech, Pre-Seed, Chennai)
- **NeuralForge AI** — ML Research Intern (AI/ML, Seed, Remote)
- **GreenGrid Energy** — Frontend Developer (CleanTech, Seed, Bangalore)
- **EduNex** — Content Strategist (EdTech, Pre-Seed, Remote)
- **BioSynth Labs** — Lab Research Associate (BioTech, Seed, Chennai)
- **PayStack India** — Growth Marketing Intern (Fintech, Series A, Mumbai)
- Various JITSIE-ecosystem startups in Consulting, SaaS, FoodTech, etc.

Also seed additional companies, more news_updates, articles, and events referencing data from the report (Pitch Fest 2024, Becoming Billionaire 2025, PIWOT 2025, etc.).

---

## Step 3: Frontend — Startup Openings Page (`/openings`)

### Design
Follows the existing YC/newspaper aesthetic with the bone background, Newsreader headings, and 1px borders.

### Layout
- **Header**: "Startup Openings" in large serif, subtitle with count of active openings
- **Filter Bar**: Chips for sector (All, AI/ML, FinTech, EdTech, DeepTech, etc.), type (All, Intern, Full-Time, Co-Founder), and stage (All, Pre-Seed, Seed, Series A)
- **Cards Grid**: Each opening displayed as a card with:
  - Startup name + sector badge
  - Role title (serif, bold)
  - Location, stipend, stage as metadata
  - "Apply" button (black bg, white text)
  - Posted date in relative format

### Mobile
- Filters scroll horizontally
- Cards stack single-column

---

## Step 4: Hook & Routing

- Create `src/hooks/useStartupOpenings.ts` — TanStack Query hook with sector/type/stage filters
- Add TypeScript type `StartupOpening` to `src/lib/types.ts`
- Add route `/openings` in `App.tsx`
- Add "Openings" link to the Navbar

---

## Step 5: Additional Data Seeding

Based on the report, also seed:
- **More events**: Pitch Fest 2024, START-A-THON, Bengaluru Bootcamp, PIWOT 2025, Becoming Billionaire 2025, Panel Discussion at TTJA
- **More news_updates**: STPI incubation, Wadhwani LiftOff, Polygon Labs partnership, PanIIT collaboration
- **More partners**: Wadhwani Foundation, STPI, RVEI, KaroStartup, Uniqorn Growth Partners, Polygon Labs, PanIIT Alumni India

---

## Technical Details

### Files to Create
- `src/pages/StartupOpenings.tsx` — Main page component
- `src/hooks/useStartupOpenings.ts` — Data fetching hook

### Files to Modify
- `src/lib/types.ts` — Add `StartupOpening` interface
- `src/App.tsx` — Add `/openings` route
- `src/components/Navbar.tsx` — Add "Openings" nav link

### Migration
Single SQL migration covering:
1. `startup_openings` table creation with RLS
2. INSERT ~20 openings
3. INSERT additional events, partners, and news_updates from the report

