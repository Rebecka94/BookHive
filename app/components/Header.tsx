"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DesktopNav from "./DektopNav";
import MobileNav from "./MobileNav";
import LoginDialog from "./signin/LoginDialog";

export default function Header() {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

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
          {/* LOGO */}
          <Link href="/">
            <Image
              src="/bookhive-logo.png"
              alt="BookHive Logo"
              width={150}
              height={50}
            />
          </Link>

          {/* NAVIGATION */}
          <Box display="flex" alignItems="center" gap={4}>
            {/* DESKTOP NAV */}
            <DesktopNav onOpenLogin={() => setLoginDialogOpen(true)} />

            {/* MOBILE NAV */}
            <Box display={{ xs: "flex", sm: "none" }}>
              <MobileNav />
            </Box>
          </Box>
        </Box>
      </header>

      {/* LOGIN DIALOG */}
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </>
  );
}
