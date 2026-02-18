import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { PastSpeaker } from '@/lib/types';

export function usePastSpeakers() {
  return useQuery({
    queryKey: ['past_speakers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('past_speakers')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (error) throw error;
      return data as PastSpeaker[];
    },
  });
}
