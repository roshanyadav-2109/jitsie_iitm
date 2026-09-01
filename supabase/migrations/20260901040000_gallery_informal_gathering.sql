-- One more frame: students gathered around the tables away from the auditorium.
-- Source is a LinkedIn feedshare URL with an expiry, so the file is copied into
-- Supabase Storage rather than hotlinked.

INSERT INTO public.image_gallery (title, caption, image_url, display_order) VALUES
('Around the tables',
 'An informal gathering',
 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/gallery/informal-gathering.jpg', 23);
