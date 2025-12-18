"use client";

import { BookClub, PostWithBook } from "@/app/types/database";
import { createClient } from "@/lib/supabase/client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { deletePost } from "../../actions/deletePost";
import { updatePost } from "../../actions/updatePost";
import CreatePostForm from "./CreatePostForm";
import MembersList from "./MembersList";
import PostsList from "./PostList";

interface Props {
  club: BookClub;
  posts: PostWithBook[];
}

type MemberRow = {
  user_id: string;
  role: string;
  club_username: string;
};

export default function ClubView({ club, posts }: Props) {
  const supabase = createClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [members, setMembers] = useState<MemberRow[]>([]);

  const isCreator = userId === club.creator_id;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, [supabase]);

  useEffect(() => {
    supabase
      .from("club_members")
      .select("user_id, role, club_username")
      .eq("club_id", club.id)
      .then(({ data }) => {
        if (data) setMembers(data as MemberRow[]);
      });
  }, [supabase, club.id]);

  const authorNameByUserId = useMemo(() => {
    const map: Record<string, string> = {};
    for (const m of members) {
      map[m.user_id] = m.club_username;
    }
    return map;
  }, [members]);

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

  const myMember = members.find((m) => m.user_id === userId);
  const myClubUsername = myMember?.club_username;

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
          Welcome{" "}
          <Box component="span" sx={{ color: "#992B15" }}>
            {myClubUsername}
          </Box>{" "}
          to {club.name}
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
          authorNameByUserId={authorNameByUserId}
        />
      </Box>
    </Box>
  );
}
