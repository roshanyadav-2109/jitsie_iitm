
-- Create image gallery table
CREATE TABLE public.image_gallery (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text,
  caption text,
  image_url text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.image_gallery ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public can view gallery images"
  ON public.image_gallery FOR SELECT
  USING (true);

-- Admin write
CREATE POLICY "Admins can insert gallery images"
  ON public.image_gallery FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update gallery images"
  ON public.image_gallery FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gallery images"
  ON public.image_gallery FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_image_gallery_updated_at
  BEFORE UPDATE ON public.image_gallery
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed some placeholder gallery images
INSERT INTO public.image_gallery (title, caption, image_url, display_order) VALUES
  ('Demo Day 2025', 'Startups pitching at the annual Demo Day event', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', 1),
  ('Founder Meetup', 'Monthly founder networking session at the IITM Research Park', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80', 2),
  ('Hackathon Finals', 'Teams competing in the 48-hour startup hackathon', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', 3),
  ('Investor Connect', 'VCs and angels meeting with early-stage founders', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', 4),
  ('Workshop Series', 'Product strategy workshop with industry mentors', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', 5),
  ('Campus Innovation Lab', 'The JITSIE co-working space at IIT Madras campus', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', 6);
