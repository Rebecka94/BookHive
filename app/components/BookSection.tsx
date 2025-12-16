"use client";

import { Box, Link, Typography, Pagination } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

type OLDoc = {
  key: string;
  cover_i?: number;
  first_publish_year?: number;
  author_name?: string[];
};

type BookResult = {
  id: string;
  coverImage: string;
};

export default function BookSection() {
  const [books, setBooks] = useState<BookResult[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 4;

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        `https://openlibrary.org/search.json?subject=romantasy&limit=${limit}&page=${page}`
      );
      const data = await res.json();

      const mapped =
        (data.docs as OLDoc[])
          ?.filter((item) => item.cover_i && item.first_publish_year)
          .map((item) => ({
            id: item.key.replace("/works/", ""),
            coverImage: `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`,
          })) || [];

      setBooks(mapped);
      setTotalPages(Math.ceil(data.numFound / limit));
    };

    load();
  }, [page]);

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
          px: 3.5,
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

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          page={page}
          count={totalPages}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}
