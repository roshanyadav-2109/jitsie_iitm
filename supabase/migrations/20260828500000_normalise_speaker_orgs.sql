-- Align two organisation strings with the names that carry logos, so the speaker
-- cards resolve the right mark instead of falling back to text or to the parent
-- institute's crest.

UPDATE public.past_speakers SET organization = 'IIT Madras Research Park'
  WHERE full_name = 'Prof. Ashok Jhunjhunwala';

UPDATE public.past_speakers SET organization = 'GDC, IIT Madras'
  WHERE full_name = 'Mr. Raghuttama Rao';
