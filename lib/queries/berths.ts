import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

export type BerthStatus = "available" | "occupied" | "maintenance";

// Interface mapping to both V0 UI and DB
export interface Berth {
  id: string;
  name: string;
  length: number;
  draft: number;
  price: number;
  status: BerthStatus;
}

// 1. Hook to grab the user's primary port_id automatically
export function useCurrentPortId() {
  return useQuery({
    queryKey: ['currentPortId'],
    queryFn: async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      
      const { data, error } = await supabase
        .from('ports')
        .select('id')
        .eq('owner_id', user.id)
        .maybeSingle();
        
      if (error) throw new Error("Database query failed: " + error.message);
      if (!data) return null; // No port created for this user yet
      return data.id as string;
    }
  });
}

// 2. Fetch all berths for this port
export function useBerths() {
  const { data: portId } = useCurrentPortId();
  
  return useQuery({
    queryKey: ['berths', portId],
    enabled: !!portId,
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('berths')
        .select('id, name, max_length_m, max_draft_m, price_per_night, status')
        .eq('port_id', portId)
        .order('created_at', { ascending: true });
        
      if (error) throw new Error(error.message);
      
      // Map to UI expectations
      return data.map(b => ({
        id: b.id,
        name: b.name,
        length: b.max_length_m,
        draft: b.max_draft_m,
        price: b.price_per_night,
        status: b.status as BerthStatus,
      })) as Berth[];
    }
  });
}

// 3. Add Berth Mutation
export function useAddBerth() {
  const queryClient = useQueryClient();
  const { data: portId } = useCurrentPortId();

  return useMutation({
    mutationFn: async (newBerth: Omit<Berth, 'id'>) => {
      if (!portId) throw new Error("No port ID available");
      const supabase = createClient();
      const { data, error } = await supabase.from('berths').insert({
        port_id: portId,
        name: newBerth.name,
        max_length_m: newBerth.length,
        max_draft_m: newBerth.draft,
        price_per_night: newBerth.price,
        status: newBerth.status
      }).select().single();
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['berths'] });
    }
  });
}

// 4. Update Berth Mutation
export function useUpdateBerth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (berth: Berth) => {
      const supabase = createClient();
      const { data, error } = await supabase.from('berths').update({
        name: berth.name,
        max_length_m: berth.length,
        max_draft_m: berth.draft,
        price_per_night: berth.price,
        status: berth.status
      }).eq('id', berth.id).select().single();
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['berths'] });
    }
  });
}

// 5. Delete Berth Mutation
export function useDeleteBerth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient();
      const { error } = await supabase.from('berths').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['berths'] });
    }
  });
}
