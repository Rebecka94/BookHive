import { Box, Card, Typography } from "@mui/material";
import BrowseSection from "./components/BookBrowse";
import GenreSection from "./components/GenreSection";

export default function BrowsePage() {
  return (
    <>
      <Typography variant="h2" sx={{ mb: 2, px: { xs: 2, sm: 3, md: 5 } }}>
        Welcome to the Browse page
      </Typography>

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
            <GenreSection />
          </Card>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "75%" } }}>
          <Card sx={{ px: 3, py: 2 }}>
            <Typography variant="h3" sx={{}}>
              Fantasy
            </Typography>
            <BrowseSection />
          </Card>
        </Box>
      </Box>
    </>
  );
}
