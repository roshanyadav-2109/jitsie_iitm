-- Supplied KaroStartup wordmark, replacing the icon-only mark. PitchBook serves it
-- with hotlink protection (403 without a browser Referer), so it is copied into
-- Supabase Storage rather than linked.

UPDATE public.partners
  SET logo_url = 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/partners/karostartup.png'
  WHERE name = 'KaroStartup';
