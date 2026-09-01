-- Prune the gallery: drop the shots called out by name, the repeated
-- rows-of-empty-seats views of the hall, and the extra frames of a speaker who
-- already appears. One image per person per moment; renumber what is left.

DELETE FROM public.image_gallery
WHERE right(image_url, position('/' in reverse(image_url)) - 1) IN (
  'photos_006.jpg',
  'photos_020.jpg',
  'photos_010.jpg',
  'photos_110.jpg',
  'photos_114.jpg',
  'photos_008.jpg',
  'photos_014.jpg',
  'photos_025.jpg',
  'audience_002.jpg',
  'photos_033.jpg',
  'photos_037.jpg',
  'photos_078.jpg',
  'photos_061.jpg',
  'photos_074.jpg',
  'photos_070.jpg',
  'photos_099.jpg',
  'photos_106.jpg',
  'photos_072.jpg'
);

WITH renumbered AS (
  SELECT id, row_number() OVER (ORDER BY display_order) AS n
  FROM public.image_gallery
)
UPDATE public.image_gallery g
SET display_order = r.n
FROM renumbered r
WHERE g.id = r.id;
