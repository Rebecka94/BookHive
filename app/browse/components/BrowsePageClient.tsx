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
        flexDirection: { xs: "column", lg: "row" },
        gap: { xs: 4, lg: 3 },
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 4, md: 6 },
        mb: 12,
        mt: 2,
        maxWidth: 1300,
    mx: "auto",     
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", lg: "30%" },
          flexShrink: 0,
        }}
      >
        <Typography variant="h2" sx={{ mb: 3 }}>
          Genres
        </Typography>

        <Card sx={{ border: "1px solid", borderColor: "divider", px: 3, py: 2 }}>
          <GenreSection value={selectedGenre} onChange={handleGenreChange} />
        </Card>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", lg: "60%" },
        }}
      >
        <Typography variant="h2" sx={{ mb: 3 }}>
          {selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)}
        </Typography>

        <Card sx={{ border: "1px solid", borderColor: "divider", px: 3, py: 2 }}>
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
