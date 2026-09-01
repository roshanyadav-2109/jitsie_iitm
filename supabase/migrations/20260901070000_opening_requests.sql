-- Hiring requests submitted from the site. Anyone may file one; only admins read
-- them. Storing the row first means a submission is never lost if the email
-- notification fails downstream.

CREATE TABLE public.opening_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  startup_name TEXT NOT NULL,
  website_url TEXT,
  role_title TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT,
  stipend_salary TEXT,
  sector TEXT,
  stage TEXT,
  description TEXT NOT NULL,
  apply_link TEXT,
  contact_name TEXT NOT NULL,
  contact_role TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- The board is for the IIT Madras ecosystem, so the requester must be reachable
  -- at an institute address. Enforced here as well as in the form.
  CONSTRAINT opening_requests_iitm_email CHECK (lower(contact_email) LIKE '%%@%%iitm.ac.in')
);

ALTER TABLE public.opening_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a hiring request"
  ON public.opening_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view hiring requests"
  ON public.opening_requests FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update hiring requests"
  ON public.opening_requests FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
