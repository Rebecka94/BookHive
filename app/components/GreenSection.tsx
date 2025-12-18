"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";
import Image from "next/image";

interface GreenSectionProps {
  children: ReactNode;
}

export default function GreenSection({ children }: GreenSectionProps) {
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Box sx={{ width: "100%", overflow: "hidden", lineHeight: 0 }}>
        <Image
          src="/wave-divider-up.png"
          alt="divider"
          width={1920}
          height={100}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Box>
      <Box
        component="section"
        sx={{
          backgroundColor: "#345B49",
          color: "#FFF8E9",
          mt: "-1px",
          py: { xs: 10, md: 16, lg: 20 },
          px: { xs: 9, md: 12, lg: 18}
        }}
      >
        {children}
      </Box>
      <Box
        sx={{ 
          width: "100%", 
          overflow: "hidden", 
          lineHeight: 0, 
          mt: "-1px" 
        }}
      >
        <Image
          src="/wave-divider-down.png"
          alt="divider"
          width={1920}
          height={100}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Box>
    </Box>
  );
}