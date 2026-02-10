
-- Create startup_openings table
CREATE TABLE public.startup_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_name text NOT NULL,
  startup_slug text,
  role_title text NOT NULL,
  description text,
  sector text,
  stage text,
  location text,
  stipend_salary text,
  type text NOT NULL DEFAULT 'intern',
  apply_link text,
  is_active boolean NOT NULL DEFAULT true,
  posted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.startup_openings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view startup openings" ON public.startup_openings FOR SELECT USING (true);
CREATE POLICY "Admins can insert startup openings" ON public.startup_openings FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update startup openings" ON public.startup_openings FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete startup openings" ON public.startup_openings FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_startup_openings_updated_at
  BEFORE UPDATE ON public.startup_openings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed ~24 startup openings from JITSIE report ecosystem
INSERT INTO public.startup_openings (startup_name, startup_slug, role_title, description, sector, stage, location, stipend_salary, type, apply_link) VALUES
('AgniKul Cosmos', 'agnikul-cosmos', 'Propulsion Engineer Intern', 'Work on 3D-printed rocket engine components and test propulsion systems for small satellite launch vehicles.', 'SpaceTech', 'Pre-Seed', 'Chennai', '₹25,000/mo', 'intern', 'https://agnikul.in/careers'),
('NeuralForge AI', 'neuralforge-ai', 'ML Research Intern', 'Build and fine-tune LLMs for enterprise use-cases. Work with transformers, RAG pipelines, and evaluation frameworks.', 'AI/ML', 'Seed', 'Remote', '₹30,000/mo', 'intern', NULL),
('GreenGrid Energy', 'greengrid-energy', 'Frontend Developer', 'Build dashboards for solar and wind energy monitoring using React and D3.js.', 'CleanTech', 'Seed', 'Bangalore', '₹6-9 LPA', 'full_time', NULL),
('EduNex', 'edunex', 'Content Strategist', 'Design curriculum and create engaging content for K-12 STEM learning platform.', 'EdTech', 'Pre-Seed', 'Remote', '₹15,000/mo', 'intern', NULL),
('BioSynth Labs', 'biosynth-labs', 'Lab Research Associate', 'Conduct experiments in synthetic biology and CRISPR gene editing for agricultural applications.', 'BioTech', 'Seed', 'Chennai', '₹8-12 LPA', 'full_time', NULL),
('PayStack India', 'paystack-india', 'Growth Marketing Intern', 'Drive user acquisition campaigns, analyze funnel metrics, and optimize conversion for B2B payments platform.', 'FinTech', 'Series A', 'Mumbai', '₹20,000/mo', 'intern', NULL),
('FarmFresh Direct', 'farmfresh-direct', 'Supply Chain Manager', 'Optimize farm-to-table logistics across 50+ cities. Manage cold chain and vendor relationships.', 'FoodTech', 'Seed', 'Hyderabad', '₹10-14 LPA', 'full_time', NULL),
('TourBuddy', 'tourbuddy', 'Product Designer', 'Design mobile-first travel experiences for the AI-powered trip planning app.', 'Tourism', 'Pre-Seed', 'Goa', '₹18,000/mo', 'intern', NULL),
('CloudERP Solutions', 'clouderp-solutions', 'Backend Engineer', 'Build microservices for multi-tenant ERP platform using Go and PostgreSQL.', 'SaaS/ERP', 'Seed', 'Pune', '₹12-18 LPA', 'full_time', NULL),
('DeepSense Analytics', 'deepsense-analytics', 'Data Scientist', 'Develop predictive models for industrial IoT sensor data. Experience with time-series analysis required.', 'DeepTech', 'Series A', 'Chennai', '₹15-22 LPA', 'full_time', NULL),
('SustainLoop', 'sustainloop', 'Co-Founder (CTO)', 'Technical co-founder for circular economy marketplace. Equity-based, building from scratch with founding team.', 'Sustainability', 'Pre-Seed', 'Bangalore', 'Equity', 'co_founder', NULL),
('MedReach Health', 'medreach-health', 'Full-Stack Developer', 'Build telemedicine platform connecting rural clinics with specialists. React + Node.js stack.', 'HealthTech', 'Seed', 'Chennai', '₹8-12 LPA', 'full_time', NULL),
('QuantumLeap Computing', 'quantumleap', 'Quantum Computing Intern', 'Research quantum algorithms for optimization problems. Background in physics or CS required.', 'DeepTech', 'Pre-Seed', 'Remote', '₹35,000/mo', 'intern', NULL),
('InsureSimple', 'insuresimple', 'Actuarial Analyst Intern', 'Build risk models and pricing algorithms for micro-insurance products targeting rural India.', 'InsurTech', 'Seed', 'Mumbai', '₹22,000/mo', 'intern', NULL),
('SkillForge', 'skillforge', 'Curriculum Developer', 'Design industry-aligned upskilling programs for Tier-2/3 college students.', 'EdTech', 'Seed', 'Remote', '₹5-8 LPA', 'full_time', NULL),
('RoboFleet Logistics', 'robofleet-logistics', 'Robotics Engineer', 'Design and program autonomous delivery robots for last-mile logistics.', 'DeepTech', 'Series A', 'Bangalore', '₹18-25 LPA', 'full_time', NULL),
('AgroVision', 'agrovision', 'Computer Vision Engineer', 'Build drone-based crop health monitoring using satellite and aerial imagery.', 'AgriTech', 'Seed', 'Hyderabad', '₹10-15 LPA', 'full_time', NULL),
('LegalEase', 'legalease', 'Legal Tech Intern', 'Help build AI-powered contract analysis and compliance tools for SMEs.', 'LegalTech', 'Pre-Seed', 'Delhi', '₹18,000/mo', 'intern', NULL),
('CarbonZero', 'carbonzero', 'Sustainability Analyst', 'Track and report carbon emissions for enterprise clients. Build ESG reporting dashboards.', 'Sustainability', 'Seed', 'Bangalore', '₹7-10 LPA', 'full_time', NULL),
('FinLit Academy', 'finlit-academy', 'Mobile Developer (React Native)', 'Build gamified financial literacy app for Gen-Z users. React Native + Firebase stack.', 'FinTech', 'Pre-Seed', 'Remote', '₹20,000/mo', 'intern', NULL),
('SpaceView Analytics', 'spaceview-analytics', 'Satellite Data Analyst', 'Process and analyze earth observation satellite data for defense and agriculture.', 'SpaceTech', 'Seed', 'Chennai', '₹12-16 LPA', 'full_time', NULL),
('ConsultX', 'consultx', 'Strategy Consultant Intern', 'Support founders with go-to-market strategy, market sizing, and competitive analysis.', 'Consulting', 'Pre-Seed', 'Chennai', '₹15,000/mo', 'intern', NULL),
('NanoMed Devices', 'nanomed-devices', 'Biomedical Engineer', 'Design nano-scale drug delivery devices for cancer therapeutics.', 'BioTech', 'Seed', 'Chennai', '₹10-14 LPA', 'full_time', NULL),
('SmartGrid IoT', 'smartgrid-iot', 'Embedded Systems Engineer', 'Develop firmware for IoT-based smart metering and energy management systems.', 'CleanTech', 'Series A', 'Pune', '₹14-20 LPA', 'full_time', NULL);

