import { supabase } from "../supabase";
import type { Database } from "../../types/supabase";

export type User = Database["public"]["Tables"]["User"]["Row"];
export type UserInput = Database["public"]["Tables"]["User"]["Insert"];

export async function getUsers({
  role,
  page = 1,
  limit = 10,
  searchTerm
}: {
  role?: string;
  searchTerm: string;
  page?: number;
  limit?: number;
}) {
  const from = (page - 1) * limit; // Calculate starting index for pagination
  const to = from + limit - 1;
  let query = supabase.from("User").select(`
      *,
      Role (
        id,
        name
      )
    `);

  if (searchTerm) {
    query = query.ilike("firstname", `%${searchTerm}%`);
  }

  if (role) {
    query = query.eq("role_id", role); // Filter by role_id if provided
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

export async function getUser(id: string) {
  const { data, error } = await supabase
    .from("User")
    .select(
      `
      *,
      Role (
        id,
        name
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createUser(formdata: { user: UserInput; avatar: File }) {
  try {
    const { data: imageData, error: uploadError } = await supabase.storage
      .from("profile")
      .upload(
        `profiles/${Date.now()}_${formdata?.avatar.name}`,
        formdata?.avatar
      );

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from("profile")
      .getPublicUrl(imageData.path);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar, ...userWithoutAvatar } = formdata;

    const userWithImage = {
      ...userWithoutAvatar,
      profile_img: publicUrlData.publicUrl // Ensure `profile_img` exists in your database
    };

    console.log(userWithImage);

    const { data, error } = await supabase
      .from("User")
      .insert(userWithImage)
      .select()
      .single();

    if (error) throw error;
    await supabase.auth.signUp({
      email: formdata.user?.email,
      password: formdata.user?.password
    });
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser(id: string, user: Partial<UserInput>) {
  const { data, error } = await supabase
    .from("User")
    .update(user)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from("User").delete().eq("id", id);

  if (error) throw error;
}
