"use client";

import { Box, Card, Typography } from "@mui/material";
import { useState } from "react";
import BrowseSection from "./BookBrowse";
import GenreSection from "./GenreSection";

export default function BrowsePageClient() {
  const [selectedGenre, setSelectedGenre] = useState("fantasy");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          px: { xs: 2, sm: 3, md: 5 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "25%" },
            flexShrink: 0,
          }}
        >
          <Card sx={{ px: 3, py: 2 }}>
            <Typography variant="h4">Genres</Typography>
            <GenreSection value={selectedGenre} onChange={setSelectedGenre} />
          </Card>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "75%" } }}>
          <Card sx={{ px: 3, py: 2 }}>
            <Typography variant="h3">
              {selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)}
            </Typography>
            <BrowseSection genre={selectedGenre} />
          </Card>
        </Box>
      </Box>
    </>
  );
}
