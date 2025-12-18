"use client";

import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import Image from "next/image";

const favoriteBooks = [
  {
    id: "1",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: "https://covers.openlibrary.org/b/id/6979861-S.jpg",
  },
  {
    id: "2",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "https://covers.openlibrary.org/b/id/8231856-S.jpg",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    cover: "https://covers.openlibrary.org/b/id/7222246-S.jpg",
  },
];

export default function FavoriteBooksList() {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Favorite Books
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {favoriteBooks.map((book, index) => (
            <Box key={book.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 32,
                    height: 48,
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    style={{ objectFit: "cover", borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {book.title}
                  </Typography>
                  <Typography variant="caption">
                    {book.author}
                  </Typography>
                </Box>
              </Box>

              {index < favoriteBooks.length - 1 && (
                <Divider sx={{ mt: 1.5 }} />
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
