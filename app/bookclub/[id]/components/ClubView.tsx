"use client";

import { BookClub, PostWithBook } from "@/app/types/database";
import { createClient } from "@/lib/supabase/client";
import {
  Box,
  Card,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: { xs: 4, lg: 3 },
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 4, md: 6 },
        mb: 12,
        mt: 2,
        justifyContent: isCreator ? "flex-start" : "center",
         maxWidth: 1300,
    mx: "auto", 
      }}
    >
      {isCreator && (
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            width: { lg: "30%" },
            flexShrink: 0,
          }}
        >
          <Typography variant="h2" sx={{ mb: 3 }}>
            Members
          </Typography>

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
      <Box
        sx={{
          width: {
            xs: "100%",
            lg: isCreator ? "60%" : "100%",
          },
          maxWidth: isCreator ? "none" : 800,
          mx: isCreator ? 0 : "auto",
        }}
      >
        <Typography variant="h2" sx={{ mb: 3 }}>
          Welcome to {club.name}
        </Typography>

        <CreatePostForm clubId={club.id} />
        {isCreator && (
          <Box sx={{ display: { xs: "block", lg: "none" }, mt: 3, mb: 2 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Members</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MembersList
                  clubId={club.id}
                  members={members}
                  currentUserId={userId}
                  isCreator={isCreator}
                />
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
        <PostsList
          posts={posts}
          currentUserId={userId}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </Box>
    </Box>
  );
}
