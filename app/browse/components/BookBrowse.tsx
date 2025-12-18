"use client";

import FavoriteButton from "@/app/components/FavoriteButton";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type OLDoc = {
  key: string;
  cover_i?: number;
  first_publish_year?: number;
  author_name?: string[];
  title?: string;
};

type BookResult = {
  id: string;
  coverImage: string;
  author: string;
  title: string;
};

type BrowseSectionProps = {
  genre: string;
  page: number;
  searchQuery: string;
};

export default function BrowseSection({
  genre,
  page,
  searchQuery,
}: BrowseSectionProps) {
  const [books, setBooks] = useState<BookResult[]>([]);

  const LIMIT = 8;
  const offset = (page - 1) * LIMIT;

  useEffect(() => {
    const load = async () => {
      let url = `https://openlibrary.org/search.json?subject=${genre}&limit=${LIMIT}&offset=${offset}`;

      if (searchQuery && searchQuery.length > 0) {
        url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
          searchQuery
        )}&subject=${genre}&limit=${LIMIT}&offset=${offset}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const mapped =
        (data.docs as OLDoc[])
          ?.filter((item) => item.cover_i && item.first_publish_year)
          .sort(
            (a, b) => (b.first_publish_year ?? 0) - (a.first_publish_year ?? 0)
          )
          .map((item) => ({
            id: item.key.replace("/works/", ""),
            coverImage: `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`,
            author: item.author_name?.[0] || "Unknown Author",
            title: item.title || "Untitled",
          })) || [];

      setBooks(mapped);
    };

    load();
  }, [genre, page, searchQuery, offset]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          justifyItems: "center",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {books.map((book) => (
          <Box
            key={book.id}
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "2 / 3",
                overflow: "hidden",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                },
              }}
            >
              <Link href={`/browse/${book.id}`}>
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  sizes="(min-width: 1200px) 20vw, (min-width: 900px) 25vw, (min-width: 600px) 33vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </Link>
            </Box>
            <Box sx={{ mt: 1, textAlign: "left" }}>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.875rem", fontStyle: "italic" }}
              >
                Author: {book.author}
              </Typography>
              <FavoriteButton
                book={{
                  id: book.id,
                  title: book.title,
                  author: book.author,
                  coverImage: book.coverImage,
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
