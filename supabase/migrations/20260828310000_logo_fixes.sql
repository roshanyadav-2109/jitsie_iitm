-- The domain-logo service returned the IIT Madras institute crest for
-- respark.iitm.ac.in; use the Research Park's own wordmark instead. GDC logo
-- likewise switched to the one served from their site.

UPDATE public.speaker_companies
  SET logo_url = 'https://respark.iitm.ac.in/img/iitmrp-logo.png'
  WHERE name = 'IIT Madras Research Park';

UPDATE public.speaker_companies
  SET logo_url = 'https://gdciitm.org/wp-content/uploads/2021/07/gdc-logo-3.png'
  WHERE name = 'GDC, IIT Madras';
