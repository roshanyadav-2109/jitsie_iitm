-- Supplied portrait for Prof. Satya Chakravarthy (IEEE VTS speaker photo), replacing
-- the 111x126 department thumbnail. Source is 760x950, so bias the square crop
-- upward to keep the face centred.

UPDATE public.past_speakers SET
  avatar_url = 'https://vtsociety.org/files/ieeevts/styles/responsive_4_5_760w/public/images/contacts/9.%20Speaker%20Photo%20%28JPEG%29%20%282%29.jpg?itok=flK5MYKY',
  avatar_position = 'center 20%'
  WHERE full_name = 'Prof. Satya Chakravarthy';
