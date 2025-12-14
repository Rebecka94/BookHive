"use client"

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import GreenSection from "./GreenSection";

export default function BookClubCTA() {
  return (
    <GreenSection>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid 
            size={{ xs: 12, md: 6 }}
            order={{ xs: 1, md: 1 }}
            sx={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <Stack spacing={4} sx={{ width: "100%" }}>
              <Typography variant="h2" color="text.secondary" sx={{ maxWidth: 600 }}>
                Explore different bookclubs and join engaging discussions
              </Typography>
              <Box 
                order={{ xs: 3, md: 2 }}
                sx={{ 
                  display: { xs: "none", md: "block" }
                }}
              >
                <Button variant="outlined" size="large" href="/community" sx={{
                  width: "100%",
                  maxWidth: 300,
                  borderColor: "#F7ebd5",
                  color: "#F7ebd5",
                  borderWidth: 2,
                  ":hover": {
                    backgroundColor: "#F7ebd5",
                    color: "#345728",
                  },
                }}>Explore bookclubs</Button>
              </Box>
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            order={{ xs: 2, md: 2 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
              alignItems: "center",
            }}
          >
            <Box sx={{ 
              width: "100%", 
              height: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-start", md: "flex-end" }
            }}>
              <Image
                src="/book-sharing.png"
                alt="book sharing img"
                width={500}
                height={100}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
          <Grid 
            size={{ xs: 12 }}
            order={{ xs: 3 }}
            sx={{ 
              display: { xs: "block", md: "none" }
            }}
          >
            <Button href="/community" variant="outlined" size="large" sx={{
              width: "100%",
              maxWidth: 500,
              borderColor: "#F7ebd5",
              color: "#F7ebd5",
              borderWidth: 2,
              ":hover": {
                backgroundColor: "#F7ebd5",
                color: "#345728",
              },
            }}>Explore bookclubs</Button>
          </Grid>
        </Grid>
      </Box>
    </GreenSection>
  );
}