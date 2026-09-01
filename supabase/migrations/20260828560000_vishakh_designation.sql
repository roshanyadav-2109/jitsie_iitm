-- Drop the Neural AI line from Vishakh Agarwal's designation.

UPDATE public.executive_board
  SET designation = 'Co Founder Karo Startup Pvt Ltd, SWE Hewlett Packard Enterprise'
  WHERE full_name = 'Vishakh Agarwal';
