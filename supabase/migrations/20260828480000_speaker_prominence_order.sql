-- Order the speaker grid by standing rather than by the order rows happened to be
-- added: institutional leaders first, then investors and fund principals, then
-- founders by the scale of what they have built, then programme staff.

UPDATE public.past_speakers SET display_order = v.ord
FROM (VALUES
  ('Prof. Ashok Jhunjhunwala',  1),  -- Padma Shri; President, IITM Research Park
  ('Prof. Satya Chakravarthy',  2),  -- IIT Madras professor; co-founder of five deep-tech ventures
  ('Sunita Singh',              3),  -- EVP, Wadhwani Foundation; co-founder, NEN
  ('Mr. Raghuttama Rao',        4),  -- CEO, GDC, IIT Madras
  ('Manu Iyer',                 5),  -- Co-founder & Managing Partner, Bluehill.VC
  ('Swadeep Pillarisetti',      6),  -- Founding Partner & MD, Blue Ocean; Startup Chair, PanIIT India
  ('Ajay Batra',                7),  -- Founder & CEO, Uniqorn Growth Partners
  ('Divanshu Kumar',            8),  -- Co-founder & CEO, Solinas; Forbes 30 Under 30
  ('Pratapaditya Chakravarty',  9),  -- Global Director, HCL Technologies
  ('Soumalya Mukherjee',       10),  -- Co-founder & CEO, Tan90
  ('Amrutash Misra',           11),  -- Founder & CEO, CoreVoice
  ('Dr. Soumik Bhusan',        12),
  ('Chandan Kar',              13),  -- Head, Product Deployment, Wadhwani Foundation
  ('Anbu Mathi',               14),  -- Founder, Carbon6 Venture
  ('Sriharsha Nallamilli',     15),  -- Head, Strategic Partnerships, Wadhwani Foundation
  ('Sanidhya Chaturvedi',      16),  -- Co-founder & COO, Folium Sensing
  ('Kriti Soni',               17)   -- Partner Success Manager, Wadhwani Foundation
) AS v(nm, ord)
WHERE public.past_speakers.full_name = v.nm;
