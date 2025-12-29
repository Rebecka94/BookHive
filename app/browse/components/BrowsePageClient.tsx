"use client";

import { Box, Pagination, TextField, Typography } from "@mui/material";
import { useState } from "react";
import BrowseSection from "./BookBrowse";
import GenreSection from "./GenreSection";

export default function BrowsePageClient() {
  const [selectedGenre, setSelectedGenre] = useState("fantasy");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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
          display: { xs: "none", lg: "block" },
        }}
      >
        <Typography variant="h2" sx={{ mb: 3 }}>
          Genres
        </Typography>

        <GenreSection value={selectedGenre} onChange={handleGenreChange} />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", lg: "70%" },
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: "space-between",
            mb: 3,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h2">
            {selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)}
          </Typography>

          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              gap: 2,
              flex: 1,
              minWidth: 0,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box sx={{ width: "100%" }}>
              <GenreSection
                value={selectedGenre}
                onChange={handleGenreChange}
              />
            </Box>

            <TextField
            label="search books"
              placeholder="Search books..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: "100%" }}
            />
          </Box>

          <Box sx={{ display: { xs: "none", lg: "block" }, minWidth: 250 }}>
            <TextField
            label="search books"
              placeholder="Search books..."
              variant="outlined"
              size="small"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </Box>

        <BrowseSection
          genre={selectedGenre}
          page={page}
          searchQuery={searchQuery}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={10}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      </Box>
    </Box>
  );
}
