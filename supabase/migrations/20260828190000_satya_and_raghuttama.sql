-- Corrected venture list for Prof. Satya Chakravarthy, and add Mr. Raghuttama Rao.

UPDATE public.past_speakers SET
  designation = 'Co-Founder of AgniKul Cosmos, GalaxEye, TuTr Hyperloop, The ePlane Company and X2Fuels; Professor at IIT Madras',
  organization = 'IIT Madras'
  WHERE full_name = 'Prof. Satya Chakravarthy';

INSERT INTO public.past_speakers (full_name, designation, organization, avatar_url, display_order) VALUES
('Mr. Raghuttama Rao', 'CEO',
 'Gopalakrishnan Deshpande Centre for Innovation and Entrepreneurship (GDC), IIT Madras',
 'https://gdciitm.org/wp-content/uploads/2025/01/Mr.-Raghuttama-Rao.webp', 17);
