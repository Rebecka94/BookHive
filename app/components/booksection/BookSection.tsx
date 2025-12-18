"use client"

import { Box, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BookGrid } from "./BookGrid";
import { GenreChips } from "./GenreChips";
import { PaginationControls } from "./PaginationControls";

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

const genres = [
  "Romantasy",
  "Fantasy",
  "Romance",
  "Science Fiction",
  "Mystery",
];

const MAX_PAGES = 10;
const LIMIT = 4;

export default function BookSection() {
  const [books, setBooks] = useState<BookResult[]>([]);
  const [genre, setGenre] = useState("Romantasy");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        `https://openlibrary.org/search.json?subject=${encodeURIComponent(
          genre.toLowerCase()
        )}&limit=${LIMIT}&page=${page}`
      );
      const data = await res.json();

      const mapped = (data.docs as OLDoc[])
        ?.filter((item) => item.cover_i && item.first_publish_year)
        .map((item) => ({
          id: item.key.replace("/works/", ""),
          coverImage: `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`,
          author: item.author_name?.[0] || "Unknown Author",
          title: item.title || "Untitled", // ✅
        }));

      setBooks(mapped);
      setTotalPages(Math.min(Math.ceil(data.numFound / LIMIT), MAX_PAGES));
    };

    load();
  }, [genre, page]);

  return (
    <Box
      sx={{
        mx: "auto",
        px: { xs: 2, sm: 4 },
        py: 5,
        width: "92%",
        borderRadius: 2,
        mt: 15,
        mb: 18,
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
        <Typography variant="h3">{genre}</Typography>
        <Link href="/browse" sx={{ textDecoration: "none" }}>
          Read more →
        </Link>
      </Box>

      <GenreChips
        genres={genres}
        activeGenre={genre}
        onSelect={(g) => {
          setGenre(g);
          setPage(1);
        }}
      />

      <BookGrid books={books} />

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </Box>
  );
}
