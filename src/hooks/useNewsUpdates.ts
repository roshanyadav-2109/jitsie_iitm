import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { NewsUpdate } from '@/lib/types';

export function useNewsUpdates() {
  return useQuery({
    queryKey: ['news_updates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_updates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);
      if (error) throw error;
      return data as NewsUpdate[];
    },
  });
}
