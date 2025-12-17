"use client";

import { Box, Card, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import BrowseSection from "./BookBrowse";
import GenreSection from "./GenreSection";

export default function BrowsePageClient() {
  const [selectedGenre, setSelectedGenre] = useState("fantasy");
  const [page, setPage] = useState(1);

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setPage(1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 4, md: 6 },
        mb: 12,
        mt: 2,
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "25%" }, flexShrink: 0 }}>
        <Card sx={{ border: "1px solid", borderColor: "divider", px: 3, py: 2 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Genres
          </Typography>
          <GenreSection value={selectedGenre} onChange={handleGenreChange} />
        </Card>
      </Box>

      <Box sx={{ width: { xs: "100%", md: "75%" } }}>
        <Card sx={{ border: "1px solid", borderColor: "divider", px: 3, py: 2 }}>
          <Typography variant="h3" sx={{ mb: 3 }}>
            {selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)}
          </Typography>

          <BrowseSection genre={selectedGenre} page={page} />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={10}
              page={page}
              onChange={(_, value) => setPage(value)}
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
