-- Supplied portrait for Mr. Raghuttama Rao, replacing the GDC team-page headshot.
-- Source is 490x625; the subject sits high in the frame, so bias the square crop up.

UPDATE public.past_speakers SET
  avatar_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3xXPZ5JuGUDupyuBuXNTGQ9uwxxZvEXthzrUPEBj-2w&s=10',
  avatar_position = 'center 15%'
  WHERE full_name = 'Mr. Raghuttama Rao';
