"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type OLDoc = {
  key: string;
  cover_i?: number;
  first_publish_year?: number;
};

type BookResult = {
  id: string;
  coverImage: string;
};

type BrowseSectionProps = {
  genre: string;
  page: number;
};

export default function BrowseSection({ genre, page }: BrowseSectionProps) {
  const [books, setBooks] = useState<BookResult[]>([]);

  const LIMIT = 8;
  const offset = (page - 1) * LIMIT;

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        `https://openlibrary.org/search.json?subject=${genre}&limit=${LIMIT}&offset=${offset}`
      );
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
          })) || [];

      setBooks(mapped);
    };

    load();
  }, [genre, page]);

  return (
    <Box sx={{ mx: "auto", width: "92%" }}>
      <Box
        sx={{
          display: "grid",
          justifyItems: "center",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {books.map((book) => (
          <Box
            key={book.id}
            sx={{
              position: "relative",
              width: "70%",
              aspectRatio: "1 / 2",
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <Link href={`/browse/${book.id}`}>
              <Image
                src={book.coverImage}
                alt=""
                fill
                style={{ objectFit: "contain" }}
              />
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
