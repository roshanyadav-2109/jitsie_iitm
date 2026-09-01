-- Some logos are wordmarks that already spell the company out; repeating the name
-- beside them reads as a duplicate.

ALTER TABLE public.speaker_companies ADD COLUMN show_name BOOLEAN NOT NULL DEFAULT true;

UPDATE public.speaker_companies SET show_name = false WHERE name IN ('GalaxEye', 'The ePlane Co.');
