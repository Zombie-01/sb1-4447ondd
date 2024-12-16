import { supabase } from '../supabase';
import type { Database } from '../../types/supabase';
import type { CargoStatus } from './types';

export type Cargo = Database['public']['Tables']['cargo']['Row'];
export type CargoInput = Database['public']['Tables']['cargo']['Insert'];
export type CargoUpdate = Database['public']['Tables']['cargo']['Update'];

export interface CargoWithDetails extends Cargo {
  customer: {
    id: string;
    name: string;
  };
  capacity: {
    id: string;
    name: string;
  };
  logistic: {
    id: string;
    name: string;
  };
  currency?: {
    id: string;
    name: string;
  };
  payment_method?: {
    id: string;
    name: string;
  };
  foreign_agent?: {
    id: string;
    name: string;
  };
}

export interface CargoFilters {
  status?: CargoStatus;
  customerId?: string;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}

export async function getCargo(filters?: CargoFilters) {
  let query = supabase
    .from('cargo')
    .select(`
      *,
      customer:customer_id (
        id,
        name
      ),
      capacity:capacity_id (
        id,
        name
      ),
      logistic:logistic_id (
        id,
        name
      ),
      currency:currency_id (
        id,
        name
      ),
      payment_method:payment_method_id (
        id,
        name
      ),
      foreign_agent:foreign_agent_id (
        id,
        name
      )
    `)
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.customerId) {
    query = query.eq('customer_id', filters.customerId);
  }
  if (filters?.startDate) {
    query = query.gte('created_at', filters.startDate);
  }
  if (filters?.endDate) {
    query = query.lte('created_at', filters.endDate);
  }
  if (filters?.searchTerm) {
    query = query.or(`
      container_serial.ilike.%${filters.searchTerm}%,
      cargo_name.ilike.%${filters.searchTerm}%,
      receiver_name.ilike.%${filters.searchTerm}%
    `);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as CargoWithDetails[];
}

export async function getCargoById(id: string) {
  const { data, error } = await supabase
    .from('cargo')
    .select(`
      *,
      customer:customer_id (
        id,
        name
      ),
      capacity:capacity_id (
        id,
        name
      ),
      logistic:logistic_id (
        id,
        name
      ),
      currency:currency_id (
        id,
        name
      ),
      payment_method:payment_method_id (
        id,
        name
      ),
      foreign_agent:foreign_agent_id (
        id,
        name
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as CargoWithDetails;
}

export async function createCargo(cargo: CargoInput) {
  const { data, error } = await supabase
    .from('cargo')
    .insert(cargo)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCargo(id: string, cargo: CargoUpdate) {
  const { data, error } = await supabase
    .from('cargo')
    .update(cargo)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCargo(id: string) {
  const { error } = await supabase
    .from('cargo')
    .delete()
    .eq('id', id);

  if (error) throw error;
}