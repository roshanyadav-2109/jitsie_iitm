-- Supplied portrait for Anbu Mathi. Source is 679x452 landscape with the subject
-- high and slightly right of centre, so shift the square crop to match.

UPDATE public.past_speakers SET
  avatar_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToGyrQDPeBDr3lHVkAMMa8_dWjyBD5ieTFtOse8U9W3D4Z90OsZj5ocgE&s=10',
  avatar_position = '55% 25%'
  WHERE full_name = 'Anbu Mathi';
