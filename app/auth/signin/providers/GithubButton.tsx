"use client";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "@mui/material";

interface GithubButtonProps {
  onClick: () => void;
}

export default function GithubButton({ onClick }: GithubButtonProps) {
  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      startIcon={<GitHubIcon />}
      onClick={onClick}
      sx={{
        py: 1.5,
        textTransform: "none",
        fontSize: "1rem",
        color: "#ffffff",
        backgroundColor: "#24292e",
        "&:hover": {
          backgroundColor: "#1a1e22",
        },
      }}
    >
      Sign in with GitHub
    </Button>
  );
}