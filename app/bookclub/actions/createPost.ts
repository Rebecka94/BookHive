"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface BookData {
  id: string;
  title: string;
  author?: string;
  cover_url?: string;
  description?: string;
  first_publish_year?: number;
}

export async function createPost(
  clubId: string, 
  title: string, 
  content: string,
  bookData?: BookData
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to post." };
  }

  const { data: member } = await supabase
    .from("club_members")
    .select("*")
    .eq("club_id", clubId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!member) {
    return { error: "You must be a member to post." };
  }

  let bookId = null;

  if (bookData) {
    const { data: existingBook } = await supabase
      .from("books")
      .select("id")
      .eq("id", bookData.id)
      .maybeSingle();

    if (!existingBook) {
      const { error: bookError } = await supabase
        .from("books")
        .insert({
          id: bookData.id,
          title: bookData.title,
          author: bookData.author || null,
          cover_url: bookData.cover_url || null,
          description: bookData.description || null,
          first_publish_year: bookData.first_publish_year || null,
        });

      if (bookError) {
        console.error("Error saving book:", bookError);
      }
    }
    
    bookId = bookData.id;
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      content,
      club_id: clubId,
      author_id: user.id,
      book_id: bookId,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/bookclub/${clubId}`);

  return { data };
}