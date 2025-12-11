"use client";

import { BookClub, Post } from "@/app/types/database";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState, useTransition } from "react";
import { createPost } from "../../actions/createPost";

interface Props {
  club: BookClub;
  posts: Post[];
}

export default function ClubView({ club, posts }: Props) {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handlePost = () => {
    if (titleValue.trim().length === 0 || contentValue.trim().length === 0) {
      setError("Both title and content are required");
      return;
    }

    startTransition(async () => {
      const res = await createPost(club.id, titleValue, contentValue);

      if (res.error) {
        setError(res.error);
      } else {
        setTitleValue("");
        setContentValue("");
        setError(null);
      }
    });
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
              Start a topic or just say what is on your mind
            </Typography>

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              sx={{
                mb: 2,
              }}
            />

            <TextField
              label="Write something..."
              multiline
              minRows={4}
              fullWidth
              variant="outlined"
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
              sx={{
                mb: 1,
              }}
            />

            <Button
              variant="contained"
              disabled={
                isPending ||
                titleValue.trim().length === 0 ||
                contentValue.trim().length === 0
              }
              sx={{
                alignSelf: "flex-end",
                backgroundColor: "#992B15",
                color: "#F7EBD5",
                "&:hover": {
                  backgroundColor: "#7a2211",
                },
              }}
              onClick={handlePost}
            >
              {isPending ? "Posting..." : "Post"}
            </Button>
          </Card>

          <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            {posts.map((post) => (
              <Card key={post.id} sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {post.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="#992B15"
                  sx={{ display: "block", mb: 1 }}
                >
                  {new Date(post.created_at).toLocaleDateString("eng", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Typography>{post.content}</Typography>
              </Card>
            ))}

            {posts.length === 0 && (
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Typography color="#992B15">
                  No posts yet. Be the first to share something!
                </Typography>
              </Card>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
