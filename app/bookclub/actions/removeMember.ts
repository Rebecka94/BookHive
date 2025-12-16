"use server";

import { createClient } from "@/lib/supabase/server";

export async function removeMember(clubId: string, userId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  if (user.id === userId) {
    return { error: "You cannot remove yourself from the club." };
  }

  const { error } = await supabase
    .from("club_members")
    .delete()
    .eq("club_id", clubId)
    .eq("user_id", userId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
