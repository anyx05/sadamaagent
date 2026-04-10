import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useCurrentPortId } from './berths';

export interface DashboardStats {
  totalBerths: number;
  availableBerths: number;
  occupiedBerths: number;
  maintenanceBerths: number;
  activeBookings: number;
  weekBookings: number;
  occupancyRate: number;
}

export function useDashboardStats() {
  const { data: portId } = useCurrentPortId();
  
  return useQuery({
    queryKey: ['dashboard-stats', portId],
    enabled: !!portId,
    queryFn: async (): Promise<DashboardStats> => {
      const supabase = createClient();
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      // Fetch all berths for this port
      const { data: berths, error: berthsError } = await supabase
        .from('berths')
        .select('id, status')
        .eq('port_id', portId)
        .eq('is_active', true);
        
      if (berthsError) throw new Error(berthsError.message);
      
      const totalBerths = berths?.length ?? 0;
      const availableBerths = berths?.filter(b => b.status === 'available').length ?? 0;
      const occupiedBerths = berths?.filter(b => b.status === 'occupied').length ?? 0;
      const maintenanceBerths = berths?.filter(b => b.status === 'maintenance').length ?? 0;
      
      // Fetch active bookings (confirmed, departure in the future)
      const berthIds = berths?.map(b => b.id) ?? [];
      
      let activeBookings = 0;
      let weekBookings = 0;
      
      if (berthIds.length > 0) {
        const { count: activeCount, error: activeError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .in('berth_id', berthIds)
          .eq('status', 'confirmed')
          .gte('departure_date', today);
          
        if (activeError) throw new Error(activeError.message);
        activeBookings = activeCount ?? 0;
        
        // Bookings created this week
        const { count: weekCount, error: weekError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .in('berth_id', berthIds)
          .gte('created_at', weekAgo);
          
        if (weekError) throw new Error(weekError.message);
        weekBookings = weekCount ?? 0;
      }
      
      const occupancyRate = totalBerths > 0 
        ? Math.round((occupiedBerths / totalBerths) * 100) 
        : 0;
      
      return {
        totalBerths,
        availableBerths,
        occupiedBerths,
        maintenanceBerths,
        activeBookings,
        weekBookings,
        occupancyRate,
      };
    }
  });
}
