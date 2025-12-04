"use server";

import { createClient } from "@/lib/supabase/server";

export async function createBookClub(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to create a book club." };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const { data, error } = await supabase
    .from("book_clubs")
    .insert({
      name,
      description,
      creator_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data };
}
