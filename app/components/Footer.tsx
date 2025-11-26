"use client";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      color="text.secondary"
      py={4}
      mt={8}
    >
      <Box sx={{
          maxWidth: "95%",
          mx: "auto",
        }}
>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          gap={2}
        >
          <Box display={"flex"} justifyContent={"space-between"} width="100%">
            <Box display="flex" flexDirection={"column"} gap={1}>
              <Image src="/bookhive-logo-white.png" width="100" height="100" alt="bookhive logo" />
            </Box>

            <Box gap={2} display="flex">
            <GitHub color="secondary" fontSize="large" />
            <LinkedIn color="secondary" fontSize="large"/>
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" mt={2} mb={2}>
          <Divider sx={{ borderColor: "#FFF8E9", width: "100%" }} />
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <Typography variant="body2" color="#FFF8E9">
            &copy; {year} BookHive. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
