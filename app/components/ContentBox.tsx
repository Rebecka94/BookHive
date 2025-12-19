"use client";

import { Box, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";

interface ContentBoxProps {
  name: string;
  description: string;
  image?: string | null;
}

export default function ContentBox({ name, description, image }: ContentBoxProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: 1,
        padding: 1.5,
        minHeight: 140,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      {image && (
        <Box
          sx={{
            width: 100,
            height: 100,
            minWidth: 100,
            borderRadius: 1,
            overflow: "hidden",
            marginRight: 2,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            image={image}
            alt={`${name} image`}
          />
        </Box>
      )}

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Typography variant="h4">{name}</Typography>

        <Typography variant="body2" color="text.primary">
          {description}
        </Typography>
      </Box>
    </Card>
  );
}
