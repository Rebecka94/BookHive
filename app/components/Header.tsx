"use client";

import { Box, Typography, Button, Avatar, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import LoginDialog from "./signin/LoginDialog";

export default function Header() {
  const { data: session } = useSession();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenLoginDialog = () => {
    setLoginDialogOpen(true);
  };

  const handleCloseLoginDialog = () => {
    setLoginDialogOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut();
    handleMenuClose();
  };

  return (
    <>
      <header>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          maxWidth="1200px"
          mx="auto"
          py={2}
          px={3}
        >
          <Link href="/">
            <Image
              src="/bookhive-logo.png"
              alt="BookHive Logo"
              width={150}
              height={50}
            />
          </Link>

          <Box component="nav" display="flex" gap={4} alignItems="center">
            <Link href="/">
              <Typography variant="body1" color="text.secondary">
                About
              </Typography>
            </Link>
            <Link href="/">
              <Typography variant="body1" color="text.secondary">
                Community
              </Typography>
            </Link>
            <Link href="/">
              <Typography variant="body1" color="text.secondary">
                Browse
              </Typography>
            </Link>

            {session?.user ? (
              <>
                <Box
                  onClick={handleMenuOpen}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  <Avatar
                    src={session.user.image || undefined}
                    alt={session.user.name || "User"}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography variant="body2">
                    {session.user.name || session.user.email}
                  </Typography>
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleMenuClose}>Profil</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Inställningar</MenuItem>
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={handleOpenLoginDialog}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Box>
      </header>

      <LoginDialog open={loginDialogOpen} onClose={handleCloseLoginDialog} />
    </>
  );
}