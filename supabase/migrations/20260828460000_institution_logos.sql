-- Participating institutions get logos so the initiative pages can show them, but
-- they are not JITSIE partners, so they are kept out of the homepage partner strip.

ALTER TABLE public.partners ADD COLUMN IF NOT EXISTS show_on_home BOOLEAN NOT NULL DEFAULT true;

INSERT INTO public.partners (name, logo_url, category, show_on_home) SELECT 'IIT Kanpur','https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/partners/iit-kanpur.png','corporate',false WHERE NOT EXISTS (SELECT 1 FROM public.partners WHERE name='IIT Kanpur');
INSERT INTO public.partners (name, logo_url, category, show_on_home) SELECT 'IIT Kharagpur','https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/partners/iit-kharagpur.png','corporate',false WHERE NOT EXISTS (SELECT 1 FROM public.partners WHERE name='IIT Kharagpur');
INSERT INTO public.partners (name, logo_url, category, show_on_home) SELECT 'IIT Guwahati','https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/partners/iit-guwahati.png','corporate',false WHERE NOT EXISTS (SELECT 1 FROM public.partners WHERE name='IIT Guwahati');
INSERT INTO public.partners (name, logo_url, category, show_on_home) SELECT 'LSR (BYOB Society)','https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/partners/lsr.png','corporate',false WHERE NOT EXISTS (SELECT 1 FROM public.partners WHERE name='LSR (BYOB Society)');

-- Match the partner labels on the initiatives to the names that carry logos.
UPDATE public.initiatives
  SET partners = replace(partners, 'Startup Ignition Cell (RVEI)', 'Startup Ignition Cell (SIC)')
  WHERE partners LIKE '%Startup Ignition Cell (RVEI)%';

UPDATE public.initiatives
  SET partners = replace(partners, 'RVEI (Research & Venture Enterprise Incubation)', 'RVEI')
  WHERE partners LIKE '%RVEI (Research%';

-- 'Government of India' duplicates what the STPI label already says.
UPDATE public.initiatives
  SET partners = 'Software Technology Parks of India (STPI), Mohali'
  WHERE title LIKE 'JITSIE%STPI Incubation Cohort%';

