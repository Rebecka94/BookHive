"use server"

import { createClient } from "@/lib/supabase/server";

export async function joinClub(clubId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to join a club." };
  }

  const { error } = await supabase
    .from("club_members")
    .insert({
      club_id: clubId,
      user_id: user.id,
      role: "member",
    });

  if (error) {
    if (error.code === "23505" || error.message.includes("unique_user_club_membership")) {
      return { error: "You are already a member of this club." };
    }

    return { error: error.message };
  }

  return { success: true };
}