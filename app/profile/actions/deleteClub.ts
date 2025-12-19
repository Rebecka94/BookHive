"use server";

import { createClient } from "@/lib/supabase/server";

export async function deleteClub(clubId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  const { data: club, error: fetchError } = await supabase
    .from("book_clubs")
    .select("creator_id")
    .eq("id", clubId)
    .single();

  if (fetchError || !club) {
    return { error: "Club not found." };
  }

  if (club.creator_id !== user.id) {
    return { error: "You are not allowed to delete this club." };
  }

  console.log("Attempting delete for user:", user.id, "club:", clubId);
  
  const { error: deleteError } = await supabase
    .from("book_clubs")
    .delete()
    .eq("id", clubId);

  if (deleteError) {
    console.log("Delete failed:", deleteError);
    return { error: deleteError.message };
  }

  console.log("Delete succeeded");
  return { success: true };
}