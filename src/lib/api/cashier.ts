import { supabase } from '../supabase';
import type { Database } from '../../types/supabase';
import type { BaseEntity, PaymentType, MovementType } from './types';

export interface CashierEntry extends BaseEntity {
  cargo_id: string;
  entry_date: string;
  container_number: string;
  payment_amount: number;
  payment_type: PaymentType;
  yard_location: string;
  movement_type: MovementType;
  movement_date: string;
  notes?: string;
}

export interface CashierEntryWithDetails extends CashierEntry {
  cargo: {
    container_serial: string;
    cargo_name: string;
    transport_cost: number;
    customer: {
      id: string;
      name: string;
    };
  };
}

export interface CashierEntryFilters {
  startDate?: string;
  endDate?: string;
  paymentType?: PaymentType;
  movementType?: MovementType;
}

export async function getCashierEntries(filters?: CashierEntryFilters) {
  let query = supabase
    .from('cashier_entries')
    .select(`
      *,
      cargo:cargo_id (
        container_serial,
        cargo_name,
        transport_cost,
        customer:customer_id (
          id,
          name
        )
      )
    `)
    .order('entry_date', { ascending: false });

  if (filters?.startDate) {
    query = query.gte('entry_date', filters.startDate);
  }
  if (filters?.endDate) {
    query = query.lte('entry_date', filters.endDate);
  }
  if (filters?.paymentType) {
    query = query.eq('payment_type', filters.paymentType);
  }
  if (filters?.movementType) {
    query = query.eq('movement_type', filters.movementType);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as CashierEntryWithDetails[];
}

export async function getCashierEntry(id: string) {
  const { data, error } = await supabase
    .from('cashier_entries')
    .select(`
      *,
      cargo:cargo_id (
        container_serial,
        cargo_name,
        transport_cost,
        customer:customer_id (
          id,
          name
        )
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as CashierEntryWithDetails;
}

export async function createCashierEntry(entry: Omit<CashierEntry, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('cashier_entries')
    .insert(entry)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCashierEntry(
  id: string,
  entry: Partial<Omit<CashierEntry, 'id' | 'created_at' | 'updated_at'>>
) {
  const { data, error } = await supabase
    .from('cashier_entries')
    .update(entry)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCashierEntry(id: string) {
  const { error } = await supabase
    .from('cashier_entries')
    .delete()
    .eq('id', id);

  if (error) throw error;
}