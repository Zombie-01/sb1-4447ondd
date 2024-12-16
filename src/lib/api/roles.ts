import { supabase } from "../supabase";
import type { Database } from "../../types/supabase";

export type Role = Database["public"]["Tables"]["roles"]["Row"];

export async function getRoles() {
  const { data, error } = await supabase.from("Role").select("*");

  if (error) throw error;
  return data;
}
