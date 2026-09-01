-- The two logos the domain-logo service could not resolve.
-- Tan90's comes from their own site. Carbon6 Venture's site (carbon6venture.com)
-- serves over plain HTTP only, so hotlinking it would be blocked as mixed content
-- on an HTTPS page; the file is copied into Supabase Storage instead.

INSERT INTO public.speaker_companies (name, logo_url, website_url, display_order) VALUES
('Tan90 Thermal Solutions',
 'https://www.tan90thermal.com/images/img_screenshot20250513at102317amremovebgpreview_1.webp',
 'https://www.tan90thermal.com/', 12),
('Carbon6 Venture',
 'https://fpjkrxorovmknazwhdcw.supabase.co/storage/v1/object/public/public-assets/logos/carbon6.png',
 'http://www.carbon6venture.com/', 13);
