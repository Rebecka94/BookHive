"use client";

import ForumIcon from "@mui/icons-material/Forum";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import * as React from "react";

type Props = {
  user: User | null;
  onOpenLogin: () => void;
  onSignOut: () => void;
};

type Anchor = "top" | "left" | "bottom" | "right";

export default function MobileNav({ user, onOpenLogin, onSignOut }: Props) {
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
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          {
            text: "Profile",
            href: "/profile",
            icon: user ? (
              <Avatar
              src={user.user_metadata?.avatar_url}
              alt={user.user_metadata?.name}
              sx={{ width: 32, height: 32 }}
              />
            ) : null,
          },
          { text: "Community", href: "/community", icon: <ForumIcon /> },
          { text: "Browse", href: "/browse", icon: <SearchIcon /> },
        ]
          .filter((item) => user || item.text !== "Profile")
          .map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} href={item.href}>
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          {item.text && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
        onClick={user ? onSignOut : onOpenLogin}
      >
        {user ? "Sign Out" : "Sign In"}
      </Button>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon fontSize="large" />
          </Button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}
