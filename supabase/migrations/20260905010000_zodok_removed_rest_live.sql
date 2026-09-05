-- ZODOK removed from the directory entirely per request; everyone else
-- that was staged but hidden goes live.
DELETE FROM public.companies WHERE slug = 'zodok';
UPDATE public.companies SET is_listed = true;
