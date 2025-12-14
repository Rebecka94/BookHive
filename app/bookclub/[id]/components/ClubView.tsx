"use client";

import { BookClub, PostWithBook } from "@/app/types/database";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import CreatePostForm from "./CreatePostForm";

interface Props {
  club: BookClub;
  posts: PostWithBook[];
}

export default function ClubView({ club, posts }: Props) {
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
            display: { xs: "none", sm: "none", md: "block" },
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
            {posts.map((post) => (
              <Card key={post.id} sx={{ p: 2 }}>
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

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {post.title}
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
