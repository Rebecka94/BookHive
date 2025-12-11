"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Box } from "@mui/material";

export default function BookSection() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=subject:fantasy"
      );
      const data = await res.json();

      const mapped =
        data.items?.map((item: any) => ({
          id: item.id,
          coverImage: item.volumeInfo.imageLinks?.smallThumbnail,
        })) || [];

      setBooks(mapped);
    };

    load();
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(3, 1fr)",
          sm: "repeat(4, 1fr)",
          md: "repeat(6, 1fr)",
        },
        gap: 2,
      }}
    >
      {books.map((book: any) => (
        <Box
          key={book.id}
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "1/1.5",
            borderRadius: 1.5,
            overflow: "hidden",
          }}
        >
          <Image
            src={book.coverImage}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      ))}
    </Box>
  );
}
