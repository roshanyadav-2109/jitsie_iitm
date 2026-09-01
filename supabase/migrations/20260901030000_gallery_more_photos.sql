-- Four more gallery frames: the deep-tech keynote and its panel, and the
-- 'Creating Startup Corridors' panel. The three LinkedIn sources carry expiring
-- media URLs, so the files are copied into Supabase Storage rather than hotlinked.

INSERT INTO public.image_gallery (title, caption, image_url, display_order) VALUES
('Building deep-tech startups from campus',
 'Swadeep Pillarisetti, Blue Ocean Venture Partners',
 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/keynote-deeptech-from-campus.jpg', 19),
('Building a deeptech startup while in college',
 'Panel discussion',
 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/panel-deeptech-in-college.jpg', 20),
('Creating startup corridors for student-led innovation',
 'Panel discussion',
 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/panel-startup-corridors.jpg', 21),
('A full house for the panel',
 'T.T. Jagannathan Auditorium',
 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/startup-corridors-full-hall.jpg', 22);
