"use client";

import { useFavoritesStore } from "@/app/stores/useFavoriteStore";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  const favorites = Object.values(useFavoritesStore((s) => s.favorites));

  if (favorites.length === 0) return null;

  return (
    <Box sx={{ mb: 2 }}>
      <FormControl
        fullWidth
        size="small"
        sx={{
          "& .MuiInputLabel-root": {
            color: "text.primary",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "text.primary",
          },
          "& .MuiOutlinedInput-input": {
            color: "text.primary",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "text.primary",
          },
        }}
      >
        <InputLabel htmlFor="favorite-book">Choose a favorite book</InputLabel>

        <Select
          label="Choose a favorite book"
          inputProps={{ id: "favorite-book" }}
          value={selectedBook?.id ?? ""}
          onChange={(e) => {
            const fav = favorites.find((b) => b.id === e.target.value);

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
          <MenuItem value="">
            <em>Select a favorite book</em>
          </MenuItem>

          {favorites.map((book) => (
            <MenuItem key={book.id} value={book.id}>
              {book.title} — {book.author}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
