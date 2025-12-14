"use client";

import { Box, Link, Typography } from "@mui/material";
import Image from "next/image";
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

export default function BookSection() {
  const [books, setBooks] = useState<BookResult[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        "https://openlibrary.org/search.json?subject=romantasy&limit=8"
      );
      const data = await res.json();

      const mapped =
        (data.docs as OLDoc[])
          ?.filter((item) => item.cover_i && item.first_publish_year)
          .sort(
            (a, b) => (b.first_publish_year ?? 0) - (a.first_publish_year ?? 0)
          )
          .slice(0, 8)
          .map((item) => ({
            id: item.key.replace("/works/", ""),
            coverImage: `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`,
          })) || [];

      setBooks(mapped);
    };

    load();
  }, []);

  return (
    <Box
      sx={{
        mx: "auto",
        px: { xs: 2, sm: 4 },
        py: 5,
        width: "92%",
        borderRadius: 2,
        mt: 15,
      }}
      bgcolor="background.paper"
      border="1.5px solid"
        borderColor="divider"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Trending books</Typography>
        <Link
          href="/browse"
          sx={{
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Read more →
        </Link>
      </Box>
      <Box
        sx={{
          display: "grid",
          justifyItems: "center",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
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
              mx: "auto",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
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
