

# Board Members and Startup Advisors — Implementation Plan

## What We're Building

Two new database tables to store rich profiles for **Board Members** and **Startup Advisors**, displayed on the existing `/team` page in distinct sections. Each person will have a full bio, role/designation, LinkedIn URL, photo, and other relevant details.

---

## Step 1: Database — Two New Tables

### Table: `board_members`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | Default: gen_random_uuid() |
| full_name | text | Required |
| designation | text | e.g. "Chairperson", "Director", "Trustee" |
| bio | text | Short biography |
| avatar_url | text | Profile photo URL |
| linkedin_url | text | LinkedIn profile link |
| organization | text | Their affiliated org/company |
| display_order | integer | Controls sort order on page |
| is_active | boolean | Default true |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

### Table: `startup_advisors`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | Default: gen_random_uuid() |
| full_name | text | Required |
| designation | text | e.g. "Mentor", "Industry Advisor", "EIR" |
| bio | text | Short biography |
| avatar_url | text | Profile photo URL |
| linkedin_url | text | LinkedIn profile link |
| organization | text | Their affiliated org/company |
| expertise | text | Area of expertise (e.g. "AI/ML", "Growth Strategy") |
| display_order | integer | Controls sort order on page |
| is_active | boolean | Default true |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

### RLS Policies (both tables)
- Public `SELECT` — anyone can view
- Admin-only `INSERT`, `UPDATE`, `DELETE`

---

## Step 2: Seed Data

### Board Members (~6-8 entries)
Realistic board-level profiles for the JITSIE ecosystem, e.g.:
- **Dr. Kamakoti V** — Chairperson, Director of IIT Madras
- **Prof. Ashok Jhunjhunwala** — Board Member, Institute Professor at IIT Madras
- **Rajan Anandan** — Board Member, Managing Director at Sequoia Capital India
- Additional members with designations like Trustee, Independent Director, etc.

### Startup Advisors (~8-10 entries)
Mentors and industry experts, e.g.:
- **Sridhar Vembu** — Industry Advisor, CEO of Zoho Corporation (expertise: SaaS, Product)
- **Kris Gopalakrishnan** — Senior Advisor, Co-founder of Infosys (expertise: Enterprise, Scaling)
- **Padmaja Ruparel** — Mentor, Co-founder of Indian Angel Network (expertise: Fundraising, VC)
- Additional advisors across AI/ML, DeepTech, BioTech, FinTech, etc.

---

## Step 3: Frontend — Redesigned Team Page

The existing `/team` page will be restructured into three clear sections:

### Layout

1. **Board Members** section
   - Section heading: "Board of Directors" with a subtitle
   - Larger cards in a 2-3 column grid
   - Each card shows: photo (grayscale, color on hover), name, designation, organization, short bio excerpt, and a LinkedIn icon-link

2. **Startup Advisors** section
   - Section heading: "Advisors & Mentors"
   - Similar card grid (3-4 columns)
   - Each card shows: photo, name, designation, organization, expertise badge, bio excerpt, LinkedIn link

3. **Team Members** section (existing profiles data, kept as-is at the bottom)
   - Section heading: "Core Team"
   - Current grid layout preserved

### Card Design
- YC/newspaper aesthetic: 1px borders, bone background, serif headings
- Hover effect: grayscale-to-color photo, subtle border highlight
- LinkedIn shown as a small icon in the corner of each card

---

## Step 4: Data Fetching

### New Hooks
- `useBoardMembers()` — fetches from `board_members` table, ordered by `display_order`, filtered by `is_active`
- `useStartupAdvisors()` — fetches from `startup_advisors` table, ordered by `display_order`, filtered by `is_active`

### New Types in `src/lib/types.ts`
- `BoardMember` interface
- `StartupAdvisor` interface

---

## Technical Details

### Files to Create
- None (hooks will be added to existing `useProfiles.ts`)

### Files to Modify
- `src/hooks/useProfiles.ts` — Add `useBoardMembers()` and `useStartupAdvisors()` hooks
- `src/lib/types.ts` — Add `BoardMember` and `StartupAdvisor` interfaces
- `src/pages/Team.tsx` — Redesign with three sections

### Migration
Single SQL migration covering:
1. Create `board_members` table with RLS
2. Create `startup_advisors` table with RLS
3. Seed ~6-8 board members
4. Seed ~8-10 advisors
