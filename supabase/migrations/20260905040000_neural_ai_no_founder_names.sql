-- Drop the founding-member names from Neural AI's public description; keep
-- the founding year and location.
UPDATE public.companies SET description = 'Neural AI is a research lab building cognitive architectures — the structured systems that decide how AI represents, retrieves, consolidates and reasons over information. The bet is that the next generation of capability comes from architectural sophistication rather than parameter count.

The lab studies how AI systems should remember, retrieve, update and govern knowledge over time: persistent state, evidence-aware recall with source attribution, and deployment under privacy constraints. Memory is treated as the substrate of cognition, in contrast to stateless transformers that begin every session from zero.

Its first product, Anant, is a cognitive memory layer for organisations handling long-running projects and institutional knowledge — structured memory, evidence-aware retrieval, consolidation and deployment controls, rather than a consumer chat assistant.

Neural AI is deliberately not training foundation models, building agent frameworks or shipping general-purpose assistants. It is built in India, with native multilingual support and data sovereignty by architectural design.

Founded in 2025. Based at the Sudha and Shankar Innovation Hub, IIT Madras, Chennai.' WHERE slug = 'neural-ai';
