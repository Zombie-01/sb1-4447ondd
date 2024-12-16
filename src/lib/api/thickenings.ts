import { supabase } from '../supabase';
import type { Database } from '../../types/supabase';

export type Thickening = Database['public']['Tables']['thickenings']['Row'];
export type ThickeningInput = Database['public']['Tables']['thickenings']['Insert'];

export interface ThickeningWithDetails extends Thickening {
  customers: {
    name: string;
    debt: number;
    remaining_balance: number;
  };
  users: {
    firstname: string;
    lastname: string;
  };
  first_payment_date: string | null;
  last_payment_date: string | null;
}

export async function getThickenings(startDate?: string, endDate?: string) {
  let query = supabase
    .from('thickenings')
    .select(`
      *,
      customers (
        name,
        debt,
        remaining_balance
      ),
      users (
        firstname,
        lastname
      ),
      first_payment_date:payments(date).min(),
      last_payment_date:payments(date).max()
    `)
    .order('date', { ascending: false });

  if (startDate) {
    query = query.gte('date', startDate);
  }
  if (endDate) {
    query = query.lte('date', endDate);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as ThickeningWithDetails[];
}

// ... rest of the existing functions remain the same ...