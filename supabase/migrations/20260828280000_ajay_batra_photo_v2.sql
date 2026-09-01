-- Replacement portrait for Ajay Batra (400x400 square, so no crop offset needed),
-- superseding the signed LinkedIn URL that expires 2026-09-17.

UPDATE public.past_speakers SET
  avatar_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWt29AFvbA4RBwRitzXn2CAaK8E-aHLb9UGGFLVyKzFxMUdvLQM210DwY&s=10',
  avatar_position = NULL
  WHERE full_name = 'Ajay Batra';

UPDATE public.board_members SET
  avatar_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWt29AFvbA4RBwRitzXn2CAaK8E-aHLb9UGGFLVyKzFxMUdvLQM210DwY&s=10',
  avatar_position = NULL
  WHERE full_name = 'Ajay Batra';
