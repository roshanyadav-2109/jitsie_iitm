
-- Create past_speakers table
CREATE TABLE public.past_speakers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  designation TEXT,
  organization TEXT,
  avatar_url TEXT,
  linkedin_url TEXT,
  topic TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.past_speakers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view past speakers" ON public.past_speakers FOR SELECT USING (true);
CREATE POLICY "Admins can insert past speakers" ON public.past_speakers FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update past speakers" ON public.past_speakers FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete past speakers" ON public.past_speakers FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_past_speakers_updated_at BEFORE UPDATE ON public.past_speakers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed data
INSERT INTO public.past_speakers (full_name, designation, organization, topic, display_order) VALUES
('Dr. Anand Kumar', 'Professor', 'IIT Madras', 'Deep Tech Innovation in India', 1),
('Priya Sharma', 'Managing Partner', 'Sequoia Capital India', 'Scaling Startups from 0 to 1', 2),
('Rajesh Nair', 'CEO', 'TechVentures', 'Building Resilient Founding Teams', 3),
('Dr. Meena Iyer', 'Director', 'IITM Research Park', 'University-Industry Collaboration', 4),
('Vikram Patel', 'Founder', 'CloudNine Solutions', 'Product-Market Fit Strategies', 5),
('Sunita Reddy', 'Partner', 'Accel Partners', 'Fundraising in Emerging Markets', 6),
('Amit Deshmukh', 'CTO', 'DataBridge Analytics', 'AI-First Company Building', 7),
('Kavitha Menon', 'VP Engineering', 'Flipkart', 'Engineering at Scale', 8);
