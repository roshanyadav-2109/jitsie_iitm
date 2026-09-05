-- ZODOK taken off the public directory per request; stays in the table.
UPDATE public.companies SET is_listed = false WHERE slug = 'zodok';
