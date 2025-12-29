"use client";

import { createClient } from "@/lib/supabase/client";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { FavoriteBook, useFavoritesStore } from "../stores/useFavoriteStore";
import { useEffect, useState } from "react";

type Props = {
  book: FavoriteBook;
};

export default function FavoriteButton({ book }: Props) {
  const supabase = createClient();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, [supabase]);
  if (!userId) return null;

  const handleClick = async () => {
    const alreadyFavorite = isFavorite(book.id);
    toggleFavorite(book);

    if (!alreadyFavorite) {
      const { error } = await supabase.from("favorites").insert({
        user_id: userId,
        book_id: book.id,
        title: book.title,
        author: book.author,
        cover_url: book.coverImage,
      });

      if (error) {
        console.error("Insert favorite failed:", error);
        toggleFavorite(book);
      }
    } else {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("book_id", book.id);

      if (error) {
        console.error("Delete favorite failed:", error);
        toggleFavorite(book);
      }
    }
  };

  return (
    <IconButton onClick={handleClick} size="small" aria-label="Add to favorites">
      {isFavorite(book.id) ? (
        <FavoriteIcon color="error" />
      ) : (
        <FavoriteBorderIcon />
      )}
    </IconButton>
  );
}
