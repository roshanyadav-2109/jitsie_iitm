-- LinkedIn headshots for Sriharsha Nallamilli and Ajay Batra, replacing the Drive
-- photo and the Google image-cache thumbnail respectively. Both are 800x800 crops,
-- so clear the per-person crop offsets those rows carried.
-- NOTE: signed LinkedIn CDN URLs; both tokens expire 2026-09-17.

UPDATE public.past_speakers SET
  avatar_url = 'https://media.licdn.com/dms/image/v2/D5603AQEtyUySfKJWKw/profile-displayphoto-crop_800_800/B56Z56BPX4IcAI-/0/1780163609258?e=1789603200&v=beta&t=EMdLrLzZEubAOYD2jAZb_ZDiNdRSKezMV8OvL1DjzGc',
  avatar_position = NULL
  WHERE full_name = 'Sriharsha Nallamilli';

UPDATE public.past_speakers SET
  avatar_url = 'https://media.licdn.com/dms/image/v2/D5603AQE8PsTAJ-LZWQ/profile-displayphoto-crop_800_800/B56aAmGA8HHUAI-/0/1787345509547?e=1789603200&v=beta&t=IwtF9SV6nV_gsevf_DtlD1AMx9g2E5FsPE7fLU2bOFo',
  avatar_position = NULL
  WHERE full_name = 'Ajay Batra';

UPDATE public.board_members SET
  avatar_url = 'https://media.licdn.com/dms/image/v2/D5603AQE8PsTAJ-LZWQ/profile-displayphoto-crop_800_800/B56aAmGA8HHUAI-/0/1787345509547?e=1789603200&v=beta&t=IwtF9SV6nV_gsevf_DtlD1AMx9g2E5FsPE7fLU2bOFo',
  avatar_position = NULL
  WHERE full_name = 'Ajay Batra';
