"use client";

import { Box, Button, Typography, Avatar } from "@mui/material";
import Link from "@mui/material/Link";
import type { User } from "@supabase/supabase-js";

type Props = {
  user: User | null;
  onOpenLogin: () => void;
  onSignOut: () => void;
};

export default function DesktopNav({ user, onOpenLogin, onSignOut }: Props) {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        gap: 4,
        alignItems: "center",
      }}
    >
      <Link aria-label="community link" href="/community" underline="hover">
        <Typography variant="body1" color="text.primary">
          Community
        </Typography>
      </Link>

      <Link aria-label="browse link" href="/browse" underline="hover">
        <Typography variant="body1" color="text.primary">
          Browse
        </Typography>
      </Link>

      {user && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link href="/profile">
          <Avatar 
            src={user.user_metadata?.avatar_url} 
            alt={user.user_metadata?.name}
            sx={{ width: 32, height: 32 }}
            />
            </Link>
        </Box>
      )}

      <Button
      aria-label="sign in/sign out button"
        variant="outlined"
        size="medium"
        sx={{
          borderColor: "#345b49",
          borderWidth: "2px",
          ":hover": {
            backgroundColor: "#345B49",
            color: "#F7EBD5",
          },
        }}
        onClick={user ? onSignOut : onOpenLogin}
      >
        {user ? "Sign Out" : "Sign In"}
      </Button>
    </Box>
  );
}