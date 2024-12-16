import { supabase } from '../supabase';
import type { Database } from '../../types/supabase';

export type User = Database['public']['Tables']['users']['Row'];
export type UserInput = Database['public']['Tables']['users']['Insert'];

export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      roles (
        id,
        name
      )
    `);
  
  if (error) throw error;
  return data;
}

export async function getUser(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      roles (
        id,
        name
      )
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createUser(user: UserInput) {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateUser(id: string, user: Partial<UserInput>) {
  const { data, error } = await supabase
    .from('users')
    .update(user)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteUser(id: string) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}