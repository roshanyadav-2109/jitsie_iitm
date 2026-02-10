
-- =============================================
-- Table: board_members
-- =============================================
CREATE TABLE public.board_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  designation text,
  bio text,
  avatar_url text,
  linkedin_url text,
  organization text,
  display_order integer DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.board_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view board members" ON public.board_members FOR SELECT USING (true);
CREATE POLICY "Admins can insert board members" ON public.board_members FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update board members" ON public.board_members FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete board members" ON public.board_members FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_board_members_updated_at BEFORE UPDATE ON public.board_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- Table: startup_advisors
-- =============================================
CREATE TABLE public.startup_advisors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  designation text,
  bio text,
  avatar_url text,
  linkedin_url text,
  organization text,
  expertise text,
  display_order integer DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.startup_advisors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view startup advisors" ON public.startup_advisors FOR SELECT USING (true);
CREATE POLICY "Admins can insert startup advisors" ON public.startup_advisors FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update startup advisors" ON public.startup_advisors FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete startup advisors" ON public.startup_advisors FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_startup_advisors_updated_at BEFORE UPDATE ON public.startup_advisors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- Seed: Board Members
-- =============================================
INSERT INTO public.board_members (full_name, designation, bio, organization, linkedin_url, display_order) VALUES
('Dr. V. Kamakoti', 'Chairperson', 'Director of IIT Madras and a distinguished computer scientist specializing in VLSI design and cybersecurity. Under his leadership, IIT Madras has strengthened its innovation ecosystem significantly.', 'IIT Madras', 'https://linkedin.com/in/kamakoti', 1),
('Prof. Ashok Jhunjhunwala', 'Board Member', 'Institute Professor at IIT Madras and a pioneer in rural telecommunications. He has been instrumental in bridging the digital divide and fostering deep-tech entrepreneurship in India.', 'IIT Madras', 'https://linkedin.com/in/ashokjhunjhunwala', 2),
('Rajan Anandan', 'Board Member', 'Managing Director at Sequoia Capital India and former VP of Google India & South-East Asia. A prolific angel investor who has backed over 100 startups across the Indian ecosystem.', 'Sequoia Capital India', 'https://linkedin.com/in/rajananandan', 3),
('Dr. Pawan Goenka', 'Independent Director', 'Former Managing Director of Mahindra & Mahindra and Chairman of ISRO''s IN-SPACe Advisory Committee. Brings deep expertise in automotive engineering and corporate governance.', 'IN-SPACe / Mahindra', 'https://linkedin.com/in/pawangoenka', 4),
('Lakshmi Narayanan', 'Trustee', 'Former Vice Chairman of Cognizant Technology Solutions. A veteran IT industry leader with extensive experience in scaling technology services businesses globally.', 'Cognizant (Retired)', 'https://linkedin.com/in/lakshminarayanan', 5),
('Vani Kola', 'Board Member', 'Founder and Managing Director of Kalaari Capital, one of India''s leading venture capital firms. Named among Fortune India''s Most Powerful Women in Business.', 'Kalaari Capital', 'https://linkedin.com/in/vanikola', 6),
('Prof. Bhaskar Ramamurthi', 'Advisor Emeritus', 'Former Director of IIT Madras (2011–2021) who oversaw the establishment of the IIT Madras Research Park and IITM Incubation Cell, laying the foundation for the JITSIE ecosystem.', 'IIT Madras (Former Director)', 'https://linkedin.com/in/bhaskarramamurthi', 7);

-- =============================================
-- Seed: Startup Advisors
-- =============================================
INSERT INTO public.startup_advisors (full_name, designation, bio, organization, linkedin_url, expertise, display_order) VALUES
('Sridhar Vembu', 'Industry Advisor', 'Founder and CEO of Zoho Corporation. A self-made billionaire who built a $1B+ SaaS empire from Chennai without external funding, championing bootstrapped entrepreneurship.', 'Zoho Corporation', 'https://linkedin.com/in/sridharvembu', 'SaaS, Product Strategy', 1),
('Kris Gopalakrishnan', 'Senior Advisor', 'Co-founder of Infosys and Chairman of Axilor Ventures. An ardent supporter of deep-tech research and startup incubation, with major contributions to brain research and AI.', 'Axilor Ventures / Infosys', 'https://linkedin.com/in/krisgopalakrishnan', 'Enterprise, Scaling', 2),
('Padmaja Ruparel', 'Mentor', 'Co-founder of Indian Angel Network and President of the Indian Private Equity & Venture Capital Association. A leading voice in early-stage funding and women-led enterprises.', 'Indian Angel Network', 'https://linkedin.com/in/padmajaruparel', 'Fundraising, Angel Investing', 3),
('Dr. Anurag Kumar', 'Technical Advisor', 'Former Director of IISc Bangalore and a leading researcher in communication networks. Advises startups on deep-tech R&D strategy and academic-industry collaboration.', 'IISc Bangalore', 'https://linkedin.com/in/anuragkumar', 'DeepTech, Networking', 4),
('Sharad Sharma', 'Ecosystem Advisor', 'Co-founder of iSPIRT Foundation and former CEO of Yahoo India R&D. A key architect of India Stack and champion of public digital goods for entrepreneurship.', 'iSPIRT Foundation', 'https://linkedin.com/in/sharadsharma', 'Policy, Digital Public Goods', 5),
('Meena Ganesh', 'Growth Advisor', 'CEO of Portea Medical and serial entrepreneur. Named among Fortune India''s Most Powerful Women, she brings deep expertise in healthcare, edtech, and scaling consumer businesses.', 'Portea Medical', 'https://linkedin.com/in/meenaganesh', 'HealthTech, EdTech, Growth', 6),
('T.V. Mohandas Pai', 'Strategic Advisor', 'Chairman of Aarin Capital and former CFO of Infosys. One of India''s most active angel investors and a vocal advocate for startup-friendly policy reforms.', 'Aarin Capital', 'https://linkedin.com/in/tvmohandaspaI', 'Finance, Policy, Investing', 7),
('Ravi Gururaj', 'Mentor', 'Serial entrepreneur and former Chairman of NASSCOM Product Council. Currently heads the Bangalore chapter of TiE and mentors startups on product-market fit and global expansion.', 'TiE Bangalore', 'https://linkedin.com/in/ravigururaj', 'Product, Go-to-Market', 8),
('Dr. Taslimarif Saiyed', 'BioTech Advisor', 'CEO and Director of C-CAMP (Centre for Cellular and Molecular Platforms). A key enabler of India''s biotech startup ecosystem with deep expertise in life sciences innovation.', 'C-CAMP', 'https://linkedin.com/in/taslimarif', 'BioTech, Life Sciences', 9),
('Naganand Doraswamy', 'Venture Advisor', 'Founder and Managing Partner of Ideaspring Capital, focused on deep-tech investments. Former CTO of multiple startups with expertise in enterprise software and IoT.', 'Ideaspring Capital', 'https://linkedin.com/in/naganand', 'Deep Tech, IoT, Enterprise', 10);
