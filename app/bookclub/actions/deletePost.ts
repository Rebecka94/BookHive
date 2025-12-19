"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deletePost(
  postId: string,
  clubId: string
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to delete a post." };
  }

  const { data: member } = await supabase
    .from("club_members")
    .select("id")
    .eq("club_id", clubId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!member) {
    return { error: "You must be a member of this club to delete a post." };
  }
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/bookclub/${clubId}`);

  return { success: true };
}
