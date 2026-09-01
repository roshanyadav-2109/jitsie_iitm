-- IndieRise, incubated at IIT Madras Research Park. Copy taken from
-- theindierise.com; the official mark is white artwork on transparency, so a
-- dark recolour is stored for the light directory cards.

INSERT INTO public.companies (name, slug, one_liner, description, industry, batch, website_url, logo_url) VALUES
('IndieRise',
 'indierise',
 'AI-native film studio and software.',
 'IndieRise is an AI-native film studio and software company, working as both a production partner and a product team.

It builds AI-native film production pipelines from first-principles research, covering the run from scriptwriting through shot generation, VFX and post-production.

Its SaaS platform, IndieRay, is an all-in-one filmmaking pipeline for creators.

Founded in 2025. Incubated at the IIT Madras Research Park.',
 'Media & Creative Tech',
 '2025',
 'https://www.theindierise.com/',
 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/logos/indierise.png')
ON CONFLICT (slug) DO UPDATE SET
  one_liner = EXCLUDED.one_liner,
  description = EXCLUDED.description,
  industry = EXCLUDED.industry,
  batch = EXCLUDED.batch,
  website_url = EXCLUDED.website_url,
  logo_url = EXCLUDED.logo_url;
