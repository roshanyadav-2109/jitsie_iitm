import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { SpeakerCompany } from '@/lib/types';

export function useSpeakerCompanies() {
  return useQuery({
    queryKey: ['speaker_companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('speaker_companies')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (error) throw error;
      return data as SpeakerCompany[];
    },
  });
}
