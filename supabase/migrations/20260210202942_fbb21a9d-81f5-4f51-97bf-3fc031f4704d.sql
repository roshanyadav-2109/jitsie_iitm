
-- Seed Companies
INSERT INTO public.companies (name, slug, one_liner, description, batch, industry, status, website_url) VALUES
('NeuralForge AI', 'neuralforge-ai', 'Enterprise AI copilots for manufacturing', 'NeuralForge builds AI copilots that help manufacturing teams reduce defects by 40%. Our platform integrates with existing MES systems and provides real-time quality predictions using computer vision and sensor fusion.', 'W24', 'AI/ML', 'active', 'https://neuralforge.ai'),
('PayStack India', 'paystack-india', 'Unified payments infrastructure for Indian SMBs', 'PayStack India provides a single API for accepting payments across UPI, cards, net banking, and wallets. Built specifically for the Indian market with GST-compliant invoicing built in.', 'S23', 'Fintech', 'active', 'https://paystack.in'),
('MediScan', 'mediscan', 'AI-powered radiology diagnostics', 'MediScan uses deep learning to assist radiologists in detecting abnormalities in X-rays and CT scans with 98.5% accuracy. Already deployed in 15 hospitals across South India.', 'W23', 'Healthcare', 'active', 'https://mediscan.health'),
('GreenGrid Energy', 'greengrid-energy', 'Smart grid optimization for renewable energy', 'GreenGrid helps utility companies optimize their renewable energy distribution using predictive analytics and IoT sensors. Reducing energy waste by up to 30%.', 'S24', 'CleanTech', 'active', 'https://greengrid.energy'),
('EduNex', 'edunex', 'Personalized learning paths for K-12 students', 'EduNex uses adaptive learning algorithms to create personalized curricula for students. Our platform serves 50,000+ students across 200 schools in Tamil Nadu.', 'W24', 'EdTech', 'active', 'https://edunex.io'),
('CloudKart', 'cloudkart', 'B2B e-commerce for industrial supplies', 'CloudKart is building the Amazon Business for India — a marketplace connecting manufacturers directly with industrial buyers, eliminating middlemen and reducing procurement costs by 25%.', 'S22', 'SaaS', 'active', 'https://cloudkart.com'),
('BioSynth Labs', 'biosynth-labs', 'Synthetic biology for sustainable materials', 'BioSynth engineers microorganisms to produce sustainable alternatives to petroleum-based materials. Our first product — bio-based packaging — decomposes in 90 days.', 'W23', 'DeepTech', 'active', 'https://biosynth.labs'),
('FinLedger', 'finledger', 'Blockchain-based trade finance platform', 'FinLedger digitizes letters of credit and trade finance documents using distributed ledger technology, reducing settlement times from weeks to hours.', 'S23', 'Fintech', 'acquired', 'https://finledger.io'),
('AgriSense', 'agrisense', 'Precision agriculture using satellite imagery', 'AgriSense combines satellite data with ground sensors to give farmers real-time crop health insights. Helping 10,000+ farmers increase yields by 20%.', 'W22', 'DeepTech', 'active', 'https://agrisense.farm'),
('RoboFleet', 'robofleet', 'Autonomous last-mile delivery robots', 'RoboFleet builds sidewalk delivery robots for urban areas. Our fleet has completed 50,000+ deliveries across IIT Madras campus and Chennai city.', 'S24', 'AI/ML', 'active', 'https://robofleet.tech');

