import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { GalleryImage } from '@/lib/types';

export function useGalleryImages() {
  return useQuery({
    queryKey: ['image_gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('image_gallery')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as GalleryImage[];
    },
  });
}
