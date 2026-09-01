-- Supplied portrait for Soumalya Mukherjee. Already square (400x400), so the
-- default centre crop is correct.

UPDATE public.past_speakers SET
  avatar_url = 'https://pbs.twimg.com/profile_images/1255540752882401280/ggyFwB5d_400x400.jpg'
  WHERE full_name = 'Soumalya Mukherjee';
