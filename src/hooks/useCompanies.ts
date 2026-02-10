import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Company } from '@/lib/types';

export function useCompanies(filters?: { batch?: string; industry?: string }) {
  return useQuery({
    queryKey: ['companies', filters],
    queryFn: async () => {
      let q = supabase.from('companies').select('*').order('created_at', { ascending: false });
      if (filters?.batch) q = q.eq('batch', filters.batch);
      if (filters?.industry) q = q.eq('industry', filters.industry);
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
