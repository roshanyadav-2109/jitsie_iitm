
# Replace Partners with Initiatives + Redesign Homepage

## Overview

Replace the Partners page/table with a new "Initiatives" concept, create a new `initiatives` database table, and completely restructure the homepage into 6 distinct sections. Also darken the footer background.

---

## 1. Database: New `initiatives` Table (replaces Partners usage for page)

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | gen_random_uuid() |
| title | text | Required - initiative name |
| description | text | Short description |
| image_url | text | Cover image |
| link | text | External or internal link |
| display_order | integer | Default 0 |
| is_active | boolean | Default true |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

RLS: Public SELECT, admin-only writes. Seed with sample initiatives (e.g., "Startup Launchpad", "Deep-Tech Accelerator", "Women Founders Program").

Note: The existing `partners` table stays in the database (partner logos are still needed for the homepage marquee). The Partners **page** and route are removed.

---

## 2. Homepage Restructure (`src/pages/Index.tsx`)

The homepage will have these 6 sections in order:

### Section 1 - Hero (keep as-is)
No changes to the current hero with "Build the future." heading and CTA buttons.

### Section 2 - Stats Strip (keep as-is)
The dark inverted stats bar with valuation, startups funded, active founders.

### Section 3 - Partners Marquee (new)
- Title: "Together with our partners, we build what's next."
- Below: an infinite horizontal marquee of partner logos scrolling right-to-left
- Uses existing `usePartners()` hook to fetch logos from the `partners` table
- CSS animation (`@keyframes scroll`) for smooth continuous scrolling
- Logos displayed at consistent size, duplicated for seamless loop

### Section 4 - Initiatives CTA Banner (new)
- Styled like the PageHeader component (teal accent background with geometric SVG patterns)
- Title: "Looking for our cohorts?"
- Description: "We offer mentorships to emerging startups at every stage of innovation."
- Centered capsule-shaped button: "Explore Initiatives" linking to `/initiatives`

### Section 5 - Gallery (reworked)
- Title: "Emerging from India, directing the world"
- Description line: "Viewing our ecosystem"
- Then the existing image gallery grid (same as current)

### Section 6 - Past Speakers Marquee (new)
- Light gray background section
- Title: "Our Past Speakers"
- Horizontal auto-scrolling marquee of speaker cards (right-to-left)
- On hover of a card: show name and designation/bio overlay
- Uses existing `usePastSpeakers()` hook
- Cards show avatar image; on hover, a semi-transparent overlay reveals name + designation

### After Section 6 - Footer
Footer background changed to a dark shade of the accent color (`#004D5E` or similar dark teal) with white/light text.

---

## 3. New Initiatives Page (`/initiatives`)

- Uses `PageHeader` with title "Initiatives"
- Grid of initiative cards showing image, title, description
- Link/button on each card if `link` is provided
- New `useInitiatives()` hook fetching from `initiatives` table

---

## 4. Navigation Updates

- **Navbar**: Replace "Partners" link with "Initiatives" (`/initiatives`)
- **Footer**: Replace "Partners" link with "Initiatives", darken footer background
- **App.tsx**: Replace `/partners` route with `/initiatives`, remove Partners page import, add Initiatives page import

---

## 5. Footer Darkening

Change footer from the current light gradient to a solid dark accent background:
- Background: dark teal (e.g., `#00394A` — a very dark shade of #00A5C8)
- All text becomes white/light colored
- Border colors adjusted for dark background

---

## Files to Create
- `src/pages/Initiatives.tsx` — new Initiatives page
- `src/hooks/useInitiatives.ts` — hook for fetching initiatives

## Files to Modify
- `src/pages/Index.tsx` — complete homepage restructure (6 sections)
- `src/index.css` — add marquee keyframe animation
- `src/components/Footer.tsx` — dark accent background, update links
- `src/components/Navbar.tsx` — replace Partners with Initiatives
- `src/App.tsx` — replace Partners route with Initiatives
- `src/lib/types.ts` — add Initiative interface

## Files to Delete
- `src/pages/Partners.tsx` — replaced by Initiatives

## Database Migration
- Create `initiatives` table with RLS + seed data

## Technical Details

### Marquee Animation (CSS)
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```
Content is duplicated inside a flex container; the animation translates -50% to create seamless looping. `animation: marquee 30s linear infinite;`

### Speaker Hover Effect
Each speaker card in the marquee has an overlay div that transitions from `opacity-0` to `opacity-100` on hover, showing name and bio text over the avatar image.
