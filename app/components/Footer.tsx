"use client";

import { GitHub, LinkedIn } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          lineHeight: 0,
        }}
      >
        <Image
          src="/wave-divider-up.png"
          alt="Wave divider"
          width={1920}
          height={200}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </Box>
      <Box
        component="footer"
        sx={{
          bgcolor: "primary.main",
          color: "text.secondary",
          py: 6,
          width: "100%",
          mt: "-1px",
        }}
      >
        <Box sx={{ px: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Image
              src="/bookhive-logo-white.png"
              width={130}
              height={130}
              alt="bookhive logo"
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <GitHub color="secondary" sx={{ fontSize: 40 }} />
              <LinkedIn color="secondary" sx={{ fontSize: 40 }} />
            </Box>
          </Box>

          <Divider sx={{ borderColor: "#F7EBD5", width: "100%", mb: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="body2" color="#F7EBD5">
              &copy; {year} BookHive. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
