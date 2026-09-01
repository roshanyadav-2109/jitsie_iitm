-- The twenty seed companies (OpenAI, SpaceX, NVIDIA and so on) were never JITSIE
-- startups; only Neural AI belongs in the directory today.

DELETE FROM public.companies WHERE slug <> 'neural-ai';
