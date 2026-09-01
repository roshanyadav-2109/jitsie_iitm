-- More portraits, and a clean display order.
-- Amrutash Misra: CoreVoice's own team page. Prof. Chakravarthy: the IIT Madras
-- Aerospace Engineering department faculty photo (low resolution at source).
-- Manu Iyer: supplied URL, replacing The Chennai Angels image.

UPDATE public.past_speakers SET avatar_url = 'https://corevoice.in/assets/team/Amrut.jpeg'
  WHERE full_name = 'Amrutash Misra';

UPDATE public.past_speakers SET avatar_url = 'https://ae.iitm.ac.in/images/people/faculty/S.R.Chakravarthy.webp'
  WHERE full_name = 'Prof. Satya Chakravarthy';

UPDATE public.past_speakers SET avatar_url = 'https://s3.ap-south-1.amazonaws.com/assets.ynos.in/investor-profile-photos/I_900954.jpg'
  WHERE full_name = 'Manu Iyer';

-- Earlier inserts reused display_order 8, leaving two rows tied. Renumber by the
-- intended sequence so the grid is stable.
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY display_order, created_at) AS rn
  FROM public.past_speakers
)
UPDATE public.past_speakers p SET display_order = o.rn
FROM ordered o WHERE p.id = o.id;
