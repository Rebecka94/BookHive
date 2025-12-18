"use client";

import { createClient } from "@/lib/supabase/client";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { FavoriteBook, useFavoritesStore } from "../stores/useFavoriteStore";

type Props = {
  book: FavoriteBook;
};

export default function FavoriteButton({ book }: Props) {
  const supabase = createClient();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const handleClick = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("No user logged in", userError);
      return;
    }

    const alreadyFavorite = isFavorite(book.id);
    toggleFavorite(book);

    if (!alreadyFavorite) {
      const { error } = await supabase.from("favorites").insert({
        user_id: user.id,
        book_id: book.id,
        title: book.title,
        author: book.author,
        cover_url: book.coverImage,
      });

      if (error) {
        console.error("Insert favorite failed:", error);
        toggleFavorite(book);
      }
    }

    else {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("book_id", book.id);

      if (error) {
        console.error("Delete favorite failed:", error);
        toggleFavorite(book);
      }
    }
  };

  return (
    <IconButton onClick={handleClick} size="small">
      {isFavorite(book.id) ? (
        <FavoriteIcon color="error" />
      ) : (
        <FavoriteBorderIcon />
      )}
    </IconButton>
  );
}
