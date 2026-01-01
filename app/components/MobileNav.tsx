"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import * as React from "react";
import SignOutDialog from "../auth/signin/SignOutDialog";

type Props = {
  user: User | null;
  onOpenLogin: () => void;
  onSignOut: () => void;
};

type Anchor = "top" | "left" | "bottom" | "right";

export default function MobileNav({ user, onOpenLogin, onSignOut }: Props) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <IconButton size="large" onClick={toggleDrawer(anchor, false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 6,
          width: "100%",
        }}
      >
        <List onClick={toggleDrawer(anchor, false)} sx={{ width: "100%", }}>
          {[
            { text: "Profile", href: "/profile" },
            { text: "Community", href: "/community" },
            { text: "Browse", href: "/browse" },
          ]
            .filter((item) => user || item.text !== "Profile")
            .map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  aria-label={`Go to ${item.text} page`}
                  sx={{
                    width: "100%",
                    py: 4,
                    display: "flex",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.06)",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.text}
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "2rem",
                        textAlign: "center",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Button
        variant="outlined"
        size="medium"
        sx={{
          borderColor: "primary.main",
          borderWidth: "2px",
          ":hover": {
            backgroundColor: "primary.main",
            color: "secondary.main",
          },
        }}
        onClick={user ? () => setConfirmOpen(true) : onOpenLogin}
      >
        {user ? "Sign Out" : "Sign In"}
      </Button>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button aria-label="Menu icon" onClick={toggleDrawer(anchor, true)}>
            <MenuIcon fontSize="large" />
          </Button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            slotProps={{
              paper: {
                sx: {
                  width: "100%",
                  maxWidth: "100%",
                },
              },
            }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <SignOutDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onSignOut();
        }}
      />
    </Box>
  );
}
