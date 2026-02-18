import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Initiative } from '@/lib/types';

export function useInitiativeDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['initiative', id],
    queryFn: async () => {
      if (!id) throw new Error('No ID');
      const { data, error } = await supabase
        .from('initiatives')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Initiative;
    },
    enabled: !!id,
  });
}
