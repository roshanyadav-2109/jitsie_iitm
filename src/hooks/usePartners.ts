import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Partner } from '@/lib/types';

export function usePartners(category?: string) {
  return useQuery({
    queryKey: ['partners', category],
    queryFn: async () => {
      let q = supabase.from('partners').select('*').order('name');
      
      // Only filter if a specific category is selected (ignoring 'All')
      if (category && category !== 'All') {
        q = q.eq('category', category);
      }
      
      const { data, error } = await q;
      if (error) throw error;
      return data as Partner[];
    },
  });
}

export function usePartnerCategories() {
  return useQuery({
    queryKey: ['partner_categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('category');

      if (error) throw error;

      // Extract unique categories from the response
      const categories = Array.from(new Set(data.map(p => p.category).filter(Boolean))).sort();
      
      return ['All', ...categories];
    }
  });
}
