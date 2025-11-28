"use client";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { Box, Divider, Link, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = {
    column1: [
      { label: "Link 1", href: "/" },
      { label: "Link 2", href: "/" },
    ],
    column2: [
      { label: "Link 3", href: "/" },
      { label: "Link 4", href: "/" },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "text.secondary",
        py: 4,
        mt: 8,
        width: "100%",
      }}
    >
      <Box sx={{ px: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Image
            src="/bookhive-logo-white.png"
            width="100"
            height="100"
            alt="bookhive logo"
          />
        </Box>

        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <Box sx={{ display: "flex", gap: 4, pl: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.column1.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: "#F7EBD5",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.column2.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: "#F7EBD5",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Box>

          <Box 
            sx={{ 
              gap: 2, 
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <GitHub color="secondary" fontSize="large" />
            <LinkedIn color="secondary" fontSize="large" />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Divider sx={{ borderColor: "#F7EBD5", width: "100%" }} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="body2" color="#F7EBD5">
            &copy; {year} BookHive. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}