-- Seed additional events from JITSIE report
INSERT INTO public.events (title, date_time, location, registration_link) VALUES
('Pitch Fest 2024', '2024-09-15T10:00:00+05:30', 'JITSIE Campus, Chennai', 'https://jitsie.org/pitchfest2024'),
('START-A-THON Hackathon', '2025-01-20T09:00:00+05:30', 'IIT Madras Research Park', 'https://jitsie.org/startathon'),
('Bengaluru Startup Bootcamp', '2025-03-10T10:00:00+05:30', 'Bangalore', 'https://jitsie.org/blr-bootcamp'),
('PIWOT 2025 — Product Innovation Workshop', '2025-04-05T09:00:00+05:30', 'JITSIE Campus, Chennai', 'https://jitsie.org/piwot2025'),
('Becoming Billionaire 2025', '2025-05-18T14:00:00+05:30', 'Virtual', 'https://jitsie.org/bb2025'),
('Panel Discussion at TTJA Annual Meet', '2025-06-22T16:00:00+05:30', 'TTJA Convention Centre, Chennai', NULL);

-- Seed additional news_updates from JITSIE report
INSERT INTO public.news_updates (text, link) VALUES
('JITSIE secures STPI incubation partnership for deep-tech startups', 'https://jitsie.org/stpi'),
('Wadhwani LiftOff program onboards 15 JITSIE founders for scale-up mentoring', 'https://jitsie.org/wadhwani'),
('Polygon Labs partners with JITSIE for Web3 startup acceleration', 'https://jitsie.org/polygon'),
('PanIIT Alumni India collaborates with JITSIE on cross-campus founder exchange', NULL),
('JITSIE ecosystem crosses 200+ startups across 12 sectors', NULL),
('3 JITSIE startups selected for Y Combinator W25 batch', NULL),
('RVEI and KaroStartup join as ecosystem enablement partners', NULL),
('Uniqorn Growth Partners commits ₹10Cr fund for JITSIE pre-seed startups', NULL);

-- Seed additional partners from JITSIE report
INSERT INTO public.partners (name, category) VALUES
('Wadhwani Foundation', 'corporate'),
('STPI', 'corporate'),
('RVEI', 'corporate'),
('KaroStartup', 'corporate'),
('Uniqorn Growth Partners', 'vc'),
('Polygon Labs', 'corporate'),
('PanIIT Alumni India', 'corporate');
