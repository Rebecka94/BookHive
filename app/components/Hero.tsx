"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export default function Hero() {
  return (
    <Box sx={{ py: { xs: 4, sm: 6 }, mb: 4, width: "100%" }}>
      <Box
        sx={{
          px: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" maxWidth={700}>
          <span className="text-black">Reading together is more fun with</span>{" "}
          BookHive 🐝
        </Typography>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "280px", md: "370px" },
          }}
        >
          <Image
            priority
            src="/hero-img.png"
            alt="Group of people sitting together reading books in a book club"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mt: 4,
            mb: 4,
            width: "100%",
            maxWidth: "450px",
            justifyContent: "center"
          }}
        >
          <Button
            variant="contained"
            size="large"
            aria-label="Explore books from hero section"
            sx={{
              backgroundColor: "#992B15",
              width: { xs: "100%", md: "auto" },
            }}
            href="/browse"
          >
            Explore books
          </Button>

          <Button
            variant="outlined"
            size="large"
            aria-label="Explore book clubs from hero section"
            sx={{
              width: { xs: "100%", md: "auto" },
              borderColor: "#992B15",
              color: "#992B15",
              borderWidth: 2,
              ":hover": {
                backgroundColor: "#992B15",
                color: "#F7EBD5",
              },
            }}
            href="/community"
          >
            Discover book clubs
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
