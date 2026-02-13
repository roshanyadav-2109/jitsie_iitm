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

      if (filters?.sector && filters.sector !== 'All') q = q.eq('sector', filters.sector);
      if (filters?.type && filters.type !== 'All') q = q.eq('type', filters.type);
      if (filters?.stage && filters.stage !== 'All') q = q.eq('stage', filters.stage);

      const { data, error } = await q;
      if (error) throw error;
      return data as StartupOpening[];
    },
  });
}

export function useStartupFilters() {
  return useQuery({
    queryKey: ['startup_filters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('startup_openings')
        .select('sector, type, stage')
        .eq('is_active', true);

      if (error) throw error;

      // Extract unique values and filter out nulls/blanks
      const sectors = Array.from(new Set(data.map(d => d.sector).filter(Boolean))).sort() as string[];
      const types = Array.from(new Set(data.map(d => d.type).filter(Boolean))).sort() as string[];
      const stages = Array.from(new Set(data.map(d => d.stage).filter(Boolean))).sort() as string[];

      return {
        sectors: ['All', ...sectors],
        types: ['All', ...types],
        stages: ['All', ...stages],
      };
    }
  });
}
