import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Job } from '@/lib/types';

export function useJobs(filters?: { category?: string; type?: string }) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      let q = supabase.from('jobs').select('*, companies(name, logo_url, slug)').order('created_at', { ascending: false });
      if (filters?.category) q = q.eq('category', filters.category);
      if (filters?.type) q = q.eq('type', filters.type as 'full_time' | 'intern');
      const { data, error } = await q;
      if (error) throw error;
      return data as Job[];
    },
  });
}

export function useJobsByCompany(companyId: string) {
  return useQuery({
    queryKey: ['jobs', 'company', companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Job[];
    },
    enabled: !!companyId,
  });
}
