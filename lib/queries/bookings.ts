import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useCurrentPortId } from './berths';

export interface Booking {
  id: string;
  customerName: string;
  vessel: string;
  arrival: string;
  departure: string;
  status: string;
}

export function useBookings() {
  const { data: portId } = useCurrentPortId();
  
  return useQuery({
    queryKey: ['bookings', portId],
    enabled: !!portId,
    queryFn: async () => {
      const supabase = createClient();
      
      // Select bookings filtering by berths that belong to the current port.
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          customer_name,
          vessel_name,
          arrival_date,
          departure_date,
          status,
          berths!inner(port_id)
        `)
        .eq('berths.port_id', portId)
        .order('arrival_date', { ascending: false });
        
      if (error) throw new Error(error.message);
      
      return data.map((b: any) => ({
        id: b.id,
        customerName: b.customer_name,
        vessel: b.vessel_name,
        arrival: b.arrival_date,
        departure: b.departure_date,
        status: b.status,
      })) as Booking[];
    }
  });
}

// Cancel a booking (set status to 'cancelled')
export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    }
  });
}

// Update booking status (confirm, cancel, etc.)
export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, status }: { bookingId: string; status: string }) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    }
  });
}
