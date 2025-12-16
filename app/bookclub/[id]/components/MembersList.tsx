"use client";

import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTransition } from "react";
import { removeMember } from "../../actions/removeMember";

interface Member {
  user_id: string;
  role: string;
}

interface Props {
  clubId: string;
  members: Member[];
  currentUserId: string | null;
  isCreator: boolean;
}

export default function MembersList({
  clubId,
  members,
  currentUserId,
  isCreator,
}: Props) {
  const [isPending, startTransition] = useTransition();

  if (!isCreator) return null;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Members
      </Typography>

      <List dense>
        {members.map((member) => {
          const isSelf = member.user_id === currentUserId;

          return (
            <ListItem
              key={member.user_id}
              secondaryAction={
                !isSelf && (
                  <IconButton
                    edge="end"
                    disabled={isPending}
                    onClick={() =>
                      startTransition(async () => {
                        await removeMember(clubId, member.user_id);
                      })
                    }
                  >
                    <CloseIcon />
                  </IconButton>
                )
              }
            >
              <Typography variant="body2">
                {member.user_id}
                {member.role === "creator" && " (creator)"}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
