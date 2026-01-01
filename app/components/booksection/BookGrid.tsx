import { Box, Link, Typography } from "@mui/material";
import Image from "next/image";
import FavoriteButton from "../FavoriteButton";

type Book = {
  id: string;
  coverImage: string;
  author: string;
  title: string;
};

type Props = {
  books: Book[];
};

export function BookGrid({ books }: Props) {
  return (
    <Box
      sx={{
        display: "grid",
        justifyItems: "center",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        columnGap: 2,
        rowGap: 3,
      }}
    >
      {books.map((book) => (
        <Box
          key={book.id}
          sx={{
            width: "80%",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "2 / 3",
              overflow: "hidden",
              borderRadius: 1,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Link href={`/browse/${book.id}`}>
              <Image
                src={book.coverImage}
                alt={`Book Cover of ${book.title}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </Link>
          </Box>
          <Typography
            variant="body2"
            sx={{
              mt: 0.75,
              fontStyle: "italic",
            }}
          >
            Author: {""}
            {book.author}
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
      ))}
    </Box>
  );
}
