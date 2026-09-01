-- Openings only ever come from startups listed in the directory, so every company
-- referenced by startup_openings.startup_slug must have a companies row. These are
-- the twenty the seed openings point at; the slug is the join key the openings page
-- reads the logo through, so it must match startup_slug exactly.
--
-- Logos use the same domain-logo service as speaker_companies.

INSERT INTO public.companies (name, slug, one_liner, industry, website_url, logo_url) VALUES
('OpenAI', 'openai', 'Large language models and AI alignment research.', 'AI/ML', 'https://openai.com/', 'https://api.devfolio.co/api/miscellaneous/logo/openai.com.png'),
('Anthropic', 'anthropic', 'Safe and interpretable AI systems.', 'AI/ML', 'https://anthropic.com/', 'https://api.devfolio.co/api/miscellaneous/logo/anthropic.com.png'),
('Scale AI', 'scale-ai', 'Data pipelines and training infrastructure for AI models.', 'AI Infrastructure', 'https://scale.com/', 'https://api.devfolio.co/api/miscellaneous/logo/scale.com.png'),
('Anduril Industries', 'anduril', 'Autonomy software for defence robotics.', 'DefenseTech', 'https://anduril.com/', 'https://api.devfolio.co/api/miscellaneous/logo/anduril.com.png'),
('Palantir Technologies', 'palantir', 'Data platforms for enterprise and government.', 'Data Analytics', 'https://palantir.com/', 'https://api.devfolio.co/api/miscellaneous/logo/palantir.com.png'),
('Stripe', 'stripe', 'Financial APIs and payment systems.', 'FinTech', 'https://stripe.com/', 'https://api.devfolio.co/api/miscellaneous/logo/stripe.com.png'),
('SpaceX', 'spacex', 'Embedded systems for spacecraft.', 'Aerospace', 'https://spacex.com/', 'https://api.devfolio.co/api/miscellaneous/logo/spacex.com.png'),
('Tesla', 'tesla', 'Computer vision for autonomous driving.', 'Automotive AI', 'https://tesla.com/', 'https://api.devfolio.co/api/miscellaneous/logo/tesla.com.png'),
('Boston Dynamics', 'boston-dynamics', 'Control systems for humanoid robots.', 'Robotics', 'https://bostondynamics.com/', 'https://api.devfolio.co/api/miscellaneous/logo/bostondynamics.com.png'),
('NVIDIA', 'nvidia', 'Deep learning workloads on CUDA platforms.', 'Semiconductors', 'https://nvidia.com/', 'https://api.devfolio.co/api/miscellaneous/logo/nvidia.com.png'),
('Google DeepMind', 'google-deepmind', 'Reinforcement learning and AGI research.', 'AI Research', 'https://deepmind.google/', 'https://api.devfolio.co/api/miscellaneous/logo/deepmind.google.png'),
('Microsoft Research', 'microsoft-research', 'Research in systems and AI.', 'Research Lab', 'https://microsoft.com/research/', 'https://api.devfolio.co/api/miscellaneous/logo/microsoft.com.png'),
('IBM Research', 'ibm-research', 'Quantum algorithm experimentation.', 'Quantum Tech', 'https://research.ibm.com/', 'https://api.devfolio.co/api/miscellaneous/logo/ibm.com.png'),
('xAI', 'xai', 'Large-scale model training systems.', 'AI/ML', 'https://x.ai/', 'https://api.devfolio.co/api/miscellaneous/logo/x.ai.png'),
('Databricks', 'databricks', 'Big data and Spark-based systems.', 'Data Platform', 'https://databricks.com/', 'https://api.devfolio.co/api/miscellaneous/logo/databricks.com.png'),
('Snowflake', 'snowflake', 'Distributed data warehouse systems.', 'Cloud Computing', 'https://snowflake.com/', 'https://api.devfolio.co/api/miscellaneous/logo/snowflake.com.png'),
('Hugging Face', 'huggingface', 'Open-source transformer models and tools.', 'AI Open Source', 'https://huggingface.co/', 'https://api.devfolio.co/api/miscellaneous/logo/huggingface.co.png'),
('Perplexity AI', 'perplexity-ai', 'AI-powered answer engines.', 'AI Search', 'https://perplexity.ai/', 'https://api.devfolio.co/api/miscellaneous/logo/perplexity.ai.png'),
('Midjourney', 'midjourney', 'Diffusion-based image generation.', 'Generative AI', 'https://midjourney.com/', 'https://api.devfolio.co/api/miscellaneous/logo/midjourney.com.png'),
('Cohere', 'cohere', 'Large language models for the enterprise.', 'AI/ML', 'https://cohere.com/', 'https://api.devfolio.co/api/miscellaneous/logo/cohere.com.png')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  one_liner = COALESCE(companies.one_liner, EXCLUDED.one_liner),
  industry = COALESCE(companies.industry, EXCLUDED.industry),
  website_url = COALESCE(companies.website_url, EXCLUDED.website_url),
  logo_url = COALESCE(companies.logo_url, EXCLUDED.logo_url);
