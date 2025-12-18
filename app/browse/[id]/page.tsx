import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

type BookDetails = {
  title: string;
  authors: string[];
  description: string;
  coverId: number;
  firstPublishYear: number;
};

async function getBookDetails(id: string): Promise<BookDetails | null> {
  try {
    const res = await fetch(`https://openlibrary.org/works/${id}.json`);
    if (!res.ok) return null;
    const data = await res.json();

    let authors: string[] = [];
    if (data.authors?.length) {
      authors = await Promise.all(
        data.authors.map(async (a: { author: { key: string } }) => {
          const res = await fetch(
            `https://openlibrary.org${a.author.key}.json`
          );
          const author = await res.json();
          return author.name;
        })
      );
    }

    return {
      title: data.title ?? "Unknown Title",
      authors: authors.length ? authors : ["Unknown Author"],
      description:
        typeof data.description === "string"
          ? data.description
          : data.description?.value ?? "No description available.",
      coverId: data.covers?.[0] ?? 0,
      firstPublishYear: data.first_publish_date
        ? new Date(data.first_publish_date).getFullYear()
        : 0,
    };
  } catch {
    return null;
  }
}

export default async function BrowseIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookDetails(id);

  if (!book) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">Book not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        py: { xs: 4, sm: 6 },
        px: { xs: 5, sm: 6 },
        mb: 12,
        mt: 6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 8 },
        }}
      >
        <Box sx={{ width: { xs: "90%", sm: "80%" , md: 260 }, flexShrink: 0 }}>
          <Box
            sx={{
              position: "relative",
              aspectRatio: "2 / 3",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 2,
            }}
          >
            {book.coverId ? (
              <Image
                src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                alt={book.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            ) : (
              <Box
                sx={{
                  height: "100%",
                  bgcolor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2">No cover available</Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "100%",
          }}
        >
          <Box>
            <Typography variant="h3">{book.title}</Typography>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              {book.authors.join(", ")}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="caption"
              sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
            >
              Description
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
              {book.description}
            </Typography>
          </Box>

          <Box sx={{ maxWidth: 320 }}>
            <Button variant="contained" sx={{ width: "100%", mt: 1 }}>
              Add to favorites
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
