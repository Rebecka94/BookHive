"use client";

import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useTransition } from "react";
import { createPost } from "../../actions/createPost";
import BookSearch from "./BookSearch";
import FavoriteBookDropdown from "./FavoriteBookDropdown";

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
    <Card
      sx={{ border: "1px solid", borderColor: "divider", px: 3, py: 2, mb: 3 }}
    >
      <Typography
        variant="h3"
        sx={{ fontSize: { xs: "18px", md: "25px" }, mb: 3 }}
      >
        Start a topic or just say what is on your mind
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          gap: { md: 2 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <BookSearch
            selectedBook={selectedBook}
            onSelectBook={setSelectedBook}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <FavoriteBookDropdown
            selectedBook={selectedBook}
            onSelectBook={setSelectedBook}
          />
        </Box>
      </Box>

      <TextField
        id="post-title"
        name="post-title"
        label="Title"
        fullWidth
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
        sx={{ mb: 2 }}
        inputProps={{ id: "post-title" }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormLabel htmlFor="post-content" sx={{ color: 'text.primary' }}>Write something..</FormLabel>

        <textarea
          id="post-content"
          name="post-content"
          rows={5}
          value={contentValue}
          onChange={(e) => setContentValue(e.target.value)}
          style={{
            width: "100%",
            fontSize: "16px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #6e6e6e",
            fontFamily: "inherit",
            backgroundColor: "#FFFCF6"
          }}
        />
      </FormControl>

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
