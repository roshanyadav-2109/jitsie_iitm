-- Supplied portrait for Sriharsha Nallamilli, served from Google Drive via the
-- lh3 direct-image endpoint at 1000px (the raw file is 5.3 MB, too heavy for a card).
-- Source is 1000x667 with the subject high and right of centre.

UPDATE public.past_speakers SET
  avatar_url = 'https://lh3.googleusercontent.com/d/1fA65CPviXuu07XF7hXSdB9dGCT2RlCMR=w1000',
  avatar_position = '70% 20%'
  WHERE full_name = 'Sriharsha Nallamilli';
