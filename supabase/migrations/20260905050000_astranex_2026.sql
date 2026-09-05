-- Correct AstraNex Defence's founding year to 2026.
UPDATE public.companies SET
  batch = '2026',
  description = 'AstraNex Defence is building India''s autonomous defence platform — a unified ecosystem for intelligent unmanned systems across land, air and maritime domains.

It develops modular robotic platforms and edge-AI security technologies, with a mission of building secure, interoperable systems connected through AI, mission control and a common software architecture spanning autonomous ground systems, aerial platforms and maritime unmanned systems.

Founded in 2026 by Milanjyoti Ray.'
WHERE slug = 'astranex-defence';
