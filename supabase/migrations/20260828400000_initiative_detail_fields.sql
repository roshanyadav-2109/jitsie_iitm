-- Structured detail for each programme, so the initiative page can say what it is,
-- when it runs and what came out of it. Figures are from the JITSIE Tenure Report
-- 2025-26; the Wadhwani cohorts run on an annual cycle.

ALTER TABLE public.initiatives
  ADD COLUMN overview TEXT,
  ADD COLUMN format TEXT,
  ADD COLUMN cadence TEXT,
  ADD COLUMN held TEXT,
  ADD COLUMN mode TEXT,
  ADD COLUMN eligibility TEXT,
  ADD COLUMN partners TEXT,
  ADD COLUMN outcomes TEXT;

UPDATE public.initiatives SET
  overview = 'START-A-THON is JITSIE''s flagship competition: a 48-hour build sprint followed by a Real Shark Tank, where surviving teams pitch live to angel investors and startup mentors rather than to an academic panel. It was run with the Startup Ignition Cell, RVEI and the Wadhwani Foundation, and drew participants from well beyond IIT Madras BS.',
  format = '48-hour hackathon, then a Real Shark Tank pitch round before angel investors',
  cadence = 'Flagship competition — run as a large single edition to date',
  held = 'Registrations and judging hosted on Devfolio',
  mode = 'Online build sprint with a live pitch finale',
  eligibility = 'Open registration, including teams from outside IIT Madras BS',
  partners = 'Wadhwani Foundation · Startup Ignition Cell · RVEI · KaroStartup · Devfolio · Polygon · Solana · Replit · The Graph · Filecoin',
  outcomes = '1,596 registrations across 835 teams
430+ idea submissions
163 teams advanced to prototyping
USD 50,000 in prizes and incubation
Judged by Pratapaditya Chakravarty (HCL), Ajay Batra (Uniqorn), Chandan Kar and Kriti Soni (Wadhwani Foundation) and Marcus Rein (Edge & Node)',
  link = 'https://start-a-thon1.devfolio.co/'
  WHERE title LIKE 'START-A-THON%';

UPDATE public.initiatives SET
  overview = 'WEN Think Startup is the Wadhwani Entrepreneur Network''s structured cohort, delivered to JITSIE members as the official student community partner of the Wadhwani Foundation for IIT Madras. It takes participants from a raw idea to a pitched venture across a six-week arc, with Wadhwani''s own startup mentors and angel investors leading the sessions.',
  format = 'Four interactive sessions across six weeks, ending in idea and venture pitching',
  cadence = 'Runs annually as a Wadhwani Foundation cohort',
  held = 'Delivered each academic year',
  mode = 'Online, live sessions',
  eligibility = 'Open to JITSIE members; selection into the taken-forward group is on participation',
  partners = 'Wadhwani Foundation',
  outcomes = '1,000+ registrations
525 students taken forward
85+ teams in idea pitching
35+ teams in venture pitching'
  WHERE title LIKE 'WEN Think Startup%';

UPDATE public.initiatives SET
  overview = 'LiftOff is the Wadhwani Foundation''s pre-incubation track. Teams that already have a validated idea use it to firm up the business case, the structure and the first version of the product before approaching an incubator or investor properly.',
  format = 'Pre-incubation support for teams with a validated idea',
  cadence = 'Runs annually with the Wadhwani Foundation',
  held = 'Delivered each academic year',
  mode = 'Online',
  eligibility = 'JITSIE member teams with an idea already validated',
  partners = 'Wadhwani Foundation',
  outcomes = '45+ startups pre-incubated to date'
  WHERE title LIKE 'Wadhwani LiftOff%';