-- Seed Jobs (referencing companies by subquery)
INSERT INTO public.jobs (company_id, title, location, salary_range, type, category, apply_link) VALUES
((SELECT id FROM companies WHERE slug='neuralforge-ai'), 'Senior ML Engineer', 'Chennai, India', '₹25-40 LPA', 'full_time', 'Engineering', 'https://neuralforge.ai/careers'),
((SELECT id FROM companies WHERE slug='neuralforge-ai'), 'ML Research Intern', 'Chennai, India', '₹40K/month', 'intern', 'Engineering', 'https://neuralforge.ai/careers'),
((SELECT id FROM companies WHERE slug='paystack-india'), 'Backend Engineer (Go)', 'Bangalore, India', '₹20-35 LPA', 'full_time', 'Engineering', 'https://paystack.in/jobs'),
((SELECT id FROM companies WHERE slug='paystack-india'), 'Product Manager', 'Bangalore, India', '₹30-45 LPA', 'full_time', 'Operations', 'https://paystack.in/jobs'),
((SELECT id FROM companies WHERE slug='mediscan'), 'Full Stack Developer', 'Chennai, India', '₹18-28 LPA', 'full_time', 'Engineering', 'https://mediscan.health/careers'),
((SELECT id FROM companies WHERE slug='greengrid-energy'), 'IoT Engineer', 'Hyderabad, India', '₹15-25 LPA', 'full_time', 'Engineering', 'https://greengrid.energy/careers'),
((SELECT id FROM companies WHERE slug='edunex'), 'Frontend Developer (React)', 'Remote', '₹12-20 LPA', 'full_time', 'Engineering', 'https://edunex.io/jobs'),
((SELECT id FROM companies WHERE slug='edunex'), 'Content & Sales Lead', 'Chennai, India', '₹10-18 LPA', 'full_time', 'Sales', 'https://edunex.io/jobs'),
((SELECT id FROM companies WHERE slug='cloudkart'), 'Growth Marketing Manager', 'Mumbai, India', '₹18-30 LPA', 'full_time', 'Marketing', 'https://cloudkart.com/careers'),
((SELECT id FROM companies WHERE slug='robofleet'), 'Robotics Software Intern', 'Chennai, India', '₹35K/month', 'intern', 'Engineering', 'https://robofleet.tech/intern'),
((SELECT id FROM companies WHERE slug='robofleet'), 'Embedded Systems Engineer', 'Chennai, India', '₹20-32 LPA', 'full_time', 'Engineering', 'https://robofleet.tech/careers'),
((SELECT id FROM companies WHERE slug='agrisense'), 'Data Scientist', 'Remote', '₹22-35 LPA', 'full_time', 'Engineering', 'https://agrisense.farm/careers'),
((SELECT id FROM companies WHERE slug='biosynth-labs'), 'Bioprocess Engineer', 'Chennai, India', '₹18-28 LPA', 'full_time', 'Engineering', 'https://biosynth.labs/jobs'),
((SELECT id FROM companies WHERE slug='finledger'), 'Blockchain Developer', 'Bangalore, India', '₹25-40 LPA', 'full_time', 'Engineering', 'https://finledger.io/careers');

-- Seed Events
INSERT INTO public.events (title, date_time, location, registration_link) VALUES
('Demo Day Spring 2026', '2026-03-15T10:00:00+05:30', 'IIT Madras Research Park, Chennai', 'https://jitsie.iitm.ac.in/demo-day'),
('Founder Fireside: Scaling B2B SaaS in India', '2026-02-28T18:00:00+05:30', 'IC&SR Auditorium, IIT Madras', 'https://jitsie.iitm.ac.in/fireside'),
('AI in Healthcare Workshop', '2026-03-05T09:00:00+05:30', 'Department of CSE, IIT Madras', 'https://jitsie.iitm.ac.in/ai-health'),
('Investor Connect: Meet Top VCs', '2026-04-10T14:00:00+05:30', 'IIT Madras Research Park, Chennai', 'https://jitsie.iitm.ac.in/investor-connect'),
('Startup Weekend Chennai', '2026-03-22T09:00:00+05:30', 'IITM Research Park, Chennai', 'https://jitsie.iitm.ac.in/startup-weekend'),
('DeepTech Symposium 2026', '2026-05-01T10:00:00+05:30', 'NAC Auditorium, IIT Madras', 'https://jitsie.iitm.ac.in/deeptech');

-- Seed Partners
INSERT INTO public.partners (name, category) VALUES
('Sequoia Capital India', 'vc'),
('Accel Partners', 'vc'),
('Kalaari Capital', 'vc'),
('Indian Angel Network', 'vc'),
('Tata Group', 'corporate'),
('Infosys', 'corporate'),
('Google for Startups', 'corporate'),
('Microsoft for Startups', 'corporate');

