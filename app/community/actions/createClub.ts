"use server";

import { createClient } from "@/lib/supabase/server";

export async function createBookClub(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to create a book club." };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image_url = formData.get("image_url") as string;

  const { data: club, error: clubError } = await supabase
    .from("book_clubs")
    .insert({
      name,
      description,
      image_url,
      creator_id: user.id,
    })
    .select()
    .single();

  if (clubError || !club) {
    return { error: clubError?.message ?? "Failed to create club." };
  }

  const { error: memberError } = await supabase
    .from("club_members")
    .insert({
      club_id: club.id,
      user_id: user.id,
      role: "creator",
      club_username: "Admin",
    });

  if (memberError) {
    return { error: memberError.message };
  }

  return { data: club };
}
