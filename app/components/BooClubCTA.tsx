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
            order={{ xs: 2, md: 1 }}
            sx={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Typography variant="h2" color="text.secondary">
                Explore the book club of the month and join engaging discussions
              </Typography>
              <Button variant="outlined" size="large" sx={{
                width: "100%",
                maxWidth: 300,
                borderColor: "#F7ebd5",
                color: "#F7ebd5",
                borderWidth: 2,
                ":hover": {
                  backgroundColor: "#F7ebd5",
                  color: "#345728",
                },
              }}>Become a member</Button>
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            order={{ xs: 1, md: 2 }}
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
        </Grid>
      </Box>
    </GreenSection>
  );
}