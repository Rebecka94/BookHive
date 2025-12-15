"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updatePost(
  postId: string,
  clubId: string,
  data: {
    title: string;
    content: string;
  }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update a post." };
  }

  const { error } = await supabase
    .from("posts")
    .update({
      title: data.title,
      content: data.content,
    })
    .eq("id", postId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/bookclub/${clubId}`);

  return { success: true };
}
