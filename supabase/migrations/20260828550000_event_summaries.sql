-- Past events are a track record, not leftovers, so give each one the account of
-- JITSIE's role from the Tenure Report 2025-26 rather than leaving a bare title.

ALTER TABLE public.events ADD COLUMN IF NOT EXISTS summary TEXT;

UPDATE public.events SET summary = v.txt
FROM (VALUES
  ('World Food India%',
   'JITSIE volunteers supported the Ministry of Food Processing Industries flagship, gaining first-hand exposure to startup showcases, investor interactions and the global food-tech ecosystem.'),
  ('IMECE India%',
   'Members volunteered at the International Mechanical Engineering Congress & Exposition organised by ASME, covering participant management, session support and logistics, alongside exposure to cutting-edge engineering research and industry networking.'),
  ('IGNITE Cohort%',
   'Conceptualised and led by JITSIE with the Wadhwani Foundation across IIT Kanpur, IIT Kharagpur, IIT Guwahati and LSR''s BYOB Society. Over 2,000 students registered, roughly 500 per institution, for a curriculum on Design Thinking and the Innovation Trinity that took participants from idea to plan.'),
  ('Orientation Session%',
   'The tenure''s flagship knowledge session, led by CA Paridhi Agarwal: why incorporation matters, startup eligibility, Pvt Ltd vs LLP vs OPC, and the registration and government-recognition routes. The Q&A ran longer than the talk, and attendance held from start to finish.'),
  ('PAN IIT Summit 2026%',
   'JITSIE joined 1,500+ alumni from all 23 IITs at one of India''s largest alumni gatherings, taking in AI and deep-tech tracks, venture-capital and entrepreneurship sessions, hackathons and startup pitches.')
) AS v(pat, txt)
WHERE public.events.title LIKE v.pat;
