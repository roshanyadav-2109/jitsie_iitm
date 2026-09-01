-- Per-person crop control for portraits. Photos come in at varied aspect ratios,
-- and the square cards use object-cover, so a subject who sits off-centre in the
-- source gets clipped. NULL keeps the default centre crop.

ALTER TABLE public.past_speakers ADD COLUMN avatar_position TEXT;
ALTER TABLE public.board_members ADD COLUMN avatar_position TEXT;

-- Ajay Batra's portrait is 547x365 with the subject left of centre.
UPDATE public.past_speakers SET avatar_position = '30% center' WHERE full_name = 'Ajay Batra';
UPDATE public.board_members SET avatar_position = '30% center' WHERE full_name = 'Ajay Batra';
