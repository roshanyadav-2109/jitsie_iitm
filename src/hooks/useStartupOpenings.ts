import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { StartupOpening } from '@/lib/types';

interface Filters {
  sector?: string;
  type?: string;
  stage?: string;
}

export function useStartupOpenings(filters?: Filters) {
  return useQuery({
    queryKey: ['startup_openings', filters],
    queryFn: async () => {
      let q = supabase
        .from('startup_openings')
        .select('*')
        .eq('is_active', true)
        .order('posted_at', { ascending: false });

      if (filters?.sector) q = q.eq('sector', filters.sector);
      if (filters?.type) q = q.eq('type', filters.type);
      if (filters?.stage) q = q.eq('stage', filters.stage);

      const { data, error } = await q;
      if (error) throw error;
      return data as StartupOpening[];
    },
  });
}
