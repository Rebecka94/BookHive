"use client";

import { createClient } from "@/lib/supabase/client";
import { FavoriteBook } from "@/app/stores/useFavoriteStore";

export async function deleteFavorite(book: FavoriteBook) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("No user logged in");
  }

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("book_id", book.id);

  if (error) {
    throw error;
  }
}
