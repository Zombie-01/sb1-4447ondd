import { supabase } from "../supabase";
import type { Database } from "../../types/supabase";

export type Payment = Database["public"]["Tables"]["payment"]["Row"];
export type PaymentInput = Database["public"]["Tables"]["payment"]["Insert"];

export async function getPayments({
  userId,
  startDate,
  endDate,
  searchTerm,
  page = 1,
  limit = 10
}: {
  userId?: string;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}) {
  const from = (page - 1) * limit; // Calculate starting index for pagination
  const to = from + limit - 1;

  let query = supabase
    .from("payment")
    .select(`*, customers(name, company_name)`) // Include user details
    .range(from, to);

  if (userId) {
    query = query.eq("user_id", userId);
  }

  if (startDate && endDate) {
    query = query.gte("payment_date", startDate).lte("payment_date", endDate);
  }

  if (searchTerm) {
    query = query.ilike("notes", `%${searchTerm}%`);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    payment: data,
    total: count,
    currentPage: page,
    totalPages: Math.ceil((count || 0) / limit)
  };
}

export async function getPayment(id: string) {
  const { data, error } = await supabase
    .from("payment")
    .select(`*, customers(name, company_name)`) // Include user details
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createPayment(payment: PaymentInput) {
  const { data, error } = await supabase
    .from("payment")
    .insert(payment)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePayment(
  id: string,
  payment: Partial<PaymentInput>
) {
  const { data, error } = await supabase
    .from("payment")
    .update(payment)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePayment(id: string) {
  const { error } = await supabase.from("payment").delete().eq("id", id);

  if (error) throw error;
}
