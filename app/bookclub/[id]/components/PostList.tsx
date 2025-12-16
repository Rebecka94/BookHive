"use client";

import { PostWithBook } from "@/app/types/database";
import { Box, Card, Typography } from "@mui/material";
import PostItem from "./PostItem";

interface Props {
  posts: PostWithBook[];
  currentUserId: string | null;
  onUpdate: (postId: string, title: string, content: string) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
}

export default function PostsList({
  posts,
  currentUserId,
  onUpdate,
  onDelete,
}: Props) {
  if (posts.length === 0) {
    return (
      <Card
        sx={{
          border: "1px solid",
          borderColor: "divider",
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography color="#992B15">
          No posts yet. Be the first to share something!
        </Typography>
      </Card>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          isMine={post.author_id === currentUserId}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
}