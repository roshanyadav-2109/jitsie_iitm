-- Put the Research Park wordmark back for Prof. Jhunjhunwala, and give Swadeep his
-- PanIIT role alongside Blue Ocean. The plain IIT Madras crest stays removed.

INSERT INTO public.speaker_companies (name, logo_url, website_url, display_order, show_name)
SELECT 'IIT Madras Research Park',
       'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/logos/iitm-research-park.png',
       'https://respark.iitm.ac.in/', 1, false
WHERE NOT EXISTS (SELECT 1 FROM public.speaker_companies WHERE name = 'IIT Madras Research Park');

UPDATE public.past_speakers SET companies = 'IIT Madras Research Park'
  WHERE full_name = 'Prof. Ashok Jhunjhunwala';

UPDATE public.past_speakers SET companies = 'Blue Ocean Venture Partners · PanIIT Alumni India'
  WHERE full_name = 'Swadeep Pillarisetti';
