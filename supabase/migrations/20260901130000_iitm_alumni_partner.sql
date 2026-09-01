-- IIT Madras Alumni Association joins the partners strip on the home page.

INSERT INTO public.partners (name, logo_url, category, show_on_home)
SELECT
  'IIT Madras Alumni Association',
  'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/partners/iitm-alumni-association.png',
  'corporate',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM public.partners WHERE name = 'IIT Madras Alumni Association'
);
