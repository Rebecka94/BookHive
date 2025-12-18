"use client";

import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTransition } from "react";
import { removeMember } from "../../actions/removeMember";

interface Member {
  user_id: string;
  role: string;
  club_username: string;
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

  const handleRemoveMember = (userId: string) => {
    if (!isCreator) return;
    const confirmed = confirm(
      "Are you sure you want to remove this member from the club?"
    );
    if (!confirmed) return;

    startTransition(async () => {
      await removeMember(clubId, userId);
    });
  };

  return (
    <Box>
      <List disablePadding>
        {members.map((member) => {
          const isSelf = member.user_id === currentUserId;

          return (
            <ListItem
              key={member.user_id}
              sx={{
                mb: 1,
                borderRadius: 2,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
              secondaryAction={
                isCreator && !isSelf && (
                  <IconButton
                    edge="end"
                    size="small"
                    disabled={isPending}
                    onClick={() => handleRemoveMember(member.user_id)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )
              }
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2">
                      {member.club_username}
                    </Typography>

                    {member.role === "creator" && (
                      <Chip label="Admin" size="small" color="primary" />
                    )}

                    {isSelf && (
                      <Chip label="You" size="small" variant="outlined" />
                    )}
                  </Box>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
