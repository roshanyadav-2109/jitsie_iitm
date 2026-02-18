
-- Create initiatives table
CREATE TABLE public.initiatives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.initiatives ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public can view initiatives"
ON public.initiatives FOR SELECT
USING (true);

-- Admin write policies
CREATE POLICY "Admins can insert initiatives"
ON public.initiatives FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update initiatives"
ON public.initiatives FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete initiatives"
ON public.initiatives FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Timestamp trigger
CREATE TRIGGER update_initiatives_updated_at
BEFORE UPDATE ON public.initiatives
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed data
INSERT INTO public.initiatives (title, description, display_order) VALUES
('Startup Launchpad', 'An intensive 12-week program helping early-stage startups validate ideas and build MVPs.', 1),
('Deep-Tech Accelerator', 'Accelerating deep-tech ventures in AI, robotics, and advanced materials with industry mentorship.', 2),
('Women Founders Program', 'Empowering women entrepreneurs with resources, mentorship, and funding access.', 3);
