import { supabase } from "../supabase";
import type { Database } from "../../types/supabase";

export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type CustomerInput = Database["public"]["Tables"]["customers"]["Insert"];

export async function getCustomers({
  startDate,
  endDate,
  page = 1,
  limit = 10,
  searchTerm
}: {
  startDate?: string;
  searchTerm?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}) {
  const from = (page - 1) * limit; // Calculate starting index for pagination
  const to = from + limit - 1; // Calculate ending index for pagination

  let query = supabase.from("customers").select("*", { count: "exact" });
  if (searchTerm) {
    query = query.ilike("name", `%${searchTerm}%`);
  } // Enable total count

  if (startDate) {
    query = query.gte("created_at", startDate); // 'gte' = greater than or equal
  }
  if (endDate) {
    query = query.lte("created_at", endDate); // 'lte' = less than or equal
  }

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    customers: data,
    total: count,
    currentPage: page,
    totalPages: Math.ceil((count || 0) / limit)
  };
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
