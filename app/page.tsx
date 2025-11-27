import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import GreenSection from "./components/GreenSection";
import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <GreenSection>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            textAlign: { xs: "left" },
            gap: 4,
            px: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h2">
              Explore the book club of the month and join engaging discussions
            </Typography>
            <Button
              variant="outlined"
              size="large"
              sx={{
                width: "100%",
                maxWidth: 300,
                borderColor: "#FFF8E9",
                color: "#FFF8E9",
                borderWidth: 2,
              }}
            >
              Become a member
            </Button>
          </Box>
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", sm: "80%", md: 400 },
              height: { xs: 250, sm: 300, md: 400 },
              flexShrink: 0,
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