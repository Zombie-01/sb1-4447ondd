import { supabase } from "../supabase";
import type { Database } from "../../types/supabase";

export type Logistic = Database["public"]["Tables"]["logistic"]["Row"];
export type LogisticInput = Database["public"]["Tables"]["logistic"]["Insert"];

export async function getLogistics({
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

  let query = supabase.from("logistic").select("*", { count: "exact" });
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
    logistics: data,
    total: count,
    currentPage: page,
    totalPages: Math.ceil((count || 0) / limit)
  };
}

export async function getLogistic(id: string) {
  const { data, error } = await supabase
    .from("logistic")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createLogistic(logistic: LogisticInput) {
  const { data, error } = await supabase
    .from("logistic")
    .insert(logistic)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateLogistic(
  id: string,
  logistic: Partial<LogisticInput>
) {
  const { data, error } = await supabase
    .from("logistic")
    .update(logistic)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function toggleLogisticActive(
  id: string,
  isActive: boolean
): Promise<void> {
  const { error } = await supabase
    .from("logistic")
    .update({ is_active: !isActive })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to toggle logistic active state: ${error.message}`);
  }
}

export async function deleteLogistic(id: string) {
  const { error } = await supabase.from("logistic").delete().eq("id", id);

  if (error) throw error;
}
