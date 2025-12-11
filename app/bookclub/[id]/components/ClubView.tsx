"use client";

import { BookClub } from "@/app/types/database";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  club: BookClub;
}

export default function ClubView({ club }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState<string[]>([]);

  const handlePost = () => {
    if (inputValue.trim().length === 0) return;
    setPosts((prev) => [inputValue, ...prev]);
    setInputValue("");
  };

  return (
    <>
      <Typography variant="h2" sx={{ mb: 2, px: { xs: 2, sm: 3, md: 5 } }}>
        Welcome to {club.name}
      </Typography>
      <Box
        id="parent"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          px: { xs: 2, sm: 3, md: 5 },
        }}
      >
        <Box
          id="aside"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            width: { md: "25%" },
            flexShrink: 0,
          }}
        >
          <Card sx={{ px: 3, py: 2 }}>
            <Typography variant="body1">Members</Typography>
          </Card>
        </Box>

        <Box
          id="content"
          sx={{
            width: "100%",
            maxWidth: 700,
            mx: "auto",
          }}
        >
          <Card sx={{ px: 3, py: 2 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 2,
              }}
            >
              Start a topic or just say whats on your mind
            </Typography>
            <TextField
              label="Write something..."
              multiline
              minRows={4}
              fullWidth
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              sx={{
                mb: 1,
              }}
            />

            <Button
              variant="contained"
              sx={{
                alignSelf: "flex-end",
                backgroundColor: "#992B15",
                color: "#F7EBD5",
              }}
              onClick={handlePost}
            >
              Post
            </Button>
          </Card>
          <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            {posts.map((post, index) => (
              <Card key={index} sx={{ p: 2 }}>
                <Typography>{post}</Typography>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