-- Seed Articles
INSERT INTO public.articles (title, slug, content, author, published_at) VALUES
('Why IIT Madras is Becoming India''s Stanford', 'iitm-india-stanford', 'The transformation of IIT Madras from a purely academic institution to a thriving startup ecosystem has been nothing short of remarkable. Over the past decade, the university has produced more funded startups than any other Indian institution.

The IIT Madras Research Park, established in 2010, was the first university-based research park in India. Today it houses over 200 companies and has become the nucleus of Chennai''s growing tech ecosystem.

What makes IIT Madras unique is its deep-tech DNA. While other startup hubs focus on consumer internet companies, the startups emerging from IITM are solving fundamental problems in AI, robotics, clean energy, and biotechnology.

The numbers speak for themselves: alumni-founded companies have raised over $2.4 billion in funding, and the ecosystem continues to grow at an accelerating pace.

"We''re not trying to be the next Silicon Valley," says one founder. "We''re building something distinctly Indian — solutions rooted in our unique challenges and opportunities."', 'JITSIE Editorial', '2026-01-15T10:00:00+05:30'),

('The Art of the Cold Email: A Founder''s Guide', 'cold-email-founders-guide', 'Every great partnership starts with an introduction. For first-time founders without a network, that introduction often takes the form of a cold email. Here''s what we''ve learned from reviewing thousands of outreach attempts.

**Subject Line Matters**
Your subject line is everything. Keep it under 6 words. Make it specific. "Quick question about your Series A thesis" beats "Partnership opportunity" every time.

**The 3-Sentence Rule**
1. Who you are (one sentence)
2. What you''ve built and your traction (one sentence)
3. A specific, low-commitment ask (one sentence)

**Timing**
Tuesday through Thursday, 8-10 AM in the recipient''s timezone. Never on Monday mornings or Friday afternoons.

**Follow Up**
One follow-up after 5 business days. Never more than two total. Persistence is good; pestering is not.

The best cold emails we''ve seen share one quality: they demonstrate that the sender has done their homework. Reference a specific investment, blog post, or talk. Show that this email could only have been written to this person.', 'Arjun Mehta', '2026-01-28T10:00:00+05:30'),

('Lessons from 10 Failed Startups', 'lessons-failed-startups', 'Failure is the most underrated teacher in entrepreneurship. We interviewed 10 founders whose startups didn''t make it, and the patterns were striking.

**1. Solution in Search of a Problem**
Seven out of ten admitted they built something they found technically interesting rather than something customers desperately needed.

**2. Premature Scaling**
Hiring too fast before finding product-market fit was the second most common mistake. One founder went from 3 to 30 employees in 6 months — and back to 3 within a year.

**3. Co-founder Conflicts**
Three teams broke up over equity disputes that should have been settled on day one. Use a vesting schedule. Always.

**4. Ignoring Unit Economics**
"We''ll figure out monetization later" is a strategy that works for approximately 0.1% of companies. You are probably not in that 0.1%.

**5. Not Talking to Users**
The founders who succeeded on their second attempt all said the same thing: "This time, I talked to 100 customers before writing a single line of code."

Failure isn''t the opposite of success — it''s a prerequisite.', 'Priya Sharma', '2026-02-05T10:00:00+05:30'),

('How to Pitch to Indian VCs in 2026', 'pitch-indian-vcs-2026', 'The Indian venture capital landscape has matured significantly. Here''s what top VCs are looking for this year.

**Revenue Over Growth**
The era of "growth at all costs" is over. Indian VCs now want to see a clear path to profitability, ideally with existing revenue. Even early-stage investors want unit economics that make sense.

**India-First, Global-Ready**
Build for India first, but show how your solution can expand to Southeast Asia, the Middle East, or Africa. The "India stack" — UPI, Aadhaar, ONDC — gives Indian startups unique advantages.

**Deep Tech Premium**
There''s a clear premium for startups with genuine technical moats. AI wrappers around GPT are out; companies with proprietary models, unique datasets, or novel algorithms are in.

**The 10-Slide Deck**
1. Problem (with data)
2. Solution (with demo)
3. Market size (TAM/SAM/SOM)
4. Business model
5. Traction
6. Competition
7. Team
8. Go-to-market
9. Financials
10. The Ask', 'JITSIE Editorial', '2026-02-08T10:00:00+05:30');

-- Seed News Updates
INSERT INTO public.news_updates (text, link, created_at) VALUES
('NeuralForge AI raises $12M Series A led by Sequoia Capital India', 'https://neuralforge.ai/blog/series-a', '2026-02-10T09:00:00+05:30'),
('Demo Day Spring 2026 applications now open — deadline March 1', 'https://jitsie.iitm.ac.in/demo-day', '2026-02-09T10:00:00+05:30'),
('RoboFleet completes 50,000th autonomous delivery on IIT Madras campus', NULL, '2026-02-08T14:00:00+05:30'),
('EduNex partners with Tamil Nadu government to deploy in 200 government schools', 'https://edunex.io/blog/tn-partnership', '2026-02-07T11:00:00+05:30'),
('MediScan receives CDSCO approval for AI-assisted diagnostic tool', NULL, '2026-02-06T09:30:00+05:30'),
('JITSIE portfolio companies collectively valued at $2.4 billion', NULL, '2026-02-05T16:00:00+05:30'),
('Founder Fireside with PayStack India CEO — Feb 28 at IC&SR Auditorium', 'https://jitsie.iitm.ac.in/fireside', '2026-02-04T12:00:00+05:30'),
('AgriSense wins Best DeepTech Startup at TechSparks 2026', 'https://agrisense.farm/awards', '2026-02-03T10:00:00+05:30'),
('CloudKart raises $8M to expand B2B marketplace across South India', 'https://cloudkart.com/blog/funding', '2026-02-02T09:00:00+05:30'),
('GreenGrid Energy pilot reduces energy waste by 32% at Tamil Nadu Solar Park', NULL, '2026-02-01T14:00:00+05:30'),
('BioSynth Labs partners with Tata Group for sustainable packaging R&D', 'https://biosynth.labs/news', '2026-01-30T10:00:00+05:30'),
('FinLedger acquired by HDFC Bank for undisclosed amount', 'https://finledger.io/acquisition', '2026-01-28T09:00:00+05:30');
