import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

export type Berth = {
  id: string;
  name: string;
  max_vessel_length: number | string;
  max_draft: number | string;
  price_per_night: number;
  amenities: string[];
  status: 'available' | 'occupied' | 'maintenance';
};

export function useBerths() {
  return useQuery({
    queryKey: ['berths'],
    queryFn: async () => {
      const supabase = createClient();
      
      const { data, error } = await supabase.from('berths').select('*');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Berth[];
    }
  });
}
