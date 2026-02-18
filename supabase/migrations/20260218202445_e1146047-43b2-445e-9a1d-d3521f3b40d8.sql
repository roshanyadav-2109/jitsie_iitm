
CREATE TABLE public.executive_board (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  designation TEXT,
  bio TEXT,
  avatar_url TEXT,
  linkedin_url TEXT,
  organization TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.executive_board ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view executive board" ON public.executive_board FOR SELECT USING (true);
CREATE POLICY "Admins can insert executive board" ON public.executive_board FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update executive board" ON public.executive_board FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete executive board" ON public.executive_board FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_executive_board_updated_at
  BEFORE UPDATE ON public.executive_board
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
