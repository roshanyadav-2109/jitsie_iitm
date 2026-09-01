-- Speaker photographs and LinkedIn profiles.
-- Photos for the Start-a-thon judging panel come from JITSIE's own event page on
-- Devfolio (assets.devfolio.co); Prof. Jhunjhunwala's is the Government of India
-- portrait on Wikimedia Commons (GODL-India). Every URL was checked to return an
-- image before being written here. LinkedIn does not permit hotlinking profile
-- photos, and its media URLs are signed and expire, so none are used.

UPDATE public.past_speakers SET avatar_url =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Dr._Ashok_Jhunjhunwala%2C_Advisor_to_the_Minister_of_State_for_Power%2C_Coal%2C_New_and_Renewable_Energy_and_Mines_%28Independent_Charge%29%2C_Shri_Piyush_Goyal.jpg/960px-Dr._Ashok_Jhunjhunwala%2C_Advisor_to_the_Minister_of_State_for_Power%2C_Coal%2C_New_and_Renewable_Energy_and_Mines_%28Independent_Charge%29%2C_Shri_Piyush_Goyal.jpg'
  WHERE full_name = 'Prof. Ashok Jhunjhunwala';

UPDATE public.past_speakers SET avatar_url =
  'https://assets.devfolio.co/hackathons/63ea40fa85b84a9d8b4e8ae1e2d5e5ca/judges/775267190c624f50848cc703643d57d3/183.jpeg'
  WHERE full_name = 'Ajay Batra';

UPDATE public.past_speakers SET avatar_url =
  'https://assets.devfolio.co/hackathons/63ea40fa85b84a9d8b4e8ae1e2d5e5ca/judges/c076ae2b82b94cc8834e61e467bde407/143.jpeg'
  WHERE full_name = 'Pratapaditya Chakravarty';

UPDATE public.past_speakers SET avatar_url =
  'https://assets.devfolio.co/hackathons/63ea40fa85b84a9d8b4e8ae1e2d5e5ca/judges/c215465045764597b2fe7998491d2439/374.jpeg'
  WHERE full_name = 'Chandan Kar';

UPDATE public.past_speakers SET
  avatar_url = 'https://assets.devfolio.co/hackathons/63ea40fa85b84a9d8b4e8ae1e2d5e5ca/judges/a3b77ecb44744b11940ed284254198fd/249.jpeg',
  linkedin_url = 'https://www.linkedin.com/in/kritisoni19/'
  WHERE full_name = 'Kriti Soni';

UPDATE public.past_speakers SET
  avatar_url = 'https://assets.devfolio.co/hackathons/63ea40fa85b84a9d8b4e8ae1e2d5e5ca/judges/0f35af092989404c8e2ae33b4183ba17/104.jpeg',
  linkedin_url = 'https://www.linkedin.com/in/marcusrein'
  WHERE full_name = 'Marcus Rein';

-- Reuse the portraits already carried on the directors board for the two members
-- who also spoke.
UPDATE public.past_speakers SET avatar_url = 'https://etimg.etb2bimg.com/photo/79300265.cms'
  WHERE full_name = 'Sunita Singh';

UPDATE public.past_speakers SET avatar_url =
  'https://static.wixstatic.com/media/eb5a89_89080abe2222430c91afa66022619fe2~mv2.jpeg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/swadeep%20-%20stage.jpeg'
  WHERE full_name = 'Swadeep Pillarisetti';

-- The board carried Ajay Batra on a Google image-search thumbnail, which is an
-- unstable cache URL; point it at the same Devfolio asset.
UPDATE public.board_members SET avatar_url =
  'https://assets.devfolio.co/hackathons/63ea40fa85b84a9d8b4e8ae1e2d5e5ca/judges/775267190c624f50848cc703643d57d3/183.jpeg'
  WHERE full_name = 'Ajay Batra';

-- CA Paridhi Agarwal has no photograph on a public, reusable source; the card
-- falls back to an initials tile.
