-- START-A-THON: the detail that previously lived behind the outbound Devfolio link,
-- extracted onto the page itself. Dates, structure, prize breakdown and terms are
-- from that listing.

UPDATE public.initiatives SET
  overview = 'START-A-THON is JITSIE''s flagship competition and, in the organisers'' words, India''s first-of-its-kind hackathon where participants pitch to angel investors who fund ideas with real money in exchange for equity. The tagline was "Come with ideas, leave with funded startups." It was run with the Startup Ignition Cell (RVEI) and the Wadhwani Foundation, opening with a month of expert sessions on generating and validating ideas before any building started.',
  description = 'Four stages, run back to back:

1. Registration & Ideation — participants register, complete a profile and submit an idea. Entries are split into a normal track and a Web3 track. Across roughly a month, industry experts run talks and mentoring on generating and validating ideas, with pre-incubation support.

2. Building (Prototyping) — a 48-hour online hackathon in which teams build a prototype or MVP of the idea they submitted. Judges assess both idea and prototype.

3. Mock Pitch — selected teams pitch to a jury, online or offline, and explain their revenue and impact model. Scalable ideas go through to the finale.

4. Grand Finale — held offline in Bengaluru. Finalists pitch their MVPs to angel investors, who may invest for equity, and can raise pre-seed or seed funding alongside cash prizes and incubation offers.

Teams of 1 to 3. Any problem statement was allowed, with suggested domains spanning sustainability, smart cities, agri-tech, health-tech, fintech, AI/ML, AR/VR, Web3, e-commerce and social impact.

Terms the organisers stated up front: angels invest only if they choose to, so reaching the finale did not guarantee funding, and ideas turned into startups through the programme were required to give up to 7% equity to the organisers.',
  format = 'Ideation → 48-hour build → mock pitch → offline Grand Finale before angel investors',
  cadence = 'Flagship competition — run as a single large edition to date',
  held = '13–17 August 2023 · Grand Finale in Bengaluru',
  mode = 'Ideation and build online; mock pitch hybrid; finale in person in Bengaluru',
  eligibility = 'Open registration, teams of 1 to 3, no restriction on problem domain',
  partners = 'Wadhwani Foundation · Startup Ignition Cell (RVEI) · KaroStartup · Devfolio · Polygon · Solana · Replit · The Graph · Filecoin',
  outcomes = '1,596 registrations across 835 teams
430+ idea submissions
163 teams advanced to prototyping
USD 50,000 in prizes and incubation overall
Cash prizes of Rs 12,500 (winner), Rs 7,500 (first runner-up) and Rs 5,000 (second runner-up), on top of any angel investment
Sponsor bounties including Rs 20,000 from Filecoin for best use of IPFS/Filecoin, plus Polygon''s Ethereum track
Judged by Pratapaditya Chakravarty (HCL), Ajay Batra (Uniqorn), Chandan Kar and Kriti Soni (Wadhwani Foundation) and Marcus Rein (Edge & Node)',
  link = NULL
  WHERE title LIKE 'START-A-THON%';
