-- Neural AI's own mark, from its LinkedIn page. LinkedIn's media URLs carry an
-- expiry, so the file is copied into Supabase Storage rather than hotlinked.
UPDATE public.companies
SET logo_url = 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/logos/neural-ai.png'
WHERE slug = 'neural-ai';
