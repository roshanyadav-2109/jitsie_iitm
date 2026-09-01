-- Supplied portrait for Ajay Batra, on both the speaker roster and the directors board.

UPDATE public.past_speakers
  SET avatar_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvU8r0TVcCNVw-1TOrpOIegJlngVgWFCge8zVgmclOgf90MpzKljevMIk&s=10'
  WHERE full_name = 'Ajay Batra';

UPDATE public.board_members
  SET avatar_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvU8r0TVcCNVw-1TOrpOIegJlngVgWFCge8zVgmclOgf90MpzKljevMIk&s=10'
  WHERE full_name = 'Ajay Batra';
