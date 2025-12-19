import { Typography } from "@mui/material";
import BooClubCTA from "./components/BooClubCTA";
import BookSection from "./components/booksection/BookSection";
import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BooClubCTA />
      <Typography
        variant="h2"
        sx={{ mt: 10, mb: 3, textAlign: "center", mx: "auto" , maxWidth: { xs: 500 ,lg: 600 }}}
      >
        Fall into stories you don’t want to leave 🐝
      </Typography>
      <BookSection />
    </>
  );
}
