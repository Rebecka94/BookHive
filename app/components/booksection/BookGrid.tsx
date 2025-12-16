import { Box, Link } from "@mui/material";
import Image from "next/image";

type Book = {
  id: string;
  coverImage: string;
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
  );
}
