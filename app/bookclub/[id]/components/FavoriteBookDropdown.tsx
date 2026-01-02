"use client";

import {
  Box,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useFavoritesStore } from "@/app/stores/useFavoriteStore";

interface Book {
  id: string;
  title: string;
  author?: string;
  cover_url?: string;
}

interface Props {
  onSelectBook: (book: Book | null) => void;
  selectedBook: Book | null;
}

export default function FavoriteBookDropdown({
  onSelectBook,
  selectedBook,
}: Props) {
  const favorites = Object.values(
    useFavoritesStore((s) => s.favorites)
  );

  if (favorites.length === 0) return null;

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        ⭐ Choose from your favorites
      </Typography>

      <Select
      label="Choose a favorite book"
      id="favorite-book"
        fullWidth
        size="small"
        displayEmpty
        value={selectedBook?.id ?? ""}
        onChange={(e) => {
          const fav = favorites.find(
            (b) => b.id === e.target.value
          );

          if (!fav) {
            onSelectBook(null);
            return;
          }

          onSelectBook({
            id: fav.id,
            title: fav.title,
            author: fav.author,
            cover_url: fav.coverImage,
          });
        }}
      >
        <MenuItem aria-label="test" value="">
          <em>Select a favorite book</em>
        </MenuItem>

        {favorites.map((book) => (
          <MenuItem key={book.id} value={book.id}>
            {book.title} — {book.author}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
