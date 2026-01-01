"use client";

import { FavoriteBook, useFavoritesStore } from "@/app/stores/useFavoriteStore";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { deleteFavorite } from "../actions/favorites";

export default function FavoriteBooksList() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const favoriteList = Object.values(favorites);

  const handleRemove = async (book: FavoriteBook) => {
    toggleFavorite(book);

    try {
      await deleteFavorite(book);
    } catch (error) {
      console.error("Failed to delete favorite:", error);
      toggleFavorite(book);
    }
  };

  if (favoriteList.length === 0) {
    return (
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h3" sx={{ mb: 3 }}>
            Favorite Books
          </Typography>
          <Typography variant="body2">
            You haven’t added any favorites yet.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Favorite Books
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {favoriteList.map((book, index) => (
            <Box key={book.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      position: "relative",
                      width: 32,
                      height: 48,
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={book.coverImage}
                      alt={`Book cover and link for ${book.title}`}
                      fill
                      style={{ objectFit: "cover", borderRadius: 4 }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body1">{book.title}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontStyle: "italic", mt: 0.5 }}
                    >
                      {book.author}
                    </Typography>
                  </Box>
                </Box>

                <IconButton
                  aria-label="close button"
                  size="small"
                  onClick={() => handleRemove(book)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              {index < favoriteList.length - 1 && <Divider sx={{ mt: 1.5 }} />}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
