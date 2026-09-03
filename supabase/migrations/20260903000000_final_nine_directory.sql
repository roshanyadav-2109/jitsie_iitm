-- Six startups sourced and verified from JITSIE's own startup-intake
-- sheets, cross-checked against their live websites (or, where no site
-- exists, described directly from the founder's own application text).

INSERT INTO public.companies (name, slug, one_liner, description, industry, batch, website_url, logo_url) VALUES

('ScoutEdge',
 'scoutedge',
 'Sports intelligence platform turning athlete data into trusted talent decisions.',
 'ScoutEdge (EdgeSphere Sports Intelligence Pvt. Ltd.) is a sports intelligence platform that transforms athlete signals into trusted decision intelligence — "talent decisions, made on evidence."

It consolidates performances, videos, documents and assessments into structured, actionable insights for athletes, scouts, academies, teams and organisations, replacing scattered spreadsheets and files with a single evidence layer.

Currently supports cricket, football and badminton, with more sports planned.

Founded by Satyendra Kumar.',
 'Sports Tech',
 '2025',
 'https://scoutedge.in',
 'https://scoutedge.in/brand/scoutedge-logo.png'),

('AstraNex Defence',
 'astranex-defence',
 'Building India''s autonomous defence platform.',
 'AstraNex Defence is building India''s autonomous defence platform — a unified ecosystem for intelligent unmanned systems across land, air and maritime domains.

It develops modular robotic platforms and edge-AI security technologies, with a mission of building secure, interoperable systems connected through AI, mission control and a common software architecture spanning autonomous ground systems, aerial platforms and maritime unmanned systems.

Founded by Milanjyoti Ray.',
 'Defense & Robotics',
 '2025',
 'https://astranexdefence.com',
 'https://astranexdefence.com/logo.png'),

('Dhruv.AI',
 'dhruv-ai',
 'AI drone intelligence for agriculture.',
 'Dhruv.AI builds AI-powered drone intelligence for agriculture, applying computer vision and analytics to aerial farm data to help growers make better field decisions.

Founded by Kundan Raj Singh.',
 'AgriTech',
 '2025',
 'https://www.dhruvai.in',
 'https://www.dhruvai.in/assets/dhruvLogo-RIQt2T4F.png'),

('ZODOK',
 'zodok',
 'Try-before-you-buy fashion, delivered in 60 minutes.',
 'ZODOK is an online fashion retailer built around a try-before-you-buy model: order clothing, try it for 30 minutes at your door, and only pay for what you keep.

It carries its own house brand alongside partner labels including H&M, Burger Bae, SAVANA, NEWME, Urban Needs and BeyondCanvas, with delivery and trial windows built for speed — orders placed overnight are fulfilled after sunrise.',
 'Fashion & E-commerce',
 '2025',
 'https://zodok.in',
 'https://zodok.in/cdn/shop/files/ZforZodok_caab16cf-77f7-4521-933d-ff9d7cd68a89.png?v=1748021723'),

('ZANS',
 'zans',
 'Crafting tomorrow''s thinkers through play.',
 'ZANS designs educational toys built around its mission of "crafting tomorrow''s thinkers through play" — play-based products aimed at building thinking and problem-solving skills in children.',
 'EdTech & Toys',
 '2025',
 'https://www.zans.in',
 'https://www.zans.in/lovable-uploads/d53ae836-3b93-4660-b442-cff017f47c91.png'),

('Ments',
 'ments',
 'The platform where builders, designers and dreamers build the future together.',
 'Ments is a community platform that brings builders, designers and dreamers onto one place to build, share and grow projects together, under the line "build the future, together."

The community spans 4.7K+ builders, 204+ startups and 42+ posts shared on the platform.',
 'Community Platform',
 '2025',
 'https://ments.app',
 'https://ments.app/logo/black_logo.svg')

ON CONFLICT (slug) DO UPDATE SET
  one_liner = EXCLUDED.one_liner,
  description = EXCLUDED.description,
  industry = EXCLUDED.industry,
  batch = EXCLUDED.batch,
  website_url = EXCLUDED.website_url,
  logo_url = EXCLUDED.logo_url;
