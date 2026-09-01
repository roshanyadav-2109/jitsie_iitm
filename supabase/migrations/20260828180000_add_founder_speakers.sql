-- Additional speakers: IIT Madras deep-tech founders, investors and ecosystem partners.
-- Designations verified against company sites and public profiles. Photo URLs were
-- each checked to return an image; where no reusable portrait exists the card falls
-- back to an initials tile. Topics are left NULL until the session each spoke at is
-- confirmed.

INSERT INTO public.past_speakers (full_name, designation, organization, linkedin_url, avatar_url, display_order) VALUES
('Prof. Satya Chakravarthy',
 'Professor of Aerospace Engineering, IIT Madras; Co-founder of Agnikul Cosmos, GalaxEye, The ePlane Company and Avishkar Hyperloop',
 'IIT Madras / Agnikul Cosmos',
 'https://www.linkedin.com/in/satya-chakravarthy-51326241',
 NULL, 8),

('Manu Iyer', 'Co-founder & Managing Partner', 'Bluehill.VC',
 'https://www.linkedin.com/in/manuiyer',
 'https://thechennaiangels.com/wp-content/uploads/2023/03/manu-iyar.png', 9),

('Divanshu Kumar', 'Co-founder & CEO', 'Solinas Integrity',
 'https://www.linkedin.com/in/divinvolve',
 'https://solinas.in/wp-content/uploads/2025/04/Copy-of-Divanshu-Kumar-Co-founder.jpg', 10),

('Soumalya Mukherjee', 'Co-founder & CEO', 'Tan90 Thermal Solutions',
 NULL, NULL, 11),

('Sanidhya Chaturvedi', 'Co-founder, Director & COO', 'Folium Sensing',
 'https://www.linkedin.com/in/sanidhyachaturvedi/',
 'https://foliumsensing.in/images/sanithya1.png', 12),

('Anbu Mathi', 'Founder', 'Carbon6 Venture',
 'https://www.linkedin.com/in/anbumathi/', NULL, 13),

('Amrutash Misra', 'Founder & CEO', 'CoreVoice',
 'https://www.linkedin.com/in/amrutash-misra/', NULL, 14),

('Sriharsha Nallamilli', 'Head of Strategic Partnerships', 'Wadhwani Foundation',
 'https://www.linkedin.com/in/sriharsha-nallamilli', NULL, 15),

('Dr. Soumik Bhusan', 'CFO & Director; Ph.D., IIM Ranchi', NULL,
 NULL, NULL, 16);
