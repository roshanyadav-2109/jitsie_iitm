import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Profile, BoardMember, StartupAdvisor, ExecutiveBoardMember } from '@/lib/types';

export function useTeamProfiles() {
  return useQuery({
    queryKey: ['profiles', 'team'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_verified', true)
        .order('full_name');
      if (error) throw error;
      return data as Profile[];
    },
  });
}

export function useBoardMembers() {
  return useQuery({
    queryKey: ['board_members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('board_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (error) throw error;
      return data as BoardMember[];
    },
  });
}

export function useStartupAdvisors() {
  return useQuery({
    queryKey: ['startup_advisors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('startup_advisors')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (error) throw error;
      return data as StartupAdvisor[];
    },
  });
}

export function useExecutiveBoard() {
  return useQuery({
    queryKey: ['executive_board'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('executive_board')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (error) throw error;
      return data as ExecutiveBoardMember[];
    },
  });
}
