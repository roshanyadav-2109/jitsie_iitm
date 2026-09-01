-- IIT Madras itself, so speakers whose organisation is the institute (rather than
-- the Research Park) resolve the right crest on their card.

INSERT INTO public.speaker_companies (name, logo_url, website_url, display_order, show_name)
SELECT 'IIT Madras',
       'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/logos/iit-madras.png',
       'https://www.iitm.ac.in/',
       (SELECT COALESCE(MAX(display_order), 0) + 1 FROM public.speaker_companies),
       true
WHERE NOT EXISTS (SELECT 1 FROM public.speaker_companies WHERE name = 'IIT Madras');
