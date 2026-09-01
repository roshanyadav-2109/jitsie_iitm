-- Real event photography replaces the stock placeholders the gallery shipped with.
-- Sources: the two JITSIE Drive folders; nothing from the second folder's
-- 'Unofficial Media' subfolder. Files are resized to 1600px and copied into
-- Supabase Storage so the gallery does not depend on Drive link sharing.

DELETE FROM public.image_gallery WHERE image_url LIKE '%unsplash.com%';

INSERT INTO public.image_gallery (title, caption, image_url, display_order) VALUES
  ('Opening address', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_000.jpg', 1),
  ('A full house', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_003.jpg', 2),
  ('Setting the agenda', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_006.jpg', 3),
  ('From the front of the hall', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_008.jpg', 4),
  ('Every seat taken', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_010.jpg', 5),
  ('Packed auditorium', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_014.jpg', 6),
  ('At the podium', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_020.jpg', 7),
  ('The room', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_025.jpg', 8),
  ('On stage', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_026.jpg', 9),
  ('Making the point', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_033.jpg', 10),
  ('Speaking to the room', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_037.jpg', 11),
  ('The panel', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_050.jpg', 12),
  ('Panel discussion', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_052.jpg', 13),
  ('A panellist responds', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_059.jpg', 14),
  ('On the panel', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_061.jpg', 15),
  ('Fielding a question', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_065.jpg', 16),
  ('In conversation', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_067.jpg', 17),
  ('Making a case', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_070.jpg', 18),
  ('Panel and audience', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_072.jpg', 19),
  ('A lighter moment', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_074.jpg', 20),
  ('On the mic', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_078.jpg', 21),
  ('Between answers', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_086.jpg', 22),
  ('Listening in', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_088.jpg', 23),
  ('Attentive rows', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_092.jpg', 24),
  ('A question from the panel', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_099.jpg', 25),
  ('The room reacts', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_100.jpg', 26),
  ('Presenting the award', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_102.jpg', 27),
  ('Award handover', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_106.jpg', 28),
  ('Winners announced', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_110.jpg', 29),
  ('Winners on stage', NULL, 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/photos_114.jpg', 30),
  ('Keynote delivered', 'Panel Discussion, BB 2.0 — Paradox ''25', 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/official_007.jpg', 31),
  ('From the stage', 'Panel Discussion, BB 2.0 — Paradox ''25', 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/official_014.jpg', 32),
  ('Addressing the hall', 'Panel Discussion, BB 2.0 — Paradox ''25', 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/official_031.jpg', 33),
  ('Sangam on screen', 'Panel Discussion, BB 2.0 — Paradox ''25', 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/official_048.jpg', 34),
  ('The auditorium fills', 'Panel Discussion, BB 2.0 — Paradox ''25', 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/audience_002.jpg', 35),
  ('From the back row', 'Panel Discussion, BB 2.0 — Paradox ''25', 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/audience_009.jpg', 36);
