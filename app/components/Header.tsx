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
      <Box component="header" sx={{ width: "100%" }}>
        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/">
            <Image
              src="/bookhive-logo.png"
              alt="BookHive Logo"
              width={150}
              height={50}
            />
          </Link>

          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <DesktopNav onOpenLogin={() => setLoginDialogOpen(true)} />

            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
              <MobileNav onOpenLogin={() => setLoginDialogOpen(true)}/>
            </Box>
          </Box>
        </Box>
      </Box>

      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </>
  );
}
