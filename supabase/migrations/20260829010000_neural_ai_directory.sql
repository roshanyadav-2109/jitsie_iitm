-- Neural AI, from the JITSIE ecosystem. Copy and tagline taken from neuralai.in;
-- the logo resolves through the same domain-logo service the other directory
-- records use.

INSERT INTO public.companies (name, slug, one_liner, description, industry, website_url, logo_url) VALUES
('Neural AI',
 'neural-ai',
 'Cognitive architectures for next generation AI.',
 'Neural AI builds persistent cognitive memory systems and structured architectures that let AI remember, reason across time, and consolidate knowledge — moving past stateless transformer models.',
 'AI/ML',
 'https://neuralai.in/',
 'https://api.devfolio.co/api/miscellaneous/logo/neuralai.in.png')
ON CONFLICT (slug) DO UPDATE SET
  one_liner = EXCLUDED.one_liner,
  description = EXCLUDED.description,
  industry = EXCLUDED.industry,
  website_url = EXCLUDED.website_url,
  logo_url = EXCLUDED.logo_url;
