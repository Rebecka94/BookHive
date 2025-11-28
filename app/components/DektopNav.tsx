"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Box, Button, Typography } from "@mui/material";
import Link from "@mui/material/Link";

type Props = {
  onOpenLogin: () => void;
};

export default function DesktopNav({ onOpenLogin }: Props) {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        gap: 4,
        alignItems: "center",
      }}
    >
      <Link href="/community" underline="hover">
        <Typography variant="body1" color="text.primary">
          Community
        </Typography>
      </Link>

      <Link href="/browse" underline="hover">
        <Typography variant="body1" color="text.primary">
          Browse
        </Typography>
      </Link>

      <Button
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
        onClick={session?.user ? handleSignOut : onOpenLogin}
      >
        {session?.user ? "Sign Out" : "Sign In"}
      </Button>
    </Box>
  );
}
