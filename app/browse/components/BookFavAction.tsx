"use client";

import { Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useFavoritesStore } from "@/app/stores/useFavoriteStore";
import { createClient } from "@/lib/supabase/client";

interface Props {
  initialIsFavorite: boolean;
  book: {
    id: string;
    title: string;
    author: string;
    cover_url: string;
  };
}

export default function BookFavoriteAction({ book, initialIsFavorite }: Props) {
  const supabase = createClient();
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const alreadyFavorite = initialIsFavorite || isFavorite(book.id);

  const handleAdd = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
    if (alreadyFavorite) return;

    setIsSaving(true);
    toggleFavorite({
      id: book.id,
      title: book.title,
      author: book.author,
      coverImage: book.cover_url,
    });

    const { error } = await supabase.from("favorites").insert({
      user_id: user.id,
      book_id: book.id,
      title: book.title,
      author: book.author,
      cover_url: book.cover_url,
    });

    if (error) {
      toggleFavorite({
        id: book.id,
        title: book.title,
        author: book.author,
        coverImage: book.cover_url,
      });
      setIsSaving(false);
      return;
    }

    setIsSaving(false);
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="contained"
        disabled={alreadyFavorite || isSaving}
        onClick={handleAdd}
        sx={{ width: "100%", mt: 1 }}
      >
        {alreadyFavorite ? "Already in favorites" : isSaving ? "Saving..." : "Add to favorites"}
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Added to favorites ❤️
        </Alert>
      </Snackbar>
    </>
  );
}
