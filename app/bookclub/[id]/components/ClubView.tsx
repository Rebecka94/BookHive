"use client";

import { BookClub, PostWithBook } from "@/app/types/database";
import { createClient } from "@/lib/supabase/client";
import { Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { deletePost } from "../../actions/deletePost";
import { updatePost } from "../../actions/updatePost";
import CreatePostForm from "./CreatePostForm";
import MembersList from "./MembersList";
import PostsList from "./PostList";

interface Props {
  club: BookClub;
  posts: PostWithBook[];
}

export default function ClubView({ club, posts }: Props) {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [members, setMembers] = useState<{ user_id: string; role: string }[]>(
    []
  );

  const isCreator = userId === club.creator_id;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, [supabase]);

  useEffect(() => {
    if (userId && isCreator) {
      supabase
        .from("club_members")
        .select("user_id, role")
        .eq("club_id", club.id)
        .then(({ data }) => {
          if (data) setMembers(data);
        });
    }
  }, [supabase, club.id, userId, isCreator]);

  const handleUpdate = async (
    postId: string,
    title: string,
    content: string
  ) => {
    await updatePost(postId, club.id, { title, content });
  };

  const handleDelete = async (postId: string) => {
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
        {/* Members sidebar - only show if creator */}
        {isCreator && (
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: { md: "25%" },
              flexShrink: 0,
            }}
          >
            <Card sx={{ px: 3, py: 2 }}>
              <MembersList
                clubId={club.id}
                members={members}
                currentUserId={userId}
                isCreator={isCreator}
              />
            </Card>
          </Box>
        )}

        {/* Main content */}
        <Box sx={{ width: "100%", maxWidth: 700, mx: "auto" }}>
          <CreatePostForm clubId={club.id} />

          <PostsList
            posts={posts}
            currentUserId={userId}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </Box>
      </Box>
    </>
  );
}
