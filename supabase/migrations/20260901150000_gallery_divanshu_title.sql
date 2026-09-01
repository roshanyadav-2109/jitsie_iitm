-- Correct the title: the outdoor group shot is Divanshu Kumar with founders,
-- not the JITSIE team.

UPDATE public.image_gallery
SET title = 'Divanshu Kumar with founders',
    caption = 'Co-founder & CEO, Solinas Integrity'
WHERE image_url LIKE '%team-outdoors.jpg';
