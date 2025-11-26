import { Box, Typography } from "@mui/material";
import GreenSection from "./components/GreenSection";
import Hero from "./components/Hero";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Hero />
      <GreenSection>
        <Box 
          display={"flex"} 
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          textAlign={{ xs: "left" }}
          gap={4}
        >
          <Typography 
            variant="h2"
            flex={{ md: 1 }}
          >
            Explore the book club of the month and join engaging discussions
          </Typography>
          <Box 
            sx={{ 
              position: "relative",
              width: { xs: "100%", sm: "80%", md: 400 },
              height: { xs: 250, sm: 300, md: 400 },
              flexShrink: 0
            }}
          >
            <Image 
              src="/book-sharing.png" 
              fill
              style={{ objectFit: "contain" }}
              alt="Book sharing illustration"
            />
          </Box>
        </Box>
      </GreenSection>
    </>
  );
}