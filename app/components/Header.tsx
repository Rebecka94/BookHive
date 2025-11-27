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
      <header style={{ width: "100%" }}>
        <Box
          px={3}
          py={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
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
