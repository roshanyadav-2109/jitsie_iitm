import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Company } from '@/lib/types';

export function useCompanies(filters?: { batch?: string; industry?: string }) {
  return useQuery({
    queryKey: ['companies', filters],
    queryFn: async () => {
      let q = supabase.from('companies').select('*').order('created_at', { ascending: false });
      
      // Filter by Batch
      if (filters?.batch && filters.batch !== 'All') {
        q = q.eq('batch', filters.batch);
      }
      
      // Filter by Industry
      if (filters?.industry && filters.industry !== 'All') {
        q = q.eq('industry', filters.industry);
      }
      
      const { data, error } = await q;
      if (error) throw error;
      return data as Company[];
    },
  });
}

export function useCompanyBySlug(slug: string) {
  return useQuery({
    queryKey: ['company', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return data as Company | null;
    },
    enabled: !!slug,
  });
}

// New hook for dynamic filters
export function useCompanyFilters() {
  return useQuery({
    queryKey: ['company_filters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('batch, industry');

      if (error) throw error;

      const batches = Array.from(new Set(data.map(c => c.batch).filter(Boolean))).sort().reverse() as string[];
      const industries = Array.from(new Set(data.map(c => c.industry).filter(Boolean))).sort() as string[];

      return {
        batches: ['All', ...batches],
        industries: ['All', ...industries],
      };
    }
  });
}
