"use client";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      color="secondary.main"
      py={4}
    >
      <Box maxWidth="1200px" mx="auto" textAlign="center">
        <Typography variant="body2">
          &copy; {year} BookHive. All rights reserved.
        </Typography>

        <Box display="flex" justifyContent="center" gap={4} mt={2}></Box>
      </Box>
    </Box>
  );
}
