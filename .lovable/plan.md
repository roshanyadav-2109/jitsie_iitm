

# Updated Plan: Remove `event_name` from Past Speakers Table

This is a minor update to the previously approved plan. The `past_speakers` table will no longer include the `event_name` column. Everything else from the approved plan remains the same.

---

## Updated `past_speakers` Table Schema

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | gen_random_uuid() |
| full_name | text | Required |
| designation | text | Role/title |
| organization | text | Company/institution |
| avatar_url | text | Photo |
| linkedin_url | text | LinkedIn link |
| topic | text | Talk topic |
| display_order | integer | Default 0 |
| is_active | boolean | Default true |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

The `event_name` column has been removed. RLS policies and seed data remain the same as before. All other changes from the previous plan (accent color, font, footer, library deletion, leadership rename, card designs, openings layout, build error fix) are unchanged.

---

## Summary of All Changes (carried forward)

1. **Fix build error** in `usePartners.ts` (type cast)
2. **Database migration**: Create `past_speakers` table (without `event_name`) + RLS + seed data
3. **Delete** Library and ArticleDetail pages
4. **Add** Past Speakers page and hook
5. **Accent color** to #00A5C8
6. **Font** to Inter Regular everywhere (remove serif/Newsreader)
7. **Footer** gradient with #00A5C8
8. **Rename** Team to Leadership, update route
9. **Card design** matching reference image (no hover effects)
10. **Openings** single-column rectangular cards

