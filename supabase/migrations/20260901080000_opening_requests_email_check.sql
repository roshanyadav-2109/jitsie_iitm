-- Any iitm.ac.in address, including sub-domains: study.iitm.ac.in,
-- smail.iitm.ac.in, ds.study.iitm.ac.in and so on. The LIKE version this
-- replaces also let through look-alikes such as name@notiitm.ac.in.

ALTER TABLE public.opening_requests
  DROP CONSTRAINT IF EXISTS opening_requests_iitm_email;

ALTER TABLE public.opening_requests
  ADD CONSTRAINT opening_requests_iitm_email
  CHECK (lower(contact_email) ~ '@([a-z0-9-]+[.])*iitm[.]ac[.]in$');
