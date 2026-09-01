-- A speaker can be tied to several companies (Prof. Chakravarthy has five), and
-- fuzzy matching on the free-text organisation field was picking wrong marks --
-- his "IIT Madras" was resolving to "GDC, IIT Madras" once the IITM logos went.
-- So name the companies explicitly and look them up by exact name.

ALTER TABLE public.past_speakers ADD COLUMN IF NOT EXISTS companies TEXT;

UPDATE public.past_speakers SET companies = v.list
FROM (VALUES
  ('Prof. Satya Chakravarthy', 'AgniKul Cosmos · GalaxEye · TuTr Hyperloop · The ePlane Co.'),
  ('Sunita Singh',             'Wadhwani Foundation'),
  ('Mr. Raghuttama Rao',       'GDC, IIT Madras'),
  ('Manu Iyer',                'Bluehill.VC'),
  ('Swadeep Pillarisetti',     'Blue Ocean Venture Partners'),
  ('Ajay Batra',               'Uniqorn Growth Partners'),
  ('Divanshu Kumar',           'Solinas Integrity'),
  ('Pratapaditya Chakravarty', 'HCL Technologies'),
  ('Soumalya Mukherjee',       'Tan90 Thermal Solutions'),
  ('Amrutash Misra',           'CoreVoice'),
  ('Chandan Kar',              'Wadhwani Foundation'),
  ('Anbu Mathi',               'Carbon6 Venture'),
  ('Sriharsha Nallamilli',     'Wadhwani Foundation'),
  ('Sanidhya Chaturvedi',      'Folium Sensing'),
  ('Kriti Soni',               'Wadhwani Foundation')
) AS v(nm, list)
WHERE public.past_speakers.full_name = v.nm;
