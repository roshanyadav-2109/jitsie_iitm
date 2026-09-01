-- Replace placeholder seed content with real JITSIE data.
-- Sources: JITSIE Tenure Report 2025-26 (IIT Madras BS, issued 03 Jun 2026),
-- the Start-a-thon speaker/judge listing on Devfolio, and JITSIE's public profiles.

-- Past speakers -------------------------------------------------------------
DELETE FROM public.past_speakers;

INSERT INTO public.past_speakers (full_name, designation, organization, linkedin_url, topic, display_order) VALUES
('Prof. Ashok Jhunjhunwala', 'President', 'IITM Research Park', NULL,
 'Building a deep-tech incubation ecosystem for the BS community', 1),
('CA Paridhi Agarwal', 'Chartered Accountant & Startup Incorporation Strategist', 'Advisor to JITSIE', NULL,
 'How to Start a Start-Up? Pvt Ltd vs LLP vs OPC, registration & government recognition', 2),
('Ajay Batra', 'Founder & CEO', 'Uniqorn Growth Partners', 'https://www.linkedin.com/in/ajaybatra1/',
 'Building Startups using ChatGPT', 3),
('Pratapaditya Chakravarty', 'Global Director, Capability Development', 'HCL Technologies',
 'https://www.linkedin.com/in/paco050974/',
 'Idea to venture: mentoring the Start-a-thon Real Shark Tank pitches', 4),
('Chandan Kar', 'Head, Product Deployment', 'Wadhwani Foundation', 'https://www.linkedin.com/in/chandankar/',
 'Judging the Strater venture pitch: what investors look for', 5),
('Sunita Singh', 'Executive Vice President; Co-founder, NEN', 'Wadhwani Foundation',
 'https://www.linkedin.com/in/sunitaashoksingh/',
 'The Innovation Trinity and the entrepreneur''s mindset', 6),
('Swadeep Pillarisetti', 'Founding Partner & Managing Director; Startup Chair (India), PanIIT Alumni India',
 'Blue Ocean Venture Partners', 'https://www.linkedin.com/in/swadeep/',
 'Venture capital and the pitch: fundraising for student founders', 7),
('Kriti Soni', 'Partner Success Manager', 'Wadhwani Foundation', NULL,
 'Running a national student startup cohort', 8),
('Marcus Rein', 'Developer Relations & Success', 'Edge & Node (The Graph)', NULL,
 'Web3 infrastructure for early-stage builders', 9);

-- Flagship programmes --------------------------------------------------------
DELETE FROM public.initiatives;

INSERT INTO public.initiatives (title, description, display_order) VALUES
('START-A-THON — 48-hr Hackathon + Real Shark Tank',
 '1,596 registrations across 835 teams; 430+ idea submissions; 163 teams advanced to prototyping; prizes and incubation worth USD 50,000. Web3 and ecosystem partners included Polygon, Solana, Replit, The Graph, Filecoin, KaroStartup and the Startup Ignition Cell.', 1),
('WEN Think Startup — Wadhwani Cohort',
 '1,000+ registrations, with 525 students taken forward; four interactive sessions over six weeks; 85+ teams in idea pitching and 35+ teams in venture pitching.', 2),
('Wadhwani LiftOff — Pre-Incubation',
 '45+ startups pre-incubated through the LiftOff programme.', 3),
('JITSIE–STPI Incubation Cohort',
 '4+ startups incubated by Software Technology Parks of India (STPI), Mohali, Government of India, with in-process funding of Rs 2.5 Lakh for 2% equity, in AI/ML and IoT.', 4),
('Bengaluru Startup Bootcamp — Wadhwani & RVEI',
 'A 5-day intensive for a highly selective cohort of 30 students; ideation to MVP, investor pitching, food and stay covered, and a pitching prize of Rs 4,500.', 5),
('Building Startups using ChatGPT — Uniqorn / Ajay Batra',
 '700+ students registered and 200+ completed the 5-hour course, offered free to JITSIE members.', 6),
('JITSIE–Wadhwani IgniteX',
 'A 6-week programme delivered across cohorts of 120 + 120 students, with the Wadhwani Foundation and Blue Ocean Venture Partners.', 7),
('IGNITE Cohort — Online Bootcamp on Entrepreneurship',
 'Conceptualised and led by JITSIE with the Wadhwani Foundation across IIT Kanpur, IIT Kharagpur, IIT Guwahati and LSR (BYOB Society); 2,000+ students registered (~500 per institution), with a curriculum on Design Thinking and the Innovation Trinity taking participants from idea to plan.', 8);

-- Tenure events (June 2025 - June 2026) --------------------------------------
DELETE FROM public.events;

INSERT INTO public.events (title, date_time, location) VALUES
('World Food India — Volunteer Participation', '2025-09-15 10:00:00+05:30', 'Bharat Mandapam, New Delhi'),
('IMECE India (ASME) — Volunteer Participation', '2025-09-11 09:00:00+05:30', 'India'),
('IGNITE Cohort — Online Bootcamp on Entrepreneurship', '2025-11-01 18:00:00+05:30', 'Online, multi-institutional'),
('Orientation Session — How to Start a Start-Up?', '2026-03-15 19:00:00+05:30', 'Online (Google Meet)'),
('PAN IIT Summit 2026', '2026-05-16 09:00:00+05:30', 'Taj Yeshwantpur, Bengaluru');

-- Partners & collaborators ---------------------------------------------------
DELETE FROM public.partners;

INSERT INTO public.partners (name, category) VALUES
('Wadhwani Foundation', 'corporate'),
('PanIIT Alumni India', 'corporate'),
('Blue Ocean Venture Partners', 'vc'),
('Software Technology Parks of India (STPI)', 'corporate'),
('RVEI — Research & Venture Enterprise Incubation', 'corporate'),
('Startup Ignition Cell (SIC)', 'corporate'),
('Uniqorn Growth Partners', 'corporate'),
('KaroStartup', 'corporate'),
('Polygon Labs', 'corporate'),
('Accel', 'vc'),
('Prime Ventures', 'vc'),
('Anantya Overseas', 'vc');
