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
            src="/hero-img.png"
            alt="Hero Image"
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
            maxWidth: "400px",
          }}
        >
          <Button
            variant="contained"
            size="large"
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
          >
            Become a member
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
