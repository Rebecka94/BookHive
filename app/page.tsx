import { Box } from "@mui/material";
import BooClubCTA from "./components/BooClubCTA";
import BookSection from "./components/BookSection";
import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BooClubCTA />
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 5 },
          py: 5,
        }}
      >
        <BookSection />
      </Box>
    </>
  );
}
