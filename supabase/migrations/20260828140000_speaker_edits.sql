-- Supplied portrait for Prof. Jhunjhunwala, and drop Marcus Rein from the roster.

UPDATE public.past_speakers
  SET avatar_url = 'https://www.livemint.com/lm-img/img/2025/05/05/original/Ashok_1746455718254.jpg'
  WHERE full_name = 'Prof. Ashok Jhunjhunwala';

DELETE FROM public.past_speakers WHERE full_name = 'Marcus Rein';
