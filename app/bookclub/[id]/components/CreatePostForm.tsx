"use client";

import { Button, Card, TextField, Typography } from "@mui/material";
import { useState, useTransition } from "react";
import { createPost } from "../../actions/createPost";
import BookSearch from "./BookSearch";

interface Book {
  id: string;
  title: string;
  author?: string;
  cover_url?: string;
  first_publish_year?: number;
}

interface Props {
  clubId: string;
}

export default function CreatePostForm({ clubId }: Props) {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handlePost = () => {
    if (!titleValue.trim() || !contentValue.trim()) {
      setError("Both title and content are required");
      return;
    }

    startTransition(async () => {
      const res = await createPost(
        clubId,
        titleValue,
        contentValue,
        selectedBook || undefined
      );

      if (res?.error) {
        setError(res.error);
      } else {
        setTitleValue("");
        setContentValue("");
        setSelectedBook(null);
        setError(null);
      }
    });
  };

  return (
    <Card sx={{ px: 3, py: 2, mb: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Start a topic or just say what is on your mind
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <BookSearch selectedBook={selectedBook} onSelectBook={setSelectedBook} />

      <TextField
        label="Title"
        fullWidth
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Write something..."
        multiline
        minRows={4}
        fullWidth
        value={contentValue}
        onChange={(e) => setContentValue(e.target.value)}
        sx={{ mb: 1 }}
      />

      <Button
        variant="contained"
        disabled={isPending}
        sx={{
          backgroundColor: "#992B15",
          color: "#F7EBD5",
          "&:hover": { backgroundColor: "#7a2211" },
        }}
        onClick={handlePost}
      >
        {isPending ? "Posting..." : "Post"}
      </Button>
    </Card>
  );
}
