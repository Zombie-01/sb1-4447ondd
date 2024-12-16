import { supabase } from "../supabase";
import type { Database } from "../../types/supabase";

export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type CustomerInput = Database["public"]["Tables"]["customers"]["Insert"];

export async function getCustomers() {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}

export async function getCustomer(id: string) {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createCustomer(customer: CustomerInput) {
  const { data, error } = await supabase
    .from("customers")
    .insert(customer)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCustomer(
  id: string,
  customer: Partial<CustomerInput>
) {
  const { data, error } = await supabase
    .from("customers")
    .update(customer)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function toggleCustomerActive(
  id: string,
  isActive: boolean
): Promise<void> {
  const { error } = await supabase
    .from("customers")
    .update({ is_active: !isActive })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to toggle customer active state: ${error.message}`);
  }
}

export async function deleteCustomer(id: string) {
  const { error } = await supabase.from("customers").delete().eq("id", id);

  if (error) throw error;
}
