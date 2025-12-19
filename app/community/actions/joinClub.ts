"use server";

import { createClient } from "@/lib/supabase/server";

export async function joinClub(clubId: string, clubUsername: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to join a club." };
  }

  const username = (clubUsername ?? "").trim();

  if (username.length < 2) {
    return { error: "Club username must be at least 2 characters." };
  }

  const { error } = await supabase.from("club_members").insert({
    club_id: clubId,
    user_id: user.id,
    role: "member",
    club_username: username,
  });

  if (error) {
    if (
      error.code === "23505" ||
      error.message.includes("unique_user_club_membership")
    ) {
      if (error.message.toLowerCase().includes("club_username")) {
        return { error: "That username is already taken in this club." };
      }
      return { error: "You are already a member of this club." };
    }

    return { error: error.message };
  }

  return { success: true };
}