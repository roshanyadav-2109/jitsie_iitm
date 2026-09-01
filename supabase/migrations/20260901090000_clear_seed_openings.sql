-- Clear the board. The twenty rows here were seed data for third-party companies
-- (OpenAI, SpaceX, NVIDIA and so on) that were never JITSIE startups; real
-- openings now arrive through the Request hiring form.

DELETE FROM public.startup_openings;
