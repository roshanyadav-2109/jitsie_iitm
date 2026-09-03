-- Adds a manual publish toggle for the startup directory. Only companies
-- with is_listed = true are meant to show on the public /companies page;
-- everything else stays in the table (for admin use) but hidden from the
-- directory until explicitly turned on.
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS is_listed boolean NOT NULL DEFAULT true;

UPDATE public.companies SET is_listed = (slug IN ('zodok', 'neural-ai', 'indierise'));
