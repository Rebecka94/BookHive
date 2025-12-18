"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { useFavoritesStore } from "../stores/useFavoriteStore";

export default function LoadFavorites() {
  const supabase = createClient();
  const setFavorites = useFavoritesStore((s) => s.setFavorites);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("book_id, title, author, cover_url");

      if (error) {
        console.error("Error loading favorites:", error);
        return;
      }

      if (data) {
        setFavorites(
          data.map((f) => ({
            id: f.book_id,
            title: f.title,
            author: f.author,
            coverImage: f.cover_url,
          }))
        );
      }
    };

    load();
  }, [setFavorites, supabase]);

  return null;
}