UPDATE public.initiatives SET
  overview = 'A direct incubation route into Software Technology Parks of India (STPI) at Mohali, run by the Government of India. Selected JITSIE startups working in AI/ML and IoT enter STPI''s incubation programme with seed funding attached.',
  format = 'Government incubation cohort with seed funding',
  cadence = 'By selection, when an STPI cohort opens',
  held = 'STPI Mohali, Government of India',
  mode = 'Incubation at STPI Mohali',
  eligibility = 'JITSIE startups working in AI/ML and IoT',
  partners = 'Software Technology Parks of India (STPI), Mohali · Government of India',
  outcomes = '4+ startups incubated
In-process funding of Rs 2.5 Lakh for 2% equity'
  WHERE title LIKE 'JITSIE%STPI Incubation Cohort%';

UPDATE public.initiatives SET
  overview = 'A residential five-day intensive in Bengaluru for a small, highly selective cohort. It compresses the early startup journey — ideation through to a working MVP and an investor pitch — into a single week, with food and stay covered so cost is not a barrier to attending.',
  format = 'Five-day residential intensive, ideation through MVP to investor pitch',
  cadence = 'Runs as a selective annual intake with Wadhwani and RVEI',
  held = 'Bengaluru',
  mode = 'In person, residential — food and stay covered',
  eligibility = 'Highly selective — a cohort of 30 students',
  partners = 'Wadhwani Foundation · RVEI (Research & Venture Enterprise Incubation)',
  outcomes = 'Cohort of 30 students
Ideation to MVP within five days
Pitching prize of Rs 4,500
Food and stay covered for all participants'
  WHERE title LIKE 'Bengaluru Startup Bootcamp%';

UPDATE public.initiatives SET
  overview = 'A short, practical course led by Ajay Batra of Uniqorn Growth Partners on using ChatGPT as a working tool across the startup build — research, positioning, drafting and validation — rather than as a novelty. Offered free to JITSIE members.',
  format = 'Five-hour course',
  cadence = 'Run as an open member course',
  held = 'Led by Ajay Batra, Founder & CEO, Uniqorn Growth Partners',
  mode = 'Online',
  eligibility = 'Free to all JITSIE members',
  partners = 'Uniqorn Growth Partners',
  outcomes = '700+ students registered
200+ completed the course'
  WHERE title LIKE 'Building Startups using ChatGPT%';

UPDATE public.initiatives SET
  overview = 'IgniteX is the six-week Wadhwani programme JITSIE runs alongside Blue Ocean Venture Partners, delivered to selected students in tightly sized cohorts so that each team gets real mentor attention rather than a webinar.',
  format = 'Six-week programme delivered in cohorts',
  cadence = 'Runs annually with the Wadhwani Foundation',
  held = 'Delivered each academic year across two cohorts',
  mode = 'Online',
  eligibility = 'By selection — 120 students per cohort',
  partners = 'Wadhwani Foundation · Blue Ocean Venture Partners',
  outcomes = '240 students selected across two cohorts of 120
Six weeks of structured delivery per cohort'
  WHERE title LIKE 'JITSIE%IgniteX%';

UPDATE public.initiatives SET
  overview = 'IGNITE is the cohort JITSIE conceptualised and led itself, taking the programme beyond IIT Madras BS to other campuses. Built with the Wadhwani Foundation, it ran across IIT Kanpur, IIT Kharagpur, IIT Guwahati and LSR''s BYOB Society, with a curriculum on Design Thinking and the Innovation Trinity that carries participants from idea to plan.',
  format = 'Online bootcamp on entrepreneurship — Design Thinking and the Innovation Trinity, idea to plan',
  cadence = 'Runs annually with the Wadhwani Foundation',
  held = '2025-26 tenure',
  mode = 'Online, multi-institutional',
  eligibility = 'Open across the participating institutions',
  partners = 'Wadhwani Foundation · IIT Kanpur · IIT Kharagpur · IIT Guwahati · LSR (BYOB Society)',
  outcomes = '2,000+ students registered
Approximately 500 registrations per institution
Conceptualised and led by JITSIE'
  WHERE title LIKE 'IGNITE Cohort%';
