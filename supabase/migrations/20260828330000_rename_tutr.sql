-- Rename per request: the strip entry carries the Avishkar Hyperloop wordmark but
-- is labelled TuTr Hyperloop, the venture spun out of that team.

UPDATE public.speaker_companies
  SET name = 'TuTr Hyperloop'
  WHERE name = 'Avishkar Hyperloop';
