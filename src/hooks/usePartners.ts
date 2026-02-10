import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Partner } from '@/lib/types';

export function usePartners(category?: string) {
  return useQuery({
    queryKey: ['partners', category],
    queryFn: async () => {
      let q = supabase.from('partners').select('*').order('name');
      if (category) q = q.eq('category', category as 'vc' | 'corporate');
      const { data, error } = await q;
      if (error) throw error;
      return data as Partner[];
    },
  });
}
