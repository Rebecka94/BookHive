"use client";

import { BookClub, PostWithBook } from "@/app/types/database";
import { createClient } from "@/lib/supabase/client";
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
import { useEffect, useState } from "react";
import { deletePost } from "../../actions/deletePost";
import { updatePost } from "../../actions/updatePost";
import CreatePostForm from "./CreatePostForm";

interface Props {
  club: BookClub;
  posts: PostWithBook[];
}

export default function ClubView({ club, posts }: Props) {
  const supabase = createClient();

  const [userId, setUserId] = useState<string | null>(null);

  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, [supabase]);

  const startEdit = (post: PostWithBook) => {
    setEditingPostId(post.id);
    setEditTitle(post.title ?? "");
    setEditContent(post.content);
  };

  const handleUpdate = async (postId: string) => {
    await updatePost(postId, club.id, {
      title: editTitle,
      content: editContent,
    });

    setEditingPostId(null);
  };

  const handleDelete = async (postId: string) => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    await deletePost(postId, club.id);
  };

  return (
    <>
      <Typography variant="h2" sx={{ mb: 2, px: { xs: 2, sm: 3, md: 5 } }}>
        Welcome to {club.name}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          px: { xs: 2, sm: 3, md: 5 },
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: { md: "25%" },
            flexShrink: 0,
          }}
        >
          <Card sx={{ px: 3, py: 2 }}>
            <Typography variant="body1">Members</Typography>
          </Card>
        </Box>

        <Box sx={{ width: "100%", maxWidth: 700, mx: "auto" }}>
          <CreatePostForm clubId={club.id} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {posts.map((post) => {
              const isMine = post.author_id === userId;
              const isEditing = editingPostId === post.id;

              return (
                <Card key={post.id} sx={{ p: 2, position: "relative" }}>
                  {isMine && !isEditing && (
                    <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                      <IconButton
                        onClick={() => startEdit(post)}
                        aria-label="Edit post"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(post.id)}
                        aria-label="Delete post"
                      >
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
                        <Button
                          variant="contained"
                          onClick={() => handleUpdate(post.id)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setEditingPostId(null)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {post.title ?? "Untitled post"}
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
            })}

            {posts.length === 0 && (
              <Card sx={{ border: "1px solid",
        borderColor: "divider", p: 3, textAlign: "center" }}>
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
