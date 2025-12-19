"use server";

import { createClient } from "@/lib/supabase/server";

export async function leaveClub(clubId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  const { data: club } = await supabase
    .from("book_clubs")
    .select("creator_id")
    .eq("id", clubId)
    .single();

  if (!club) {
    return { error: "Club not found." };
  }

  if (club.creator_id === user.id) {
    return { error: "Creators cannot leave their own club." };
  }

  const { error } = await supabase
    .from("club_members")
    .delete()
    .eq("club_id", clubId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
