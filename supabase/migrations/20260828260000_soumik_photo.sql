-- Supplied portrait for Dr. Soumik Bhusan (800x800, already square).
-- NOTE: this is a signed LinkedIn CDN URL whose token expires 2026-09-17. Once it
-- lapses the card falls back to an initials tile and the URL must be refreshed.

UPDATE public.past_speakers SET
  avatar_url = 'https://media.licdn.com/dms/image/v2/D5603AQECe8HGg-PCLg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718843095163?e=1789603200&v=beta&t=-i7s7WhvMsgj9XDRYfawRqEegwJ-2CJSVWfRCHLnbyk'
  WHERE full_name = 'Dr. Soumik Bhusan';
