"use client";

import { PostWithBook } from "@/app/types/database";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface Props {
  post: PostWithBook;
  isMine: boolean;
  onUpdate: (postId: string, title: string, content: string) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
  authorName: string;
}

export default function PostItem({
  post,
  isMine,
  onUpdate,
  onDelete,
  authorName,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title ?? "");
  const [editContent, setEditContent] = useState(post.content);

  const handleUpdate = async () => {
    await onUpdate(post.id, editTitle, editContent);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;
    await onDelete(post.id);
  };

  return (
    <Card sx={{ p: 2, position: "relative" }}>
      {isMine && !isEditing && (
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton onClick={() => setIsEditing(true)} aria-label="Edit post">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} aria-label="Delete post">
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {post.book?.cover_url && (
        <Box
          sx={{
            width: 80,
            aspectRatio: "1 / 1.5",
            position: "relative",
            mb: 1,
          }}
        >
          <Image
            src={post.book.cover_url}
            alt={post.book.title}
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
      )}

      {isEditing ? (
        <>
          <TextField
            fullWidth
            label="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ mb: 1 }}
          />

          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Content"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" onClick={handleUpdate}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {post.title ?? "Untitled post"}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {authorName}
          </Typography>

          <Typography
            variant="caption"
            color="#992B15"
            sx={{ display: "block", mb: 1 }}
          >
            {new Date(post.created_at).toLocaleDateString("en", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>

          <Typography>{post.content}</Typography>
        </>
      )}
    </Card>
  );
}
