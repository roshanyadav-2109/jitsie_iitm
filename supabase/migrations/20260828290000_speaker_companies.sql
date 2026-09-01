-- Logos of the organisations our speakers come from, shown as a scrolling strip
-- below the speaker grid. Deliberately independent of past_speakers: the strip is
-- a decorative ribbon, not a per-card badge.

CREATE TABLE public.speaker_companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.speaker_companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view speaker companies" ON public.speaker_companies FOR SELECT USING (true);
CREATE POLICY "Admins can insert speaker companies" ON public.speaker_companies FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update speaker companies" ON public.speaker_companies FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete speaker companies" ON public.speaker_companies FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_speaker_companies_updated_at BEFORE UPDATE ON public.speaker_companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.speaker_companies (name, logo_url, website_url, display_order) VALUES
('IIT Madras Research Park', 'https://api.devfolio.co/api/miscellaneous/logo/respark.iitm.ac.in.png', 'https://respark.iitm.ac.in/', 1),
('Wadhwani Foundation', 'https://api.devfolio.co/api/miscellaneous/logo/wfglobal.org.png', 'https://wadhwanifoundation.org/', 2),
('HCL Technologies', 'https://api.devfolio.co/api/miscellaneous/logo/hcltech.com.png', 'https://www.hcltech.com/', 3),
('Blue Ocean Venture Partners', 'https://api.devfolio.co/api/miscellaneous/logo/blueoceanvp.com.png', 'https://blueoceanvp.com/', 4),
('Uniqorn Growth Partners', 'https://api.devfolio.co/api/miscellaneous/logo/uniqorn.in.png', 'https://uniqorn.in/', 5),
('Bluehill.VC', 'https://api.devfolio.co/api/miscellaneous/logo/bluehill.vc.png', 'https://bluehill.vc/', 6),
('AgniKul Cosmos', 'https://api.devfolio.co/api/miscellaneous/logo/agnikul.in.png', 'https://agnikul.in/', 7),
('Solinas Integrity', 'https://api.devfolio.co/api/miscellaneous/logo/solinas.in.png', 'https://solinas.in/', 8),
('Folium Sensing', 'https://api.devfolio.co/api/miscellaneous/logo/foliumsensing.in.png', 'https://foliumsensing.in/', 9),
('CoreVoice', 'https://api.devfolio.co/api/miscellaneous/logo/corevoice.in.png', 'https://corevoice.in/', 10),
('GDC, IIT Madras', 'https://api.devfolio.co/api/miscellaneous/logo/gdciitm.org.png', 'https://gdciitm.org/', 11);
