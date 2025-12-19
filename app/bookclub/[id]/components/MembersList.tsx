"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
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
          const isAdmin = member.role === "creator";

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
                isCreator &&
                !isSelf && (
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2">
                        {member.club_username}
                      </Typography>

                      {isAdmin && member.club_username !== "Admin" && (
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          Admin
                        </Typography>
                      )}
                    </Box>

                    {isSelf && (
                      <Chip
                        label="You"
                        size="small"
                        sx={{
                          bgcolor: "#345B49",
                          color: "white",
                        }}
                      />
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
