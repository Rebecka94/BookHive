"use client";
import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function GoogleButton() {
  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      startIcon={<Google />}
      sx={{
        py: 1.5,
        textTransform: "none",
        fontSize: "1rem",
      }}
    >
      Sign in with Google
    </Button>
  );
}
