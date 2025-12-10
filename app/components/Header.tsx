"use client";

import { createClient } from "@/lib/supabase/client";
import { Box } from "@mui/material";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DesktopNav from "./DektopNav";
import MobileNav from "./MobileNav";
import LoginDialog from "../auth/signin/LoginDialog";

export default function Header() {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

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
            <DesktopNav
              user={user}
              onOpenLogin={() => setLoginDialogOpen(true)}
              onSignOut={handleSignOut}
            />

            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
              <MobileNav
                user={user}
                onOpenLogin={() => setLoginDialogOpen(true)}
                onSignOut={handleSignOut}
              />
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
